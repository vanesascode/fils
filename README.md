# `Fils` social media

- Fils connects people through microblogging and social networking. It accommodates up to 10,000 active users and 100 active organizations.

- It is implemented with Next.js for both frontend and backend. It utilizes MongoDB with Mongoose for scalable data management, Zod for data integrity, Clerk for streamlined authentication, and Shadcn/ui, Tailwind, and CSS to enhance the interface.

- Coded with TypeScript and tested with Jest, it ensures project quality and reliability.

- User experience remains a priority throughout the project.

In process:

- Adding saved posts
- Adding replies list
- Making posts editable
- Adding likes

(Inspired on Meta's Thread & X's Twitter )

### 🔹 Installation & Libraries used:

- npx create-next-app@latest ./
- npm install tailwindcss-animate
- npm install @clerk/nextjs
- npm install @clerk/themes
- npx shadcn-ui@latest add form
- npx shadcn-ui@latest add input
- npx shadcn-ui@latest add textarea
- npx shadcn-ui@latest add tabs
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

---

### 🔹 NextJS: searchParams and Pagination.

In Next.js, the searchParams property is derived from the `query parameters in the URL`. It allows you to access and manipulate these parameters. So, to deal with the pagination, I was able to pass the searchParams object to the fetchPosts server action function in order to retrieve posts based on the page number. This server action function also gives me access to a variable I called `isNext`, which determines if there are more posts to show on the next page.

To enable or disable the pagination buttons, I created a Pagination component. In there, there is a `handleNavigation` function that handles the navigation logic based on the button clicked and updates the URL accordingly.

The initial pagination value is set to 1, of course, and the searchParams object is updated with the new page value when the 'Next' button is clicked. This allows you to navigate through the pages and update the URL accordingly.

---

### 🔹 Parent & Children Threads, to create social media comments.

Users can post comments on existing threads. By using the parentId and children properties, it is possible to create a nested structure of comments, allowing for threaded conversations in a social media app. Each comment can have multiple replies, and these replies can have their own replies, creating a tree-like structure of comments.

This is the process:

In the `thread.model.ts`, there are ‘parentID’ and possible ‘children’ properties that are created when comments are saved. So, when the comment is created, it takes the id of the original thread as the parentID. This way I have it easy to render either original threads in the client’s (the ones that don’t have a parentID) and the comments (the ones that do have a parentID)

Then, in the same `"addCommentToThread" server action`, I am pushing the comment as children to the original thread. So, while I am creating the comment, I am also updating the original thread with this new property in the database. This way, I can render together all the comments that are related to a particular original thread.

Since this is made `recursive`, once I create a comment from another comment, This second comment gets the ID of the first comment( which is the ID of the original comment) and sets it as its parentID.

Each thread is rendered in the `ThreadCard` card component, which in the case of comments, has a boolean true `isComment` prop. This makes it possible to conditionally render or apply different styles or behaviors based on whether the component represents the original thread or a comment.

And how is it that the comment passes to be kind of an ‘original thread’ in the individual thread page, when I create a comment of the comment? Because the Link that the button of replying holds, is going to `/thread/${id}` , thanks to `params`. And when clicking, then the individual thread page renders again, but placing each thread id into the Thread component that it has to go to.

---

### 🔹 Design:

Threds is prepared to be both a `desktop` and a `native mobile` web application. When on the desktop, you are able to see the left and right sidebars, and when on mobile, all the buttons are on the bottom, so it is easier to navigate the app with the thumb of the hand of the user.

---

#### Icons come from [google icons](https://fonts.google.com/icons), the rounded ones.

---

#### 👉 CSS properties I learned:

- `backdrop-filter` (see class 'bottombar'): It allows you to apply various visual effects to the area behind an element, such as blurring, brightness adjustment, contrast adjustment, grayscale, hue rotation, inversion, opacity, saturation, and sepia.

- `width: fit-content;` (see class 'leftsidebar'): It sets the width of an element to fit its content. So, in the leftsidebar, for example, you just don't need to set a width, which may be complicated with different screen sizes. `w-fit` (in tailwindcss) already sets the width it needs in any situation.

---

### 🔹 Webhooks:

Webhooks are a way for web applications to send real-time notifications or data to other applications or services. They allow you to `receive updates from an external service when a specific event or trigger occurs`.

As I mentioned, I am working with Clerk to do the initial authentication in the social app. It also lets you create “organizations”, which are shared accounts that can be created and managed within the Clerk administrative dashboard.

However, we need a webhook to make the data from Clerk go into the social media app, so we can manage it inside our app( for example, when an organization or membership is created, or deleted, etc) . It is necessary to have the webhook waiting and listening for the events from Clerk so we can then make additional actions and modify the database accordingly.

👉 To do so, an endpoint is necessary in the api folder of the app. In there, we create the events to be listened to. Also, you must create a webhook inside your profile, in the Clerk website. To do so, the application must be deployed first to be able to expose the API route that will then be able to add as the endpoint. You can find more info about Clerk webhooks [here](https://lnkd.in/eAnmedYq)

Then, everything is just the same: create your schema for the database, the server actions of the backend and connect it all to the endpoint (it is the `route.ts` file in the webhook/clerk folder, inside api folder, inside the app folder)

### 🔹 Tips:

- Autoimport of components/libraries: `Ctrl + space` or Cmd + Space

- The components folder is outside of the app folder because in the app we only put the files and folders which we want NextJS to render on the home page: there's no problem because `NextJS supports file based routing.`

- Specify the kinds of text in the `tailwind.config.js` file, because, unlike in the globals.css file even using 'layer-components', then, in any part of the app you can hover the class and it tells you what it is made of.

- Go to https://favicon.io/favicon-converter/ to create your own.

- TYPESCRIPT. To avoid the \*\*\*\* is possibly 'null' with the '&&':
  ![image](https://github.com/vanesascode/shadcn-ui-crash-course-recipe-app-json-server/assets/131259155/8875ff49-b207-4434-91b4-e3cfabe92039)

  ![image](https://github.com/vanesascode/shadcn-ui-crash-course-recipe-app-json-server/assets/131259155/f7c7cd50-dc85-4c55-b316-772b1d139c2c)
