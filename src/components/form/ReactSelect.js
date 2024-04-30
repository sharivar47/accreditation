import Select from 'react-select';
const ReactSelect = ({name, formik, options}) => {

    const {setFieldValue} = formik;
    const change = (selected) => {
        setFieldValue(name, selected.value)
    }
    return(
        <Select
            name={name}
            isMulti={false}
            placeholder="انتخاب..."
            onChange={(selected) => {
                change(selected)
            }}
            noOptionsMessage={() => 'موردی نیست'}
            options={options}
        />
    );
}
export default ReactSelect