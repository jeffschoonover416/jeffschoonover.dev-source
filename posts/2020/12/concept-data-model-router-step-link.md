---
title: Concept data model for Router, Step and Link
description: As part of designing software by concepts, a first attempt at a data model showing the relationship between the Router, Step, and Link concepts in RouterNote
published: true
author: 'Jeff Schoonover'
date: '2020-12-1'
tags:
    - routernote
slug: concept-data-model-router-step-link

---

This is a continuation of the post introducing the [concepts of router, step, and link](posts/2020/11/concept-router-step-link/).

A data model shows how the data objects in your app relate to one another.  Generally, each concept is a node in a network diagram, and different arrow styles connecting the nodes to one another show how they are related.

There are a lot of ideas about the right way to make a data model, and a lot of different diagrams.  The Unified Modeling Language is a big one with a lot of followers, but I decided to follow [Daniel Jackson's](http://people.csail.mit.edu/dnj/) convention as best I could using his lecture notes and Youtube lectures as an example.  

There are so many tips and rules to follow to make your model (and by extension, your app) as good as possible that if I try to follow them all while I'm making the model progress will be slow.  Instead, I will make a model the best I can and then check it against all the rules and heuristics.

The question is how to model this in an object-oriented way that makes sense.  Does it make sense to make Router, Step and Link extensions of an abstract class because they can all be created, edited, deleted, and are all children of Router?  If I do that, how to make the relationship with links clear (a link must be associated with both a source and a target node, otherwise it should be deleted - or should it??  That should be an option).

To work through this, I'm going to go over 3 slides from Jackson's Fall 2020 MIT 4415 Software Studio class.  Here is the first one:

<br>

![Don't split a generalization](https://res.cloudinary.com/dmntqdxsy/image/upload/v1606797700/jsdevblog/2020Dec/MIT-4415-data-model-generalizations_gh6xkh.jpg)
<figcaption>Slide from Fall 2020 MIT 4415 lecture <a href="https://canvas.mit.edu/courses/4415/pages/monday-10-slash-05-data-modeling-part-1?module_item_id=146777">10/05 Data Modeling Part 1</a></figcaption>
<br>

The above slide shows the idea of generalizing to avoid duplication of code.  The regular arrows show association, the exclamation point indicates that the association is exactly 1 of the object, and the question mark indicates that the association could be 0 or 1 of the object.  For example, each *Node* object in the data is associated with exactly one Name.  The hollow arrow point indicates generalization, in this case a *Node* could be either a Folder or a File.  This seems to apply to my use case because my routers and steps have a similar relationship to folders and files, and also eventually I will want routers, steps and links to have access to Tags and it seems like you could substitute Tag for Name in the slide and it would make sense.  I think the 2nd diagram is weaker because it obscures the relationship between Folder and Item that is explicitly modeled in the left diagram.

<br>

![Don't split a relation](https://res.cloudinary.com/dmntqdxsy/image/upload/v1606797677/jsdevblog/2020Dec/MIT-4415-data-model-relations_puuwff.jpg)
<figcaption>Slide from Fall 2020 MIT 4415 <a href="https://canvas.mit.edu/files/719760/download?download_frd=1">Data Modeling Errors</a> pdf file (link to download)</figcaption>
<br>

This second slide is another take on the idea of generalization.  Generalize when you have duplicate relationships (such as "contains" on the left).  Since Routers contain other routers, steps and links, I should use the model on the right.

<br>

![Don't use subsets for relational state](https://res.cloudinary.com/dmntqdxsy/image/upload/v1606797685/jsdevblog/2020Dec/MIT-4415-data-model-subsets_mmgaa0.jpg)
<figcaption>Slide from Fall 2020 MIT 4415 <a href="https://canvas.mit.edu/files/719760/download?download_frd=1">Data Modeling Errors</a> pdf file (link to download)</figcaption>
<br>

This last slide addresses the question of what to do about nested routers.  I should not have sub-router objects in the data structure.  There is just Router in the data structure and the nesting will have to be taken care of in a different way.  Which makes sense - there is no way that Windows needs to define a new class of object for a nested folder.

With all that in mind, here is my first pass at the model for Router, Step, and Link:

<br>

![First iteration data model for router, step, and link](https://res.cloudinary.com/dmntqdxsy/image/upload/v1606889575/jsdevblog/2020Dec/20201201-data-model-router-step-link_piqiye.png)
<figcaption>First data model for Router, Step and Link concepts</figcaption>
<br>

I am not happy with the fact that this model does not show the relationship between links and steps, or links and routers.  But I think these three have enough in common that having a general object for them will help in the long run.

Next, defining Template and Tag concepts and adding them to the model.  Happy coding!
