import React from "react";


const MyTextInput = ({name, placeholder, formik, readonly = false}) => {
    const {setFieldValue, values, errors} = formik;
    const value = values[name];
    const error = errors[name];
    return (<input readOnly={readonly} name={name} type="text" autoComplete="off" placeholder={placeholder} className={`form-control ${error !== "" ? "" : "error"}`} value={value} onChange={(event) => {
        setFieldValue(name, event.currentTarget.value);
    }} />)
}
export default MyTextInput
