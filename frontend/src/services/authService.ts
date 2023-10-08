import { LoginResponse, User } from "../types/form";

export const login = async (body: User) => {
  try {
    const response = await fetch(import.meta.env.VITE_LOGIN_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: body ? JSON.stringify(body) : undefined,
    });

    const responseData: LoginResponse = await response.json();

    if (!response.ok) {
      throw new Error("Hubo un problema en la solicitud.");
    }

    localStorage.setItem("token", responseData.token);
    return responseData;
  } catch (error) {
    throw new Error("Hubo un problema en la solicitud.");
  }
};
