import React from "react";
import { Link } from "wouter";
import { Terminal } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-card border-t border-border py-12 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex items-center gap-2 font-mono font-bold text-muted-foreground text-lg">
          <Terminal className="w-5 h-5 text-primary" />
          <span>sys.guard</span>
        </div>
        
        <div className="flex gap-6 font-mono text-sm text-muted-foreground">
          <Link href="/" className="hover:text-primary transition-colors">/главная</Link>
          <Link href="/features" className="hover:text-primary transition-colors">/возможности</Link>
          <Link href="/how-it-works" className="hover:text-primary transition-colors">/архитектура</Link>
          <Link href="/contact" className="hover:text-primary transition-colors">/контакты</Link>
        </div>

        <div className="text-right font-mono text-xs text-muted-foreground">
          <p>SYS.GUARD © {new Date().getFullYear()} // ALL RIGHTS RESERVED.</p>
          <p className="mt-1 text-primary/40">RESTRICTED ACCESS ONLY</p>
        </div>
      </div>
    </footer>
  );
}
