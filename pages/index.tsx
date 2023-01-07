import { NextSeo } from "next-seo";
import Head from "next/head";
import Header from "../components/Header/Header";

export default function Home() {
  return (
    <div className="flex flex-col">
      <NextSeo
        title="Discorda"
        description="discord clone made with nextjs and tailwind"
      />
      <Header />
    </div>
  );
}
