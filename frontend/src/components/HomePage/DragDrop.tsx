import { useRef, useState } from "react";
import "./DragDrop.css";
import ModalComponent from "../ui/ModalComponent";
import DocModal from "./DocModal";

const DragDrop = () => {
  const [dragActive, setDragActive] = useState(false);
  const [opened, setOpened] = useState(false);
  const [files, setFiles] = useState([]);
  // ref
  const inputRef = useRef(null);

  // handle drag events
  const handleDrag = function (e) {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  // triggers when file is dropped
  const handleDrop = function (e) {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      // handleFiles(e.dataTransfer.files);
      setOpened(true);
      setFiles(e.dataTransfer.files);
    }
  };

  // triggers when file is selected with click
  const handleChange = function (e) {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      // handleFiles(e.target.files);
    }
  };

  // triggers the input when the button is clicked
  const onButtonClick = () => {
    inputRef.current.click();
  };

  return (
    <>
      <form
        id="form-file-upload"
        onDragEnter={handleDrag}
        onDragLeave={handleDrag} // Agrega esta línea para gestionar dragleave
        onDragOver={handleDrag}
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          ref={inputRef}
          type="file"
          id="input-file-upload"
          multiple={true}
          onChange={handleChange}
        />
        <label
          id="label-file-upload"
          htmlFor="input-file-upload"
          className={dragActive ? "drag-active" : ""}
        >
          <div className="dragLogoWrapper">
            <img src="upload.png" alt="" />
            <p>Drag and drop your file here or</p>
            <p className="greyText">Support images and documents</p>
          </div>
        </label>
        {dragActive && (
          <div
            id="drag-file-element"
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          ></div>
        )}
      </form>
      <ModalComponent opened={opened} setOpened={setOpened}>
        <DocModal files={files} />
      </ModalComponent>
    </>
  );
};

export default DragDrop;
