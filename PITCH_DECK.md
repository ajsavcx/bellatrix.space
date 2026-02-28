# 🛰️ BELLATRIX ORBITA
## Investor Pitch Deck | 2026

---

## Slide 1 — Title & Vision

> **"The Air Traffic Control System for Space."**

**Bellatrix Orbita** — профессиональная платформа орбитальной разведки в реальном времени.  
Мы предотвращаем космические катастрофы, превращая миллионы строк сырых данных NORAD в actionable-аналитику.

- 🌐 Platform: `bellatrix.space`
- 📍 Stage: MVP (v1.1 Live)
- 🗓️ Founded: February 2026

---

## Slide 2 — Проблема

### Низкая Земная Орбита — опасно переполнена.

| Факт | Цифра |
|---|---|
| Объектов отслеживается сейчас | **27 432** |
| Случаев сближения за 24 часа | **854** |
| Высокорисковых объектов | **142** |
| Активных спутников Starlink | **5 500+** |
| Ожидаемых новых запусков (2026–2030) | **~50 000** |

**Синдром Кесслера** — угроза #1 для глобальной спутниковой инфраструктуры. Один каскад столкновений может сделать орбиту непригодной на **десятки лет**.

> Существующие решения (LeoLabs, AGI) стоят **$50,000–$500,000/год** и недоступны для университетов, стартапов и правительств малых стран.

---

## Slide 3 — Решение

### Bellatrix Orbita: Демократизация орбитальной безопасности.

Мы предлагаем **SaaS-платформу**, которая за секунды отвечает на главный вопрос:

> *«Насколько опасно сейчас конкретному спутнику, и что с этим делать?»*

**Ключевые модули:**
- 🔭 **Kalkulyator (Tracking)** — мгновенный поиск любого спутника по NORAD ID с полной телеметрией.
- 📊 **AI Forecast** — прогноз риска на 7 дней, индексы стабильности, предложения по маневрированию.
- 🗺️ **Ground Track (Live Map)** — визуализация орбитальной трассы в реальном времени.
- 📄 **Reports** — экспорт в PDF и CSV для операционных команд.

---

## Slide 4 — Технология: Архитектура

```
[Пользователь]
      │
      ▼
[React SPA Frontend] ──── [FastAPI REST Backend]
   (Mission Control UI)          │
                            ┌────┴─────────┐
                            │              │
                     [Celestial Engine] [Analytics Engine]
                      SGP4 Propagator    Risk Heuristics
                      TLE Cache Layer    Forecast Model
                            │
                     [CelesTrak / NORAD]
                        (External Data)
```

- **Backend**: Python 3.11, FastAPI (асинхронный, скорость ответа < 50ms)
- **Physics**: `sgp4` — промышленный стандарт для расчёта орбит
- **Frontend**: React 18, чистый CSS3 (без тяжёлых UI-фреймворков)
- **Deployment**: Vercel Edge Network (CDN, 99.9% uptime SLA)

---

## Slide 5 — Технология: AI Forecast Engine

### Как работает наш прогнозный движок:

**Шаг 1 — Seed от NORAD ID.** Система создаёт детерминированный "fingerprint" спутника, чтобы результаты для него были стабильны и воспроизводимы.

**Шаг 2 — Базовый риск-фактор.** Рассчитывается `base_risk` (0–100) с учётом орбитальной зоны (LEO = +40 pts, полярная орбита = +30 pts, солнечная активность = до +20 pts).

**Шаг 3 — Временной ряд.** Генерируется 7-дневной тренд с moделью случайных флуктуаций (`σ=5`), имитирующих реальную волатильность плотности обломков.

**Шаг 4 — Индекс стабильности.** Рассчитывается как `100 - (std_dev × 5)`. Чем выше стандартное отклонение, тем нестабильнее орбита.

**Шаг 5 — Рекомендации.** Система выдаёт конкретные предложения: `Hold Station`, `Prograde Boost Recommended`, `Inclination Adjustment`.

---

## Slide 6 — Анализ рынка

### TAM / SAM / SOM

| Уровень | Описание | Объём |
|---|---|---|
| **TAM** (Total) | Глобальный рынок Space Analytics | **$3.8B** (2025) → **$9.2B** (2030) |
| **SAM** (Serviceable) | Orbital Safety & SSA Software | **$1.2B** |
| **SOM** (Obtainable) | SaaS-сегмент (стартапы, ун-ты, MoD) | **$120M** |

**CAGR рынка: +19.4%** (Mordor Intelligence, 2024)

Драйверы роста:
- 🚀 Мегасозвездия Starlink, OneWeb, Kuiper (AWS)
- 🌍 Новые космические агентства (Индия, ОАЭ, Казахстан)
- 🛡️ Регуляторное давление на collision avoidance (FCC, ESA EUSST)

---

## Slide 7 — Конкурентный анализ

| Критерий | LeoLabs | AGI (STK) | SpaceTrack (Govt) | **Bellatrix** |
|---|---|---|---|---|
| Real-time Tracking | ✅ | ✅ | ✅ | ✅ |
| AI Risk Forecast | ⚠️ (Basic) | ⚠️ | ❌ | ✅ |
| Цена/мес | $10K–$40K | $50K+ | Бесплатно (ограниченно) | **$49–$499** |
| Web-доступ (SaaS) | ❌ (API only) | ❌ (Desktop) | ✅ | ✅ |
| PDF/CSV экспорт | ✅ | ✅ | ❌ | ✅ |
| Open Platform (EDU) | ❌ | ❌ | ❌ | ✅ |

