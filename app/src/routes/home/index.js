import { h, Component } from 'preact';
import { Link } from 'preact-router';
import Elastic from '../../lib/elastic';
import { RecordStats, ProcessStats } from '../../components/stats';
import Lookup from '../../components/lookup';
import { cards, notVisible } from './style.css';
import { getThisFiscalQuarter, getLastFiscalQuarter, getThisMonth, getLastMonth, formatPeriodRange } from '../../lib/date';

const dates = {
	THIS_FQ: getThisFiscalQuarter(),
	LAST_FQ: getLastFiscalQuarter(),
	THIS_MONTH: getThisMonth(),
	LAST_MONTH: getLastMonth()
};

export default class Home extends Component {
	state = {
		period: 'THIS_FQ',
		recordStats: {},
		processStats: {},
		recruiterName: ''
	}

	constructor(props) {
		super(props);

		this.refreshRecordStats = this.refreshRecordStats.bind(this);
		this.handleChangePeriod = this.handleChangePeriod.bind(this);
		this.refresh = this.refresh.bind(this);
		this.handleRecruiterSelect = this.handleRecruiterSelect.bind(this);
		this.refreshProcessStats = this.refreshProcessStats.bind(this);
	}

	componentDidMount() {
		this.recordSearch = new Elastic()
			.setIndex('record');
		this.processSearch = new Elastic()
			.setIndex('process');
		this.setState({ recruiterName: this.props.user.displayName });

		this.refreshRecordStats(dates[this.state.period], this.props.user.displayName);
		this.refreshProcessStats(dates[this.state.period], this.props.user.displayName);
	}

	refreshProcessStats(period, recruiterName) {
		this.processSearch
			.query(
{
				"query": {
					"bool" : {
						"must" : [
							{ "has_parent" : {
						"parent_type" : "metadata",
						"query" : {
							"match": { "Recruiter.Name": recruiterName }
						}
					} },


							{ "range": {
								"StageDate": {
									"gte" : period[0],
									"lte" : period[1]
								}
							}}
						]


					}

				},
				"aggs": {
					"types": {
						"terms": {
							"field": "_type"
						}
					}
				}
			}).searchWithBody()
			.then(resp => {
				const stats = resp.aggregations
					.types
					.buckets
					.reduce((aggr, curr) => {
						return Object.assign({}, aggr, {
							[curr.key]: curr.doc_count
						})
					}, {})
				this.setState({ processStats: stats });

			})
			.catch(err => console.log(err))
	}

	refreshRecordStats(period, recruiterName) {
		this.recordSearch
			.query({
				"query": {
					"bool" : {
						"must" : [
							{ "match": { "Recruiter.Name": recruiterName } },
							{ "range": {
								"RegistrationDate": {
									"gte" : period[0],
									"lte" : period[1]
								}
							}}
						]
					}
				},
				"aggs": {
					"types": {
						"terms": {
							"field": "_type",
							"size": 4
						}
					}
				}
			})
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

	handleChangePeriod(event) {
		const period = event.target.value;

		this.setState({ period });
	}

	refresh(event) {
		event.preventDefault();
		const { period, recruiterName } = this.state;

		this.refreshRecordStats(dates[period], recruiterName);
		this.refreshProcessStats(dates[period], recruiterName);
	}

	handleRecruiterSelect(item) {
    const recruiterName = item.value;

    this.setState({ recruiterName });
  }

	render(_, { recordStats, period, recruiterName, processStats }) {
		const periodRange = formatPeriodRange(dates[period]);

		return (<div>
      <div class="box">
        <nav class="level">
          <div class="level-left">
            <div class="level-item">
              <div class="field">
                <label class="label is-small">Period</label>
                <p class="control">
                  <span class="select">
                    <select value={ period } onChange={ this.handleChangePeriod }>
                      <option value="THIS_FQ">This Fiscal Quarter</option>
                      <option value="LAST_FQ">Last Fiscal Quarter</option>
                      <option value="THIS_MONTH">This Month</option>
                      <option value="LAST_MONTH">Last Month</option>
                    </select>
                  </span>
                </p>
              </div>
            </div>
            <div class="level-item">
						  <Lookup
                label="Recuiter"
                index="config"
                type="user"
                placeholder="Recruiter"
                formatValue={ (item) => `${item.Firstname} ${item.Lastname}` }
                handleClick={ this.handleRecruiterSelect }
                value={ recruiterName }
              />
            </div>
            <div class="level-item">
              <div class="field">
                <label class={ `label is-small ${notVisible}` }>Refresh</label>
                <button class="button" onClick={ this.refresh }>
                  <span class="icon">
                    <i class="fa fa-refresh"></i>
                  </span>
                </button>
              </div>
            </div>
          </div>
        </nav>
			</div>
			<div class="columns">
				<div class="column is-9">
					<div class="columns">
						<div class={ `column is-3 ${cards}` }>
							<RecordStats
								stats={ recordStats }
								period={ periodRange }
								recruiterName={ recruiterName }
							/>
						</div>
						<div class="column is-9">
							<div class="notification">
							  New Features will be added here soon.
							</div>
						</div>
					</div>
				</div>
				<div class={ `column ${cards}` }>
					<ProcessStats
						stats={ processStats }
								period={ periodRange }
								recruiterName={ recruiterName }
							/>


				</div>
			</div>
		</div>);

	}
}

/*

{
				"query": {
					"bool" : {
						"must" : [
							{ "has_parent" : {
						"parent_type" : "metadata",
						"query" : {
							"match": { "Recruiter.Name": 'Matt B' }
						}
					} },


							{ "range": {
								"StageDate": {
									"gte" : period[0],
									"lte" : period[1]
								}
							}}
						]


					}

				},
				"aggs": {
					"types": {
						"terms": {
							"field": "_type"
						}
					}
				}
			}*/