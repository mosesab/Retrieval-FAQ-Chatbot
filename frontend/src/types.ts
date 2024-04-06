import { HttpContext, HttpHeaders, HttpParams } from '@angular/common/http';


/* Used by FAQS Component */
export interface PaginationResponse {
  items: any[];
  page: number;
  perPage: number;
  totalRecords: number;
}


export interface PaginationParameters {
  pageNumber: number;
  perPage: number;
}

export interface FAQEntry {
    category: string;
    question: string;
    answer: string;
    index: string;
}


/* Used by API service for Post Requests */

export interface RequestBody {
  query: string;
}



/* Used by API Service */
export interface Options {
  headers?:
    | HttpHeaders
    | {
        [header: string]: string | string[];
      };
  observe?: 'body';
  context?: HttpContext;
  params?: | HttpParams
    |{pageNumber: number; perPage: number;};
  reportProgress?: boolean;
  responseType?: 'json';
  withCredentials?: boolean;
  transferCache?:
    | {
        includeHeaders?: string[];
      }
    | boolean;
}