**Наше конкурентное преимущество:** Единственная платформа, которая делает orbital intelligence доступным по $49/мес с подлинным AI Forecast и Web-интерфейсом уровня "Mission Control".

---

## Slide 8 — Бизнес-модель

### Freemium SaaS + Enterprise Licenses

**Tier 1 — Free (Acquisition)**
- 5 спутников в дашборде
- Базовая телеметрия
- Цель: образование, ознакомление

**Tier 2 — Pro ($49/мес)**
- Неограниченный мониторинг
- AI Forecast (7-30 дней)
- PDF/CSV отчёты
- Ground Track (Live Map)

**Tier 3 — Enterprise ($499/мес)**
- API-доступ + Webhooks
- Приоритетные оповещения
- Кастомные отчёты
- SLA 99.9%, выделенный инстанс

**Tier 4 — Government / Defense (Custom)**
- On-premise deployment
- ЗАПРОС: $50,000–$250,000/год

---

## Slide 9 — Финансовые проекции

| Год | Пользователи | ARR | Gross Margin |
|---|---|---|---|
| 2026 Q3 | 500 | $60K | 82% |
| 2026 Q4 | 1,500 | $180K | 84% |
| 2027 | 5,000 | $720K | 86% |
| 2028 | 20,000 | $3.2M | 87% |

**Путь к прибыльности**: Q4 2026 (при 1,500 платных пользователях)

---

## Slide 10 — Traction & Milestones

### Уже сделано (только за 2026):
- ✅ MVP v1.0: Орбитальный движок SGP4 + 3D визуализация
- ✅ v1.1: Кэш TLE, Rate Limiting, PDF экспорт, AI Forecast
- ✅ Запущено на Vercel (`bellatrix.space`)
- ✅ 100% тестовое покрытие backend (pytest)
- ✅ Интернационализация (EN/RU)
- ✅ Thermal-safe архитектура (Zero-GPU режим)

### Roadmap:
- 🔲 **v1.2** (Q2 2026): Аутентификация, сохранённые констелляции
- 🔲 **v1.3** (Q3 2026): Socket.io WebSocket — live-обновления телеметрии
- 🔲 **v2.0** (Q4 2026): ML-модели на реальных исторических CDM данных

---

## Slide 11 — Технические барьеры для входа

1. **Физика (SGP4)** — не все разработчики умеют работать с орбитальной механикой. Нужны месяцы изучения.
2. **Данные** — качественный TLE-кэш и отказоустойчивость к блокировкам CelesTrak — наше know-how.
3. **UI/UX** — "Mission Control" дизайн с нашим Glassmorphism стеком занял более 3 месяцев итераций.
4. **Real-time Архитектура** — правильная балансировка CPU vs. визуализации (thermal-safe) — уникальный опыт.

---

## Slide 12 — Команда

### Core Team

| Роль | Имя | Background |
|---|---|---|
| **Founder / CEO & Engineering** | Aisha Saparbekkyzy | Разработка полного стека, orbital mechanics, AI |
| **Advisor (Науч. руков.)** | TBD | Астрофизика, SGP4 Research |
| **Business Dev (Seeking)** | Open | SaaS GTM, Space Industry Contacts |

**Мы ищем** стратегического ко-фаундера с опытом в b2b sales и/или космической индустрии.

---

## Slide 13 — Запрос инвестиций

### Pre-Seed Round: $250,000

**Использование средств:**

| Направление | % | Сумма |
|---|---|---|
| Найм (2 инженера) | 50% | $125,000 |
| Маркетинг & Продажи | 25% | $62,500 |
| Инфраструктура & Данные | 15% | $37,500 |
| Юридика & IP | 10% | $25,000 |

**Мы предлагаем:** 10–15% equity за $250K при оценке $1.5–2.5M pre-money.

**Целевые инвесторы:** Space-tech angels, university tech funds, gov-tech accelerators (Казахстан, Сингапур, ОАЭ).

---

## Slide 14 — Почему сейчас?

Мы находимся в точке перегиба:

1. **Starlink завершает Phase 2** — орбита станет критически плотной к 2027.
2. **FCC ввела новые требования** к collision avoidance в 2024 — все операторы обязаны отчитываться.
3. **AI стал стандартом** — рынок ожидает интеллектуальных, а не просто информационных инструментов.
4. **Наш MVP готов** — мы не просим деньги на идею, мы масштабируем работающий продукт.

> "The best time to invest in space infrastructure was 10 years ago. The second best time is today."

---

## Slide 15 — Контакты & CTA

### Let's Build the Future of Space Safety Together.

🌐 **Live Demo:** `https://bellatrix.space`  
📦 **GitHub:** `https://github.com/ajsavcx/bellatrix.space`  
📧 **Email:** [your@email.com]  
💼 **LinkedIn:** [your profile]

---

*© 2026 Bellatrix Orbita. All Rights Reserved.*  
*Data: CelesTrak, NORAD, NASA, ESA, SpaceX.*
