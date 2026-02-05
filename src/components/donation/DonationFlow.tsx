'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CarVisual } from '@/components/car/CarVisual';
import {
  Button,
  Input,
  Select,
  Chip,
  ColorDot,
  ProgressBar,
  BackButton,
  StoryBar,
  Confetti,
  Header,
  SubText,
} from '@/components/ui';
import { partners, getPartner } from '@/components/partners/config';
import type { PartnerId } from '@/components/partners/types';
import {
  YEARS,
  MAKES,
  BODY_TYPES,
  COLORS,
  STATES,
  REASONS,
  CONDITIONS,
  MEMORIES,
  TOTAL_STEPS,
  type BodyType,
} from '@/lib/constants';

// ═══════════════════════════════════════════════════════════════════
// Partner-Specific Causes for Drag-to-Rank
// ═══════════════════════════════════════════════════════════════════

interface CauseItem {
  id: string;
  emoji: string;
  label: string;
  desc: string;
}

const ALL_PARTNER_CAUSES: Record<string, CauseItem[]> = {
  stjude: [
    { id: 'research', emoji: '🧬', label: 'Funding research', desc: 'Discoveries that save lives everywhere' },
    { id: 'families', emoji: '🏠', label: 'Families never receive a bill', desc: 'Zero cost for treatment, housing, or food' },
    { id: 'survival', emoji: '💪', label: 'Raising survival rates', desc: 'From 20% to 80%+ and climbing' },
    { id: 'global', emoji: '🌍', label: 'Sharing discoveries worldwide', desc: 'Helping kids everywhere, not just at St. Jude' },
  ],
  mow: [
    { id: 'hunger', emoji: '🍽️', label: 'Fighting senior hunger', desc: '251 million meals delivered and counting' },
    { id: 'isolation', emoji: '👋', label: 'Ending isolation', desc: 'A friendly visit can be life-changing' },
    { id: 'independence', emoji: '🏡', label: 'Supporting independence', desc: 'Helping seniors stay in their homes' },
    { id: 'waitlist', emoji: '⏳', label: 'Clearing the waitlist', desc: '1 in 3 programs can\'t meet demand' },
  ],
  sierra: [
    { id: 'climate', emoji: '☀️', label: 'Climate solutions', desc: 'Driving the transition to clean energy' },
    { id: 'wildlands', emoji: '🏔️', label: 'Protecting wild places', desc: '2.4M+ acres saved and counting' },
    { id: 'cleanair', emoji: '💨', label: 'Clean air for all', desc: 'Fighting pollution in frontline communities' },
    { id: 'outdoors', emoji: '🥾', label: 'Getting people outside', desc: 'Connecting everyone to nature' },
  ],
};

// ═══════════════════════════════════════════════════════════════════
// Welcome Page Components
// ═══════════════════════════════════════════════════════════════════

const SUGGESTED_NAMES = [
  "Old Faithful",
  "The Beast",
  "Blue",
  "Betsy",
  "The Tank",
  "Silver Bullet",
];

const DONOR_STORIES = [
  {
    quote: "15 years ago the garage door opened and this little Jetta was inside with a big red bow. We spent many amazing years together — drives to skating practice, off to college, then to California. Today I donated her to the Sierra Club Foundation.",
    car: "Volkswagen Jetta",
    to: "Sierra Club Foundation",
  },
  {
    quote: "I'm donating this car to St. Jude because my wife is a cancer survivor. We understand what it's like to worry about finances when you should be worrying about the health of your loved one.",
    car: "BMW 535i",
    to: "St. Jude Children's Research Hospital",
  },
  {
    quote: "My dad drove this truck for 22 years. When he passed, none of us could bring ourselves to sell it. Donating it to Meals on Wheels felt right — like he's still out there delivering something good.",
    car: "Ford F-150",
    to: "Meals on Wheels America",
  },
];

function AnimatedNumber({ target, duration = 2000, prefix = "", suffix = "" }: { target: number; duration?: number; prefix?: string; suffix?: string }) {
  const [val, setVal] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting && !started) setStarted(true); },
      { threshold: 0.5 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;
    let frame: number;
    const start = performance.now();
    const step = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      const ease = 1 - Math.pow(1 - t, 3);
      setVal(Math.round(ease * target));
      if (t < 1) frame = requestAnimationFrame(step);
    };
    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [started, target, duration]);

  return <span ref={ref}>{prefix}{val.toLocaleString()}{suffix}</span>;
}

function CarSketchHero() {
  const [drawn, setDrawn] = useState(false);
  useEffect(() => { setTimeout(() => setDrawn(true), 300); }, []);

  return (
    <div style={{ position: "relative", width: "100%", maxWidth: "280px", margin: "0 auto" }}>
      <svg viewBox="0 0 400 180" fill="none" style={{ width: "100%" }}>
        <line x1="20" y1="148" x2="380" y2="148" stroke="#d4cdc2" strokeWidth="1"
          strokeDasharray="8 12" style={{ opacity: drawn ? 0.5 : 0, transition: "opacity 1.5s ease 0.8s" }} />
        <path d="M52 112C52 108 56 68 102 58L172 47C187 45 197 45 212 47L292 60C332 68 352 82 356 112Z"
          stroke="#b8a99a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
          fill="#e8dfd4" fillOpacity={drawn ? 0.35 : 0}
          strokeDasharray="600" strokeDashoffset={drawn ? 0 : 600}
          style={{ transition: "stroke-dashoffset 1.8s cubic-bezier(0.4,0,0.2,1), fill-opacity 1s ease 1.2s" }} />
        <path d="M122 57C126 32 142 22 167 20L237 20C262 22 277 32 282 57"
          stroke="#b8a99a" strokeWidth="2" strokeLinecap="round"
          fill="#e8dfd4" fillOpacity={drawn ? 0.25 : 0}
          strokeDasharray="300" strokeDashoffset={drawn ? 0 : 300}
          style={{ transition: "stroke-dashoffset 1.5s cubic-bezier(0.4,0,0.2,1) 0.3s, fill-opacity 1s ease 1.4s" }} />
        <line x1="157" y1="57" x2="152" y2="24" stroke="#b8a99a" strokeWidth="1.5" strokeLinecap="round"
          strokeDasharray="40" strokeDashoffset={drawn ? 0 : 40}
          style={{ transition: "stroke-dashoffset 0.6s ease 1s" }} />
        <line x1="250" y1="57" x2="254" y2="26" stroke="#b8a99a" strokeWidth="1.5" strokeLinecap="round"
          strokeDasharray="40" strokeDashoffset={drawn ? 0 : 40}
          style={{ transition: "stroke-dashoffset 0.6s ease 1.1s" }} />
        <path d="M127 54L150 24 153 54Z" fill="#c8dde6" opacity={drawn ? 0.4 : 0}
          style={{ transition: "opacity 0.8s ease 1.6s" }} />
        <path d="M159 54L154 24 250 26 255 54Z" fill="#c8dde6" opacity={drawn ? 0.4 : 0}
          style={{ transition: "opacity 0.8s ease 1.7s" }} />
        <path d="M260 54L256 26 278 34C280 44 278 52 274 54Z" fill="#c8dde6" opacity={drawn ? 0.35 : 0}
          style={{ transition: "opacity 0.8s ease 1.8s" }} />
        <ellipse cx="64" cy="96" rx="10" ry="8" stroke="#b8a99a" strokeWidth="1.5"
          fill="#f5e8a0" fillOpacity={drawn ? 0.5 : 0}
          strokeDasharray="60" strokeDashoffset={drawn ? 0 : 60}
          style={{ transition: "all 0.8s ease 1.3s" }} />
        <ellipse cx="348" cy="96" rx="8" ry="7" stroke="#b8a99a" strokeWidth="1.5"
          fill="#e05050" fillOpacity={drawn ? 0.4 : 0}
          strokeDasharray="50" strokeDashoffset={drawn ? 0 : 50}
          style={{ transition: "all 0.8s ease 1.4s" }} />
        <path d="M46 116L358 116" stroke="#b8a99a" strokeWidth="2" strokeLinecap="round"
          strokeDasharray="320" strokeDashoffset={drawn ? 0 : 320}
          style={{ transition: "stroke-dashoffset 1.2s ease 0.5s" }} />
        <path d="M117 57L107 50 107 60Z" fill="#e8dfd4" fillOpacity={drawn ? 0.5 : 0} stroke="#b8a99a" strokeWidth="1.2"
          style={{ transition: "fill-opacity 0.6s ease 1.5s" }} />
        <circle cx="112" cy="122" r="28" fill="#3a3632" fillOpacity={drawn ? 0.8 : 0}
          stroke="#b8a99a" strokeWidth="2"
          strokeDasharray="180" strokeDashoffset={drawn ? 0 : 180}
          style={{ transition: "all 1s ease 0.6s" }} />
        <circle cx="112" cy="122" r="16" fill="#6b6560" fillOpacity={drawn ? 0.5 : 0}
          stroke="#b8a99a" strokeWidth="1.2"
          strokeDasharray="100" strokeDashoffset={drawn ? 0 : 100}
          style={{ transition: "all 0.8s ease 0.9s" }} />
        <circle cx="112" cy="122" r="4" fill="#4a4540" fillOpacity={drawn ? 0.8 : 0}
          style={{ transition: "fill-opacity 0.5s ease 1.2s" }} />
        <circle cx="297" cy="122" r="28" fill="#3a3632" fillOpacity={drawn ? 0.8 : 0}
          stroke="#b8a99a" strokeWidth="2"
          strokeDasharray="180" strokeDashoffset={drawn ? 0 : 180}
          style={{ transition: "all 1s ease 0.7s" }} />
        <circle cx="297" cy="122" r="16" fill="#6b6560" fillOpacity={drawn ? 0.5 : 0}
          stroke="#b8a99a" strokeWidth="1.2"
          strokeDasharray="100" strokeDashoffset={drawn ? 0 : 100}
          style={{ transition: "all 0.8s ease 1s" }} />
        <circle cx="297" cy="122" r="4" fill="#4a4540" fillOpacity={drawn ? 0.8 : 0}
          style={{ transition: "fill-opacity 0.5s ease 1.3s" }} />
        <ellipse cx="200" cy="155" rx="140" ry="5" fill="#1a1612" opacity={drawn ? 0.04 : 0}
          style={{ transition: "opacity 1s ease 1.5s" }} />
      </svg>
    </div>
  );
}

