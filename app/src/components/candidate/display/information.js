import { h, Component } from 'preact';
import { Link } from 'preact-router';
import { PhonesDisplay } from '../../phone';
import { EmailsDisplay } from '../../emails';
import { AddressesDisplay } from '../../addresses';
import { DisplayCodes } from '../../codes';
import { fullwidthTable } from './style.css';
import { calculateAge } from '../../../lib/date';

const Information = ({
  Nationality,
  Birthdate,
  Status,
  Company,
  Title,
  Salary,
  RegistrationDate,
  RecruiterName,
  RecruiterId,
  Source,
  Phones,
  Emails,
  Addresses,
  Industry,
  JobFunction
}) => {
return (<div id="information" class="columns">
  <div class="column is-3">
    <table class={ `${fullwidthTable} is-hidden-desktop` }>
      <tr>
        <td>Nationality</td>
        <td>{ Nationality }</td>
      </tr>
      <tr>
        <td>Birthdate</td>
        <td>{ Birthdate }  { Birthdate && Birthdate !== '' && <small>({ calculateAge(Birthdate) })</small> }</td>
      </tr>
      <tr>
        <td>Status</td>
        <td>{ Status }</td>
      </tr>
    </table>
    <table class={ fullwidthTable }>
      <tr>
        <td>Title</td>
        <td>{ Title }</td>
      </tr>
      <tr>
        <td>Company</td>
        <td><Link href={ `/details/company/${Company.id}` }>{ Company.Name }</Link></td>
      </tr>
      <tr>
        <td>Salary</td>
        <td>{ Salary }</td>
      </tr>
    </table>
    <table  class={ fullwidthTable }>
      <tr>
        <td>RegistrationDate</td>
        <td>{ RegistrationDate }</td>
      </tr>
      <tr>
        <td>RecruiterName</td>
        <td>{ RecruiterName }</td>
      </tr>
      <tr>
        <td>Source</td>
        <td>{ Source }</td>
      </tr>
    </table>
  </div>
  <div class="column">
    <div class="columns is-desktop">
      <div class="column">
        <h1 class="title is-5">Industries</h1>
        <DisplayCodes codes={ Industry } />
      </div>
      <div class="column">
        <h1 class="title is-5">Job Functions</h1>
        <DisplayCodes codes={ JobFunction } />
      </div>
      <div class="column">
        <h1 class="title is-5">Skills</h1>
      </div>
    </div>
  </div>
  <div class="column is-3">
    <PhonesDisplay phones={ Phones } />
    <EmailsDisplay emails={ Emails } />
    <AddressesDisplay addresses={ Addresses } />
  </div>
</div>);
}

export default Information;
