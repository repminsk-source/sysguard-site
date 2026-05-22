import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, MessageCircle, HelpCircle, Check, Zap } from "lucide-react";

const tiers = [
  {
    name: "БАЗОВЫЙ",
    desc: "Для небольших проектов и блогов",
    price: "$79",
    period: "/ мес",
    features: [
      "Базовая DDoS-защита",
      "Фильтрация ботов",
      "1 домен",
      "Базовые логи",
      "Поддержка в Telegram",
    ],
    highlight: false,
    cta: "Начать"
  },
  {
    name: "ПРОФЕССИОНАЛЬНЫЙ",
    desc: "Для e-commerce и высоконагруженных API",
    price: "$199",
    period: "/ мес",
    features: [
      "Продвинутая эвристика",
      "Защита от Zero-day",
      "До 5 доменов",
      "Приоритетная поддержка 24/7",
      "Кастомные правила (YARA)",
      "Интеграция с Nginx/Apache",
    ],
    highlight: true,
    cta: "Выбрать"
  },
  {
    name: "ЭНТЕРПРАЙЗ",
    desc: "Корпоративная интеграция и SLA",
    price: "Запрос",
    period: "",
    features: [
      "Безлимитные домены",
      "Помощь в развертывании",
      "Интеграция с SIEM",
      "SLA гарантии",
      "Аудит безопасности",
      "Выделенная поддержка",
    ],
    highlight: false,
    cta: "Обсудить"
  },
];

const faqs = [
  {
    q: "Как происходит установка?",
    a: "Мы предоставляем bash-скрипт и бинарник под вашу архитектуру. При необходимости наши специалисты помогают с интеграцией через Telegram — бесплатно."
  },
  {
    q: "Работает ли sys.guard с Cloudflare?",
    a: "Да. Cloudflare — для кэширования, sys.guard — для глубокого анализа инъекций и блокировки продвинутых ботов прямо на сервере."
  },
  {
    q: "Какие гарантии отсутствия бэкдоров?",
    a: "По запросу для Enterprise-клиентов предоставляем хеши бинарников или проводим аудит с независимыми исследователями безопасности."
  },
  {
    q: "Как происходит оплата?",
    a: "Исключительно в криптовалюте (USDT TRC20/ERC20, BTC, ETH) для сохранения конфиденциальности обеих сторон."
  },
  {
    q: "Есть ли пробный период?",
    a: "Да, на запрос доступен 48-часовой триал на вашем сервере. Обсудите условия в Telegram."
  }
];

