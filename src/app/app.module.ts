import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { ApplicantEditComponent } from './applicant-edit.component';
import { ApplicantFormComponent } from './shared/forms/applicant-form.component';
import { ApplicantListComponent } from './applicant-list.component';
import { ApplicantLoginComponent } from './applicant-login.component'
import { ApplicantRegisterComponent } from './applicant-register.component';

import { BackendService } from './shared/services/backend.service';
import { UserAuthenticationService } from './shared/services/user-authentication.service';

@NgModule({
	declarations: [ AppComponent,
					ApplicantEditComponent,
					ApplicantFormComponent,
				    ApplicantListComponent,
				    ApplicantLoginComponent,
				    ApplicantRegisterComponent
				  ],
	imports: [ 	AppRoutingModule,
				BrowserModule,
			   	FormsModule,
			   	HttpModule,
			 ],
	providers: [ BackendService,
				 UserAuthenticationService	
			   ],
	bootstrap: [ AppComponent ]
}) 
export class AppModule {}