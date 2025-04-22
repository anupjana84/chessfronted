import React, { Suspense } from "react";

import Footer from "../components/Footer";
import Header from "./Header";

export default function Layout({ children }) {
  return (
    <div className="relative w-full">
      <Suspense fallback={<div>Loading...</div>}>
        <Header />
      </Suspense>

      <div className="relative w-full">
        <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
      </div>
      <Suspense fallback={<div>Loading...</div>}>
        <Footer />
      </Suspense>
    </div>
  );
}
