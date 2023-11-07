import { jwtDecode } from "jwt-decode";

export const validateToken = (token: string | null) => {
  try {
    if (!token) return false;

    const tokenInfo = jwtDecode(token);

    if (!tokenInfo || !tokenInfo.exp) return false;

    const currentTimestamp = Math.floor(Date.now() / 1000);

    if (tokenInfo.exp <= currentTimestamp) {
      return false; // Si el token ha caducado, consideramos que no es válido
    }

    return true;
  } catch (error) {
    // Manejar el error, por ejemplo, registrar el error o tomar alguna otra acción
    console.error("Error al decodificar el token:", error);
    return false; // Si ocurre un error al decodificar el token, consideramos que no es válido
  }
};
