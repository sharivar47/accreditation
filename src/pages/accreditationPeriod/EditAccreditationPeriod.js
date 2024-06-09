import {Card, CardBody, CardHeader} from "reactstrap";
import Str from "../../dev/localization";
import {Link, useParams} from "react-router-dom";
import Address from "../../dev/helpers/Address";
import {Formik} from "formik";
import MyLabel from "../../components/form/MyLabel";
import ReactSelect from "../../components/form/ReactSelect";
import MyErrorForm from "../../components/form/MyErrorForm";
import MyTextInput from "../../components/form/MyTextInput";
import MyDatePicker from "../../components/form/MyDatePicker";
import MyCheckBox from "../../components/form/MyCheckBox";
import {useEffect, useState} from "react";
import * as Yup from "yup";
import DateObject from "react-date-object";
import persian from "react-date-object/calendars/persian";
import persian_en from "react-date-object/locales/persian_en";
import persian_fa from "react-date-object/locales/persian_fa";
import Api from "../../dev/service/Api";
import ApiUrls from "../../dev/service/ApiUrls";
import DateHelper from "../../dev/helpers/DateHelper";
import {MyAlert} from "../../components/feature/MyAlert";

const EditAccreditationPeriod = () => {
    const [orgTypes, setOrgType] = useState([]);
    const [init, setInit] = useState({orgTypeGUID: "", title: "", startDate: "", endDate: "", isCurrent: false, sortOrder: ""});
    const {id} = useParams()
    useEffect(() => {
        getAccreditation()
        getOrgType()
    }, [id])
    const getAccreditation = async () => {
        const result = await Api.get(ApiUrls.getAccreditation(id))
        if (result.success) {
            let startDate = null
            if (result.data.startDate) {
                const utcDateObject = new DateObject(result.data.startDate).convert(persian, persian_fa);
                startDate = utcDateObject.format('YYYY/MM/DD');
            }
            let endDate = null
            if (result.data.endDate) {
                const utcDateObject = new DateObject(result.data.endDate).convert(persian, persian_fa);
                endDate = utcDateObject.format('YYYY/MM/DD');
            }
           setInit({...result.data, startDate: startDate, endDate: endDate})
        }
    }
    const validationObj = Yup.object().shape({
        title: Yup.string().required(Str.requiredField),
        startDate: Yup.string().required(Str.requiredField),
        isCurrent: Yup.boolean(),
        endDate: Yup.string().nullable().when('startDate', (start, schema) => {
            return start && schema.test({
                message: Str.thisTimeMustBeAfterStart,
                test: value => {
                    const startDate = new DateObject({
                        date: start[0] ?? new DateObject({calendar: persian, locale: persian_en}),
                        calendar: persian,
                        locale: persian_fa
                    }).toDate().getTime();
                    const endDate = new DateObject({
                        date: value ?? new DateObject({calendar: persian, locale: persian_en}),
                        calendar: persian,
                        locale: persian_fa
                    }).toDate().getTime();
                    if (value && startDate && endDate) {
                        return endDate > startDate
                    } else {
                        return true
                    }
                }
            });
        }),
        sortOrder: Yup.number().typeError(Str.mustNumber).positive(Str.positiveNumber),
        orgTypeGUID: Yup.string()
    })

    const getOrgType = async () => {
        const result = await Api.get(ApiUrls.getOrgType());
        if (result.success) {
            const orgTypes = result.data.map(item => {
                return {label: item.title, value: item.guid}
            });
            setOrgType(orgTypes)
        }
    }
    const save = async (model, {resetForm}) => {
        const startDate = DateHelper.toGregorianFormat(model.startDate, DateHelper.dashFormat);
        let endDate = null;
        if (model.endDate) {
            endDate = DateHelper.toGregorianFormat(model.endDate, DateHelper.dashFormat);
        }
        const result = await Api.patch(ApiUrls.editAccreditation(id), {
            ...model,
            startDate: startDate,
            endDate: endDate,
        })
        if (result.success) {
            MyAlert.success(Str.accreditationAdded)
        } else {
            MyAlert.error(result.data.title ?? Str.operationFail)
        }
    }
     return(
         <Card>
             <CardHeader>
                 <div className="d-flex justify-content-between card-header-custom bg-primary text-white"><span
                     className="text-header">{Str.createAccreditation}</span>
                     <Link to={Address.accreditationPeriod()} className="d-inline-flex back-text text-decoration-none"><i
                         className="fa fa-arrow-left"/></Link>
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
                                         <ReactSelect name="orgTypeGUID" formik={props} options={orgTypes}/>
                                         <MyErrorForm errorFor="orgTypeGUID" formik={props}/>
                                     </div>
                                     <div className="col-12 col-md-4">
                                         <MyLabel htmlFor="title" label={Str.accreditationListTitle} isRequired={true}/>
                                         <MyTextInput name="title" formik={props}/>
                                         <MyErrorForm errorFor="title" formik={props}/>
                                     </div>
                                     <div className="col-12 col-md-4">
                                         <MyLabel htmlFor="sortOrder" label={Str.sort} isRequired={true}/>
                                         <MyTextInput name="sortOrder" formik={props}/>
                                         <MyErrorForm errorFor="sortOrder" formik={props}/>
                                     </div>
                                 </div>
                                 <div className="row">
                                     <div className="col-12 col-md-4">
                                         <MyLabel htmlFor="startDate" label={Str.fromDate} isRequired={true}/>
                                         <MyDatePicker formik={props} name="startDate"/>
                                         <MyErrorForm errorFor="startDate" formik={props}/>
                                     </div>
                                     <div className="col-12 col-md-4">
                                         <MyLabel htmlFor="endDate" label={Str.toDate} isRequired={false}/>
                                         <MyDatePicker formik={props} name="endDate"/>
                                         <MyErrorForm errorFor="endDate" formik={props}/>
                                     </div>
                                 </div>
                                 <div className="row my-4">
                                     <div className="col-12 col-md-4">
                                         <MyLabel htmlFor="isCurrent" label={Str.currentPeriod} isRequired={true}/>
                                         <MyCheckBox name="isCurrent" formik={props}/>
                                         <MyErrorForm errorFor="isCurrent" formik={props}/>
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
export default EditAccreditationPeriod