const { whenDev } = require("@craco/craco");

module.exports = {
    devServer: whenDev(() => ({
        historyApiFallback: true,
		proxy: {
			'/api': {
				target: 'http://localhost:9991',
				headers: {
					Connection: 'keep-alive',
					'X-Forwarded-Host': 'localhost:3000',
					'X-Forwarded-Proto': 'http'
				},
				changeOrigin: true
			}
		}
    }))
}