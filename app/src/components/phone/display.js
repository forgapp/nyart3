import { h, Component } from 'preact';
import { phoneElement, leftIcon, rigthIcon } from './style.css';

const PhonesDisplay = ({ phones }) => {
  const phonesList = phones ? Object.keys(phones).map(key => {
    const phone = phones[key];

    return (<li class={ phoneElement }>
      <span class={ `icon ${leftIcon}` }>
        <i class="fa fa-phone" aria-hidden="true"></i>
      </span>
      <a href={ `tel:${phone.Number}` }>{ phone.Number }</a>
      { phone.Type && <small class={ rigthIcon }>{ `(${phone.Type})` }</small> }
    </li>);
  }) : [];

  return (<ul>
    { phonesList }
  </ul>);
};

export default PhonesDisplay;
