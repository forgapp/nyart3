import { DefinePlugin } from 'webpack';

export default function(config, env, helpers) {
	config.plugins.push(
		new DefinePlugin({
			'process.env.API_KEY': JSON.stringify(process.env.API_KEY),
			'process.env.AUTH_DOMAIN': JSON.stringify(process.env.AUTH_DOMAIN),
			'process.env.DATABASE_URL': JSON.stringify(process.env.DATABASE_URL),
			'process.env.STORAGE_BUCKET': JSON.stringify(process.env.STORAGE_BUCKET)
		})
	);
}