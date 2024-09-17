//----------------------
// <auto-generated>
//     Generated using the NSwag toolchain v14.1.0.0 (NJsonSchema v11.0.2.0 (Newtonsoft.Json v13.0.0.0)) (http://NSwag.org)
// </auto-generated>
//----------------------

/* tslint:disable */
/* eslint-disable */
// ReSharper disable InconsistentNaming

import { mergeMap as _observableMergeMap, catchError as _observableCatch } from 'rxjs/operators';
import { Observable, throwError as _observableThrow, of as _observableOf } from 'rxjs';
import { Injectable, Inject, Optional, InjectionToken } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse, HttpResponseBase } from '@angular/common/http';

export const API_BASE_URL = new InjectionToken<string>('API_BASE_URL');

export interface IQuestionClient {
    getAll(): Observable<GetAllQuestionsResponse[]>;
    add(command: AddQuestionCommand): Observable<void>;
    getQuestionById(id: number): Observable<Question>;
}

@Injectable({
    providedIn: 'root'
})
export class QuestionClient implements IQuestionClient {
    private http: HttpClient;
    private baseUrl: string;
    protected jsonParseReviver: ((key: string, value: any) => any) | undefined = undefined;

    constructor(@Inject(HttpClient) http: HttpClient, @Optional() @Inject(API_BASE_URL) baseUrl?: string) {
        this.http = http;
        this.baseUrl = baseUrl ?? "https://localhost:7221";
    }

    getAll(): Observable<GetAllQuestionsResponse[]> {
        let url_ = this.baseUrl + "/api/questions";
        url_ = url_.replace(/[?&]$/, "");

        let options_ : any = {
            observe: "response",
            responseType: "blob",
            headers: new HttpHeaders({
                "Accept": "application/json"
            })
        };

        return this.http.request("get", url_, options_).pipe(_observableMergeMap((response_ : any) => {
            return this.processGetAll(response_);
        })).pipe(_observableCatch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processGetAll(response_ as any);
                } catch (e) {
                    return _observableThrow(e) as any as Observable<GetAllQuestionsResponse[]>;
                }
            } else
                return _observableThrow(response_) as any as Observable<GetAllQuestionsResponse[]>;
        }));
    }

    protected processGetAll(response: HttpResponseBase): Observable<GetAllQuestionsResponse[]> {
        const status = response.status;
        const responseBlob =
            response instanceof HttpResponse ? response.body :
            (response as any).error instanceof Blob ? (response as any).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); }}
        if (status === 200) {
            return blobToText(responseBlob).pipe(_observableMergeMap((_responseText: string) => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            if (Array.isArray(resultData200)) {
                result200 = [] as any;
                for (let item of resultData200)
                    result200!.push(GetAllQuestionsResponse.fromJS(item));
            }
            else {
                result200 = <any>null;
            }
            return _observableOf(result200);
            }));
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).pipe(_observableMergeMap((_responseText: string) => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            }));
        }
        return _observableOf(null as any);
    }

    add(command: AddQuestionCommand): Observable<void> {
        let url_ = this.baseUrl + "/api/questions";
        url_ = url_.replace(/[?&]$/, "");

        const content_ = JSON.stringify(command);

        let options_ : any = {
            body: content_,
            observe: "response",
            responseType: "blob",
            headers: new HttpHeaders({
                "Content-Type": "application/json",
            })
        };

        return this.http.request("post", url_, options_).pipe(_observableMergeMap((response_ : any) => {
            return this.processAdd(response_);
        })).pipe(_observableCatch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processAdd(response_ as any);
                } catch (e) {
                    return _observableThrow(e) as any as Observable<void>;
                }
            } else
                return _observableThrow(response_) as any as Observable<void>;
        }));
    }

    protected processAdd(response: HttpResponseBase): Observable<void> {
        const status = response.status;
        const responseBlob =
            response instanceof HttpResponse ? response.body :
            (response as any).error instanceof Blob ? (response as any).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); }}
        if (status === 200) {
            return blobToText(responseBlob).pipe(_observableMergeMap((_responseText: string) => {
            return _observableOf(null as any);
            }));
        } else if (status === 400) {
            return blobToText(responseBlob).pipe(_observableMergeMap((_responseText: string) => {
            let result400: any = null;
            let resultData400 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            result400 = ValidationProblemDetails.fromJS(resultData400);
            return throwException("A server side error occurred.", status, _responseText, _headers, result400);
            }));
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).pipe(_observableMergeMap((_responseText: string) => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            }));
        }
        return _observableOf(null as any);
    }

    getQuestionById(id: number): Observable<Question> {
        let url_ = this.baseUrl + "/api/questions/{id}";
        if (id === undefined || id === null)
            throw new Error("The parameter 'id' must be defined.");
        url_ = url_.replace("{id}", encodeURIComponent("" + id));
        url_ = url_.replace(/[?&]$/, "");

        let options_ : any = {
            observe: "response",
            responseType: "blob",
            headers: new HttpHeaders({
                "Accept": "application/json"
            })
        };

        return this.http.request("get", url_, options_).pipe(_observableMergeMap((response_ : any) => {
            return this.processGetQuestionById(response_);
        })).pipe(_observableCatch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processGetQuestionById(response_ as any);
                } catch (e) {
                    return _observableThrow(e) as any as Observable<Question>;
                }
            } else
                return _observableThrow(response_) as any as Observable<Question>;
        }));
    }

    protected processGetQuestionById(response: HttpResponseBase): Observable<Question> {
        const status = response.status;
        const responseBlob =
            response instanceof HttpResponse ? response.body :
            (response as any).error instanceof Blob ? (response as any).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); }}
        if (status === 404) {
            return blobToText(responseBlob).pipe(_observableMergeMap((_responseText: string) => {
            let result404: any = null;
            let resultData404 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            result404 = ProblemDetails.fromJS(resultData404);
            return throwException("A server side error occurred.", status, _responseText, _headers, result404);
            }));
        } else if (status === 200) {
            return blobToText(responseBlob).pipe(_observableMergeMap((_responseText: string) => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            result200 = Question.fromJS(resultData200);
            return _observableOf(result200);
            }));
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).pipe(_observableMergeMap((_responseText: string) => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            }));
        }
        return _observableOf(null as any);
    }
}

