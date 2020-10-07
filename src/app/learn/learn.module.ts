import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LearnRoutingModule } from './learn-routing.module';
import { LearnComponent } from './learn.component';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [LearnComponent],
  imports: [
    CommonModule,
    LearnRoutingModule,
    SharedModule,
    
  ]
})
export class LearnModule { }
