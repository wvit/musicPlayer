import Vue from 'vue';
import Axios from 'axios';
import VueAxios from 'vue-axios';
import url from 'url';
import utils from '@/utils.js';
import store from '@/store.js';

let requestCount = 0;

Vue.prototype.$axios = Axios
Vue.use(VueAxios, Axios)

// 请求拦截,监听请求
Axios.interceptors.request.use(req => {
    showLoading(req.url);
    filtrationReqData(req);
    return req;
});

// 请求拦截,监听响应
Axios.interceptors.response.use(res => {
    requestCount--;
    if (requestCount === 0) {
        utils.query('body')[0].removeChild(utils.query('.loadingDom')[0]);
    }
    return res;
})

//请求出现loading图标
function showLoading(url) {
    requestCount++;
    const timeout = 6000;
    let timer = null;
    clearTimeout(timer)
    timer = setTimeout(() => {
        requestCount = 0;
    }, timeout)
    if (utils.query('.loadingDom').length === 0) {
        utils.loadingMove({
            color: ['#fff', store.state.config.mainColor],
            size: 50,
            width: 6,
            speed: 15,
            timeout
        });
    }
}

//检查过滤发送出去的数据
function filtrationReqData(req) {
    if (req.method === 'get') {
        const data = url.parse(req.url, true).query;
        let address = `${url.parse(req.url, true).pathname}?`;
        for (let key in data) {
            if (data[key] !== 'undefined') {
                address += `${key}=${data[key]}&`
            }
        }
        req.url = address.slice(0, -1)
    } else if (req.method === 'post') {
        const data = {};
        for (let key in req.data) {
            if (req.data[key] !== undefined) {
                data[key] = req.data[key]
            }
        }
        req.data = data;
    }
}

// Axios.defaults.transformRequest = [data => qs.stringify(data)];