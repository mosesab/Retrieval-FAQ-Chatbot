import { Component, OnInit, ViewChild} from '@angular/core';
import { CommonModule, NgFor} from '@angular/common';

import { ApiService } from  '../../../services/api.service';
import { Observable } from 'rxjs';
import { PaginationParameters, PaginationResponse, Options, FAQEntry } from '../../../../types';

import { TableModule } from 'primeng/table';

@Component({
  selector: 'app-faqs',
  standalone: true,
  imports: [
      CommonModule, TableModule
      ],
  templateUrl: './faqs.component.html',
  styleUrl: './faqs.component.scss'
})




export class FaqsComponent {
  
  constructor(private apiService: ApiService) { }
  
  headers: string[] = ["Index", "Category", "Question", "Answer"];
  faqsArray: FAQEntry[] = [];
  
  currentAPIPage: number = 0;
  totalAPIRecords: number = 0;


  
  ngOnInit(): void {
    this.fetchFaqs(1);
  }
  
  pageChange(event: any) {
      console.log("event.first :", event.first );
      console.log("event.rows :", event.rows );
      console.log("this.faqsArray.length  :", this.faqsArray.length );
      
      let timeToLoadMore: boolean = event.first >= (this.faqsArray.length - event.rows);
      let thereIsMoreToLoad: boolean = this.faqsArray.length < this.totalAPIRecords;
      
      console.log("timeToLoadMore :", timeToLoadMore );
      console.log("thereIsMoreToLoad :", thereIsMoreToLoad );
      
      if (timeToLoadMore && thereIsMoreToLoad){
            this.fetchFaqs(this.currentAPIPage+1);
      }
  }

  resetPaginator() {
    //this.paginator?.changePage(0);
    console.log("resetPaginator() called");
  }


  fetchFaqs(page: number): void {
        
      const params: PaginationParameters = {pageNumber: page, perPage: 70};
      
      //{params, responseType: 'json'}
     
      this.sendRequest(this.apiService.getUrl, params).subscribe(
        (response: any) => {
            console.log("API FAQ Response:", response);
            // add the faqs in the response to data
            this.currentAPIPage = response.page;
            this.totalAPIRecords = response.totalRecords;
            for (let i = 0; i < response.items.length; i++) {
                  this.faqsArray.push({
                      category: response.items[i].Category, 
                      question: response.items[i].Question, 
                      answer: response.items[i].Answer, 
                      index: (this.faqsArray.length + 1).toString()
                  })
            }
            },
            
            (error: any) => {
                // Handle errors if any
                console.error("API FAQ Error:", error);
            }
      );
      
  }
  
    // Send API requevst to retrieve faqa from the bot
  sendRequest(url: string, params: PaginationParameters): Observable<any>{
    return this.apiService.postGet(url, params, {});
  };
  
    
  
}

