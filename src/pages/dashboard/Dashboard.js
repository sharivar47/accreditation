import {Card, CardBody, CardHeader} from "reactstrap";
import {Formik} from "formik";
import MyLabel from "../../components/form/MyLabel";
import MyTextInput from "../../components/form/MyTextInput";
import MyErrorForm from "../../components/form/MyErrorForm";
import ReactSelect from "../../components/form/ReactSelect";
import MyCheckBox from "../../components/form/MyCheckBox";
import {MyRadioButton} from "../../components/form/MyRadioButton";
import MyDatePicker from "../../components/form/MyDatePicker";
import MyTextArea from "../../components/form/MyTextArea";
import MyTextEditor from "../../components/form/textEditor/MyTextEditor";
import MyFileInput from "../../components/form/MyFileInput";
import Api from "../../dev/service/Api";
import ApiUrls from "../../dev/service/ApiUrls";
import {useEffect, useState} from "react";
import Grid from "../../components/grid/Grid";
import * as Yup from "yup";

const Dashboard = () => {
    const [data, setData] = useState([]);
    const [totalCount, setTotalCount] = useState(0)
    const columns = [
        {
            label: 'شناسه',
            value: row => <span style={{width: "200px"}} >{row.id}</span>,
            display: "id"
        },
        {
            label: 'عنوان',
            value: row => row.title,
            display: "title"
        },
        {
            label: 'توضیحات',
            value: row => row.body,
            display: "body"
        }
    ];
    useEffect(() => {
        getUsers()
    }, [])
    const getUsers = async () => {
         const response = await Api.get(ApiUrls.getPosts())
         if (response.success) {
             setData(response.data)
             setTotalCount(response.data.length)
         }
    }
    const FILE_SIZE = 1024 * 1024; // 1MB
    const SUPPORTED_FORMATS = ['image/jpg', 'image/jpeg', 'image/png'];
    const validationObj = Yup.object().shape({
        firstName: Yup.string().required('این فیلد ضروری است'),
        app: Yup.string().required('این فیلد ضروری است'),
        active: Yup.boolean().required('این فیلد ضروری است'),
        birthDate: Yup.string().nullable(),
        file: Yup.mixed().test('fileSize', 'حجم فایل بیشتر از اندازه مجاز است', (value) => {
                return !value || (value && value.size <= FILE_SIZE);
            }).test('fileFormat', 'نوع فایل اشتباه است', (value) => {
                return !value || (value && SUPPORTED_FORMATS.includes(value.type));
            }),
        gender: Yup.string().nullable(),

    })
    return (<Card>
        <CardHeader>تست</CardHeader>
        <CardBody>
         <div className="row">
             <div className="col-12">
                 <Formik validationSchema={validationObj} initialValues={{firstName: "", app: "", active: false, file: "", text: "", gender: "", birthDate: ""}} onSubmit={() => console.log('ds')}>
                     {(props) => {
                         const { handleSubmit} = props;
                         console.log(props.errors)
                         return (<form onSubmit={(e) => {
                             e.preventDefault()
                             e.stopPropagation()
                         }} className="text-right">
                             <div className="row py-1">
                                 <div className="col-12 col-md-4 py-1">
                                     <MyLabel htmlFor="firstName" label="نام" isRequired={true}/>
                                     <MyTextInput name="firstName" placeholder="فاطمه" formik={props}/>
                                     <MyErrorForm errorFor="firstName" formik={props}/>
                                 </div>
                                 <div className="col-12 col-md-4 py-1">
                                     <MyLabel htmlFor="app" label="نرم افزار" isRequired={true}/>
                                     <ReactSelect options={[]} name="app" formik={props}/>
                                     <MyErrorForm errorFor="app" formik={props}/>
                                 </div>
                             </div>
                             <div className="row py-1">
                                 <div className="col-12 col-md-4 py-1">
                                     <MyLabel htmlFor="active" label="فعال" isRequired={true}/>
                                     <MyCheckBox name="active" formik={props}/>
                                     <MyErrorForm errorFor="active" formik={props}/>
                                 </div>
                             </div>
                             <div className="row">
                                 <div className="col-12 col-md-4 py-1">
                                     <MyLabel htmlFor="gender" label="جنسیت" isRequired={true}/>
                                     <MyRadioButton options={[{label: "زن", value: "1"}, {label: "مرد", value: "2"}]} name="gender" formik={props}/>
                                     <MyErrorForm errorFor="gender" formik={props}/>
                                 </div>
                             </div>
                             <div className="row py-1">
                                 <div className="col-12 col-md-4 mb-3">
                                     <MyLabel htmlFor="birthDate" label="تاریخ تولد" isRequired={false}/>
                                     <MyDatePicker formik={props} name="birthDate"/>
                                     <MyErrorForm errorFor="birthDate" formik={props}/>
                                 </div>
                             </div>
                             <div className="row py-1">
                                 <div className="col-12 col-md-4 mb-3">
                                     <MyLabel htmlFor="address" label="آدرس" isRequired={false}/>
                                     <MyTextArea placeholder="شیراز،بلوار کریم خان زند کوچه1" formik={props} name="address"/>
                                     <MyErrorForm errorFor="address" formik={props}/>
                                 </div>
                             </div>
                             <div className="row py-1">
                                 <div className="col-12 col-md-4 mb-3">
                                     <MyLabel htmlFor="text" label="متن" isRequired={false}/>
                                     <MyTextEditor formik={props} name="text"/>
                                     <MyErrorForm errorFor="text" formik={props}/>
                                 </div>
                             </div>
                             <div className="row py-1">
                                 <div className="col-12 col-md-4 mb-3">
                                     <div>
                                         <MyLabel htmlFor="file" label="فایل اپلود" isRequired={false}/>
                                         <span className="image-upload-tip px-1">(فایل باید از نوع jpg,jpeg,png باشد و حجم فایل کمتر از 1 مگابایت باشد)</span>
                                     </div>
                                     <MyFileInput placeholder="انتخاب فایل" formik={props} name="file"/>
                                     <MyErrorForm errorFor="file" formik={props}/>
                                 </div>
                             </div>
                             <div className="row py-1">
                                 <div className="col-12 mt-3 mb-1">
                                     <button className="btn btn-info" onClick={() => handleSubmit()}>ذخیره</button>
                                 </div>
                             </div>
                         </form>)
                     }}
                 </Formik>
             </div>
             <div className="col-12">
                 <Grid
                     expandableRow={false}
                     columns={columns}
                     rows={data}
                     totalCount={totalCount}
                     goToPage={(page) => console.log(page)}
                     getPageSize={(ps) => console.log(ps)}
                     checkable={false}
                     sorted={(state) => setData(state)}
                     sort={{key: "id", direction: "asc"}}
                 />
             </div>
         </div>
        </CardBody>
    </Card>)
}
export default Dashboard