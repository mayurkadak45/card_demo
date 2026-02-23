import { create } from "zustand";

const AuthStore = create((set) => ({
  user: null,
  isLoggedIn: false,
  role: null,
  screenData: null,

  login: (userData) =>
    set(() => ({
      user: userData,
      isLoggedIn: true,
      role: userData.type
    })),

  logout: () =>
    set(() => ({
      user: null,
      isLoggedIn: false,
      role: null,
      screenData: null 
    })),

  setScreenData: (data) =>
    set(() => ({
      screenData: data
    }))
}));

export default AuthStore;