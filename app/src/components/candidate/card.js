import { h, Component } from 'preact';
import { Link } from 'preact-router/match';
import { DisplayLanguages } from '../languages';

const CandidateCard = ({ id, record }) => {
  const jobFunctionCodes = record.JobFunction ? record.JobFunction.reduce((aggr, jobFunction) => {
    if(!aggr[jobFunction.Category]) {
      return Object.assign({}, aggr, { [jobFunction.Category]: [jobFunction.Code] });
    }

    return Object.assign({}, aggr, { [jobFunction.Category]: [
      ...aggr[jobFunction.Category],
      jobFunction.Code
    ] });
  }, {}) : {};

  return (<div class="card">
    <header class="card-header">
      <div class="card-header-icon">
        <span class="icon">
          <i class="fa fa-user-o"></i>
        </span>
      </div>
      <p class="card-header-title">
         <Link href={ `/details/candidate/${id}` }>{record.Firstname} {record.Lastname}</Link>
      </p>
    </header>
    <div class="card-content">
      <div class="content">
        Works as { record.JobTitle } at { record.Company && <Link href={`/details/company/${record.Company.id}`}>{ record.Company.Name }</Link> }.<br />
        Base Salary of { record.Salary }円<br />
        Job Functions:<br />
        { Object.keys(jobFunctionCodes).map(key => (<p>
            { key }: { jobFunctionCodes[key].join(', ') }
          </p>))
        }


      </div>
      <div class="content">
        <div>
          { record.Recruiter.Name && `Registered by ${record.Recruiter.Name}` } <small>{ record.RegistrationDate && `@${record.RegistrationDate}` }</small>
        </div>
      </div>
    </div>
    <footer class="card-footer">
      <div class="card-footer-item">
        <DisplayLanguages languages={ record.Languages } />
      </div>
    </footer>
  </div>);
};

export default CandidateCard;
