import Str from "../../dev/localization";
import {Link} from "react-router-dom";
import MyLabel from "../../components/form/MyLabel";
import MyTextInput from "../../components/form/MyTextInput";
import MyErrorForm from "../../components/form/MyErrorForm";
import {Formik} from "formik";
import * as Yup from "yup";
import Api from "../../dev/service/Api";
import ApiUrls from "../../dev/service/ApiUrls";
import {MyAlert} from "../../components/feature/MyAlert";
import { useDispatch } from "react-redux";
import {setToken} from "../../dev/redux/userInfoSlice";
import {jwtDecode} from "jwt-decode";
const Login = () => {
    const dispatch = useDispatch();
    const validationObj = Yup.object().shape({
        email: Yup.string().required(Str.requiredField),
        password: Yup.string().required(Str.requiredField),
    })
    const init = {email: "", password: ""}
    const save = async (data) => {
     const result = await Api.post(ApiUrls.login(), data)
        if (result.success) {
            const decoded = jwtDecode(result.data.accessToken);
            dispatch(setToken(result.data.accessToken))
          MyAlert.success(Str.successLogin)
        } else {
            MyAlert.error(Str.operationFail)
        }
    }
    return(
        <section className="ftco-section">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-12 col-lg-10">
                        <div className="wrap d-md-flex">
                            <div className="text-wrap p-4 p-lg-5 text-center d-flex align-items-center order-md-last">
                                <div className="text w-100">
                                    <h4 className="text-white">{Str.welcomeToLogin}</h4>
                                    <p>{Str.notRegisterYet}</p>
                                    <Link to={"/register"} className="outline-white-btn">{Str.register}</Link>
                                </div>
                            </div>
                            <div className="login-wrap p-4 p-lg-5">
                                <div className="d-flex">
                                    <div className="w-100">
                                        <h3 className="mb-4 text-center">{Str.login}</h3>
                                    </div>
                                </div>
                                <Formik enableReinitialize={true} validationSchema={validationObj} initialValues={init}
                                        onSubmit={save}>
                                    {
                                        (props) => {
                                            const {handleSubmit, resetForm} = props;
                                            return (<form onSubmit={(e) => {
                                                e.preventDefault();
                                                e.stopPropagation();
                                            }} className="signin-form">
                                                <div className="form-group mb-3">
                                                    <MyLabel htmlFor="email" label={Str.email}
                                                             isRequired={true}/>
                                                    <MyTextInput name="email" formik={props}/>
                                                    <MyErrorForm errorFor="email" formik={props}/>
                                                </div>
                                                <div className="form-group mb-3">
                                                    <MyLabel htmlFor="password" label={Str.password}
                                                             isRequired={true}/>
                                                    <MyTextInput name="password" formik={props}/>
                                                    <MyErrorForm errorFor="password" formik={props}/>
                                                </div>
                                                <div className="form-group d-md-flex">
                                                    <div className="col-12 mt-2 mb-3 d-flex justify-content-between">
                                                        <span className="text-info text-not-registered"><Link className="decoration-none" to={"/"}>{Str.forgetPassword}</Link></span>
                                                    </div>
                                                </div>
                                                <div className="form-group">
                                                    <button type="submit" onClick={() => handleSubmit()} className="form-control btn btn-primary text-white submit px-3">{Str.login}</button>
                                                </div>
                                            </form>)
                                        }
                                    }
                                 </Formik>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
export default Login