import { useFormContext } from "react-hook-form";
import { HotelFormData } from "./ManegedHotelForm";


export const HotelDetailSection = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<HotelFormData>();
  
  return (
    <div className="flex  flex-col gap-4  ml-40">
      <h1 className="text-3xl text-black font-bold">Add Hotel</h1>
      <label className="text-black text-sm font-bold flex-1">
        Name
        <input
          type="text"
          className="border rounded w-full py-1 px-2 font-normal "
          {...register("name", { required: "Name is required" })}
        />
        {errors.name && (
          <span className="text-red-500">{errors.name.message}</span>
        )}
      </label>
      <div className="flex gap-4">
        <label className="text-black text-sm font-bold flex-1">
          City
          <input
            type="text"
            className="border rounded w-full py-1 px-2 font-normal "
            {...register("city", { required: "City is required" })}
          />
          {errors.city && (
            <span className="text-red-500">{errors.city.message}</span>
          )}
        </label>
        <label className="text-black text-sm font-bold flex-1">
         Country
          <input
            type="text"
            className="border rounded w-full py-1 px-2 font-normal "
            {...register("country", { required: "Country is required" })}
          />
          {errors.country && (
            <span className="text-red-500">{errors.country.message}</span>
          )}
        </label>
      </div>
      <label className="text-black text-sm font-bold flex-1">
        Description
        <textarea
          rows={10}
          className="border rounded w-full py-1 px-2 font-normal "
          {...register("description", { required: "Description is required" })}
        ></textarea>
        {errors.description && (
          <span className="text-red-500">{errors.description.message}</span>
        )}
      </label>
      <label className="text-black text-sm font-bold max-w-[50%]">
        Price Per Night
        <input
          type="number"
          min={1}
          className="border rounded w-full py-1 px-2 font-normal "
          {...register("pricePerNight", { required: "Price is required" })}
        />
        {errors.pricePerNight && (
          <span className="text-red-500">{errors.pricePerNight.message}</span>
        )}
      </label>
      <label className="text-black text-sm font-bold max-w-[50%]">
        Star Rating
        <select
          className="border rounded w-full p-2 text-gray-700 font-normal"
          {...register("starRating", { required: "Star Rating is required" })}
        >
          <option value="" disabled selected>
            Select Star Rating
          </option>
          {[1, 2, 3, 4, 5].map((num) => (
            <option key={num} value={num}>
              {num}
            </option>
          ))}
        </select>
        {errors.starRating && (
          <span className="text-red-500">{errors.starRating.message}</span>
        )}
      </label>
      
    </div>
  );
};
