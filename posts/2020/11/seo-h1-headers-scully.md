---
title: Automatically add an <h1> header to every page of your Scully/Angular website for improved SEO
description: Make sure your site has an <h1> header on every page so the Google Bot knows what your page is about.  Here is how to automatically implement this on a Scully/Angular site.
published: true
author: 'Jeff Schoonover'
date: '2020-11-28'
tags:
    - jeffschoonover.dev
slug: seo-h1-headers-scully

---

The things that affect Search Engine Optimization continue to surprise me, although in hindsight I can see why Google has it that way.  I listened to Roy Jossfolk being interviewed on the [Nov 9 2020 Tech Jr](https://techjr.dev/episodes/2020/roy-jossfolk-returns-to-talk-seo-for-devs/) podcast on the topic of SEO, and came away with an immediate to-do that is easy to implement: make sure that every page on your site has an `<h1>` header.  This helps the Google Bot figure out what your post or website is about, so make your title descriptive with good keywords.  The `<h2>` and smaller tags are considered section or chapter headings.  Here I thought it was just the size of the title that you liked the best!

Google is also interested in making sure people get good information from top ranked sites, so the author is important.  If Google can figure out the author and how credible they are based on other articles or social media, it will rank the site higher.  Jossfolk suggested making sure to put the author in a meta tag on every page.  Article length also helps page rank.  And having a fast site that looks good on a mobile phone helps as well so that visitors have a good experience when they visit.

## Use Scully to automatically put the title of each page in an H1 header

My site structure has a folder for all the blog posts (written in markdown) that Scully looks at and renders to HTML when it builds the site.  Please see my earlier post on [markdown YAML headers](/posts/2020/09/markdown-file-route-slug-vs-slugs/) for more info.  It has my config file in there and all the necessary background.  You need to have a *title* field in your YAML header.  This will be copied into the `scully-routes.json` file and available in the Scully Route Service.  The idea is to find the ScullyRoute with the route that matches the current URL, and insert the title from that ScullyRoute into the HTML:

```js
//blog.component.ts

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
```

Then in the HTML, call the observable with Angular's async pipe.  This will subscribe and unsubscribe to the observable for you.  Check the `scully-routes.json` file for what metadata is accessible (it should be based on your YAML header for each markdown file):

```html
    <h1 *ngIf="currentPost$ | async as currentPost">{{currentPost.title}}</h1>
    <scully-content></scully-content>
```

I recommend two sites for more information.  I've recommended Corbin Crutchley's [Scully blog setup](https://unicorn-utterances.com/posts/making-an-angular-blog-with-scully/) article before but will again because he covers this possibility in detail at the end.  He does things a little differently than I have here, using the Angular router's ActivatedRoute params to find the current route.  I went a different way because my content folder has multiple sub-folders and my URL is a combination of the slug (postId in his article) and the sub-folder names.  The inspiration for my implementation is Stepan Suvorov's blog.  He wrote an article on [migrating from WordPress to Scully](https://indepth.dev/how-to-migrate-wordpress-to-scully) that links to the Github for his Scully blog.  He has a fancier implementation that I simplified for my use case.  Thanks to both and happy coding!
