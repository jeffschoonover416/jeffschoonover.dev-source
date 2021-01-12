---
title: Options for integrating D3 charts into Angular
description: The D3 visualization library is written in Javascript, but Angular is written in Typescript.  Options for getting Angular to use and recognize D3 code.
published: true
author: 'Jeff Schoonover'
date: '2021-01-04'
tags:
    - routernote
slug: D3-angular-integration-options
---

This is not the blog post I was planning to write.  I am working on making the directed graph with D3 in Angular, and was planning on documenting that next.  But it has taken longer than I thought it would and I'm at a crossroads.  Seth Godin reminded us recently that [the most important blog post](https://seths.blog/2020/12/the-most-important-blog-post/) in the world is the one on your blog that you are going to write next, even if no one reads it but you (I have chosen not to put analytics on this site so I have no idea if anyone reads this unless they email me).  It puts a stake in the ground and helps refine your thoughts, so I pause my D3/Angular wrangling to write about exactly why it is taking so long.

The most immediate reason it is taking so long is because D3 is written in Javascript and Angular is written in Typescript.  Typescript is a superset of Javascript that is more strict.  It is designed to keep you from making mistakes that might turn into bugs in production.  The D3 adapted to Typescript that I've seen mostly uses the **any** type, the most generic type that forfeits many of the advantages of Typescript in the first place.  

I have an excellent book called [Pro D3.js](https://play.google.com/store/books/details?id=DCe7DwAAQBAJ) by Marcos Iglesias that goes into detail on how to make reusable, testable D3 charts.  There is even a chapter on integrating D3 with React.  All the code is in Javascript.  As I put sample code from the book into Angular, Typescript is complaining and the fixes are not obvious.  At this point I see these paths forward (in order of increasing difficulty):

1. Ditch the "reusable, testable" paradigm and just put a normal D3 chart into Angular with lots of **any** types.  My app is pretty small, and this would let me move forward with the project.  Then reusable, testable Typescript D3 charts with full Angular integration goes on my "to-learn" list for the future.
2. Learn how to incorporate Javascript modules into Angular projects.  I know this can be done, I just am not sure exactly how yet.  This may be the easiest path forward to follow the Pro D3.js tutorials.
3. Really dig into D3 and learn the types well enough that I can write good D3 in Typescript.  Then I can translate the sample code in the D3 Pro book to Typescript and import easily into Angular.

This immediate problem is a great example of the rewards and frustrations of trying to combine multiple technologies.  You get more interesting and valuable outcomes, but you pay for it with the cost of integration.  The better job I do integrating D3 and Angular, the better the outcome will be (performance, testability, etc).  And going through the process of integration exposes my knowledge gaps.  I don't really understand D3 types, Typescript, or importing external Javascript files into Angular, even though I use the tools.  If I really understood them, I would be able to integrate them.  

This seems to be the story of web technologies these days.  Take a look at the [2021 web developer roadmap](https://levelup.gitconnected.com/the-2020-web-developer-roadmap-76503ddfb327) to remind yourself of just how many technologies are working together to make the modern internet.  Or just look at job postings - most want experience with a front-end technology (i.e. Angular), a back-end (i.e. Spring), a database (SQL, MongoDB), cloud computing (AWS), containerization (Docker, Kubernetes), CI/CD (Jenkins), 3D game engine (Unity, WebGL), machine learning (TensorFlow), data visualization (D3), geospatial (MapboxGL, Geoserver), etc etc.  They are all used together.  It is an invitation to a deeper understanding.  

It is the same with a lot of physical products too.  It is hard to build something worth selling without involving several disciplines or areas of knowledge.  Often, at least in a big company, you have experts in every field that you need.  The people who understand the product well enough to integrate all the individual technologies are worth their weight in gold.

I'm going with path #2 for now.  There is enough to learn about D3 for now without trying to write it in Typescript, and knowing how to import and call Javascript inside Angular when I need to seems pretty useful.

In the next post, we'll start looking at writing D3 in Javascript and importing it into an Angular Typescript component.  See you there!
