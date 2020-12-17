---
title: Adding a 404 page to your Angular/Scully website hosted by Netlify with the Http404 community plugin
description: Generate a 404.html file in the root directory of your Angular/Scully website during build time, that Netlify will display for all failed paths, without using an Angular wildcard route
published: true
author: 'Jeff Schoonover'
date: '2020-12-15'
tags:
    - jeffschoonover.dev
slug: add-404-page-netlify-scully
---

This site is at a sufficient point to fulfill its purpose as documentation for the Angular app I am working on, but there will always be details that are worth adding.  One glaring omission that is now added was a custom 404 page that shows when a path is navigated to that does not exist.  A [thread from @JoshWComeau](https://twitter.com/JoshWComeau/status/1333492730031468545) where everyone posted their fun 404 pages was the inspiration I needed to move this to the top of the to-do list.

This site is hosted by Netlify, and they will [automatically redirect to a custom 404 page](https://docs.netlify.com/routing/redirects/redirect-options/#custom-404-page-handling) if a `404.html` file exists at the root folder of your site.  This site is hosted on Github and automatically built by Netlify each time I make a change (setup instructions by Tara Z. Manicsic in the Netlify blog post [Creating an Angular Jamstack Blog](https://www.netlify.com/blog/2020/07/14/creating-an-angular-jamstack-blog/)).  This means that the `404.html` file needs to be part of the build if I'm going to take advantage of this free offer by Netlify.

It is worth noting here that you can handle 404 redirects within the Angular router.  You can search "angular router 404" and get all sorts of instructions, but the main idea is that you add a [wildcard "**" route](https://angular.io/guide/router#setting-up-wildcard-routes) at the end of your root router that catches any routes that get navigated to and redirects them to a custom component that you can make.  

Here is what it might look like:

```js
//app-routing.module.ts

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotFoundComponent } from './not-found/not-found.component';

const routes: Routes = [
  
  { path: '', loadChildren: () => import('./home/home.module').then(m => m.HomeModule), },
  { path: 'about', loadChildren: () => import('./about/about.module').then(m => m.AboutModule), },
  { path: '**', component: NotFoundComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
```

<br>

The thing is, I already have a wildcard route set up on my site that points to my `BlogComponent`, because Scully discovers these routes when it looks in the folder with all my posts.  This folder has nested sub-folders for the year and month, and the sub-folders are used to help generate the route for that post.  To avoid having to add in a new route every month, I give Scully free reign to create whatever routes it wants to with the wildcard route.

To summarize, I needed a way to generate a custom `404.html` file in the root directory every time Scully is built, to have Netlify handle 404 errors and not have to use a wildcard route for that purpose.  Fortunately, I'm not the first person with this issue and there is an easy solution.  First, Scully will automatically look for a `404.html` in your output directory and if it does not find one, it will create one by copying your project's `index.html` file (the one in the `src` directory).  Scully's code for doing this is in the ["feat(scully): add 404.html to redirect to"](https://github.com/scullyio/scully/commit/7484a57a7d2c718572d62700b0702a01d9a14277) commit.  Since my `index.html` file didn't have anything visible, this meant that until now Netlify served a completely blank page for a 404 error.

The Scully community plugin [Http404](https://github.com/gammastream/scully-plugins/tree/master/projects/scully-plugin-http404) will find a `/404` route in your Angular router (if it exists), and create a `404.html` file for Netlify (originally built with Firebase in mind, but Netlify seems to work the same way).  It is a render plugin.  Let's look at the main function in the plugin:

```js
//from [](https://github.com/gammastream/scully-plugins/blob/master/projects/scully-plugin-http404/src/lib/index.ts)

import { registerPlugin, HandledRoute, scullyConfig, getPluginConfig } from '@scullyio/scully';

declare var require: any;
const path = require('path');
const fs = require('fs');


export const http404Plugin = async (html: string, route: HandledRoute) => {
  if ( route.route === '/404' ) {
    const http404OutFile = path.join(scullyConfig.outDir, '404.html');
    fs.writeFileSync(http404OutFile, html, () => {
      console.log(`Started @gammastream/scully-plugin-http404 -- saved 404.html`);
    });
    return Promise.resolve(html);
  } else {
    return Promise.resolve(html);
  }
};
```

<br>

The code looks at all the HandledRoutes in Scully, finds the `/404` route and copies the html of that route (which Scully has already rendered into a static file, remember this is a PostRenderer plugin) into `404.html` in the output directory.  A very useful piece of code, that is another example of how easy Scully makes it to write custom plugins.  Thank you to Michael Sacket for writing this plugin.  Following the plugin documentation was straightforward and I was able to get a 404 page up.  Any questions about it feel free to email me.  

I hope this post helps you quickly set up a custom 404 page on your Scully site!  Scully has a lot of 404 options that I did not cover here so if you need them be sure to look them up in the docs.  Happy Coding!