function StoryCarousel() {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setIdx(i => (i + 1) % DONOR_STORIES.length), 6000);
    return () => clearInterval(t);
  }, []);

  return (
    <div style={{ position: "relative", minHeight: "160px" }}>
      {DONOR_STORIES.map((s, i) => (
        <div key={i} style={{
          position: i === 0 ? "relative" : "absolute",
          top: 0, left: 0, right: 0,
          opacity: idx === i ? 1 : 0,
          transform: idx === i ? "translateY(0)" : "translateY(12px)",
          transition: "all 0.6s cubic-bezier(0.4,0,0.2,1)",
          pointerEvents: idx === i ? "auto" : "none",
        }}>
          <p style={{
            fontFamily: "var(--font-fraunces), serif",
            fontSize: "14px",
            fontStyle: "italic",
            fontWeight: 400,
            color: "#5a5247",
            lineHeight: 1.7,
            margin: "0 0 12px",
          }}>
            &ldquo;{s.quote}&rdquo;
          </p>
          <p style={{
            fontFamily: "var(--font-nunito), sans-serif",
            fontSize: "11px",
            fontWeight: 700,
            color: "#a09484",
            letterSpacing: "0.5px",
            margin: 0,
          }}>
            {s.car} &rarr; {s.to}
          </p>
        </div>
      ))}
      <div style={{ display: "flex", gap: "8px", justifyContent: "center", marginTop: "16px" }}>
        {DONOR_STORIES.map((_, i) => (
          <button key={i} onClick={() => setIdx(i)} style={{
            width: idx === i ? "24px" : "8px",
            height: "8px",
            borderRadius: "4px",
            background: idx === i ? "#1a1612" : "#d4cdc2",
            border: "none",
            cursor: "pointer",
            transition: "all 0.3s ease",
            padding: 0,
          }} />
        ))}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════
// Partner Selection Components
// ═══════════════════════════════════════════════════════════════════

const PARTNERS_DATA = [
  {
    id: "stjude",
    name: "St. Jude Children's Research Hospital",
    short: "St. Jude",
    tagline: "Finding cures. Saving children.",
    color: "#c41230",
    colorLight: "rgba(196,18,48,0.06)",
    colorMid: "rgba(196,18,48,0.12)",
    icon: "🏥",
    hook: "Families never receive a bill.",
    description: "St. Jude treats the toughest childhood cancers — and no family ever pays for treatment, travel, housing, or food. Since 1962, they've pushed childhood cancer survival from 20% to over 80%.",
    stat1: { value: "8,600+", label: "patients treated each year" },
    stat2: { value: "80%", label: "survival rate (up from 20%)" },
    stat3: { value: "$0", label: "billed to families. Ever." },
    humanLine: "Your car becomes a child's chance at a cure.",
  },
  {
    id: "mow",
    name: "Meals on Wheels America",
    short: "Meals on Wheels",
    tagline: "No senior left hungry or isolated.",
    color: "#0077b6",
    colorLight: "rgba(0,119,182,0.06)",
    colorMid: "rgba(0,119,182,0.12)",
    icon: "🍽️",
    hook: "It's not just a meal. It's a knock on the door.",
    description: "For millions of homebound seniors, a Meals on Wheels volunteer might be the only person they see all week. Every delivery is a meal, a safety check, and a moment of human connection.",
    stat1: { value: "2.4M", label: "seniors served nationwide" },
    stat2: { value: "1 in 3", label: "programs have a waitlist" },
    stat3: { value: "2M+", label: "volunteers making deliveries" },
    humanLine: "Your car becomes a warm meal at someone's door.",
  },
  {
    id: "sierra",
    name: "Sierra Club Foundation",
    short: "Sierra Club",
    tagline: "Explore. Enjoy. Protect.",
    color: "#2d6a4f",
    colorLight: "rgba(45,106,79,0.06)",
    colorMid: "rgba(45,106,79,0.12)",
    icon: "🌲",
    hook: "132 years of protecting wild places.",
    description: "From retiring coal plants to protecting public lands to fighting for clean air in frontline communities — the Sierra Club Foundation has been the backbone of the American environmental movement since 1892.",
    stat1: { value: "439", label: "parks and wild areas protected" },
    stat2: { value: "281", label: "coal plants retired" },
    stat3: { value: "3.8M", label: "members and supporters" },
    humanLine: "Your car becomes cleaner air and wilder places.",
  },
];

interface PartnerData {
  id: string;
  name: string;
  short: string;
  tagline: string;
  color: string;
  colorLight: string;
  colorMid: string;
  icon: string;
  hook: string;
  description: string;
  stat1: { value: string; label: string };
  stat2: { value: string; label: string };
  stat3: { value: string; label: string };
  humanLine: string;
}

function PartnerCard({
  partner,
  isSelected,
  isExpanded,
  onSelect,
  onExpand
}: {
  partner: PartnerData;
  isSelected: boolean;
  isExpanded: boolean;
  onSelect: (id: string) => void;
  onExpand: (id: string) => void;
}) {
  const p = partner;
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isExpanded && cardRef.current) {
      cardRef.current.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  }, [isExpanded]);

  return (
    <div
      ref={cardRef}
      onClick={() => {
        if (!isExpanded) onExpand(p.id);
        else onSelect(p.id);
      }}
      style={{
        background: isExpanded ? "#fff" : isSelected ? p.colorLight : "#fff",
        borderRadius: "20px",
        border: `2px solid ${isExpanded ? p.color : isSelected ? p.color : "#e8e0d5"}`,
        overflow: "hidden",
        cursor: "pointer",
        transition: "all 0.4s cubic-bezier(0.4,0,0.2,1)",
        boxShadow: isExpanded
          ? `0 12px 40px ${p.color}18, 0 2px 8px rgba(0,0,0,0.04)`
          : isSelected
            ? `0 4px 20px ${p.color}15`
            : "0 2px 12px rgba(0,0,0,0.03)",
      }}
    >
      {/* Collapsed state */}
      <div style={{
        display: "flex",
        alignItems: "center",
        gap: "14px",
        padding: "16px 20px",
      }}>
        <div style={{
          width: "48px",
          height: "48px",
          borderRadius: "14px",
          background: p.colorLight,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "22px",
          flexShrink: 0,
          transition: "all 0.3s ease",
          border: isExpanded ? `1.5px solid ${p.colorMid}` : "1.5px solid transparent",
        }}>
          {p.icon}
        </div>

        <div style={{ flex: 1, minWidth: 0 }}>
          <p style={{
            fontFamily: "var(--font-fraunces), serif",
            fontSize: "17px",
            fontWeight: 800,
            color: isExpanded ? p.color : "#1a1612",
            margin: "0 0 2px",
            lineHeight: 1.25,
            transition: "color 0.3s ease",
          }}>
            {p.short}
          </p>
          <p style={{
            fontSize: "13px",
            fontWeight: 500,
            color: "#a09484",
            margin: 0,
            fontStyle: "italic",
            lineHeight: 1.3,
          }}>
            {p.tagline}
          </p>
        </div>

        <div style={{
          width: "28px",
          height: "28px",
          borderRadius: "50%",
          background: isExpanded ? p.color : "#f0ebe3",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transition: "all 0.3s ease",
          flexShrink: 0,
        }}>
          <span style={{
            fontSize: "14px",
            color: isExpanded ? "#fff" : "#b8a99a",
            transform: isExpanded ? "rotate(180deg)" : "rotate(0deg)",
            transition: "transform 0.3s ease",
            display: "inline-block",
          }}>▾</span>
        </div>
      </div>

      {/* Expanded content */}
      <div style={{
        maxHeight: isExpanded ? "500px" : "0",
        opacity: isExpanded ? 1 : 0,
        overflow: "hidden",
        transition: "max-height 0.5s cubic-bezier(0.4,0,0.2,1), opacity 0.4s ease 0.1s",
      }}>
        <div style={{
          height: "1px",
          background: `linear-gradient(90deg, transparent, ${p.colorMid}, transparent)`,
          margin: "0 20px",
        }} />

        <div style={{ padding: "18px 20px 6px" }}>
          <p style={{
            fontFamily: "var(--font-fraunces), serif",
            fontSize: "19px",
            fontWeight: 700,
            color: "#1a1612",
            lineHeight: 1.35,
            margin: "0 0 10px",
          }}>
            {p.hook}
          </p>

          <p style={{
            fontSize: "14px",
            color: "#7a6f63",
            lineHeight: 1.65,
            margin: "0 0 18px",
          }}>
            {p.description}
          </p>
        </div>

        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          gap: "1px",
          background: p.colorMid,
          margin: "0 20px",
          borderRadius: "14px",
          overflow: "hidden",
        }}>
          {[p.stat1, p.stat2, p.stat3].map((s, i) => (
            <div key={i} style={{
              background: p.colorLight,
              padding: "14px 10px",
              textAlign: "center",
            }}>
              <p style={{
                fontFamily: "var(--font-fraunces), serif",
                fontSize: "18px",
                fontWeight: 900,
                color: p.color,
                margin: "0 0 3px",
                lineHeight: 1,
              }}>{s.value}</p>
              <p style={{
                fontSize: "10px",
                fontWeight: 600,
                color: "#8a7e70",
                margin: 0,
                lineHeight: 1.3,
                textTransform: "uppercase",
                letterSpacing: "0.3px",
              }}>{s.label}</p>
            </div>
          ))}
        </div>

        <div style={{ padding: "18px 20px 20px" }}>
          <p style={{
            fontFamily: "var(--font-fraunces), serif",
            fontSize: "14px",
            fontStyle: "italic",
            color: "#9a8e7e",
            margin: "0 0 16px",
            lineHeight: 1.5,
            textAlign: "center",
          }}>
            {p.humanLine}
          </p>

          <button
            onClick={(e) => { e.stopPropagation(); onSelect(p.id); }}
            style={{
              width: "100%",
              padding: "16px 24px",
              borderRadius: "14px",
              border: "none",
              background: p.color,
              color: "#fff",
              fontSize: "15px",
              fontWeight: 700,
              fontFamily: "var(--font-nunito), sans-serif",
              cursor: "pointer",
              boxShadow: `0 4px 20px ${p.color}35`,
              transition: "all 0.25s ease",
              letterSpacing: "0.3px",
            }}
          >
            Donate to {p.short} →
          </button>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════
// Vehicle Info Components - SVG Body Types & Searchable Select
// ═══════════════════════════════════════════════════════════════════

