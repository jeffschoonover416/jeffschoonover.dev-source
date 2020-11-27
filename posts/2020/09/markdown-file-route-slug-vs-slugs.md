---
title: How to specify the route(s) for your rendered markdown files using "slug" and "slugs" in your markdown YAML header 
description: Scullyio can give multiple routes on your website to the same rendered markdown file.  Implement the behavior you want by using "slug" and "slugs" fields in your markdown YAML header.
published: true
author: Jeff Schoonover
slug: markdown-file-route-slug-vs-slugs
date: '2020-09-26'
tags:
  - jeffschoonover.dev
---

You can put a [YAML](https://yaml.org/) header at the top (must be at the very top) of your markdown files with all the meta-data you want such as title, author, date, etc.  The header fields used to specify the route for that file when it is rendered are published, slug, and slugs.  Let's go through the different combinations one by one.  Before we start though, I am using the contentFolder route for my blog markdown files, in a folder called "posts."  Here is the relevant part of the config file:

```js
//scully.<project>.config.ts

export const config: ScullyConfig = {
  projectRoot: "./src",
  projectName: "your-project-name",
  outDir: './dist/static',
  routes: {
    '/posts/:id': {
      type: 'contentFolder',
      id: {
        folder: "./posts"
      }
    },
  }
};
```

The first part of the route will follow the folder structure of the contentFolder.  So, for example, since this post is in the "posts/2020/09" folder, the full route will be `thedomain.com/posts/2020/09/route-name-from-yaml`.  The rest of this post is concerned with how to set the `route-name-from-yaml`.

*One caveat to keep in mind*: Scully will keep all previous routes you have ever had in the `/dist/static` folder unless you specifically remove them.  The current routes are in the `scully-routes.json` folder, but you could have additional old routes leftover.  This could be a good thing, as it reduces the chance for broken links to your site, but Scully provides a command line option for clearing the static directory before starting a new build if you wish to get rid of any old routes.  All the [Scully Command Line Options](https://github.com/scullyio/scully/blob/56bf3e7e52dbaa42d5d71fc274f80ca3b2e6e61a/docs/Reference/command-line-options.md) are listed out on Github, but the one of interest here is `--removeStaticDist`.  The command `npm run scully -- --removeStaticDist --scanRoutes` will clean up the static output folder and scan your app for all the routes to make a new `scully-routes.json` file.

## Summary

1. No header at all: route will be the filename
2. Header with `published: false`: route will be automatically generated in a `slugs` field.
3. `slug` field: route will be the slug, not the filename
4. `slugs` field: you must use a list.  The routes will be every item in your `slugs` list, plus the `slug` OR filename if you don't have a `slug` field.

### 1. No header

If there is no header at all in the markdown file, the end of the route will be the file name.  Any spaces in the file name will be filled in with "-" dashes for the route.  Since this file is named `markdown-file-route-slug-vs-slugs.md`, the full route will be `thedomain.com/posts/2020/09/markdown-file-route-slug-vs-slugs`.  Here is the route info given in `scully-routes.json` (as a reminder, you can auto-format the json files in VS Code with Shift+Alt+F to make it easier to read):

```json
//scully-routes.json
{
  "route": "/posts/2020/09/markdown-file-route-slug-vs-slugs",
  "sourceFile": "markdown-file-route-slug-vs-slugs.md"
},
```

If you have a header with a title only, the end of the route will still be the filename.  The title does not affect the route.

### 2. Header with `published: false`

If you have a header with `published: false` in it, it will not be in the `available$` routes observable of the Scully Route Service, but it will still be in `allRoutes$` and `unPublished$`.  Scully will automatically add a `slugs` field to your file with an auto-generated route when you run it (that you could share with reviewers but would be hard to find unless you have a direct link).  Here is an example:

```yaml
# Markdown file frontmatter
---
title: 'How to specify the route(s) for your rendered markdown files using "slug" and "slugs" in your markdown YAML header'
published: false
slugs:
    - ___UNPUBLISHED___kfga5ogt_NzHqTkqmVU3cAVuYx7sChz0oNtUheFGR
---
```

Now your only route is the generated ___UNPUBLISHED___ slug.  Here is the route in `scully-routes.json`:

```json
//scully-routes.json
{
  "route": "/posts/2020/09/___UNPUBLISHED___kfhn0g54_kxACcnisceR9M8ErzdRTLo5LNXe8psY1",
  "title": "How to specify the route(s) for your rendered markdown files using \"slug\" and \"slugs\" in your markdown YAML header",
  "published": false,
  "slugs": [
      "___UNPUBLISHED___kfhn0g54_kxACcnisceR9M8ErzdRTLo5LNXe8psY1"
  ],
  "slug": "___UNPUBLISHED___kfhn0g54_kxACcnisceR9M8ErzdRTLo5LNXe8psY1",
  "sourceFile": "markdown-file-route-slug-vs-slugs.md"
},

```

### 3. Header with `slug` field

If you set `published: true` and add a `slug` field, the route will change to whatever you put in the `slug` field.  Example header:

```yaml
# Markdown file frontmatter
---
title: 'How to specify the route(s) for your rendered markdown files using "slug" and "slugs" in your markdown YAML header'
published: true
slug: markdown-file-route
---
```

and here is the resulting route in `scully-routes.json`:

```json
//scully-routes.json
{
  "route": "/posts/2020/09/markdown-file-route",
  "title": "How to specify the route(s) for your rendered markdown files using \"slug\" and \"slugs\" in your markdown YAML header",
  "published": true,
  "slug": "markdown-file-route",
  "sourceFile": "markdown-file-route-slug-vs-slugs.md"
}
```

### 4. Header with `slugs` field

If you set `published: true` and have a `slugs` field but no `slug` field, the primary route will be the filename, but all the `slugs` will also work as a route.  *However, you must make the `slugs` field a list for this to work.*  If you have a value in the `slugs` field that is not in a list it will be ignored.  Here is an example:

```yaml
# don't do this
---
title: 'How to specify the route(s) for your rendered markdown files using "slug" and "slugs" in your markdown YAML header'
published: true
slugs: markdown-file-route
---
```

```json
// the value in slugs is not a route
{
  "route": "/posts/2020/09/markdown-file-route-slug-vs-slugs",
  "title": "How to specify the route(s) for your rendered markdown files using \"slug\" and \"slugs\" in your markdown YAML header",
  "published": true,
  "slugs": "markdown-file-route",
  "sourceFile": "markdown-file-route-slug-vs-slugs.md"
},
```

This is the proper way to use `slugs` with a list:

```yaml
# Markdown file frontmatter
---
title: 'How to specify the route(s) for your rendered markdown files using "slug" and "slugs" in your markdown YAML header'
published: true
slugs: 
  - a-first-slug
---
```

and the result is that both the filename and the slug is a route:

```json
//scully-routes.json
{
        "route": "/posts/2020/09/markdown-file-route-slug-vs-slugs",
        "title": "How to specify the route(s) for your rendered markdown files using \"slug\" and \"slugs\" in your markdown YAML header",
        "published": true,
        "slugs": [
            "a-first-slug"
        ],
        "sourceFile": "markdown-file-route-slug-vs-slugs.md"
    },
    {
        "route": "/posts/2020/09/a-first-slug",
        "title": "How to specify the route(s) for your rendered markdown files using \"slug\" and \"slugs\" in your markdown YAML header",
        "published": true,
        "slugs": [
            "a-first-slug"
        ],
        "sourceFile": "markdown-file-route-slug-vs-slugs.md"
    },
```

If you have multiple values in the `slugs` list, you will get a route for the filename as well as a route for each slug.  Here is the header and resulting routes:

```yaml
# Markdown file frontmatter
---
title: 'How to specify the route(s) for your rendered markdown files using "slug" and "slugs" in your markdown YAML header'
published: true
slugs: 
  - a-first-slug
  - a-second-slug
---
```

```json
//scully-routes.json
    {
        "route": "/posts/2020/09/markdown-file-route-slug-vs-slugs",
        "title": "How to specify the route(s) for your rendered markdown files using \"slug\" and \"slugs\" in your markdown YAML header",
        "published": true,
        "slugs": [
            "a-first-slug",
            "a-second-slug"
        ],
        "sourceFile": "markdown-file-route-slug-vs-slugs.md"
    },
    {
        "route": "/posts/2020/09/a-first-slug",
        "title": "How to specify the route(s) for your rendered markdown files using \"slug\" and \"slugs\" in your markdown YAML header",
        "published": true,
        "slugs": [
            "a-first-slug",
            "a-second-slug"
        ],
        "sourceFile": "markdown-file-route-slug-vs-slugs.md"
    },
    {
        "route": "/posts/2020/09/a-second-slug",
        "title": "How to specify the route(s) for your rendered markdown files using \"slug\" and \"slugs\" in your markdown YAML header",
        "published": true,
        "slugs": [
            "a-first-slug",
            "a-second-slug"
        ],
        "sourceFile": "markdown-file-route-slug-vs-slugs.md"
    },
```

The last combination is having both `slug` and `slugs` fields:

```yaml
# Markdown file frontmatter
---
title: 'How to specify the route(s) for your rendered markdown files using "slug" and "slugs" in your markdown YAML header'
published: true
slugs: 
  - a-first-slug
  - a-second-slug
slug: the-primary-slug
---
```

As you might guess, the filename is no longer a route.  Instead, the `slug` is the primary route and the `slugs` are alternate routes:

```json
//scully-routes.json
{
        "route": "/posts/2020/09/the-primary-slug",
        "title": "How to specify the route(s) for your rendered markdown files using \"slug\" and \"slugs\" in your markdown YAML header",
        "published": true,
        "slugs": [
            "a-first-slug",
            "a-second-slug"
        ],
        "slug": "the-primary-slug",
        "sourceFile": "markdown-file-route-slug-vs-slugs.md"
    },
    {
        "route": "/posts/2020/09/a-first-slug",
        "title": "How to specify the route(s) for your rendered markdown files using \"slug\" and \"slugs\" in your markdown YAML header",
        "published": true,
        "slugs": [
            "a-first-slug",
            "a-second-slug"
        ],
        "slug": "the-primary-slug",
        "sourceFile": "markdown-file-route-slug-vs-slugs.md"
    },
    {
        "route": "/posts/2020/09/a-second-slug",
        "title": "How to specify the route(s) for your rendered markdown files using \"slug\" and \"slugs\" in your markdown YAML header",
        "published": true,
        "slugs": [
            "a-first-slug",
            "a-second-slug"
        ],
        "slug": "the-primary-slug",
        "sourceFile": "markdown-file-route-slug-vs-slugs.md"
    },
```

I hope this guide helps you set the routes for your blog posts the way you want, and saves you unnecessary headaches!
