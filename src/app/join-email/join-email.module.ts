import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { JoinEmailRoutingModule } from './join-email-routing.module';
import { JoinEmailComponent } from './join-email.component';


@NgModule({
  declarations: [JoinEmailComponent],
  imports: [
    CommonModule,
    JoinEmailRoutingModule
  ]
})
export class JoinEmailModule { }
