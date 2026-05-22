import React from "react";
import { Link } from "wouter";
import { Terminal, ArrowRight, Shield } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-card border-t border-border">
      {/* Access notice */}
      <div className="border-b border-border/50 bg-primary/5 px-6 py-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3 font-mono text-xs">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Shield className="w-3.5 h-3.5 text-primary shrink-0" />
            <span>Сайт недоступен? Смените DNS на <span className="text-primary">1.1.1.1</span> или <span className="text-primary">8.8.8.8</span> в настройках сети.</span>
          </div>
          <a
            href="https://t.me/trugarant1"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline flex items-center gap-1 shrink-0"
          >
            Или напишите напрямую @trugarant1 <ArrowRight className="w-3 h-3" />
          </a>
        </div>
      </div>

      <div className="px-6 py-10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 font-mono font-bold text-primary text-lg mb-3">
              <Terminal className="w-5 h-5" />
              sys.guard
            </div>
            <p className="text-xs font-mono text-muted-foreground leading-relaxed max-w-xs">
              C++ агент безопасности для веб-серверов. Работает на уровне ОС. Заказ только через Telegram.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <div className="font-mono text-xs text-muted-foreground/50 tracking-widest mb-4">// НАВИГАЦИЯ</div>
            <div className="flex flex-col gap-2 font-mono text-sm">
              <Link href="/" className="text-muted-foreground hover:text-primary transition-colors">/главная</Link>
              <Link href="/features" className="text-muted-foreground hover:text-primary transition-colors">/возможности</Link>
              <Link href="/how-it-works" className="text-muted-foreground hover:text-primary transition-colors">/архитектура</Link>
              <Link href="/contact" className="text-muted-foreground hover:text-primary transition-colors">/цены</Link>
            </div>
          </div>

          {/* Contact */}
          <div>
            <div className="font-mono text-xs text-muted-foreground/50 tracking-widest mb-4">// КОНТАКТ</div>
            <a
              href="https://t.me/trugarant1"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 border border-primary/30 text-primary font-mono text-sm hover:bg-primary/10 transition-colors mb-4"
            >
              <ArrowRight className="w-4 h-4" />
              @trugarant1
            </a>
            <p className="text-xs font-mono text-muted-foreground/50">
              Единственный официальный контакт.<br />Остерегайтесь фейков.
            </p>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-border/50 flex flex-col md:flex-row items-center justify-between gap-3 font-mono text-xs text-muted-foreground/40">
          <span>SYS.GUARD © {new Date().getFullYear()} // ALL RIGHTS RESERVED</span>
          <span>RESTRICTED ACCESS ONLY // v2.1</span>
        </div>
      </div>
    </footer>
  );
}
