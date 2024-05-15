import { RegisterFormData } from "./pages/Register";
import { SignInFormData } from "./pages/SignIn";
import { AdminSignFormData } from "./pages/AdminLogin";
import { SuperAdminFormData } from "./pages/SuperLogin";
import { HotelType } from "../../backend/src/model/hotel";




const API_BASE_URL =import.meta.env.VITE_API_BASE_URL || "";

export const register = async(formData:RegisterFormData)=>{
    const response = await fetch(`${API_BASE_URL}/api/user/register`,{
        method: 'POST',
        credentials:'include',
        headers:{
            'Content-Type':'application/json'
        },
        body: JSON.stringify(formData)
    })
    const responseData = await response.json()
    if(!response.ok){
       throw new Error(responseData.message)
    }
}

export const login = async(fromData:SignInFormData)=>{
    const response = await fetch(`${API_BASE_URL}/api/user/login`,{
        method:'POST',
        credentials:'include',
        headers:{
            'Content-Type':'application/json'
        },
        body: JSON.stringify(fromData)
    })
     const body = await response.json()
     if(!response.ok){
         throw new Error(body.message)
     }
     return body;
}

export const logout = async()=>{
    const response = await fetch(`${API_BASE_URL}/api/user/logout`,{
        method:'POST',
        credentials:'include'
    })
    if(!response.ok){
        throw new Error(' error during in logout')
    }

}

export const validateToken = async()=>{
    const response = await fetch(`${API_BASE_URL}/api/user/validate-token`,{
       credentials:'include'
      
    })
    if(!response.ok){
        throw new Error('invalid token')
      }
      return response.json();
}



export const adminLogin = async (formData: AdminSignFormData) => {
    try {
        const response = await fetch(`${API_BASE_URL}/api/admin/login`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        if (!response.ok) {
            const body = await response.json();
            throw new Error(body.message || 'Failed to login');
        }

        const data = await response.json();
        return data; // Assuming the response contains necessary data like token or userId
    } catch (error) {
        console.log(error,'error happening in admin login');
        
        throw new Error('Internal server error'); // Handle error gracefully
    }
};

export const superAdminLogin = async(formData:SuperAdminFormData)=>{
  try {
    const response = await fetch(`${API_BASE_URL}/api/super/login`,{
        method:'POST',
        credentials:'include',
        headers:{
            'Content-Type':'application/json'
        },
        body: JSON.stringify(formData)
    })
    if(!response.ok){
        const body = await response.json();
        throw new Error(body.message || 'Failed to login');
        
    }
    
    const data = await response.json();
    return data; 
  } catch (error) {
    console.log(error);
    throw new Error('Internal server error');
    
  }
}



export const AddHotel = async (hotelFormData: FormData) => {
  const response = await fetch(`${API_BASE_URL}/api/admin/addhotels`, {
    method: "POST",
    credentials: "include",
    body: hotelFormData,
  });



  if (!response.ok) {
    console.error(`Failed to add hotel. Status: ${response.status} ${response.statusText}`);
    throw new Error("Failed to add hotel");
  }

  return response.json();
};

export const fetchingHotels = async ():Promise<HotelType[]>=>{
   try {
    const response = await fetch(`${API_BASE_URL}/api/admin/adminHotels`,{ 
        
        credentials:'include',
    })
   
    
    if(!response.ok){
        throw new Error('Failed to fetch hotels');
    }
    const data = await response.json();
    console.log(data);
    
    return data.hotel;
    
   } catch (error) {
      throw new Error('some faile happening in fetching hotel')
   }

}

export const fetchingHotelsById = async(hotelId:string):Promise<HotelType>=>{
  try {
    const response = await fetch(`${API_BASE_URL}/api/admin/adminHotel/${hotelId}`,{
        credentials:'include',
    })
    console.log(response,'res');
    
    if(!response.ok){
        throw new Error('Failed to fetch hotels');
    }
    const data = await response.json();
    
    
    return data.hotel
  } catch (error) {
    throw new Error('Failed to fetch hotel by id');
  }
}

export const updateHotelDetails = async(hotelFormData:FormData)=>{
    try {
        const response = await fetch(`${API_BASE_URL}/api/admin/editHotel/${hotelFormData.get('hotelId')}`,{
            method:'PUT',
            credentials:'include',
            body:hotelFormData
        })
        if(!response.ok){
            throw new Error('Failed to update hotel');
        }
        const data = await response.json();
        console.log(data);
        
        return data.hotel
    } catch (error) {
        console.log(error,'id error');
        
        throw new Error('Error happening in update hotel');
    }
}


