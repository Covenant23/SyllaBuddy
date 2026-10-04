"use client";

import { useState } from "react";
import "./variations.css";

const concepts = [
  { name: "Peach Club", label: "01 / warm & playful", tag: "A LITTLE LESS CHAOS. A LOT MORE YOU.", title: "Big semester.", accent: "Little buddy.", copy: "Give your deadlines a home, and your brain a break. Your next chapter starts with a clearer plan.", mascot: "peach", note: "Click Peach for a little encouragement.", color: "#ffb8a2" },
  { name: "Orbit", label: "02 / bright & cosmic", tag: "GET YOUR SEMESTER INTO ORBIT", title: "A whole universe.", accent: "One clear plan.", copy: "Courses, deadlines, and your next move. Bring your academic universe together without losing your spark.", mascot: "star", note: "Move your pointer around Nova. Click to celebrate.", color: "#c7b6ff" },
  { name: "Study Sprout", label: "03 / fresh & friendly", tag: "SMALL STEPS. ROOM TO GROW.", title: "Grow at your", accent: "own pace.", copy: "Make space for the work that matters. A calmer view of your courses, with a friendly nudge toward your next step.", mascot: "sprout", note: "Water Sprout and watch your buddy grow.", color: "#c6ed72" },
  { name: "Electric Notes", label: "04 / bold & graphic", tag: "YOUR BRAIN HAS BETTER THINGS TO DO", title: "Less scramble.", accent: "More semester.", copy: "All those syllabi. All those dates. One place to get your week together and get on with your life.", mascot: "note", note: "Tap the sticky-note buddy for a pep talk.", color: "#ffe666" },
] as const;

function Buddy({ kind, active, look }: { kind: string; active: boolean; look: number }) {
  const palette = { peach: ["#ff886f", "#d85b4d", "#ffc2a2"], star: ["#9d82ef", "#7154bd", "#cdbaff"], sprout: ["#87bd56", "#568e36", "#c6eb91"], note: ["#ffcf45", "#d9a127", "#ffeba0"] }[kind] ?? ["#ff886f", "#d85b4d", "#ffc2a2"];
  return <svg viewBox="0 0 320 320" className={`buddy-svg ${active ? "is-active" : ""}`} aria-hidden="true">
    <ellipse cx="160" cy="290" rx="83" ry="11" fill="currentColor" opacity=".12" />
    <g className="buddy-body">
      <ellipse cx="117" cy="276" rx="29" ry="14" fill={palette[1]} transform="rotate(-9 117 276)" />
      <ellipse cx="203" cy="276" rx="29" ry="14" fill={palette[1]} transform="rotate(9 203 276)" />
      <g className="buddy-arm-left"><path d="M90 177C49 159 39 185 57 212c9 13 26 17 43 9Z" fill={palette[1]}/></g>
      <g className={`buddy-arm-right ${active ? "waving" : ""}`}><path d={active ? "M227 181c20-9 23-29 19-47-3-13 11-20 21-8 25 32 13 76-19 88Z" : "M230 177c41-18 51 8 33 35-9 13-26 17-43 9Z"} fill={palette[1]}/></g>
      <path d={kind === "note" ? "M109 65h102q39 0 39 40v120q0 40-40 40H110q-40 0-40-40V105q0-40 39-40Z" : "M160 61c-64 0-91 39-92 103l-1 44c-1 40 33 60 93 60s94-20 93-60l-1-44c-1-64-28-103-92-103Z"} fill={palette[0]}/>
      <ellipse cx="160" cy="227" rx="52" ry="30" fill={palette[2]}/>
      {kind === "peach" && <><path d="M155 68c-9-35 20-52 48-44-2 26-20 44-48 44Z" fill="#4e9362"/><path d="M151 68q-8-15-4-29" stroke="#764334" strokeWidth="7" fill="none" strokeLinecap="round"/></>}
      {kind === "star" && <><path d="m107 77-12-36 36 25m61 0 34-25-12 36" fill={palette[0]}/><path d="m160 78 6 12 14 2-10 10 2 14-12-7-12 7 2-14-10-10 14-2Z" fill="#eafb9b"/></>}
      {kind === "sprout" && <><path d="M160 70V40" stroke="#49783b" strokeWidth="7" fill="none"/><path d="M159 50C126 58 105 39 107 20c31-2 50 10 52 30Z" fill="#568e36"/><path d="M161 50c0-30 22-40 50-30-4 20-20 30-50 30Z" fill="#9bd363"/></>}
      {kind === "note" && <><path d="M209 66v30h40Z" fill="#fff3be"/><path d="M113 83h39" stroke={palette[1]} strokeWidth="7" strokeLinecap="round"/></>}
      <ellipse cx="126" cy="148" rx="28" ry="36" fill="white"/><ellipse cx="190" cy="148" rx="28" ry="36" fill="white"/>
      <g transform={`translate(${look},0)`}><ellipse cx="132" cy="153" rx="12" ry={active ? 14 : 18} fill="#293342"/><ellipse cx="184" cy="153" rx="12" ry={active ? 14 : 18} fill="#293342"/><ellipse cx="136" cy="147" rx="4" ry="5" fill="white"/><ellipse cx="188" cy="147" rx="4" ry="5" fill="white"/></g>
      <path d="M111 104q13-9 26-3m40 0q13-6 26 3" stroke={palette[1]} strokeWidth="7" strokeLinecap="round" fill="none"/>
      <ellipse cx="103" cy="185" rx="15" ry="8" fill={palette[1]} opacity=".4"/><ellipse cx="216" cy="185" rx="15" ry="8" fill={palette[1]} opacity=".4"/>
      <path d={active ? "M139 188q21 7 42 0v5c-2 30-40 30-42 0Z" : "M143 191q17 21 34 0Z"} fill="#293342"/>
      {active && <><path d="M143 190q17 5 34 0v8h-34Z" fill="white"/><ellipse cx="160" cy="211" rx="10" ry="5" fill="#f38f9b"/></>}
      <path d="m148 228 9 9 17-19" fill="none" stroke={palette[1]} strokeWidth="7" strokeLinecap="round" strokeLinejoin="round"/>
    </g>
  </svg>;
}

