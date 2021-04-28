const path = require('path')
// scp -r /Users/stephen/VueProject/shouzhang-dev/shouzhang root@47.103.66.24:/usr/local/apache-tomcat-8.5.60/webapps
module.exports = {
	publicPath: './',
	configureWebpack: {
		resolve:{
			alias : {
				'assets': '@/assets',
				'components': '@/components',
				'icons': '@/icons',
				'network': '@/network',
				'views': '@/views',
				'utils': '@/utils'
			}
		},
	},
	devServer: {
	    // proxy: { 
	    //   '/api': {
	    //     'target': 'http://47.103.66.24:8080', //天气接口地址
	    //     'changeOrigin': true, // 跨域访问设置，true代表跨域
	    //     'pathRewrite': { // 路径改写规则
	    //       '^/api': '' // 以/proxy/为开头的改写为''
	    //     }
	    //   }
	    // }
		disableHostCheck:true
	},
	// plugins: [
	//     ['import', {
	//       libraryName: 'vant',
	//       libraryDirectory: 'es',
	//       style: true
	//     }, 'vant']
	//   ],
	  
    /**这里之后，还有第一行的path是跟svg有关系的配置**/
  chainWebpack: config => {
    const svgRule = config.module.rule('svg')
    // 清除已有的所有 loader。
    // 如果你不这样做，接下来的 loader 会附加在该规则现有的 loader 之后。
    svgRule.uses.clear()
    svgRule
      .test(/\.svg$/)
      .include.add(path.resolve(__dirname, './src/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
    const fileRule = config.module.rule('file')
    fileRule.uses.clear()
    fileRule
      .test(/\.svg$/)
      .exclude.add(path.resolve(__dirname, './src/icons'))
      .end()
      .use('file-loader')
      .loader('file-loader')
  }
}