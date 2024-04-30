import React from "react"

const MyErrorForm = ({errorFor, formik}) => {
    const errors = formik.errors
    return (<>
        { errors[errorFor] ? <span className="form-error__message">{errors[errorFor]}</span> : ""}
    </>)
}
export default MyErrorForm
