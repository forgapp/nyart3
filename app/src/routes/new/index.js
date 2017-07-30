import { h, Component } from 'preact';
import { route } from 'preact-router';
import { database } from '../../lib/firebase';
import getRecordDefaultValue from '../../lib/defaultRecords';
import CandidateAddForm from '../../components/candidate/addForm';
import JobAddForm from '../../components/job/addForm';
import CompanyAddForm from '../../components/company/addForm';
import ClientContactddForm from '../../components/clientContact/addForm';

class AddRecord extends Component {
  state = {
    selectedType: '',
    record: null
  }

  constructor() {
    super();

    this.handleTypeSelection = this.handleTypeSelection.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleRecruiterSelect = this.handleRecruiterSelect.bind(this);
    this.handleCompanySelect = this.handleCompanySelect.bind(this);
    this.handleClientContactSelect = this.handleClientContactSelect.bind(this);
  }

  handleChange(event) {
    const record = Object.assign(
      {},
      this.state.record,
      { [event.target.id]: event.target.value }
    );

    this.setState({ record });
  }

  handleRecruiterSelect(item) {
    const recruiter = {
      Recruiter: {
        id: item.id,
        Name: item.value
      }
    };

    const record = Object.assign(
      {},
      this.state.record,
      recruiter
    );

    this.setState({ record });
  }

  handleCompanySelect(item) {
    const company = {
      Company: {
        id: item.id,
        Name: item.value
      }
    };

    const record = Object.assign(
      {},
      this.state.record,
      company
    );

    this.setState({ record });
  }

  handleClientContactSelect(item) {
    const clientContact = {
      ClientContact: {
        id: item.id,
        Name: item.value
      }
    };

    const record = Object.assign(
      {},
      this.state.record,
      clientContact
    );

    this.setState({ record });
  }

  handleTypeSelection(event) {
    const selectedType = event.target.value;
    this.recordRef = database.ref(`/${selectedType}`).push();

    this.setState({
      selectedType,
      record: getRecordDefaultValue(selectedType)
    });
  }

  handleSubmit(event) {
    event.preventDefault();

    this.recordRef.set(this.state.record)
      .then(() => {
        route(`/details/${this.state.selectedType.toLowerCase()}/${this.recordRef.key}`);
      });
  }

  handleCancel(event) {
    event.preventDefault();

    this.setState({
      selectedType: '',
      record: null
    });
  }

  displayForm(type) {
    switch (type) {
      case 'Candidate':
        return <CandidateAddForm
          record={ this.state.record }
          handleChange={ this.handleChange }
          handleCancel={ this.handleCancel }
          handleSubmit={ this.handleSubmit }
          handleRecruiterSelect={ this.handleRecruiterSelect}
          handleCompanySelect={ this.handleCompanySelect}
        />;
      case 'Job':
        return <JobAddForm
          record={ this.state.record }
          handleChange={ this.handleChange }
          handleCancel={ this.handleCancel }
          handleSubmit={ this.handleSubmit }
          handleRecruiterSelect={ this.handleRecruiterSelect}
          handleCompanySelect={ this.handleCompanySelect}
          handleClientContactSelect={ this.handleClientContactSelect }
        />;
      case 'Company':
        return <CompanyAddForm
          record={ this.state.record }
          handleChange={ this.handleChange }
          handleCancel={ this.handleCancel }
          handleSubmit={ this.handleSubmit }
          handleRecruiterSelect={ this.handleRecruiterSelect}
        />;
      case 'Client Contact':
        return <ClientContactddForm
          record={ this.state.record }
          handleChange={ this.handleChange }
          handleCancel={ this.handleCancel }
          handleSubmit={ this.handleSubmit }
          handleRecruiterSelect={ this.handleRecruiterSelect}
          handleCompanySelect={ this.handleCompanySelect}
        />;
      default:
        return (<p>Choose a record type</p>);
    }
  }

  render(props, { selectedType }) {
    return (<div className="container">
      <div className="box">
        <div className="field is-horizontal">
          <div className="field-label is-normal">
            <label className="label">Type</label>
          </div>
          <div className="field-body">
            <div className="field">
              <div className="control">
                <div className="select is-fullwidth" >
                  <select onChange={ this.handleTypeSelection } value={ this.state.selectedType }>
                    <option></option>
                    <option>Candidate</option>
                    <option>Client Contact</option>
                    <option>Company</option>
                    <option>Job</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="box">
        { this.displayForm(this.state.selectedType) }
      </div>
    </div>);
  }
}

export default AddRecord;
