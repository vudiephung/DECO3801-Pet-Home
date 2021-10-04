import { Router, Request, Response, NextFunction } from 'express';
import * as fs from 'fs/promises';
import multer from 'multer';
import * as path from 'path';
import { Client, LatLng, AddressType } from '@googlemaps/google-maps-services-js';
import { ManagedUpload } from 'aws-sdk/clients/s3';

import * as S3 from '../utilities/s3';
import verifyAccess from '../middleware/authMiddleware';
import Zone from '../models/Zones';
import helperMethod from '../utilities/helper';

require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });

const helper = new helperMethod();
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

// Filter zone based on states and cities req
router.get('/filter-zone', verifyAccess, async( req: Request, res: Response, next: NextFunction ) => {
  try {
    const { state } = req.query;
    const { city } = req.query;
    const result = await Zone.find({ state: state, city: city},' locality locations').exec();
    res.status(200).json(result);
  } catch (err) {
      console.log(err);
      res.status(500).json({ error: 'Something went wrong' });
  }
});


//  Fetch out all states and these cities in each state.
router.get('/all-cities', verifyAccess, async(req: Request, res: Response, next: NextFunction) => {
  try {  
    const data = await Zone.find({},' -_id state city').exec();
    //get the distinct cities in states.
    const distinct = [];
    const map = new Map();
    for (const item of data) {
        if(!map.has(item.city)){
            map.set(item.city, true);    // set states, cities to Map
            distinct.push({
                state: item.state,
                city: item.city
            });
        }
    }
    const result = helper.groupBy(distinct, 'state');
    res.status(200).json(result);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Something went wrong'});
  }
});


export default router;
