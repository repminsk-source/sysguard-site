import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Shield, FileCode2, Activity, Lock, ArrowRight, Crosshair, Zap } from "lucide-react";
import { Link } from "wouter";

const ATTACK_TYPES = [
  "SQLi", "XSS", "DDoS", "Brute Force", "LFI", "RCE", "CSRF", "Bot",
  "Slowloris", "SSRF", "RFI", "Scraper", "Flood", "PortScan", "XXE"
];
const COUNTRIES = ["RU", "CN", "US", "DE", "BR", "KR", "IR", "NL", "UA", "VN", "TR", "IN"];

function randomIp() {
  return `${Math.floor(Math.random()*220)+1}.${Math.floor(Math.random()*255)}.${Math.floor(Math.random()*255)}.${Math.floor(Math.random()*254)+1}`;
}

function useCountUp(target: number, duration = 2000) {
  const [val, setVal] = useState(0);
  const started = useRef(false);
  return { val, start: () => {
    if (started.current) return;
    started.current = true;
    const startTime = Date.now();
    const tick = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setVal(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }};
}

function AttackFeed() {
  const [lines, setLines] = useState<{ id: number; ip: string; type: string; cc: string; ts: string }[]>([]);
  const counter = useRef(0);

  useEffect(() => {
    const addLine = () => {
      const now = new Date();
      const ts = `${String(now.getHours()).padStart(2,"0")}:${String(now.getMinutes()).padStart(2,"0")}:${String(now.getSeconds()).padStart(2,"0")}`;
      setLines(prev => [
        { id: counter.current++, ip: randomIp(), type: ATTACK_TYPES[Math.floor(Math.random()*ATTACK_TYPES.length)], cc: COUNTRIES[Math.floor(Math.random()*COUNTRIES.length)], ts },
        ...prev.slice(0, 11)
      ]);
    };
    addLine();
    const interval = setInterval(addLine, 1400);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="border border-border bg-black/80 backdrop-blur overflow-hidden font-mono text-xs">
      <div className="px-4 py-2 border-b border-border bg-card/50 flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
        <span className="text-primary text-xs tracking-widest">LIVE THREAT FEED</span>
        <span className="ml-auto text-muted-foreground">sys.guard v2.1</span>
      </div>
      <div className="divide-y divide-border/30">
        {lines.map((line, i) => (
          <div
            key={line.id}
            className="flex items-center gap-3 px-4 py-2"
            style={i === 0 ? { animation: "log-in 0.5s ease" } : undefined}
          >
            <span className="text-muted-foreground/50 w-16 shrink-0">{line.ts}</span>
            <span className="text-red-400 font-bold w-14 shrink-0">BLOCK</span>
            <span className="text-primary/80 w-32 shrink-0">{line.ip}</span>
            <span className="text-muted-foreground w-8 shrink-0">[{line.cc}]</span>
            <span className="text-yellow-400/80">{line.type}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function StatCard({ value, label, prefix = "", suffix = "", delay = 0 }: { value: number; label: string; prefix?: string; suffix?: string; delay?: number }) {
  const { val, start } = useCountUp(value, 1800);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) start(); }, { threshold: 0.5 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.6 }}
      className="text-center px-4 border-r border-border/50 last:border-0"
    >
      <div className="text-2xl md:text-4xl font-bold text-primary mb-1 font-mono tabular-nums">
        {prefix}{val.toLocaleString("ru")}{suffix}
      </div>
      <div className="text-xs md:text-sm text-muted-foreground font-mono">{label}</div>
    </motion.div>
  );
}

export default function Home() {
  const [glitchActive, setGlitchActive] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setGlitchActive(true);
      setTimeout(() => setGlitchActive(false), 200);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pt-24 pb-20"
    >
      {/* Hero */}
      <section className="min-h-[88vh] flex flex-col justify-center px-6 relative overflow-hidden">
        {/* Grid */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute inset-0 opacity-15 bg-[linear-gradient(rgba(0,255,65,0.15)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,65,0.15)_1px,transparent_1px)] bg-[size:44px_44px] [mask-image:radial-gradient(ellipse_70%_70%_at_50%_40%,#000_10%,transparent_100%)]" />
        </div>

        {/* Scan line */}
        <motion.div
          className="absolute left-0 right-0 h-px bg-primary/20 z-0 pointer-events-none"
          animate={{ top: ["0%", "100%"] }}
          transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
        />

        <div className="max-w-7xl mx-auto relative z-10 w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 border border-primary/30 bg-primary/5 text-primary text-xs font-mono mb-8">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                STATUS: ONLINE — ENFORCING
              </div>

              <h1 className={`text-4xl sm:text-5xl md:text-[4.5rem] font-bold mb-6 tracking-tight leading-[1.05] uppercase transition-all duration-75 ${glitchActive ? "translate-x-[2px] text-primary" : ""}`}>
                <span className="block text-foreground">БЕЗЖАЛОСТНАЯ</span>
                <span className="block text-primary relative">
                  ЗАЩИТА
                  {glitchActive && (
                    <span className="absolute inset-0 text-red-500/40 translate-x-[3px] translate-y-[1px] select-none" aria-hidden>ЗАЩИТА</span>
                  )}
                </span>
                <span className="block text-foreground">СЕРВЕРА</span>
              </h1>

              <p className="text-base md:text-lg text-muted-foreground mb-10 max-w-xl font-mono leading-relaxed">
                Скомпилированный C++ агент. Работает на уровне ОС. Перехватывает угрозы до того, как они достигают вашего приложения.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <motion.a
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  href="https://t.me/trugarant1"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-8 py-4 bg-primary text-primary-foreground font-mono font-bold flex items-center justify-center gap-2 text-base uppercase tracking-wider relative overflow-hidden group"
                >
                  <span className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                  <span className="relative">Связаться в Telegram</span>
                  <Crosshair className="w-5 h-5 relative" />
                </motion.a>
                <Link
                  href="/features"
                  className="px-8 py-4 border border-border bg-card/30 backdrop-blur text-foreground font-mono font-bold hover:border-primary/60 hover:bg-primary/5 hover:text-primary transition-all text-base uppercase tracking-wider text-center"
                >
                  Возможности
                </Link>
              </div>
            </motion.div>
          </div>

          {/* Live feed */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            <AttackFeed />
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 border-y border-border px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 py-4">
          <StatCard value={14203} label="СИГНАТУР В БАЗЕ" delay={0} />
          <StatCard value={1} label="CPU ОВЕРХЕД" suffix="%" delay={0.1} />
          <StatCard value={50} label="ЗАДЕРЖКА (ms)" prefix="< " delay={0.2} />
          <StatCard value={0} label="ЛОЖНЫХ СРАБАТЫВАНИЙ" delay={0.3} />
        </div>
      </section>

      {/* Attack vectors */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <div className="text-primary font-mono text-xs tracking-widest mb-3">// ВЕКТОРЫ УГРОЗ</div>
            <h2 className="text-3xl md:text-5xl font-bold uppercase">ЧТО МЫ БЛОКИРУЕМ</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border">
            {[
              {
                icon: Shield,
                title: "DDoS и Flood",
                desc: "Мгновенный drop пакетов на уровне ядра через nftables. Распознаём Slowloris, HTTP-flood, амплификационные атаки.",
                tag: "L3 / L7"
              },
              {
                icon: FileCode2,
                title: "Инъекции и XSS",
                desc: "Глубокая инспекция payload — SQL, JavaScript, команд ОС. Декодирование обфусцированных запросов до приложения.",
                tag: "PAYLOAD"
              },
              {
                icon: Activity,
                title: "Боты и Парсеры",
                desc: "Фингерпринтинг TLS и HTTP параметров. Блокировка headless-браузеров и автоматизированных scrapers без капч.",
                tag: "BOT-NET"
              },
              {
                icon: Lock,
                title: "Brute Force",
                desc: "Отслеживание распределённых попыток перебора паролей с разных IP. Credential stuffing не имеет шансов.",
                tag: "AUTH"
              },
            ].map((f, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                whileHover={{ backgroundColor: "rgba(0,255,65,0.03)" }}
                className="p-8 bg-background group cursor-default transition-colors"
              >
                <div className="flex items-start justify-between mb-6">
                  <div className="w-12 h-12 border border-border group-hover:border-primary/50 transition-colors flex items-center justify-center">
                    <f.icon className="w-5 h-5 text-primary" />
                  </div>
                  <span className="font-mono text-xs text-muted-foreground border border-border/50 px-2 py-1">{f.tag}</span>
                </div>
                <h3 className="font-bold text-xl mb-3 uppercase">{f.title}</h3>
                <p className="text-sm text-muted-foreground font-mono leading-relaxed">{f.desc}</p>
                <div className="mt-6 h-px bg-primary/0 group-hover:bg-primary/20 transition-all duration-500" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="px-6 py-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="border border-primary/30 bg-primary/5 p-10 md:p-16 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8"
          >
            {/* Background noise */}
            <div className="absolute inset-0 opacity-5 bg-[url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noise%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.9%22 numOctaves=%224%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noise)%22/%3E%3C/svg%3E')]" />
            <div>
              <div className="font-mono text-xs text-primary/60 mb-2 tracking-widest">// ГОТОВ К РАЗВЁРТЫВАНИЮ</div>
              <h2 className="text-2xl md:text-4xl font-bold uppercase">Защитите сервер сегодня</h2>
              <p className="text-muted-foreground font-mono mt-2">Установка — 10 минут. Защита — сразу после запуска.</p>
            </div>
            <motion.a
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              href="https://t.me/trugarant1"
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 px-10 py-4 bg-primary text-primary-foreground font-mono font-bold uppercase tracking-wider flex items-center gap-2 text-base"
            >
              Написать в Telegram <ArrowRight className="w-5 h-5" />
            </motion.a>
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
}
