"use client";

import AuthService from "@/services/AuthService";
import { useAppDispatch } from "@/store/hooks";
import { setAuth, setUser } from "@/store/slices/userSlice";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";

interface Inputs {
  email: string;
  password: string;
}

const schema = yup.object().shape({
  email: yup
    .string()
    .email("Введите корректный email")
    .required("Email обязателен"),
  password: yup
    .string()
    .min(6, "Пароль должен содержать хотя бы 6 символов")
    .required("Пароль обязателен"),
});

const LogIn = () => {
  const [error, setError] = useState("");
  const dispatch = useAppDispatch();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: yupResolver(schema),
  });

  // Обработчик отправки формы
  const onSubmit: SubmitHandler<Inputs> = async (data): Promise<void> => {
    try {
      const { email, password } = data;
      const response = await AuthService.login(email, password);

      if (response.status < 200 || response.status >= 300) {
        setError("Ошибка регистрации");
        throw new Error("Ошибка регистрации");
      }
      if (!response.data.user.isActived) {
        setError(
          "Пожалуйста зайдите на почту и перейдите по ссыке а затем попробуйте заново"
        );
        throw new Error(
          "Пожалуйста зайдите на почту и перейдите по ссыке а затем попробуйте заново"
        );
      }
      localStorage.setItem("token", response.data.accessToken);
      dispatch(setAuth(true));
      dispatch(setUser(response.data.user));
      router.push("/user");
    } catch (error) {
      console.error("Ошибка регистрации:", error);
    }
  };

  return (
    <div className='flex justify-center items-center h-screen'>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='bg-white p-8 rounded-lg shadow-lg w-96'
      >
        <h2 className='text-2xl font-semibold mb-6 text-center text-gray-400'>
          Вход
        </h2>

        {/* Поле для Email */}
        <div className='mb-4'>
          <label
            htmlFor='email'
            className='block text-sm font-medium text-gray-700'
          >
            Email
          </label>
          <input
            type='email'
            id='email'
            {...register("email")}
            className='mt-2 p-2 w-full border rounded-lg text-black'
          />
          {errors.email && (
            <p className='text-red-500 text-xs mt-1'>{errors.email.message}</p>
          )}
        </div>

        {/* Поле для пароля */}
        <div className='mb-6'>
          <label
            htmlFor='password'
            className='block text-sm font-medium text-gray-700'
          >
            Пароль
          </label>
          <input
            type='text'
            id='password'
            {...register("password")}
            className='mt-2 p-2 w-full border rounded-lg text-black'
          />
          {errors.password && (
            <p className='text-red-500 text-xs mt-1'>
              {errors.password.message}
            </p>
          )}
        </div>

        {/* Кнопка отправки формы */}
        <button
          type='submit'
          className='w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700'
        >
          Вход
        </button>
        {error && <h4 className='text-red-600'>{error}</h4>}
      </form>
    </div>
  );
};

export default LogIn;
