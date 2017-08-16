import { h, Component } from 'preact';
import { route } from 'preact-router';
import { auth, database } from '../../lib/firebase';
import { formatdateForInput } from '../../lib/date';
import Lookup from '../../components/lookup';

class NewProcess extends Component {
  state = {
    process: {
      Candidate: {
        Name: '',
        id: ''
      },
      Job: {
        Title: '',
        id: ''
      },
      Recruiter: {
        id: auth.currentUser.uid,
        Name: auth.currentUser.displayName
      },
      Application: {
        StageDate: formatdateForInput(new Date())
      }
    }
  }

  constructor() {
    super();

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.redirectToRecord = this.redirectToRecord.bind(this);
  }

  componentDidMount() {
    const { job, candidate } = this.props;

    if(job) {
      database.ref('Job')
        .child(job)
        .once('value')
        .then(snapshot => {
          const jobData = snapshot.val();
          const process = Object.assign(
            {},
            this.state.process,
            { Job: {
                Title: jobData.JobTitle,
                id: job
              }
            });

          this.setState({ process });
        });
    }

    if(candidate) {
      database.ref('Candidate')
        .child(candidate)
        .once('value')
        .then(snapshot => {
          const candidateData = snapshot.val();
          const process = Object.assign(
            {},
            this.state.process,
            { Candidate: {
                Name: `${candidateData.Firstname} ${candidateData.Lastname}`,
                id: candidate
              }
            });

          this.setState({ process });
        });
    }
  }





  handleSubmit(event) {
    event.preventDefault();

    database.ref('/Process')
      .push()
      .set(this.state.process)
      .then(() => {
        this.redirectToRecord();
      });
  }

  handleCancel(event) {
    event.preventDefault();
    this.redirectToRecord();
  }

  redirectToRecord() {
    const { job, candidate } = this.props;

    if (job) {
          route(`/details/job/${job}`);
        } else if (candidate) {
          route(`/details/candidate/${candidate}`);
        }
  }

/*
handleSubmit
handleChange
handleRecruiterSelect
handleCandidateSelect
handleCancel
handleJobSelect*/

  render(_, { process }) {
    return (<form onSubmit={ this.handleSubmit }>
    <div className="container">
      <div className="box">
    <div className="field is-horizontal">
      <div className="field-label is-normal">
        <label className="label">Candidate</label>
      </div>
      <div className="field-body">
        <div className="field is-grouped">
          <p className="control is-expanded">
            <Lookup
              index="record"
              type="Candidate"
              placeholder="Candidate Name"
              formatValue={ (item) => `${item.Firstname} ${item.lastname} (${item.JobTitle})` }
              handleClick={ this.handleCandidateSelect }
              value={ process.Candidate.Name }
            />
          </p>
        </div>
      </div>
    </div>

    <div className="field is-horizontal">
      <div className="field-label is-normal">
        <label className="label">Job</label>
      </div>
      <div className="field-body">
        <div className="field is-grouped">
          <p className="control is-expanded">
            <Lookup
              index="record"
              type="Candidate"
              placeholder="Candidate Name"
              formatValue={ (item) => `${item.JobTitle} (${item.Company.Name})` }
              handleClick={ this.handleJobSelect }
              value={ process.Job.Title }
            />
          </p>
        </div>
      </div>
    </div>

    <div className="field is-horizontal">
      <div className="field-label is-normal">
        <label className="label">Registration</label>
      </div>
      <div className="field-body">
        <Lookup
          index="config"
          type="user"
          placeholder="Recruiter"
          formatValue={ (item) => `${item.Firstname} ${item.Lastname}` }
          handleClick={ this.handleRecruiterSelect }
          value={ process.Recruiter.Name }
        />
        <div className="field">
          <p className="control is-expanded">
            <input id="Application.StageDate" className="input" type="date" placeholder="Date" value={ process.Application.StageDate } onChange={ this.handleChange } />
          </p>
        </div>
      </div>
    </div>

    <div className="field is-horizontal">
      <div className="field-label"></div>
      <div className="field-body">
        <div className="field is-grouped">
          <div className="control">
            <button type="submit" className="button is-primary">
              Save
            </button>
          </div>
          <div className="control">
            <button className="button" onClick={ this.handleCancel }>Cancel</button>
          </div>
        </div>
      </div>
    </div>
    </div>
    </div>
</form>);
  }
}

export default NewProcess;
