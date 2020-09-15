import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BlogComponent } from './blog.component';
import { BlogPostComponent } from './blog-post/blog-post.component';

const routes: Routes = [

  { path: ":postId", component: BlogPostComponent },
  
  { path: '', component: BlogComponent },
  
  { path: "**", component: BlogPostComponent },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BlogRoutingModule { }
