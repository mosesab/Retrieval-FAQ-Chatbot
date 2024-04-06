import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FaqsComponent } from './faqs/faqs.component';

const routes: Routes = [
  {
    path: '', 
    component: FaqsComponent 
  },
  // Add more routes as needed
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FaqsComponent
  ],
  exports: [RouterModule]
})
export class FaqsModule {}
