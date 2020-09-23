import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { MaterialModule } from '../material.module';
import { FlexLayoutModule } from '@angular/flex-layout';

import { FooterComponent } from './footer/footer.component';

const routes: Routes = []

@NgModule({
  providers: [],
  declarations: [FooterComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FlexLayoutModule
  ],
  exports: [
    RouterModule,
    MaterialModule,
    FlexLayoutModule,
    FooterComponent,
  ]
})
export class SharedModule { }