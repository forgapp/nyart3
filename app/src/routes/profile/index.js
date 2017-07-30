import { h, Component } from 'preact';

export default class Profile extends Component {
	render() {
		return (<div class="container">
				<section class="hero is-primary">
				  <div class="hero-body">
				    <div class="container">
				      <h1 class="title">
				        My Profile
				      </h1>
				    </div>
				  </div>
				</section>
				<section class="section">
					<div class="columns">
						<div class="column is-2 is-hidden-mobile">
							<figure class="image is-128x128">
								<img src="https://avatars1.githubusercontent.com/u/1654514" />
							</figure>
						</div>
						<div class="column">
							<form>
								<div class="field">
									<label class="label">Firstname</label>
									<p class="control">
										<input class="input" type="text" placeholder="Firtname" />
									</p>
								</div>
								<div class="field">
									<label class="label">Lastname</label>
									<p class="control">
										<input class="input" type="text" placeholder="Lastname" />
									</p>
								</div>
								<div class="field">
									<label class="label">Email</label>
									<p class="control">
										<input class="input" type="email" placeholder="Email" />
									</p>
								</div>
								<div class="field">
									<p class="control">
										<button class="button is-success" type="submit">Save</button>
									</p>
								</div>
							</form>
						</div>
					</div>
				</section>
				<section class="hero is-primary">
				  <div class="hero-body">
				    <div class="container">
				      <h1 class="title">
				        Change Password
				      </h1>
				    </div>
				  </div>
				</section>
				<section class="section">
					<div class="column">
						<form>
							<div class="field">
								<label class="label">New password</label>
								<p class="control">
									<input class="input" type="password" placeholder="Password" />
								</p>
							</div>
							<div class="field">
								<label class="label">Retype new password</label>
								<p class="control">
									<input class="input" type="password" placeholder="Password" />
								</p>
							</div>
							<div class="field">
								<p class="control">
									<button class="button is-success" type="submit">Save</button>
								</p>
							</div>
						</form>
					</div>
				</section>
			</div>
		);
	}
}
