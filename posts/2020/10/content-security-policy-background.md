---
title: Improve your website's security by implementing a content security policy
description: A good content security policy will help guard against cross-site scripting attacks.  Here is some background.
published: true
author: Jeff Schoonover
slug: content-security-policy-background
date: '2020-10-02'
---

## Improve your website's security by implementing a content security policy

OK, it is time to learn a little about security for this website.  The [Mozilla Observatory](https://observatory.mozilla.org/) is a website security auditor and a great place to get started.  And I started... with an initial grade of D+.  Ouch!  The tool told me I needed to implement the following:

1. Content Security Policy
2. X-Content-Type-Options header
3. X-Frame-Options header
4. X-XSS-Protection header

One thing at a time, I'm starting with the CSP.  But first, the type of attack these things are trying to prevent.

## Cross-site scripting (XSS) attacks

The majority of internet attacks these days are XSS attacks.  Google has written a nice [introduction to XSS](https://www.google.com/about/appsecurity/learning/xss/) with interactive examples that I am referencing along with the [Wikipedia XSS](https://en.wikipedia.org/wiki/Cross-site_scripting) article.  

The term "cross-site scripting" is a bit outdated in that it originally referred to attackers serving an evil website when a user visits a trusted site.  They think they are interacting with the trusted site but no.  Today the term has a much broader meaning where malicious code is executed by the browser because it seems like it is coming from the trusted domain.  A typical XSS attack happens when you have an input field, such as a search box for your website, that does not properly handle the input when it uses it.  Instead of putting in something normal and expected, the attacker puts some malicious code into the field that gets executed.  Often the result is that the attacker is able to expose sensitive information and steal the identity of the user.

## Content security policy

To learn about CSP, I recommend this [Google CSP tutorial](https://csp.withgoogle.com/docs/index.html) and an article on [Locking Down Your Website](https://www.troyhunt.com/locking-down-your-website-scripts-with-csp-hashes-nonces-and-report-uri/) by Troy Hunt.  The promise of a CSP is that it will allow you to identify the code that you trust and disallow any other code from running.  In practice, that identification process is a bit tricky and not usually implemented in a way that prevents XSS attacks.  Of course nothing is guaranteed to prevent, just like there is no security system that can guarantee to prevent a household break-in.  Security takes careful consideration of your particular situation and needs, adoption of best practices, and periodic review.  The good news is that if you don't have a site that requires logging in or sharing sensitive information, XSS attacks are not as big a threat.  Still, it is good to implement on early on and be thinking about security as you add to your site (eventually I want to have a searching function, and I currently have an i-frame).

A team from Google surveyed the internet and published a 2016 paper (available on the above link) that showed that >99% of CSPs on the internet were ineffective.  The biggest vulnerability you can have is if you allow inline scripts (that is, javascript embedded in your HTML files instead of in a separate file), but many CSPs do in fact allow this because it is so convenient.  The second biggest vulnerability is to put a list of whitelisted domains that you trust data from inside your CSP.  In theory this seems reasonable and the paper explains that this was one of the basic original ideas of the CSP.  But the way data from other websites are gathered can expose some unexpected vulnerabilities and it really is not recommended.

So what is recommended for a website that needs inline Javascript (hint: most sites don't, you can put your js in a separate file)?  The paper recommends the use of hashes or nonces.

## Hashes and nonces

An [article by Roger Grimes](https://www.csoonline.com/article/2879073/all-you-need-to-know-about-the-move-from-sha1-to-sha2-encryption.html) gives this definition of a hash:

>A good cryptographic hash function is a mathematical algorithm, which when run against any content (e.g. document, sound, video, picture, etc.) will always return a unique output result (often called a hash or hash result) for unique input content. No two differing inputs should ever return the same hash output and identical inputs should always result in the same output. Using these cryptographic properties, a hash output can be used on two differently submitted inputs to see if they are identical or not. Cryptographic hashes are the backbone of almost every digital authentication and integrity process.

The SHA-2 hash of that quote is 38cf858b3c048fe44e825fc42ed61be0b4547207c4cf6d90490add90db7f2ec9, to give an idea of what they look like.  The thing about a hash is that you can know the hash (the output), but you are not able to use it to figure out the input.  So you could write a script for your website, calculate its hash, and put the hash in your CSP (which is public) with the rule that any script with that exact hash is allowed to run.  The Google CSP tutorial says that hashes are the preferred way of allowing scripts in the CSP for static sites like mine.

An alternative to a hash for web apps or sites with dynamic scripts (whose hashes would be always changing) is a nonce, which is short for Number used Once.  You get your server to generate a random string that looks like a hash every time the page loads.  Assign that number to a variable, and put that variable as an attribute in the script tag you want to allow.  Note that unlike with a hash, any script with the correct nonce will run so it is less secure than a hash.  

## My Content Security Policy

Right now, my site is simple so the CSP should be simple.  I don't do any analytics on my site and I have no inline javascript.  I do have one i-frame for the email list signup, and I store my images on Cloudinary.  The 2016 Google paper says that by far the biggest security risks are scripts and objects.  Images are not as risky so I may whitelist the Cloudinary domain for images only.  Everything else can be rejected.

With that background, now I will go off and actually implement a CSP in Netlify, which is hosting this site.  The next post will report how it went.

Happy Coding!
