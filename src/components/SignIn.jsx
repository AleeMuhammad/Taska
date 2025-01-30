import React, { useState } from "react";
import myimg from "../assets/Illustration.png";
import icon from "../assets/book-square.png";
import { Link, replace } from "react-router";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/solid';
import { yupResolver } from "@hookform/resolvers/yup";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../redux/Store";

const SignIn = () => {
  const [showPassword, setshowPassword] = useState(false);

  const users = useSelector((state) => state.users);
  const navigate = useNavigate();
  const dispatch=useDispatch();
  
  const schema= yup.object().shape({
    email: yup.string().email("Invalid email").required("Email is required"),
    password: yup.string().required("Password is required"),
});

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors,isValid },
  } = useForm({
    resolver:yupResolver(schema),
    mode:"onChange"
  });

  const toggle = () => {
    setshowPassword(!showPassword);
  };

  const onSubmit = (data) => {
    const user = users.find((u) => u.email === data.email && u.password === data.password);
    if (user) {
      dispatch(loginUser(user));
      navigate(user.role==="admin"?"/":"/userdashboard");
    } else {
      toast.error("Invalid email or password!");
    }
  };


  return (
    <div className="bg-[#f7f7f9] h-screen flex justify-center items-center relative overflow-hidden">
  <div className="flex flex-col bg-[#FFFFFF]  rounded-xl shadow-[#4C4E6438] shadow-md px-5 py-10 z-10 relative">
    <ToastContainer className={"p-4"}/>
    <div  className="flex items-center justify-center  space-x-2">
              <img className="mt-1" src={icon} alt="" />
      
      <h1 className="text-center font-[Plus Jakarta Sans] font-semibold text-3xl text-[#141522]">
        Taska
      </h1>
    </div>
    <div className="flex flex-col sm:w-[21rem] h-[19rem] space-y-6 mt-6">
      <h2 className="font-[Poppins] font-semibold text-[#4C4E64DE] text-2xl">
        Welcome to Taska! 👋🏻
      </h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col space-y-6"
        action=""
      >
        <input
          className="border border-[#B9B9B9] rounded-lg p-3 placeholder:text-black"
          type="text"
          id="email"
          placeholder="Email"
          {...register("email",)}
        />
        {errors.email && (
          <p className="text-sm text-red-500">{errors.email.message}</p>
        )}
        <div className="relative">
          <input
            className="border border-[#B9B9B9] rounded-lg p-3 placeholder:text-black w-full"
            id="password"
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            {...register("password",)}
          />
          <div
            className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
            onClick={toggle}
          >
            {showPassword ? (
              <EyeSlashIcon className="h-5 w-5 text-gray-500" />
            ) : (
              <EyeIcon className="h-5 w-5 text-gray-500" />
            )}
          </div>
        </div>
        {errors.password && (
          <p className="text-sm text-red-500">{errors.password.message}</p>
        )}
        
            <button disabled={!isValid} className={`bg-[#666CFF] rounded-xl shadow-md text-white p-2 ${!isValid && 'opacity-50 cursor-not-allowed' }`}>
            SIGN IN
        </button>
        <p className="text-center font-[Poppins] text-[#4C4E6499] text-sm">
          Don't have an Account?{" "}
          <Link to="/signup" className="text-[#666CFF] cursor-pointer">
            Sign Up
          </Link>
        </p>
      </form>
    </div>
  </div>
  <img
    src={myimg}
    alt="Illustration"
    className="absolute bottom-0 right-0 z-0 "
  />
</div>

  );
};

export default SignIn;
