const path = require('path')
module.exports = {
    configureWebpack:{
        resolve: {
            alias: {
                "@": path.resolve(__dirname, './src')
            }
        },
        devServer: {
            proxy: {
                "/": {
                    target: "http://localhost:6060/",
                    pathRewrite: {
                        "^/api" : ""
                    }
                }
            }
        }
        
        
    }
}