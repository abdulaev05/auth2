import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type TUserData = {
  email: string;
  id: string;
  isActived: boolean;
};

type TInitialState = {
  isAuth: boolean;
  user: TUserData;
};

const initialState: TInitialState = {
  isAuth: false,
  user: {
    email: "",
    id: "",
    isActived: false,
  },
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setAuth: (state, action: PayloadAction<boolean>) => {
      state.isAuth = action.payload;
    },
    setUser: (state, action: PayloadAction<TUserData>) => {
      state.user = action.payload;
    },
    restoreAuth: (state) => {
      const token = localStorage.getItem("token");
      if (token) {
        state.isAuth = true;
      } else {
        state.isAuth = false;
      }
    },
  },
});

export const { setAuth, setUser, restoreAuth } = userSlice.actions;
export default userSlice.reducer;
