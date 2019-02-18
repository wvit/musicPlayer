const production = true;
module.exports = {
    baseUrl: './',
    assetsDir: './static',
    devServer: {
        proxy: `http://${production ? '132.232.114.236' : '10.100.115.145'}:1999`
    }
};