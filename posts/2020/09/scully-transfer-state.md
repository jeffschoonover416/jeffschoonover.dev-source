---
title: Use Scully Transfer State to transition between the static and Angular versions of your website
description: The Scully Transfer State will prevent the visible flash that happens when Angular loads on top of your Scully site and refreshes all the async data
published: true
author: Jeff Schoonover
slug: scully-transfer-state-implementation
date: '2020-09-23'
tags:
  - jeffschoonover.dev
---

When someone visits your Scully site, it first loads the static version for speed.  Then it loads the javascript from Angular on top of the static site to make it fully interactive.  If you have any async data in your static site it will be refreshed when the Angular component loads, causing a flash.  I noticed this in my list of blog posts on the home page, and there are several discussions about the issue on [Scully's Gitter channel](https://gitter.im/scullyio/community) (search for "transferstate").  Here is a quote from there:

> Sander Elias @SanderElias Apr 28 10:17
@willi84 take a look at the flash prevention plugin, that is using some of the mechanisms to handle the 'replace'
the replace as you call it is done by angular, whipping out whatever is there, and repainting it when it activates.
The transferstate can make this a sync operation, which means it's done in 1 cycle of the event loop. that will prevent a visible "flash". It's still being replaced tho.
If there is anything async in your app's boot, there will be a visible flash.

Another good discussion was on [August 25, 2020](https://gitter.im/scullyio/community?at=5f4544d09bad075eacd7817d).

Here is how to get the list of posts sorted by date with and without the transfer state.  I am copying code from the Scully Github [blog example app](https://github.com/scullyio/scully/tree/main/apps/sample-blog/src/app/blog).  The HTML is the same whether or not you use the transfer state:

```html
<!-- blog.component.html -->
<span *ngFor="let r of blogs$ | async">
      <a [routerLink]="r.route">{{ r.route }}</a>
      <br />
</span>
```

Here is the list without using the transfer state:

```js
//blog.component.ts
import { Component } from '@angular/core';
import { ScullyRoute, ScullyRoutesService } from '@scullyio/ng-lib';
import { map } from 'rxjs/operators';

...

constructor(private srs: ScullyRoutesService) {}

blog$ = this.srs.available$.pipe(
      map((routeList) => routeList.filter((route: ScullyRoute) => route.route.startsWith(`/blog/`))),
      map((blogs) => blogs.sort((a, b) => (a.date < b.date ? -1 : 1)))
)
```

And here is the list with the transfer state.  Note the extra import and constructor argument:

```js
//blog.component.ts
import { Component } from '@angular/core';
import { ScullyRoute, ScullyRoutesService, TransferStateService } from '@scullyio/ng-lib';
import { map } from 'rxjs/operators';

...

constructor(private srs: ScullyRoutesService, private sts: TransferStateService) {}

blogs$ = this.sts.useScullyTransferState(
    'blogRoutes',
    this.srs.available$.pipe(
      map((routeList) => routeList.filter((route: ScullyRoute) => route.route.startsWith(`/blog/`))),
      map((blogs) => blogs.sort((a, b) => (a.date < b.date ? -1 : 1)))
    )
  );

```

One more aspect to keep in mind is how Transfer State stores the state.  The default way is to put a data.json file in the same folder of the index.html files of routes with state (which are whatever routes have the component with the state and its children).  This is not so important for the use case above, but would get important pretty fast in web apps.  There is a discussion on the [Scully Gitter](https://gitter.im/scullyio/community?at=5ec3e1f070f28c384b84ffb0) site (May 19, 2020) for more info.

Remember that the observable needs to be subscribed to in order to activate.  Above, the Angular async pipe in the HTML subscribed and unsubscribed (to avoid memory leaks) for us.  But without that async pipe, you need some other code to actually use the data in order for it to be generated.  Read more about the async pipe in the [Angular Docs](https://angular.io/api/common/AsyncPipe).

Happy coding!
