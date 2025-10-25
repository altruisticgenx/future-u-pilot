import React, { useEffect, useRef, useState } from "react";

export default function AltruisticXAIHome() {
  return (
    <main className="min-h-screen bg-[#0b1220] text-white selection:bg-teal-300/40 selection:text-white">
      <SiteChrome />
      <Hero />
      <TrustedBy />
      <ProblemSolution />
      <ServicesGrid />
      <LiveDemo />
      <Outcomes />
      <EthicsGovernance />
      <CTA />
      <Footer />
    </main>
  );
}

function SiteChrome() {
  return (
    <header className="sticky top-0 z-50 backdrop-blur bg-[#0b1220]/60 border-b border-white/10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-xl bg-gradient-to-br from-teal-400 to-cyan-500 shadow-lg shadow-teal-500/30" />
          <span className="font-black tracking-tight">AltruisticXAI</span>
        </div>
        <nav className="hidden md:flex items-center gap-6 text-white/80 text-sm">
          <a href="#services" className="hover:text-white">Services</a>
          <a href="#demo" className="hover:text-white">Live Demo</a>
          <a href="#outcomes" className="hover:text-white">Outcomes</a>
          <a href="#ethics" className="hover:text-white">Ethics</a>
          <a href="#contact" className="hover:text-white">Contact</a>
        </nav>
        <a href="#contact" className="inline-flex items-center gap-2 rounded-2xl bg-teal-500 px-4 py-2 text-sm font-semibold shadow-lg hover:shadow-teal-500/30 hover:bg-teal-400 transition">
          Get a pilot →
        </a>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden">
      <DecorGlow />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 md:py-28">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/80">
              <span className="h-2 w-2 rounded-full bg-teal-400 animate-pulse" />
              Local‑first • Explainable • Measurable
            </span>
            <h1 className="mt-5 text-4xl md:text-6xl font-black tracking-tight leading-[1.05]">
              Quantum‑level ambition.
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-br from-teal-300 via-cyan-200 to-sky-400">
                Practical pilots fast.
              </span>
            </h1>
            <p className="mt-5 text-white/80 text-lg">
              We ship privacy‑first AI pilots that create real savings and real impact. On‑prem when needed, explainable by default, and designed for universities, municipalities, and mission‑driven orgs.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#demo" className="rounded-2xl bg-white text-[#0b1220] px-5 py-3 text-sm font-semibold hover:bg-white/90 transition shadow">
                Try the live demo
              </a>
              <a href="#outcomes" className="rounded-2xl border border-white/10 px-5 py-3 text-sm font-semibold hover:bg-white/10 transition">
                See outcomes
              </a>
            </div>
            <dl className="mt-8 grid grid-cols-3 gap-4 max-w-lg">
              {[
                { label: "Avg. pilot payback", value: "< 6 mo" },
                { label: "Privacy mode", value: "Local‑first" },
                { label: "Explainability", value: "Built‑in" },
              ].map((s) => (
                <div key={s.label} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <dt className="text-xs text-white/60">{s.label}</dt>
                  <dd className="mt-1 text-xl font-bold">{s.value}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div className="relative">
            <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-white/10 to-white/5 p-4 backdrop-blur">
              <TerminalCard />
            </div>
            <p className="mt-3 text-xs text-white/60">
              Zero‑data demo: synthetic data only. Your data stays on your turf.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function TrustedBy() {
  return (
    <section className="py-10 border-t border-white/10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
        <p className="text-white/60 text-sm">
          Built with and for universities, municipalities, and community‑minded orgs
        </p>
        <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-6 opacity-80">
          {["University Lab", "Municipal Ops", "Energy District", "Local Foundry"].map((n) => (
            <div key={n} className="rounded-xl border border-white/10 bg-white/5 py-4">
              {n}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProblemSolution() {
  return (
    <section className="py-20" id="services">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-10 items-start">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
            <h2 className="text-2xl md:text-3xl font-bold">The problem</h2>
            <ul className="mt-4 space-y-3 text-white/80">
              <li>Data can't leave. Cloud‑only AI is a hard no for many orgs.</li>
              <li>Leaders need evidence, not endless pilots and pretty dashboards.</li>
              <li>Compliance, ethics, and security are afterthoughts everywhere else.</li>
            </ul>
          </div>
          <div className="rounded-3xl border border-teal-500/20 bg-teal-400/10 p-6">
            <h2 className="text-2xl md:text-3xl font-bold">Our approach</h2>
            <ul className="mt-4 space-y-3 text-white/80">
              <li>
                <b>Local‑first AI</b>—edge/on‑prem, data sovereignty by design.
              </li>
              <li>
                <b>Explainable</b>—decision traces, model cards, audit logs baked in.
              </li>
              <li>
                <b>Measurable</b>—impact receipts: kWh saved, hours saved, $ saved.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

function ServicesGrid() {
  const items = [
    {
      title: "Energy & Ops Intelligence",
      desc: "Live energy, facilities, and scheduling insights—alerts and actions that pay for themselves.",
    },
    {
      title: "Privacy‑First Agents",
      desc: "Task‑specific copilots that run locally. No vendor lock‑in. No data exfiltration.",
    },
    {
      title: "Explainability & Governance",
      desc: "SHAP/LIME‑style summaries, risk scoring, and compliance dashboards for audits.",
    },
    {
      title: "RAGWorks for Regulated Data",
      desc: "Retrieval‑augmented reasoning tuned for healthcare, finance, and public sector.",
    },
    {
      title: "Campus & City Living Labs",
      desc: "Pilot in weeks, not quarters—student + civic collaboration with measurable outcomes.",
    },
    {
      title: "PQC & Crypto Readiness",
      desc: "Pragmatic post‑quantum posture reviews and key migration roadmaps.",
    },
  ];
  return (
    <section className="py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-5">
          {items.map((i) => (
            <div
              key={i.title}
              className="group rounded-2xl border border-white/10 bg-white/5 p-6 hover:bg-white/10 transition"
            >
              <div className="h-10 w-10 rounded-xl bg-white/10 group-hover:bg-white/20" />
              <h3 className="mt-4 text-lg font-semibold">{i.title}</h3>
              <p className="mt-2 text-sm text-white/80">{i.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function LiveDemo() {
  return (
    <section className="py-20" id="demo">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-8 items-start">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-4">
            <TerminalCard />
          </div>
          <div className="rounded-3xl border border-white/10 bg-white/5 p-4">
            <ChatCard />
          </div>
        </div>
      </div>
    </section>
  );
}

function TerminalCard() {
  const [lines, setLines] = useState<string[]>([
    "$ altruisticxai impact --org=UNE --pilot=energy",
    "› loading synthetic telemetry…",
    "› simulating edge inference (llama‑local)…",
  ]);
  const [busy, setBusy] = useState(false);
  const boxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    boxRef.current?.scrollTo({ top: boxRef.current.scrollHeight });
  }, [lines]);

  const run = async () => {
    if (busy) return;
    setBusy(true);
    const seq = [
      "› calculating kWh delta…",
      "› computing staff hours saved…",
      "› generating impact receipt…",
      "\nImpact Receipt (synthetic)\n——————————————\n• Energy: −12.4% (annualized)\n• Staff time: −6.5 hrs/week\n• Est. savings: $28,400/yr\n• Emissions: −19.2 tCO₂e/yr\n",
    ];
    for (const s of seq) {
      await wait(600);
      setLines((prev) => [...prev, s]);
    }
    setBusy(false);
  };

  return (
    <div className="rounded-2xl border border-white/10 bg-[#0b1220]">
      <div className="flex items-center justify-between px-3 py-2 border-b border-white/10 bg-white/5 rounded-t-2xl">
        <div className="flex items-center gap-1">
          <span className="h-3 w-3 rounded-full bg-red-500/80" />
          <span className="h-3 w-3 rounded-full bg-yellow-500/80" />
          <span className="h-3 w-3 rounded-full bg-green-500/80" />
        </div>
        <span className="text-xs text-white/60">Terminal • local‑only demo</span>
        <button
          onClick={run}
          className="text-xs rounded-md px-2 py-1 border border-white/10 hover:bg-white/10"
        >
          Run
        </button>
      </div>
      <div
        ref={boxRef}
        className="h-64 overflow-auto px-4 py-3 font-mono text-sm whitespace-pre-wrap"
      >
        {lines.join("\n")}
      </div>
    </div>
  );
}

function ChatCard() {
  const [messages, setMessages] = useState<{ role: "user" | "assistant"; content: string }[]>([
    { role: "user", content: "Estimate savings if we auto‑tune HVAC schedules?" },
  ]);
  const [input, setInput] = useState("");

  const send = () => {
    if (!input.trim()) return;
    setMessages((m) => [...m, { role: "user", content: input.trim() }]);
    setInput("");
    // mock response
    setTimeout(() => {
      setMessages((m) => [
        ...m,
        {
          role: "assistant",
          content:
            "On synthetic campus data: 8–15% annualized energy cut; comfort preserved via occupancy‑aware constraints. Payback ≈ 4–6 months.",
        },
      ]);
    }, 500);
  };

  return (
    <div className="rounded-2xl border border-white/10 bg-[#0b1220]">
      <div className="px-3 py-2 border-b border-white/10 bg-white/5 rounded-t-2xl text-xs text-white/60">
        Chat • privacy‑first agent (mock)
      </div>
      <div className="h-64 overflow-auto px-4 py-3 space-y-3">
        {messages.map((m, i) => (
          <div key={i} className={`max-w-[85%] ${m.role === "assistant" ? "ml-auto" : ""}`}>
            <div
              className={`${
                m.role === "assistant"
                  ? "bg-teal-400/15 border-teal-500/30"
                  : "bg-white/5 border-white/10"
              } rounded-2xl border px-3 py-2 text-sm`}
            >
              {m.content}
            </div>
          </div>
        ))}
      </div>
      <div className="p-3 border-t border-white/10 flex items-center gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && send()}
          placeholder="Ask about schedules, cost, kWh…"
          className="flex-1 rounded-xl bg-white/5 border border-white/10 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-teal-400/40"
        />
        <button
          onClick={send}
          className="rounded-xl bg-white text-[#0b1220] px-4 py-2 text-sm font-semibold hover:bg-white/90"
        >
          Send
        </button>
      </div>
    </div>
  );
}

function Outcomes() {
  const items = [
    { k: "kWh cut", v: "−12.4%", note: "synthetic demo" },
    { k: "Staff time", v: "−6.5 hrs/wk", note: "synthetic demo" },
    { k: "Payback", v: "4–6 months", note: "pilot typical" },
    { k: "Emissions", v: "−19.2 tCO₂e/yr", note: "synthetic demo" },
  ];
  return (
    <section className="py-20" id="outcomes">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold">Outcomes you can measure</h2>
        <p className="mt-2 text-white/80">
          Every pilot ships with an Impact Receipt—numbers you can show your CFO and your
          community.
        </p>
        <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
          {items.map((i) => (
            <div key={i.k} className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <div className="text-xs text-white/60">{i.k}</div>
              <div className="mt-1 text-2xl font-black">{i.v}</div>
              <div className="text-[10px] text-white/50 mt-2">{i.note}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function EthicsGovernance() {
  const bullets = [
    "Model cards + decision traces for every pilot",
    "RLS policies, data residency, and on‑prem options",
    "Fairness risk screens and audit logs",
    "Opt‑in post‑quantum crypto posture reviews",
  ];
  return (
    <section className="py-20 border-y border-white/10" id="ethics">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-10 items-start">
        <div>
          <h2 className="text-3xl font-bold">Explainable by default. Governed from day one.</h2>
          <p className="mt-3 text-white/80">
            Ethics isn't a slide at the end. It's part of the code, the config, and the contract.
          </p>
          <ul className="mt-4 space-y-2 text-white/80">
            {bullets.map((b) => (
              <li key={b} className="flex items-start gap-2">
                <span className="mt-1 h-1.5 w-1.5 rounded-full bg-teal-400" /> {b}
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
          <h3 className="font-semibold">What you get</h3>
          <ul className="mt-3 text-sm text-white/80 space-y-2">
            <li>✔ Impact Receipt (kWh, hours, $, CO₂e)</li>
            <li>✔ Privacy checklist + data‑flow diagram</li>
            <li>✔ Model card + explainability summary</li>
            <li>✔ Governance memo for leadership</li>
          </ul>
        </div>
      </div>
    </section>
  );
}

function CTA() {
  return (
    <section className="py-20" id="contact">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl md:text-4xl font-black">Ready to run a local‑first pilot?</h2>
        <p className="mt-3 text-white/80">
          Tell us your top constraint: budget, privacy, or timeline. We'll design around it.
        </p>
        <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
          <a
            href="mailto:altruisticxai@gmail.com"
            className="rounded-2xl bg-white text-[#0b1220] px-5 py-3 text-sm font-semibold hover:bg-white/90 transition shadow"
          >
            Email us
          </a>
          <a
            href="https://future-u.info"
            className="rounded-2xl border border-white/10 px-5 py-3 text-sm font-semibold hover:bg-white/10 transition"
            target="_blank"
            rel="noreferrer"
          >
            See living lab
          </a>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4 text-white/70 text-sm">
        <p>© {new Date().getFullYear()} AltruisticXAI. Built local‑first in Maine.</p>
        <div className="flex items-center gap-4">
          <a className="hover:text-white" href="#">
            Privacy
          </a>
          <a className="hover:text-white" href="#">
            Security
          </a>
          <a className="hover:text-white" href="#">
            Imprint
          </a>
        </div>
      </div>
    </footer>
  );
}

function DecorGlow() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <div className="absolute -top-24 -left-24 h-80 w-80 rounded-full bg-teal-500/20 blur-3xl" />
      <div className="absolute -bottom-24 -right-24 h-96 w-96 rounded-full bg-cyan-500/20 blur-3xl" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
    </div>
  );
}

function wait(ms: number) {
  return new Promise((res) => setTimeout(res, ms));
}
