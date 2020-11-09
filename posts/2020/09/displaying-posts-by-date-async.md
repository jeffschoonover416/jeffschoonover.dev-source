---
title: Display a list of your posts sorted by date with Angular and Scully
description: How to use *ngFor and the async pipe in combination with Scully's route service to display a list of markdown blog posts by date.
published: true
author: Jeff Schoonover
slug: display-a-list-of-posts-sorted-by-date-with-angular-and-scully
date: '2020-09-01'
tags:
  - jeffschoonover.dev
---

## How to display a list of your posts sorted by date with Angular and Scully

I linked these earlier, but here are background links:

- [Making an Angular Blog with Scully](https://unicorn-utterances.com/posts/making-an-angular-blog-with-scully/)
- [How to migrate WordPress to Scully](https://indepth.dev/how-to-migrate-wordpress-to-scully/) is where I got the sort-by-date code

The first link above has code for displaying a list of posts with Scully.  But it is not sorted by date, which is the goal of this post.  It required me to understand observables and rxjs a little better, a welcome chance to learn by doing!  Here is the original code:

```js
// blog.component.ts
import { Component } from '@angular/core';
import { ScullyRoutesService } from '@scullyio/ng-lib';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent {
  constructor(private scully: ScullyRoutesService) {}

  $blogPosts = this.scully.available$.pipe(
    map(routes =>
      routes.filter(
        route =>
          route.route.startsWith('/blog/') && route.sourceFile.endsWith('.md')
      )
    )
  );
}
```

```html
<!-- blog.component.html -->
<ul aria-label="Blog posts">
  <li *ngFor="let blog of $blogPosts | async">
    <a [routerLink]="blog.route">
      {{blog.title}} by {{blog.authorName}}
    </a>
  </li>
</ul>
```

And here is my code with lots of comments.  First, the typescript:

```js
//blog.component.ts
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
    this.scully.available$.subscribe(routes => console.log(routes));
  }

  $blogPosts = this.scully.available$.pipe(
    //Start with array of all available (publish=true) routes
    map((routes: ScullyRoute[]) =>  
      routes.filter(
        //Look at each route in the array, and keep only .md files with /posts/ route
        //(that is all the blog posts)
        //sourcefile? has the question mark (optional)
        //in case you are not filtering by route folder
        //The root route "/" does not have a sourcefile
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
```

The most important thing for me to wrap my head around with this code is that the observable `this.scully.available$` sends out a ScullyRoute array each time it fires.  For my use case as a simple blog it should just need to be called once and I get the array that is in `/assets/scully-routes.json` (if it looks like a mess when you open it up, Shift+Alt+F in VS Code).  I imported `ScullyRoute` from `@scullyio/ng-lib` and used it to type the observable stream to keep things straight and get type support.

Here is my short explanation of the rxjs operators used in this code:

- *Pipe* takes the `this.scully.available$` observable (the $ in the name is an optional naming convention for observables) and returns a new observable.  This new observable is going to be just the list of blog posts (instead of all the routes), sorted by date.
- *Filter* looks at each `ScullyRoute` in the `ScullyRoute[]` and filters it based on the set criteria (in the above case, that the route starts with `/posts/`) and the source file is Markdown.  Change the route to match your folder structure.
- *Sort* sorts the filtered array by date.  Note that you shouldn't try to sort observable streams in real-time as you take a big performance hit.  But we are not trying to sort a stream of individual routes here, we are sorting an array.

I played around with the date quite a bit.  The `new Date()` creates a new Date object from the input string, and the "+" prefix converts that date into a number (the later the date the higher the number) so that the dates can be subtracted in the sort function.  The date itself is from the header of the markdown file, and if you do not make it a string, the markdown compiler will convert it into a string with the Javascript time and time zone.  You will see it right away in your `scully-routes.json` file:

- `date: 2020-09-01` in the header converts to `"date":"2020-09-01T00:00:00.000Z"`
- `date: '2020-09-01'` in the header converts to `"date":"2020-09-01"`

The issue is that the "Z" at the end indicates Greenwich Mean Time.  I'm in New York which is 4 hours behind GMT, so when the async pipe displays the date I am one day behind (2020-09-01 at midnight GMT is 2020-08-31 8pm EST).  I started looking into Javascript dates before realizing it is a mess and I should make a string with the date I need.  It's not like my posts are time-stamped!

```html
<!-- blog.component.html -->
<div class=blog-posts>
  <ul aria-label="Blog posts">
    <li *ngFor="let blog of $blogPosts | async">
      <a [routerLink]="blog.route">
        <div class="blog-card">
          <h2>{{blog.title}}</h2>
          <p>{{blog.date | date: 'mediumDate'}}</p>
        </div>
      </a>
    </li>
  </ul>
</div>
```

The `| async` is needed because we are dealing with an observable, which is an asynchronous data stream.  However, in our particular case it is just an array.  The `aria-label` tag is for accessibility.

The "|" after blog.date above uses Angular's date formatting.  Here is the link for more info at the [official Angular docs](https://angular.io/api/common/DatePipe/), which has the whole list of available ways to format your date.

I hope that is helpful for your own project!  Be sure to e-mail me with any questions or corrections.  Happy coding!
