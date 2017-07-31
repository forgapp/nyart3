import { h, Component } from 'preact';
import { Router } from 'preact-router';

import { auth } from '../lib/firebase';

import Header from './header';
import Home from '../routes/home';
import Profile from 'async!../routes/profile';
import New from 'async!../routes/new';
import Search from 'async!../routes/search';
import Details from 'async!../routes/details';
import EditRecordInformation from 'async!../routes/editInformation';
import EditRecordNotes from 'async!../routes/editNotes';
import Login from '../routes/login';
import NotFound from '../routes/notFound';
import Spinner from './spinner';

export default class App extends Component {
	state = {
		isLoading: true,
		isAuth: false
	}

	componentWillMount() {
		this.disposeLoginSub = auth.onAuthStateChanged(user => {
  		if (user) {
  			this.setState({
  				isLoading: false,
  				isAuth: true
  			});
  		} else {
  			this.setState({
  				isLoading: false,
  				isAuth: false
  			});
  		}
		});
	}

	componentWillUnmount() {
		this.disposeLoginSub();
	}

	handleRoute = e => {
		this.currentUrl = e.url;
	};

	render(_, { isLoading, isAuth }) {
		if(isLoading) {
			return <Spinner />
		} else if(!isLoading && !isAuth) {
			return <Login />
		}


		return (
			<div id="app">
				<Header />
				<div class="page-content">
					<Router onChange={this.handleRoute}>
  					<Home path="/" />
            <Profile path="/profile" />
            <New path="/new" />
            <Search path="/search" />
            <Details path="/details/:type/:id" />
            <EditRecordInformation path="/edit-info/:type/:id" />
            <EditRecordNotes path="/edit/:fieldName/:type/:id" />
            <NotFound default />
					</Router>
				</div>
			</div>
		);
	}
}
