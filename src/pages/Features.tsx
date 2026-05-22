import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Shield, FileCode2, Activity, Lock, Server, EyeOff, Cpu, Zap, ArrowRight } from "lucide-react";

const features = [
  {
    icon: Shield,
    title: "L7 DDoS Защита",
    tag: "NETWORK",
    desc: "Эвристический анализ трафика в реальном времени. Распознавание сложных HTTP флудов, медленных атак (Slowloris), аномальных паттернов. Мгновенная блокировка через nftables.",
    detail: "Алгоритм анализирует RPS, распределение User-Agent, интервалы запросов и TCP-паттерны. Автобан по репутации ASN."
  },
  {
    icon: FileCode2,
    title: "Zero-Day Инъекции",
    tag: "PAYLOAD",
    desc: "Глубокая инспекция payload (SQLi, XSS, RCE, LFI, RFI). Декодирование обфусцированных запросов до того, как они достигнут приложения.",
    detail: "Поддержка Base64, URL-encode, Unicode escape, HEX и смешанной обфускации. Более 14 000 сигнатур в базе."
  },
  {
    icon: Activity,
    title: "Anti-Bot & Scraping",
    tag: "BOT-NET",
    desc: "Продвинутый TLS и HTTP фингерпринтинг. Блокировка headless-браузеров, парсеров контента и спам-ботов без капч.",
    detail: "JA3/JA4 отпечатки TLS, анализ HTTP/2 потоков, поведенческое профилирование сессий."
  },
  {
    icon: Lock,
    title: "Brute Force Prevention",
    tag: "AUTH",
    desc: "Интеллектуальное ограничение попыток аутентификации. Отслеживание распределённых атак credential stuffing с разных IP.",
    detail: "Скользящее окно с адаптивными порогами. Автоматическая блокировка по суб-сети при обнаружении распределённого перебора."
  },
  {
    icon: Cpu,
    title: "Zero Overhead",
    tag: "PERF",
    desc: "Нативный C++ бинарник. Потребление памяти менее 50MB, CPU менее 1%. Работает незаметно для основной логики.",
    detail: "Lock-free очереди, SIMD-инструкции для сравнения сигнатур. Поддержка ядер до 128 потоков без деградации."
  },
  {
    icon: EyeOff,
    title: "Скрытие технологий",
    tag: "OPSEC",
    desc: "Автоматическое удаление Server-заголовков, X-Powered-By и отладочной информации, усложняющей разведку для атакующего.",
    detail: "Подмена Server: заголовка, удаление X-Runtime, X-Debug, трассировок стека из ответов. Активная дезинформация сканеров."
  },
];

