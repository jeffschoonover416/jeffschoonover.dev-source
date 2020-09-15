import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { ScullyRoutesService, ScullyRoute } from '@scullyio/ng-lib';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  constructor(
    private scully: ScullyRoutesService) {}
  
    $blogPosts = this.scully.available$.pipe(
      //Start with array of all available (publish=true) routes
      map((routes: ScullyRoute[]) =>  
        routes.filter(
          //Look at each route in the array, and keep only .md files with /posts/ route
          //(that is all the blog posts)
          //sourcefile? has the question mark because some routes might not have a sourcefile
          (route: ScullyRoute) => 
          route.route.startsWith('/posts/') && route.sourceFile?.endsWith('.md')
        )
      ),
      //Sort the array of filtered routes in descending order *before* passing it to the 
      //async pipe in the html code
      map((filteredRoutes: ScullyRoute[]) => {
        return filteredRoutes.sort( (postA: ScullyRoute, postB: ScullyRoute) => {
          return ((+new Date(postB['date'])) - (+new Date(postA['date'])));
        });
      }),
    );

}
