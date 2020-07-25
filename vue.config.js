// 每次修改都要重启服务器
module.exports = {
    devServer:{
        // 本地服务端口号
        port:"8090",
        // 当访问的路径有/jd就代理制 http://10.36.135.29:9999服务器
        proxy:{
            '/jd':{
                target:"http://10.36.135.29:9999",//代理请求数据
                ws:true,
                changeOrigin:true
            }
        }
    }
}