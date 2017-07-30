import { h, Component } from 'preact';
import { database } from '../../lib/firebase';
import Lookup from '../lookup';

class CompanyContactLookup extends Component {
  state = { contacts: [] }

  componentDidMount() {
    if(this.props.company && this.props.company.id !== '') {
      this.getClientContacts(this.props.company.id)
    }
  }

  componentWillReceiveProps(nextProps, _) {
    if(nextProps.company &&  nextProps.company.id !== '' && nextProps.company.id !== this.props.company.id) {
      this.getClientContacts(nextProps.company.id);
    }
  }

  getClientContacts(companyId) {
    const contactRef = database.ref("Client Contact")
      .orderByChild("Company/id")
      .equalTo(companyId);

    contactRef.once("value").then(snapshot => {
      console.log(snapshot.val())
      this.setState({ contacts: snapshot.val() });

      const contactKeys = Object.keys(snapshot.val());
      if(contactKeys.length > 0) {
        this.props.handleContactSelect({
          id: contactKeys[0],
          value: `${snapshot.val()[contactKeys[0]].Firstname} ${snapshot.val()[contactKeys[0]].Lastname}`
        })
      }
    });
  }

  handleContactSelect(event) {
    console.log('HANDLECONTACTSELECT')
    this.props.handleContactSelect({
      id: event.target.value,
      value: event.target.dataset.label
    })
  }

  render({ company, contact, handleCompanySelect }, { contacts }) {
    const contactElements = Object.keys(contacts)
      .map(key => (<option value={ key } data-label={`${contacts[key].Firstname} ${contacts[key].Lastname}`}>
        { `${contacts[key].Firstname} ${contacts[key].Lastname}` }
      </option>));

    return (<div className="field-body">
      <Lookup
        index="record"
        type="Company"
        placeholder="Company Name"
        formatValue={ (item) => `${item.Name}` }
        handleClick={ handleCompanySelect }
        value={ company.Name }
      />
      <div className="field">
        <p className="control is-expanded">
          <div class="control">
            <div class="select is-fullwidth">
              <select value={ contact.id } onChange={ this.handleContactSelect.bind(this) }>
                <option value="">Client Contact</option> }
                { contactElements }
              </select>
            </div>
          </div>
        </p>
      </div>
    </div>);
  }
}

export default CompanyContactLookup;