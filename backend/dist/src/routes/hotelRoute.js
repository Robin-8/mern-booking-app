"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("multer"));
const hotelController_1 = require("../controller/hotelController");
const hotelController_2 = require("../controller/hotelController");
const router = express_1.default.Router();
// Configure multer storage
const storage = multer_1.default.memoryStorage();
const upload = (0, multer_1.default)({
    storage: storage,
    limits: {
        fileSize: 5 * 1024 * 1024 // 5mb
    }
});
// Define hotel upload route
router.post('/hotels', upload.array('images', 5), hotelController_1.uploadHotelImages);
// admin login
router.post('/login', hotelController_2.adminLogin);
exports.default = router;
