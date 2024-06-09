import {Card, CardBody, CardHeader} from "reactstrap";
import Str from "../../dev/localization";
import {useNavigate} from "react-router-dom";
import {Formik} from "formik";
import MyLabel from "../../components/form/MyLabel";
import ReactSelect from "../../components/form/ReactSelect";
import MyErrorForm from "../../components/form/MyErrorForm";
import MyTextInput from "../../components/form/MyTextInput";
import * as Yup from "yup";
import {useEffect, useState} from "react";
import Api from "../../dev/service/Api";
import ApiUrls from "../../dev/service/ApiUrls";
import {MyAlert} from "../../components/feature/MyAlert";

const CreateAxis = () => {
    const init = {
        etebarDorehGuid: "",
        title: "",
        weightedCoefficient: '',
        sortOrder: ""
    };
    const [orgTypes, setOrgTypes] = useState([])
    const [accreditations, setAccreditations] = useState([]);
    const validationObj = Yup.object().shape({
        orgTypeGUID: Yup.string().required(Str.requiredField),
        etebarDorehGuid: Yup.string().required(Str.requiredField),
        title: Yup.string().required(Str.requiredField),
        weightedCoefficient: Yup.number().required(Str.requiredField).typeError(Str.numberOnly),
        sortOrder: Yup.number().required(Str.requiredField).typeError(Str.numberOnly)
    })
    const navigate = useNavigate()
    useEffect(() => {
        getOrgType()
    }, [])

    const getOrgType = async () => {
        const result = await Api.get(ApiUrls.getOrgType());
        if (result.success) {
            const orgTypeList = result.data.map(item => {
                return {label: item.title, value: item.guid}
            });
            setOrgTypes(orgTypeList)
        }
    }
    const getAccreditations = async (selectedOrgType) => {
        const result = await Api.get(ApiUrls.getSelectAccreditation(ApiUrls.query({OrgTypeGuid: selectedOrgType})))
        if (result.success) {
            const accreditationList = result.data.map(item => {return {value: item.guid, label: item.title}})
            setAccreditations(accreditationList)
        }
    }
    const goBack = () => {
        navigate(-1)
    };
    const save = async (model, {resetForm}) => {
        const result = await Api.post(ApiUrls.createAxis(), model)
        if (result.success) {
            resetForm()
            MyAlert.success(Str.addAxisSuccess)
        } else {
            MyAlert.error(result.data.title ?? Str.operationFail)
        }
    }
    return(
        <Card>
            <CardHeader>
                <div className="d-flex justify-content-between card-header-custom bg-primary text-white"><span
                    className="text-header">{Str.createAxis}</span>
                    <span onClick={goBack} className="d-inline-flex back-text text-decoration-none"><i
                        className="fa fa-arrow-left"/></span>
                </div>
            </CardHeader>
            <CardBody>
                <Formik enableReinitialize={true} validationSchema={validationObj} initialValues={init}
                        onSubmit={save}>
                    {
                        (props) => {
                            const {handleSubmit, resetForm} = props;
                            return (<form className="form-wrapper" style={{paddingTop: "60px"}} onSubmit={(e) => {
                                e.preventDefault()
                                e.stopPropagation()
                            }}>
                                <div className="row mb-4">
                                    <div className="col-12 col-md-4">
                                        <MyLabel htmlFor="orgTypeGUID" label={Str.orgType} isRequired={true}></MyLabel>
                                        <ReactSelect changeItem={(selectedItem) => getAccreditations(selectedItem)} name="orgTypeGUID" formik={props} options={orgTypes}/>
                                        <MyErrorForm errorFor="orgTypeGUID" formik={props}/>
                                    </div>
                                    <div className="col-12 col-md-4">
                                        <MyLabel htmlFor="etebarDorehGuid" label={Str.accreditationTitle} isRequired={true}/>
                                        <ReactSelect name="etebarDorehGuid" formik={props} options={accreditations}/>
                                        <MyErrorForm errorFor="etebarDorehGuid" formik={props}/>
                                    </div>
                                    <div className="col-12 col-md-4">
                                        <MyLabel htmlFor="title" label={Str.axisTitle} isRequired={true}/>
                                        <MyTextInput name="title" formik={props}/>
                                        <MyErrorForm errorFor="title" formik={props}/>
                                    </div>
                                </div>
                                <div className="row mb-4">
                                    <div className="col-12 col-md-4">
                                        <MyLabel htmlFor="sortOrder" label={Str.sort} isRequired={true}/>
                                        <MyTextInput name="sortOrder" formik={props}/>
                                        <MyErrorForm errorFor="sortOrder" formik={props}/>
                                    </div>
                                    <div className="col-12 col-md-4">
                                        <MyLabel htmlFor="weightedCoefficient" label={Str.weightingFactor} isRequired={true}/>
                                        <MyTextInput name="weightedCoefficient" formik={props}/>
                                        <MyErrorForm errorFor="weightedCoefficient" formik={props}/>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-12">
                                        <button className="btn btn-save" onClick={() => handleSubmit()}>{Str.save}
                                        </button>
                                        <button className="btn btn-cancel mx-1" onClick={() => {
                                            resetForm()
                                        }}>{Str.cleanForm}</button>
                                    </div>
                                </div>
                            </form>)
                        }
                    }
                </Formik>
            </CardBody>
        </Card>
    )
}
export default CreateAxis