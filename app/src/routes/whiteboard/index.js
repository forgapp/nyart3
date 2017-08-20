import { h, Component } from 'preact';
import { Link } from 'preact-router';
import Elastic from '../../lib/elastic';
import Lookup from '../../components/lookup';
import { notVisible, atsCard, atsCardContent, clear } from './style.css';

export default class Whiteboard extends Component {
	state = {
		processes: {},
		recruiterName: ''
  }
  
  constructor(props) {
		super(props);

    this.getProcesses = this.getProcesses.bind(this);
		this.refresh = this.refresh.bind(this);
		this.handleRecruiterSelect = this.handleRecruiterSelect.bind(this);
	}

	componentDidMount() {
		this.processSearch = new Elastic()
      .setIndex('process')
      .setType('metadata');
    this.setState({ recruiterName: this.props.user.displayName });
    
    this.getProcesses(this.props.user.displayName)
  }
  
  getProcesses(recruiterName) {
    this.processSearch.query({
      "query": {
        "bool" : {
          "must" : [
            { "match": { "Recruiter.Name": recruiterName } }
          ]
        }
      }
    }).searchWithBody()
		.then(resp => {
      const processes = resp.hits.hits 
        .reduce((aggr, current) => {
          if(!aggr[current._source.CurrentStage]) {
            return Object.assign({}, aggr, {
              [current._source.CurrentStage]: [current._source]
            });
          }

          return Object.assign({}, aggr, {
            [current._source.CurrentStage]: [...aggr[current._source.CurrentStage], current._source]
          });
        }, {})
      
        this.setState({ processes });
      console.log('PROCESSES', processes)
    })
    .catch(err => console.log(err))
	}

	refresh(event) {
		event.preventDefault();
		const { recruiterName } = this.state;

		this.getProcesses(recruiterName)
	}

	handleRecruiterSelect(item) {
    const recruiterName = item.value;

    this.setState({ recruiterName });
  }

	render(_, { processes, recruiterName }) {
		return (<div>
      <div class="box">
        <nav class="level is-mobile">
          <div class="level-left">
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
				<div class="column">
          <h3 class="title is-6">Applications</h3>
            { processes.Application && processes.Application.map(item => (<div class={ `card ${atsCard}` }>
              <div class={ `card-content ${atsCardContent}` }>
                <p class="is-size-7">
                  <a href={ `/details/candidate/${item.Candidate.id}` }>{ item.Candidate.Name }</a>
                </p>
                <p class="is-size-7">
                  <a class="is-size-7" href={ `/details/job/${item.Job.id}` }>{ item.Job.Title }</a>
                  <span class="pull-right">{ item.CurrentStageDate }</span>
                  <span class={ clear }></span>
                </p>
              </div>
            </div>)) }
        </div>
        <div class="column">
          <h3 class="title is-6">Submittals</h3>
          { processes.Submittal && processes.Submittal.map(item => (<div class={ `card ${atsCard}` }>
              <div class={ `card-content ${atsCardContent}` }>
                <p class="is-size-7">
                  <a class="is-size-7" href={ `/details/candidate/${item.Candidate.id}` }>{ item.Candidate.Name }</a>
                </p>
                <p class="is-size-7">
                  <a class="is-size-7" href={ `/details/job/${item.Job.id}` }>{ item.Job.Title }</a>
                  <span class="pull-right">{ item.CurrentStageDate }</span>
                  <span class={ clear }></span>
                </p>
              </div>
            </div>)) }
        </div>
        <div class="column">
          <h3 class="title is-6">CCM1</h3>
          { processes['CCM1'] && processes['CCM1'].map(item => (<div class={ `card ${atsCard}` }>
              <div class={ `card-content ${atsCardContent}` }>
                <p class="is-size-7" class="is-size-7">
                  <a href={ `/details/candidate/${item.Candidate.id}` }>{ item.Candidate.Name }</a>
                </p>
                <p class="is-size-7">
                  <a href={ `/details/job/${item.Job.id}` }>{ item.Job.Title }</a>
                  <span class="pull-right">{ item.CurrentStageDate }</span>
                  <span class={ clear }></span>
                </p>
              </div>
            </div>)) }
        </div>
        <div class="column">
          <h3 class="title is-6">CCM2+</h3>
          { processes['CCM2+'] && processes['CCM2+'].map(item => (<div class={ `card ${atsCard}` }>
              <div class={ `card-content ${atsCardContent}` }>
                <p class="is-size-7">
                  <a href={ `/details/candidate/${item.Candidate.id}` }>{ item.Candidate.Name }</a>
                </p>
                <p class="is-size-7">
                  <a href={ `/details/job/${item.Job.id}` }>{ item.Job.Title }</a>
                  <span class="pull-right">{ item.CurrentStageDate }</span>
                  <span class={ clear }></span>
                </p>
              </div>
            </div>)) }
        </div>
        <div class="column">
          <h3 class="title is-6">Offers</h3>
          { processes.Offer && processes.Offer.map(item => (<div class={ `card ${atsCard}` }>
              <div class={ `card-content ${atsCardContent}` }>
                <p class="is-size-7">
                  <a href={ `/details/candidate/${item.Candidate.id}` }>{ item.Candidate.Name }</a>
                </p>
                <p class="is-size-7">
                  <a href={ `/details/job/${item.Job.id}` }>{ item.Job.Title }</a>
                  <span class="pull-right">{ item.CurrentStageDate }</span>
                  <span class={ clear }></span>
                </p>
              </div>
            </div>)) }
        </div>
        <div class="column">
          <h3 class="title is-6">Placements</h3>
          { processes.Placement && processes.Placement.map(item => (<div class={ `card ${atsCard}` }>
              <div class={ `card-content ${atsCardContent}` }>
                <p class="is-size-7">
                  <a href={ `/details/candidate/${item.Candidate.id}` }>{ item.Candidate.Name }</a>
                </p>
                <p class="is-size-7">
                  <a href={ `/details/job/${item.Job.id}` }>{ item.Job.Title }</a>
                  <span class="pull-right">{ item.CurrentStageDate }</span>
                  <span class={ clear }></span>
                </p>
              </div>
            </div>)) }
        </div>
			</div>
		</div>);

	}
}
