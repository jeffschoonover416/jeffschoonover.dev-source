import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BlogRoutingModule } from './blog-routing.module';
import { BlogComponent } from './blog.component';
import { BlogPostComponent } from './blog-post/blog-post.component';
import { ScullyLibModule } from '@scullyio/ng-lib';
import { JoinEmailComponent } from '../join-email/join-email.component';
import { FlexLayoutModule } from '@angular/flex-layout';


@NgModule({
  declarations: [
    BlogComponent,
    BlogPostComponent,
    JoinEmailComponent,
  ],
  imports: [
    CommonModule,
    BlogRoutingModule,
    ScullyLibModule,
    FlexLayoutModule
  ]
})
export class BlogModule { }
