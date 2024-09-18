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

export interface IExamClient {
    createExam(candidate: GenerateExamCommand): Observable<GenerateExamResponse>;
}

@Injectable({
    providedIn: 'root'
})
export class ExamClient implements IExamClient {
    private http: HttpClient;
    private baseUrl: string;
    protected jsonParseReviver: ((key: string, value: any) => any) | undefined = undefined;

    constructor(@Inject(HttpClient) http: HttpClient, @Optional() @Inject(API_BASE_URL) baseUrl?: string) {
        this.http = http;
        this.baseUrl = baseUrl ?? "https://localhost:7096";
    }

    createExam(candidate: GenerateExamCommand): Observable<GenerateExamResponse> {
        let url_ = this.baseUrl + "/api/exams";
        url_ = url_.replace(/[?&]$/, "");

        const content_ = JSON.stringify(candidate);

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
            return this.processCreateExam(response_);
        })).pipe(_observableCatch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processCreateExam(response_ as any);
                } catch (e) {
                    return _observableThrow(e) as any as Observable<GenerateExamResponse>;
                }
            } else
                return _observableThrow(response_) as any as Observable<GenerateExamResponse>;
        }));
    }

    protected processCreateExam(response: HttpResponseBase): Observable<GenerateExamResponse> {
        const status = response.status;
        const responseBlob =
            response instanceof HttpResponse ? response.body :
            (response as any).error instanceof Blob ? (response as any).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); }}
        if (status === 200) {
            return blobToText(responseBlob).pipe(_observableMergeMap((_responseText: string) => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            result200 = GenerateExamResponse.fromJS(resultData200);
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

export class GenerateExamResponse implements IGenerateExamResponse {
    id?: number;
    examQuestions?: ExamQuestionDto[];

    constructor(data?: IGenerateExamResponse) {
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
            if (Array.isArray(_data["examQuestions"])) {
                this.examQuestions = [] as any;
                for (let item of _data["examQuestions"])
                    this.examQuestions!.push(ExamQuestionDto.fromJS(item));
            }
        }
    }

    static fromJS(data: any): GenerateExamResponse {
        data = typeof data === 'object' ? data : {};
        let result = new GenerateExamResponse();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["id"] = this.id;
        if (Array.isArray(this.examQuestions)) {
            data["examQuestions"] = [];
            for (let item of this.examQuestions)
                data["examQuestions"].push(item.toJSON());
        }
        return data;
    }
}

export interface IGenerateExamResponse {
    id?: number;
    examQuestions?: ExamQuestionDto[];
}

export class ExamQuestionDto implements IExamQuestionDto {
    questionId?: number;
    questionText?: string;
    selectedAnswers?: AnswerDto[];

    constructor(data?: IExamQuestionDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.questionId = _data["questionId"];
            this.questionText = _data["questionText"];
            if (Array.isArray(_data["selectedAnswers"])) {
                this.selectedAnswers = [] as any;
                for (let item of _data["selectedAnswers"])
                    this.selectedAnswers!.push(AnswerDto.fromJS(item));
            }
        }
    }

    static fromJS(data: any): ExamQuestionDto {
        data = typeof data === 'object' ? data : {};
        let result = new ExamQuestionDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["questionId"] = this.questionId;
        data["questionText"] = this.questionText;
        if (Array.isArray(this.selectedAnswers)) {
            data["selectedAnswers"] = [];
            for (let item of this.selectedAnswers)
                data["selectedAnswers"].push(item.toJSON());
        }
        return data;
    }
}

export interface IExamQuestionDto {
    questionId?: number;
    questionText?: string;
    selectedAnswers?: AnswerDto[];
}

export class AnswerDto implements IAnswerDto {
    answerId?: number;
    answerText?: string;

    constructor(data?: IAnswerDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.answerId = _data["answerId"];
            this.answerText = _data["answerText"];
        }
    }

    static fromJS(data: any): AnswerDto {
        data = typeof data === 'object' ? data : {};
        let result = new AnswerDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["answerId"] = this.answerId;
        data["answerText"] = this.answerText;
        return data;
    }
}

export interface IAnswerDto {
    answerId?: number;
    answerText?: string;
}

export class GenerateExamCommand implements IGenerateExamCommand {
    name?: string;
    surname?: string;
    email?: string;

    constructor(data?: IGenerateExamCommand) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.name = _data["name"];
            this.surname = _data["surname"];
            this.email = _data["email"];
        }
    }

    static fromJS(data: any): GenerateExamCommand {
        data = typeof data === 'object' ? data : {};
        let result = new GenerateExamCommand();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["name"] = this.name;
        data["surname"] = this.surname;
        data["email"] = this.email;
        return data;
    }
}

export interface IGenerateExamCommand {
    name?: string;
    surname?: string;
    email?: string;
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