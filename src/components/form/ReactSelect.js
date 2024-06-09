import Select from "react-select";

const ReactSelect = ({name, formik, options, searchable = false, isMulti = false, changeItem = (selectedItem) => {}}) => {

    const {setFieldValue, values} = formik;
    const change = (selected) => {
        setFieldValue(name, selected.value)
        changeItem(selected.value)
    }
    const value = values[name]
    return(
        <Select
            name={name}
            isMulti={isMulti}
            placeholder="انتخاب..."
            onChange={(selected) => {
                change(selected)
            }}
            noOptionsMessage={() => 'موردی نیست'}
            options={options}
            isSearchable={searchable}
            value={options && options.length > 0 && value !== "" ? options.find(option => option.value === value) : null}
        />
    );
}
export default ReactSelect