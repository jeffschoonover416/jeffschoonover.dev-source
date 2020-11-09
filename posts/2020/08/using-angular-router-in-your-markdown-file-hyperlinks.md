---
title: Using Angular's router in your Markdown file hyperlinks
description: Here is the correct hyperlink syntax in Markdown to ensure that your local links respect the Angular router, so your site doesn't refresh each time you click a link
published: true
author: Jeff Schoonover
slug: using-angular-router-in-markdown
date: '2020-08-30'
tags:
  - jeffschoonover.dev
---

## Using Angular's router in your Markdown file hyperlinks with Scully

Hyperlink syntax is pretty easy in both HTML and Markdown.  If I was trying to link to my About page, it would look like this:

```html
<!-- HTML -->
<a href="https://jeffschoonover.dev/about">About</a>
<a href="/about">About</a>
```

The first link uses an absolute URL and the second a relative URL that makes it easier to link to another page on the same site.  The local link is also helpful during development, when you are testing your website on a development server and the absolute link doesn't exist!  Here is the same thing in Markdown:

```markdown
<!--- Markdown -->
[About](https://jeffschoonover.dev/about)
[About](/about)
```

This post is written in Markdown and gets compiled to HTML.

In Angular, there is a specific tool for moving from page to page within one app, the Router [1].  It is important for performance to use the Router when making local links.  Even though we are visiting different pages, we are staying within the same instance of the app.  If we don't use the Router, the entire app will get refreshed every time we move to a new page.  You can see whether you are refreshing by watching the refresh button on your browser or by viewing the Elements or Console or Network in the browser's developer tools.  

Here is typical syntax for using the Router when you are writing an app and when it gets compiled:

```html
<!-- When writing the app -->
<a [routerLink]="['/about']">About</a>

<!-- After it has been compiled, the link looks like this: -->
<a _ngcontent-nxf-c126="" ng-reflect-router-link="/about" href="/about">About</a>
<!-- The _ngcontent tag provides the correct CSS styling -->
```

You don't put `[routerLink]` into the Markdown hyperlink.  The `ng build` command compiles your Angular app and converts that syntax into something a browser can use, but it does not look at your Markdown files when compiling.  Scully takes care of your Markdown files and will use the Router on a link if the following two conditions are met:

1. The link reference matches one of the ScullyRoutes that it finds when it scans your app (`npm run scully -- --scanRoutes` is the terminal command, and Scully will store your routes for your convenience in /assets/scully-routes.json)
2. The link is a local link with a relative URL

It is important to have the initial "/" in the link for this to work.  An ending "/" is optional.  To see the difference, here are 4 links to my About page:

- With the slash at beginning [/about](/about)
- With a slash at both beginning and end [/about/](/about/)
- Without the slash [about](about)
- Absolute [https://jeffschoonover.dev/about](https://jeffschoonover.dev/about)

Try them!  They will all get you there, but you will be able to tell the difference.  

Happy coding!

[1] Official Docs on the [Angular Router](https://angular.io/guide/router) (note: often on the angular.io site I get a "Request for Document Failed" error.  To fix this, clear the cache for the site and refresh.  To clear the cache in Chrome, open the developer tools with ctrl+shift+I, go to Application -> Clear Storage and click Clear Site Data)
