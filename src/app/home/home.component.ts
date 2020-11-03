import { Component } from '@angular/core';
import { ScullyRoute, ScullyRoutesService } from '@scullyio/ng-lib';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  blogs$ = this.srs.available$.pipe(
      map((routeList) => routeList.filter((route: ScullyRoute) => route.route.startsWith(`/posts/`))),
      map((blogs) => blogs.sort((a, b) => (a.date < b.date ? 1 : -1)))
  );
  

  constructor(private srs: ScullyRoutesService) {}

}
