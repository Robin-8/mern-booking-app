import {  useMutation, useQueryClient } from "react-query"
import * as apiSlice from '../api-client'
import { useAppContext } from "../contexts/AppContext"

export const SignOutButton = () => {
    const queryClient = useQueryClient()
    const {showToast}=useAppContext()
    const mutation = useMutation(apiSlice.logout,{
        onSuccess: async() => {
            // this queryClient not given the page will reload only get the correct page
           await queryClient.invalidateQueries("validateToken")
            showToast({message:'logout succefully',type:"SUCCESS"})
        },
        onError: (err:Error) => {
            showToast({message:err.message,type:"ERROR"})
        }
    })

    const handilClick=()=>{
        mutation.mutate()
    }
    return(
        <button onClick={handilClick} className="bg-white px-3 mr-0 text-blue-700 hover:bg-gray-200 ">LogOut</button>
    )
}