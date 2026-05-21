import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Terminal, Settings, ShieldCheck, Play } from "lucide-react";

export default function HowItWorks() {
  const [logText, setLogText] = useState("");
  const fullLog = `[root@server ~]# ./sysguard-install.sh
> Checking OS compatibility... OK (Linux 5.15+)
> Fetching agent binary... OK
> Configuring nftables ruleset... OK
> Hooking into Nginx... OK
> Starting sys.guard daemon... OK
> System secured. Active monitoring on port 80/443.`;

  useEffect(() => {
    let current = 0;
    const interval = setInterval(() => {
      if (current <= fullLog.length) {
        setLogText(fullLog.slice(0, current));
        current++;
      } else {
        clearInterval(interval);
      }
    }, 30);
    return () => clearInterval(interval);
  }, []);

  const steps = [
    {
      icon: Terminal,
      title: "1. Установка агента",
      desc: "Запуск единого bash-скрипта. Агент автоматически определяет окружение, скачивает нужные бинарники и интегрируется в систему."
    },
    {
      icon: Settings,
      title: "2. Интеграция с веб-сервером",
      desc: "Настройка проксирования или прямое подключение к Nginx/Apache. Агент начинает инспектировать входящие запросы."
    },
    {
      icon: ShieldCheck,
      title: "3. Активация правил ОС",
      desc: "Автоматическая настройка правил iptables/nftables для мгновенного сброса вредоносных пакетов на уровне ядра."
    },
    {
      icon: Play,
      title: "4. Мониторинг",
      desc: "Агент работает как фоновый демон (systemd), пишет логи и автоматически обновляет базы сигнатур."
    }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pt-24 pb-20"
    >
      <section className="px-6 py-12 md:py-24 border-b border-border text-center">
        <h1 className="text-4xl md:text-6xl font-bold uppercase mb-6">АРХИТЕКТУРА И УСТАНОВКА</h1>
        <p className="text-xl text-muted-foreground font-mono max-w-3xl mx-auto">
          Простота развертывания в сочетании с мощной серверной архитектурой.
        </p>
      </section>

      <section className="px-6 py-20">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-12 relative">
              <div className="absolute left-6 top-6 bottom-6 w-0.5 bg-border hidden md:block" />
              
              {steps.map((step, i) => (
                <div key={i} className="relative flex gap-6 z-10">
                  <div className="w-12 h-12 shrink-0 rounded-full bg-background border border-primary flex items-center justify-center text-primary">
                    <step.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold uppercase mb-2">{step.title}</h3>
                    <p className="text-muted-foreground font-mono text-sm">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="border border-border bg-black rounded-sm overflow-hidden">
              <div className="px-4 py-2 border-b border-border bg-card flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/50" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                <div className="w-3 h-3 rounded-full bg-green-500/50" />
              </div>
              <div className="p-6 font-mono text-sm text-primary whitespace-pre-wrap min-h-[250px]">
                {logText}
                <span className="animate-pulse">_</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 py-24 bg-card border-y border-border">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold uppercase mb-16 text-center">СХЕМА ПОТОКА ДАННЫХ</h2>
          
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 font-mono text-sm text-center">
            <div className="p-6 border border-red-500/50 bg-red-500/5 w-full md:w-48">
              <span className="text-red-500 font-bold block mb-2">АТАКУЮЩИЙ</span>
              Internet
            </div>
            
            <div className="text-muted-foreground hidden md:block">{"==>"}</div>
            <div className="text-muted-foreground md:hidden my-2">||</div>
            
            <div className="p-6 border border-primary bg-primary/10 w-full md:w-64 relative group">
              <span className="text-primary font-bold block mb-2">SYS.GUARD</span>
              OS Level / iptables
              <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 text-red-500 text-xs w-full opacity-0 group-hover:opacity-100 transition-opacity">
                DROP (DDoS, Scrapers)
              </div>
            </div>

            <div className="text-primary hidden md:block">{"==>"}</div>
            <div className="text-primary md:hidden my-2">||</div>

            <div className="p-6 border border-blue-500/50 bg-blue-500/5 w-full md:w-48">
              <span className="text-blue-500 font-bold block mb-2">NGINX</span>
              Web Server
            </div>

            <div className="text-blue-500 hidden md:block">{"==>"}</div>
            <div className="text-blue-500 md:hidden my-2">||</div>

            <div className="p-6 border border-border bg-background w-full md:w-48">
              <span className="text-foreground font-bold block mb-2">APP</span>
              Backend / DB
            </div>
          </div>
        </div>
      </section>
    </motion.div>
  );
}
