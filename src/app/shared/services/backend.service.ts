import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import { UserAuthenticationService } from './user-authentication.service';

import { Applicant } from '../models/applicant';
import { AuthToken } from '../models/auth-token';

interface LoginRequest {
	client_id: string;
	client_secret: string;
	grant_type: string;
	username: string;
	password: string;
}

export class ErrorResponse {
	has_context: boolean;
	context: any;
}

@Injectable()

export class BackendService {
	applicantUrl = 'https://delineaapi.herokuapp.com/candidate/';
	loginUrl = 'http://delineaapi.herokuapp.com/o/token/'
	private userId = '';

	private backendHeaders(): Headers {
		let headers = new Headers({'Content-Type': 'application/json'});
		if (this.userAuthService.is_logged) {
			let authToken: AuthToken = this.userAuthService.authToken;
			let authorization = authToken.token_type + ' ' + authToken.access_token;
			headers.append('Authorization', authorization);
		}
		return headers;
	}

	private handleError(error: Response | any) {
		let errorResponse: ErrorResponse = {
			has_context: false,
			context: null
		};

		if (error instanceof Response) {
			//BAD REQUEST
			if (error.status == 400) {
				errorResponse.has_context = true;
				errorResponse.context = error.json() || {};
			}

			const err  = JSON.stringify(error.json() || '');
			console.log(`${error.status} - ${error.statusText || ''} - ${err}`);
		} else {
			const err = error.message? error.message : error.toString();
			console.log(err);
		}
		return Observable.throw(errorResponse);
	}

	constructor (private http: Http,
				 private userAuthService: UserAuthenticationService) {}

	//get data
	getApplicant(id: string): Observable<Applicant> {
		let url: string = this.applicantUrl + id;
		let headers = this.backendHeaders();
		return this.http.get(url,{headers: headers})
						.map(res => res.json() || {})
						.catch(this.handleError);
	}

	getApplicants(): Observable<Applicant[]> {
		let headers = this.backendHeaders();
		return this.http.get(this.applicantUrl,{headers: headers})
						.map(res => res.json() || [])
						.catch(this.handleError);
	}

	//post data
	registerApplicant(applicant: Applicant): Observable<Applicant> {
		let headers = this.backendHeaders();
		return this.http.post(this.applicantUrl, applicant, {headers: headers})
						.map(res => res.json() || {})
						.catch(this.handleError);
	}

	//login
	requestToken(loginRequest: LoginRequest): Observable<AuthToken> {
		let headers = new Headers({'Content-Type': 'application/x-www-form-urlencoded'})
		let data = new URLSearchParams();

		data.append('client_id',loginRequest.client_id);
		data.append('client_secret',loginRequest.client_secret);
		data.append('grant_type',loginRequest.grant_type);
		data.append('username',loginRequest.username);
		data.append('password',loginRequest.password);

		return this.http.post(this.loginUrl, data.toString(), {headers: headers})
						.map(res => res.json() || {})
						.catch(this.handleError);
	}

	//put data
	updateApplicant(id: string, applicant: Applicant): Observable<Applicant> {
		let url: string = this.applicantUrl + id;
		let headers = this.backendHeaders();
		return this.http.put(url, applicant, {headers: headers})
						.map(res => res.json() || {})
						.catch(this.handleError);
	}

	//delete data
	deleteApplicant(id: number) {
		let url = this.applicantUrl + id + '/delete';
		let headers = this.backendHeaders();
		
		return this.http.delete(url, {headers: headers})
						.map(res => res.json() || {})
						.catch(this.handleError);
	}
}