import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Shield, ShieldAlert, Cpu, Activity, Lock, ArrowRight, Server, FileCode2, Crosshair, Network, Terminal } from "lucide-react";
import { Link } from "wouter";

export default function Home() {
  const stats = [
    { label: "СИГНАТУР", value: "14,203" },
    { label: "CPU ОВЕРХЕД", value: "< 1%" },
    { label: "ЗАДЕРЖКА", value: "< 50ms" },
    { label: "ЛОЖНЫХ СРАБАТЫВАНИЙ", value: "0" },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pt-24 pb-20"
    >
      {/* Hero Section */}
      <section className="min-h-[80vh] flex flex-col justify-center px-6 relative overflow-hidden">
        {/* Animated Grid Background */}
        <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,65,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,65,0.1)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_10%,transparent_100%)]" />
        </div>

        <div className="max-w-7xl mx-auto relative z-10 w-full">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-4xl"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 border border-primary/30 bg-primary/5 text-primary text-xs font-mono mb-8">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              STATUS: ONLINE & ENFORCING
            </div>
            
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold mb-6 tracking-tight leading-tight uppercase glitch-text" data-text="БЕЗЖАЛОСТНАЯ ЗАЩИТА СЕРВЕРА">
              <span className="block">БЕЗЖАЛОСТНАЯ</span>
              <span className="text-primary block">ЗАЩИТА СЕРВЕРА</span>
            </h1>
            
            <p className="text-lg md:text-2xl text-muted-foreground mb-10 max-w-2xl font-mono leading-relaxed">
              Компилируемый C++ агент. Работает на уровне ОС. Невидимый, легковесный, 
              бескомпромиссный. Защищает веб-приложения от DDoS, ботов, парсеров и инъекций в реальном времени.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <a 
                href="https://t.me/trugarant1" 
                target="_blank" 
                rel="noopener noreferrer"
                className="px-8 py-4 bg-primary text-primary-foreground font-mono font-bold hover:bg-primary/90 transition-all flex items-center justify-center gap-2 text-base md:text-lg uppercase tracking-wider hover:scale-105"
              >
                Связаться в Telegram
                <Crosshair className="w-5 h-5" />
              </a>
              <Link 
                href="/features" 
                className="px-8 py-4 border border-border bg-card/50 backdrop-blur text-foreground font-mono font-bold hover:border-primary/50 hover:bg-primary/5 transition-all text-base md:text-lg uppercase tracking-wider text-center"
              >
                Узнать больше
              </Link>
            </div>
          </motion.div>

          {/* Stats Bar */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-4 border-y border-border py-8"
          >
            {stats.map((stat, i) => (
              <div key={i} className="text-center sm:text-left px-4 border-r border-border/50 last:border-0">
                <div className="text-2xl md:text-4xl font-bold text-primary mb-1 font-mono">{stat.value}</div>
                <div className="text-xs md:text-sm text-muted-foreground font-mono">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Brief Overview Section */}
      <section className="py-24 bg-card px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold uppercase mb-4">ВЕКТОРЫ АТАК</h2>
            <p className="text-muted-foreground font-mono max-w-2xl mx-auto">Мы блокируем угрозы до того, как они достигнут вашего приложения.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Shield, title: "DDoS & Flood", desc: "Моментальный drop пакетов на уровне ядра." },
              { icon: FileCode2, title: "Инъекции & XSS", desc: "Блокировка попыток выполнения произвольного кода." },
              { icon: Activity, title: "Боты и Парсеры", desc: "Выявление и изоляция скриптов-парсеров." },
              { icon: Lock, title: "Контроль доступа", desc: "Блокировка перебора паролей (Brute Force)." }
            ].map((f, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-6 border border-border bg-background hover:border-primary/50 transition-colors group cursor-default"
              >
                <f.icon className="w-8 h-8 text-primary mb-4 opacity-50 group-hover:opacity-100 transition-opacity" />
                <h3 className="font-bold text-lg mb-2 uppercase">{f.title}</h3>
                <p className="text-sm text-muted-foreground font-mono">{f.desc}</p>
              </motion.div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link href="/features" className="inline-flex items-center gap-2 text-primary font-mono hover:underline">
              Смотреть все возможности <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </motion.div>
  );
}
