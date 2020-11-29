import {Component, ViewEncapsulation} from '@angular/core';
import { Router } from '@angular/router';
import { ScullyRoutesService } from '@scullyio/ng-lib';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css'],
  preserveWhitespaces: true,
  encapsulation: ViewEncapsulation.Emulated

})
export class BlogComponent {

  constructor(
    private srs: ScullyRoutesService,
    private router: Router
  ) {}
 
    curLocation = this.router.url;
    currentPost$ = this.srs.available$.pipe(
      map(list =>
        list.find(route => this.curLocation === route.route.trim())
      )
    );

}
