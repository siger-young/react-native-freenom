export default class WebHelper {
	static queryString(params) {
		let parts = [];
		for (let param in params) {
		if (params.hasOwnProperty(param))
			parts.push(`${param}=${encodeURIComponent(params[param])}`);
		}
		return parts.join('&');
	}
	static parseUrl(url) {
		const s1 = url.indexOf(':\/\/') === -1 ? 0 : url.indexOf(':\/\/');
		// console.log(s1);
		const s2 = s1 + 3;
		const protocol = url.slice(0, s1);
		// console.log('host');
		const s3 = url.indexOf('/', s2);
		const host = url.slice(s2, s3);
		// console.log(s3);
		const oppositePath = url.slice(s3 + 1).replace(/(\/+)*/g, '/');
		// console.log(`oppositePath: ${oppositePath}`);
		const segs = oppositePath.split('/');
		const pathSegs = segs.slice(0, -1);
		return {
			protocol,
			host,
			path: `/${pathSegs.join('/')}/`,
			absolutePath: `${protocol}://${host}/${pathSegs.join('/')}/`,
			segs,
		};
	}
}