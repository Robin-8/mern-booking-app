"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("multer"));
const hotelController_1 = require("../controller/hotelController");
const authMiddilware_1 = __importDefault(require("../middilware/authMiddilware"));
const hotel_1 = __importDefault(require("../model/hotel"));
const cloudinary_1 = __importDefault(require("cloudinary"));
const express_validator_1 = require("express-validator");
const router = express_1.default.Router();
const app = (0, express_1.default)();
// Configure multer storage
const storage = multer_1.default.memoryStorage();
const upload = (0, multer_1.default)({
    storage: storage,
    limits: {
        fileSize: 5 * 1024 * 1024 // 5mb
    }
});
app.use(upload.array('imageUrls', 5));
// Define hotel upload route
router.post('/add-hotels', authMiddilware_1.default, [
    (0, express_validator_1.body)("name").notEmpty().withMessage("Name is required"),
    (0, express_validator_1.body)("city").notEmpty().withMessage("City is required"),
    (0, express_validator_1.body)("country").notEmpty().withMessage("Country is required"),
    (0, express_validator_1.body)("description").notEmpty().withMessage("Description is required"),
    (0, express_validator_1.body)("type").notEmpty().withMessage("Hotel type is required"),
    (0, express_validator_1.body)("pricePerNight")
        .notEmpty()
        .isNumeric()
        .withMessage("Price per night is required and must be a number"),
    (0, express_validator_1.body)("facilities")
        .notEmpty()
        .isArray()
        .withMessage("Facilities are required"),
], upload.array('imageUrls', 5), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const imageUrl = req.files || [];
        console.log(imageUrl, 'in');
        const newHotel = req.body;
        const uploadPromises = imageUrl.map((image) => __awaiter(void 0, void 0, void 0, function* () {
            const b64 = Buffer.from(image.buffer).toString('base64');
            let dataUrl = "data" + image.mimetype + ";base64," + b64;
            const res = yield cloudinary_1.default.v2.uploader.upload(dataUrl);
            console.log(res, 'image res');
            return res.url;
        }));
        const imageUrls = yield Promise.all(uploadPromises);
        console.log(imageUrls, 'image urls====');
        newHotel.imageUrls = imageUrls;
        newHotel.lastUpdated = new Date();
        newHotel.userId = req.userId;
        const hotel = new hotel_1.default(newHotel);
        console.log(hotel, 'hotel here----');
        yield hotel.save();
        res.status(201).send(hotel);
    }
    catch (error) {
        console.log('error creating hotel', error);
        res.status(500).json({
            message: 'error creating hotel',
        });
    }
}));
// admin login
router.post('/login', hotelController_1.adminLogin);
exports.default = router;
