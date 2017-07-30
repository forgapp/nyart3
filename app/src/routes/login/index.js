import { h, Component } from 'preact';
import { auth } from '../../lib/firebase';

class Login extends Component {
  state = {
    email: '',
    passord: '',
    error: null
  }

  constructor() {
    super();

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleLoginError = this.handleLoginError.bind(this);
  }

  handleChange(event) {
    event.preventDefault();

    this.setState({ [event.target.id]: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.setState({ error: null });

    const { email, password } = this.state;

    auth.signInWithEmailAndPassword(email, password)
      .catch(this.handleLoginError);
  }

  handleLoginError(error) {
    this.setState({ error: 'Sign in error. Check your Email or password.' });
  }

  render(_, { email, password, error }) {
    return (<div className="container">
      <div className="box">
        <h3 class="is-3">Login</h3>
        <form onSubmit={ this.handleSubmit }>
          <div class="field is-horizontal">
            <div class="field-label is-normal">
              <label class="label">Email</label>
            </div>
            <div class="field-body">
              <div class="field">
                <div class="control">
                  <input id="email" type="email" id="email" class="input" type="text" placeholder="xxx@yyy.com" value={ email } onChange={ this.handleChange } />
                </div>
              </div>
            </div>
          </div>

          <div class="field is-horizontal">
            <div class="field-label is-normal">
              <label class="label">Password</label>
            </div>
            <div class="field-body">
              <div class="field">
                <div class="control">
                  <input id="password" type="password" class="input" placeholder="password" value={ password } onChange={ this.handleChange } />
                </div>
              </div>
            </div>
          </div>

          <div class="field is-horizontal">
            <div class="field-label"></div>
            <div class="field-body">
              <div class="field">
                <div class="control">
                  <button type="submit" class="button is-primary">
                    Sign In
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
      { error && <div class="notification is-danger">
        { error }
      </div> }
    </div>);
  }
}

export default Login;