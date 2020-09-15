import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AboutRoutingModule } from './about-routing.module';
import { AboutComponent } from './about.component';
import { ScullyLibModule } from '@scullyio/ng-lib';

import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [AboutComponent],
  imports: [
    CommonModule,
    AboutRoutingModule,
    ScullyLibModule,
    SharedModule
  ]
})
export class AboutModule { }
