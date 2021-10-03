import { Router, Request, Response, NextFunction } from 'express';
import * as S3 from '../utilities/s3';
import * as fs from 'fs/promises';
import multer from 'multer';
import * as path from 'path';
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });
import { Client, LatLng, AddressType } from '@googlemaps/google-maps-services-js';
import { ManagedUpload } from 'aws-sdk/clients/s3';

import verifyAccess from '../middleware/authMiddleware';
import Zone from '../models/Zones';

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
          key: process.env.MAPS_API_KEY as string,
        },
      });

      // Store new location into database
      let locality = '';
      let city = '';
      let state = '';
      for (let i = 0; i < geocodeResponse.data.results.length; i++) {
        const result = geocodeResponse.data.results[i];
        if (
          result.types.includes(AddressType.locality) ||
          result.types.includes(AddressType.administrative_area_level_2) ||
          result.types.includes(AddressType.administrative_area_level_1)
        ) {
          result.address_components.forEach(component => {
            if (component.types.includes(AddressType.locality) && locality === '') {
              locality = component.short_name;
            }
            if (component.types.includes(AddressType.administrative_area_level_2) && city === '') {
              city = component.short_name;
            }
            if (component.types.includes(AddressType.administrative_area_level_1) && state === '') {
              state = component.short_name;
            }
          });
        }
        if (locality !== '' && city !== '' && state !== '') {
          break;
        }
      }

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
      res.status(500).json({ error: err });
    }
  }
);

export default router;
