import { h, Component } from 'preact';
import { Link } from 'preact-router/match';
import { DisplayLanguages } from '../languages';

const ClientContactCard = ({ id, record }) => (<div class="card">
  <header class="card-header">
    <div class="card-header-icon">
      <span class="icon">
        <i class="fa fa-users"></i>
      </span>
    </div>
    <p class="card-header-title">
       <Link href={ `/details/clientcontact/${id}` }>{record.Firstname} {record.Lastname}</Link>
    </p>
  </header>
  <div class="card-content">
    <div class="content">
        <p>Works as { record.JobTitle } at { record.Company && <Link href={`/details/company/${record.Company.id}`}>{ record.Company.Name }</Link>}.</p>
      </div>
  </div>
  <footer class="card-footer">
      <div class="card-footer-item">
        <DisplayLanguages languages={ record.Languages } />
      </div>
    </footer>
</div>);

export default ClientContactCard;
