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


// <div class="card">
//   <header class="card-header">
//     <p class="card-header-title">
//       Component
//     </p>
//     <a class="card-header-icon">
//       <span class="icon">
//         <i class="fa fa-angle-down"></i>
//       </span>
//     </a>
//   </header>
//   <div class="card-content">
//     <div class="content">
//       Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus nec iaculis mauris.
//       <a>@bulmaio</a>. <a>#css</a> <a>#responsive</a>
//       <br>
//       <small>11:09 PM - 1 Jan 2016</small>
//     </div>
//   </div>
//   <footer class="card-footer">
//     <a class="card-footer-item">Save</a>
//     <a class="card-footer-item">Edit</a>
//     <a class="card-footer-item">Delete</a>
//   </footer>
// </div>