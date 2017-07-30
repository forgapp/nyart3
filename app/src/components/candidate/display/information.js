import { h, Component } from 'preact';
import { Link } from 'preact-router';
import { PhonesDisplay } from '../../phone';

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
  Phones
}) => {
  console.log('INFORMATION DISPLAY', Phones)
return (<div id="information" class="columns">
  <div class="column">
    <table class="is-hidden-desktop">
      <tr>
        <td>Nationality</td>
        <td>{ Nationality }</td>
      </tr>
      <tr>
        <td>Birthdate</td>
        <td>{ Birthdate }</td>
      </tr>
      <tr>
        <td>Status</td>
        <td>{ Status }</td>
      </tr>
    </table>
    <table>
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
    Languages<br />
    <table>
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
    Industries<br />
    Job Functions<br />
    Skills<br />
  </div>
  <div class="column">
    <PhonesDisplay phones={ Phones } />
    Emails<br />
    Addresses<br />
  </div>
</div>);
}

export default Information;
