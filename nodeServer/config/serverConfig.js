module.exports = {
    dbs: 'mongodb://localhost/musicPlayerData',
    server: {
        get host() {
            return '10.100.115.145'
        },
        get port() {
            return 2002
        }
    },
    redis: {
        get host() {
            return '127.0.0.1'
        },
        get port() {
            return 6379
        }
    },
    smtp: {
        get host() {
            return 'smtp.qq.com'
        },
        get user() {
            return '1083926534@qq.com'
        },
        get pass() {
            return 'egedypzltaubhcae'
        }
    },
    get sendCode() {
        return () => Math.random().toString(16).slice(2, 6).toUpperCase();
    },
    get expire() {
        return () => new Date().getTime() + 60 * 60 * 1000
    }
}