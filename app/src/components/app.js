import { h, Component } from 'preact';
import { Router } from 'preact-router';

import { database, auth } from '../lib/firebase';

import Header from './header';
import Home from '../routes/home';
import Profile from 'async!../routes/profile';
import New from 'async!../routes/new';
import Search from 'async!../routes/search';
import Details from 'async!../routes/details';
import EditRecordInformation from 'async!../routes/editInformation';
import EditRecordNotes from 'async!../routes/editNotes';
import EditResumes from 'async!../routes/editResumes';
import NewProcess from 'async!../routes/newProcess';
import Login from '../routes/login';
import NotFound from '../routes/notFound';
import Spinner from './spinner';

function formatDisplayName(user) {
	return `${user.Firstname} ${user.Lastname}`;
}

export default class App extends Component {
	state = {
		isLoading: true,
		isAuth: false,
		user: null
	}

	componentWillMount() {
		this.disposeLoginSub = auth.onAuthStateChanged(user => {
  		if (user) {
  			database.ref('Users')
  				.child(user.uid)
  				.child('Profile')
  				.once('value')
  				.then(snapshot => {
  					const dbUser = Object.assign({
  						id: user.uid ,
  						displayName: formatDisplayName(snapshot.val())
  					}, snapshot.val());

  					this.setState({
		  				isLoading: false,
							isAuth: true,
							user: dbUser
		  			});
  				});
  		} else {
  			this.setState({
  				isLoading: false,
  				isAuth: false,
  				user: null
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

	handleSignOut(event) {
		event.preventDefault();
		auth.signOut();
	}

	render(_, { isLoading, isAuth, user }) {
		if(isLoading) {
			return <Spinner />
		} else if(!isLoading && !isAuth) {
			return <Login />
		}

console.log(user)
		return (
			<div id="app">
				<Header user={ user } signOut={ this.handleSignOut } />
				<div class="page-content">
					<Router onChange={this.handleRoute}>
  					<Home path="/" user={ user } />
            <Profile path="/profile" />
            <New path="/new" />
            <Search path="/search" />
            <Details path="/details/:type/:id" />
            <EditRecordInformation path="/edit-info/:type/:id" />
            <EditRecordNotes path="/edit/:fieldName/:type/:id" />
            <EditResumes path="/edit-resumes/:id" />
            <NewProcess path="/process/new" />
            <NotFound default />
					</Router>
				</div>
			</div>
		);
	}
}
