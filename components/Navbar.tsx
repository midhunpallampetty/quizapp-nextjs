import Link from "next/link";
import React from "react";
const Navbar : React.FC=()=>{
    return(
<div className="bg-transparent h-[80px] flex flex-row items-center px-20 justify-between ">
<Link href='/' className="text-white/65  font-extrabold font-mono text-3xl ">QuezPro</Link>
<Link href='/questions/answers' className="text-white font-extrabold font-mono text-2xl">Answers</Link>
<h1 className="text-white font-extrabold font-mono text-2xl">About</h1>
<h1 className="text-white font-extrabold font-mono text-2xl">Contact</h1>
<Link href='/add/new' className="text-white font-extrabold font-mono text-2xl">Add</Link>


</div>
    )

}
export default Navbar;