export default function Features() {
  const [active, setActive] = useState<number | null>(null);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pt-24 pb-20"
    >
      {/* Header */}
      <section className="px-6 py-16 md:py-24 border-b border-border relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[linear-gradient(rgba(0,255,65,0.15)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,65,0.15)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="text-primary font-mono text-xs tracking-widest mb-4">// ВОЗМОЖНОСТИ АГЕНТА</div>
            <h1 className="text-4xl md:text-7xl font-bold uppercase mb-6 leading-tight">
              ЧТО УМЕЕТ<br /><span className="text-primary">SYS.GUARD</span>
            </h1>
            <p className="text-lg text-muted-foreground font-mono max-w-2xl leading-relaxed">
              Комплексный подход к безопасности. Агент перехватывает угрозы на уровне ОС — до Nginx, до вашего кода.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="px-6 py-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-border">
            {features.map((f, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
                onClick={() => setActive(active === i ? null : i)}
                className={`p-8 bg-background cursor-pointer group transition-colors relative ${active === i ? "border-l-2 border-primary" : "hover:bg-card"}`}
              >
                <div className="flex items-start justify-between mb-6">
                  <motion.div
                    animate={active === i ? { rotate: 0, scale: 1.1 } : { rotate: 0, scale: 1 }}
                    className={`w-12 h-12 flex items-center justify-center border transition-colors ${active === i ? "border-primary bg-primary/10" : "border-border group-hover:border-primary/40"}`}
                  >
                    <f.icon className={`w-5 h-5 transition-colors ${active === i ? "text-primary" : "text-muted-foreground group-hover:text-primary"}`} />
                  </motion.div>
                  <span className="font-mono text-xs text-muted-foreground border border-border/50 px-2 py-1">{f.tag}</span>
                </div>
                <h3 className="text-xl font-bold uppercase mb-3">{f.title}</h3>
                <p className="text-sm text-muted-foreground font-mono leading-relaxed">{f.desc}</p>

                <AnimatePresence>
                  {active === i && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="mt-4 pt-4 border-t border-primary/20 text-xs font-mono text-primary/70 leading-relaxed">
                        <span className="text-primary/40 mr-1">$</span> {f.detail}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="mt-4 text-xs font-mono text-primary/50 group-hover:text-primary/80 transition-colors">
                  {active === i ? "— свернуть" : "+ подробнее"}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="px-6 py-24 bg-card border-y border-border">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <div className="text-primary font-mono text-xs tracking-widest mb-3">// СРАВНЕНИЕ РЕШЕНИЙ</div>
            <h2 className="text-3xl md:text-5xl font-bold uppercase">SYS.GUARD VS. КОНКУРЕНТЫ</h2>
          </motion.div>

          <div className="overflow-x-auto">
            <table className="w-full text-left font-mono text-sm min-w-[600px]">
              <thead>
                <tr className="border-b-2 border-primary/30">
                  <th className="py-4 px-6 text-muted-foreground font-normal">Характеристика</th>
                  <th className="py-4 px-6 text-primary border-x border-primary/20 bg-primary/5 font-bold">sys.guard</th>
                  <th className="py-4 px-6 text-muted-foreground font-normal">Cloudflare WAF</th>
                  <th className="py-4 px-6 text-muted-foreground font-normal">ModSecurity</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { name: "Задержка", sg: "< 1ms", cf: "10–100ms", mod: "10–50ms", good: true },
                  { name: "Уровень блокировки", sg: "ОС (iptables)", cf: "DNS-прокси", mod: "Веб-сервер", good: true },
                  { name: "Блокировка на уровне ОС", sg: "Да", cf: "Нет", mod: "Сложно", good: true },
                  { name: "Утечка реального IP", sg: "Невозможна", cf: "Возможна (Bypass)", mod: "Зависит от конфига", good: true },
                  { name: "TLS Инспекция", sg: "Да", cf: "Да", mod: "Да", good: false },
                  { name: "Цена", sg: "от $79/мес", cf: "$200+/мес", mod: "Бесплатно (нет поддержки)", good: false },
                ].map((row, i) => (
                  <motion.tr
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.06 }}
                    className="border-b border-border/40 hover:bg-background/50 transition-colors"
                  >
                    <td className="py-4 px-6 text-muted-foreground">{row.name}</td>
                    <td className="py-4 px-6 text-primary font-bold border-x border-primary/20 bg-primary/5">{row.sg}</td>
                    <td className="py-4 px-6 text-muted-foreground/60">{row.cf}</td>
                    <td className="py-4 px-6 text-muted-foreground/60">{row.mod}</td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 py-20 text-center">
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
          <h2 className="text-3xl md:text-4xl font-bold uppercase mb-4">Готов к интеграции</h2>
          <p className="text-muted-foreground font-mono mb-8">Напишите нам — обсудим конфигурацию под ваш стек.</p>
          <motion.a
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            href="https://t.me/trugarant1"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-10 py-4 bg-primary text-primary-foreground font-mono font-bold uppercase tracking-wider"
          >
            Обсудить в Telegram <ArrowRight className="w-5 h-5" />
          </motion.a>
        </motion.div>
      </section>
    </motion.div>
  );
}
