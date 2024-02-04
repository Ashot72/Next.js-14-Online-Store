# Next.js 14 Online Store

This is a [Next.js 14](https://nextjs.org/docs) Online Store app that uses App Router, [NextAuth](https://next-auth.js.org/) (Google Provider), [NextUI](https://nextui.org/), and [TailwindCSS](https://tailwindcss.com/). 

As a cloud-based database, [MongoDB](https://www.mongodb.com/atlas/database) is used with [Prisma ORM](https://www.prisma.io/ ). 

[Stripe](https://stripe.com/) payment service (test mode) is integrated into the app, allowing you to make purchases with test card numbers and view all transactions on Stripe's *Payments* panel.

 In this Online Store app
 
 + Implemented **user authentication** flows with NextAuth, for secure and scalable user management
 + Created **Prisma schema** for MongoDB
 + Structured **server actions** to handle data mutations
 + Analyzed **server versus client components** and understood how to utilize each for optimal efficiency
 + Implemented **data validation with Zod** to ensure the reliability of user input
 + **Streamed Content** with React Server Components
 + Implemented **Caching with Request Memorization** for multiple repeted DB queries
 + For some actions impemented **Define in Parent, Fetch in Child** approach
 + Integrated **Stripe** payment service into the app
 + Enriched user interfaces with **TailwindCSS** support for styling components
 + Implemented, and discussed alternatives, to Next.js sophisticated **caching system** for high performance
 + Discussed the critical differences between **development and production environments**

When you run your application in production mode, its behavior changes, and the default caching behavior may not be suitable for your app. You might be surprised when you deploy your first app.

To get started.
```
       Clone the repository

       git clone https://github.com/Ashot72/Next.js-14-Online-Store
       cd Next.js-14-Online-Store

       Create the .env file based on the env.example.txt file and include the respective keys.
       
       # installs dependencies
         npm install

       # to run in development mode
         npm run dev
      
       # to run in production mode
         npm run build
         npm start
      
       # Stripe Card Information for testing
         Card Number: 4242 4242 4242 4242
         CVC: 567
         Expiration Date: 12/34
```

Go to [Next.js 14 Online Store Video](https://youtu.be/lZnUgYTFq6E) page

Go to [Next.js 14 Online Store Description](https://ashot72.github.io/Next.js-14-Online-Store/doc.html) page
