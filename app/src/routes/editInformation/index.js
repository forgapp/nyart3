import { h, Component } from 'preact';
import { route } from 'preact-router';
import { database } from '../../lib/firebase';
import CandidateInformationEdit from '../../components/candidate/editInformation';
/*
import JobAddForm from '../../components/job/addForm';
import CompanyAddForm from '../../components/company/addForm';
import ClientContactddForm from '../../components/clientContact/addForm';*/

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
    // const currentCodes = this.state.record[item.id];
    // const newCodes = [ ...currentCodes, item.value ].filter(p => !!p);

    const record = Object.assign(
      {},
      this.state.record,
      { [item.id]: item.value }
      // { [item.id]: newCodes }
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
      // case 'Job':
      //   return <JobAddForm
      //     record={ this.state.record }
      //     handleChange={ this.handleChange }
      //     handleCancel={ this.handleCancel }
      //     handleSubmit={ this.handleSubmit }
      //     handleRecruiterSelect={ this.handleRecruiterSelect}
      //     handleCompanySelect={ this.handleCompanySelect}
      //     handleClientContactSelect={ this.handleClientContactSelect }
      //   />;
      // case 'Company':
      //   return <CompanyAddForm
      //     record={ this.state.record }
      //     handleChange={ this.handleChange }
      //     handleCancel={ this.handleCancel }
      //     handleSubmit={ this.handleSubmit }
      //     handleRecruiterSelect={ this.handleRecruiterSelect}
      //   />;
      // case 'Client Contact':
      //   return <ClientContactddForm
      //     record={ this.state.record }
      //     handleChange={ this.handleChange }
      //     handleCancel={ this.handleCancel }
      //     handleSubmit={ this.handleSubmit }
      //     handleRecruiterSelect={ this.handleRecruiterSelect}
      //     handleCompanySelect={ this.handleCompanySelect}
      //   />;
      default:
        return (<p>Error</p>);
    }
  }

  render({ id, type }, { record }) {
    return (<div className="container">
      <div>
        { record && this.getEditInformationForm(type) }
      </div>
      <pre>
        { JSON.stringify(record, null, 2) }
      </pre>
    </div>)
    // return this.getEditInformationForm(type);
  }
}

export default EditRecordInformation;
