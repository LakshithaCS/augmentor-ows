import { useState } from "react";
import { uploadFileToStorage } from "../../util/Firebase";

function Test() {

    const [file, setFile] = useState(null);

    const onChnage = (evt) => {
        setFile(evt.target.files[0])
    }

    const onSubmit = () => {
        uploadFileToStorage(file, 'Models/image.html')
    }

    return <>
        <input type="file" accept="*.glb" onChange={(e) => onChnage(e)}/>
        <button onClick={onSubmit}>
            Upload
        </button>
    </>
}

export default Test;