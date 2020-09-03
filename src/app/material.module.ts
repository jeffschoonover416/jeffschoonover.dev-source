import { NgModule } from '@angular/core';

import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';

@NgModule({
    imports: [
        MatSidenavModule,
        MatToolbarModule,
        MatListModule,
        MatIconModule,
        MatMenuModule
    ],
    exports: [
        MatSidenavModule,
        MatToolbarModule,
        MatListModule,
        MatIconModule,
        MatMenuModule
    ],
    providers: [],
    bootstrap: []
  })
  export class MaterialModule { }
  