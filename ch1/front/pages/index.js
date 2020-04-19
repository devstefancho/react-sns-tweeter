import React from "react";
import Link from "next/link";

const Home = () => {
  return (
    <React.Fragment>
      <Link href="/about">
        <a>about</a>
      </Link>
      <h1>Hello Home</h1>
    </React.Fragment>
  );
};

export default Home;
