import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { BackendService } from './shared/services/backend.service'; 
import { Applicant } from './shared/models/applicant';

@Component({
	selector: 'applicant-edit',
	templateUrl: './applicant-edit.component.html',
	styleUrls: [ './applicant-page-common.css' ]
})

export class ApplicantEditComponent implements OnInit {
	applicant: Applicant;
	obs: any;
	id: string;
	id_error: string;

	constructor(private backendService: BackendService,
				private route: ActivatedRoute,
				private router: Router) {}

	ngOnInit() {
		this.id = this.route.snapshot.params['id'];

		if (isNaN(+this.id)) {
			this.router.navigateByUrl('/listagem');
			return;
		}

		this.backendService.getApplicant(this.id)
						   .subscribe(res => this.applicant = res,
						   			  err => this.id_error = 'ERRO: Candidato não cadastrado.');
	}

	onSubmitSuccess(event: any) {
		this.router.navigateByUrl('/listagem');
	}
}