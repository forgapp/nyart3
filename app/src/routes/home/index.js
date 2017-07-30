import { h, Component } from 'preact';

export default class Home extends Component {
	render() {
		return (
			<div>
				<div class="tile is-ancestor">
					<div class="tile is-vertical is-9">
						<div class="tile">
							<div class="tile is-parent is-vertical">
								<article class="tile is-child">
									<div class="card is-fullwidth">
										<div class="card-content">
											<div class="columns is-mobile flex-is-justify-content-center flex-is-align-items-center">
												<div class="column is-narrow">
			                    <p class="data-attributes-line">
			                        <span data-peity="{ 'height':64, 'width':64 }" style="display: none;">5,3,2,-1,-3,-2,2,3,5,2</span><svg class="peity" height="16" width="32"><polygon fill="#c6d9fd" points="0 9.875 0 0.5 3.5555555555555554 4.25 7.111111111111111 6.125 10.666666666666666 11.75 14.222222222222221 15.5 17.77777777777778 13.625 21.333333333333332 6.125 24.888888888888886 4.25 28.444444444444443 0.5 32 6.125 32 9.875"></polygon><polyline fill="none" points="0 0.5 3.5555555555555554 4.25 7.111111111111111 6.125 10.666666666666666 11.75 14.222222222222221 15.5 17.77777777777778 13.625 21.333333333333332 6.125 24.888888888888886 4.25 28.444444444444443 0.5 32 6.125" stroke="#4d89f9" stroke-width="1" stroke-linecap="square"></polyline></svg>
			                    </p>
			                	</div>
			                	<div class="column">
			                		<p class="title">3.5M</p>
			                    <p class="subtitle">This Quarter</p>
			                  </div>
		                  </div>
	                  </div>
                  </div>
                </article>
								<article class="tile is-child">
									<div class="card is-fullwidth">
										<div class="card-content">
											<div class="columns is-mobile flex-is-justify-content-center flex-is-align-items-center">
												<div class="column is-narrow">
			                    <p class="data-attributes-line">
			                        <span data-peity="{ 'height':64, 'width':64 }" style="display: none;">5,3,2,-1,-3,-2,2,3,5,2</span><svg class="peity" height="16" width="32"><polygon fill="#c6d9fd" points="0 9.875 0 0.5 3.5555555555555554 4.25 7.111111111111111 6.125 10.666666666666666 11.75 14.222222222222221 15.5 17.77777777777778 13.625 21.333333333333332 6.125 24.888888888888886 4.25 28.444444444444443 0.5 32 6.125 32 9.875"></polygon><polyline fill="none" points="0 0.5 3.5555555555555554 4.25 7.111111111111111 6.125 10.666666666666666 11.75 14.222222222222221 15.5 17.77777777777778 13.625 21.333333333333332 6.125 24.888888888888886 4.25 28.444444444444443 0.5 32 6.125" stroke="#4d89f9" stroke-width="1" stroke-linecap="square"></polyline></svg>
			                    </p>
			                	</div>
			                	<div class="column">
			                		<p class="title">12.5M</p>
			                    <p class="subtitle">Last Quarter</p>
			                  </div>
		                  </div>
	                  </div>
                  </div>
                </article>
              </div>
              <div class="tile is-parent is-9">Content</div>
            </div>
          </div>
          <div class="tile is-parent is-3">Other</div>
        </div>
      </div>
		);
	}
}
