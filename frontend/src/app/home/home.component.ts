import { Component,
OnInit,
AfterViewInit,
ViewChild, 
HostListener, 
ElementRef} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatComponent } from '../components/chat/chat.component';

import { ApiService } from  '../services/api.service';
import { Observable } from 'rxjs';
import { RequestBody } from '../../types';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    ChatComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {

  constructor(private elementRef: ElementRef, private apiService: ApiService) {}

  @ViewChild(ChatComponent) 
  chatComponent!: ChatComponent;

  
  introText = "FUOYE FAQS Chatbot"
  passageText = "FUOYE FAQS Chatbot is a retrival based chatbot that answers frequntly asked questions about FUOYE"
  scrollSpeed: number = 0.5;
  
  faqsArray: { category: string, question: string, answer: string, index: string}[] =[];
  
  // styles.css explicit list of color variables
  stylesColorVariablesArray: string[] = [
  "var(--primary-color)",
  "var(--highlight-color)",
  "var(--secondary-color)"];
  
  ngOnInit(): void{
      // make it so the colors of the cards is set on init but shuffled on refresh
      this.stylesColorVariablesArray.sort(() => Math.random() - 0.5);
  }
  
  ngAfterViewInit(): void {
      for (let i = 0; i < 5; i++) {
            this.faqsArray.push({category: "Category", 
                question: "Question", answer: "Answer", index: (i + 1).toString()})
      }
  }

  
  // returns a color from the stylesColorVariables
  faqCardColor(cardIndex: string){
      let index = Number(cardIndex);
      if (index >=this.stylesColorVariablesArray.length) {
          index = index - this.stylesColorVariablesArray.length
      }
      return this.stylesColorVariablesArray[index];
   }
     
  
  // On Page Scroll do Parallax Scrolling on Hero Section
  @HostListener('window:scroll', ['$event'])
  onScroll(event: Event): void {
    const windowHeight = window.innerHeight;
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    const scrollBottom = scrollTop + windowHeight;
    const elementOffsetTop = this.elementRef.nativeElement.offsetTop;
    const elementOffsetBottom = elementOffsetTop + this.elementRef.nativeElement.offsetHeight;
    
    const heroBackground = document.querySelector('.hero-background') as HTMLElement;
    const heroMiddleground = document.querySelector('.hero-middleground') as HTMLElement;
    const heroForeground = document.querySelector('.hero-foreground') as HTMLElement;


    if (scrollBottom > elementOffsetTop && scrollTop < elementOffsetBottom) {
      const backgroundOffset = -(scrollTop * this.scrollSpeed) * 0.7;
      const middlegroundOffset = -(scrollTop * (this.scrollSpeed * 1.4)); // Adjust the speed for foreground image
      const foregroundOffset = -(scrollTop * (this.scrollSpeed * 1.8)); // Adjust the speed for foreground image
      
    
      heroBackground.style.backgroundPosition = `center ${backgroundOffset}px`;
      heroMiddleground.style.backgroundPosition = `center ${middlegroundOffset}px`;
      heroForeground.style.backgroundPosition = `center ${foregroundOffset}px`;
      
          
    }
  }
  

  //  Called by a child component's event emitter
  onChatSendMessage(userInput: string=""): void {
      const requestBody: RequestBody = {query: userInput};
      
      this.sendRequest(this.apiService.postUrl, requestBody).subscribe(
        (response: any) => {
            console.log("API Chat Response:", response);
            if (response.length > 0) {
                  // show the answer from the first item in response in chatComponent
                  this.chatComponent.showMessage(response[0].Answer);
                  
                  // empty the faqsArray array
                  this.faqsArray.splice(0, this.faqsArray.length);
                  for (let i = 0; i < response.length; i++) {
                        this.faqsArray.push({category: response[i].Category, 
                            question: response[i].Question, answer: response[i].Answer, index: (i + 1).toString()})
                  }
            } },
            
            (error: any) => {
                // Handle errors if any
                console.error("API Chat Error:", error);
            }
      );
      
  }
  
    // Send API request to ask the bot a question
  sendRequest(url: string, body: RequestBody): Observable<any>{
    return this.apiService.post(url, body, {});
  };
  

}








