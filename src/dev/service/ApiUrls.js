export default class ApiUrls {
    static query(parameters) {
        return '?' + new URLSearchParams(parameters).toString()
    }
    static getPosts() {
        return '/posts'
    }
    static getCredibilityList(query) {
        return `etebar-doreh/list${query}`
    }
    static getOrgType() {
        return 'org-type/select-list'
    }
    static saveAccreditationPeriod() {
        return 'etebar-doreh'
    }
    static deleteAccreditationPeriod(id) {
        return `etebar-doreh/${id}`
    }
    static getAccreditation(id) {
        return `etebar-doreh/${id}`
    }
    static editAccreditation(id) {
        return `etebar-doreh/${id}`
    }
    static changeStatusAccreditationPeriod(id) {
      return `etebar-doreh/logical-delete/${id}`
    }
    static login() {
        return 'user/login'
    }
    static getAxises(id, query) {
        return `mehvar/list/${id}${query}`
    }
    static createAxis() {
        return 'mehvar'
    }
    static changeStatusAxis(id) {
        return `Mehvar/logical-delete/${id}`
    }
    static editAxis(id) {
        return `mehvar/${id}`
    }
    static getAxis(id) {
        return `mehvar/${id}`
    }
    static getSelectAccreditation(query) {
        return `etebar-doreh/select-list${query}`
    }
    static getSubAxises(id, query) {
        return `zirmehvar/list/${id}${query}`
    }
    static changeStatusSubAxis(id) {
        return `zirmehvar/logical-delete/${id}`
    }
    static createSubAxis() {
        return 'zirmehvar'
    }
    static getSubAxis(id) {
        return `zirmehvar/${id}`
    }
    static editSubAxis(id) {
        return `zirmehvar/edit/${id}`
    }
    static changeStatusStandard(id) {
        return `standard/logical-delete/${id}`
    }
    static getStandards(subAxisId, query) {
        return `standard/list/${subAxisId}${query}`
    }
    static getStandard(id) {
        return `getbyid/${id}`
    }
    static editStandard(id) {
        return `standard/${id}`
    }
    static createStandard() {
        return 'standard'
    }
}