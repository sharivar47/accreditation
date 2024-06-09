import BaseHelper from "../helpers/BaseHelper";
import {Repo} from "../redux/store";
import axios from "axios";

export default class Api {
    static baseUrl = 'http://192.168.1.7:1111'

    static async get(url, config) {
        return this.send(url, 'get', null, config)
    }

    static async post(url, data, config) {
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

    static async send(route, method = 'get', body = {}, options = {silent: false}) {
        if (!options.silent) {
            BaseHelper.showLoading()
        }
        try {
            const headers = {}
            const config = {};
            config.method = method.toLocaleLowerCase();
            config.url = this.baseUrl + '/api/v1/' + route;
            config.data = body;
            this.addAuthHeader(headers);
            config.headers = headers;
        const response = await axios.request(config);
            if (response?.status === 401) {
                Repo.logout()
            }
            return {data: response?.data, status: response?.status, success: response?.status === 200 || 204};
        } catch (e) {
            return new Response({status: e.response?.status, data: e.response?.data, success: false})
        } finally {
            if (!options.silent) {
                BaseHelper.hideLoading();
            }
        }
    }

    static addAuthHeader(headers) {
        const token = Repo.token();
        if (token !== "") {
            headers.Authorization = `Bearer ${token}`
        }
        return headers;
    }
}

class Response {
    constructor(r) {
        this.status = r.status;
        this.data = r.data
    }

    status;
    data;

    get success() {
        return this.status === 200;
    }
}