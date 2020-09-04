import { NgModule } from '@angular/core';

import { MatToolbarModule } from '@angular/material/toolbar'
import { MatIconModule } from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';

@NgModule({
    imports: [
        MatToolbarModule,
        MatIconModule,
        MatMenuModule
    ],
    exports: [
        MatToolbarModule,
        MatIconModule,
        MatMenuModule
    ],
    providers: [],
    bootstrap: []
  })
  export class MaterialModule { }
  