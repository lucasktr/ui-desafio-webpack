import { Component, Input, Output, EventEmitter} from '@angular/core';

import { Applicant } from '../../shared/models/applicant';

import { BackendService } from '../../shared/services/backend.service';
import { ErrorResponse } from '../../shared/services/backend.service';

@Component({
	selector: 'applicant-form',
	templateUrl: './applicant-form.component.html',
	styleUrls: [ './applicant-form.component.css' ] 
})
export class ApplicantFormComponent {
	@Input() applicant: Applicant;
	@Output() submitSuccess = new EventEmitter();

	form_errors: any = {};
	submitted = false;

	constructor (private backendService: BackendService) {}

	private handleError(appComponent: ApplicantFormComponent,errorResponse: ErrorResponse) {
		let error_text:string = '';

		if (errorResponse.has_context) {
			appComponent.form_errors = errorResponse.context;
		}

		appComponent.submitted = false;
	}

	checkResponse(appComponent: ApplicantFormComponent, res: any) {
		appComponent.submitted = false;

		//send success event to parent if correct response
		if (res.id)
			appComponent.submitSuccess.emit({applicant: res});
	}

	onSubmit() {
		if(this.applicant.hasOwnProperty('id')) {
			let id:string = String(this.applicant.id);
			this.backendService.updateApplicant(id, this.applicant)
							   .subscribe(response => this.checkResponse(this, response),
							   error => this.handleError(this, error));
		}
		else {
			this.backendService.registerApplicant(this.applicant)
					.subscribe(response => this.checkResponse(this, response),
							   error => this.handleError(this, error));
		}
		this.submitted = true;
	}
}