---
title: Filter blog posts by tag using Scully
description: How to add tags to your blog posts, and then filter by them using Scully
published: true
author: 'Jeff Schoonover'
slug: scully-filter-posts-by-tag
date: '2020-11-11'
tags:
  - jeffschoonover.dev
---

I've written over 20 posts on building this website, and am getting ready to switch gears and start focusing most of my energy and writing on writing an Angular app.  To make it easy for visitors to find posts on their topic of interest (website vs app) I've added a tag to each post and am sorting them by tag.  Here is the YAML header for this post with the `tags` field added:

```yaml
---
title: Filter blog posts by tag using Scully
description: How to add tags to your blog posts, and then filter by them using Scully
published: true
author: 'Jeff Schoonover'
slug: scully-filter-posts-by-tag
date: '2020-11-11'
tags:
  - jeffschoonover.dev
---
```

Now that there is a `tags` field, how do we access and filter by it?  Stepan Suvorov wrote an article on [migrating from Wordpress to Scully](https://indepth.dev/how-to-migrate-wordpress-to-scully/) that has an excellent section on filtering by tag, and I am using a simpler version of what he did on this site.  Rather than have a list of tags that visitors can click to activate the filter, I'm sorting the posts by topic ahead of time.  Here is the pipe with the ScullyRouteService injected as "srs":

```js
  scullyPosts$ = this.srs.available$.pipe(
      map((routeList: ScullyRoute[]) => routeList.filter((route: ScullyRoute) => {
        if (!route.tags) {
          return false;
        } else {
          return(route.tags.includes("jeffschoonover.dev"));
        };
      })),
      map((blogs) => blogs.sort((a, b) => (a.date < b.date ? 1 : -1)))
  );
```

What makes this so easy is that any field in the YAML header is accessible as a property of the ScullyRoute.  The reason you need the `if-else` is that you will get an "undefined" error if you have any route (for example, the root "/") that doesn't have a `tags` property.  The if-statement skips all those routes.

The html is exactly the same as it was before:

```html
<ul>
  <li *ngFor="let blog of scullyPosts$ | async">
    <a [routerLink]="blog.route">
      <div>
        <h2>{{blog.title}}</h2>
        <p>{{blog.date | date: 'mediumDate'}}</p>
      </div>
    </a>
  </li>
</ul>
```

And that's it!  A list of posts with only the tag(s) specified.  Happy coding!
