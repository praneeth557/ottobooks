export class User {
    constructor(
        public firstname?: string,
        public lastname?: string,
        public email?: string,
        public company?: string,
        public companyId?: string,
        public userId?: string,
        private _token?: string | null,
        private _tokenExpirationDate?: Date,
        public domain?: string,
        public subdomain?: Array<string>
    ){}

    get token() {
        if(!this._tokenExpirationDate || new Date() > this._tokenExpirationDate) {
            return null;
        }
        return this._token;
    }
}

export interface ISignUp {
    firstname: string,
    lastname: string,
    company: string,
    email: string,
    password: string
}

export interface ISignIn {
    email: string,
    password: string
}
