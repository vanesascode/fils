# Threads app (Similar to Meta's Thread or X's Twitter )

Project to learn NextJs 14 more in depth. Route Groups,

### 🔹 Installation:

- npx create-next-app@latest ./
- npm install tailwindcss-animate
- npm install @clerk/nextjs
- npm install @uploadthing/react uploadthing
- npm install mongoose
- npm install svix

[Clerk Docs](https://clerk.com/docs/quickstarts/nextjs) - They are very good and easy to follow!

### 🔹 Route Groups:

In Next.js, route groups allow you to organize your routes into logical groups without affecting the URL path structure. By marking a folder as a route group, you can prevent it from being included in the route's URL path. This is useful for organizing routes, creating nested layouts, opting specific segments into a layout, and creating multiple root layouts.

Route groups are useful for:

- Organizing routes into groups e.g. by site section, intent, or team.
- Enabling nested layouts in the same route segment level:
  *- *Creating multiple nested layouts in the same segment, including multiple root layouts
  *- *Adding a layout to a subset of routes in a common segment

To create a route group, wrap the folder's name in parentheses. For example, (marketing) or (shop). This will omit the folder name from the URL path.

So, in this app, there are two route groups, `(auth)` and `(root)`. So, for example, this is not going to happen: http://localhost:3000/auth or http://localhost:3000/root

### 🔹 Tips:

- Autoimport of components/libraries: `Ctrl + space` or Cmd + Space

- The components folder is outside of the app folder because in the app we only put the files and folders which we want NextJS to render on the home page: there's no problem because `NextJS supports file based routing.`

- Specify the kinds of text in the `tailwind.config.js` file, because, unlike in the globals.css file even using 'layer-components', then, in any part of the app you can hover the class and it tells you what it is made of.

- Go to https://favicon.io/favicon-converter/ to create your own.
