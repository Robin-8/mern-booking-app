import { Request, Response } from 'express';
import { validationResult, check ,} from 'express-validator';
import User from '../model/user';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const registerUser = async (req: Request, res: Response) => {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        let user = await User.findOne({ email: req.body.email });
        if (user) {
            return res.status(400).json({
                message: 'User already exists'
            });
        }

        user = new User(req.body);
        await user.save();

        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET as string, {
            expiresIn: '1d'
        });

        res.cookie('auth_token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 86400000 
        });

        res.status(200).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error('Error in user registration:', error);
        res.status(500).json({
            message: 'Internal server error'
        });
    }
};

// Define validation middleware using express-validator
const validateRegistration = [
    check('email').notEmpty().withMessage('Email is required').isEmail(),
    check('password').notEmpty().withMessage('Password is required').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    check('firstName').notEmpty().withMessage('First name is required').isString(),
    check('lastName').notEmpty().withMessage('Last name is required').isString(),
   
];

const loginUser = async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // If passwords match, generate JWT token
        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET as string, {
            expiresIn: '1d'
        });

        // Set token in cookie
        res.cookie('auth_token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 86400000
        });

        res.status(200).json({ userId:user._id, message: 'Login successful'});
    } catch (error) {
        console.error('Error in login:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
const validationLogin =[
    check('email').notEmpty().withMessage('Email is required').isEmail(),
    check('password').notEmpty().withMessage('Password is required').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
]


const logout = async(req:Request,res:Response)=>{
    res.cookie('auth_token','',{
        expires: new Date(0),
    })
    res.send();
}
export { registerUser, validateRegistration, loginUser, validationLogin, logout};
