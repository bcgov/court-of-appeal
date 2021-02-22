const { whenDev } = require("@craco/craco");

module.exports = {
    devServer: whenDev(() => ({
        historyApiFallback: true,
		proxy: {
			'/api': {
				target: 'http://localhost:8080',
				headers: {
					Connection: 'keep-alive',
					'X-Forwarded-Host': 'localhost',
					'X-Forwarded-Port': '3000'
				},
				changeOrigin: true
			}
		}
    }))
}