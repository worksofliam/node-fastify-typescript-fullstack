# Node.js, Fastify, TypeScript, OpenAPI, fullstack template

This is a fullstack template for Node.js, Fastify, TypeScript, OpenAPI, and more. It includes a backend scaffold with Fastify, TypeScript, and OpenAPI, as well as a frontend API client scaffold. There is no frontend UI. You can add that and make use of the generated client.

## Setup

1. Clone this template
2. `cd backend && npm install` for the backend
3. `cd ui && npm install` for the frontend API client
4. `cd spec && npm run build` to generate the client and backend types

### Test backend

1. `cd backend`
2. `npm run dev` to start the backend server

Or, debug from VS Code with `Launch Program (backend)`.

* Head to `localhost:8080/data` and see the request fail due to missing JWT token.
* Use the `/login` API with `admin:admin` to get a JWT token.

### Adding additional routes

Always start by adding the route to the OpenAPI spec in `spec/openapi.yaml`. Then, run `npm run build` in the `spec` directory to generate the updated client and backend types. 

Ensure your new route has a simple `operationId`, like `getData` or `setData`, as this is what the handler function will be named in the `backend/src/web/routes/handlers.ts`.

## More ideas 🚀

* Add a backend database client like Db2 for i, Postgres, or SQLite
* Add a frontend UI with React, Vue, or Svelte
* Add an improved login system in `doLogin` with a more secure authentication method

### React Router tips for the frontend

Make a router with `react-router-dom` v6+ and use the `loader` property to handle the authentication and redirect to the login page if needed.

<details>

<summary>Example</summary>

```ts
const router = createBrowserRouter([
  {
    loader: HomeLoader,
    errorElement: <ErrorPage />,
    path: "dash",
    children: [
      {
        index: true,
        element: <Home />,
      },
    ]
  },
    {
    index: true,
    element: <Login />,
    errorElement: <ErrorPage />,
  },
]);
```

```ts
export async function HomeLoader() {
  // https://stackoverflow.com/questions/44133536/
  const token = localStorage.getItem(`jwt`);

  // console.log(`token: ${token}`)

  if (!token) {
    return redirect(`/`);
  }

  OpenAPI.TOKEN = token;

  try {
    // TODO: implement this service to verify the token
    const res = await DefaultService.getCurrentUser();
    console.log(res);
    useUserStore.subscribe((state) => {
      state.login(res.username, token);
    });

    return {}
  } catch (e) {
    useUserStore.subscribe((state) => {
      state.logout();
    });

    OpenAPI.TOKEN = undefined;
    localStorage.removeItem(`jwt`);

    return redirect(`/`);
  }
}
```

</details>