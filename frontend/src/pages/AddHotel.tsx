import { useMutation } from "react-query";
import { ManageHotelForm} from "./ManegedHotelForm/ManegedHotelForm";
import { useAppContext } from "../contexts/AppContext";
import * as apiClient from "../api-client";
const AddHotel = () => {
  const { showToast } = useAppContext();

  const { mutate, isLoading } = useMutation(apiClient.AddHotel, {
    onSuccess: () => {
      showToast({ message: "Hotel Saved!", type: "SUCCESS" });
    },
    onError: () => {
      showToast({ message: "Error Saving Hotel", type: "ERROR" });
    },
  });


  const handleSave = (hotelFormData: FormData) => {
    mutate(hotelFormData); 
  };

  return <ManageHotelForm onSave={handleSave} isLoading={isLoading} />;
};

export default AddHotel;
