import api from "../utils/interceptor";
 import { tokenService } from "./tokenService";

export const userService = {
  
  updateAdmin,
  forgotpassword,
  resetpassword
};



async function updateAdmin(id, userData) {
  const user = tokenService.getUser();

  try {
    const response = await api.patch(`users/${id}`, userData);

    if (user.user.id === id) {
      user.user = response.data;
      tokenService.setUser(user);
    }

    return response.data;
  } catch (error) {
    console.log("error", error);
    return Promise.reject(error);
  }
}

async function forgotpassword(userEmail) {
  try {
    await api.post(`/auth/forgot-password`, userEmail);
  } catch (error) {
    console.log("error", error);
    return Promise.reject(error);
  }
}

async function resetpassword(userToken, newPassword) {
  try {
    await api.post(`/auth/reset-password?token=${userToken}`, newPassword);
  } catch (error) {
    console.log("error", error);
    return Promise.reject(error);
  }
}
