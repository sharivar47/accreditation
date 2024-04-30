import DateObject from "react-date-object";
import persian from "react-date-object/calendars/persian";
import gregorian from "react-date-object/calendars/gregorian";
import persian_fa from "react-date-object/locales/persian_fa";
import gregorian_en from "react-date-object/locales/gregorian_en";

export default class DateHelper {
     static serverDateTimeFormat = 'YYYY-MM-DDTHH:mm:ssZ';
     static dashFormat = 'YYYY-MM-DD';
     static slashFormat = 'YYYY/MM/DD'
    static toJalali(date, format = this.dashFormat) {
        const dateObject = new DateObject(date);
        return dateObject.convert(persian, persian_fa).format(format);
    }
    static toGregorianFormat(date, format = this.dashFormat) {
        const dateObject = new DateObject({
            date: date,
            calendar: persian,
            format: "YYYY/MM/DD",
            locale: persian_fa
        });
        return dateObject.convert(gregorian, gregorian_en).format(format);
    }
}