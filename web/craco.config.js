const { whenDev } = require("@craco/craco");

module.exports = {
	devServer: whenDev(() => ({
        historyApiFallback: false,
		proxy: {
			'/court-of-appeal/api': {
				target: 'http://localhost:9991',
				pathRewrite: function(path, req) {
					return path.replace("/court-of-appeal/api", "/api");
				},
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