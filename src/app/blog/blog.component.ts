import { Component, OnInit} from '@angular/core';
import { ScullyRoutesService, ScullyRoute } from '@scullyio/ng-lib';
import { map } from 'rxjs/operators';


@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {

  constructor(private scully: ScullyRoutesService) { }
  

  ngOnInit() {
    //Good for troubleshooting.  Make sure all the routes you think should be there are
    //this.scully.available$.subscribe(routes => console.log(routes));
  }

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
