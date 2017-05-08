export class Applicant {
	id: number;
	password: string;
	last_login: Date;
	is_superuser: boolean;
	full_name: string;
	first_name: string;
	last_name: string;
	email: string;
	is_staff: boolean;
	is_active: true;
	date_joined: Date;
	username: string;
	confirm_username: boolean;
	is_social: boolean;
	phone: string;
	publisher: boolean;
	name: string;
	cpf: string;
	rg: number;
	birth_date: string;
	lattes: string;
	about: string;
	groups: any[];
	user_permissions: number[];
}