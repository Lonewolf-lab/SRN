import { useState } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { LanguageProvider } from "./context/LanguageContext";
import HamburgerMenu from "./components/HamburgerMenu";
import Footer from "./components/Footer";
import SplashScreen from "./components/SplashScreen";
import Home from "./pages/Home";
import Sangathan from "./pages/Sangathan";
import Uddeshya from "./pages/Uddeshya";

function Layout({ children }) {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <div className="min-h-screen flex flex-col">
      <HamburgerMenu isOpen={menuOpen} setIsOpen={setMenuOpen} />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}

export default function App() {
  const [splashDone, setSplashDone] = useState(false);

  return (
    <>
      {/* Splash screen — shown once on first load */}
      <AnimatePresence>
        {!splashDone && (
          <SplashScreen onDone={() => setSplashDone(true)} />
        )}
      </AnimatePresence>

      {/* Main app */}
      <LanguageProvider>
        <BrowserRouter basename={import.meta.env.BASE_URL}>
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/sangathan" element={<Sangathan />} />
              <Route path="/uddeshya" element={<Uddeshya />} />
              <Route path="*" element={
                <div className="flex-1 flex flex-col items-center justify-center py-20">
                  <h1 className="text-6xl font-bold text-[#5C1010]">404</h1>
                  <p className="text-[#7A5C45] mt-4 text-xl">Page Not Found</p>
                  <Link to="/" className="mt-8 px-6 py-3 bg-[#E8622A] text-white rounded-full font-semibold hover:bg-[#C04A18] transition-all">Go Home</Link>
                </div>
              } />
            </Routes>
          </Layout>
        </BrowserRouter>
      </LanguageProvider>
    </>
  );
}
