import React, { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, MessageCircle, HelpCircle } from "lucide-react";

export default function Contact() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const faqs = [
    {
      q: "Как происходит установка?",
      a: "Мы предоставляем bash-скрипт и бинарник под вашу архитектуру. При необходимости наши специалисты помогают с интеграцией через Telegram (бесплатно)."
    },
    {
      q: "Работает ли sys.guard с Cloudflare?",
      a: "Да. Вы можете использовать Cloudflare для кэширования, а sys.guard для глубокого анализа инъекций и блокировки продвинутых ботов на самом сервере."
    },
    {
      q: "Какие гарантии отсутствия бэкдоров?",
      a: "По запросу для Enterprise клиентов мы готовы предоставить хеши бинарников или провести аудит с независимыми исследователями безопасности."
    },
    {
      q: "Как происходит оплата?",
      a: "Оплата производится исключительно в криптовалюте (USDT TRC20/ERC20, BTC, ETH) для сохранения конфиденциальности обеих сторон."
    }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pt-24 pb-20"
    >
      <section className="px-6 py-12 md:py-24 border-b border-border">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold uppercase mb-6">ЗАКАЗ И ЦЕНЫ</h1>
          <p className="text-xl text-muted-foreground font-mono">
            Приватное распространение. Прямая поддержка от разработчиков.
          </p>
        </div>
      </section>

      {/* Pricing */}
      <section className="px-6 py-20 bg-card">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              name: "БАЗОВЫЙ",
              desc: "Для небольших проектов и блогов",
              price: "$150 / мес",
              features: ["Базовая защита от DDoS", "Фильтрация ботов", "Поддержка 1 домена", "Базовые логи"]
            },
            {
              name: "ПРОФЕССИОНАЛЬНЫЙ",
              desc: "Для e-commerce и высоконагруженных API",
              price: "$400 / мес",
              features: ["Продвинутая эвристика", "Защита от Zero-day", "До 5 доменов", "Приоритетная поддержка 24/7", "Кастомные правила (YARA)"]
            },
            {
              name: "ЭНТЕРПРАЙЗ",
              desc: "Корпоративная интеграция",
              price: "По запросу",
              features: ["Безлимитные домены", "Помощь в развертывании", "Интеграция с SIEM", "SLA гарантии"]
            }
          ].map((tier, i) => (
            <div key={i} className={`p-8 border bg-background flex flex-col ${i === 1 ? 'border-primary relative' : 'border-border'}`}>
              {i === 1 && <div className="absolute top-0 left-0 right-0 bg-primary text-primary-foreground text-center text-xs font-bold py-1 uppercase tracking-widest font-mono">Рекомендуемый</div>}
              <h3 className="text-2xl font-bold mb-2 uppercase mt-4">{tier.name}</h3>
              <p className="text-muted-foreground text-sm font-mono mb-6 min-h-[40px]">{tier.desc}</p>
              <div className="text-3xl font-bold text-primary font-mono mb-8">{tier.price}</div>
              
              <ul className="space-y-4 mb-10 flex-1 font-mono text-sm">
                {tier.features.map((f, j) => (
                  <li key={j} className="flex gap-2 items-start">
                    <span className="text-primary mt-1">{`>`}</span>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>

              <a 
                href="https://t.me/trugarant1" 
                target="_blank" 
                rel="noopener noreferrer"
                className={`w-full py-4 font-mono font-bold uppercase text-center flex items-center justify-center gap-2 transition-all ${
                  i === 1 ? 'bg-primary text-primary-foreground hover:bg-primary/90' : 'border border-border hover:border-primary hover:text-primary'
                }`}
              >
                Обсудить в Telegram
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* Direct Contact */}
      <section className="px-6 py-24 text-center">
        <div className="max-w-3xl mx-auto border border-primary/20 bg-primary/5 p-12 relative overflow-hidden">
          <MessageCircle className="w-12 h-12 text-primary mx-auto mb-6" />
          <h2 className="text-3xl md:text-4xl font-bold mb-6 uppercase">Связь напрямую</h2>
          <p className="text-muted-foreground font-mono mb-8">
            Все технические вопросы, запросы на триал и заказы решаются исключительно через Telegram.
            Остерегайтесь фейков. Наш единственный контакт: <strong className="text-foreground">@trugarant1</strong>
          </p>
          <a 
            href="https://t.me/trugarant1" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground font-mono font-bold text-lg hover:scale-105 transition-transform uppercase"
          >
            НАПИСАТЬ СОЗДАТЕЛЮ <ArrowRight className="w-5 h-5" />
          </a>
        </div>
      </section>

      {/* FAQ */}
      <section className="px-6 py-20 bg-card border-t border-border">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold uppercase mb-12 flex items-center justify-center gap-3">
            <HelpCircle className="w-8 h-8 text-primary" />
            Частые вопросы
          </h2>
          
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div key={i} className="border border-border bg-background overflow-hidden">
                <button 
                  className="w-full text-left p-6 font-bold uppercase flex justify-between items-center hover:text-primary transition-colors"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                >
                  {faq.q}
                  <span className="text-primary font-mono text-xl">{openFaq === i ? '-' : '+'}</span>
                </button>
                <motion.div 
                  initial={false}
                  animate={{ height: openFaq === i ? "auto" : 0, opacity: openFaq === i ? 1 : 0 }}
                  className="overflow-hidden"
                >
                  <p className="p-6 pt-0 text-muted-foreground font-mono text-sm leading-relaxed border-t border-border/50">
                    {faq.a}
                  </p>
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </motion.div>
  );
}
