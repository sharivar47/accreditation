import BaseHelper from "../helpers/BaseHelper";

export default class Api {
    static baseUrl = 'http://192.168.1.7:1111'

    static async get(url, config) {
        return this.send(url, 'get', null, config)
    }
    static async post(url, data , config) {
        return this.send(url, 'post', data, config)
    }
    static async put(url, data) {
        return this.send(url, 'put', data)
    }
    static async patch(url, data) {
        return this.send(url, 'patch', data)
    }
    static async delete(url, data = null) {
        return this.send(url, 'delete', data)
    }
    static async send(url, method ,data, config = {dataType: 'json', v1: true, silent: false}) {
        if (!config.silent) {
           BaseHelper.showLoading()
        }
        const init = {};
        init.method = method;
        if (method === 'post' || method === 'put' || method === 'patch' || method === 'delete') {
            if (config.dataType === 'url_encode') {
              init.body = new URLSearchParams(data);
              init.headers = {'Content-Type': 'application/x-www-form-urlencoded'}
            } else {
                init.body = JSON.stringify(data);
                init.headers = {'Content-Type': 'application/json'}
            }
        }

        if (config.v1) {
            url = this.baseUrl + '/api/v1/' + url
        } else {
            url = this.baseUrl + url
        }

        try {
            const response = await fetch(url, init);
            return new Response({ok: response.ok, status: response.status, data: await response.json()})
        } catch (e) {
            return new Response({ok: false, status: 400, data: null})
        } finally
        {
            if (!config.silent) {
                BaseHelper.hideLoading();
            }
        }
    }
}
class Response {
    constructor(r) {
        this.ok = r.ok;
        this.status = r.status;
        this.data = r.data
    }

    ok;
    status;
    data;
    get success() {
        return  this.status === 200;
    }
}