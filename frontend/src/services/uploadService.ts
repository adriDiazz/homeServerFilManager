import { ToastContent } from "react-toastify";
import {
  uploadFileFunctionProps,
  uploadMultipleFilesFunctionProps,
} from "../types/props";

export const uploadFile: uploadFileFunctionProps = (
  file,
  setSelectingDirectory,
  directory,
  notify,
  notifyError,
  name
) => {
  const formData = new FormData();

  formData.append("uploadedFile", file);

  fetch(import.meta.env.VITE_UPLOAD_URL + directory, {
    method: "POST",
    body: formData,
  })
    .then((response) => {
      if (!response.ok) {
        notifyError();
        throw new Error("Hubo un problema al enviar el archivo.");
      }
      return response.json();
    })
    .then((data) => {
      notify();
      setSelectingDirectory(true);
    })
    .catch((error) => {
      notifyError();
      console.error("Error:", error);
    });
};

export const uploadMultipleFiles: uploadMultipleFilesFunctionProps = (
  files,
  setSelectingDirectory,
  directory,
  notify,
  notifyError,
  name
) => {
  const formData = new FormData();

  for (let i = 0; i < files.length; i++) {
    formData.append(`uploadedFiles`, files[i]);
  }

  fetch(import.meta.env.VITE_UPLOAD_MULTIPLE_URL + directory, {
    method: "POST",
    body: formData,
  })
    .then((response) => {
      console.log(response);
      if (!response.ok) {
        notifyError();
        throw new Error("Hubo un problema al enviar los archivos.");
      }
      return response.json(); // Puedes cambiar esto según el tipo de respuesta esperada
    })
    .then((data) => {
      notify();
      setSelectingDirectory(true);
    })
    .catch((error) => {
      notifyError();
      console.error("Error:", error.message);
    });
};
