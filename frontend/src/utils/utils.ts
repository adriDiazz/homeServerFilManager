export const shortName = (name: string) => {
  if (name.length > 12) {
    const ext = "." + name.split(".")[1] || "png";
    const sliced = name.slice(0, 12);
    const finalName = ext ? sliced + "...-" + ext : sliced + "...-" + ".png";
    return finalName;
  }
  return name;
};

export const selectIcon = (key: string) => {
  if (key === "documents") return "docIcon.png";
  if (key === "images") return "videoIcon.png";
  if (key === "videos") return "photoIcon.png";
};
