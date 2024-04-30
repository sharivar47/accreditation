import ReactQuill from "react-quill";

const MyTextEditor = ({name, formik}) => {
    const {setFieldValue, values} = formik;
    const value = values[name];
    const changeValue = (e) => {
     setFieldValue(name, e);
    }
    return (
        <div className="text-editor">
        <ReactQuill
            placeholder="متن تستی برای "
            theme="snow"
            value={value}
            onChange={(e) => changeValue(e)} />
        </div>
    );
}
export default MyTextEditor