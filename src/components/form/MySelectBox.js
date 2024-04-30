import React from "react";

const MySelectBox = ({ name, className, formik, options}) => {
    const {setFieldValue, values} = formik;
    const value = values[name];

    return (<select name={name} value={value} className={`form-control ${className ? className : ''}`} onChange={(event) => {
        setFieldValue(name, event.currentTarget.value);
    }}>
      <option value="">همه</option>
        {options.length > 0 && options.map((option, index) => (<option key={index} value={option.value}>{option.label}</option>))}
    </select>)
}
export default MySelectBox
