import { DefinePlugin } from 'webpack';

export default function(config, env, helpers) {
	config.plugins.push(
		new DefinePlugin({
			'process.env': {
				API_KEY: JSON.stringify(process.env.API_KEY),
        authDomain: JSON.stringify('nyart-dev-fd843.firebaseapp.com'),
        databaseURL: JSON.stringify('https://nyart-dev-fd843.firebaseio.com/')
			}
		})
	);
}