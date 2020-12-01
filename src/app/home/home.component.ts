import { Component } from '@angular/core';
import { ScullyRoute, ScullyRoutesService } from '@scullyio/ng-lib';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  scullyPosts$ = this.srs.available$.pipe(
      map((routeList: ScullyRoute[]) => routeList.filter((route: ScullyRoute) => {
        if (!route.tags) {
          return false;
        } else {
          return(route.tags.includes("jeffschoonover.dev"));
        };
      })),
      map((blogs) => blogs.sort((a, b) => (a.date < b.date ? 1 : -1)))
  );

  routerPosts$ = this.srs.available$.pipe(
    map((routeList: ScullyRoute[]) => routeList.filter((route: ScullyRoute) => {
      if (!route.tags) {
        return false;
      } else {
        return(route.tags.includes("routernote"));
      };
    })),
    map((blogs) => blogs.sort((a, b) => (a.date < b.date ? 1 : -1)))
);
  

  constructor(private srs: ScullyRoutesService) {}

}
