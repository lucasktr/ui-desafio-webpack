import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';

import { Applicant } from '../models/applicant';
import { AuthToken } from '../models/auth-token';

@Injectable()

export class UserAuthenticationService {
	private client_id: string;
	private client_secret: string;
	is_logged: boolean;
	username: string;
	authToken: AuthToken;

	constructor() {
		this.client_id = 'Rb6yDNb6muY6Wr9iGybl193VzO6BqOuleLGblg14';
		this.client_secret = 'NjsLaIedGub9LC2xAKHIt7kiN4DiSBLolT74w2PYrOu4PPdRxCNqgZDLS1UlqwSQry2HSmRj21MWcOiKOuLq8UtsD0LBic26SxJAEHqf7AaZ5C6sOSG9WrHf3gOzJkmY';

		this.is_logged = false;
	}

	getClientCredentials(): any {
		return {client_id: this.client_id,
				client_secret: this.client_secret}
	}

	setAuthToken(username: string, authToken: AuthToken) {
		if(authToken.access_token == '')
			return;

		this.authToken = authToken;
		this.username = username;
		this.is_logged = true;
	}

	logout() {
		this.is_logged = false;
		this.username = null;
		this.authToken = null;
	}

}