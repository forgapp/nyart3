import { h, Component } from 'preact';
import Elastic from '../../lib/elastic';
import Stats from '../../components/stats';
import { cards } from './style.css'

export default class Home extends Component {
	state = { recordStats: {} }

	componentDidMount() {
		this.elastic = new Elastic();
		this.elastic
			.setIndex('record')
			.query({
  "query": {
    "range": {
      "RegistrationDate": {
				"gte" : '2017-08-01',
				"lte" : '2017-08-31'
            }
    }
  },
  "aggs": {
    "types": {
      "terms": {
        "field": "_type", 
        "size": 4
      }
    }
  }})
			.searchWithBody()
			.then(resp => {
				const stats = resp.aggregations
					.types
					.buckets
					.reduce((aggr, curr) => {
						return Object.assign({}, aggr, {
							[curr.key]: curr.doc_count
						})
					}, {})
				this.setState({ recordStats: stats })
					
			})
			.catch(err => console.log(err))
	}

	render(_, { recordStats }) {
		return (<div>
			<div class="box is-hidden">
				Selector
			</div>
			<div class="columns">
				<div class="column is-9">
					<div class="columns">
						<div class={ `column is-3 ${cards}` }>
							<Stats label="Candidates" stat={ recordStats.Candidate || 0 }>
								<span class="icon">
									<i class="fa fa-user-o"></i>
								</span>
							</Stats>

							<Stats label="Jobs" stat={ recordStats.Job || 0 }>
								<span class="icon">
									<i class="fa fa-briefcase"></i>
								</span>
							</Stats>

							<Stats label="Contacts" stat={ recordStats.ClientContact || 0 }>
								<span class="icon">
									<i class="fa fa-users"></i>
								</span>
							</Stats>

							<Stats label="Companies" stat={ recordStats.Company || 0 }>
								<span class="icon">
									<i class="fa fa-building-o"></i>
								</span>
							</Stats>
						</div>
						<div class="column is-9">
							content
						</div>
					</div>
				</div>
				<div class={ `column ${cards}` }>
					<Stats label="Applications" stat={ 26 }>
						<span class="icon">
							<i class="fa fa-user-o"></i>
						</span>
					</Stats>

					<Stats label="Submittals" stat={ 9 }>
						<span class="icon">
							<i class="fa fa-user-o"></i>
						</span>
					</Stats>

					<Stats label="CCM1" stat={ 10 }>
						<span class="icon">
							<i class="fa fa-user-o"></i>
						</span>
					</Stats>

					<Stats label="CCM2+" stat={ 7 }>
						<span class="icon">
							<i class="fa fa-user-o"></i>
						</span>
					</Stats>

					<Stats label="Offers" stat={ 3 }>
						<span class="icon">
							<i class="fa fa-user-o"></i>
						</span>
					</Stats>

					<Stats label="Placements" stat={ 1 }>
						<span class="icon">
							<i class="fa fa-user-o"></i>
						</span>
					</Stats>

			   
				</div>
			</div>
		</div>);

		// return (
		// 	<div>
		// 		<div class="tile is-ancestor">
		// 			<div class="tile is-vertical is-9">
		// 				<div class="tile">
		// 					<div class="tile is-parent is-vertical">
		// 						<article class="tile is-child">
		// 							<div class="card is-fullwidth">
		// 								<div class="card-content">
		// 									<div class="columns is-mobile flex-is-justify-content-center flex-is-align-items-center">
		// 										<div class="column is-narrow">
		// 	                    <span class="icon">
		// 												<i class="fa fa-user-o"></i>
		// 											</span>
		// 	                	</div>
		// 	                	<div class="column">
		// 	                		<p><span class="is-size-4">7</span> Candidates</p>
		// 	                  </div>
		//                   </div>
	  //                 </div>
    //               </div>
    //             </article>
		// 						<article class="tile is-child">
		// 							<div class="card is-fullwidth">
		// 								<div class="card-content">
		// 									<div class="columns is-mobile flex-is-justify-content-center flex-is-align-items-center">
		// 										<div class="column is-narrow">
		// 	                    <p class="data-attributes-line">
		// 	                        <span data-peity="{ 'height':64, 'width':64 }" style="display: none;">5,3,2,-1,-3,-2,2,3,5,2</span><svg class="peity" height="16" width="32"><polygon fill="#c6d9fd" points="0 9.875 0 0.5 3.5555555555555554 4.25 7.111111111111111 6.125 10.666666666666666 11.75 14.222222222222221 15.5 17.77777777777778 13.625 21.333333333333332 6.125 24.888888888888886 4.25 28.444444444444443 0.5 32 6.125 32 9.875"></polygon><polyline fill="none" points="0 0.5 3.5555555555555554 4.25 7.111111111111111 6.125 10.666666666666666 11.75 14.222222222222221 15.5 17.77777777777778 13.625 21.333333333333332 6.125 24.888888888888886 4.25 28.444444444444443 0.5 32 6.125" stroke="#4d89f9" stroke-width="1" stroke-linecap="square"></polyline></svg>
		// 	                    </p>
		// 	                	</div>
		// 	                	<div class="column">
		// 	                		<p><span class="is-size-4">0</span> Client Contacts</p>
		// 	                  </div>
		//                   </div>
	  //                 </div>
    //               </div>
    //             </article>
		// 						<article class="tile is-child">
		// 							<div class="card is-fullwidth">
		// 								<div class="card-content">
		// 									<div class="columns is-mobile flex-is-justify-content-center flex-is-align-items-center">
		// 										<div class="column is-narrow">
		// 	                    <p class="data-attributes-line">
		// 	                        <span data-peity="{ 'height':64, 'width':64 }" style="display: none;">5,3,2,-1,-3,-2,2,3,5,2</span><svg class="peity" height="16" width="32"><polygon fill="#c6d9fd" points="0 9.875 0 0.5 3.5555555555555554 4.25 7.111111111111111 6.125 10.666666666666666 11.75 14.222222222222221 15.5 17.77777777777778 13.625 21.333333333333332 6.125 24.888888888888886 4.25 28.444444444444443 0.5 32 6.125 32 9.875"></polygon><polyline fill="none" points="0 0.5 3.5555555555555554 4.25 7.111111111111111 6.125 10.666666666666666 11.75 14.222222222222221 15.5 17.77777777777778 13.625 21.333333333333332 6.125 24.888888888888886 4.25 28.444444444444443 0.5 32 6.125" stroke="#4d89f9" stroke-width="1" stroke-linecap="square"></polyline></svg>
		// 	                    </p>
		// 	                	</div>
		// 	                	<div class="column">
		// 											<p><span class="is-size-4">4</span> Jobs</p>
		// 	                  </div>
		//                   </div>
	  //                 </div>
    //               </div>
    //             </article>
		// 						<article class="tile is-child">
		// 							<div class="card is-fullwidth">
		// 								<div class="card-content">
		// 									<div class="columns is-mobile flex-is-justify-content-center flex-is-align-items-center">
		// 										<div class="column is-narrow">
		// 	                    <p class="data-attributes-line">
		// 	                        <span data-peity="{ 'height':64, 'width':64 }" style="display: none;">5,3,2,-1,-3,-2,2,3,5,2</span><svg class="peity" height="16" width="32"><polygon fill="#c6d9fd" points="0 9.875 0 0.5 3.5555555555555554 4.25 7.111111111111111 6.125 10.666666666666666 11.75 14.222222222222221 15.5 17.77777777777778 13.625 21.333333333333332 6.125 24.888888888888886 4.25 28.444444444444443 0.5 32 6.125 32 9.875"></polygon><polyline fill="none" points="0 0.5 3.5555555555555554 4.25 7.111111111111111 6.125 10.666666666666666 11.75 14.222222222222221 15.5 17.77777777777778 13.625 21.333333333333332 6.125 24.888888888888886 4.25 28.444444444444443 0.5 32 6.125" stroke="#4d89f9" stroke-width="1" stroke-linecap="square"></polyline></svg>
		// 	                    </p>
		// 	                	</div>
		// 	                	<div class="column">
		// 											<p><span class="is-size-4">1</span> Clients</p>
		// 	                  </div>
		//                   </div>
	  //                 </div>
    //               </div>
    //             </article>
    //           </div>
    //           <div class="tile is-parent is-9">Content</div>
    //         </div>
    //       </div>
    //       <div class="tile is-vertical is-parent is-3">
		// 				<article class="tile is-child">
		// 					<div class="card is-fullwidth">
		// 						<div class="card-content">
		// 							<div class="columns is-mobile flex-is-justify-content-center flex-is-align-items-center">
		// 								<div class="column is-narrow">
		// 									<p class="data-attributes-line">
		// 											<span data-peity="{ 'height':64, 'width':64 }" style="display: none;">5,3,2,-1,-3,-2,2,3,5,2</span><svg class="peity" height="16" width="32"><polygon fill="#c6d9fd" points="0 9.875 0 0.5 3.5555555555555554 4.25 7.111111111111111 6.125 10.666666666666666 11.75 14.222222222222221 15.5 17.77777777777778 13.625 21.333333333333332 6.125 24.888888888888886 4.25 28.444444444444443 0.5 32 6.125 32 9.875"></polygon><polyline fill="none" points="0 0.5 3.5555555555555554 4.25 7.111111111111111 6.125 10.666666666666666 11.75 14.222222222222221 15.5 17.77777777777778 13.625 21.333333333333332 6.125 24.888888888888886 4.25 28.444444444444443 0.5 32 6.125" stroke="#4d89f9" stroke-width="1" stroke-linecap="square"></polyline></svg>
		// 									</p>
		// 								</div>
		// 								<div class="column">
		// 									<p class="title is-4">0</p>
		// 									<p class="subtitle is-6">Applications</p>
		// 								</div>
		// 							</div>
		// 						</div>
		// 					</div>
		// 				</article>
		// 				<article class="tile is-child">
		// 					<div class="card is-fullwidth">
		// 						<div class="card-content">
		// 							<div class="columns is-mobile flex-is-justify-content-center flex-is-align-items-center">
		// 								<div class="column is-narrow">
		// 									<p class="data-attributes-line">
		// 											<span data-peity="{ 'height':64, 'width':64 }" style="display: none;">5,3,2,-1,-3,-2,2,3,5,2</span><svg class="peity" height="16" width="32"><polygon fill="#c6d9fd" points="0 9.875 0 0.5 3.5555555555555554 4.25 7.111111111111111 6.125 10.666666666666666 11.75 14.222222222222221 15.5 17.77777777777778 13.625 21.333333333333332 6.125 24.888888888888886 4.25 28.444444444444443 0.5 32 6.125 32 9.875"></polygon><polyline fill="none" points="0 0.5 3.5555555555555554 4.25 7.111111111111111 6.125 10.666666666666666 11.75 14.222222222222221 15.5 17.77777777777778 13.625 21.333333333333332 6.125 24.888888888888886 4.25 28.444444444444443 0.5 32 6.125" stroke="#4d89f9" stroke-width="1" stroke-linecap="square"></polyline></svg>
		// 									</p>
		// 								</div>
		// 								<div class="column">
		// 									<p class="title is-4">4</p>
		// 									<p class="subtitle is-6">Submittals</p>
		// 								</div>
		// 							</div>
		// 						</div>
		// 					</div>
		// 				</article>
		// 				<article class="tile is-child">
		// 					<div class="card is-fullwidth">
		// 						<div class="card-content">
		// 							<div class="columns is-mobile flex-is-justify-content-center flex-is-align-items-center">
		// 								<div class="column is-narrow">
		// 									<p class="data-attributes-line">
		// 											<span data-peity="{ 'height':64, 'width':64 }" style="display: none;">5,3,2,-1,-3,-2,2,3,5,2</span><svg class="peity" height="16" width="32"><polygon fill="#c6d9fd" points="0 9.875 0 0.5 3.5555555555555554 4.25 7.111111111111111 6.125 10.666666666666666 11.75 14.222222222222221 15.5 17.77777777777778 13.625 21.333333333333332 6.125 24.888888888888886 4.25 28.444444444444443 0.5 32 6.125 32 9.875"></polygon><polyline fill="none" points="0 0.5 3.5555555555555554 4.25 7.111111111111111 6.125 10.666666666666666 11.75 14.222222222222221 15.5 17.77777777777778 13.625 21.333333333333332 6.125 24.888888888888886 4.25 28.444444444444443 0.5 32 6.125" stroke="#4d89f9" stroke-width="1" stroke-linecap="square"></polyline></svg>
		// 									</p>
		// 								</div>
		// 								<div class="column">
		// 									<p class="title is-4">4</p>
		// 									<p class="subtitle is-6">CCM1</p>
		// 								</div>
		// 							</div>
		// 						</div>
		// 					</div>
		// 				</article>
		// 				<article class="tile is-child">
		// 					<div class="card is-fullwidth">
		// 						<div class="card-content">
		// 							<div class="columns is-mobile flex-is-justify-content-center flex-is-align-items-center">
		// 								<div class="column is-narrow">
		// 									<p class="data-attributes-line">
		// 											<span data-peity="{ 'height':64, 'width':64 }" style="display: none;">5,3,2,-1,-3,-2,2,3,5,2</span><svg class="peity" height="16" width="32"><polygon fill="#c6d9fd" points="0 9.875 0 0.5 3.5555555555555554 4.25 7.111111111111111 6.125 10.666666666666666 11.75 14.222222222222221 15.5 17.77777777777778 13.625 21.333333333333332 6.125 24.888888888888886 4.25 28.444444444444443 0.5 32 6.125 32 9.875"></polygon><polyline fill="none" points="0 0.5 3.5555555555555554 4.25 7.111111111111111 6.125 10.666666666666666 11.75 14.222222222222221 15.5 17.77777777777778 13.625 21.333333333333332 6.125 24.888888888888886 4.25 28.444444444444443 0.5 32 6.125" stroke="#4d89f9" stroke-width="1" stroke-linecap="square"></polyline></svg>
		// 									</p>
		// 								</div>
		// 								<div class="column">
		// 									<p class="title is-4">4</p>
		// 									<p class="subtitle is-6">CCM2+</p>
		// 								</div>
		// 							</div>
		// 						</div>
		// 					</div>
		// 				</article>
		// 				<article class="tile is-child">
		// 					<div class="card is-fullwidth">
		// 						<div class="card-content">
		// 							<div class="columns is-mobile flex-is-justify-content-center flex-is-align-items-center">
		// 								<div class="column is-narrow">
		// 									<p class="data-attributes-line">
		// 											<span data-peity="{ 'height':64, 'width':64 }" style="display: none;">5,3,2,-1,-3,-2,2,3,5,2</span><svg class="peity" height="16" width="32"><polygon fill="#c6d9fd" points="0 9.875 0 0.5 3.5555555555555554 4.25 7.111111111111111 6.125 10.666666666666666 11.75 14.222222222222221 15.5 17.77777777777778 13.625 21.333333333333332 6.125 24.888888888888886 4.25 28.444444444444443 0.5 32 6.125 32 9.875"></polygon><polyline fill="none" points="0 0.5 3.5555555555555554 4.25 7.111111111111111 6.125 10.666666666666666 11.75 14.222222222222221 15.5 17.77777777777778 13.625 21.333333333333332 6.125 24.888888888888886 4.25 28.444444444444443 0.5 32 6.125" stroke="#4d89f9" stroke-width="1" stroke-linecap="square"></polyline></svg>
		// 									</p>
		// 								</div>
		// 								<div class="column">
		// 									<p class="title is-4">4</p>
		// 									<p class="subtitle is-6">Offer</p>
		// 								</div>
		// 							</div>
		// 						</div>
		// 					</div>
		// 				</article>
		// 				<article class="tile is-child">
		// 					<div class="card is-fullwidth">
		// 						<div class="card-content">
		// 							<div class="columns is-mobile flex-is-justify-content-center flex-is-align-items-center">
		// 								<div class="column is-narrow">
		// 									<p class="data-attributes-line">
		// 											<span data-peity="{ 'height':64, 'width':64 }" style="display: none;">5,3,2,-1,-3,-2,2,3,5,2</span><svg class="peity" height="16" width="32"><polygon fill="#c6d9fd" points="0 9.875 0 0.5 3.5555555555555554 4.25 7.111111111111111 6.125 10.666666666666666 11.75 14.222222222222221 15.5 17.77777777777778 13.625 21.333333333333332 6.125 24.888888888888886 4.25 28.444444444444443 0.5 32 6.125 32 9.875"></polygon><polyline fill="none" points="0 0.5 3.5555555555555554 4.25 7.111111111111111 6.125 10.666666666666666 11.75 14.222222222222221 15.5 17.77777777777778 13.625 21.333333333333332 6.125 24.888888888888886 4.25 28.444444444444443 0.5 32 6.125" stroke="#4d89f9" stroke-width="1" stroke-linecap="square"></polyline></svg>
		// 									</p>
		// 								</div>
		// 								<div class="column">
		// 									<p class="title is-4">4</p>
		// 									<p class="subtitle is-6">Placements</p>
		// 								</div>
		// 							</div>
		// 						</div>
		// 					</div>
		// 				</article>
		// 			</div>
    //     </div>
    //   </div>
		// );
	}
}
