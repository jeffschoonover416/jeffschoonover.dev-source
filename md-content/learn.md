---
title: Learn in Public
description: A list of software development topics I am learning about to make this website better and build Routerbase
publish: True
authorName: Jeff Schoonover
slug: learn

---

## Learn in Public

This is my To-Learn list.  I was inspired to put it here for everyone to see after reading about the idea of learning in public on [Tania Rascia's website](https://www.taniarascia.com/), where she links to the original article at [swyx.io](https://www.swyx.io/writing/learn-in-public/).  Right now I'm focused building this website and some software to help me at work, so this list will focus on those two areas for now.

When I learn something on this list, I will write a blog post about it.  The idea is write the article I wish I had found when I was learning.  This is guaranteed to help at least one person (me!), and hopefully will help others coming after me as well.

## jeffschoonover.dev

I'm making this website with the Angular web framework and Scully.  I'm using Angular for my Routerbase software project and it makes sense to get more practice with it by using it for my website.  Scully is a Static Site Generator for Angular.  Static sites are more secure and load faster.

### Building

- How to insert pictures with Markdown in a Scully/Angular app.  With Scully, I can write the blog posts in Markdown instead of HTML, but I need to learn the details.  (Do I put them on the internet/Netlify somewhere or on Github?  Do I link with the Angular router or with a standard HTML hyperlink?)
- Markdown formatting.  For example, highlight code blocks in a markdown file.

```typescript
//here is what a code block currently looks like
//you can see the font changed to a monospace font, but I would like to
//have some color formatting to highlight syntax

  $blogPosts = this.scully.available$.pipe(
    map(routes =>
      routes.filter(
        route =>
        route.route.startsWith('/posts/') && route.sourceFile.endsWith('.md')
      )
    )
  );
```

- Layout: how to add a column for in-article navigation on the right hand side.  The [Unicorn Utterances](https://unicorn-utterances.com/) computer science website has this feature on the left-hand side of its articles and it really helps when you are reading longer articles.
- Add a fast, comprehensive search bar, that starts returning results as you type, similar to [Joplin's](https://joplinapp.org)
- Tags: add them to posts, add capability to sort and group and organize and search by tags
- Using Github with Visual Studio Code.  The Github website is the most popular place to upload and share software code.  I will use it to host the code for this website for Netlify to go get every time it gets updated.  Both Github and Visual Studio Code are owned by Microsoft and my impression is it is pretty easy to upload an entire project, I just haven't done it before.
- Add comments to the blog posts.  Right now I'm thinking of using Discus comments because they are not anonymous and it seems like a lot of tech-oriented websites use them so perhaps many of the people who would want to comment would already have a Discus username.
- Search Engine Optimization with Angular/Scully project.  I want to make sure that Google can properly crawl and index the site.  

## Routerbase project

- Resizable layout windows.  If I have columns in my app for different areas of the screen, the user should be able to move their mouse to the column border and move the border to resize a given column.
- Dynamically sizing d3 graphs based on window size - from pixels to percentage
- How to organize the JSON file with the saved data so it is easily searchable and useable  
- Add a fast, comprehensive search bar, that starts returning results as you type (repeat from website)
- Tags: add them to tasks, add capability to sort and group and organize and search by tags (repeat from website)
- Electron integration with Angular.  Electron is a platform that lets you take a web app made with HTML, CSS and Javascript, and port it to the desktop as a Windows or Mac OS native program.
- Angular Modules, Components, Services, Directives, and any other major construct I missed.  Especially I'd like to learn when I should use a module vs a component.
- Drag-and-drop capability for files to be associated with a particular step or task.
- View picture files directly in the app, view other files with their icons.
- NgRx with Angular.  NgRx manages the state of your app, which I think means all the data that can change how your app is displayed and works.  So if you have a recipe book app, the current master list of recipes and ingredients as well as the current user's culinary preferences and what they just searched for would all be in the state.  Seems important to have a good handle on!
- using surge or netlify to host demo of angular stuff on github
- Testing and debugging angular projects.  That is a huge topic, but I want to learn the best and most important ways to debug my small, humble project.
- Updating the version of Node packages in an existing project folder.  Recently I installed a new package that I needed but it did not like how old another one of my packages were...
- Angular: Event-Emitter vs Subject.  Both of these are ways for certain parts or functions in your software to subscribe to events, i.e. be informed when a user clicks a button or something changes in a database.  But when should I use one vs the other?
- Angular: Class vs Interface.  What exactly are they and when should I use one vs the other?

## Other

- Functional vs object oriented programming: I've heard these terms thrown around a lot and want to make sure I understand the difference between them
- Harvard Intro to Computer Science lectures (on [YouTube](https://youtu.be/F0WoVEr0-44))
- [Eloquent Javascript](https://eloquentjavascript.net/) is a free book by Marijn Haverbeke
- The entire freecodecamp.org curriculum (I've just done their HTML, CSS and Javascript sections so far)
- Dynamic dashboards with D3 and Angular.  D3 is a visualization library I'm learning for my software, but it does a lot more than I'm using it for.  In particular people use it to show all on one page data that can change dynamically as the database gets updated, for example financial or manufacturing data in a plant, schedule estimates, quality metrics, and so forth.
- Docker - I've heard that Docker is a very common way to play with code in a "sandbox" on your computer, so in case something goes wrong your computer doesn't get messed up.  Sounds like a good idea!