const BODY_TYPE_ICONS: Record<string, (color: string) => React.ReactNode> = {
  sedan: (c) => (
    <svg viewBox="0 0 80 40" fill="none" style={{ width: "56px" }}>
      <path d="M8 28C8 26 10 16 22 12L38 9C42 8.5 45 8.5 48 9L64 12C72 14 76 18 78 28Z" stroke={c} strokeWidth="1.5" fill={c} fillOpacity="0.08" strokeLinejoin="round"/>
      <path d="M26 12C27 6 32 4 38 3.5H50C56 4 60 6 62 12" stroke={c} strokeWidth="1.5" fill={c} fillOpacity="0.05"/>
      <circle cx="22" cy="30" r="7" fill="#3a3632" fillOpacity="0.7" stroke={c} strokeWidth="1"/>
      <circle cx="62" cy="30" r="7" fill="#3a3632" fillOpacity="0.7" stroke={c} strokeWidth="1"/>
    </svg>
  ),
  suv: (c) => (
    <svg viewBox="0 0 80 44" fill="none" style={{ width: "56px" }}>
      <path d="M6 30C6 26 10 14 24 10L36 8H52L66 10C74 12 78 20 78 30Z" stroke={c} strokeWidth="1.5" fill={c} fillOpacity="0.08" strokeLinejoin="round"/>
      <path d="M22 10L24 3H60L62 10" stroke={c} strokeWidth="1.5" fill={c} fillOpacity="0.05"/>
      <circle cx="20" cy="33" r="8" fill="#3a3632" fillOpacity="0.7" stroke={c} strokeWidth="1"/>
      <circle cx="64" cy="33" r="8" fill="#3a3632" fillOpacity="0.7" stroke={c} strokeWidth="1"/>
    </svg>
  ),
  truck: (c) => (
    <svg viewBox="0 0 88 44" fill="none" style={{ width: "60px" }}>
      <path d="M6 30C6 26 10 16 22 12L34 10H44V30Z" stroke={c} strokeWidth="1.5" fill={c} fillOpacity="0.08" strokeLinejoin="round"/>
      <rect x="44" y="18" width="34" height="12" rx="2" stroke={c} strokeWidth="1.5" fill={c} fillOpacity="0.04"/>
      <path d="M22 12L26 4H40L42 10" stroke={c} strokeWidth="1.5" fill={c} fillOpacity="0.05"/>
      <circle cx="22" cy="33" r="8" fill="#3a3632" fillOpacity="0.7" stroke={c} strokeWidth="1"/>
      <circle cx="68" cy="33" r="8" fill="#3a3632" fillOpacity="0.7" stroke={c} strokeWidth="1"/>
    </svg>
  ),
  convertible: (c) => (
    <svg viewBox="0 0 80 38" fill="none" style={{ width: "56px" }}>
      <path d="M8 26C8 24 10 16 22 12L38 9C42 8.5 45 8.5 48 9L64 12C72 14 76 18 78 26Z" stroke={c} strokeWidth="1.5" fill={c} fillOpacity="0.08" strokeLinejoin="round"/>
      <path d="M30 12L32 8H54L56 12" stroke={c} strokeWidth="1.2" strokeDasharray="3 2"/>
      <circle cx="22" cy="28" r="7" fill="#3a3632" fillOpacity="0.7" stroke={c} strokeWidth="1"/>
      <circle cx="62" cy="28" r="7" fill="#3a3632" fillOpacity="0.7" stroke={c} strokeWidth="1"/>
    </svg>
  ),
  van: (c) => (
    <svg viewBox="0 0 80 44" fill="none" style={{ width: "56px" }}>
      <path d="M8 32C8 26 10 8 20 6H62C72 6 76 14 78 32Z" stroke={c} strokeWidth="1.5" fill={c} fillOpacity="0.08" strokeLinejoin="round"/>
      <rect x="16" y="10" width="12" height="10" rx="2" stroke={c} strokeWidth="1" fill="#c8dde6" fillOpacity="0.3"/>
      <rect x="32" y="10" width="12" height="10" rx="2" stroke={c} strokeWidth="1" fill="#c8dde6" fillOpacity="0.3"/>
      <circle cx="20" cy="35" r="7" fill="#3a3632" fillOpacity="0.7" stroke={c} strokeWidth="1"/>
      <circle cx="64" cy="35" r="7" fill="#3a3632" fillOpacity="0.7" stroke={c} strokeWidth="1"/>
    </svg>
  ),
  hatchback: (c) => (
    <svg viewBox="0 0 76 40" fill="none" style={{ width: "54px" }}>
      <path d="M8 28C8 26 10 16 22 12L38 9H52L64 12C70 14 72 20 72 28Z" stroke={c} strokeWidth="1.5" fill={c} fillOpacity="0.08" strokeLinejoin="round"/>
      <path d="M26 12C27 6 32 4 38 3.5H48C54 4 56 8 56 12" stroke={c} strokeWidth="1.5" fill={c} fillOpacity="0.05"/>
      <circle cx="22" cy="30" r="7" fill="#3a3632" fillOpacity="0.7" stroke={c} strokeWidth="1"/>
      <circle cx="58" cy="30" r="7" fill="#3a3632" fillOpacity="0.7" stroke={c} strokeWidth="1"/>
    </svg>
  ),
};

