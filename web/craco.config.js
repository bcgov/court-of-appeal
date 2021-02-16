const { whenDev } = require("@craco/craco");

module.exports = {
    devServer: whenDev(() => ({
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