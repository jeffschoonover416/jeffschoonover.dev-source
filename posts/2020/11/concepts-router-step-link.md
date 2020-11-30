---
title: Introducing the concepts of Router, Step, and Link in Routerbase
description: Defining the concepts of Router, Step, and Link as part of the software design and planning process
published: true
author: 'Jeff Schoonover'
date: '2020-11-30'
tags:
    - routerbase
slug: concept-router-step-link

---

> *"Weeks of coding can save you hours of planning"*
>>-Unknown

If I've heard it once, I've heard it a thousand times: you need to plan out software before you start coding.  Just like you need to outline a paper or talk before you start typing or making slides.  If you fail to plan, then plan to fail!  Think of starting construction on a house, bridge, or car before designing it, and on and on.  So as much as I want to dive into the code, I will spend some time on the plan.  The plan will change as the app gets made in an iterative fashion, but we have to start somewhere.

I'm getting my background on software design and planning from two primary places (in addition to the usual Googling):

1. A Coursera specialization called [Software Design and Architecture](https://www.coursera.org/specializations/software-design-architecture) made by the University of Alberta.  I'm auditing the courses in the specialization, and they have PDFs of the lecture notes that read like books.  Heavily focused on object-oriented design, which led me to the idea of a design model.
2. The work of [Daniel Jackson](http://people.csail.mit.edu/dnj/) at MIT, who is an advocate of designing software by concepts.  Check out [one of his lectures on YouTube](https://www.youtube.com/watch?v=QkEidk2zkuw) or lecture notes on his [Software Design course website](https://canvas.mit.edu/courses/4415) (I looked at the slides for the Fall 2020 class).
 

Here is a wireframe concept for one of the screens in the app:
![step wireframe](https://res.cloudinary.com/dmntqdxsy/image/upload/v1597575321/jsdevblog/RB-step-sketch_d5d91m.png)

The left panel shows a series of steps linked together in a network diagram that I'm calling a "router".  The concept of a router in a manufacturing shop environment is a series of steps that are performed on a part.  The router is a usually a physical piece of paper (although the part can be barcoded) that follows the part through the shop, and when a step is completed it is signed off on the router and put in the queue for the next step.  That is what I am going for here, routers consisting of steps and links, to help track and record project samples, parts and materials through the necessary process steps.

Sometimes a step may have multiple sub-steps, for example a Shipping step may have the steps 1)Make the label, 2)attach label to box, 3)Put part in box, 4)Drop in FedEx box.  The first question to wrestle with in my data model is how to handle this nesting.  Should I have Sub-steps and Sub-sub-steps as distinct objects in the model?  Can a router be a step in a larger router?  Can a step have sub-routers?  What do I need to consider when deciding how to store data that can become many layers deep?

Jackson recommends using existing concepts whenever possible to avoid confusion.  Do your best to make your program work the same way other programs work, with the same vocabulary whenever possible.  Maybe routers and steps are like folders and files.  A folder may have many layers of other folders inside it, and each folder can have lots of files, but a file does not have folders or other files inside it.  A router is actually a special kind of folder, in that it allows defined associations between steps and other tasks rather than just grouping them into one collection.  So a router consists of steps, links, other routers, and any metadata associated with it (such as file attachments, notes, whether it is completed, etc).

Jackson has a useful table (see the Fall 2020 lecture slides on [concept design rules](https://canvas.mit.edu/courses/4415/pages/tuesday-10-slash-13-concept-design-rules?module_item_id=146785)) for defining concepts that includes its name, purpose, structure, actions, and operational principle.  As an example he defines the concept of Label in Gmail (I am paraphrasing so any mistake is mine):

1. Name: Label
2. Purpose: Organize items for easy retrieval
3. Structure: label: Item -> Label (I think that means that labels are associated with items)
4. Actions: mark an item with a label, un-mark an item with a label, find items with a given label
5. Operational principle: if an item I is marked with Label A, then if you find all A the result will contain I

So the next thing to do is try to define the concepts of Router, Step and Link, which I consider essential for this app:  

1. Concept: Step
2. Purpose: track and record the performance of a process step on an item
3. Structure: Name, Status (incomplete / in-progress / complete), metadata
4. Actions: create, read, update, delete
5. Operational principle: when a Step is marked Complete, the described work was done on the item  

--

1. Concept: Link
2. Purpose: link steps of a router in the correct sequential order; hold metadata for in-between steps such as transport, current location
3. Structure: Source Step, Target Step, Status, Metadata
4. Actions: create, read, update, delete
5. Operational principle: when the Source step of a link is completed, the next step that needs to be done is the Target step.  Links are uni-directional.  

--

1. Concept: Router
2. Purpose: organize, track and record a sequence of steps necessary to be performed in order
3. Structure: [Steps], [Links], [Sub-Routers], Status, associated files and metadata
4. Actions: create, read, update, delete
5. Operational principle: when the steps in a router are fully executed in sequence, the part is finished  

The actions are pretty boring: this really is a simple CRUD application under the hood but that is OK because it is a very useful one to me. 

If you see anything I may be missing or have any suggestions please e-mail me!

The next post will show the data model I am using to relate these 3 concepts to each other.  Happy coding!
