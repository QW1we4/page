"use client";

import { useMetamask } from "@/hooks";
import { NextPage } from "next";
import { useEffect } from "react";

const Home: NextPage = () => {
  const { getAccount } = useMetamask();

  useEffect(() => {
    getAccount();
  }, []);

  return <main>Hello, NextJS!</main>;
};

export default Home;
