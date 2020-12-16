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

The code looks at all the HandledRoutes in Scully, finds the `/404` route and copies the html of that route (which Scully has already rendered into a static file, remember this is a PostRenderer plugin) into `404.html` in the output directory.  A very useful piece of code, that is another example of how easy Scully makes it to write custom plugins.  Thank you to Michael Sacket for writing this plugin.

Ideas for the actual content of the 404 page popped in and out of my head for a couple days.  I finally settled on a maze that has been followed to a dead-end.  A quick search led to [](http://www.mazegenerator.net/), where you can generate mazes of any size and complexity for free as long as you aren't using it commercially.  The maze (with its solution) can be downloaded as an SVG (Scalar Vector Graphics) format, which is a standard text-based format for graphics popular because it has a small file size and looks good at any zoom level.  I changed the "solution" part of the file to go to a dead-end, and made it the complementary color of the site toolbar in homage to my [alma mater](https://bensonhs.net/).

I hope this post helps you quickly set up a custom 404 page on your Scully site!  Scully has a lot of 404 options that I did not cover here so if you need them be sure to look them up in the docs.  Happy Coding and don't get lost!

<svg width="324" height="324" version="1.1" xmlns="http://www.w3.org/2000/svg">
        <title>20 by 20 orthogonal maze</title>
        <desc>20 by 20 orthogonal maze generated by The Maze Generator Website (http://www.mazegenerator.net/).</desc>
        <g fill="none" stroke="#000000" stroke-width="2" stroke-linecap="square">
          <line x1="2" y1="2" x2="146" y2="2" />
          <line x1="162" y1="2" x2="322" y2="2" />
          <line x1="2" y1="18" x2="50" y2="18" />
          <line x1="82" y1="18" x2="98" y2="18" />
          <line x1="130" y1="18" x2="162" y2="18" />
          <line x1="210" y1="18" x2="242" y2="18" />
          <line x1="258" y1="18" x2="274" y2="18" />
          <line x1="290" y1="18" x2="306" y2="18" />
          <line x1="18" y1="34" x2="34" y2="34" />
          <line x1="50" y1="34" x2="82" y2="34" />
          <line x1="114" y1="34" x2="146" y2="34" />
          <line x1="162" y1="34" x2="194" y2="34" />
          <line x1="274" y1="34" x2="290" y2="34" />
          <line x1="2" y1="50" x2="18" y2="50" />
          <line x1="82" y1="50" x2="98" y2="50" />
          <line x1="162" y1="50" x2="194" y2="50" />
          <line x1="98" y1="66" x2="114" y2="66" />
          <line x1="146" y1="66" x2="178" y2="66" />
          <line x1="194" y1="66" x2="226" y2="66" />
          <line x1="274" y1="66" x2="290" y2="66" />
          <line x1="18" y1="82" x2="98" y2="82" />
          <line x1="114" y1="82" x2="146" y2="82" />
          <line x1="162" y1="82" x2="210" y2="82" />
          <line x1="226" y1="82" x2="242" y2="82" />
          <line x1="258" y1="82" x2="274" y2="82" />
          <line x1="2" y1="98" x2="18" y2="98" />
          <line x1="50" y1="98" x2="162" y2="98" />
          <line x1="178" y1="98" x2="226" y2="98" />
          <line x1="242" y1="98" x2="290" y2="98" />
          <line x1="18" y1="114" x2="82" y2="114" />
          <line x1="98" y1="114" x2="114" y2="114" />
          <line x1="130" y1="114" x2="146" y2="114" />
          <line x1="162" y1="114" x2="194" y2="114" />
          <line x1="226" y1="114" x2="242" y2="114" />
          <line x1="258" y1="114" x2="274" y2="114" />
          <line x1="306" y1="114" x2="322" y2="114" />
          <line x1="2" y1="130" x2="18" y2="130" />
          <line x1="146" y1="130" x2="162" y2="130" />
          <line x1="178" y1="130" x2="306" y2="130" />
          <line x1="18" y1="146" x2="50" y2="146" />
          <line x1="114" y1="146" x2="146" y2="146" />
          <line x1="162" y1="146" x2="226" y2="146" />
          <line x1="274" y1="146" x2="290" y2="146" />
          <line x1="2" y1="162" x2="18" y2="162" />
          <line x1="34" y1="162" x2="66" y2="162" />
          <line x1="82" y1="162" x2="98" y2="162" />
          <line x1="130" y1="162" x2="162" y2="162" />
          <line x1="178" y1="162" x2="258" y2="162" />
          <line x1="274" y1="162" x2="306" y2="162" />
          <line x1="18" y1="178" x2="66" y2="178" />
          <line x1="146" y1="178" x2="178" y2="178" />
          <line x1="226" y1="178" x2="274" y2="178" />
          <line x1="306" y1="178" x2="322" y2="178" />
          <line x1="2" y1="194" x2="50" y2="194" />
          <line x1="66" y1="194" x2="98" y2="194" />
          <line x1="130" y1="194" x2="146" y2="194" />
          <line x1="178" y1="194" x2="242" y2="194" />
          <line x1="290" y1="194" x2="306" y2="194" />
          <line x1="50" y1="210" x2="82" y2="210" />
          <line x1="146" y1="210" x2="290" y2="210" />
          <line x1="18" y1="226" x2="50" y2="226" />
          <line x1="66" y1="226" x2="130" y2="226" />
          <line x1="162" y1="226" x2="178" y2="226" />
          <line x1="226" y1="226" x2="258" y2="226" />
          <line x1="274" y1="226" x2="290" y2="226" />
          <line x1="2" y1="242" x2="34" y2="242" />
          <line x1="66" y1="242" x2="82" y2="242" />
          <line x1="98" y1="242" x2="114" y2="242" />
          <line x1="130" y1="242" x2="146" y2="242" />
          <line x1="162" y1="242" x2="242" y2="242" />
          <line x1="290" y1="242" x2="306" y2="242" />
          <line x1="18" y1="258" x2="66" y2="258" />
          <line x1="82" y1="258" x2="98" y2="258" />
          <line x1="114" y1="258" x2="194" y2="258" />
          <line x1="210" y1="258" x2="242" y2="258" />
          <line x1="258" y1="258" x2="290" y2="258" />
          <line x1="34" y1="274" x2="50" y2="274" />
          <line x1="66" y1="274" x2="82" y2="274" />
          <line x1="98" y1="274" x2="114" y2="274" />
          <line x1="194" y1="274" x2="210" y2="274" />
          <line x1="258" y1="274" x2="290" y2="274" />
          <line x1="306" y1="274" x2="322" y2="274" />
          <line x1="18" y1="290" x2="34" y2="290" />
          <line x1="50" y1="290" x2="66" y2="290" />
          <line x1="82" y1="290" x2="98" y2="290" />
          <line x1="146" y1="290" x2="194" y2="290" />
          <line x1="210" y1="290" x2="242" y2="290" />
          <line x1="258" y1="290" x2="290" y2="290" />
          <line x1="18" y1="306" x2="50" y2="306" />
          <line x1="98" y1="306" x2="146" y2="306" />
          <line x1="242" y1="306" x2="274" y2="306" />
          <line x1="290" y1="306" x2="306" y2="306" />
          <line x1="2" y1="322" x2="162" y2="322" />
          <line x1="178" y1="322" x2="322" y2="322" />
          <line x1="2" y1="2" x2="2" y2="322" />
          <line x1="18" y1="50" x2="18" y2="66" />
          <line x1="18" y1="130" x2="18" y2="146" />
          <line x1="18" y1="210" x2="18" y2="226" />
          <line x1="18" y1="258" x2="18" y2="306" />
          <line x1="34" y1="34" x2="34" y2="130" />
          <line x1="34" y1="194" x2="34" y2="210" />
          <line x1="34" y1="242" x2="34" y2="258" />
          <line x1="50" y1="18" x2="50" y2="66" />
          <line x1="50" y1="130" x2="50" y2="146" />
          <line x1="50" y1="194" x2="50" y2="242" />
          <line x1="50" y1="274" x2="50" y2="290" />
          <line x1="66" y1="2" x2="66" y2="18" />
          <line x1="66" y1="50" x2="66" y2="82" />
          <line x1="66" y1="114" x2="66" y2="194" />
          <line x1="66" y1="242" x2="66" y2="258" />
          <line x1="66" y1="290" x2="66" y2="322" />
          <line x1="82" y1="50" x2="82" y2="66" />
          <line x1="82" y1="114" x2="82" y2="178" />
          <line x1="82" y1="258" x2="82" y2="290" />
          <line x1="82" y1="306" x2="82" y2="322" />
          <line x1="98" y1="18" x2="98" y2="82" />
          <line x1="98" y1="130" x2="98" y2="162" />
          <line x1="98" y1="178" x2="98" y2="226" />
          <line x1="98" y1="242" x2="98" y2="258" />
          <line x1="98" y1="290" x2="98" y2="306" />
          <line x1="114" y1="2" x2="114" y2="50" />
          <line x1="114" y1="82" x2="114" y2="210" />
          <line x1="114" y1="226" x2="114" y2="242" />
          <line x1="114" y1="258" x2="114" y2="290" />
          <line x1="130" y1="34" x2="130" y2="50" />
          <line x1="130" y1="66" x2="130" y2="82" />
          <line x1="130" y1="114" x2="130" y2="130" />
          <line x1="130" y1="162" x2="130" y2="226" />
          <line x1="130" y1="258" x2="130" y2="290" />
          <line x1="146" y1="50" x2="146" y2="66" />
          <line x1="146" y1="114" x2="146" y2="130" />
          <line x1="146" y1="210" x2="146" y2="258" />
          <line x1="146" y1="274" x2="146" y2="306" />
          <line x1="162" y1="18" x2="162" y2="50" />
          <line x1="162" y1="66" x2="162" y2="114" />
          <line x1="162" y1="130" x2="162" y2="162" />
          <line x1="162" y1="178" x2="162" y2="194" />
          <line x1="162" y1="226" x2="162" y2="242" />
          <line x1="162" y1="258" x2="162" y2="274" />
          <line x1="162" y1="290" x2="162" y2="322" />
          <line x1="178" y1="2" x2="178" y2="18" />
          <line x1="178" y1="114" x2="178" y2="130" />
          <line x1="178" y1="162" x2="178" y2="178" />
          <line x1="178" y1="194" x2="178" y2="210" />
          <line x1="178" y1="274" x2="178" y2="290" />
          <line x1="178" y1="306" x2="178" y2="322" />
          <line x1="194" y1="18" x2="194" y2="34" />
          <line x1="194" y1="50" x2="194" y2="66" />
          <line x1="194" y1="178" x2="194" y2="194" />
          <line x1="194" y1="226" x2="194" y2="242" />
          <line x1="194" y1="258" x2="194" y2="306" />
          <line x1="210" y1="2" x2="210" y2="50" />
          <line x1="210" y1="66" x2="210" y2="82" />
          <line x1="210" y1="98" x2="210" y2="114" />
          <line x1="210" y1="162" x2="210" y2="178" />
          <line x1="210" y1="210" x2="210" y2="226" />
          <line x1="210" y1="242" x2="210" y2="258" />
          <line x1="210" y1="290" x2="210" y2="322" />
          <line x1="226" y1="34" x2="226" y2="66" />
          <line x1="226" y1="82" x2="226" y2="98" />
          <line x1="226" y1="114" x2="226" y2="130" />
          <line x1="226" y1="226" x2="226" y2="242" />
          <line x1="226" y1="258" x2="226" y2="290" />
          <line x1="226" y1="306" x2="226" y2="322" />
          <line x1="242" y1="18" x2="242" y2="34" />
          <line x1="242" y1="50" x2="242" y2="98" />
          <line x1="242" y1="146" x2="242" y2="162" />
          <line x1="242" y1="258" x2="242" y2="274" />
          <line x1="242" y1="290" x2="242" y2="306" />
          <line x1="258" y1="18" x2="258" y2="82" />
          <line x1="258" y1="98" x2="258" y2="114" />
          <line x1="258" y1="130" x2="258" y2="146" />
          <line x1="258" y1="162" x2="258" y2="178" />
          <line x1="258" y1="194" x2="258" y2="210" />
          <line x1="258" y1="226" x2="258" y2="274" />
          <line x1="274" y1="2" x2="274" y2="18" />
          <line x1="274" y1="34" x2="274" y2="50" />
          <line x1="274" y1="146" x2="274" y2="162" />
          <line x1="274" y1="178" x2="274" y2="242" />
          <line x1="290" y1="18" x2="290" y2="130" />
          <line x1="290" y1="162" x2="290" y2="194" />
          <line x1="290" y1="242" x2="290" y2="258" />
          <line x1="290" y1="290" x2="290" y2="306" />
          <line x1="306" y1="18" x2="306" y2="98" />
          <line x1="306" y1="130" x2="306" y2="162" />
          <line x1="306" y1="194" x2="306" y2="258" />
          <line x1="306" y1="274" x2="306" y2="306" />
          <line x1="322" y1="2" x2="322" y2="322" />
        </g>
        <polyline fill="none" stroke="#e18741" stroke-width="2" stroke-linecap="square" stroke-linejoin="round" points="154,2 154,10 122,10 122,26 154,26 154,42 138,42 138,58 122,58 122,74 106,74 106,90 42,90 42,106 90,106 90,122 106,122 106,170 90,170 90,185 74,185 74,122" />
      </svg>
