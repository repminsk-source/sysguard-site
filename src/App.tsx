import React from "react";
import { Route, Switch } from "wouter";
import { AnimatePresence } from "framer-motion";
import { ProtectionLayer } from "./components/ProtectionLayer";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";

// Pages
import Home from "./pages/Home";
import Features from "./pages/Features";
import HowItWorks from "./pages/HowItWorks";
import Contact from "./pages/Contact";

export default function App() {
  return (
    <ProtectionLayer>
      <div className="min-h-screen bg-background text-foreground selection:bg-primary selection:text-primary-foreground font-sans overflow-x-hidden dark relative flex flex-col">
        <div className="scanline" />
        <div className="crt-overlay" />
        
        <Navbar />

        <main className="flex-1 relative z-10">
          <AnimatePresence mode="wait">
            <Switch>
              <Route path="/" component={Home} />
              <Route path="/features" component={Features} />
              <Route path="/how-it-works" component={HowItWorks} />
              <Route path="/contact" component={Contact} />
              <Route>
                <div className="pt-32 px-6 text-center pb-20 flex-1 flex flex-col items-center justify-center">
                  <h1 className="text-6xl font-bold text-primary mb-4">404</h1>
                  <p className="font-mono text-muted-foreground">System path not found.</p>
                </div>
              </Route>
            </Switch>
          </AnimatePresence>
        </main>

        <Footer />
      </div>
    </ProtectionLayer>
  );
}
