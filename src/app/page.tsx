
"use client"


import dynamic from "next/dynamic";





const Homecmp = dynamic(
  () => import("@/ui/overview/homecmp"),
  {
    ssr: false,
  }
)

const Home = () => {

  return (
    <Homecmp />
  );
}
export default Home;