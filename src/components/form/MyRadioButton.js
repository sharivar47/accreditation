import React from "react";

export const MyRadioButton = ({formik, options, name}) => {
  const {setFieldValue} = formik
  const onChange = (e) => {
    setFieldValue(name, e.target.value)
  }
  return(
    <div className="radio d-flex">
      {
        options.map(item => (
         <div className="px-2 d-flex">
           <input
             type="radio"
             value={item.value}
             onChange={onChange}
             name={name}
             className="mx-1"
           />
           <label htmlFor={item.value}>
             {item.label}
           </label>
         </div>
        ))
      }
    </div>
  )
}
