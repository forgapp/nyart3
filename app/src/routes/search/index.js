import { h, Component } from 'preact';
import CompanyCard from '../../components/company/card';
import CandidateCard from '../../components/candidate/card';
import ClientContactCard from '../../components/clientContact/card';
import JobCard from '../../components/job/card';

export default class Search extends Component {
  constructor(props) {
    super(props);
  }

	render({ matches }, state) {
	  return (<div>
	  <div class="container">
	    <div class="box">
	      <div class="columns">
	        <div class="column is-10">
    	      <div class="field has-addons">
    	        <p class="control is-expanded">
    	          <input class="input" type="text" placeholder="Search" />
              </p>
              <p class="control is-hidden">
                <span class="select">
                  <select>
                    <option>Views</option>
                    <option>My Candidates</option>
                    <option>My Jobs</option>
                    <option>My Companies</option>
                  </select>
                </span>
              </p>
            </div>
          </div>
          <div class="column is-hidden">
            <a class="button is-link">Advanced</a>
          </div>
        </div>
	    </div>
	   </div>

	      <div> Query: { matches.query }</div>
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
	      </div>

	     </div>
    </div>);
	}
}
