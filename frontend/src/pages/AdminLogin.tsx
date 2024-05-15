import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import * as apiClient from "../api-client";
import { useAppContext } from "../contexts/AppContext";
import { useNavigate } from "react-router-dom";

export type AdminSignFormData = {
  email: string;
  password: string;
};

const AdminLogin = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AdminSignFormData>();
  const navigate = useNavigate()
  const { showToast } = useAppContext();
  const mutation = useMutation(apiClient.adminLogin, {
    onSuccess: () => {
      showToast({ message: "Logged in successfully", type: "SUCCESS" });
      navigate('/admin-home')
    },
    onError: (error: Error) => {
      showToast({ message: error.message, type: "ERROR" });
    },
  });

  const onSubmit = handleSubmit((data) => {
    mutation.mutate(data);
  });
  return (
    <form className="flex flex-col gap-5" onSubmit={onSubmit}>
      <h2 className="text-2xl font-bold">SignIn</h2>
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
      <button
        type="submit"
        className="bg-blue-500 text-white p-2 border rounded font-bold hover:bg-blue-300"
      >
        Login
      </button>
    </form>
  );
};
export default AdminLogin;
