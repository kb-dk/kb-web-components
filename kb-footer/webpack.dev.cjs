module.exports = {
    /*
    * Devserver setup is specific to each webcomponent so we add it here
    * as well as other local dev configs specific to this webcomponent
    */
    devServer: {
        static: "./dist",
        historyApiFallback: true,
        proxy: {
            "/footerapi": {
                target: "https://www.kb.dk",
                changeOrigin: true,
                secure: true,
                pathRewrite: {"^/footerapi": ""},
            }
        }
    }
};