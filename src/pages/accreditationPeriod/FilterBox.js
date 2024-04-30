import { Card, CardBody, CardHeader, Collapse} from "reactstrap";
import {useState} from "react";
import {Formik} from "formik";
import MyLabel from "../../components/form/MyLabel";
import MyTextInput from "../../components/form/MyTextInput";
import MyErrorForm from "../../components/form/MyErrorForm";
import * as Yup from "yup";
import BaseHelper from "../../dev/helpers/BaseHelper";
import Str from "../../dev/localization";


const FilterBox = ({getFilters}) => {
    const [isOpen, setIsOpen] = useState(false)
    const toggle = () => {
        setIsOpen(!isOpen)
    }
    const save = (model) => {
        getFilters(model)
    }
    const validationObj = Yup.object().shape({
        firstName: Yup.string().nullable(),
        lastName: Yup.string().nullable(),
        userName: Yup.string().nullable(),
        phoneNumber: Yup.string().nullable().matches(/^(0|0098|\+98)9(0[1-5]|[1 3]\d|2[0-2]|98)\d{7}/, 'الگوی شماره موبایل نادرست است'),
        nationalCode: Yup.string().nullable().test('is-valid-national-code', 'الگوی کد ملی نادرست است', value => BaseHelper.isValidIranianNationalCode(value)),
        email: Yup.string().nullable().matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g, 'الگوی ایمیل نادرست است'),
    })
    const handleReset = (props) => {
        props.resetForm();
        getFilters({})
    };
    return(<Card>
        <CardHeader>
        <span className="d-flex pb-2" onClick={toggle}>
            <span className="ml-auto font-weight-bold">{Str.filter}</span>
            <i className="fa fa-caret-down" aria-hidden="true" ></i>
        </span>
    </CardHeader>
        <Collapse isOpen={isOpen}>
            <CardBody>
                <Formik validationSchema={validationObj} initialValues={{firstName: "", lastName: "", nationalCode: "", email: "", userName: "", phoneNumber: ""}} onSubmit={save}>
                    {(props) => {
                        const { handleSubmit} = props;
                        return(<form onSubmit={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                        }} className="search-form-container">
                                <div className="row">
                                    <div className="col-12 col-md-4">
                                        <MyLabel htmlFor="firstName" label="نام" isRequired={false}/>
                                        <MyTextInput name="firstName" formik={props}/>
                                        <MyErrorForm errorFor="firstName" formik={props}/>
                                    </div>
                                    <div className="col-12 col-md-4">
                                        <MyLabel htmlFor="lastName" label="نام خانوادگی" isRequired={false}/>
                                        <MyTextInput name="lastName" formik={props}/>
                                        <MyErrorForm errorFor="lastName" formik={props}/>
                                    </div>
                                    <div className="col-12 col-md-4">
                                        <MyLabel htmlFor="nationalCode" label="کدملی" isRequired={false}/>
                                        <MyTextInput name="nationalCode" formik={props}/>
                                        <MyErrorForm errorFor="nationalCode" formik={props}/>
                                    </div>
                                </div>
                            <div className="row mb-2">
                                <div className="col-12 col-md-4">
                                    <MyLabel htmlFor="email" label="ایمیل" isRequired={false}/>
                                    <MyTextInput name="email" formik={props}/>
                                    <MyErrorForm errorFor="email" formik={props}/>
                                </div>
                                <div className="col-12 col-md-4">
                                    <MyLabel htmlFor="userName" label="نام کاربری" isRequired={false}/>
                                    <MyTextInput name="userName" formik={props}/>
                                    <MyErrorForm errorFor="userName" formik={props}/>
                                </div>
                                <div className="col-12 col-md-4">
                                    <MyLabel htmlFor="phoneNumber" label="شماره تلفن" isRequired={false}/>
                                    <MyTextInput name="phoneNumber" formik={props}/>
                                    <MyErrorForm errorFor="phoneNumber" formik={props}/>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-12 text-center">
                                    <button onClick={() => handleSubmit()} className="btn btn-primary">جستجو</button>
                                    <button onClick={() => handleReset(props)} className="btn btn-danger">پاک کردن همه</button>
                                </div>
                            </div>
                            </form>)
                    }}
                </Formik>
            </CardBody>
        </Collapse>
    </Card>)
}
export default FilterBox