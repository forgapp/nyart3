import { h, Component } from 'preact';
import { Link } from 'preact-router';

const CompanyCard = ({ id, record }) => (<div class="card">
  <header class="card-header">
    <div class="card-header-icon">
      <span class="icon">
        <i class="fa fa-building-o"></i>
      </span>
    </div>
    <p class="card-header-title">
      <Link href={`/details/company/${id}`}>{ record.Name }</Link>
    </p>
  </header>
  <div class="card-content">
    <div class="content">
      <div>
        { record.Recruiter.Name && `by ${record.Recruiter.Name}` } <small>{ record.RegistrationDate && `@${record.RegistrationDate}` }</small>
      </div>
    </div>
  </div>
</div>);

export default CompanyCard;
