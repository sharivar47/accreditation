import React from "react";


const MyCheckBox = ({name, className, formik, readonly = false}) => {
    const {setFieldValue, values} = formik;
    const value = values[name];
    const setChange = (e) => {
        setFieldValue(name, e.target.checked)
    }
    return (<input type="checkbox" className="custom-checkbox" onChange={(e) => setChange(e)} name={name} value={value}/>)
}
export default MyCheckBox
