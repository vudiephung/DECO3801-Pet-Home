import { Router, Request, Response, NextFunction } from 'express';
import * as fs from 'fs/promises';
import multer from 'multer';
import * as path from 'path';
import { Client, LatLng, AddressType } from '@googlemaps/google-maps-services-js';
import { ManagedUpload } from 'aws-sdk/clients/s3';

import * as S3 from '../utilities/s3';
import verifyAccess from '../middleware/authMiddleware';
import Zone from '../models/Zones';

require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });

const router = Router();
const upload = multer({ dest: './pet-image-uploads/' });

router.post(
  '/add-location',
  upload.array('image', 3),
  verifyAccess,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      // Upload the image(s) to S3 then delete local image(s)
      let imageKeys: string[] = [];
      if (req.files) {
        const uploadList: Promise<ManagedUpload.SendData>[] = [];
        (req.files as Express.Multer.File[]).forEach(file => {
          uploadList.push(S3.uploadImage(file));
        });
        const results = await Promise.all(uploadList);
        imageKeys = results.map(res => res.Key);

        (req.files as Express.Multer.File[]).forEach(
          file => fs.unlink(file.path) // await
        );
      }

      // Convert location coordinates to human-readable address
      const mapsClient = new Client();
      const coordinates: LatLng = [req.body.latitude, req.body.longitude];
      const geocodeResponse = await mapsClient.reverseGeocode({
        params: {
          latlng: coordinates,
          result_type: [
            AddressType.locality,
            AddressType.administrative_area_level_2,
            AddressType.administrative_area_level_1,
          ],
          key: process.env.MAPS_API_KEY as string,
        },
      });

      // Store new location into database
      const addressComponents = geocodeResponse.data.results[0].address_components;
      const locality = addressComponents[0].short_name;
      const city = addressComponents[1].short_name;
      const state = addressComponents[2].short_name;
      const zone = await Zone.findOne({ state, city, locality }).exec();
      if (zone) {
        zone.locations.push({
          latitude: req.body.latitude,
          longitude: req.body.longitude,
          images: imageKeys,
        });
        zone.save();
      } else {
        await Zone.create({
          state,
          city,
          locality,
          locations: [
            {
              latitude: req.body.latitude,
              longitude: req.body.longitude,
              images: imageKeys,
            },
          ],
        });
      }
      res.status(201).json({ success: 'New location successfully added' });
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: 'Something went wrong' });
    }
  }
);

export default router;
