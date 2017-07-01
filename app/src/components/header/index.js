import { h, Component } from 'preact';
import { Link } from 'preact-router/match';
import style from './style';

const Header = () => (<nav class={ `nav has-shadow ${style.isFixed}` }>
  <div class="container">
    <div class="nav-left">
      <Link class="nav-item" href="/">
        <img src="http://bulma.io/images/bulma-logo.png" alt="Bulma logo" />
      </Link>
			<Link class="nav-item is-tab is-hidden-mobile" activeClassName="is-active" href="/">Dashboard</Link>
			<Link class="nav-item is-tab is-hidden-mobile" activeClassName="is-active" href="/whiteboard">Whiteboard</Link>
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
    <span class="nav-toggle">
      <span></span>
      <span></span>
      <span></span>
    </span>
    <div class="nav-right nav-menu">
			<Link class="nav-item is-tab is-hidden-tablet" activeClassName="is-active" href="/">Dashboard</Link>
			<Link class="nav-item is-tab is-hidden-tablet" activeClassName="is-active" href="/whiteboard">Whiteboard</Link>
      <Link class="nav-item is-tab is-hidden-tablet" activeClassName="is-active" href="/new">New</Link>
      <Link class="nav-item is-tab" activeClassName="is-active" href="/profile">
        <figure class="image is-32x32" style="margin-right: 8px;">
          <img src="https://secure.gravatar.com/avatar/5c95e668902a93a7b6be802ba5ea85f5?d=404&s=160" />
        </figure>
        Profile
      </Link>
      <a class="nav-item is-tab">Log out</a>
    </div>
  </div>
</nav>);

export default  Header;






// export default class Header extends Component {
// 	render() {
// 		return (
// 			<header class={style.header}>
// 				<h1>Nyart</h1>
// 				<nav>
// 					<Link activeClassName={style.active} href="/">Home</Link>
// 					<Link activeClassName={style.active} href="/profile">Me</Link>
// 					<Link activeClassName={style.active} href="/profile/john">John</Link>
// 				</nav>
// 			</header>
// 		);
// 	}
// }
