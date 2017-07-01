import './style';
import 'font-awesome/css/font-awesome.min.css';
// import App from './components/app';
import 'bulma/css/bulma.css';

import { h, Component } from 'preact';
import { Router } from 'preact-router';

import Header from './components/header';
import Home from './pages/home';
import Profile from './pages/profile';
// import Profile from './routes/profile';
// import Home from 'async!./home';
// import Profile from 'async!./profile';

class App extends Component {
	/** Gets fired when the route changes.
	 *	@param {Object} event		"change" event from [preact-router](http://git.io/preact-router)
	 *	@param {string} event.url	The newly routed URL
	 */
	handleRoute = e => {
		this.currentUrl = e.url;
	};

	render() {
		return (
			<div id="app">
				<Header />
        <div class="main-container">
  				<Router onChange={this.handleRoute}>
  					<Home path="/" />
            <Profile path="/profile" />
  				</Router>
        </div>
			</div>
		);
	}
}

export default App;
