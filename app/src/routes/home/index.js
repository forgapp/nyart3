import { h, Component } from 'preact';
import { Link } from 'preact-router';
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
							<Stats label="Candidates" stat={ recordStats.Candidate || 0 } index="Candidate">
								<span class="icon">
									<i class="fa fa-user-o"></i>
								</span>
							</Stats>

							<Stats label="Jobs" stat={ recordStats.Job || 0 } index="Job">
								<span class="icon">
									<i class="fa fa-briefcase"></i>
								</span>
							</Stats>

							<Stats label="Contacts" stat={ recordStats.ClientContact || 0 } index="ClientContact">
								<span class="icon">
									<i class="fa fa-users"></i>
								</span>
							</Stats>

							<Stats label="Companies" stat={ recordStats.Company || 0 } index="Company">
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

	}
}