export default function Variations() {
  const [selected, setSelected] = useState(0);
  const [active, setActive] = useState(false);
  const [look, setLook] = useState(0);
  const concept = concepts[selected];
  const choose = (index: number) => { setSelected(index); setActive(false); setLook(0); };
  return <div className={`concept concept-${selected}`}>
    <div className="concept-picker"><div><strong>Landing Page Tests</strong><span>Pick a direction for SyllaBuddy</span></div><div className="concept-options" aria-label="Landing page variations">{concepts.map((item, index) => <button key={item.name} aria-pressed={index === selected} onClick={() => choose(index)}><i style={{ background: item.color }} />{item.name}</button>)}</div><a href="/">Original ↗</a></div>
    <div className="concept-page">
      <header className="concept-nav"><a className="concept-logo" href="/landing-page-tests"><span className="logo-symbol" aria-hidden="true">{["✿", "✦", "❋", "S!"][selected]}</span>sylla<span>buddy</span><sup>↗</sup></a><a className="nav-prototype" href="/baseline.html">Try the prototype <span>↗</span></a></header>
      <section className="concept-hero">
        <div className="hero-copy"><p className="concept-kicker">{concept.tag}</p><h1>{concept.title}<br/><span>{concept.accent}</span></h1><p className="concept-description">{concept.copy}</p><div className="concept-actions"><a className="concept-cta" href="/baseline.html">Meet your next semester <span>↗</span></a><a className="concept-secondary" href="#concept-preview">Take a peek ↓</a></div><p className="honesty">Working text-extraction prototype. AI features are coming next.</p><div className="mini-proof"><span>✓ Your courses, together</span><span>✓ You confirm the dates</span></div></div>
        <div className="buddy-scene" onPointerMove={(event) => { if (selected === 1) { const bounds = event.currentTarget.getBoundingClientRect(); setLook(Math.max(-7, Math.min(7, ((event.clientX - bounds.left) / bounds.width - .5) * 14))); } }} onPointerLeave={() => setLook(0)}>
          <span className="scene-doodle doodle-one" aria-hidden="true">✦</span><span className="scene-doodle doodle-two" aria-hidden="true">✳</span>
          <div className="speech" aria-live="polite">{active ? ["One step at a time. You’ve got this!", "Small wins deserve a big cheer!", "A little care goes a long way.", "Progress beats perfect. Let’s go!"][selected] : ["Hey, semester. We’ve got this.", "Ready for your next mission?", "You don’t have to do it all today.", "Your brain called. It wants a break."][selected]}</div>
          <button className="buddy-button" aria-label={`${active ? "Reset" : selected === 2 ? "Water" : "Interact with"} ${["Peach", "Nova", "Sprout", "Note"][selected]}`} aria-pressed={active} onClick={() => setActive(!active)}><Buddy kind={concept.mascot} active={active} look={look}/></button>
          <div className="floating-task"><span className="task-icon">✓</span><div><strong>{active ? "One small win" : "Your week, looking clearer"}</strong><small>{active ? "That counts. Keep going." : "A little structure. A little breathing room."}</small></div><span>✦</span></div>
          <p className="buddy-instruction">{concept.note}</p>
        </div>
      </section>
      <section id="concept-preview" className="concept-preview"><div className="preview-title"><div><p className="concept-kicker">FROM “WHERE WAS THAT?” TO “I’VE GOT THIS.”</p><h2>Make room for the good stuff.</h2></div><span className="preview-label">Product concept · Sample content</span></div><div className="preview-grid"><article className="agenda-card"><div className="card-top"><h3>A week at a glance</h3><span>Preview</span></div>{[["MON", "12", "Design thinking", "Project outline", "coral"], ["WED", "14", "Intro to psychology", "Midterm exam", "purple"], ["FRI", "16", "Environmental science", "Lab reflection", "green"]].map(([day,date,course,title,color]) => <div className="agenda-item" key={day}><div className="date-tile"><small>{day}</small><strong>{date}</strong></div><div><small>{course}</small><h4>{title}</h4></div><span className={`course-dot ${color}`}/></div>)}<p className="sample-note">Illustrative assignments, not your actual deadlines.</p></article><article className="feature-card"><span className="feature-icon">↗</span><h3>Bring it all together.</h3><p>A unified view of academic responsibilities, with source evidence and student review.</p><span className="feature-status">Planned: upload → review → confirm</span></article><article className="feature-card alternate"><span className="feature-icon">✧</span><h3>A nudge, when it helps.</h3><p>Suggested work plans and opt-in reminders to help you move from knowing to doing.</p><span className="feature-status">Planned: reminders + weekly plans</span></article></div></section>
      <footer className="concept-footer"><span>SyllaBuddy · A little help for a full semester.</span><span>{concept.label} · <a href="/">Compare with the original ↗</a></span></footer>
    </div>
  </div>;
}
