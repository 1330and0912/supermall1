const BASE_URL = process.env.NODE_ENV === 'production' ? 'supermall':'/'
module.exports = {
	configureWebpack: {
		resolve: {
			alias: {
				'common': '@/common',
				'assets': '@/assets',
				'components': '@/components',
				'network': '@/network',
				'views': '@/views'
			}
			
		}
	},
publicPath: process.env.NODE_ENV === 'production'
    ? '/supermall1/'
    : '/'
}