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
exports.uploadHotelImages = exports.adminLogin = void 0;
const cloudinary_1 = __importDefault(require("cloudinary"));
const hotel_1 = __importDefault(require("../model/hotel"));
const user_1 = __importDefault(require("../model/user"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const adminLogin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    console.log(req.body, 'amdin body');
    try {
        const user = yield user_1.default.findOne({ email, role: 'admin' });
        if (!user) {
            return res.status(401).json({
                message: 'Invalid email or password'
            });
        }
        if (user.role !== 'admin') {
            res.status(401).json({ message: 'you are not a admin' });
        }
        const isMatch = yield bcryptjs_1.default.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({
                message: 'Invalid email or password'
            });
        }
        const token = jsonwebtoken_1.default.sign({ userId: user.id }, process.env.JWT_SECRET, {
            expiresIn: '1d'
        });
        res.cookie("admin_token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 8640000 // 1d
        });
        res.status(200).json({ userId: user._id, message: 'Login successful' });
    }
    catch (error) {
        console.log(error, "some error happening");
        res.status(500).json({
            message: 'Internal Server Error'
        });
    }
});
exports.adminLogin = adminLogin;
const uploadHotelImages = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const imageFiles = req.files;
        const hotelData = req.body;
        const uploadPromises = imageFiles.map((image) => __awaiter(void 0, void 0, void 0, function* () {
            const b64 = Buffer.from(image.buffer).toString('base64');
            const imageUrl = `data:${image.mimetype};base64,${b64}`;
            const result = yield cloudinary_1.default.v2.uploader.upload(imageUrl);
            return result.url;
        }));
        const uploadedImageUrls = yield Promise.all(uploadPromises);
        hotelData.imageUrl = uploadedImageUrls;
        hotelData.lastUpdated = new Date(),
            hotelData.userId = req.userId;
        const hotel = new hotel_1.default(hotelData);
        ``;
        yield hotel.save();
        res.status(201).send(hotel);
        res.status(200).json({
            message: 'Images uploaded successfully',
            uploadedUrls: uploadedImageUrls
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Internal Server Error',
        });
    }
});
exports.uploadHotelImages = uploadHotelImages;
