import { h, Component } from 'preact';
import { Link } from 'preact-router/match';
import style from './style';

export default class NotFound extends Component {
	render({ matches }, state) {
    	  return (<main class={ `is-flex-mobile is-flex-tablet-only is-flex-desktop-only is-flex-widescreen flex-is-align-items-center flex-is-justify-content-center ${style.isCentered}` }>
            <div class="columns">
                <div class="column flex-is-justify-content-center flex-is-align-items-center">
                    <div class="content">
                        <h1 class={ `title is-1 has-text-centered is-marginless error-header ${style.isRed}` }>40x</h1>
                        <h2 class="title has-text-centered color-is-black">Not Found</h2>
                        <p class={ `has-text-centered ${style.content}` }>
                            It's looking like you may have taken a wrong turn.<br />
                            Don't worry... it happens to the best of us
                        </p>
                        <div class="has-text-centered">
                            <Link class={ `has-text-centered button ${style.isPurpleOutlined}` } href="/" style="margin-left:auto;margin-right:auto;">To Front Page</Link>
                        </div>
                    </div>
                </div>
            </div>
        </main>);
	}
}