export class GetAllQuestionsResponse implements IGetAllQuestionsResponse {
    id?: number;
    text?: string;
    category?: QuestionCategory;

    constructor(data?: IGetAllQuestionsResponse) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.id = _data["id"];
            this.text = _data["text"];
            this.category = _data["category"];
        }
    }

    static fromJS(data: any): GetAllQuestionsResponse {
        data = typeof data === 'object' ? data : {};
        let result = new GetAllQuestionsResponse();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["id"] = this.id;
        data["text"] = this.text;
        data["category"] = this.category;
        return data;
    }
}

export interface IGetAllQuestionsResponse {
    id?: number;
    text?: string;
    category?: QuestionCategory;
}

export enum QuestionCategory {
    Http = 1,
    Git = 2,
    Oop = 3,
    Sql = 4,
    CSharp = 5,
}

export class ProblemDetails implements IProblemDetails {
    type?: string | undefined;
    title?: string | undefined;
    status?: number | undefined;
    detail?: string | undefined;
    instance?: string | undefined;

    [key: string]: any;

    constructor(data?: IProblemDetails) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            for (var property in _data) {
                if (_data.hasOwnProperty(property))
                    this[property] = _data[property];
            }
            this.type = _data["type"];
            this.title = _data["title"];
            this.status = _data["status"];
            this.detail = _data["detail"];
            this.instance = _data["instance"];
        }
    }

    static fromJS(data: any): ProblemDetails {
        data = typeof data === 'object' ? data : {};
        let result = new ProblemDetails();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        for (var property in this) {
            if (this.hasOwnProperty(property))
                data[property] = this[property];
        }
        data["type"] = this.type;
        data["title"] = this.title;
        data["status"] = this.status;
        data["detail"] = this.detail;
        data["instance"] = this.instance;
        return data;
    }
}

