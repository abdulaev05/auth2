"use client";

import { TAuthResponse } from "@/models/response/TAuthResponse";
import AuthService from "@/services/AuthService";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  setAuth,
  setUser,
  restoreAuth,
  TUserData,
} from "@/store/slices/userSlice";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import UserService from "@/services/UserService";

type TUser = {
  activationLink: string;
  email: string;
  isActived: boolean;
  password: string;
};

const User = () => {
  const dispatch = useAppDispatch();
  const userSelect = useAppSelector((state) => state.user);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [users, setUsers] = useState<any[]>([]);

  const CheckAuth = async (): Promise<void> => {
    try {
      const response = await axios.get<TAuthResponse>(
        `${process.env.NEXT_PUBLIC_API_URL}/refresh`,
        {
          withCredentials: true,
        }
      );

      if (response.status < 200 || response.status >= 300) {
        throw new Error("Ошибка регистрации");
      }

      localStorage.setItem("token", response.data.accessToken);
      dispatch(setAuth(true));
      dispatch(setUser(response.data.user));
    } catch (err) {
      console.error("Ошибка проверки аутентификации:", err);
      dispatch(setAuth(false));
      dispatch(setUser({} as TUserData));
      router.push("/login");
      // localStorage.removeItem("token");
    }
  };

  const Logout = async () => {
    try {
      await AuthService.logout();
      localStorage.removeItem("token");
      dispatch(setAuth(false));
      dispatch(setUser({} as TUserData));
      router.push("/login");
    } catch (err) {
      console.log(err);
    }
  };

  const FetchUsers = async () => {
    if (!localStorage.getItem("token") || !userSelect.isAuth) {
      return;
    }

    try {
      const response = await UserService.fetchUsers();

      if (response.status < 200 || response.status >= 300) {
        throw new Error("Ошибка регистрации");
      }

      setUsers(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    dispatch(restoreAuth());

    if (token) {
      CheckAuth().finally(() => setIsLoading(false));
    } else {
      setIsLoading(false);
    }
  }, [dispatch]);

  if (isLoading) {
    return <div>Загрузка...</div>;
  }

  return (
    <main>
      {userSelect.isAuth ? (
        <div className='flex flex-col gap-y-3'>
          <h1>Пользователь авторизован {userSelect.user.email}</h1>

          <button
            onClick={FetchUsers}
            className='w-full bg-gray-500 text-white py-2 rounded-lg hover:bg-gray-600'
          >
            Получить список пользователей
          </button>
          {users && (
            <ul>
              {users.map((element, index) => {
                return <li key={index}>{element.email}</li>;
              })}
            </ul>
          )}
          <button
            onClick={Logout}
            className='w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700'
          >
            Выход
          </button>
        </div>
      ) : (
        <h1>Авторизуйтесь</h1>
      )}
    </main>
  );
};

export default User;
