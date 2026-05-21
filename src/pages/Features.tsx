import React from "react";
import { motion } from "framer-motion";
import { Shield, FileCode2, Activity, Lock, Server, Cpu, Database, EyeOff } from "lucide-react";

export default function Features() {
  const features = [
    {
      icon: Shield,
      title: "L7 DDoS Защита",
      desc: "Эвристический анализ трафика в реальном времени. Распознавание сложных HTTP флудов, медленных атак (Slowloris), аномальных паттернов запросов. Мгновенная блокировка на уровне ядра через nftables/iptables."
    },
    {
      icon: FileCode2,
      title: "Zero-Day Инъекции",
      desc: "Глубокая инспекция payload (SQLi, XSS, RCE, LFI, RFI). Декодирование сложных обфусцированных запросов до того, как они достигнут приложения."
    },
    {
      icon: Activity,
      title: "Anti-Bot & Scraping",
      desc: "Продвинутое фингерпринтинг TLS и HTTP параметров. Блокировка автоматизированных headless браузеров, парсеров контента и спам-ботов без раздражающих капч."
    },
    {
      icon: Lock,
      title: "Brute Force Prevention",
      desc: "Интеллектуальное ограничение попыток аутентификации. Отслеживание распределенных атак перебора паролей (credential stuffing) с разных IP адресов."
    },
    {
      icon: Server,
      title: "Zero Overhead",
      desc: "Нативный бинарный код. Потребление памяти менее 50MB, процессорное время менее 1%. Работает незаметно для основной бизнес-логики."
    },
    {
      icon: EyeOff,
      title: "Скрытие технологий",
      desc: "Автоматическое удаление Server заголовков, X-Powered-By и другой отладочной информации, усложняющее разведку для атакующего."
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pt-24 pb-20"
    >
      <section className="px-6 py-12 md:py-24 border-b border-border">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold uppercase mb-6">ВОЗМОЖНОСТИ</h1>
          <p className="text-xl text-muted-foreground font-mono max-w-3xl">
            Комплексный подход к безопасности веб-приложений. Мы не просто фильтруем трафик, 
            мы активно блокируем злоумышленников на сетевом уровне.
          </p>
        </div>
      </section>

      <section className="px-6 py-20 bg-card">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {features.map((f, i) => (
              <motion.div 
                key={i}
                variants={itemVariants}
                className="p-8 border border-border bg-background hover:border-primary/50 transition-all hover:-translate-y-1"
              >
                <f.icon className="w-10 h-10 text-primary mb-6" />
                <h3 className="text-xl font-bold uppercase mb-4">{f.title}</h3>
                <p className="text-muted-foreground font-mono text-sm leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="px-6 py-24">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-bold uppercase mb-12 text-center">СРАВНЕНИЕ</h2>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left font-mono text-sm min-w-[600px]">
              <thead>
                <tr className="border-b border-border">
                  <th className="py-4 px-6 text-muted-foreground">Характеристика</th>
                  <th className="py-4 px-6 text-primary border-x border-border/50 bg-primary/5">sys.guard</th>
                  <th className="py-4 px-6 text-muted-foreground">Облачные WAF (Cloudflare)</th>
                  <th className="py-4 px-6 text-muted-foreground">ПО WAF (ModSecurity)</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { name: "Оверхед (Задержка)", sg: "< 1ms", cf: "10-100ms", mod: "10-50ms" },
                  { name: "Контроль трафика", sg: "Полный (Серверный)", cf: "DNS-уровень", mod: "Уровень веб-сервера" },
                  { name: "Блокировка на уровне ОС", sg: "Да (iptables)", cf: "Нет", mod: "Сложно/Скрипты" },
                  { name: "Утечка IP источника", sg: "Невозможно", cf: "Возможно (Bypass)", mod: "Зависит от настроек" },
                  { name: "Анализ зашифрованного (TLS) трафика", sg: "Да", cf: "Да", mod: "Да" }
                ].map((row, i) => (
                  <tr key={i} className="border-b border-border/50 hover:bg-card transition-colors">
                    <td className="py-4 px-6">{row.name}</td>
                    <td className="py-4 px-6 text-primary font-bold border-x border-border/50 bg-primary/5">{row.sg}</td>
                    <td className="py-4 px-6 text-muted-foreground">{row.cf}</td>
                    <td className="py-4 px-6 text-muted-foreground">{row.mod}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </motion.div>
  );
}
