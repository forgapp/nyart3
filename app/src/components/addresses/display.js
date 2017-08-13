import { h, Component } from 'preact';
import { addressElement, leftIcon, rigthIcon } from './style.css';

const AddressesDisplay = ({ addresses }) => {
  const addressesList = addresses ? Object.keys(addresses).map(key => {
    const address = addresses[key];

    return (<li class={ addressElement }>
      <span class={ `icon ${leftIcon}` }>
        <i class="fa fa-address-book-o" aria-hidden="true"></i>
      </span>
      <p>
        { address.Street }<br />
        { address.Complement }<br />
        { address.City } { address.State }<br />
        { address.Country }
      </p>
      { address.Type && <small class={ rigthIcon }>{ `(${address.Type})` }</small> }
    </li>);
  }) : [];

  return (<ul>
    { addressesList }
  </ul>);
};

export default AddressesDisplay;
