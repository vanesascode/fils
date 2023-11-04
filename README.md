# `Threds` social media app to 'twit' with short texts

(Similar to Meta's Thread or X's Twitter ) 1.53h

Project to learn NextJs 14 more in depth (route groups,... ), and also other external APIs suchs a Clerks.

### 🔹 Installation & Libraries used:

- npx create-next-app@latest ./
- npm install tailwindcss-animate
- npm install @clerk/nextjs
- npm install @clerk/themes
- npx shadcn-ui@latest add form
- npx shadcn-ui@latest add input
- npx shadcn-ui@latest add textarea
- npm install @uploadthing/react uploadthing
- npm install mongoose
- npm install svix

---

[Clerk](https://clerk.com/docs/quickstarts/nextjs) handles tasks like user authentication, password reset, email verification, and more. It also provides an API that allows you to interact with the user data and perform actions like creating new users, updating user profiles, and managing user sessions. `Themes` lets you personalize styles.

👉 In a free account, you have a limit of 1000 users that can register into your app.

---

[Shadcn/ui](https://ui.shadcn.com/) is a library or package that provides a set of UI components and utilities for building user interfaces. I took the form and input components to customize it in Threds. When install, it asks you to init the library in order to use it: `npx shadcn-ui@latest init`. After asking the questions, you will see there is a new file in the tree, called `components.json`. Then it's time to run again: `npx shadcn-ui@latest add form` and you will see the components are installed. You'll see them inside the 'components' folder, in a just created folder called 'ui'. It also installs `react-hook-form`, `@hookform/resolvers` and `zod` as dependencies (@hookform/resolvers connects Zod with React Hook Form).

👉 Careful, when you install it, it may erase all your css globals file, and reset your tailwind.config.js

---

[Zod](https://zod.dev/) (which is installed with Shadcn/ui) is a powerful schema validation library that provides static `type inference` and `validation`. So, it is not limited to validating TypeScript. You can define `schemas` using the Zod API and then use them to validate data/objects both in JavaScript or TypeScript. Also, the build process or bundler will generate the necessary files in a `lib` folder. In this very same folder I created my validations. For example, the schema for the 'user' data.

Video explanation [here](https://www.youtube.com/watch?v=L6BE-U3oy80).

👉 While Typescript alone can provide some level of validation, it is less comprehensive compared to dedicated schema validation libraries like Zod or `Valibot` (this last one is even lighter than Zod). These libraries offer more advanced features such as custom error messages, nested schemas, and complex validation rules.

---

### 🔹 NextJS: Route Groups

In Next.js, [route groups](https://nextjs.org/docs/app/building-your-application/routing/route-groups) allow you to organize your routes into logical groups without affecting the URL path structure. By marking a folder as a route group, you can prevent it from being included in the route's URL path. This is useful for organizing routes, creating nested layouts, opting specific segments into a layout, and creating multiple root layouts.

Route groups are useful for:

- Organizing routes into groups e.g. by site section, intent, or team.
- Enabling nested layouts in the same route segment level:
  *- *Creating multiple nested layouts in the same segment, including multiple root layouts
  *- *Adding a layout to a subset of routes in a common segment

To create a route group, wrap the folder's name in parentheses. For example, (marketing) or (shop). This will omit the folder name from the URL path.

So, in this app, there are two route groups, `(auth)` and `(root)`. So, for example, this is not going to happen: http://localhost:3000/auth or http://localhost:3000/root

---

### 🔹 NextJS: Server Actions.

Server actions are used to handle form submissions, mutations, and other server-side operations in Next.js applications. They provide a convenient way to create server-side endpoints to, for example, handle data mutation through user interacting with forms (as in the case of this app), `without the need to create separate API routes`.

With server actions, you can define server-side functions that are executed when the form is submitted. These functions can access the form data and perform the necessary server-side operations, such as updating the database.

In this project, inside the `lib` folder, you have a folder called `actions`. In it, you have the files with functions that perform server actions. These functions are used to fetch and update user data. for example, in the app.

### 🔹 Design:

Threds is prepared to be both a `desktop` and a `native mobile` web application. When on the desktop, you are able to see the left and right sidebars, and when on mobile, all the buttons are on the bottom, so it is easier to navigate the app with the thumb of the hand of the user.

#### 👉 CSS properties I learned:

- `backdrop-filter` (see class 'bottombar'): It allows you to apply various visual effects to the area behind an element, such as blurring, brightness adjustment, contrast adjustment, grayscale, hue rotation, inversion, opacity, saturation, and sepia.

- `width: fit-content;` (see class 'leftsidebar'): It sets the width of an element to fit its content. So, in the leftsidebar, for example, you just don't need to set a width, which may be complicated with different screen sizes. `w-fit` (in tailwindcss) already sets the width it needs in any situation.

---

### 🔹 Tips:

- Autoimport of components/libraries: `Ctrl + space` or Cmd + Space

- The components folder is outside of the app folder because in the app we only put the files and folders which we want NextJS to render on the home page: there's no problem because `NextJS supports file based routing.`

- Specify the kinds of text in the `tailwind.config.js` file, because, unlike in the globals.css file even using 'layer-components', then, in any part of the app you can hover the class and it tells you what it is made of.

- Go to https://favicon.io/favicon-converter/ to create your own.

- TYPESCRIPT. To avoid the \*\*\*\* is possibly 'null' with the '&&':
  ![image](https://github.com/vanesascode/shadcn-ui-crash-course-recipe-app-json-server/assets/131259155/8875ff49-b207-4434-91b4-e3cfabe92039)

  ![image](https://github.com/vanesascode/shadcn-ui-crash-course-recipe-app-json-server/assets/131259155/f7c7cd50-dc85-4c55-b316-772b1d139c2c)

-
