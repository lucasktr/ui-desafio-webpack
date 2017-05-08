import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UserAuthenticationService } from './shared/services/user-authentication.service';
import { BackendService } from './shared/services/backend.service';

import { Applicant } from './shared/models/applicant';

@Component({
	selector: 'applicant-list',
	templateUrl: './applicant-list.component.html',
	styleUrls: [ './applicant-page-common.css' ]
})
export class ApplicantListComponent implements OnInit {
	private _idSelected: number;

	applicants: Applicant[];
	selectedApplicant: Applicant;
	is_logged: boolean;

	constructor (private backendService: BackendService,
				 private userAuthService: UserAuthenticationService,
				 private router: Router) {
		this.is_logged = false;
		this.selectedApplicant = new Applicant();
	}

	ngOnInit() {
		this.is_logged = this.userAuthService.is_logged;
		this.backendService.getApplicants()
						   .subscribe(applicants => this.applicants = applicants);
	}

	selectApplicant(applicant: Applicant) {
		this.selectedApplicant = applicant;
	}

	removeApplicant(id: number) {
		this._idSelected = id;
		this.backendService.deleteApplicant(id)
						   .subscribe(res => {
						   						for (let key in this.applicants ) {
						   							if (this.applicants[key].id == this._idSelected)
						   								delete this.applicants[key];
						   						} 
						   					 });
	}

}
