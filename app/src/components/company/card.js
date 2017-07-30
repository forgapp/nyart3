import { h, Component } from 'preact';
import { Link } from 'preact-router';

const CompanyCard = () => (<div class="card">
  <header class="card-header">
    <div class="card-header-icon">
      <span class="icon">
        <i class="fa fa-building-o"></i>
      </span>
    </div>
    <p class="card-header-title">
       <Link href="/details/company/-Kpwm--uL3zwNzxh-BoX">Company Name</Link>
    </p>
  </header>
    <div class="card-content">
     <div class="content">
       Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus nec iaculis mauris.
       <a>@bulmaio</a>. <a>#css</a> <a>#responsive</a>
       <br />
       <small>11:09 PM - 1 Jan 2016</small>
     </div>
   </div>
   <footer class="card-footer">
     <a class="card-footer-item">Save</a>
     <a class="card-footer-item">Edit</a>
     <a class="card-footer-item">Delete</a>
   </footer>
</div>);

export default CompanyCard;
