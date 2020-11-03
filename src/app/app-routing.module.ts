import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  
  { 
    path: '', loadChildren: () => import('./home/home.module').then(m => m.HomeModule), 
    data: {
      "title": "Jeff Schoonover, Angular development"
    } 
  },
  { 
    path: 'posts', loadChildren: () => import('./blog/blog.module').then(m => m.BlogModule), 
    data: {
      "title": "Posts - Jeff Schoonover, Angular development"
    } 
  },
  { 
    path: 'about', loadChildren: () => import('./about/about.module').then(m => m.AboutModule), 
    data: {
      "title": "About Jeff - Jeff Schoonover, Angular development"
    } 
  },
  { 
    path: 'projects', loadChildren: () => import('./projects/projects.module').then(m => m.ProjectsModule), 
    data: {
      "title": "Projects - Jeff Schoonover, Angular development"
    } 
  },
  { 
    path: 'learn', loadChildren: () => import('./learn/learn.module').then(m => m.LearnModule), 
    data: {
      "title": "Learn in Public - Jeff Schoonover, Angular development"
    } 
  },
  
  //{ path: 'join-email-list', loadChildren: () => import('./join-email/join-email.module').then(m => m.JoinEmailModule), data: {"title": "Join E-mail"} },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