function SelectField({
  label,
  value,
  options,
  placeholder,
  onChange,
  disabled,
  accentColor,
  accentLight
}: {
  label: string;
  value: string;
  options: string[];
  placeholder: string;
  onChange: (val: string) => void;
  disabled?: boolean;
  accentColor: string;
  accentLight: string;
}) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [dropdownPos, setDropdownPos] = useState({ top: 0, left: 0, width: 0 });
  const ref = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  useEffect(() => {
    if (open && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setDropdownPos({
        top: rect.bottom + 4,
        left: rect.left,
        width: rect.width,
      });
    }
  }, [open]);

  const filtered = options.filter(o => o.toLowerCase().includes(search.toLowerCase()));

  return (
    <div ref={ref} style={{
      position: "relative",
      marginBottom: "14px",
      opacity: disabled ? 0.4 : 1,
      pointerEvents: disabled ? "none" : "auto",
      transition: "opacity 0.3s ease"
    }}>
      <label style={{
        display: "block",
        fontSize: "11px",
        fontWeight: 800,
        color: "#b8a99a",
        textTransform: "uppercase",
        letterSpacing: "1.5px",
        marginBottom: "6px",
        fontFamily: "var(--font-nunito), sans-serif",
      }}>{label}</label>
      <button
        ref={buttonRef}
        onClick={() => setOpen(!open)}
        style={{
          width: "100%",
          padding: "14px 44px 14px 16px",
          borderRadius: "14px",
          border: `2px solid ${open ? accentColor : "#e4ddd2"}`,
          background: "#fff",
          cursor: "pointer",
          textAlign: "left",
          fontSize: "16px",
          fontFamily: "var(--font-nunito), sans-serif",
          fontWeight: 600,
          color: value ? "#1a1612" : "#ccc3b5",
          boxShadow: open ? `0 0 0 4px ${accentLight}` : "0 2px 8px rgba(0,0,0,0.03)",
          transition: "all 0.2s ease",
          position: "relative",
        }}
      >
        {value || placeholder}
        <span style={{
          position: "absolute",
          right: "16px",
          top: "50%",
          transform: `translateY(-50%) rotate(${open ? 180 : 0}deg)`,
          transition: "transform 0.2s ease",
          fontSize: "12px",
          color: "#b8a99a",
        }}>▾</span>
      </button>

      {open && (
        <div style={{
          position: "fixed",
          top: dropdownPos.top,
          left: dropdownPos.left,
          width: dropdownPos.width,
          background: "#fff",
          borderRadius: "14px",
          border: "1.5px solid #e4ddd2",
          boxShadow: "0 12px 40px rgba(0,0,0,0.15)",
          zIndex: 9999,
          maxHeight: "240px",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
        }}>
          {options.length > 10 && (
            <div style={{ padding: "10px 12px 6px", borderBottom: "1px solid #f0ebe3" }}>
              <input
                autoFocus
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Type to filter..."
                style={{
                  width: "100%",
                  padding: "8px 12px",
                  border: "1.5px solid #e8e0d5",
                  borderRadius: "10px",
                  fontSize: "14px",
                  fontFamily: "var(--font-nunito), sans-serif",
                  outline: "none",
                  color: "#1a1612",
                }}
              />
            </div>
          )}
          <div style={{ overflowY: "auto", maxHeight: "200px" }}>
            {filtered.map((o, i) => (
              <button
                key={i}
                onClick={() => { onChange(o); setOpen(false); setSearch(""); }}
                style={{
                  width: "100%",
                  padding: "12px 16px",
                  border: "none",
                  background: value === o ? accentLight : "transparent",
                  cursor: "pointer",
                  textAlign: "left",
                  fontSize: "15px",
                  fontFamily: "var(--font-nunito), sans-serif",
                  fontWeight: value === o ? 700 : 500,
                  color: value === o ? accentColor : "#1a1612",
                  borderBottom: i < filtered.length - 1 ? "1px solid #f5f0ea" : "none",
                  transition: "background 0.15s ease",
                }}
              >
                {o}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════
// DraggableList Component for Cause Ranking
// ═══════════════════════════════════════════════════════════════════

interface DraggableListProps {
  items: CauseItem[];
  onReorder: (items: CauseItem[]) => void;
  accentColor: string;
  accentLight: string;
}

function DraggableList({ items, onReorder, accentColor, accentLight }: DraggableListProps) {
  const [draggedIdx, setDraggedIdx] = useState<number | null>(null);
  const [dragOverIdx, setDragOverIdx] = useState<number | null>(null);
  const touchStartY = useRef<number>(0);
  const touchCurrentIdx = useRef<number | null>(null);
  const listRef = useRef<HTMLDivElement>(null);

  // Mouse drag handlers
  const handleDragStart = (e: React.DragEvent, idx: number) => {
    setDraggedIdx(idx);
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', idx.toString());
  };

  const handleDragOver = (e: React.DragEvent, idx: number) => {
    e.preventDefault();
    if (draggedIdx !== null && draggedIdx !== idx) {
      setDragOverIdx(idx);
    }
  };

  const handleDragLeave = () => {
    setDragOverIdx(null);
  };

  const handleDrop = (e: React.DragEvent, dropIdx: number) => {
    e.preventDefault();
    if (draggedIdx !== null && draggedIdx !== dropIdx) {
      const newItems = [...items];
      const [removed] = newItems.splice(draggedIdx, 1);
      newItems.splice(dropIdx, 0, removed);
      onReorder(newItems);
    }
    setDraggedIdx(null);
    setDragOverIdx(null);
  };

  const handleDragEnd = () => {
    setDraggedIdx(null);
    setDragOverIdx(null);
  };

  // Touch drag handlers for mobile
  const handleTouchStart = (e: React.TouchEvent, idx: number) => {
    touchStartY.current = e.touches[0].clientY;
    touchCurrentIdx.current = idx;
    setDraggedIdx(idx);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (touchCurrentIdx.current === null || !listRef.current) return;

    const touch = e.touches[0];
    const elements = listRef.current.querySelectorAll('[data-draggable]');

    for (let i = 0; i < elements.length; i++) {
      const rect = elements[i].getBoundingClientRect();
      if (touch.clientY >= rect.top && touch.clientY <= rect.bottom) {
        if (i !== touchCurrentIdx.current) {
          setDragOverIdx(i);
        }
        break;
      }
    }
  };

  const handleTouchEnd = () => {
    if (touchCurrentIdx.current !== null && dragOverIdx !== null && touchCurrentIdx.current !== dragOverIdx) {
      const newItems = [...items];
      const [removed] = newItems.splice(touchCurrentIdx.current, 1);
      newItems.splice(dragOverIdx, 0, removed);
      onReorder(newItems);
    }
    setDraggedIdx(null);
    setDragOverIdx(null);
    touchCurrentIdx.current = null;
  };

  return (
    <div ref={listRef} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
      {items.map((item, idx) => {
        const isFirst = idx === 0;
        const isDragging = draggedIdx === idx;
        const isDragOver = dragOverIdx === idx;

        return (
          <div
            key={item.id}
            data-draggable
            draggable
            onDragStart={(e) => handleDragStart(e, idx)}
            onDragOver={(e) => handleDragOver(e, idx)}
            onDragLeave={handleDragLeave}
            onDrop={(e) => handleDrop(e, idx)}
            onDragEnd={handleDragEnd}
            onTouchStart={(e) => handleTouchStart(e, idx)}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '14px',
              padding: '16px 18px',
              borderRadius: '16px',
              border: `2px solid ${isFirst ? accentColor : isDragOver ? accentColor : '#e4ddd2'}`,
              background: isFirst ? accentLight : isDragOver ? `${accentLight}` : '#fff',
              cursor: 'grab',
              opacity: isDragging ? 0.5 : 1,
              transform: isDragOver ? 'scale(1.02)' : 'scale(1)',
              transition: 'all 0.2s ease',
              boxShadow: isFirst
                ? `0 4px 20px ${accentColor}20`
                : isDragOver
                  ? `0 4px 16px ${accentColor}15`
                  : '0 2px 8px rgba(0,0,0,0.03)',
              touchAction: 'none',
              userSelect: 'none',
            }}
          >
            {/* Rank number */}
            <div style={{
              width: '28px',
              height: '28px',
              borderRadius: '50%',
              background: isFirst ? accentColor : '#f0ebe3',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}>
              <span style={{
                fontFamily: 'var(--font-fraunces), serif',
                fontSize: '14px',
                fontWeight: 800,
                color: isFirst ? '#fff' : '#a09484',
              }}>
                {idx + 1}
              </span>
            </div>

            {/* Emoji */}
            <span style={{ fontSize: '24px', flexShrink: 0 }}>{item.emoji}</span>

            {/* Text content */}
            <div style={{ flex: 1, minWidth: 0 }}>
              <p style={{
                fontFamily: 'var(--font-fraunces), serif',
                fontSize: '15px',
                fontWeight: 700,
                color: isFirst ? accentColor : '#1a1612',
                margin: '0 0 2px',
                lineHeight: 1.3,
              }}>
                {item.label}
              </p>
              <p style={{
                fontSize: '12px',
                color: '#9a8e7e',
                margin: 0,
                lineHeight: 1.4,
              }}>
                {item.desc}
              </p>
            </div>

            {/* Drag handle */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '3px',
              padding: '4px',
              flexShrink: 0,
            }}>
              <div style={{ width: '18px', height: '2px', background: '#d4cdc2', borderRadius: '1px' }} />
              <div style={{ width: '18px', height: '2px', background: '#d4cdc2', borderRadius: '1px' }} />
              <div style={{ width: '18px', height: '2px', background: '#d4cdc2', borderRadius: '1px' }} />
            </div>
          </div>
        );
      })}
    </div>
  );
}

// Screen wrapper with animation
function Screen({ active, children }: { active: boolean; children: React.ReactNode }) {
  return (
    <AnimatePresence mode="wait">
      {active && (
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -40 }}
          transition={{ duration: 0.45, ease: [0.4, 0, 0.2, 1] }}
          className="absolute inset-0 flex flex-col items-center justify-start px-6 md:px-8 pb-32 overflow-y-scroll scroll-smooth"
          style={{ WebkitOverflowScrolling: 'touch' }}
        >
          <div className="w-full max-w-[480px] flex flex-col">
            <div className="w-full h-32 flex-shrink-0" />
            {children}
            <div className="w-full h-8 flex-shrink-0" />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

interface DonationFlowProps {
  initialViewMode?: 'auto' | 'mobile' | 'desktop';
}

export function DonationFlow({ initialViewMode = 'auto' }: DonationFlowProps) {
  // Step state
  const [step, setStep] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);

  // Form data
  const [partnerId, setPartnerId] = useState<PartnerId | ''>('');
  const [nickname, setNickname] = useState('');
  const [year, setYear] = useState('');
  const [make, setMake] = useState('');
  const [model, setModel] = useState('');
  const [bodyType, setBodyType] = useState<BodyType | ''>('');
  const [colorName, setColorName] = useState('');
  const [colorHex, setColorHex] = useState('');
  const [reason, setReason] = useState('');
  const [memories, setMemories] = useState<string[]>([]);
  const [condition, setCondition] = useState('');
  const [towAccess, setTowAccess] = useState('');
  const [rankedCauses, setRankedCauses] = useState<CauseItem[]>([]);
  const [hasReorderedCauses, setHasReorderedCauses] = useState(false);
  const [vin, setVin] = useState('');
  const [mileage, setMileage] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zip, setZip] = useState('');
  const [titleName, setTitleName] = useState('');
  const [titleState, setTitleState] = useState('');
  const [regState, setRegState] = useState('');
  const [plate, setPlate] = useState('');
  const [cleanTitle, setCleanTitle] = useState('');

  // Focus states for inputs
  const [vinFocused, setVinFocused] = useState(false);
  const [mileFocused, setMileFocused] = useState(false);

  // Demo view mode toggle
  const [viewMode, setViewMode] = useState<'auto' | 'mobile' | 'desktop'>(initialViewMode);

  // Partner selection expanded state
  const [expandedPartner, setExpandedPartner] = useState<string | null>(null);

  // Computed values
  const partner = getPartner(partnerId as PartnerId);
  const partnerColor = partner?.color || '#1a1612';
  const carName = nickname || 'your car';

  // Initialize ranked causes when partner changes
  useEffect(() => {
    if (partnerId && ALL_PARTNER_CAUSES[partnerId]) {
      setRankedCauses(ALL_PARTNER_CAUSES[partnerId]);
      setHasReorderedCauses(false);
    }
  }, [partnerId]);

  // Calculate fill percent based on step
  const getFillPercent = () => {
    if (step <= 3) return Math.max(0, (step - 2) * 0.05);
    if (step === 3) return 0.15;
    if (step === 4) return colorHex ? 0.5 : 0.2;
    if (step <= 10) return 0.55 + (step - 6) * 0.075;
    return 1;
  };

  // Navigation
  const goTo = (s: number) => {
    if (s === TOTAL_STEPS - 1) setShowConfetti(true);
    setStep(s);
  };
  const next = () => goTo(step + 1);
  const back = () => goTo(Math.max(0, step - 1));

  // Helper to replace {car} in copy
  const replaceCar = (text: string | undefined) => text?.replace(/\{car\}/g, carName);

  // Story bar data
  const storyData = { year, color: colorName, make, model, nickname, reason };

  // Determine if we should use desktop layout
  const isDesktop = viewMode === 'desktop';
  const isMobile = viewMode === 'mobile';
  const isAuto = viewMode === 'auto';

  return (
    <>
      <Confetti active={showConfetti} />

      {/* Back to Landing */}
      <a
        href="/"
        style={{
          position: 'fixed',
          top: '16px',
          left: '16px',
          zIndex: 9999,
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          background: '#1a1612',
          borderRadius: '12px',
          padding: '10px 16px',
          boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
          color: '#fff',
          fontSize: '13px',
          fontWeight: 600,
          textDecoration: 'none',
          fontFamily: 'var(--font-nunito), sans-serif',
          transition: 'all 0.2s ease',
        }}
      >
        ← Back
      </a>

      {/* Demo View Toggle */}
      <div style={{
        position: 'fixed',
        top: '16px',
        right: '16px',
        zIndex: 9999,
        display: 'flex',
        background: '#1a1612',
        borderRadius: '12px',
        padding: '4px',
        gap: '2px',
        boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
      }}>
        {(['mobile', 'auto', 'desktop'] as const).map((mode) => (
          <button
            key={mode}
            onClick={() => setViewMode(mode)}
            style={{
              padding: '8px 12px',
              borderRadius: '8px',
              border: 'none',
              background: viewMode === mode ? '#fff' : 'transparent',
              color: viewMode === mode ? '#1a1612' : '#8a7e70',
              fontSize: '11px',
              fontWeight: 700,
              fontFamily: 'var(--font-nunito), sans-serif',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
            }}
          >
            {mode === 'mobile' ? '📱' : mode === 'desktop' ? '🖥️' : '🔄'} {mode}
          </button>
        ))}
      </div>

      <div
        className={`min-h-screen transition-colors duration-700 ease-in-out ${
          isMobile ? 'flex items-center justify-center p-8' :
          isDesktop ? '' :
          'lg:flex lg:items-center lg:justify-center lg:p-12'
        }`}
        style={{
          background: `linear-gradient(135deg, ${partnerColor}15 0%, #f7f5f2 100%)`
        }}
      >
        <div
          className={`w-full relative bg-white overflow-hidden transition-all duration-300 ${
            isMobile
              ? 'max-w-[375px] min-h-[700px] rounded-[40px] border border-[#e4ddd2] shadow-2xl'
              : isDesktop
              ? 'min-h-screen'
              : 'lg:max-w-[480px] min-h-screen lg:min-h-[700px] lg:rounded-[40px] lg:border lg:border-[#e4ddd2] shadow-none lg:shadow-2xl'
          }`}
        >
          <ProgressBar step={step} total={TOTAL_STEPS - 1} color={partnerColor} />
          {step > 0 && step < TOTAL_STEPS - 1 && <BackButton onClick={back} />}
          <StoryBar data={storyData} step={step} partner={partner} />

          <div className={`relative ${isMobile ? 'min-h-[700px]' : isDesktop ? 'min-h-screen' : 'min-h-screen lg:min-h-[700px]'}`}>
            {/* Step 0: Welcome */}
            <Screen active={step === 0}>
              {/* Hero */}
              <section style={{ textAlign: "center", paddingBottom: "24px" }}>
                <CarSketchHero />
                <h1 style={{
                  fontFamily: "var(--font-fraunces), serif",
                  fontSize: "clamp(28px, 7vw, 36px)",
                  fontWeight: 900,
                  lineHeight: 1.1,
                  color: "#1a1612",
                  marginBottom: "14px",
                  letterSpacing: "-0.5px",
                }}>
                  Every car has<br />a story.
                </h1>
                <p style={{
                  fontSize: "15px",
                  fontWeight: 400,
                  color: "#7a6f63",
                  lineHeight: 1.65,
                  maxWidth: "340px",
                  margin: "0 auto 20px",
                }}>
                  Yours carried you through life. Now it can fund the causes you care about most &mdash; from fighting childhood cancer to feeding seniors to protecting wild places.
                </p>
                <Button onClick={next}>Donate my car &rarr;</Button>
                <p style={{
                  fontSize: "12px",
                  color: "#b8a99a",
                  marginTop: "12px",
                  fontWeight: 500,
                }}>
                  Free pickup &middot; Tax deductible &middot; Takes ~3 minutes
                </p>
              </section>

              {/* How it works */}
              <section style={{ paddingTop: "24px", paddingBottom: "24px" }}>
                <p style={{
                  fontSize: "10px",
                  fontWeight: 800,
                  color: "#b8a99a",
                  textTransform: "uppercase",
                  letterSpacing: "2px",
                  marginBottom: "16px",
                  textAlign: "center",
                }}>How it works</p>
                <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
                  {[
                    { n: "01", t: "Choose a cause", d: "Pick from 10,000+ nonprofits." },
                    { n: "02", t: "Tell us about your car", d: "Any vehicle, any condition." },
                    { n: "03", t: "We handle the rest", d: "Free pickup. Your nonprofit gets the proceeds." },
                  ].map((s, i) => (
                    <div key={i} style={{
                      display: "flex",
                      gap: "14px",
                      alignItems: "flex-start",
                      padding: "14px 0",
                      borderBottom: i < 2 ? "1px solid #e8e0d5" : "none",
                    }}>
                      <span style={{
                        fontFamily: "var(--font-fraunces), serif",
                        fontSize: "24px",
                        fontWeight: 300,
                        color: "#d4cdc2",
                        lineHeight: 1,
                        minWidth: "32px",
                      }}>{s.n}</span>
                      <div>
                        <p style={{
                          fontFamily: "var(--font-fraunces), serif",
                          fontSize: "15px",
                          fontWeight: 700,
                          color: "#1a1612",
                          margin: "0 0 2px",
                        }}>{s.t}</p>
                        <p style={{
                          fontSize: "13px",
                          color: "#9a8e7e",
                          lineHeight: 1.4,
                          margin: 0,
                        }}>{s.d}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Impact numbers */}
              <section style={{ paddingTop: "16px", paddingBottom: "24px" }}>
                <div style={{
                  background: "#1a1612",
                  borderRadius: "20px",
                  padding: "24px 20px",
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "20px",
                }}>
                  {[
                    { val: 600, pre: "$", suf: "M+", label: "to nonprofits" },
                    { val: 10000, pre: "", suf: "+", label: "partners" },
                    { val: 100000, pre: "", suf: "+", label: "vehicles/year" },
                    { val: 20, pre: "", suf: "+ yrs", label: "trusted service" },
                  ].map((s, i) => (
                    <div key={i} style={{ textAlign: "center" }}>
                      <p style={{
                        fontFamily: "var(--font-fraunces), serif",
                        fontSize: "clamp(20px, 5vw, 26px)",
                        fontWeight: 900,
                        color: "#f5efe7",
                        lineHeight: 1,
                        margin: "0 0 4px",
                      }}>
                        <AnimatedNumber target={s.val} prefix={s.pre} suffix={s.suf} duration={1800 + i * 200} />
                      </p>
                      <p style={{
                        fontSize: "10px",
                        fontWeight: 600,
                        color: "#8a7e70",
                        lineHeight: 1.3,
                        margin: 0,
                        textTransform: "uppercase",
                        letterSpacing: "0.5px",
                      }}>{s.label}</p>
                    </div>
                  ))}
                </div>
              </section>

              {/* Donor stories */}
              <section style={{ paddingTop: "8px", paddingBottom: "24px" }}>
                <p style={{
                  fontSize: "10px",
                  fontWeight: 800,
                  color: "#b8a99a",
                  textTransform: "uppercase",
                  letterSpacing: "2px",
                  marginBottom: "14px",
                  textAlign: "center",
                }}>Real donor stories</p>
                <div style={{
                  background: "#faf8f4",
                  borderRadius: "20px",
                  padding: "20px 18px",
                  border: "1px solid #ede7dd",
                }}>
                  <StoryCarousel />
                </div>
              </section>

              {/* What we accept */}
              <section style={{ paddingTop: "8px", paddingBottom: "24px", textAlign: "center" }}>
                <p style={{
                  fontSize: "10px",
                  fontWeight: 800,
                  color: "#b8a99a",
                  textTransform: "uppercase",
                  letterSpacing: "2px",
                  marginBottom: "14px",
                }}>We accept almost anything</p>
                <div style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "8px",
                  justifyContent: "center",
                }}>
                  {[
                    { e: "\uD83D\uDE97", t: "Cars" },
                    { e: "\uD83D\uDE99", t: "SUVs" },
                    { e: "\uD83D\uDEFB", t: "Trucks" },
                    { e: "\uD83D\uDE90", t: "Vans" },
                    { e: "\uD83C\uDFCD\uFE0F", t: "Motorcycles" },
                    { e: "\uD83D\uDEA4", t: "Boats" },
                    { e: "\uD83C\uDFCE\uFE0F", t: "RVs" },
                  ].map((v, i) => (
                    <span key={i} style={{
                      background: "#faf8f4",
                      border: "1px solid #e8e0d5",
                      borderRadius: "40px",
                      padding: "6px 12px",
                      fontSize: "12px",
                      fontWeight: 600,
                      color: "#6b5e50",
                      display: "flex",
                      alignItems: "center",
                      gap: "5px",
                      whiteSpace: "nowrap",
                    }}>
                      <span style={{ fontSize: "14px" }}>{v.e}</span> {v.t}
                    </span>
                  ))}
                </div>
              </section>

              {/* Bottom CTA */}
              <section style={{ paddingTop: "8px", paddingBottom: "32px", textAlign: "center" }}>
                <div style={{
                  background: "linear-gradient(135deg, #f5efe7, #ede5da)",
                  borderRadius: "20px",
                  padding: "28px 20px",
                  border: "1px solid #e4ddd2",
                }}>
                  <h2 style={{
                    fontFamily: "var(--font-fraunces), serif",
                    fontSize: "clamp(18px, 5vw, 22px)",
                    fontWeight: 900,
                    color: "#1a1612",
                    lineHeight: 1.2,
                    marginBottom: "10px",
                  }}>
                    Ready to write the next chapter?
                  </h2>
                  <p style={{
                    fontSize: "13px",
                    color: "#9a8e7e",
                    lineHeight: 1.6,
                    marginBottom: "18px",
                    maxWidth: "300px",
                    margin: "0 auto 18px",
                  }}>
                    It takes about 3 minutes. We&rsquo;ll pick up your vehicle for free and send the proceeds to your chosen nonprofit.
                  </p>
                  <Button onClick={next}>Start my donation</Button>
                </div>

                {/* Trust badges */}
                <div style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "12px",
                  marginTop: "18px",
                  flexWrap: "wrap",
                }}>
                  {[
                    "501(c)(3)",
                    "A+ BBB",
                    "ISO 9001",
                  ].map((b, i) => (
                    <span key={i} style={{
                      fontSize: "10px",
                      fontWeight: 700,
                      color: "#c0b5a5",
                      letterSpacing: "0.5px",
                      display: "flex",
                      alignItems: "center",
                      gap: "3px",
                    }}>
                      <span style={{ color: "#d4cdc2" }}>&check;</span> {b}
                    </span>
                  ))}
                </div>

                <p style={{
                  fontSize: "11px",
                  color: "#d4cdc2",
                  marginTop: "20px",
                  lineHeight: 1.5,
                }}>
                  CARS &middot; San Diego, CA &middot; Since 2003
                </p>
              </section>
            </Screen>

            {/* Step 1: Partner Select */}
            <Screen active={step === 1}>
              {/* Header */}
              <div style={{ marginBottom: "6px" }}>
                <p style={{
                  fontSize: "11px",
                  fontWeight: 800,
                  color: "#c0b5a5",
                  textTransform: "uppercase",
                  letterSpacing: "2.5px",
                  marginBottom: "12px",
                }}>
                  Step 1 of 5
                </p>
                <h1 style={{
                  fontFamily: "var(--font-fraunces), serif",
                  fontSize: "clamp(26px, 6.5vw, 34px)",
                  fontWeight: 900,
                  lineHeight: 1.1,
                  color: "#1a1612",
                  marginBottom: "10px",
                }}>
                  Who do you want<br />to help?
                </h1>
                <p style={{
                  fontSize: "15px",
                  color: "#9a8e7e",
                  lineHeight: 1.55,
                  marginBottom: "6px",
                  maxWidth: "360px",
                }}>
                  Your vehicle donation directly supports the nonprofit you choose. Tap to learn more.
                </p>
              </div>

              {/* Partner cards */}
              <div style={{ display: "flex", flexDirection: "column", gap: "14px", marginBottom: "20px" }}>
                {PARTNERS_DATA.map(p => (
                  <PartnerCard
                    key={p.id}
                    partner={p}
                    isSelected={partnerId === p.id}
                    isExpanded={expandedPartner === p.id}
                    onSelect={(id) => {
                      setPartnerId(id as PartnerId);
                      next();
                    }}
                    onExpand={(id) => setExpandedPartner(prev => prev === id ? null : id)}
                  />
                ))}
              </div>

              {/* Search hint */}
              <div style={{ textAlign: "center", paddingBottom: "20px" }}>
                <button style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  fontSize: "13px",
                  fontWeight: 600,
                  color: "#b8a99a",
                  fontFamily: "var(--font-nunito), sans-serif",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  padding: "10px 16px",
                  borderRadius: "40px",
                  transition: "all 0.2s ease",
                }}>
                  <span style={{ fontSize: "14px" }}>🔍</span>
                  Search 10,000+ other nonprofits
                </button>
              </div>
            </Screen>

            {/* Step 2: Nickname */}
            <Screen active={step === 2}>
              {/* Car sketch */}
              <div style={{ marginBottom: "16px", opacity: 0.85 }}>
                <CarVisual bodyType="" fillColor="#d4cdc2" fillPercent={nickname ? 0.12 : 0.05} nickname="" />
              </div>

              {/* Live name preview */}
              {nickname && (
                <p style={{
                  fontFamily: "var(--font-fraunces), serif",
                  fontSize: "22px",
                  fontWeight: 800,
                  color: partnerColor,
                  textAlign: "center",
                  marginBottom: "16px",
                  letterSpacing: "-0.3px",
                }}>
                  &ldquo;{nickname}&rdquo;
                </p>
              )}

              {/* Header */}
              <h1 style={{
                fontFamily: "var(--font-fraunces), serif",
                fontSize: "clamp(26px, 6.5vw, 34px)",
                fontWeight: 900,
                lineHeight: 1.12,
                color: "#1a1612",
                marginBottom: "10px",
              }}>
                First, let&rsquo;s give it<br />a proper goodbye.
              </h1>

              <p style={{
                fontSize: "15px",
                color: "#9a8e7e",
                lineHeight: 1.6,
                maxWidth: "380px",
                marginBottom: "24px",
              }}>
                Did your car ever earn a name? A lot of donors tell us theirs had one &mdash; and it makes the whole story better.
              </p>

              {/* Input */}
              <div style={{ marginBottom: "24px" }}>
                <Input
                  value={nickname}
                  onChange={setNickname}
                  placeholder="What did you call it?"
                  big
                />

                {/* Suggested names - only show when empty */}
                {!nickname && (
                  <div style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "8px",
                    marginTop: "12px",
                    alignItems: "center",
                  }}>
                    <span style={{
                      fontSize: "12px",
                      fontWeight: 600,
                      color: "#c0b5a5",
                      marginRight: "4px",
                    }}>Popular:</span>
                    {SUGGESTED_NAMES.map((s) => (
                      <button
                        key={s}
                        onClick={() => setNickname(s)}
                        style={{
                          padding: "7px 14px",
                          borderRadius: "40px",
                          border: "1.5px solid #e4ddd2",
                          background: "#fff",
                          cursor: "pointer",
                          fontSize: "13px",
                          fontWeight: 600,
                          fontFamily: "var(--font-nunito), sans-serif",
                          color: "#7a6f63",
                          transition: "all 0.2s ease",
                        }}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Buttons */}
              {nickname ? (
                <>
                  <Button onClick={next} color={partnerColor}>
                    That&rsquo;s {nickname}. Let&rsquo;s keep going. &rarr;
                  </Button>
                  <button
                    onClick={() => { setNickname(''); next(); }}
                    style={{
                      width: "100%",
                      padding: "14px 24px",
                      background: "transparent",
                      border: "none",
                      color: "#b8a99a",
                      fontSize: "14px",
                      fontWeight: 600,
                      fontFamily: "var(--font-nunito), sans-serif",
                      cursor: "pointer",
                      marginTop: "8px",
                    }}
                  >
                    Actually, skip this
                  </button>
                </>
              ) : (
                <Button onClick={next} variant="secondary">
                  It never had a name &mdash; skip
                </Button>
              )}
            </Screen>

            {/* Step 3: Vehicle Info + Body Type */}
            <Screen active={step === 3}>
              {/* Header */}
              <div style={{ marginBottom: "20px" }}>
                <p style={{
                  fontSize: "11px",
                  fontWeight: 800,
                  color: "#c0b5a5",
                  textTransform: "uppercase",
                  letterSpacing: "2.5px",
                  marginBottom: "10px",
                }}>Step 2 of 5</p>

                <h1 style={{
                  fontFamily: "var(--font-fraunces), serif",
                  fontSize: "clamp(26px, 6vw, 34px)",
                  fontWeight: 900,
                  lineHeight: 1.12,
                  color: "#1a1612",
                  marginBottom: "8px",
                }}>
                  Tell us about{" "}
                  <span style={{ color: partnerColor }}>{carName}</span>.
                </h1>

                <p style={{ fontSize: "14px", color: "#9a8e7e", lineHeight: 1.55 }}>
                  We&rsquo;ll use this to get the best value for {partner?.shortName || 'your nonprofit'}.{" "}
                  <span style={{ color: "#b8a99a" }}>Any vehicle, any condition.</span>
                </p>
              </div>

              {/* Live summary chip */}
              {year && (
                <div style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "8px 16px",
                  borderRadius: "40px",
                  background: partner?.colorLight || "rgba(59,125,140,0.06)",
                  border: `1.5px solid ${partner?.colorMid || "rgba(59,125,140,0.12)"}`,
                  marginBottom: "18px",
                  transition: "all 0.3s ease",
                }}>
                  <span style={{ fontSize: "14px" }}>🚗</span>
                  <span style={{
                    fontFamily: "var(--font-fraunces), serif",
                    fontSize: "14px",
                    fontWeight: 700,
                    color: partnerColor,
                  }}>
                    {[year, make, model].filter(Boolean).join(" ")}
                  </span>
                </div>
              )}

              {/* Year - always visible */}
              <SelectField
                label="Year"
                value={year}
                options={YEARS.map(String)}
                placeholder="What year?"
                onChange={setYear}
                disabled={false}
                accentColor={partnerColor}
                accentLight={partner?.colorLight || "rgba(59,125,140,0.06)"}
              />

              {/* Make - appears after year */}
              <div style={{
                maxHeight: year ? "500px" : "0",
                opacity: year ? 1 : 0,
                overflow: "clip",
                transition: "max-height 0.4s cubic-bezier(0.4,0,0.2,1), opacity 0.3s ease 0.1s",
              }}>
                <SelectField
                  label="Make"
                  value={make}
                  options={MAKES}
                  placeholder="Who made it?"
                  onChange={setMake}
                  disabled={!year}
                  accentColor={partnerColor}
                  accentLight={partner?.colorLight || "rgba(59,125,140,0.06)"}
                />
              </div>

              {/* Model - appears after make */}
              <div style={{
                maxHeight: year && make ? "500px" : "0",
                opacity: year && make ? 1 : 0,
                overflow: "clip",
                transition: "max-height 0.4s cubic-bezier(0.4,0,0.2,1) 0.1s, opacity 0.3s ease 0.2s",
              }}>
                <div style={{ marginBottom: "14px" }}>
                  <label style={{
                    display: "block",
                    fontSize: "11px",
                    fontWeight: 800,
                    color: "#b8a99a",
                    textTransform: "uppercase",
                    letterSpacing: "1.5px",
                    marginBottom: "6px",
                    fontFamily: "var(--font-nunito), sans-serif",
                  }}>Model</label>
                  <input
                    type="text"
                    value={model}
                    onChange={(e) => setModel(e.target.value)}
                    placeholder={make ? `e.g. ${make === "Toyota" ? "Camry" : make === "Honda" ? "Civic" : make === "Ford" ? "F-150" : make === "Tesla" ? "Model 3" : "..."}` : "e.g. Camry, Civic, F-150"}
                    style={{
                      width: "100%",
                      padding: "14px 16px",
                      borderRadius: "14px",
                      border: "2px solid #e4ddd2",
                      background: "#fff",
                      fontSize: "16px",
                      fontFamily: "var(--font-nunito), sans-serif",
                      fontWeight: 600,
                      color: "#1a1612",
                      outline: "none",
                      transition: "all 0.2s ease",
                    }}
                  />
                </div>
              </div>

              {/* Body type - appears after model */}
              <div style={{
                maxHeight: year && make && model ? "300px" : "0",
                opacity: year && make && model ? 1 : 0,
                overflow: "hidden",
                transition: "max-height 0.5s cubic-bezier(0.4,0,0.2,1) 0.1s, opacity 0.3s ease 0.2s",
              }}>
                <label style={{
                  display: "block",
                  fontSize: "11px",
                  fontWeight: 800,
                  color: "#b8a99a",
                  textTransform: "uppercase",
                  letterSpacing: "1.5px",
                  marginBottom: "10px",
                  fontFamily: "var(--font-nunito), sans-serif",
                }}>What kind of vehicle?</label>

                <div style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr 1fr",
                  gap: "10px",
                  marginBottom: "20px",
                }}>
                  {BODY_TYPES.map((bt) => {
                    const sel = bodyType === bt.id;
                    const iconFn = BODY_TYPE_ICONS[bt.id];
                    return (
                      <button
                        key={bt.id}
                        onClick={() => setBodyType(bt.id)}
                        style={{
                          padding: "14px 8px 12px",
                          borderRadius: "16px",
                          border: `2px solid ${sel ? partnerColor : "#e4ddd2"}`,
                          background: sel ? (partner?.colorLight || "rgba(59,125,140,0.06)") : "#fff",
                          cursor: "pointer",
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          gap: "6px",
                          transition: "all 0.2s ease",
                          boxShadow: sel ? `0 4px 16px ${partnerColor}15` : "0 2px 8px rgba(0,0,0,0.02)",
                        }}
                      >
                        {iconFn ? iconFn(sel ? partnerColor : "#b8a99a") : <span style={{ fontSize: "24px" }}>{bt.emoji}</span>}
                        <span style={{
                          fontSize: "12px",
                          fontWeight: 700,
                          color: sel ? partnerColor : "#7a6f63",
                          fontFamily: "var(--font-nunito), sans-serif",
                          transition: "color 0.2s ease",
                        }}>{bt.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* CTA - only appears when all fields complete */}
              <div style={{
                opacity: year && make && model && bodyType ? 1 : 0,
                transform: year && make && model && bodyType ? "translateY(0)" : "translateY(12px)",
                transition: "all 0.3s ease",
                pointerEvents: year && make && model && bodyType ? "auto" : "none",
              }}>
                <Button onClick={next} color={partnerColor}>
                  {bodyType
                    ? `Got it — a ${year} ${make} ${BODY_TYPES.find(b => b.id === bodyType)?.label || ""}`
                    : "Continue"
                  } &rarr;
                </Button>
              </div>
            </Screen>

            {/* Step 5: Color */}
            <Screen active={step === 4}>
              <div className="text-center">
                <div className="mb-4">
                  <CarVisual
                    bodyType={bodyType}
                    fillColor={colorHex || '#d4cdc2'}
                    fillPercent={colorHex ? 0.5 : 0.2}
                    nickname={nickname}
                    year={year}
                    make={make}
                    model={model}
                  />
                </div>
                <h2 className="font-serif text-[clamp(24px,5vw,34px)] font-black leading-[1.2] mb-4 text-[#1a1612]">
                  What color is {carName}?
                </h2>
                <p className="text-[15px] text-[#9a8e7e] leading-[1.5] mb-8 font-sans">
                  Tap to paint it.
                </p>
                <div className="flex flex-wrap gap-3 mb-10 justify-center">
                  {COLORS.map((c) => (
                    <ColorDot
                      key={c.name}
                      color={c}
                      selected={colorName === c.name}
                      onClick={() => {
                        setColorName(c.name);
                        setColorHex(c.hex);
                      }}
                    />
                  ))}
                </div>
                <Button onClick={next} disabled={!colorName} color={partnerColor}>
                  Continue
                </Button>
              </div>
            </Screen>

            {/* Step 6: Reason */}
            <Screen active={step === 5}>
              <div className="mb-6">
                <CarVisual
                  bodyType={bodyType}
                  fillColor={colorHex}
                  fillPercent={0.55}
                  nickname={nickname}
                  year={year}
                  make={make}
                  model={model}
                />
              </div>
              {partner && (
                <>
                  <Header>{replaceCar(partner.reason.h)}</Header>
                  <SubText>{replaceCar(partner.reason.s)}</SubText>
                </>
              )}
              <div className="flex flex-col gap-2.5 mb-8">
                {REASONS.map((r) => (
                  <Chip key={r.id} selected={reason === r.id} onClick={() => setReason(r.id)} accentColor={partnerColor}>
                    <span className="text-xl">{r.emoji}</span>
                    <span>{r.text}</span>
                  </Chip>
                ))}
              </div>
              <Button onClick={next} disabled={!reason} color={partnerColor}>
                Continue
              </Button>
            </Screen>

            {/* Step 7: Memories */}
            <Screen active={step === 6}>
              {partner && (
                <>
                  <Header>{replaceCar(partner.memories.h)}</Header>
                  <SubText>{replaceCar(partner.memories.s)}</SubText>
                </>
              )}
              <p style={{
                fontSize: "12px",
                fontWeight: 600,
                color: "#b8a99a",
                marginBottom: "12px",
                marginTop: "4px",
              }}>
                Choose all that apply
              </p>
              <div className="grid grid-cols-2 gap-2.5 mb-10">
                {MEMORIES.map((m) => (
                  <Chip
                    key={m.id}
                    selected={memories.includes(m.id)}
                    onClick={() =>
                      setMemories((prev) =>
                        prev.includes(m.id) ? prev.filter((x) => x !== m.id) : [...prev, m.id]
                      )
                    }
                    className="justify-center flex-col gap-1 py-[18px] px-3 text-center"
                    accentColor={partnerColor}
                  >
                    <span className="text-2xl">{m.emoji}</span>
                    <span className="text-[13px]">{m.text}</span>
                  </Chip>
                ))}
              </div>
              <Button onClick={next} color={partnerColor}>
                {memories.length > 0 ? 'Continue' : 'Skip'}
              </Button>
            </Screen>

            {/* Step 8: Condition */}
            <Screen active={step === 7}>
              <div className="mb-6">
                <CarVisual
                  bodyType={bodyType}
                  fillColor={colorHex}
                  fillPercent={0.65}
                  nickname={nickname}
                  year={year}
                  make={make}
                  model={model}
                />
              </div>
              {partner && (
                <>
                  <Header>{replaceCar(partner.condition.h)}</Header>
                  <SubText>{replaceCar(partner.condition.s)}</SubText>
                </>
              )}
              <div className="flex flex-col gap-2.5 mb-8">
                {CONDITIONS.map((c) => (
                  <Chip key={c.id} selected={condition === c.id} onClick={() => setCondition(c.id)} accentColor={partnerColor}>
                    <span className="text-xl">{c.icon}</span>
                    <div>
                      <div className="font-bold">{c.text}</div>
                      <div className="text-xs opacity-60 mt-0.5">{c.description}</div>
                    </div>
                  </Chip>
                ))}
              </div>
              <Button onClick={next} disabled={!condition} color={partnerColor}>
                Continue
              </Button>
            </Screen>

            {/* Step 9: Tow Access */}
            <Screen active={step === 8}>
              <Header>Can a tow truck reach {carName}?</Header>
              <SubText>Free pickup — just need access info.</SubText>
              <div className="flex flex-col gap-3 mb-10 mt-4">
                <Chip selected={towAccess === 'yes'} onClick={() => setTowAccess('yes')} accentColor={partnerColor}>
                  <span className="text-xl">✅</span>
                  <span>Yes, accessible</span>
                </Chip>
                <Chip selected={towAccess === 'no'} onClick={() => setTowAccess('no')} accentColor={partnerColor}>
                  <span className="text-xl">🚫</span>
                  <span>No, blocked or enclosed</span>
                </Chip>
              </div>
              <Button onClick={next} disabled={!towAccess} color={partnerColor}>
                Continue
              </Button>
            </Screen>

            {/* Step 10: Cause Ranking */}
            <Screen active={step === 9}>
              {/* Header */}
              <div style={{ marginBottom: "6px" }}>
                <p style={{
                  fontSize: "11px",
                  fontWeight: 800,
                  color: "#c0b5a5",
                  textTransform: "uppercase",
                  letterSpacing: "2.5px",
                  marginBottom: "10px",
                }}>
                  Step 3 of 5
                </p>

                <h1 style={{
                  fontFamily: "var(--font-fraunces), serif",
                  fontSize: "clamp(26px, 6vw, 34px)",
                  fontWeight: 900,
                  lineHeight: 1.12,
                  color: "#1a1612",
                  marginBottom: "8px",
                }}>
                  What matters most<br />to you?
                </h1>

                <p style={{
                  fontSize: "14px",
                  color: "#9a8e7e",
                  lineHeight: 1.55,
                  marginBottom: "4px",
                }}>
                  Drag to rank what resonates most.{" "}
                  {partner && <span style={{ color: partnerColor }}>{partner.causeSub}</span>}
                </p>
              </div>

              {/* Drag hint */}
              <div style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                padding: "10px 14px",
                borderRadius: "12px",
                background: "#faf8f4",
                border: "1px solid #e8e0d5",
                marginBottom: "16px",
              }}>
                <span style={{ fontSize: "16px" }}>↕️</span>
                <p style={{
                  fontSize: "12px",
                  color: "#9a8e7e",
                  fontWeight: 600,
                  margin: 0,
                }}>
                  Drag cards to reorder — your #1 choice will be highlighted
                </p>
              </div>

              {/* Draggable cause list */}
              {rankedCauses.length > 0 && (
                <div style={{ marginBottom: "20px" }}>
                  <DraggableList
                    items={rankedCauses}
                    onReorder={(newItems) => {
                      setRankedCauses(newItems);
                      setHasReorderedCauses(true);
                    }}
                    accentColor={partnerColor}
                    accentLight={partner?.colorLight || "rgba(59,125,140,0.08)"}
                  />
                </div>
              )}

              {/* Continue button */}
              <Button onClick={next} color={partnerColor}>
                {hasReorderedCauses ? "That's my ranking — continue" : "Skip ranking"} →
              </Button>

              {/* Story bar preview */}
              <div style={{
                marginTop: "20px",
                padding: "14px 16px",
                borderRadius: "14px",
                background: partner?.colorLight || "#faf8f4",
                border: `1px solid ${partner?.colorMid || "#e8e0d5"}`,
              }}>
                <p style={{
                  fontFamily: "var(--font-fraunces), serif",
                  fontSize: "13px",
                  fontStyle: "italic",
                  color: "#7a6f63",
                  lineHeight: 1.5,
                  margin: 0,
                }}>
                  I'm donating{" "}
                  <span style={{ fontWeight: 700, fontStyle: "normal", color: partnerColor }}>
                    {nickname || `my ${year ? year + " " : ""}${make || "car"}`}
                  </span>
                  {" "}to help{" "}
                  <span style={{ fontWeight: 700, fontStyle: "normal", color: partnerColor }}>
                    {partner?.shortName || "a great cause"}
                  </span>
                  {rankedCauses[0] && (
                    <> — especially {rankedCauses[0].label.toLowerCase()}</>
                  )}.
                </p>
              </div>
            </Screen>

            {/* Step 11: Story + VIN */}
            <Screen active={step === 10}>
              {/* Header */}
              <div style={{ marginBottom: "6px" }}>
                <p style={{
                  fontSize: "11px",
                  fontWeight: 800,
                  color: "#c0b5a5",
                  textTransform: "uppercase",
                  letterSpacing: "2.5px",
                  marginBottom: "10px",
                }}>Step 4 of 5</p>

                <h1 style={{
                  fontFamily: "var(--font-fraunces), serif",
                  fontSize: "clamp(26px, 6vw, 34px)",
                  fontWeight: 900,
                  lineHeight: 1.12,
                  color: "#1a1612",
                  marginBottom: "6px",
                }}>
                  Your donation story.
                </h1>
                <p style={{
                  fontSize: "14px",
                  color: "#9a8e7e",
                  lineHeight: 1.5,
                  marginBottom: "20px",
                }}>
                  Here&rsquo;s what we&rsquo;ll share with {partner?.shortName || 'your nonprofit'}.
                </p>
              </div>

              {/* Story Card */}
              {partner && (
                <div style={{
                  background: "#fff",
                  borderRadius: "24px",
                  border: `1.5px solid ${partner.colorMid}`,
                  boxShadow: `0 8px 40px ${partnerColor}08, 0 2px 8px rgba(0,0,0,0.03)`,
                  overflow: "hidden",
                  marginBottom: "24px",
                }}>
                  {/* Accent bar at top */}
                  <div style={{ height: "4px", background: partnerColor }} />

                  {/* Car visual */}
                  <div style={{
                    padding: "24px 24px 12px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}>
                    <CarVisual
                      bodyType={bodyType}
                      fillColor={colorHex}
                      fillPercent={1}
                      nickname=""
                      year=""
                      make=""
                      model=""
                    />
                    <p style={{
                      fontFamily: "var(--font-fraunces), serif",
                      fontSize: "15px",
                      fontWeight: 700,
                      color: "#1a1612",
                      marginTop: "8px",
                      textAlign: "center",
                    }}>
                      {nickname && (
                        <span style={{ color: partnerColor }}>
                          &ldquo;{nickname}&rdquo; &mdash;{" "}
                        </span>
                      )}
                      {year} {colorName} {make} {model}
                    </p>
                  </div>

                  {/* Divider */}
                  <div style={{ height: "1px", background: "#f0ebe3", margin: "0 24px" }} />

                  {/* Story text */}
                  <div style={{ padding: "20px 24px" }}>
                    <p style={{
                      fontFamily: "var(--font-fraunces), serif",
                      fontSize: "18px",
                      fontWeight: 400,
                      color: "#3a3632",
                      lineHeight: 1.65,
                      fontStyle: "italic",
                    }}>
                      &ldquo;I&rsquo;m donating{" "}
                      <span style={{ fontWeight: 700, fontStyle: "normal" }}>
                        {nickname || `my ${year} ${make} ${model}`}
                      </span>
                      {reason && (
                        <> because I&rsquo;m {REASONS.find((r) => r.id === reason)?.text}</>
                      )}.
                      {memories.length > 0 && (
                        <>
                          {" "}This car gave me{" "}
                          <span style={{ fontWeight: 700, fontStyle: "normal" }}>
                            {memories.length === 1
                              ? MEMORIES.find((x) => x.id === memories[0])?.text.toLowerCase()
                              : memories.slice(0, -1).map(m => MEMORIES.find((x) => x.id === m)?.text.toLowerCase()).join(", ") +
                                " and " + MEMORIES.find((x) => x.id === memories[memories.length - 1])?.text.toLowerCase()
                            }
                          </span>.
                        </>
                      )}
                      {" "}Now it&rsquo;s going to {partner.shortName} &mdash;{" "}
                      <span style={{ color: partnerColor, fontWeight: 700, fontStyle: "normal" }}>
                        {partner.story}
                      </span>.&rdquo;
                    </p>
                  </div>

                  {/* Partner footer */}
                  <div style={{
                    padding: "14px 24px 18px",
                    background: partner.colorLight,
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                  }}>
                    <div style={{
                      width: "8px",
                      height: "8px",
                      borderRadius: "50%",
                      background: partnerColor,
                    }} />
                    <p style={{
                      fontSize: "12px",
                      fontWeight: 700,
                      color: partnerColor,
                      letterSpacing: "0.3px",
                    }}>
                      Benefiting {partner.name}
                    </p>
                  </div>
                </div>
              )}

              {/* Vehicle Details - Required */}
              <div style={{
                padding: "20px",
                borderRadius: "16px",
                border: "1.5px solid #e8e0d5",
                background: "#fdfcfa",
                marginBottom: "20px",
              }}>
                <p style={{
                  fontSize: "12px",
                  fontWeight: 700,
                  color: "#b8a99a",
                  textTransform: "uppercase",
                  letterSpacing: "1.5px",
                  marginBottom: "14px",
                }}>
                  Vehicle details
                </p>

                {/* VIN */}
                <div style={{ marginBottom: "12px" }}>
                  <label style={{
                    display: "block",
                    fontSize: "11px",
                    fontWeight: 800,
                    color: "#b8a99a",
                    textTransform: "uppercase",
                    letterSpacing: "1.5px",
                    marginBottom: "5px",
                    fontFamily: "var(--font-nunito), sans-serif",
                  }}>
                    VIN <span style={{ color: partnerColor }}>*</span>
                  </label>
                  <input
                    type="text"
                    value={vin}
                    onChange={(e) => setVin(e.target.value.toUpperCase())}
                    onFocus={() => setVinFocused(true)}
                    onBlur={() => setVinFocused(false)}
                    placeholder="17-character number"
                    maxLength={17}
                    style={{
                      width: "100%",
                      padding: "12px 14px",
                      borderRadius: "12px",
                      border: `2px solid ${vinFocused ? partnerColor : "#e4ddd2"}`,
                      background: "#fff",
                      fontSize: "15px",
                      fontFamily: "var(--font-nunito), sans-serif",
                      fontWeight: 600,
                      color: "#1a1612",
                      outline: "none",
                      letterSpacing: "1px",
                      boxShadow: vinFocused ? `0 0 0 4px ${partner?.colorLight || "rgba(59,125,140,0.06)"}` : "none",
                      transition: "all 0.2s ease",
                    }}
                  />
                  <p style={{
                    fontSize: "11px",
                    color: "#c0b5a5",
                    marginTop: "4px",
                  }}>
                    Found on your registration, title, or driver&rsquo;s side door frame.
                  </p>
                </div>

                {/* Mileage */}
                <div>
                  <label style={{
                    display: "block",
                    fontSize: "11px",
                    fontWeight: 800,
                    color: "#b8a99a",
                    textTransform: "uppercase",
                    letterSpacing: "1.5px",
                    marginBottom: "5px",
                    fontFamily: "var(--font-nunito), sans-serif",
                  }}>
                    Approximate mileage <span style={{ color: partnerColor }}>*</span>
                  </label>
                  <input
                    type="text"
                    value={mileage}
                    onChange={(e) => setMileage(e.target.value.replace(/\D/g, ""))}
                    onFocus={() => setMileFocused(true)}
                    onBlur={() => setMileFocused(false)}
                    placeholder="e.g. 85,000"
                    style={{
                      width: "100%",
                      padding: "12px 14px",
                      borderRadius: "12px",
                      border: `2px solid ${mileFocused ? partnerColor : "#e4ddd2"}`,
                      background: "#fff",
                      fontSize: "15px",
                      fontFamily: "var(--font-nunito), sans-serif",
                      fontWeight: 600,
                      color: "#1a1612",
                      outline: "none",
                      boxShadow: mileFocused ? `0 0 0 4px ${partner?.colorLight || "rgba(59,125,140,0.06)"}` : "none",
                      transition: "all 0.2s ease",
                    }}
                  />
                </div>
              </div>

              {/* CTA - disabled until VIN (17 chars) and mileage are filled */}
              <Button
                onClick={next}
                disabled={vin.length < 17 || mileage.length === 0}
                color={vin.length >= 17 && mileage.length > 0 ? partnerColor : "#d4cdc2"}
              >
                This is my story &mdash; let&rsquo;s finish up &rarr;
              </Button>
            </Screen>

            {/* Step 12: Contact */}
            <Screen active={step === 11}>
              <Header>Where should we pick up {carName}?</Header>
              <SubText>Free tow, no cost to you.</SubText>
              <div className="mt-2 mb-10">
                <div className="grid grid-cols-2 gap-2.5">
                  <Input label="First name" value={firstName} onChange={setFirstName} />
                  <Input label="Last name" value={lastName} onChange={setLastName} />
                </div>
                <div className="grid grid-cols-2 gap-2.5">
                  <Input label="Email" value={email} onChange={setEmail} type="email" />
                  <Input label="Phone" value={phone} onChange={setPhone} type="tel" />
                </div>
                <Input label="Street address" value={address} onChange={setAddress} />
                <div className="grid grid-cols-[2fr_1fr_1fr] gap-2.5">
                  <Input label="City" value={city} onChange={setCity} />
                  <Select label="State" value={state} onChange={setState} options={STATES} />
                  <Input label="Zip" value={zip} onChange={setZip} />
                </div>
              </div>
              <Button onClick={next} color={partnerColor}>
                One more step →
              </Button>
            </Screen>

            {/* Step 13: Title */}
            <Screen active={step === 12}>
              <Header>Title & registration</Header>
              <SubText>The legal bits.</SubText>
              <div className="mt-6 mb-6">
                <Input label="Name on title" value={titleName} onChange={setTitleName} />
                <div className="grid grid-cols-2 gap-3 mt-1">
                  <Select label="Titling state" value={titleState} onChange={setTitleState} options={STATES} />
                  <Select label="Registration state" value={regState} onChange={setRegState} options={STATES} />
                </div>
                <div className="mt-1">
                  <Input label="License plate (optional)" value={plate} onChange={setPlate} />
                </div>
              </div>
              <p className="text-[11px] font-bold text-[#a09484] uppercase tracking-[1.2px] mb-3 font-sans">
                Clean title?
              </p>
              <div className="grid grid-cols-2 gap-3 mb-8">
                <Chip selected={cleanTitle === 'yes'} onClick={() => setCleanTitle('yes')} accentColor={partnerColor}>
                  Yes
                </Chip>
                <Chip selected={cleanTitle === 'no'} onClick={() => setCleanTitle('no')} accentColor={partnerColor}>
                  No
                </Chip>
              </div>
              <div className="mt-4">
                <Button onClick={next} color={partnerColor}>
                  Review my donation →
                </Button>
              </div>
            </Screen>

            {/* Step 14: Review */}
            <Screen active={step === 13}>
              <div className="mb-8">
                <CarVisual
                  bodyType={bodyType}
                  fillColor={colorHex}
                  fillPercent={1}
                  nickname={nickname}
                  year={year}
                  make={make}
                  model={model}
                />
              </div>
              {partner && (
                <div
                  className="bg-white rounded-[24px] p-6 shadow-lg mb-10"
                  style={{ border: `2px solid ${partner.colorMid}` }}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div
                      className="w-11 h-11 rounded-[14px] flex items-center justify-center text-[22px]"
                      style={{ background: partner.colorLight }}
                    >
                      {partner.logo}
                    </div>
                    <div>
                      <p
                        className="text-[10px] font-bold uppercase tracking-[1.5px] font-sans"
                        style={{ color: partnerColor }}
                      >
                        Donating to
                      </p>
                      <p className="font-serif text-base font-black text-[#1a1612]">{partner.name}</p>
                    </div>
                  </div>
                  <p className="font-serif text-[17px] font-bold text-[#1a1612] leading-[1.5] mb-3">
                    {firstName || 'I'} {firstName ? 'is' : "'m"} donating {nickname ? `"${nickname}" — ` : ''}
                    {year ? `a ${year} ` : 'a '}
                    <span style={{ color: colorHex || 'inherit' }}>{colorName}</span> {make} {model}
                    {reason ? ` because ${REASONS.find((r) => r.id === reason)?.text}` : ''} —{' '}
                    {partner.story}.
                  </p>
                  {memories.length > 0 && (
                    <div className="flex gap-1.5 flex-wrap mb-3">
                      {memories.map((m) => {
                        const mem = MEMORIES.find((x) => x.id === m);
                        return (
                          <span
                            key={m}
                            className="bg-[#f5f0e8] rounded-[20px] py-1 px-3 text-xs font-semibold text-[#6b5e50]"
                          >
                            {mem?.emoji} {mem?.text}
                          </span>
                        );
                      })}
                    </div>
                  )}
                  <div className="border-t border-[#ede7dd] pt-3 text-[13px] text-[#a09484]">
                    {condition && (
                      <p className="my-1">
                        {CONDITIONS.find((c) => c.id === condition)?.icon}{' '}
                        {CONDITIONS.find((c) => c.id === condition)?.text}
                      </p>
                    )}
                    {city && (
                      <p className="my-1">
                        📍 {city}
                        {state ? `, ${state}` : ''}
                      </p>
                    )}
                  </div>
                </div>
              )}
              <Button onClick={next} color={partnerColor}>
                Confirm & submit 🎉
              </Button>
              <Button variant="text" onClick={() => goTo(0)}>
                Start over
              </Button>
            </Screen>

            {/* Step 15: Done - Completion Screen */}
            <Screen active={step === 14}>
              {partner && (
                <div>
                  {/* Hero headline with checkmark */}
                  <div style={{
                    textAlign: "center",
                    marginBottom: "32px",
                    animation: "fadeUp 0.8s cubic-bezier(0.4,0,0.2,1) 0.5s both",
                  }}>
                    <div style={{
                      width: "72px",
                      height: "72px",
                      borderRadius: "50%",
                      background: partner.colorLight,
                      border: `3px solid ${partner.colorMid}`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      margin: "0 auto 20px",
                      fontSize: "32px",
                      color: partnerColor,
                    }}>
                      ✓
                    </div>

                    <h1 style={{
                      fontFamily: "var(--font-fraunces), serif",
                      fontSize: "clamp(28px, 7vw, 38px)",
                      fontWeight: 900,
                      lineHeight: 1.1,
                      color: partnerColor,
                      marginBottom: "12px",
                    }}>
                      {partner.done.h}
                    </h1>

                    <p style={{
                      fontSize: "16px",
                      color: "#7a6f63",
                      lineHeight: 1.6,
                      maxWidth: "360px",
                      margin: "0 auto",
                    }}>
                      {partner.done.s}
                    </p>
                  </div>

                  {/* Mini story card */}
                  <div style={{
                    background: "#fff",
                    borderRadius: "20px",
                    border: `1.5px solid ${partner.colorMid}`,
                    boxShadow: `0 8px 32px ${partnerColor}08`,
                    overflow: "hidden",
                    marginBottom: "28px",
                    animation: "fadeUp 0.8s cubic-bezier(0.4,0,0.2,1) 0.9s both",
                  }}>
                    <div style={{ height: "4px", background: partnerColor }} />
                    <div style={{ padding: "20px" }}>
                      <p style={{
                        fontFamily: "var(--font-fraunces), serif",
                        fontSize: "16px",
                        fontStyle: "italic",
                        color: "#5a5247",
                        lineHeight: 1.6,
                      }}>
                        &ldquo;I&rsquo;m donating{" "}
                        <span style={{ fontWeight: 700, fontStyle: "normal", color: "#1a1612" }}>
                          {nickname || `my ${year} ${make} ${model}`}
                        </span>
                        {reason && <> because I&rsquo;m {REASONS.find((r) => r.id === reason)?.text}</>}.
                        {" "}Now it&rsquo;s going to {partner.shortName} &mdash;{" "}
                        <span style={{ color: partnerColor, fontWeight: 700, fontStyle: "normal" }}>
                          {partner.story}
                        </span>.&rdquo;
                      </p>
                      <div style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                        marginTop: "14px",
                        paddingTop: "14px",
                        borderTop: "1px solid #f0ebe3",
                      }}>
                        <div style={{
                          width: "6px",
                          height: "6px",
                          borderRadius: "50%",
                          background: partnerColor,
                        }} />
                        <p style={{
                          fontSize: "12px",
                          fontWeight: 700,
                          color: partnerColor,
                        }}>
                          {firstName ? `${firstName}'s` : "Your"} donation to {partner.name}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* What happens next timeline */}
                  <div style={{
                    marginBottom: "28px",
                    animation: "fadeUp 0.8s cubic-bezier(0.4,0,0.2,1) 1.1s both",
                  }}>
                    <p style={{
                      fontSize: "11px",
                      fontWeight: 800,
                      color: "#c0b5a5",
                      textTransform: "uppercase",
                      letterSpacing: "2.5px",
                      marginBottom: "16px",
                    }}>
                      What happens next
                    </p>

                    {[
                      { time: "Within 24 hrs", text: "We'll call to schedule your free pickup" },
                      { time: "1–3 days", text: "A tow partner picks up your vehicle" },
                      { time: "2–4 weeks", text: `Your vehicle is sold and proceeds go to ${partner.shortName}` },
                      { time: "By mail", text: "You'll receive your tax receipt for the donation" },
                    ].map((s, i, arr) => (
                      <div key={i} style={{
                        display: "flex",
                        gap: "14px",
                        alignItems: "flex-start",
                        marginBottom: i < arr.length - 1 ? "16px" : 0,
                      }}>
                        <div style={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          flexShrink: 0,
                          width: "16px",
                        }}>
                          <div style={{
                            width: "10px",
                            height: "10px",
                            borderRadius: "50%",
                            background: partnerColor,
                            border: `2px solid ${partner.colorMid}`,
                          }} />
                          {i < arr.length - 1 && (
                            <div style={{
                              width: "2px",
                              height: "24px",
                              background: "#e8e0d5",
                              marginTop: "4px",
                            }} />
                          )}
                        </div>
                        <div>
                          <p style={{
                            fontSize: "11px",
                            fontWeight: 800,
                            color: partnerColor,
                            textTransform: "uppercase",
                            letterSpacing: "1px",
                            marginBottom: "2px",
                          }}>{s.time}</p>
                          <p style={{
                            fontSize: "14px",
                            color: "#7a6f63",
                            lineHeight: 1.4,
                          }}>{s.text}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Share section */}
                  <div style={{
                    animation: "fadeUp 0.8s cubic-bezier(0.4,0,0.2,1) 1.3s both",
                  }}>
                    <p style={{
                      fontSize: "11px",
                      fontWeight: 800,
                      color: "#c0b5a5",
                      textTransform: "uppercase",
                      letterSpacing: "2.5px",
                      marginBottom: "14px",
                    }}>
                      Share your story
                    </p>

                    <div style={{
                      background: "#fff",
                      borderRadius: "20px",
                      border: "1.5px solid #e8e0d5",
                      padding: "20px",
                      textAlign: "center",
                    }}>
                      <p style={{
                        fontFamily: "var(--font-fraunces), serif",
                        fontSize: "17px",
                        fontWeight: 700,
                        color: "#1a1612",
                        marginBottom: "6px",
                      }}>
                        Inspire someone else to donate.
                      </p>
                      <p style={{
                        fontSize: "13px",
                        color: "#9a8e7e",
                        marginBottom: "16px",
                        lineHeight: 1.5,
                      }}>
                        Share your story with friends and family to inspire them to donate too.
                      </p>
                      <div style={{ display: "flex", gap: "10px", justifyContent: "center" }}>
                        <button
                          onClick={() => {
                            navigator.clipboard.writeText("https://careasy.org/donate");
                          }}
                          style={{
                            padding: "12px 20px",
                            borderRadius: "14px",
                            border: "1.5px solid #e4ddd2",
                            background: "#fff",
                            fontSize: "13px",
                            fontWeight: 700,
                            color: "#7a6f63",
                            fontFamily: "var(--font-nunito), sans-serif",
                            cursor: "pointer",
                            display: "flex",
                            alignItems: "center",
                            gap: "6px",
                          }}
                        >
                          🔗 Copy link
                        </button>
                        <button
                          style={{
                            padding: "12px 20px",
                            borderRadius: "14px",
                            border: "1.5px solid #e4ddd2",
                            background: "#fff",
                            fontSize: "13px",
                            fontWeight: 700,
                            color: "#7a6f63",
                            fontFamily: "var(--font-nunito), sans-serif",
                            cursor: "pointer",
                            display: "flex",
                            alignItems: "center",
                            gap: "6px",
                          }}
                        >
                          💬 Text a friend
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Footer */}
                  <div style={{
                    textAlign: "center",
                    padding: "32px 0 24px",
                    animation: "fadeUp 0.8s ease 1.5s both",
                  }}>
                    <p style={{
                      fontSize: "13px",
                      color: "#c0b5a5",
                      marginBottom: "4px",
                    }}>
                      Thank you, {firstName || "friend"}. ❤️
                    </p>
                    <p style={{
                      fontSize: "12px",
                      color: "#d4cdc2",
                    }}>
                      CARS (Charitable Adult Rides & Services) · careasy.org
                    </p>
                  </div>
                </div>
              )}
            </Screen>
          </div>
        </div>
      </div>
    </>
  );
}
