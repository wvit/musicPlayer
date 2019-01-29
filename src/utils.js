import Vue from 'vue';

const utils = {
    //判断字符串为空
    judgeNull(string) {
        for (let item of string.split('')) {
            if (item !== " ") {
                return true;
            }
        }
    },
    //获取节点
    query(dom) {
        return document.querySelectorAll(dom);
    },
    //绑定事件
    bindEvent(obj, event, callback) {
        obj = obj.length ? obj : new Array(obj);
        obj.forEach((item, index) => {
            item.index = index;
            item.addEventListener(event, callback);
        });
    },
    //弹出提示
    showToast({
        text,
        time = 2000
    }) {
        this.query('.showHint').forEach(item => {
            item.style.display = "none";
        })
        const p = document.createElement('p');
        p.innerHTML = text;
        p.className = 'showHint'
        p.style.cssText =
            `
        position:fixed;
        top:50%;
        left:50%;
        transform:translate(-50%,-50%);
        background:rgba(0,0,0,0.5);
        min-width:60px;
        line-height:34px;
        text-align:center;
        border-radius:5px;
        color:#fff;
        font-size:14px;
        padding:0 30px;
        opacity: 0;
        transition:0.4s;
        -webkit-user-select: none;
        user-select: none;
        `;
        this.query('body')[0].appendChild(p);
        return new Promise(resolve => {
            setTimeout(resolve, 20);
        }).then(() => {
            p.style.cssText += `opacity: 1;`;
            return new Promise(resolve => {
                setTimeout(resolve, time);
            })
        }).then(() => {
            p.style.cssText += `opacity: 0;`;
            return new Promise(resolve => {
                setTimeout(resolve, 400);
            })
        }).then(() => {
            this.query('body')[0].removeChild(p);
            return new Promise(resolve => {
                resolve();
            })
        })
    },
    //上传文件
    upload(config) {
        let formData = new FormData();
        for (let key in config.data) {
            formData.append(key, config.data[key]);
        }
        return config.proto.$axios
            .post(config.url, formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            })
    },
    //轮播图
    bannerSwiper({
        swiperWrap,
        swiperSlide,
        swiperPage,
        pageClass,
        time = 3000
    }) {
        const swiper = this.query(swiperWrap)[0];
        const slide = this.query(swiperSlide);
        const slideWidth = slide[0].offsetWidth;
        const page = this.query(swiperPage);
        let num = 0;
        let timer = null;
        swiper.style.cssText += `width:${slideWidth*slide.length}px`;

        function autoMove() {
            clearInterval(timer);
            timer = setInterval(() => {
                num >= slide.length - 1 ? num = 0 : num++;
                move();
            }, time);
        }

        function move() {
            swiper.style.cssText += `margin-left:${-num*slideWidth}px`;
            if (pageClass) {
                page.forEach(item => {
                    item.classList.remove(pageClass);
                })
                page[num].classList.add(pageClass);
            }
        }

        autoMove();
        if (pageClass) {
            this.bindEvent(page, 'click', function () {
                num = this.index;
                move();
                autoMove();
            })
        }
    },
    //时间戳转日期
    getDate(time, onOff) {
        function judge(number) {
            return date[number]() < 10 ? `0${date[number]()}` : date[number]();
        }
        const date = new Date(time);
        const month = Number(judge('getMonth')) + 1;
        const transfromDate1 = `${judge('getFullYear')}-${month < 10 ? `0${month}` : month}-${judge('getDate')}`;
        const transfromDate2 = `${transfromDate1} ${judge('getHours')}:${judge('getMinutes')}:${judge('getSeconds')}`;
        return onOff ? transfromDate2 : transfromDate1;
    },
    //等待加载动画
    loadingMove({
        color,
        size,
        width,
        speed,
        timeout
    }) {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext("2d");
        const gradual = ctx.createLinearGradient(0, size, size, size);
        let rotate = 0;
        canvas.width = canvas.height = size;
        canvas.style.cssText = `  
                position: fixed;
                left: 50%;
                top: 45%;
                transform: translateX(-50%);
                z-index: 99999999;
                `
        gradual.addColorStop("0", color[0]);
        gradual.addColorStop("0.5", color[1]);
        ctx.strokeStyle = gradual;
        ctx.lineWidth = width;
        ctx.arc(size / 2, size / 2, size / 2 - width, 0, Math.PI * 2);
        ctx.stroke();
        canvas.className = 'loadingDom';
        this.query('body')[0].appendChild(canvas);
        let timeoutTimer = setTimeout(() => {
            if (this.query('.loadingDom').length > 0) {
                clearInterval(timer)
                this.query('body')[0].removeChild(this.query('.loadingDom')[0]);
                this.showToast({
                    text: '请求响应超时，请刷新'
                })
            }
        }, timeout);
        let timer = setInterval(() => {
            rotate += 10;
            canvas.style.transform = `translateX(-50%) rotate(${rotate}deg)`;
            if (this.query('.loadingDom').length === 0) {
                clearInterval(timer);
                clearTimeout(timeoutTimer);
            }
        }, speed);
    },
    //存储全局变量
    store: new Map(),
}

Vue.prototype.$utils = utils;

export default utils;