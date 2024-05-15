import express,{Request,Response} from 'express';
import {adminLogin,editHotel,GetAdminHotels} from '../controller/hotelController'
import verifyToken from '../middilware/authMiddilware';
import  Hotel, { HotelType } from '../model/hotel';
import cloudinary from 'cloudinary'
import {body} from 'express-validator'
const router = express.Router();
import upload from '../../config/multer'
const app = express();



  router.post(
    "/addhotels",
    verifyToken,
    [
      body("name").notEmpty().withMessage("Name is required"),
      body("city").notEmpty().withMessage("City is required"),
      body("country").notEmpty().withMessage("Country is required"),
      body("description").notEmpty().withMessage("Description is required"),
      body("type").notEmpty().withMessage("Hotel type is required"),
      body("pricePerNight")
        .notEmpty()
        .isNumeric()
        .withMessage("Price per night is required and must be a number"),
      body("facilities")
        .notEmpty()
        .isArray()
        .withMessage("Facilities are required"),
    ],
    upload.array("imageFiles", 6),
    async (req: Request, res: Response) => {
      try {
        const imageFiles = req.files as Express.Multer.File[];
        console.log(imageFiles,'here images');
        
  
        const newHotel: HotelType = req.body;
        console.log(newHotel,'her hotel');
        
        newHotel.imageUrls =  (await uploadFilesToCloudinary(imageFiles)).map((result) => result.secure_url);

        newHotel.lastUpdated = new Date();
        newHotel.userId = req.userId;
  
        const hotel = new Hotel(newHotel);
        await hotel.save();
        console.log(hotel,'herr ');
        
        res.status(201).send(hotel);
      } catch (error) {
        console.error("Error adding hotel:", error);
        res.status(500).json({ message: "Failed to add hotel" });
      }
    }
  );
  // editing the hotel route
  router.put('/editHotel/:hotelId', verifyToken, upload.array('imageFiles'), async (req, res) => {
    try {
      const id = req.params.hotelId;
      console.log(id, 'here id');
  
      const updatHotel: HotelType = req.body;
      updatHotel.lastUpdated = new Date();
  
      const hotel = await Hotel.findOneAndUpdate(
        { _id: id, userId: req.userId }, 
        updatHotel, 
        { new: true } 
      );
  
      if (!hotel) {
        return res.status(404).json({ message: 'Hotel not found or cannot be updated' });
      }
  
      // Process image file uploads (if any) and update imageUrls
      const imageFiles = req.files as Express.Multer.File[];
      const updateImageUrl = await uploadFilesToCloudinary(imageFiles);
  
      hotel.imageUrls = [
        ...updateImageUrl,
        ...(updatHotel.imageUrls || []),
      ];
  
      await hotel.save();
  
      console.log('Updated Hotel:', hotel);
      res.status(200).json(hotel);
    } catch (error) {
      console.error('Error updating hotel:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });
  

  
  const uploadFilesToCloudinary = async (files:any) => {
    try {
      const uploadPromises = files.map(async (file:any) => {
        const b64 = Buffer.from(file.buffer).toString("base64");
    let dataURI = "data:" + file.mimetype + ";base64," + b64;
        const result = await cloudinary.v2.uploader.upload(dataURI, {
          folder: 'uploads',
          allowed_formats: ['jpg', 'png', 'jpeg','webp']
        });
        return result;
      });
  
      // Wait for all uploads to finish
      const uploadResults = await Promise.all(uploadPromises);
      return uploadResults;
    } catch (error:any) {
      throw new Error('Error uploading files to Cloudinary: ' + error.message);
    }
  };


// admin login

router.post('/login',adminLogin)
// router.post('/upload', upload.single('file'), (req, res) => {
//     try {
//       console.log(req.file); // Output the uploaded file details
//       res.status(200).send({ message: 'File uploaded successfully' });
//     } catch (error) {
//       console.error(error);
//       res.status(500).send({ message: 'File upload failed' });
//     }
//   });

router.get('/adminHotels',verifyToken,GetAdminHotels)
router.get('/adminHotel/:id',verifyToken,editHotel)

export default router;


