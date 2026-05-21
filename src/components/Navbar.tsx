import React, { useEffect, useState } from "react";
import { Link, useLocation } from "wouter";
import { Terminal, Menu, X, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function Navbar() {
  const [location] = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "/", label: "/главная" },
    { href: "/features", label: "/возможности" },
    { href: "/how-it-works", label: "/архитектура" },
    { href: "/contact", label: "/контакты" },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 w-full z-40 transition-all duration-300 border-b ${
          isScrolled
            ? "bg-background/90 backdrop-blur-md border-border py-3"
            : "bg-transparent border-transparent py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 font-mono font-bold text-primary text-xl hover:opacity-80 transition-opacity">
            <Terminal className="w-6 h-6" />
            <span>sys.guard</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8 text-sm font-mono text-muted-foreground">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`transition-colors hover:text-primary ${
                  location === link.href ? "text-primary" : ""
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="hidden md:flex">
            <a
              href="https://t.me/trugarant1"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2 bg-primary text-primary-foreground font-mono font-bold text-sm hover:bg-primary/90 transition-all flex items-center gap-2"
            >
              ЗАКАЗАТЬ <ArrowRight className="w-4 h-4" />
            </a>
          </div>

          {/* Mobile Toggle */}
          <button
            className="md:hidden text-foreground hover:text-primary transition-colors p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-30 bg-background/95 backdrop-blur-xl pt-24 px-6 md:hidden flex flex-col"
          >
            <div className="flex flex-col gap-6 font-mono text-xl">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block py-3 border-b border-border transition-colors hover:text-primary ${
                    location === link.href ? "text-primary border-primary/50" : "text-muted-foreground"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
            <div className="mt-12">
              <a
                href="https://t.me/trugarant1"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-4 bg-primary text-primary-foreground font-mono font-bold text-center flex items-center justify-center gap-2 hover:bg-primary/90"
              >
                СВЯЗАТЬСЯ В TELEGRAM <ArrowRight className="w-5 h-5" />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
