import { h, Component } from 'preact';
import { route } from 'preact-router';
import { database } from '../../lib/firebase';
import CandidateInformationEdit from '../../components/candidate/editInformation';
import CompanyInformationEdit from '../../components/company/editInformation';
import ClientContactInformationEdit from '../../components/clientContact/editInformation';
import JobInformationEdit from '../../components/job/editInformation';

class EditRecordInformation extends Component {
  state = {
    record: null
  }

  constructor() {
    super();

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleRecruiterSelect = this.handleRecruiterSelect.bind(this);
    this.handleCompanySelect = this.handleCompanySelect.bind(this);
    this.handleClientContactSelect = this.handleClientContactSelect.bind(this);
    this.handleCodeChange = this.handleCodeChange.bind(this);
  }

  componentDidMount() {
    const { type, id } = this.props;

    this.recordRef = database.ref(type)
      .child(id);

    this.recordRef.on('value', snapshot => {
      this.setState({ record: snapshot.val() });
    });
  }

  componentWillUnmount() {
    this.recordRef.off();
    this.recordRef = null;
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

  handleCodeChange(item) {
    const record = Object.assign(
      {},
      this.state.record,
      { [item.id]: item.value }
    );

    this.setState({ record });
  }

  handleSubmit(event) {
    event.preventDefault();

    this.recordRef.update(this.state.record)
      .then(() => {
        route(`/details/${this.props.type.toLowerCase()}/${this.recordRef.key}`);
      });
  }

  handleCancel(event) {
    event.preventDefault();

    route(`/details/${this.props.type.toLowerCase()}/${this.recordRef.key}`);
  }

  getEditInformationForm(type) {
    switch (type) {
      case 'Candidate':
        return <CandidateInformationEdit
          record={ this.state.record }
          handleChange={ this.handleChange }
          handleCancel={ this.handleCancel }
          handleSubmit={ this.handleSubmit }
          handleRecruiterSelect={ this.handleRecruiterSelect}
          handleCompanySelect={ this.handleCompanySelect}
          handleCodeChange={ this.handleCodeChange }
        />;
      case 'Job':
        return <JobInformationEdit
          record={ this.state.record }
          handleChange={ this.handleChange }
          handleCancel={ this.handleCancel }
          handleSubmit={ this.handleSubmit }
          handleRecruiterSelect={ this.handleRecruiterSelect}
          handleCompanySelect={ this.handleCompanySelect}
          handleClientContactSelect={ this.handleClientContactSelect }
          handleCodeChange={ this.handleCodeChange }
        />;
      case 'Company':
        return <CompanyInformationEdit
          record={ this.state.record }
          handleChange={ this.handleChange }
          handleCancel={ this.handleCancel }
          handleSubmit={ this.handleSubmit }
          handleRecruiterSelect={ this.handleRecruiterSelect}
          handleCodeChange={ this.handleCodeChange }
        />;
      case 'ClientContact':
        return <ClientContactInformationEdit
          record={ this.state.record }
          handleChange={ this.handleChange }
          handleCancel={ this.handleCancel }
          handleSubmit={ this.handleSubmit }
          handleRecruiterSelect={ this.handleRecruiterSelect}
          handleCompanySelect={ this.handleCompanySelect}
        />;
      default:
        return (<p>Error</p>);
    }
  }

  render({ id, type }, { record }) {
    return (<div className="container">
      <div>
        { record && this.getEditInformationForm(type) }
      </div>
    </div>)
  }
}

export default EditRecordInformation;
