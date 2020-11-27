import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ScullyRoutesService, ScullyRoute } from '@scullyio/ng-lib';
import { Observable, of } from 'rxjs';
import { map, pluck } from 'rxjs/operators';


declare var ng: any;

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css'],
  preserveWhitespaces: true,
  encapsulation: ViewEncapsulation.Emulated

})
export class BlogComponent implements OnInit {
  
  article;

  constructor(
    private activatedRoute: ActivatedRoute,
    private srs: ScullyRoutesService,
    private router: Router
  ) {}

  currentRoute = this.srs.available$.subscribe(routes =>
    console.log(routes));

  ngOnInit() {
    
    
    console.log(this.article);
    //console.log(this.router.url);
    //console.log(this.currentRoute);
    

  }

  
    curLocation = this.router.url;
    currentPost$ = this.srs.available$.pipe(
      map(list =>
        list.find(
          route =>
            this.curLocation === route.route.trim()
        )
      )
    );

}
