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
    static getAxises(query) {
        return `/axises${query}`
    }
    static createAxis() {
        return '/create-axis'
    }
    static editAxis(id) {
        return `/edit-axis/${id}`
    }
    static createSubAxis(query) {
        return `/create-sub-axis${query}`
    }
    static editSubAxis(id) {
        return `/edit-sub-axis/${id}`
    }
    static subAxises(query) {
        return `/sub-axises${query}`
    }
    static standards(query) {
        return `/standards${query}`
    }
    static createStandard(query) {
        return `/create-standard${query}`
    }
    static editStandard(id) {
        return `/edit-standard/${id}`
    }
}