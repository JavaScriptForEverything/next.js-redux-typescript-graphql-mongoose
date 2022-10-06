module.exports = {
	reactStrictMode: true,
	redirects: () => [
		{
			source: '/notReady',
			destination: '/',
			permanent: false
		}
	]
}