export default function Contact() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [hoveredTier, setHoveredTier] = useState<number | null>(null);

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
        <div className="max-w-4xl mx-auto relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="text-primary font-mono text-xs tracking-widest mb-4">// ЗАКАЗ И ЦЕНЫ</div>
            <h1 className="text-4xl md:text-7xl font-bold uppercase mb-6 leading-tight">
              ТАРИФЫ<br /><span className="text-primary">И УСЛОВИЯ</span>
            </h1>
            <p className="text-lg text-muted-foreground font-mono">
              Прямая поддержка от разработчиков. Без посредников.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Pricing */}
      <section className="px-6 py-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-border">
            {tiers.map((tier, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                onMouseEnter={() => setHoveredTier(i)}
                onMouseLeave={() => setHoveredTier(null)}
                className={`p-8 flex flex-col relative transition-all ${
                  tier.highlight
                    ? "bg-primary/5 border-t-2 border-t-primary"
                    : "bg-background hover:bg-card"
                }`}
              >
                {tier.highlight && (
                  <div className="absolute top-0 left-0 right-0 bg-primary text-primary-foreground text-center text-[10px] font-bold py-1 uppercase tracking-widest font-mono -mt-px">
                    Рекомендуемый
                  </div>
                )}

                <div className={tier.highlight ? "mt-4" : ""}>
                  <h3 className="text-xl font-bold uppercase mb-1 font-mono">{tier.name}</h3>
                  <p className="text-muted-foreground text-sm font-mono mb-6 min-h-[40px]">{tier.desc}</p>

                  <div className="flex items-end gap-1 mb-8">
                    <motion.span
                      animate={hoveredTier === i ? { scale: 1.05 } : { scale: 1 }}
                      className={`text-4xl font-bold font-mono ${tier.highlight ? "text-primary" : "text-foreground"}`}
                    >
                      {tier.price}
                    </motion.span>
                    {tier.period && <span className="text-muted-foreground font-mono mb-1">{tier.period}</span>}
                  </div>

                  <ul className="space-y-3 mb-8 flex-1">
                    {tier.features.map((f, j) => (
                      <motion.li
                        key={j}
                        initial={{ opacity: 0, x: -8 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1 + j * 0.05 }}
                        className="flex gap-2 items-center font-mono text-sm"
                      >
                        <Check className={`w-4 h-4 shrink-0 ${tier.highlight ? "text-primary" : "text-muted-foreground"}`} />
                        <span>{f}</span>
                      </motion.li>
                    ))}
                  </ul>

                  <motion.a
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                    href="https://t.me/trugarant1"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-full py-3 font-mono font-bold uppercase text-center flex items-center justify-center gap-2 transition-all ${
                      tier.highlight
                        ? "bg-primary text-primary-foreground hover:bg-primary/90"
                        : "border border-border hover:border-primary hover:text-primary"
                    }`}
                  >
                    {tier.cta} в Telegram <ArrowRight className="w-4 h-4" />
                  </motion.a>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-6 text-center font-mono text-xs text-muted-foreground"
          >
            Все тарифы включают первичную настройку. Оплата — USDT / BTC / ETH.
          </motion.div>
        </div>
      </section>

      {/* Direct contact */}
      <section className="px-6 py-16">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="border border-primary/30 bg-primary/5 p-10 md:p-16 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8"
          >
            <motion.div
              className="absolute inset-0 pointer-events-none opacity-30"
              animate={{ backgroundPosition: ["0% 0%", "100% 100%"] }}
              transition={{ duration: 15, repeat: Infinity, repeatType: "mirror" }}
              style={{ background: "radial-gradient(ellipse at 20% 50%, rgba(0,255,65,0.1) 0%, transparent 70%)" }}
            />
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-3">
                <MessageCircle className="w-5 h-5 text-primary" />
                <span className="font-mono text-xs text-primary/60 tracking-widest">ЕДИНСТВЕННЫЙ КОНТАКТ</span>
              </div>
              <h2 className="text-2xl md:text-4xl font-bold mb-3 uppercase">@trugarant1</h2>
              <p className="text-muted-foreground font-mono text-sm max-w-md">
                Все вопросы, триалы и заказы — только через Telegram. Остерегайтесь фейков.
              </p>
            </div>
            <motion.a
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              href="https://t.me/trugarant1"
              target="_blank"
              rel="noopener noreferrer"
              className="relative z-10 shrink-0 px-10 py-4 bg-primary text-primary-foreground font-mono font-bold text-base uppercase tracking-wider flex items-center gap-2"
            >
              Написать сейчас <ArrowRight className="w-5 h-5" />
            </motion.a>
          </motion.div>
        </div>
      </section>

      {/* FAQ */}
      <section className="px-6 py-20 bg-card border-t border-border">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <div className="text-primary font-mono text-xs tracking-widest mb-3">// FAQ</div>
            <h2 className="text-3xl md:text-4xl font-bold uppercase">Частые вопросы</h2>
          </motion.div>

          <div className="space-y-px">
            {faqs.map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
                className="border border-border bg-background overflow-hidden"
              >
                <button
                  className="w-full text-left p-6 font-bold flex justify-between items-center hover:text-primary transition-colors group"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                >
                  <span className="pr-4">{faq.q}</span>
                  <motion.span
                    animate={{ rotate: openFaq === i ? 45 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="text-primary font-mono text-xl shrink-0"
                  >
                    +
                  </motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {openFaq === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden"
                    >
                      <p className="px-6 pb-6 text-muted-foreground font-mono text-sm leading-relaxed border-t border-border/50 pt-4">
                        {faq.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </motion.div>
  );
}
