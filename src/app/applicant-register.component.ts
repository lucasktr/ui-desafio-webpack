import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { Applicant } from './shared/models/applicant';

@Component({
	selector: 'applicant-register',
	templateUrl: './applicant-register.component.html',
	styleUrls: [ './applicant-page-common.css' ] 
})
export class ApplicantRegisterComponent {
	applicant = new Applicant();

	constructor (private router: Router) {}

	onSubmitSuccess(event: any) {
		this.router.navigateByUrl('');
	}

}