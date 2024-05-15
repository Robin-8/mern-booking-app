import { useFormContext } from "react-hook-form";
import { HotelFormData } from "./ManegedHotelForm";

export const ImageSection = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<HotelFormData>();

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4 text-center">Images</h2>
      <div className="border rounded p-4 flex flex-col gap-4 ml-40">
        <input
          type="file"
          multiple
          accept="image/*"
          className="text-gray-700 w-full font-normal"
          {...register("imageFiles", {
            validate: (imageFiles) => {
              if (!imageFiles || imageFiles.length === 0) {
                return "Please select at least one image";
              }
              if (imageFiles.length > 6) {
                return "You can select a maximum of 6 images";
              }
              return true; // Validation passed
            },
          })}
        />
      </div>
      {errors.imageFiles && (
        <span className="text-red-500 ml-40">{errors.imageFiles.message}</span>
      )}
    </div>
  );
};
// imageFilse set to imageUrls ---------------