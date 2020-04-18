import React from "react";
import Link from "next/link";

const Home = () => {
  return (
    <div>
      <Link href="/about">
        <a>about</a>
      </Link>
      <h1>Hello Home</h1>
    </div>
  );
};

export default Home;
