module.exports = {
    baseUrl: './',
    assetsDir: './static',
    devServer: {
        proxy: 'http://10.100.115.145:2002'
    }
};