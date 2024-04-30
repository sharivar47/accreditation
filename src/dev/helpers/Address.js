export default class Address {
    static accreditationPeriod() {
        return '/accreditation-period'
    }
    static createAccreditationPeriod() {
        return '/create-accreditation-period'
    }
    static editAccreditationPeriod(id) {
        return `/edit-accreditation-period/${id}`
    }
}