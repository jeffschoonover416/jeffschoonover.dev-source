import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  
  { path: '', loadChildren: () => import('./home/home.module').then(m => m.HomeModule) },
  { path: 'posts', loadChildren: () => import('./blog/blog.module').then(m => m.BlogModule) },
  { path: 'join-email-list', loadChildren: () => import('./join-email/join-email.module').then(m => m.JoinEmailModule) },
  { path: 'about', loadChildren: () => import('./about/about.module').then(m => m.AboutModule) },
  { path: 'projects', loadChildren: () => import('./projects/projects.module').then(m => m.ProjectsModule) },
  { path: 'learn', loadChildren: () => import('./learn/learn.module').then(m => m.LearnModule) },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
