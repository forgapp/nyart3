import { h, Component } from 'preact';

const PhonesDisplay = ({ phones }) => {
  console.log('PHONES DISPLAY', phones);
  const phonesList = phones ? Object.keys(phones).map(key => {
    const phone = phones[key];

    return (<li>
      { phone.Type } - { phone.Number }
    </li>)
  }) : [];

  return (<ul>
    { phonesList }
  </ul>);
};

export default PhonesDisplay;
