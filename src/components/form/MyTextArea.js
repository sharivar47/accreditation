import {FormikProps} from "formik";
import React from "react";

/**
 * component for create textarea
 * @param name
 * @param placeholder
 * @param className
 * @param formik props property in formik
 * @constructor
 */
const MyTextArea = ({name, placeholder, className, formik}) => {
    const {setFieldValue, values} = formik;
    const value = values[name];
    /**
     * when write text in textarea in onchange function set value in formik
     */
    return (
        <textarea  name={name} value={value} placeholder={placeholder} className="form-control" onChange={(event) => {
            setFieldValue(name, event.currentTarget.value);
        }} />
    )
}
export default MyTextArea
