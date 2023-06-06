import { HttpClient } from '@angular/common/http';
import { BaseModel } from '../models/base.model';
import { ResultMessage } from '../models/result-message.model';
import { BaseService } from './base.service';

export abstract class BaseCrudService<T> extends BaseService {
    constructor(
        protected http: HttpClient,
        baseHref: string,
        baseApi: string
    ) {
        super(baseHref, baseApi);
    }

    getList() {
        return this.http.get<T>(this.getHref() + 'getList', {
            headers: this.getHeaders()!
        });
    }

    getListByParentID(parentID: number) {
        return this.http.get<T>(this.getHref() + 'getList/' + parentID, {
            headers: this.getHeaders()!
        });
    }

    getByID(id: number) {
        return this.http.get<T>(this.getHref() + 'getByID/' + id, {
            headers: this.getHeaders()!
        });
    }

    getDefault() {
        return this.http.get<T>(this.getHref() + 'getDefault', {
            headers: this.getHeaders()!
        });
    }

    getDefaultByParentID(parentID: number) {
        return this.http.get<T>(this.getHref() + 'getDefault/' + parentID, {
            headers: this.getHeaders()!
        });
    }

    getDuplicate(id: number) {
        return this.http.get<T>(this.getHref() + 'getDuplicate/' + id, {
            headers: this.getHeaders()!
        });
    }

    duplicate(id: number) {
        return this.http.get<ResultMessage>(this.getHref() + 'duplicate/' + id, {
            headers: this.getHeaders()!
        });
    }

    deleteByID(id: number) {
        return this.http.get<ResultMessage>(this.getHref() + 'delete/' + id, {
            headers: this.getHeaders()!
        });
    }

    delete(model: BaseModel) {
        return this.http.post<ResultMessage>(this.getHref() + 'delete/', model, {
            headers: this.getHeaders()!
        });
    }

    save(model: BaseModel) {
        return this.http.post<ResultMessage>(this.getHref() + 'save', model, {
            headers: this.getHeaders()!
        });
    }

    getGeneralSettings() {
        return this.http.get<T>(this.getHref() + 'getGeneralSettings', {
            headers: this.getHeaders()!
        });
    }

    saveGeneralSettings(model: BaseModel) {
        return this.http.post<ResultMessage>(this.getHref() + 'saveGeneralSettings', model, {
            headers: this.getHeaders()!
        });
    }
}
