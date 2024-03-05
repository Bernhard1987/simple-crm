export class NewUser {
    email: string;
    password: string;

    constructor(obj?: any) {
        this.email = obj ? obj.email : '';
        this.password = obj ? obj.password : '';
    }
}