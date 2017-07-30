import { h, Component } from 'preact';
import { database } from '../../lib/firebase';
import { Tabs, Pane } from '../tabs';
import { levelTitle } from './style.css';
import Spinner from '../spinner';
import { Link } from 'preact-router';

import CandidateCard from '../candidate/card';

class CompanyDetails extends Component {
  state = {
    record: null,
    candidates: null
  }

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { id } = this.props;
    this.recordRef = database.ref('Company/' + id);

    this.candidateRef = database.ref("Candidate")
      .orderByChild("Company/id")
      .equalTo(id);

    this.candidateRef.on("value", (snapshot) => {
      console.log(snapshot.val())
      this.setState({ candidates: snapshot.val() });
    });

    this.recordRef.on('value', snapshot => {
      this.setState({ record: snapshot.val() });
    });
  }

  componentWillReceiveProps(nextProps, _) {
    if(nextProps.id !== this.props.id) {
      this.recordRef.off();
      this.recordRef = database.ref('Company/' + nextProps.id);
      this.recordRef.on('value', snapshot => {
        this.setState({ record: snapshot.val() });
      });
    }
  }

  componentWillUnmount() {
    this.recordRef.off();
    this.recordRef = null;
  }

  render({ id }, { record, candidates }) {
    if(!record) {
      return (<Spinner />);
    }

    return (<div class="box">
      <nav class="level">
        <div class="level-left">
          <div class="level-item">
            <div>
              <h3 class={ `title is-3 ${levelTitle}` }>{ record.Name }</h3>
              <h4 class="subtitle is-5">{ record.Type }</h4>
            </div>
          </div>
        </div>

        <div class="level-right">
          <div class="level-item">
            <div class="dropdown is-right is-hoverable">
              <div class="dropdown-trigger">
                <a class="button">
                  <span>Actions</span>
                  <span class="icon is-small">
                    <i class="fa fa-ellipsis-v"></i>
                  </span>
                </a>
              </div>
              <div class="dropdown-menu">
                <div class="dropdown-content">
                  <Link class="dropdown-item" href={ `/edit/Company/info/${id}` }>
                    Edit Information
                  </Link>
                  <a class="dropdown-item">
                    Add Candidate
                  </a>
                  <a class="dropdown-item">
                    Add Client Contact
                  </a>
                  <a class="dropdown-item">
                    Add Job
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <Tabs>
        <Pane label="Information">
          <div id="information" class="columns">
            <div class="column">
              <table>
                <tr>
                  <td>RegistrationDate</td>
                  <td>{ record.RegistrationDate }</td>
                </tr>
                <tr>
                  <td>RecruiterName</td>
                  <td>{ record.RecruiterName }</td>
                </tr>
                <tr>
                  <td>Source</td>
                  <td>{ record.Source }</td>
                </tr>
              </table>
            </div>
            <div class="column">
              Industries
            </div>
            <div class="column">
              Phones
              Emails
              Addresses
            </div>
          </div>
        </Pane>
        <Pane label="Profile">
         My notes
        </Pane>

        <Pane label="Client Contacts">
         Client Contacts
        </Pane>

        <Pane label="Candidates">
          <div class="columns is-multiline">
            { candidates && Object.keys(candidates).map(key => (<div class="column is-3">
              <CandidateCard id={ key } candidate={ candidates[key] } />
            </div>)) }
          </div>
        </Pane>

        <Pane label="Jobs">
         Jobs
        </Pane>
      </Tabs>
      </div>);
  }
}

export default CompanyDetails;





