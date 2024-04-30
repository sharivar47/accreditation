


const MyLabel = ({htmlFor, label, isRequired}) => {
    return (<label className="mb-1 label-font" htmlFor={htmlFor}>{label}{isRequired ? <i className="text-danger px-1">*</i> : ""}</label>)
}
export default MyLabel
