import { h, Component } from 'preact';
import { Selectbox } from '../selectbox';

const EditPhones = ({ phones, handleChange }) => {
  const phoneElements = phones ? phones
    .map((phone, index) => {
      const delPhone = (event) => {
        event.preventDefault();

        deletePhone(index);
      }

      const chgType = (event) => {
        event.preventDefault();

        changeType(index, event.target.value);
      }

       const chgNumber = (event) => {
        event.preventDefault();

        changeNumber(index, event.target.value);
      }

      return (<div class="field has-addons">
        <p class="control">
          <Selectbox id={ `Type-${index}`} type='PhoneType' value={ phone.Type } handleChange={ chgType } />
        </p>
        <p class="control">
          <input id={ `Number-${index}`} class="input" value={ phone.Number } onChange={ chgNumber } />
        </p>
        <p class="control">
          <button onClick={ delPhone } class="button is-danger">
            <i class="fa fa-trash"></i>
          </button>
        </p>
      </div>)
    }) : [];

  const changeType = (index, value) => {
    const newPhone = Object.assign({}, phones[index], {
      Type: value
    });

    const newPhones = [
      ...phones.slice(0, index),
      newPhone,
      ...phones.slice(index + 1, phones.length)
    ];

    handleChange({ target: {
      id: 'Phones',
      value: newPhones
    }})
  }

  const changeNumber = (index, value) => {
    const newPhone = Object.assign({}, phones[index], {
      Number: value
    });

    const newPhones = [
      ...phones.slice(0, index),
      newPhone,
      ...phones.slice(index + 1, phones.length)
    ];

    handleChange({ target: {
      id: 'Phones',
      value: newPhones
    }})
  }

  const deletePhone = (index) => {
    const newPhones = [
      ...phones.slice(0, index),
      ...phones.slice(index + 1, phones.length)
    ];

    handleChange({ target: {
      id: 'Phones',
      value: phones
    }})
  }

  const addOtherPhone = (event) => {
    event.preventDefault();

    const newPhones = [ ...phones, {
        Type: '',
        Number: ''
      }].filter(p => !!p);

    handleChange({ target: {
      id: 'Phones',
      value: newPhones
    }})
  }

  return (<div>
    { phoneElements }
    <div class="field ">
      <div class="control">
        <button onClick={ addOtherPhone } class="button is-link">Add other phone</button>
      </div>
    </div>
  </div>);
};

export default EditPhones;
