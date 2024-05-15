import {useForm}from 'react-hook-form'
import { useAppContext } from '../contexts/AppContext';
import * as apiClient from '../api-client'
import { useMutation } from 'react-query';

export type SuperAdminFormData = {
    email: string;
    password: string;
}

 export const SuperLogin = ()=>{
  const {register,handleSubmit,formState:{errors}}=useForm<SuperAdminFormData>()
  const {showToast}=useAppContext()

  const mutation = useMutation(apiClient.superAdminLogin, {
      onSuccess:(()=>{
        showToast({message:'Login Successfull',type:"SUCCESS"})
      }),
      onError:((error:Error)=>{
        showToast({message:error.message,type:"ERROR"})
      })
  })


  const onSubmit = handleSubmit((data)=>{
    mutation.mutate(data)
  })
    return(
        <form className=" flex flex-col gap-5" onSubmit={onSubmit}>
            <h2 className="text-2xl font-bold">Super Admin Login</h2>
            <label className="text-black text-sm font-bold flex-1">
        Email
        <input
          type="email"
          className="border rounded w-full py-1 px-2 font-normal"
          {...register("email", { required: "email is needed" })}
        ></input>
      </label>
      {errors.email && (
        <span className="text-red-500">{errors.email.message}</span>
      )}
      <label className="text-black text-sm font-bold flex-1">
        Password
        <input
          type="password"
          className="border rounded w-full py-1 px-2 font-normal"
          {...register("password", {
            required: "password is needed",
            minLength: {
              value: 6,
              message: "password must be at least 6 characters long",
            },
          })}
        ></input>
      </label>
      {errors.password && (
        <span className="text-red-500">{errors.password.message}</span>
      )}
            <button className="bg-blue-500 text-white p-2 rounded-md">Login</button>
        </form>
    )
}
 