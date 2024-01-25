import Image from "next/image";
import NavBar from "./components/navBar";
import Forms from "./components/Forms";
import { connectDb } from "./db/db";

connectDb();

export default function Home() {


  return (
    <div className="bg-white">
      <NavBar></NavBar>
      <Forms></Forms>
    </div>
  );
}
