"use client";

import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";

interface Inputs {
  email: string;
  password: string;
}

// cхема валидации с помощью Yup
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

const Register = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [errorSendForm, setErrorSendForm] = useState(false);
  // Инициализация формы с использованием useForm
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: yupResolver(schema), // Подключаем валидацию через Yup
  });

  // Обработчик отправки формы
  const onSubmit: SubmitHandler<Inputs> = async data => {
    setLoading(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/registration`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data), // Отправляем данные как JSON
        }
      );

      if (!response.ok) {
        console.log(response);
        throw new Error("Ошибка регистрации");
        setErrorSendForm(true);
      }

      const result = await response.json();
      console.log("Регистрация успешна:", result);
      setErrorSendForm(false);
      router.push("/");

      // Тут можно сделать редирект или уведомление о успешной регистрации
    } catch (error) {
      console.error("Ошибка регистрации:", error);
      setErrorSendForm(true);
    } finally {
      setLoading(false);
    }

    // Здесь вы можете отправить данные на сервер для авторизации
  };

  return (
    <div className='flex justify-center items-center h-screen'>
      {loading ? (
        <div>...</div>
      ) : (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className='bg-white p-8 rounded-lg shadow-lg w-96'
        >
          <h2 className='text-2xl font-semibold mb-6 text-center text-gray-400'>
            Регистрация
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
              <p className='text-red-500 text-xs mt-1'>
                {errors.email.message}
              </p>
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
            Регистрация
          </button>

          {errorSendForm && <h4 className='text-red-600'>Неверный email</h4>}
        </form>
      )}
    </div>
  );
};

export default Register;
