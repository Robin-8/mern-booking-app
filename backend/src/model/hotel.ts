import mongoose,{Schema} from "mongoose";



export type HotelType={
    _id: string;
    userId: string;
    name: string;
    city: string;
    country: string;
    description: string;
    type: string;
    offerPrice: number;
    adultCount: number;
    childrenCount: number;
    facilities: string[];
    pricePerNight: number;
    starRating: number;
    imageUrls: string[];
    lastUpdated: Date;
}


const hotelSchema = new Schema<HotelType>({
    _id: { type: String, required: true }, // MongoDB generates this ID automatically
    userId: { type: String, ref: 'User', required: true },
    name: { type: String, required: true },
    city: { type: String, required: true },
    country: { type: String, required: true },
    description: { type: String, required: true },
    type: { type: String, required: true },
    offerPrice: { type: Number, required: true },
    adultCount: { type: Number, required: true },
    childrenCount: { type: Number, required: true },
    facilities: [{ type: String, required: true }],
    pricePerNight: { type: Number, required: true },
    starRating: { type: Number, required: true, min: 1, max: 5 },
    imageUrls: { type: [String], required: true },
    lastUpdated: { type: Date, required: true }
});

const Hotel = mongoose.model<HotelType>("Hotel", hotelSchema);

export default Hotel;
