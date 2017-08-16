import { h, Component } from 'preact';
import Elastic from '../../lib/elastic';
import CompanyCard from '../../components/company/card';
import CandidateCard from '../../components/candidate/card';
import ClientContactCard from '../../components/clientContact/card';
import JobCard from '../../components/job/card';

export default class Search extends Component {
  state = {
    results: null,
    searchText: ''
  }

  constructor(props) {
    super(props);

    this.elastic = new Elastic();
    this.elastic
      .setIndex('record')
			.size(10);

    this.handleSearchTextChanged = this.handleSearchTextChanged.bind(this);
		this.handleSearch = this.handleSearch.bind(this);
		this.search = this.search.bind(this);
	}
	
	componentDidMount() {
		if (this.props.q) {
			this.setState({ searchText: this.props.q })
			this.search(this.props.q);
		}
	}

  handleSearchTextChanged(event) {
    this.setState({ searchText: event.target.value });
  }

  handleSearch(event) {
		event.preventDefault();
		
		this.search(this.state.searchText);
	}
		
	search(searchText) {
		this.elastic
      .query(searchText)
      .search()
      .then(results => {
        this.setState({ results })
      })
      .catch(err => console.log(err));
	}

  renderCard(type) {
    switch(type) {
      case 'Company':
        return CompanyCard;
      case 'Candidate':
				return CandidateCard;
			case 'ClientContact':
				return ClientContactCard;
			case 'Job':
        return JobCard;
      default:
        return null;
    }
  }

	render({ matches }, { searchText, results }) {
	  return (<div>
	  <div class="container">
	    <div class="box">
	      <div class="columns">
	        <div class="column is-10">
	          <form onSubmit={ this.handleSearch }>
      	      <div class="field has-addons">
      	        <p class="control is-expanded">
      	          <input class="input" type="text" placeholder="Search" value={ searchText } onChange={ this.handleSearchTextChanged }/>
                </p>
                <p class="control">
                  <button type="Submit" class="button">Seach</button>
                </p>
                <p class="control is-hidden">
                  <span class="select">
                    <select>
                      <option>Views</option>
                      <option>My Candidates</option>
                      <option>My Jobs</option>
                      <option>My Companies</option>
											<option>My Contacts</option>
                    </select>
                  </span>
                </p>
              </div>
            </form>
          </div>
          <div class="column is-hidden">
            <a class="button is-link">Advanced</a>
          </div>
        </div>
	    </div>
	   </div>

	   <div class="columns is-multiline">
	    { results && results.hits.hits.map(result => {
	      const CardComponent = this.renderCard(result._type);

	      return (<div class="column is-3">
  	        <CardComponent id={ result._id } record={ result._source} />
  	      </div> )
  	   }) }
	   </div>

    </div>);
	}
}

/*
 <div class="columns is-multiline">
	      <div class="column is-3">
	        <CompanyCard />
	      </div>
	      <div class="column is-3">
	        <CandidateCard />
	      </div>
	      <div class="column is-3">
	        <ClientContactCard />
        </div>
	      <div class="column is-3">
	        <JobCard />
	      </div>
	      <div class="column is-3">
	        <CompanyCard />
	      </div>
	      <div class="column is-3">
	        <CandidateCard />
	      </div>
	      <div class="column is-3">
	        <ClientContactCard />
        </div>
	      <div class="column is-3">
	        <JobCard />
	      </div>
	      <div class="column is-3">
	        <CompanyCard />
	      </div>
	      <div class="column is-3">
	        <CandidateCard />
	      </div>
	      <div class="column is-3">
	        <ClientContactCard />
        </div>
	      <div class="column is-3">
	        <JobCard />
	      </div>
	      <div class="column is-3">
	        <CompanyCard />
	      </div>
	      <div class="column is-3">
	        <CandidateCard />
	      </div>
	      <div class="column is-3">
	        <ClientContactCard />
        </div>
	      <div class="column is-3">
	        <JobCard />
	      </div>
	      <div class="column is-3">
	        <CompanyCard />
	      </div>
	      <div class="column is-3">
	        <CandidateCard />
	      </div>
	      <div class="column is-3">
	        <ClientContactCard />
        </div>
	      <div class="column is-3">
	        <JobCard />
	      </div>
	      <div class="column is-3">
	        <CompanyCard />
	      </div>
	      <div class="column is-3">
	        <CandidateCard />
	      </div>
	      <div class="column is-3">
	        <ClientContactCard />
        </div>
	      <div class="column is-3">
	        <JobCard />
	      </div>
	      <div class="column is-3">
	        <CompanyCard />
	      </div>
	      <div class="column is-3">
	        <CandidateCard />
	      </div>
	      <div class="column is-3">
	        <ClientContactCard />
        </div>
	      <div class="column is-3">
	        <JobCard />
	      </div>
	      <div class="column is-3">
	        <CompanyCard />
	      </div>
	      <div class="column is-3">
	        <CandidateCard />
	      </div>
	      <div class="column is-3">
	        <ClientContactCard />
        </div>
	      <div class="column is-3">
	        <JobCard />
	      </div>
	      <div class="column is-3">
	        <CompanyCard />
	      </div>
	      <div class="column is-3">
	        <CandidateCard />
	      </div>
	      <div class="column is-3">
	        <ClientContactCard />
        </div>
	      <div class="column is-3">
	        <JobCard />
	      </div>
	      <div class="column is-3">
	        <CompanyCard />
	      </div>
	      <div class="column is-3">
	        <CandidateCard />
	      </div>
	      <div class="column is-3">
	        <ClientContactCard />
        </div>
	      <div class="column is-3">
	        <JobCard />
	      </div>*/