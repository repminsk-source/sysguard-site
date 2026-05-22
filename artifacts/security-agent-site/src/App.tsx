import React from "react";
import { Router, Route, Switch } from "wouter";
import { AnimatePresence } from "framer-motion";
import { ProtectionLayer } from "./components/ProtectionLayer";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { Cursor } from "./components/Cursor";
import { Terminal } from "lucide-react";
import { Link } from "wouter";

// Pages
import Home from "./pages/Home";
import Features from "./pages/Features";
import HowItWorks from "./pages/HowItWorks";
import Contact from "./pages/Contact";

const base = (import.meta.env.BASE_URL ?? "/").replace(/\/$/, "") || "";

function NotFound() {
  return (
    <div className="pt-32 px-6 pb-20 flex flex-col items-center justify-center min-h-[60vh] font-mono text-center">
      <div className="text-primary/20 text-[8rem] font-bold leading-none mb-4 select-none">404</div>
      <div className="border border-primary/30 bg-primary/5 px-8 py-6 max-w-md">
        <div className="flex items-center gap-2 justify-center mb-4 text-primary">
          <Terminal className="w-5 h-5" />
          <span className="text-sm tracking-widest">PATH_NOT_FOUND</span>
        </div>
        <p className="text-muted-foreground text-sm mb-6">
          Запрошенный маршрут не существует в системе.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-bold text-sm uppercase tracking-wider hover:bg-primary/90 transition-colors"
        >
          Вернуться на главную
        </Link>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <ProtectionLayer>
      <Router base={base}>
        <div className="min-h-screen bg-background text-foreground selection:bg-primary selection:text-primary-foreground font-sans overflow-x-hidden dark relative flex flex-col">
          <div className="scanline" />
          <div className="crt-overlay" />

          <Cursor />
          <Navbar />

          <main className="flex-1 relative z-10">
            <AnimatePresence mode="wait">
              <Switch>
                <Route path="/" component={Home} />
                <Route path="/features" component={Features} />
                <Route path="/how-it-works" component={HowItWorks} />
                <Route path="/contact" component={Contact} />
                <Route component={NotFound} />
              </Switch>
            </AnimatePresence>
          </main>

          <Footer />
        </div>
      </Router>
    </ProtectionLayer>
  );
}
