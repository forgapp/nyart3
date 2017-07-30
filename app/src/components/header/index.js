import { h, Component } from 'preact';
import { Link } from 'preact-router/match';

class Header extends Component {
  state = { isOpen: false };

  toggleMenu(event) {
    event.preventDefault();

    this.setState({ isOpen: !this.state.isOpen });
  }

  render(props, { isOpen }) {
    const burgerMenuClass = isOpen ? 'navbar-burger burger is-active': 'navbar-burger burger';
    const mobileMenuClass = isOpen ? 'navbar-menu is-active': 'navbar-menu';

    return (<nav class="navbar">
      <div class="navbar-brand">
        <Link class="navbar-item" href="/">
          <img src="../assets/logo.png" alt="Nyart logo" />
        </Link>

        <Link class="navbar-item is-hidden-desktop" href="/search">
          <span class="icon" style="color: #333;">
            <i class="fa fa-search"></i>
          </span>
        </Link>

        <Link class="navbar-item is-hidden-desktop" href="/search">
          <p class="control">
            <Link class="button is-primary is-outlined" href="/new">
              <span class="icon">
                <i class="fa fa-plus"></i>
              </span>
              <span>New</span>
            </Link>
          </p>
        </Link>


        <div class={ burgerMenuClass } onClick={ this.toggleMenu.bind(this) }>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>

      <div class={ mobileMenuClass }>
        <div class="navbar-start">
          <Link class="navbar-item is-tab" activeClassName="is-active" href="/whiteboard">Whiteboard</Link>
          <Link class="navbar-item is-tab" activeClassName="is-active" href="/search">Search</Link>
        </div>
        <div class="navbar-end">
          <div class="navbar-item is-hidden-mobile">
            <p class="control">
              <Link class="button is-primary is-outlined" href="/new">
                <span class="icon">
                  <i class="fa fa-plus"></i>
                </span>
                <span>New</span>
              </Link>
            </p>
          </div>
          <Link class="navbar-item is-tab" activeClassName="is-active" href="/profile">Profile</Link>
        </div>
      </div>
    </nav>);
  }
}

export default Header;


/*<nav class={ `nav has-shadow ${style.isFixed}` }>
      <div class="container">
        <div class="nav-left">
          <Link class="nav-item" href="/">
            <img src="../assets/logo.png" alt="Nyart logo" />
          </Link>
    			<Link class="nav-item is-tab is-hidden-mobile" activeClassName="is-active" href="/whiteboard">Whiteboard</Link>
          <Link class="nav-item is-tab is-hidden-mobile" activeClassName="is-active" href="/search">Search</Link>
          <Link class="nav-item is-tab is-hidden-mobile" activeClassName="is-active" href="/new">New</Link>
    		</div>
    		<div class="nav-center">
    			<div class="nav-item">
    	      <div class="field has-addons">
    	        <p class="control">
    	          <input class="input is-small" type="text" placeholder="Search" />
    	        </p>
    					<p class="control">
    				    <a class="button is-info is-small">
    				      <i class={ `fa fa-search ${style.isSmall}` }></i>
    				    </a>
    					</p>
    				</div>
    			</div>
        </div>
        <span class="nav-toggle" onClick={ this.toggleMenu.bind(this) }>
          <span></span>
          <span></span>
          <span></span>
        </span>
        <div class={ mobileMenuClass }>
    			<Link class="nav-item is-tab is-hidden-tablet" activeClassName="is-active" href="/whiteboard" onClick={ this.toggleMenu.bind(this) }>Whiteboard</Link>
          <Link class="nav-item is-tab is-hidden-tablet" activeClassName="is-active" href="/search" onClick={ this.toggleMenu.bind(this) }>Search</Link>
          <Link class="nav-item is-tab is-hidden-tablet" activeClassName="is-active" href="/new" onClick={ this.toggleMenu.bind(this) }>New</Link>
          <Link class="nav-item is-tab" activeClassName="is-active" href="/profile" onClick={ this.toggleMenu.bind(this) }>
            <figure class="image is-32x32" style="margin-right: 8px;">
              <img src="https://secure.gravatar.com/avatar/5c95e668902a93a7b6be802ba5ea85f5?d=404&s=160" />
            </figure>
            Profile
          </Link>
          <a class="nav-item is-tab" onClick={ this.toggleMenu.bind(this) }>Log out</a>
        </div>
      </div>
    </nav>*/