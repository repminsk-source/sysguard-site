import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal, Settings, ShieldCheck, Play, ArrowRight, Server, Cpu, Network } from "lucide-react";

const ATTACK_TYPES = ["SQLi", "XSS", "DDoS", "Brute Force", "LFI", "RCE", "Bot", "Flood", "SSRF", "Scraper", "XXE"];
const COUNTRIES = ["RU", "CN", "US", "DE", "BR", "KR", "IR", "NL", "UA", "VN"];
function randomIp() {
  return `${Math.floor(Math.random()*220)+1}.${Math.floor(Math.random()*255)}.${Math.floor(Math.random()*255)}.${Math.floor(Math.random()*254)+1}`;
}

function LiveLog() {
  const [lines, setLines] = useState<{ id: number; text: string; type: "block" | "info" | "warn" }[]>([]);
  const counter = useRef(0);

  useEffect(() => {
    const add = () => {
      const rand = Math.random();
      const now = new Date();
      const ts = `${String(now.getHours()).padStart(2,"0")}:${String(now.getMinutes()).padStart(2,"0")}:${String(now.getSeconds()).padStart(2,"0")}`;
      let text: string;
      let type: "block" | "info" | "warn";

      if (rand < 0.6) {
        const attack = ATTACK_TYPES[Math.floor(Math.random() * ATTACK_TYPES.length)];
        const cc = COUNTRIES[Math.floor(Math.random() * COUNTRIES.length)];
        text = `[${ts}] BLOCK  ${randomIp()} [${cc}] → ${attack}`;
        type = "block";
      } else if (rand < 0.8) {
        text = `[${ts}] INFO   Signature DB updated (+${Math.floor(Math.random()*12)+1} rules)`;
        type = "info";
      } else {
        text = `[${ts}] WARN   Rate limit triggered: /api/login from ${randomIp()}`;
        type = "warn";
      }

      setLines(prev => [{ id: counter.current++, text, type }, ...prev.slice(0, 14)]);
    };

    add();
    const interval = setInterval(add, 800);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="border border-border bg-black overflow-hidden font-mono text-xs">
      <div className="px-4 py-2 border-b border-border bg-card/50 flex items-center gap-2">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-500/60" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
          <div className="w-3 h-3 rounded-full bg-green-500/60" />
        </div>
        <span className="ml-2 text-muted-foreground">sys.guard — /var/log/sysguard.log</span>
        <span className="ml-auto flex items-center gap-1.5 text-primary">
          <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
          LIVE
        </span>
      </div>
      <div className="min-h-[300px] p-4 space-y-1">
        <AnimatePresence initial={false}>
          {lines.map((line) => (
            <motion.div
              key={line.id}
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className={
                line.type === "block" ? "text-red-400" :
                line.type === "warn" ? "text-yellow-400" :
                "text-primary/60"
              }
            >
              {line.text}
            </motion.div>
          ))}
        </AnimatePresence>
        <span className="text-primary animate-pulse">_</span>
      </div>
    </div>
  );
}

const steps = [
  {
    icon: Terminal,
    title: "1. Установка агента",
    desc: "Запуск единого bash-скрипта. Агент определяет окружение, скачивает нужный бинарник под вашу архитектуру и интегрируется в систему.",
    code: "curl -fsSL https://get.sysguard.sh | bash"
  },
  {
    icon: Settings,
    title: "2. Интеграция с веб-сервером",
    desc: "Настройка проксирования. Агент начинает инспектировать входящие запросы на уровне ОС — до Nginx/Apache.",
    code: "sysguard link --mode=proxy --upstream=nginx"
  },
  {
    icon: ShieldCheck,
    title: "3. Активация правил",
    desc: "Автоматическая конфигурация iptables/nftables. Вредоносные пакеты сбрасываются до того, как достигнут веб-сервера.",
    code: "sysguard rules --apply --profile=strict"
  },
  {
    icon: Play,
    title: "4. Мониторинг",
    desc: "Агент работает как systemd-демон. Пишет структурированные логи, автоматически обновляет базу сигнатур.",
    code: "systemctl status sysguard"
  },
];

export default function HowItWorks() {
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep(prev => (prev + 1) % steps.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pt-24 pb-20"
    >
      {/* Header */}
      <section className="px-6 py-16 md:py-24 border-b border-border">
        <div className="max-w-7xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="text-primary font-mono text-xs tracking-widest mb-4">// КАК ЭТО РАБОТАЕТ</div>
            <h1 className="text-4xl md:text-7xl font-bold uppercase mb-6 leading-tight">
              АРХИТЕКТУРА<br /><span className="text-primary">И УСТАНОВКА</span>
            </h1>
            <p className="text-lg text-muted-foreground font-mono max-w-2xl leading-relaxed">
              Развёртывание занимает 10 минут. Всё остальное агент делает сам.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Steps + Terminal */}
      <section className="px-6 py-20">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Steps */}
          <div className="space-y-4">
            {steps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                onClick={() => setActiveStep(i)}
                className={`p-6 border cursor-pointer transition-all ${activeStep === i ? "border-primary bg-primary/5" : "border-border hover:border-primary/40 hover:bg-card"}`}
              >
                <div className="flex gap-4 items-start">
                  <div className={`w-10 h-10 shrink-0 flex items-center justify-center border transition-colors ${activeStep === i ? "border-primary bg-primary text-primary-foreground" : "border-border text-muted-foreground"}`}>
                    <step.icon className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold uppercase mb-1">{step.title}</h3>
                    <p className="text-sm text-muted-foreground font-mono leading-relaxed">{step.desc}</p>
                    <AnimatePresence>
                      {activeStep === i && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="overflow-hidden"
                        >
                          <div className="mt-3 px-3 py-2 bg-black border border-border/50 font-mono text-xs text-primary/80">
                            <span className="text-primary/40">$ </span>{step.code}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Live Log */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <div className="font-mono text-xs text-muted-foreground mb-3">// ЖИВОЙ ЛОГ АГЕНТА (симуляция)</div>
            <LiveLog />
          </motion.div>
        </div>
      </section>

      {/* Data flow diagram */}
      <section className="px-6 py-24 bg-card border-y border-border">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <div className="text-primary font-mono text-xs tracking-widest mb-3">// ПОТОК ДАННЫХ</div>
            <h2 className="text-3xl md:text-5xl font-bold uppercase">СХЕМА ЗАЩИТЫ</h2>
          </motion.div>

          <div className="flex flex-col md:flex-row items-stretch justify-center gap-0">
            {[
              { label: "АТАКУЮЩИЙ", sub: "Internet / Botnet", color: "red", icon: Network, blocked: true },
              { label: "SYS.GUARD", sub: "OS Level / iptables", color: "primary", icon: ShieldCheck, blocked: false },
              { label: "NGINX", sub: "Web Server / TLS", color: "blue", icon: Server, blocked: false },
              { label: "BACKEND", sub: "App / Database", color: "foreground", icon: Cpu, blocked: false },
            ].map((node, i) => (
              <React.Fragment key={i}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className={`flex-1 p-6 border font-mono text-sm text-center relative ${
                    node.color === "primary" ? "border-primary bg-primary/10" :
                    node.color === "red" ? "border-red-500/40 bg-red-500/5" :
                    node.color === "blue" ? "border-blue-500/40 bg-blue-500/5" :
                    "border-border bg-background"
                  }`}
                >
                  <node.icon className={`w-6 h-6 mx-auto mb-3 ${
                    node.color === "primary" ? "text-primary" :
                    node.color === "red" ? "text-red-400" :
                    node.color === "blue" ? "text-blue-400" :
                    "text-muted-foreground"
                  }`} />
                  <div className={`font-bold mb-1 ${
                    node.color === "primary" ? "text-primary" :
                    node.color === "red" ? "text-red-400" :
                    node.color === "blue" ? "text-blue-400" :
                    "text-foreground"
                  }`}>{node.label}</div>
                  <div className="text-muted-foreground text-xs">{node.sub}</div>
                  {node.blocked && (
                    <motion.div
                      animate={{ opacity: [0.4, 1, 0.4] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-red-500 text-white text-[10px] px-2 py-0.5 font-bold tracking-widest z-10"
                    >
                      DROP
                    </motion.div>
                  )}
                </motion.div>
                {i < 3 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 + 0.2 }}
                    className={`hidden md:flex items-center px-2 ${i === 0 ? "text-red-400" : "text-primary/60"}`}
                  >
                    <ArrowRight className="w-5 h-5" />
                  </motion.div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </section>
    </motion.div>
  );
}
