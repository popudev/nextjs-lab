import React from "react";
import { withSessionSsr } from "@/lib/withSession";

export default function SsrProfile({ user }) {
  console.log("user: ", user);
  return (
    <>
      <h1>Your GitHub profile</h1>
      <h2>
        This page uses
        <a href="https://nextjs.org/docs/basic-features/pages#server-side-rendering">
          Server-side Rendering (SSR)
        </a>{" "}
        and{" "}
        <a href="https://nextjs.org/docs/basic-features/data-fetching#getserversideprops-server-side-rendering">
          getServerSideProps
        </a>
      </h2>

      {user?.isLoggedIn && (
        <>
          <p style={{ fontStyle: "italic" }}>
            Public data, from <a href={`https://github.com/${user.login}`}>https://github.com/{user.login}</a>
            , reduced to `login` and `avatar_url`.
          </p>
          <pre>{JSON.stringify(user, null, 2)}</pre>
        </>
      )}
    </>
  );
}

export const getServerSideProps = withSessionSsr(async function getServerSideProps({ req }) {
  const user = req.session.user;
  console.log("user: ", user);

  if (user?.admin !== true) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      user: req.session.user,
    },
  };
});
