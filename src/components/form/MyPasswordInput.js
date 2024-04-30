import React from "react"

const MyPasswordInput = ({name, placeholder, className, formik}) => {
    const {setFieldValue, values} = formik;
    const value = values[name];
    return (<input name={name} autoComplete="off" type="password" placeholder={placeholder} className="form-control" value={value} onChange={(event) => {
        setFieldValue(name, event.currentTarget.value);
    }} />)
}
export default MyPasswordInput
