# Este sistema web é uma simulação de comércio eletrônico e não é um aplicativo real.

# This web system is an ecommerce simulation and is not a real application.

# Todas as imagens, nomes, preços, marcas e textos são fictícios e utilizados apenas para esse exemplo de conclusão de curso.

# All images, names, prices, brands and texts are fictitious and used only for this course completion example.

# Exemplo de comércio eletrônico usando Next.js 13+, App Router, Server Components and Actions.

# Example of Full-Ecommerce By Next.js 13+, App Router, Server Components and Actions.

|                |                                                        |
| -------------- | ------------------------------------------------------ |
| Tech           | Nextjs 13+, Server Components & Actions, Route Handler |
| UI             | Tailwind, DaisyUI, Chart.js                            |
| Database       | MongoDB, Mongoose                                      |
| Payment        | PayPal, Stripe, cash(simulation)                       |
| Deployment     | Github, Vercel, MongoDB Atlas                          |
| Authentication | Auth.js, Google Auth                                   |
| Others         | Cloudinary, Zustand, SWR                               |

![Rmj ecommerce v1](/public/app.jpg)

## Resources

- Youtube Video : https://www.youtube.com/watch?v=WAwfyh_cSCM
- Demo Website :  https://next-rmjecommerce-v1.vercel.app/
- Source Code   :  https://github.com/rmotaop/next-rmjecommerce-v1

## What you will see

- NextJS basics use in this project, pages and data fetching
- NextJS advanced topics like app router, server component & actions, image optimization,
- Tailwind CSS and DaisyUI framework use to build responsive website using custom theme, animation and carousel
- ReactJS including decomposing components, state management with Zustand and data fetching using swr
- Auth.js package to authenticate customers and admin users
- MongoDB and Mongoose to save and retrieve data like products, orders and users
- PayPal developer api to make online payment
- This applications web is deploy on servers Vercel

## Run Locally

1. Clone repo

   ```shell
    $ git clone git@github.com:rmotaop/next-rmjecommerce-v1.git
    $ cd next-rmjecommerce-v1
   ```

2. Create .env File

   - duplicate .env.example and rename it to .env

3. Setup MongoDB

   - Local MongoDB
     - Install it from [here](https://www.mongodb.com/try/download/community)
     - In .env file update MONGODB_URI=mongodb://localhost/rmjecommerce
   - OR Atlas Cloud MongoDB
     - Create database at [https://cloud.mongodb.com](https://cloud.mongodb.com)
     - In .env file update MONGODB_URI=mongodb+srv://your-db-connection

4. Install and Run

   ```shell
     npm install
     npm run dev
   ```

5. Seed Data

   - Run this on browser: http://localhost:3000/api/seed
   - It returns admin email and password and 6 sample products

6. Client Login

   - Run http://localhost:3000/signin
   - Enter cliente email "client@gmail.com" and password "1234" and click Signin

7. Admin Login

   - Run http://localhost:3000/signin
   - Enter admin email "admin@gmail.com" and password "1234" and click Signin

8. About the website

   - All content on this site is symbolic, used as a simulation for the development of the specialization course completion project
   - All images used on this site were obtained freely from the internet and any reference to any product is the sole responsibility of its manufacturers
   - All information contained on this website is symbolic, both values, images and data are strictly for use in this example application and do not characterize a real application

## Promo

Welcome to version 1 of next.js rmjecommerce. it is coding course to build a full functional ecommerce website using next.js lastest features like App router, sever components and actions and route handler for my graduation curse of Puc Minas
