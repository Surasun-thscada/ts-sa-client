import { HttpHeaders } from '@angular/common/http';

export abstract class BaseService {
    constructor(
        protected baseHref: string,
        protected baseApi: string
    ) {
    }

    getHref() {
        return this.baseHref + 'api/' + this.baseApi + '/';
    }

    getHrefCustom(baseApi: string) {
        return this.baseHref + baseApi + '/';
    }

    getToken() {
        return localStorage.getItem('token');
    }

    getTokenExpire() {
        return new Date(parseInt(localStorage.getItem('tokenExpire')!));
    }

    getHeaders() {
        let token = this.getToken();

        return token != null ? new HttpHeaders({
            'Authorization': 'Bearer ' + this.getToken(),
            'Content-Type': 'application/json'
        }) : null;
    }

    getHeadersTokenOnly() {
        return new HttpHeaders({
            'Authorization': 'Bearer ' + this.getToken()
        });
    }

    getHeaderMultipartFormData() {
        return new HttpHeaders({
            'Content-Type': 'multipart/form-data',
            'Accept': 'application/json'
        });
    }
}
