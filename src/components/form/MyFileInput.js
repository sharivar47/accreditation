import React, {useRef} from "react";


const MyFileInput = ({name, placeholder, formik}) => {
    const {setFieldValue, values} = formik;
    const value = values[name];
    const inputRef = useRef(null);
    const handleClick = () => {
        inputRef.current.click();
    }
    return (
        <div className="text-center">
            <button className="btn btn-primary" onClick={handleClick}>
                <i className="fa fa-file-upload"/>
            </button>
            <input id={name} ref={inputRef} className="d-none" type="file" name={name} onChange={(event) => {
                setFieldValue(name, event.currentTarget.files[0]);
            }} />
            <div className="image-upload-container">
                {value ? <img className="image-uploaded" src={URL.createObjectURL(value)}
                                   alt={value.name} /> :
                    <img src={require("../../assets/img/image-icon.png")} />}
            </div>
        </div>
    )
}
export default MyFileInput
