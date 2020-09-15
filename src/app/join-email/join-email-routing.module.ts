import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { JoinEmailComponent } from './join-email.component';

const routes: Routes = [{ path: '', component: JoinEmailComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JoinEmailRoutingModule { }
