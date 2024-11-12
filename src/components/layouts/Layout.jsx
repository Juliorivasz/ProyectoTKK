/* eslint-disable react/prop-types */

import { AuthContextProvider } from "../../context/AuthContext";
import Footer from "../navigation/Footer";
import Navbar from "../navigation/Navbar";

export default function Layout({ children }) {
  return (
    <AuthContextProvider >
      <main className="bg-[#cde8e5] min-h-screen">
        <Navbar />
        <div className="py-24">{children}</div>
        <Footer />
      </main>
    </AuthContextProvider>
  );
}
