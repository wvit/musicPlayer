module.exports = {
    baseUrl: './',
    assetsDir: './static',
    devServer: {
        proxy: 'http://10.100.115.152:2002'
    }
};