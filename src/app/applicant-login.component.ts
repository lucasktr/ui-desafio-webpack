import { Component } from '@angular/core';
import { Router } from '@angular/router' 

import { BackendService } from './shared/services/backend.service';
import { UserAuthenticationService } from './shared/services/user-authentication.service';

import { AuthToken } from './shared/models/auth-token'

@Component({
	selector: 'applicant-login',
	templateUrl: './applicant-login.component.html',
	styleUrls: [ './applicant-page-common.css' ]
})

export class ApplicantLoginComponent {
	username: string;
	password: string;
	login_error: boolean;
	
	constructor(private backendService: BackendService,
				private userAuthService: UserAuthenticationService,
				private router: Router) {
		this.login_error = false;
	}

	onSubmit() {
		let client_credentials = this.userAuthService.getClientCredentials();

		let login_request = {
			client_id: client_credentials.client_id,
			client_secret: client_credentials.client_secret,
			grant_type: 'password',
			username: this.username,
			password: this.password
		}

		this.backendService.requestToken(login_request)
						   .subscribe(res => this.requestTokenCallback(this, res),
						   			  error => this.login_error = true);
	}

	requestTokenCallback(alc: ApplicantLoginComponent, authToken: AuthToken) {
		alc.userAuthService.setAuthToken(alc.username, authToken);

		//if success, redirect to list
		if (alc.userAuthService.is_logged)
			this.router.navigateByUrl('/listagem');
	}
}