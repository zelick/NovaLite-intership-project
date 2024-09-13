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
    create(command: CreateQuestionCommand): Observable<number>;
    update(command: UpdateQuestionCommand): Observable<Question>;
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

    create(command: CreateQuestionCommand): Observable<number> {
        let url_ = this.baseUrl + "/api/questions";
        url_ = url_.replace(/[?&]$/, "");

        const content_ = JSON.stringify(command);

        let options_ : any = {
            body: content_,
            observe: "response",
            responseType: "blob",
            headers: new HttpHeaders({
                "Content-Type": "application/json",
                "Accept": "application/json"
            })
        };

        return this.http.request("post", url_, options_).pipe(_observableMergeMap((response_ : any) => {
            return this.processCreate(response_);
        })).pipe(_observableCatch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processCreate(response_ as any);
                } catch (e) {
                    return _observableThrow(e) as any as Observable<number>;
                }
            } else
                return _observableThrow(response_) as any as Observable<number>;
        }));
    }

    protected processCreate(response: HttpResponseBase): Observable<number> {
        const status = response.status;
        const responseBlob =
            response instanceof HttpResponse ? response.body :
            (response as any).error instanceof Blob ? (response as any).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); }}
        if (status === 200) {
            return blobToText(responseBlob).pipe(_observableMergeMap((_responseText: string) => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
                result200 = resultData200 !== undefined ? resultData200 : <any>null;
    
            return _observableOf(result200);
            }));
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).pipe(_observableMergeMap((_responseText: string) => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            }));
        }
        return _observableOf(null as any);
    }

    update(command: UpdateQuestionCommand): Observable<Question> {
        let url_ = this.baseUrl + "/api/questions";
        url_ = url_.replace(/[?&]$/, "");

        const content_ = JSON.stringify(command);

        let options_ : any = {
            body: content_,
            observe: "response",
            responseType: "blob",
            headers: new HttpHeaders({
                "Content-Type": "application/json",
                "Accept": "application/json"
            })
        };

        return this.http.request("put", url_, options_).pipe(_observableMergeMap((response_ : any) => {
            return this.processUpdate(response_);
        })).pipe(_observableCatch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processUpdate(response_ as any);
                } catch (e) {
                    return _observableThrow(e) as any as Observable<Question>;
                }
            } else
                return _observableThrow(response_) as any as Observable<Question>;
        }));
    }

    protected processUpdate(response: HttpResponseBase): Observable<Question> {
        const status = response.status;
        const responseBlob =
            response instanceof HttpResponse ? response.body :
            (response as any).error instanceof Blob ? (response as any).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); }}
        if (status === 200) {
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
        if (status === 200) {
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

export class CreateQuestionCommand implements ICreateQuestionCommand {
    text?: string;
    type?: QuestionType;
    category?: QuestionCategory;
    answers?: CreateQuestionAnswerRequest[];

    constructor(data?: ICreateQuestionCommand) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.text = _data["text"];
            this.type = _data["type"];
            this.category = _data["category"];
            if (Array.isArray(_data["answers"])) {
                this.answers = [] as any;
                for (let item of _data["answers"])
                    this.answers!.push(CreateQuestionAnswerRequest.fromJS(item));
            }
        }
    }

    static fromJS(data: any): CreateQuestionCommand {
        data = typeof data === 'object' ? data : {};
        let result = new CreateQuestionCommand();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
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

export interface ICreateQuestionCommand {
    text?: string;
    type?: QuestionType;
    category?: QuestionCategory;
    answers?: CreateQuestionAnswerRequest[];
}

export enum QuestionType {
    RadioButton = 1,
    Checkbox = 2,
}

export class CreateQuestionAnswerRequest implements ICreateQuestionAnswerRequest {
    text?: string;
    isCorrect?: boolean;

    constructor(data?: ICreateQuestionAnswerRequest) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.text = _data["text"];
            this.isCorrect = _data["isCorrect"];
        }
    }

    static fromJS(data: any): CreateQuestionAnswerRequest {
        data = typeof data === 'object' ? data : {};
        let result = new CreateQuestionAnswerRequest();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["text"] = this.text;
        data["isCorrect"] = this.isCorrect;
        return data;
    }
}

export interface ICreateQuestionAnswerRequest {
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
        return data;
    }
}

export interface IAnswer {
    id?: number;
    text?: string;
    isCorrect?: boolean;
}

export class UpdateQuestionCommand implements IUpdateQuestionCommand {
    id?: number;
    text?: string;
    type?: QuestionType;
    category?: QuestionCategory;
    answers?: UpdateQuestionAnswerRequest[];

    constructor(data?: IUpdateQuestionCommand) {
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
                    this.answers!.push(UpdateQuestionAnswerRequest.fromJS(item));
            }
        }
    }

    static fromJS(data: any): UpdateQuestionCommand {
        data = typeof data === 'object' ? data : {};
        let result = new UpdateQuestionCommand();
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

export interface IUpdateQuestionCommand {
    id?: number;
    text?: string;
    type?: QuestionType;
    category?: QuestionCategory;
    answers?: UpdateQuestionAnswerRequest[];
}

export class UpdateQuestionAnswerRequest implements IUpdateQuestionAnswerRequest {
    id?: number;
    text?: string;
    isCorrect?: boolean;

    constructor(data?: IUpdateQuestionAnswerRequest) {
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

    static fromJS(data: any): UpdateQuestionAnswerRequest {
        data = typeof data === 'object' ? data : {};
        let result = new UpdateQuestionAnswerRequest();
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

export interface IUpdateQuestionAnswerRequest {
    id?: number;
    text?: string;
    isCorrect?: boolean;
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