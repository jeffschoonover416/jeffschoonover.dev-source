---
title: Projects
description: Software projects I am working on
publish: True
authorName: Jeff Schoonover
slug: projects

---

## Projects

### Routerbase

I am working on my first project, a desktop app to make life easier for me at work.  I think others will find it useful as well.  

Engineers and scientists in R&D make a lot of samples.  Samples with different starting chemistries.  Samples with varying process conditions.  Samples made specifically for a certain kind of analysis (like strength or conductivity).  And they often can't perform all the steps needed to make and analyze a sample in their own lab - a lot of work needs to be done at vendors or in other labs. 

I need software that does the following:

1. Keep track of the status of samples through a workflow
2. Find historical data and all associated documentation files quickly and in context

In Routerbase, you create a router for each sample or set of samples.  The router is comprised of steps.  As the samples finish each step and start the next one, the step can be marked as complete and any files associated with that step can be drag-and-dropped directly onto that step.  Files can also be directly associated with routers.  

Routers are grouped by using tags rather than a hierarchical folder system.  For my work, I will give each router a Project tag and an Alloy tag that I can use to sort and search with later.  Other possible tags are the commercial product the samples are associated with, a key contact person or customer, or anything else.  Routerbase keeps track of dates as well.

All the data generated in Routerbase will be stored in a JSON file, which is a human-readable text file that is the standard format for internet communication (when you submit a form on a website, chances are good the data is sent to the server in the JSON format).  

Here are sketches of two of the main screens in the program.  

![RB-router-sketch](https://res.cloudinary.com/dmntqdxsy/image/upload/v1597575317/jsdevblog/RB-router-sketch_bxdzll.png)
This first screen has all the tags on the left.  This is similar to how you search for products on [Amazon](www.amazon.com) or [McMaster Carr](www.mcmastercarr.com).  The routers that match the criteria are shown with cards.  When you select one of those routers there is a new screen with the router details:

![RB-step-sketch](https://res.cloudinary.com/dmntqdxsy/image/upload/v1597575321/jsdevblog/RB-step-sketch_d5d91m.png)
Here, a network diagram of all the steps associated with this router is displayed.  A new step is added by clicking in that area, and links can be dragged from one step to another.  In the picture, Step 3 is selected and its details and associated files/pictures would be displayed on the right (could also be edited).  Step 4 has a dashed outline because it has not been completed yet.

More to come!

Built with [Angular](https://angular.io/) for a framework, [Angular Material](https://material.angular.io/) to make it pretty, [Electron](https://www.electronjs.org/) to make it a Windows app, and the [D3](https://d3js.org/) visualization library for the network diagram.






