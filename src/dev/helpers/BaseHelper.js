 class BaseHelper {
    static numberRange(from, length) {
        return Array.from({length}, (_, k) => k + from);
    }
    static toSelectApp(data) {
       return data.map(item => {
            return {label: item.name, value: item.id}
        })
    }
    static hideLoading() {
        document.querySelector('.lds-container').classList.add('hide')
    }
    static showLoading() {
        document.querySelector('.lds-container').classList.remove('hide')
    }
}
export default BaseHelper