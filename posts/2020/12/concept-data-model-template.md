---
title: Concept data model for Template
description: As part of designing software by concepts, defining the Template concept for Routernote and adding it to the data model
published: true
author: 'Jeff Schoonover'
date: '2020-12-02'
tags:
    - routernote
slug: concept-data-model-template
---

This is a continuation of the previous post, where I [started work on the data model](/posts/2020/12/concept-data-model-router-step-link/) for Routernote.

There is a good chance that the same or a very similar router will need to be executed many times, and a template prevents typing mistakes, speeds up the process, and reduces friction to putting your data into the app where it will be searchable and easily accessible.  Fortunately the concept of a template will be familiar to people, I just need to make sure and implement it in the way people expect to use it.

Sometimes I use an available template and other times I don't.  I figured out when and why as I was writing this post.  I make extensive use of templates when I am filling out online forms, because oftentimes the form data is nearly identical to a previous version I've filled out, and the alternative is typing all that info in again line by line.  When I ship something via FedEx, I can save a shipment as a template (FedEx calls them Shipping Profiles) and then next time I need to ship to that person, I call up the template and then just need to change the weight and dimensions before submitting.  Same goes with purchasing supplies that you buy over and over.  

I don't use templates when I'm creating a new file rather than filling out an online form.  Instead I just make a copy of whatever existing file is closest to what I need, change the name and start editing.  Templates seem like an extra step rather than a help in cases where you can copy/paste.  Put in Daniel Jackson's language, the template concept is often redundant with the copy/paste concept.  There will definitely be copy/paste functionality for routers, steps and links, so I need a good reason to add a template concept.

There is a use case in Routernote that makes templates really handy, and it has to do with the shear volume of metadata that may need to go into a router.  To go back to the FedEx example, I just have to change the weight and dimensions each time I call up a template.  The vast majority of the form is going to stay the same as the template.  But what if I wanted to make a new router from an existing one with 50 values kept and 50 need to be changed?  That would be tedious whether I started with a blank router or one with previous values already in.  A template would help define ahead of time which values to keep and which to leave blank.  It can also help the user remember not to forget to add data (a blank field is a good reminder that something is missing, and the step could be "un-completable" until the missing value is added or the field is deleted).

With all that said, what is the purpose of a template?  Daniel Jackson argues that there should be a 1:1 relationship between concept and purpose.  Here is the visual:

<br>

![Concept specificity](https://res.cloudinary.com/dmntqdxsy/image/upload/v1606886588/jsdevblog/2020Dec/MIT-4415-concept-specificity_tctm3b.jpg)
<figcaption>Slide on concept-purpose specificity from Fall 2020 MIT 4415 lecture <a href="https://canvas.mit.edu/courses/4415/pages/tuesday-10-slash-13-concept-design-rules?module_item_id=146785">10/13 Concept Design Rules</a></figcaption>
<br>

If a concept is overloaded with more than one purpose, it makes it hard to use.  The example Jackson uses is a printer setting where the page size is coupled with the loading mechanism.  You can't change one without affecting the other.  If there are two redundant concepts for one purpose, it can be confusing about how to accomplish the purpose and the two concepts might even conflict with each other, such as Labels and Categories in Gmail.  The purpose of Template needs to be more specific than "speed up data entry."  The purpose is to generate new nodes at convenient starting points, given that a previously completed node (available through copy/paste) will often not be a convenient starting point.

1. **Concept**: Template
2. **Purpose**: Generate new node at a convenient starting point
3. **Structure**: Node (a template will take the same form as a router, step, or link)
4. **Actions**: create, apply-to-node, update, delete
5. **Operational principle**: when node S is saved as a template T, any node N that T is applied to will become a duplicate of S, even if S has missing or incomplete data.  If N had existing data it will be overwritten so that N will be a duplicate of S.  

So what should this look like in the data model?  Well, templates are just nodes (i.e. a router template will have the exact same structure as a regular router), so one could argue that we could add a Template boolean to every node to check if it is a template or not.  Then Template will be a subset of Node.

<br>

![data model a boolean as a subset](https://res.cloudinary.com/dmntqdxsy/image/upload/v1606887787/jsdevblog/2020Dec/MIT-4415-boolean-subset_wk3wjy.jpg)
<figcaption>Slide on how to model a boolean from Fall 2020 MIT 4415 <a href="https://canvas.mit.edu/files/719760/download?download_frd=1">Data Modeling Errors</a> pdf file (link to download)</figcaption>
<br>

With that in mind, here is the modified data model:
![updated data model with Template added](https://res.cloudinary.com/dmntqdxsy/image/upload/v1606889568/jsdevblog/2020Dec/20201202-data-model-router-step-link-template_f5mwo5.png)
<br>

Next is Tags, happy coding!
