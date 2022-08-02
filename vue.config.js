module.exports = {
	pages: {
		index: {
			//入口
			entry: 'src/main.js',
		},
	},
	lintOnSave: false ,// 关闭语法检查
	// 开启代理服务器
	devServer: {
	    proxy: {
	      '/api': {
	        target: 'http://localhost:8080/',
			pathRewrite:{'^/api':''}
	      },
	      // '/foo': {
	      //   target: '<other_url>'
	      // }
	    }
	  }
}
