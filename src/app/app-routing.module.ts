import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  
  { path: '', loadChildren: () => import('./home/home.module').then(m => m.HomeModule), pathMatch: 'full' },
  
  { path: 'about', loadChildren: () => import('./about/about.module').then(m => m.AboutModule) },
  
  { path: 'learn', loadChildren: () => import('./learn/learn.module').then(m => m.LearnModule) },
  
  { path: 'projects', loadChildren: () => import('./projects/projects.module').then(m => m.ProjectsModule) },
  
  { path: 'join-email-list', loadChildren: () => import('./join-email/join-email.module').then(m => m.JoinEmailModule) },
  
  { path: 'posts', loadChildren: () => import('./blog/blog.module').then(m => m.BlogModule) },
  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
