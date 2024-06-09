import {Card, CardBody, CardHeader} from "reactstrap";
import Str from "../../dev/localization";
import {useNavigate, useParams} from "react-router-dom";
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

const EditAxis = () => {
    const [init, setInit] = useState({
        title: "",
        weightedCoefficient: "",
        sortOrder: "",
    });
    const {id} = useParams();
    const validationObj = Yup.object().shape({
        title: Yup.string().required(Str.requiredField),
        weightedCoefficient: Yup.number().required(Str.requiredField).typeError(Str.numberOnly),
        sortOrder: Yup.number().required(Str.requiredField).typeError(Str.numberOnly)
    });
    const navigate = useNavigate();
    useEffect(() => {
        getSubAxis()
    }, [id])
    const getSubAxis = async () => {
        const result = await Api.send(ApiUrls.getSubAxis(id))
        if (result.success) {
            setInit(result.data)
        }
    }
    const goBack = () => {
        navigate(-1)
    };
    const save = async (model) => {
        delete model.guid
        const result = await Api.put(ApiUrls.editSubAxis(id), model)
        if (result.success) {
            MyAlert.success(Str.editSuccess)
        } else {
            MyAlert.error(result.data.title ?? Str.operationFail)
        }
    }
    return(
        <Card>
            <CardHeader>
                <div className="d-flex justify-content-between card-header-custom bg-primary text-white"><span
                    className="text-header">{Str.editSubAxis}</span>
                    <span onClick={goBack} className="d-inline-flex back-text text-decoration-none"><i
                        className="fa fa-arrow-left"/></span>
                </div>
            </CardHeader>
            <CardBody>
                <Formik enableReinitialize={true} validationSchema={validationObj} initialValues={init}
                        onSubmit={save}>
                    {
                        (props) => {
                            const {handleSubmit} = props;
                            return (<form className="form-wrapper" style={{paddingTop: "60px"}} onSubmit={(e) => {
                                e.preventDefault()
                                e.stopPropagation()
                            }}>
                                <div className="row mb-4">
                                    <div className="col-12 col-md-4">
                                        <MyLabel htmlFor="title" label={Str.axisTitle} isRequired={true}/>
                                        <MyTextInput name="title" formik={props}/>
                                        <MyErrorForm errorFor="title" formik={props}/>
                                    </div>
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
export default EditAxis