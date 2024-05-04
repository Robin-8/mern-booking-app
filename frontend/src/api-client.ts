import { RegisterFormData } from "./pages/Register";
import { SignInFormData } from "./pages/SignIn";

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
