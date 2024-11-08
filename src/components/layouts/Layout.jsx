/* eslint-disable react/prop-types */

import Navbar from "../navigation/Navbar";

export default function Layout({children}) {
  return (
    <main>
      <Navbar/>
      {children}
    </main>
  )
}
