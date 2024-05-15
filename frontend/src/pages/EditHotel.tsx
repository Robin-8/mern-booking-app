import { useParams } from "react-router-dom";
import * as apiClient from "../api-client";
import { useMutation, useQuery } from "react-query";
import { ManageHotelForm } from "./ManegedHotelForm/ManegedHotelForm";
import { useAppContext } from "../contexts/AppContext";


export  const EditHotel = () => {
  const { hotelId } = useParams();

  
  const { showToast } = useAppContext();

  const { data: hotel} = useQuery(
    "fetchingHotelsById",
    () => apiClient.fetchingHotelsById(hotelId || ""),
    {
      //if only the hotelId is present then we will fetch the hotel data oterwice hotelId showing undefined or empty
      enabled: !!hotelId,
    }
  );

  const {mutate , isLoading}=useMutation(apiClient.updateHotelDetails,{
    onSuccess:()=>{
      showToast({
        message:"Hotel updated successfully",type:"SUCCESS"
      })
    },
    onError:(error:Error)=>{
      showToast({
        message:error.message,
        type:"ERROR"
      })
    }
  })
  const handilSubmit=(hotelFormData:FormData)=>{
    mutate(hotelFormData)
  }



  return (
    <ManageHotelForm hotel={hotel} onSave={handilSubmit} isLoading={isLoading} />
  )
};
