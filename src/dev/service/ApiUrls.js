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

}