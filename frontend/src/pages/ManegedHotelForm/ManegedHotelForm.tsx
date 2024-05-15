import { FormProvider } from "react-hook-form";
import { useForm } from "react-hook-form";
import { HotelDetailSection } from "./HotelDetailSection";
import { TypeSection } from "./TypeSection";
import HotelFacility from "./HotelFacility";
import { Guest } from "./Guest";
import { ImageSection } from "./ImageSection";
import { HotelType } from "../../../../backend/src/model/hotel";
import { useEffect } from "react";

export type HotelFormData = {
  name: string;
  city: string;
  country: string;
  description: string;
  type: string;
  offerPrice: number;
  pricePerNight: number;
  starRating: number;
  facilities: string[];
  imageFiles: FileList;
  imageUrls: (string | undefined)[];
  adultCount: number;
  childrenCount: number;
};

type Props = {
  hotel:HotelType | undefined
  onSave: (hotelFormData: FormData) => void;
  isLoading: boolean;
};

export const ManageHotelForm = ({ onSave, isLoading, hotel}: Props) => {
  const formMethods = useForm<HotelFormData>();
  const { handleSubmit,reset } = formMethods;
  const onSubmit = handleSubmit((formDataJson: HotelFormData) => {
    const formData = new FormData();

   

    useEffect(() => {
      if (hotel) {
        // Use 'reset' method from useForm to reset form values to 'hotel' data
        reset({
          name: hotel.name,
          city: hotel.city,
          country: hotel.country,
          description: hotel.description,
          type: hotel.type,
          offerPrice: hotel.offerPrice,
          pricePerNight: hotel.pricePerNight,
          starRating: hotel.starRating,
          facilities: hotel.facilities,
          imageUrls: hotel.imageUrls || [],
          adultCount: hotel.adultCount,
          childrenCount: hotel.childrenCount,
        });
      }
    }, [hotel, reset]);
  
    // Append basic hotel details
    formData.append("name", formDataJson.name);
    formData.append("city", formDataJson.city);
    formData.append("country", formDataJson.country);
    formData.append("description", formDataJson.description);
    formData.append("type", formDataJson.type);
    formData.append("offerPrice", formDataJson.offerPrice.toString());
    formData.append("pricePerNight", formDataJson.pricePerNight.toString());
    formData.append("starRating", formDataJson.starRating.toString());
    formData.append("adultCount", formDataJson.adultCount.toString());
    formData.append("childrenCount", formDataJson.childrenCount.toString());

  
    // Append facilities
    if (formDataJson.facilities && Array.isArray(formDataJson.facilities)) {
      formDataJson.facilities.forEach((facility) => {
        formData.append("facilities[]", facility);
      });
    }
  
    // Append image URLs
    if (formDataJson.imageUrls && Array.isArray(formDataJson.imageUrls)) {
      formDataJson.imageUrls.forEach((imageUrl:string|undefined) => {
        if (imageUrl) {
          formData.append("imageUrls[]", imageUrl);
        }
      });
    }
  
    // Append image files
    if (formDataJson.imageFiles && formDataJson.imageFiles.length > 0) {
      Array.from(formDataJson.imageFiles).forEach((imageFile) => {
        formData.append("imageFiles", imageFile);
      });
    }
  
    onSave(formData);
  });
  
  if (!hotel) {
    return null;
  }
  
  return (
    <FormProvider {...formMethods}>
      <form className="flex flex-col gap-10" onSubmit={onSubmit}>
        <HotelDetailSection />
        <TypeSection />
        <HotelFacility />
        <Guest />
        <ImageSection />
        <span className="flex justify-end p-2">
          <button
            disabled={isLoading}
            type="submit"
            className="bg-blue-600 text-2xl font-semibold text-white hover:bg-blue-500 border rounded p-1"
          >
            {isLoading ? "Saving..." : "Save"}
          </button>
        </span>
      </form>
    </FormProvider>
  );
};
