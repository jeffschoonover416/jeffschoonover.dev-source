import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import {
  ScullyRoute,
  ScullyRoutesService,
  TransferStateService,
  isScullyGenerated,
  isScullyRunning,
  
} from '@scullyio/ng-lib';
import { map, take } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  //changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
  
  blogs$ = this.sts.useScullyTransferState(
    'blogRoutes',
    this.srs.available$.pipe(
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
    ));
      // map((routeList) => routeList.filter((route: ScullyRoute) => route.route.startsWith(`/posts/`))),
      // map((blogs) => blogs.sort((a, b) => (a.date < b.date ? -1 : 1)))

    

  constructor(private srs: ScullyRoutesService, private sts: TransferStateService) {}
  
  // constructor(
  //   private scully: ScullyRoutesService,
  //   private transferStateService: TransferStateService
  // ) {
  
  // this.blogPosts$ = this.transferStateService.useScullyTransferState(
  //   'blogPostRoutes', this.scully.available$.pipe(
  //     //Start with array of all available (publish=true) routes
  //     map((routes: ScullyRoute[]) =>  
  //       routes.filter(
  //         //Look at each route in the array, and keep only .md files with /posts/ route
  //         //(that is all the blog posts)
  //         //sourcefile? has the question mark because some routes might not have a sourcefile
  //         (route: ScullyRoute) => 
  //         route.route.startsWith('/posts/') && route.sourceFile?.endsWith('.md')
  //       )
  //     ),
  //     //Sort the array of filtered routes in descending order *before* passing it to the 
  //     //async pipe in the html code
  //     map((filteredRoutes: ScullyRoute[]) => {
  //       return filteredRoutes.sort( (postA: ScullyRoute, postB: ScullyRoute) => {
  //         return ((+new Date(postB['date'])) - (+new Date(postA['date'])));
  //       });
  //     }),
  //   ));
    

   
}

