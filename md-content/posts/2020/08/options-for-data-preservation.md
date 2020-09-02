---
title: Current options for materials data preservation
description: Here are the ways I have seen companies and individuals keep track of their materials development data
publish: True
authorName: Jeff Schoonover
slug: current-options-for-materials-data-preservation
date: '2020-08-19'

---

## Current options for materials data preservation

In the [last post](/posts/2020/08/motivation-to-make-routerbase), I went through how most engineers store project data with PowerPoint, Excel and Outlook, and organize that data with an elaborate folder structure on their computer.  Using these tools, it is hard to:

1. Keep track of the status of samples through a workflow
2. Find historical data and all associated documentation files quickly and in context

However, there are existing software programs that try to address these issues.  Let's take a look at some of these now.

## Microsoft OneNote

I used OneNote about 6 years ago and found that it was very good at (surprise) taking notes.  Mostly I put meeting notes and summaries of background research for my different projects.  However, it wasn't easy for me to capture workflow status or keep a bunch of files associated with each process step organized.  And for most project notes, it was easier to use PowerPoint, treating each slide like a page.  PowerPoint is often used as a notebook of record for many projects because it is sharable and usually on the screen already during a meeting.

## Microsoft Project

I actually don't know any engineers who keep track of their stuff with MS Project, but one of its main functions is to keep track of project workflow and status so why doesn't everyone use it?  Aside from the learning curve, I think the main reason is that it emphasizes schedule.  I have to admit, I went through a phase where I thought Gantt schedule charts were the right way to keep my projects organized.  It was a combination of going through some training that taught it, and being asked for an updated Gantt chart for every review.  A Gantt chart is like a business plan: out of date as soon as you finish it.  Fiddling with the schedule in the Gantt chart in between reviews did not make the progress go any faster.  Gantt charts and detailed schedules in general are important when a big team needs to organize execute a complex project.  But for an individual or small team inventing stuff it does not add much value.

MS Project does have two views that would be very useful for me.  The first is the network diagram, which shows the tasks in a flow-chart layout that emphasizes the required steps rather than the schedule.  The second is the task board view that shows the current work that needs to be done.  It is similar to a Kanban board, which has areas for completed, current, and upcoming work.  But there is a lot of baggage to get those two views, and Project isn't really designed to function as a long-term historical record.

You might have noticed the emphasis on Microsoft products so far.  There stuff is ubiquitous and flexible, so it can be easily shared and can be adapted to many different uses.  Let's look at the alternatives that do not involve Microsoft.

## Established ways companies and individuals preserve materials development data

There are a few established ways to preserve important work and results for yourself and those coming after you besides the Big Review PowerPoint.  And there are plenty of programs out there to help you keep track of the current things you need to have on your radar.  Let's look at the major ones I have seen:

- Write a technical report for internal distribution of proprietary data, or a scientific journal article for public consumption.  Even though it is written for other people, it can really help you as well.  The process of writing can help identify gaps in your work, clarify your thinking, and jog your memory if you haven't look at something in awhile.  These are important for a career in academia and government, but I have not seen this practice rewarded very much in corporate America.  It does not make money in a way that can be easily captured by Generally Accepted Accounting Practices, and it takes a **lot** of time that could be spent working on the latest emergency.

- Put your data in your company's official design databases.  This is the absolute best way of making sure your work makes a difference to your company.  Companies design their products with the rules, practices and data found in these databases.  For this reason, the submission and approval process is not easy and requires a lot of time/money for peer and management review.  The vast majority of projects and results will not be eligible.

- For manufacturing data, a shop router often accompanies parts as they make their way through the plant.  This is usually a physical piece of paper that outlines every step a part needs and has a place for each operator to sign when a step is completed.  That is great for one plant, but try sending your router to a vendor for some intermediate step!  Of course you can't, because the information on the router is proprietary and the vendor isn't going to do anything with it, let alone remember to put it back in the box with your parts.  Manufacturing environments are very tightly controlled and work best in isolation.  It is up to the engineer or logistics person to keep track of any additional processing or testing a part might have seen, and guess what software programs they use to do that?

## LIMS and ELNs

As I was searching on the internet for software that would do what I need, I came across two catagories of products that are worth mentioning.  The first is Laboratory Inventory Management System.  Type "LIMS" into Google and the first ad right now (July 2020) is for a product called [Uncountable](www.uncountable.com).  The second category is the Electronic Lab Notebook.  The first Google ad right now is a product called [Exemplar](https://exemplareln.com/).  These two product categories are starting to merge and share a lot of the same ideas, which are:

- Company or department wide inventory and experiment management
- Data stored in the cloud
- Emphasizes collaboration
- Track lab consumables and instrument calibration/usage

The target customer seems to be medical research groups and testing labs, which have a regulatory need for keeping track of samples for audits.  I can see where they would be helpful, but my use case is for a single user or team with data that cannot be stored in the cloud and should not be shared across the department.  Collaboration is great, but if I need to share data with someone I will use PowerPoint and Excel.

## Workflow software

Search for "workflow software" and a whole new category comes up.  This is much closer to what I'm trying to do -- now we are getting somewhere!  

In these apps, a workflow is set up once that is expected to be followed many times by lots of different people.  Typical examples:

- Employee Onboarding
- Vacation Request
- Purchase Request
- Travel Reimbursement

Here are my brief notes on several of these apps that I looked at

- Decisions: looks huge, wayyy more than I need, designed for entire companies
- Omnidek: $250/month starter
- Kissflow: $360/month for 30 users
- Monday: Aggressive advertising (Google saw I was searching for this type of thing and all of a sudden every other YouTube ad was for Monday).  But it worked!  I gave them my email address and started looking around.  It is cloud based, and looked like the workflows were linear.  I want my software to feel less like a comprehensive cloud-based system I have to buy into, and more like a lite overlay on what I already do
- Process street - very linear, to-do, assign to team.  cloud based

## Conclusion

This has been a long post.  My feeling is that if I did not find what I needed, either it doesn't exist or it is not being marketed well because I looked.  I need software that does the following:

1. Keep track of the status of samples through a workflow, where most workflows will be different
2. Find historical data and all associated documentation files quickly and in context

It needs to do these two things without trying to replace PowerPoint, Excel, or Outlook.  It needs to be on my hard drive or network drive for security purposes.  And it needs to have a very easy learning curve.  That is the software I am making for the world in my spare time.  :)
