import { useState } from "react";
import axios from "axios";
const Test = () => {
    const [file, setFile] = useState(null);
  
    const handleClick = async () => {
      if (!file) {
        console.error("No file selected");
        return;
      }
  
      const formData = new FormData();
      formData.append("file", file);
  
      try {
        const response = await axios.post(
          "http://localhost:5000/api/admin/upload",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        console.log(response.data);
      } catch (error) {
        console.error("Error uploading file:", error);
      }
    };
  
    const handleFileChange = (e) => {
      setFile(e.target.files[0]);
    };
  
    return (
      <form encType="multipart/form-data">
        <input type="file" onChange={handleFileChange} />
        <button type="button" onClick={handleClick}>
          Upload
        </button>
      </form>
    );
  };
  
  export default Test;