export interface IProblemDetails {
    type?: string | undefined;
    title?: string | undefined;
    status?: number | undefined;
    detail?: string | undefined;
    instance?: string | undefined;

    [key: string]: any;
}

export class HttpValidationProblemDetails extends ProblemDetails implements IHttpValidationProblemDetails {
    errors?: { [key: string]: string[]; };

    [key: string]: any;

    constructor(data?: IHttpValidationProblemDetails) {
        super(data);
    }

    override init(_data?: any) {
        super.init(_data);
        if (_data) {
            for (var property in _data) {
                if (_data.hasOwnProperty(property))
                    this[property] = _data[property];
            }
            if (_data["errors"]) {
                this.errors = {} as any;
                for (let key in _data["errors"]) {
                    if (_data["errors"].hasOwnProperty(key))
                        (<any>this.errors)![key] = _data["errors"][key] !== undefined ? _data["errors"][key] : [];
                }
            }
        }
    }

    static override fromJS(data: any): HttpValidationProblemDetails {
        data = typeof data === 'object' ? data : {};
        let result = new HttpValidationProblemDetails();
        result.init(data);
        return result;
    }

    override toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        for (var property in this) {
            if (this.hasOwnProperty(property))
                data[property] = this[property];
        }
        if (this.errors) {
            data["errors"] = {};
            for (let key in this.errors) {
                if (this.errors.hasOwnProperty(key))
                    (<any>data["errors"])[key] = (<any>this.errors)[key];
            }
        }
        super.toJSON(data);
        return data;
    }
}

export interface IHttpValidationProblemDetails extends IProblemDetails {
    errors?: { [key: string]: string[]; };

    [key: string]: any;
}

export class ValidationProblemDetails extends HttpValidationProblemDetails implements IValidationProblemDetails {
    declare errors?: { [key: string]: string[]; }; //added DECLARE - AFTER MERGE

    [key: string]: any;

    constructor(data?: IValidationProblemDetails) {
        super(data);
    }

    override init(_data?: any) {
        super.init(_data);
        if (_data) {
            for (var property in _data) {
                if (_data.hasOwnProperty(property))
                    this[property] = _data[property];
            }
            if (_data["errors"]) {
                this.errors = {} as any;
                for (let key in _data["errors"]) {
                    if (_data["errors"].hasOwnProperty(key))
                        (<any>this.errors)![key] = _data["errors"][key] !== undefined ? _data["errors"][key] : [];
                }
            }
        }
    }

    static override fromJS(data: any): ValidationProblemDetails {
        data = typeof data === 'object' ? data : {};
        let result = new ValidationProblemDetails();
        result.init(data);
        return result;
    }

    override toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        for (var property in this) {
            if (this.hasOwnProperty(property))
                data[property] = this[property];
        }
        if (this.errors) {
            data["errors"] = {};
            for (let key in this.errors) {
                if (this.errors.hasOwnProperty(key))
                    (<any>data["errors"])[key] = (<any>this.errors)[key];
            }
        }
        super.toJSON(data);
        return data;
    }
}

export interface IValidationProblemDetails extends IHttpValidationProblemDetails {
    errors?: { [key: string]: string[]; };

    [key: string]: any;
}

export class AddQuestionCommand implements IAddQuestionCommand {
    id?: number | undefined;
    text?: string;
    type?: QuestionType;
    category?: QuestionCategory;
    answers?: AddQuestionAnswerRequest[];

    constructor(data?: IAddQuestionCommand) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.id = _data["id"];
            this.text = _data["text"];
            this.type = _data["type"];
            this.category = _data["category"];
            if (Array.isArray(_data["answers"])) {
                this.answers = [] as any;
                for (let item of _data["answers"])
                    this.answers!.push(AddQuestionAnswerRequest.fromJS(item));
            }
        }
    }

    static fromJS(data: any): AddQuestionCommand {
        data = typeof data === 'object' ? data : {};
        let result = new AddQuestionCommand();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["id"] = this.id;
        data["text"] = this.text;
        data["type"] = this.type;
        data["category"] = this.category;
        if (Array.isArray(this.answers)) {
            data["answers"] = [];
            for (let item of this.answers)
                data["answers"].push(item.toJSON());
        }
        return data;
    }
}

