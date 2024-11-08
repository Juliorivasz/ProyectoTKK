/* eslint-disable react/prop-types */

import Navbar from "../navigation/Navbar";

export default function Layout({children}) {
  return (
    <main className="bg-[#cde8e5]">
      <Navbar/>
      {children}
    </main>
  )
}
