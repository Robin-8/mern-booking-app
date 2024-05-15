import { useFormContext } from "react-hook-form"
import { HotelFormData } from "./ManegedHotelForm"



export const Guest = () => {
    const {register , formState:{errors}}=useFormContext<HotelFormData>()
    return(
        <div className="">
            <h2 className="text-2xl font-bold mb-4">Guests</h2>
            <div className="grid grid-cols-2 gap-2 bg-gray-300 p-12 border rounded-xl ml-40">
                <label className="text-gray-700 text-sm font-semibold">
                    Adults
                    <input type="number"min={0} className="border rounded font normal py-2 px-3  w-full p-2"{...register('adultCount',{required:'at lease one adults is required'})} />
                     {errors.adultCount && <p className="text-red-500">{errors.adultCount.message}</p>}
                </label>

                <label className="text-gray-700 text-sm font-semibold">
                    Childs
                    <input type="number" min={0} className="border rounded font normal py-2 px-3  w-full p-2" {...register('childrenCount',{required:'at lease one child is required'})}/>
                    
                    {errors.childrenCount && <p className="text-red-500">{errors.childrenCount.message}</p>}
                </label>
            </div>
        </div>
    )
}