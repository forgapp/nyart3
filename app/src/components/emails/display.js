import { h, Component } from 'preact';
import { emailElement, leftIcon, rigthIcon } from './style.css';

const EmailsDisplay = ({ emails }) => {
  const emailsList = emails ? Object.keys(emails).map(key => {
    const email = emails[key];

    return (<li class={ emailElement }>
      <span class={ `icon ${leftIcon}` }>
        <i class="fa fa-at" aria-hidden="true"></i>
      </span>
      <a href={ `mailto:${email.Address}` }>{ email.Address }</a>
      { email.Type && <small class={ rigthIcon }>{ `(${email.Type})` }</small> }
    </li>);
  }) : [];

  return (<ul>
    { emailsList }
  </ul>);
};

export default EmailsDisplay;