export interface IAddQuestionCommand {
    id?: number | undefined;
    text?: string;
    type?: QuestionType;
    category?: QuestionCategory;
    answers?: AddQuestionAnswerRequest[];
}

export enum QuestionType {
    RadioButton = 1,
    Checkbox = 2,
}

export class AddQuestionAnswerRequest implements IAddQuestionAnswerRequest {
    id?: number | undefined;
    text?: string;
    isCorrect?: boolean;

    constructor(data?: IAddQuestionAnswerRequest) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.id = _data["id"];
            this.text = _data["text"];
            this.isCorrect = _data["isCorrect"];
        }
    }

    static fromJS(data: any): AddQuestionAnswerRequest {
        data = typeof data === 'object' ? data : {};
        let result = new AddQuestionAnswerRequest();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["id"] = this.id;
        data["text"] = this.text;
        data["isCorrect"] = this.isCorrect;
        return data;
    }
}

export interface IAddQuestionAnswerRequest {
    id?: number | undefined;
    text?: string;
    isCorrect?: boolean;
}

export class Question implements IQuestion {
    id?: number;
    text?: string;
    category?: QuestionCategory;
    type?: QuestionType;
    answers?: Answer[];

    constructor(data?: IQuestion) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.id = _data["id"];
            this.text = _data["text"];
            this.category = _data["category"];
            this.type = _data["type"];
            if (Array.isArray(_data["answers"])) {
                this.answers = [] as any;
                for (let item of _data["answers"])
                    this.answers!.push(Answer.fromJS(item));
            }
        }
    }

    static fromJS(data: any): Question {
        data = typeof data === 'object' ? data : {};
        let result = new Question();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["id"] = this.id;
        data["text"] = this.text;
        data["category"] = this.category;
        data["type"] = this.type;
        if (Array.isArray(this.answers)) {
            data["answers"] = [];
            for (let item of this.answers)
                data["answers"].push(item.toJSON());
        }
        return data;
    }
}

export interface IQuestion {
    id?: number;
    text?: string;
    category?: QuestionCategory;
    type?: QuestionType;
    answers?: Answer[];
}

export class Answer implements IAnswer {
    id?: number;
    text?: string;
    isCorrect?: boolean;
    isDeleted?: boolean;

    constructor(data?: IAnswer) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.id = _data["id"];
            this.text = _data["text"];
            this.isCorrect = _data["isCorrect"];
            this.isDeleted = _data["isDeleted"];
        }
    }

    static fromJS(data: any): Answer {
        data = typeof data === 'object' ? data : {};
        let result = new Answer();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["id"] = this.id;
        data["text"] = this.text;
        data["isCorrect"] = this.isCorrect;
        data["isDeleted"] = this.isDeleted;
        return data;
    }
}

export interface IAnswer {
    id?: number;
    text?: string;
    isCorrect?: boolean;
    isDeleted?: boolean;
}

export class ApiException extends Error {
    override message: string;
    status: number;
    response: string;
    headers: { [key: string]: any; };
    result: any;

    constructor(message: string, status: number, response: string, headers: { [key: string]: any; }, result: any) {
        super();

        this.message = message;
        this.status = status;
        this.response = response;
        this.headers = headers;
        this.result = result;
    }

    protected isApiException = true;

    static isApiException(obj: any): obj is ApiException {
        return obj.isApiException === true;
    }
}

function throwException(message: string, status: number, response: string, headers: { [key: string]: any; }, result?: any): Observable<any> {
    if (result !== null && result !== undefined)
        return _observableThrow(result);
    else
        return _observableThrow(new ApiException(message, status, response, headers, null));
}

function blobToText(blob: any): Observable<string> {
    return new Observable<string>((observer: any) => {
        if (!blob) {
            observer.next("");
            observer.complete();
        } else {
            let reader = new FileReader();
            reader.onload = event => {
                observer.next((event.target as any).result);
                observer.complete();
            };
            reader.readAsText(blob);
        }
    });
}