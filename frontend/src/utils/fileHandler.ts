export const fileHandler = (file, setImageSrc) => {
  if (file.type.startsWith("image/")) {
    const reader = new FileReader();

    reader.onload = function (e) {
      setImageSrc(e.target.result); // Establece la URL de la imagen en el estado
    };

    reader.readAsDataURL(files[0]);
  }
};
