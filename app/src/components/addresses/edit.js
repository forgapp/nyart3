import { h, Component } from 'preact';
import { Selectbox } from '../selectbox';

const AddressEmails = ({ addresses, handleChange }) => {
  const addressElements = addresses ? addresses
    .map((address, index) => {
      const delAddress = (event) => {
        event.preventDefault();

        deleteAddress(index);
      }

      const chgType = (event) => {
        event.preventDefault();

        changeType(index, event.target.value);
      }

      const chgAddress = (event) => {
        event.preventDefault();

        changeAddress(index, event);
      }

      return (<div>
        <div class="field has-addons">
          <p class="control">
            <Selectbox name="Type" type='AddressType' value={ address.Type } handleChange={ chgType } />
          </p>
          <p class="control">
            <button onClick={ delAddress } class="button is-danger">
              <i class="fa fa-trash"></i>
            </button>
          </p>
        </div>

        <div class="field">
          <label class="label">Street</label>
          <div class="control">
            <input name='Street' placeholder="Ikebukuro 1-2-3" class="input" value={ address.Street } onChange={ chgAddress } />
          </div>
        </div>

        <div class="field">
          <label class="label">Complement</label>
          <div class="control">
            <input name='Complement' placeholder="Bldg Apt." class="input" value={ address.Complement } onChange={ chgAddress } />
          </div>
        </div>

        <div class="field is-grouped">
          <p class="control">
            <div class="field">
              <label class="label">City</label>
              <div class="control">
                <input name='City' placeholder="Toshima-ku" class="input" value={ address.City } onChange={ chgAddress } />
              </div>
            </div>
          </p>
          <p class="control">
            <div class="field">
              <label class="label">State</label>
              <div class="control">
                <input name='State' placeholder="Tokyo-to" class="input" value={ address.State } onChange={ chgAddress } />
              </div>
            </div>
          </p>
        </div>
        <div class="field">
          <label class="label">Country</label>
          <div class="control">
            <input name='Country' placeholder="Japan" class="input" value={ address.Country } onChange={ chgAddress } />
          </div>
        </div>


      </div>)
    }) : [];

  const changeType = (index, value) => {
    const newAddress = Object.assign({}, addresses[index], {
      Type: value
    });

    const newaddresses = [
      ...addresses.slice(0, index),
      newAddress,
      ...addresses.slice(index + 1, addresses.length)
    ];

    handleChange({ target: {
      id: 'Addresses',
      value: newaddresses
    }})
  }

  const changeAddress = (index, event) => {
    const newAddress = Object.assign({}, addresses[index], {
      [event.target.name]: event.target.value
    });

    const newaddresses = [
      ...addresses.slice(0, index),
      newAddress,
      ...addresses.slice(index + 1, addresses.length)
    ];

    handleChange({ target: {
      id: 'Addresses',
      value: newaddresses
    }})
  }

  const deleteAddress = (index) => {
    const newaddresses = [
      ...addresses.slice(0, index),
      ...addresses.slice(index + 1, addresses.length)
    ];

    handleChange({ target: {
      id: 'Addresses',
      value: newaddresses
    }})
  }

  const addOtherAddress = (event) => {
    event.preventDefault();

    const newaddresses = [ ...addresses, {
        Type: '',
        Street: ''
      }].filter(p => !!p);

    handleChange({ target: {
      id: 'Addresses',
      value: newaddresses
    }})
  }

  return (<div>
    { addressElements }
    <div class="field ">
      <div class="control">
        <button onClick={ addOtherAddress } class="button is-link">Add other email</button>
      </div>
    </div>
  </div>);
};

export default AddressEmails;
