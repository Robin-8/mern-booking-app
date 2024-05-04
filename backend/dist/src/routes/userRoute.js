"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = require("../controller/userController");
const userController_2 = require("../controller/userController");
const authMiddilware_1 = __importDefault(require("../middilware/authMiddilware"));
const router = express_1.default.Router();
router.post("/register", userController_2.validateRegistration, userController_1.registerUser);
router.post('/login', userController_2.validationLogin, userController_1.loginUser);
router.get('/validate-token', authMiddilware_1.default, (req, res) => {
    res.status(200).send({ userId: req.userId });
});
router.post('/logout', userController_1.logout);
exports.default = router;
