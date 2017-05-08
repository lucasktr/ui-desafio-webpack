import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';

import { ApplicantEditComponent } from './applicant-edit.component';
import { ApplicantListComponent } from './applicant-list.component';
import { ApplicantLoginComponent } from './applicant-login.component'
import { ApplicantRegisterComponent } from './applicant-register.component';


const routes: Routes = [
  { path: '',  component: ApplicantLoginComponent },
  { path: 'cadastro',  component: ApplicantRegisterComponent },
  { path: 'listagem' , component: ApplicantListComponent },
  { path: 'edicao/:id', component: ApplicantEditComponent },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})

export class AppRoutingModule {}