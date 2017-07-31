import { h, Component } from 'preact';
import { Selectbox } from '../selectbox';

const EditEmails = ({ emails, handleChange }) => {
  const emailElements = emails ? emails
    .map((email, index) => {
      const delEmail = (event) => {
        event.preventDefault();

        deleteEmail(index);
      }

      const chgType = (event) => {
        event.preventDefault();

        changeType(index, event.target.value);
      }

       const chgAddress = (event) => {
        event.preventDefault();

        changeAddress(index, event.target.value);
      }

      return (<div class="field has-addons">
        <p class="control">
          <Selectbox id={ `Type-${index}`} type='EmailType' value={ email.Type } handleChange={ chgType } />
        </p>
        <p class="control">
          <input id={ `Address-${index}`} class="input" value={ email.Address } onChange={ chgAddress } />
        </p>
        <p class="control">
          <button onClick={ delEmail } class="button is-danger">
            <i class="fa fa-trash"></i>
          </button>
        </p>
      </div>)
    }) : [];

  const changeType = (index, value) => {
    const newEmail = Object.assign({}, emails[index], {
      Type: value
    });

    const newEmails = [
      ...emails.slice(0, index),
      newEmail,
      ...emails.slice(index + 1, emails.length)
    ];

    handleChange({ target: {
      id: 'Emails',
      value: newEmails
    }})
  }

  const changeAddress = (index, value) => {
    const newEmail = Object.assign({}, emails[index], {
      Address: value
    });

    const newEmails = [
      ...emails.slice(0, index),
      newEmail,
      ...emails.slice(index + 1, emails.length)
    ];

    handleChange({ target: {
      id: 'Emails',
      value: newEmails
    }})
  }

  const deleteEmail = (index) => {
    const newEmails = [
      ...emails.slice(0, index),
      ...emails.slice(index + 1, emails.length)
    ];

    handleChange({ target: {
      id: 'Emails',
      value: newEmails
    }})
  }

  const addOtherEmail = (event) => {
    event.preventDefault();

    const newEmails = [ ...emails, {
        Type: '',
        Address: ''
      }].filter(p => !!p);

    handleChange({ target: {
      id: 'Emails',
      value: newEmails
    }})
  }

  return (<div>
    { emailElements }
    <div class="field ">
      <div class="control">
        <button onClick={ addOtherEmail } class="button is-link">Add other email</button>
      </div>
    </div>
  </div>);
};

export default EditEmails;
