import MySelectBox from "../form/MySelectBox";
import {useEffect, useState} from "react";
import AppController from "../../dev/controllers/AppController";
import BaseHelper from "../../dev/helpers/BaseHelper";
import {useDispatch, useSelector} from "react-redux";
import {selectAllApp, setAllApps} from "../../dev/statemanagement/appSlice";

const DropDownApp = ({name, formik}) => {

    const [apps, setApps] = useState([]);
    useEffect(() => {
        getApps()
    }, [])
    const getApps = async () => {
        const result = await AppController.getApps({}, true);
        const options = BaseHelper.toSelectApp(result.data.items)
        setApps(options);
    }
    return (<MySelectBox name={name} formik={formik} options={apps}/>)
}
export default DropDownApp