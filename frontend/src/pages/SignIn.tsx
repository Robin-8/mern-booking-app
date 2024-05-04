import { useForm } from "react-hook-form";
import { useAppContext } from "../contexts/AppContext";
import { useMutation } from "react-query";
import * as apiClient from "../api-client";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export type SignInFormData = {
  email: string;
  password: string;
};

const SignIn = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormData>();
  const { showToast } = useAppContext();
  const navigate = useNavigate();

  const mutation = useMutation(apiClient.login, {
    onSuccess: () => {
      showToast({ message: "Logged in successfully", type: "SUCCESS" });
      navigate("/");
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
      <span className="flex items-center justify-between">
        <span className="text-black text-sm font-bold">Don't have an account? <Link className="underline" to='/register'>Register Account</Link>
        </span>
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 border rounded font-bold hover:bg-blue-300"
        >
          Login
        </button>
      </span>
    </form>
  );
};

export default SignIn;
