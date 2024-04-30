import Select from "react-select";
import {useEffect, useState} from "react";
import AppController from "../../dev/controllers/AppController";
import BaseHelper from "../../dev/helpers/BaseHelper";

const MultiSelectApp = ({name, formik}) => {

    const [options, setOptions] = useState([]);
    const {setFieldValue} = formik;
    useEffect(() => {
        getApps()
    }, [])
    const getApps = async () => {
        const result = await AppController.getApps({}, true)
        setOptions(BaseHelper.toSelectApp(result.data.items))
    }
    const change = (selected) => {
        setFieldValue(name, selected)
    }
    return(
        <Select
            name={name}
            isMulti={true}
            placeholder="انتخاب..."
            onChange={(selected) => {
                change(selected)
            }}
            noOptionsMessage={() => 'موردی نیست'}
            options={options}
        />
    );
}
export default MultiSelectApp