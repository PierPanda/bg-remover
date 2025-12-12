import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center p-4 my-auto">
      <h1>Welcome to React Router</h1>
      <p>
        This is a boilerplate project for you to get started with React Router.
      </p>
    </div>
  );
}
