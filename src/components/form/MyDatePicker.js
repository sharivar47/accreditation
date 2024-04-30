import DatePicker from "react-multi-date-picker";
import DateObject from "react-date-object";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";

const MyDatePicker = ({formik, name}) => {
    const {setFieldValue, values} = formik;

    const value = values[name];
    return (<div className="datepicker-container">
        <i className="fa fa-calendar-alt"/>
        <DatePicker
            value={value}
            name={name}
            onChange={(date) => {
                const newDate = date ?? new DateObject({ calendar: persian, locale: persian_fa })
                setFieldValue(name, newDate.format())
            }}
            calendar={persian}
            placeholder="4/06/1371"
            locale={persian_fa}
            calendarPosition="top-right"
        />
    </div>
    )
}
export default MyDatePicker