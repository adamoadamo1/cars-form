'use client';

import { useState, useEffect, useRef } from "react";

// ─── Data ──────────────────────────────────────────────────────────
const DONOR_PROFILE = {
  name: "Maria",
  phone: "+1 (619) 555-0147",
  nonprofit: "American Red Cross",
  vehicle: "2016 Honda Civic",
  vin: "2HGFC2F59GH••••••",
};

// The full scripted conversation, broken into "scenes"
const SCENES = [
  {
    id: "welcome",
    label: "Registration Confirmed",
    timestamp: "Mon, Jan 27 · 10:14 AM",
    messages: [
      {
        from: "ai",
        text: `Hi Maria! 👋 This is the donation assistant from CARS — Charitable Adult Rides & Services. Your vehicle donation has been registered!\n\nHere's what I have:\n🚗  2016 Honda Civic\n🎗️  Benefiting: American Red Cross\n\nI'll be your guide through the entire process. You can text me anytime with questions — I'm here 7 days a week.`,
        delay: 0,
      },
      {
        from: "ai",
        text: `Next step: We'll schedule your free vehicle pickup. A tow company will reach out within 2-3 business days. Make sure you have your title and keys ready!\n\nNeed it picked up sooner? Just let me know and I'll see what I can do.`,
        delay: 800,
      },
      {
        from: "donor",
        text: "Thanks! That works. I'm pretty flexible this week.",
        delay: 1400,
      },
      {
        from: "ai",
        text: `Great! While we wait for pickup to be scheduled — I'm curious, what made you decide to donate your car to the Red Cross specifically?`,
        delay: 2000,
      },
      {
        from: "donor",
        text: "Honestly my aunt's house was damaged in the hurricanes last year and the Red Cross was there for her family. It felt personal after that.",
        delay: 2800,
      },
      {
        from: "ai",
        text: `That's a powerful reason, Maria. I'm glad your aunt had that support. Stories like yours are exactly what the Red Cross wants to hear — it helps them understand why people like you choose to give.\n\nIs disaster relief the area that matters most to you, or are there other causes close to your heart too?`,
        delay: 3600,
      },
      {
        from: "donor",
        text: "Disaster relief is the big one. But I also care a lot about community preparedness — like making sure people know what to do before something happens",
        delay: 4400,
      },
      {
        from: "ai",
        text: `That's a really thoughtful perspective — the prevention side doesn't always get the attention it deserves. I've noted that down. The Red Cross actually does a lot of community preparedness work, so that's great alignment.\n\nI'll text you as soon as pickup is confirmed! 🚙`,
        delay: 5000,
      },
    ],
    signals: [
      { type: "motivation", value: "Personal connection — family member impacted by hurricane" },
      { type: "cause", value: "Disaster relief (primary), Community preparedness (secondary)" },
      { type: "emotion", value: "Gratitude, sense of reciprocity" },
      { type: "insight", value: "Donor values proactive/preventive action, not just reactive response" },
    ],
  },
  {
    id: "pickup-scheduled",
    label: "Pickup Scheduled",
    timestamp: "Wed, Jan 29 · 2:31 PM",
    messages: [
      {
        from: "ai",
        text: `Good news, Maria! Your pickup has been scheduled. 🎉\n\n📅  Friday, Jan 31\n🕐  Between 1:00 – 4:00 PM\n📍  Your registered address\n\nThe tow driver will provide a Donation Receipt at pickup. Don't forget your title and keys!`,
        delay: 0,
      },
      {
        from: "donor",
        text: "Perfect. Quick question — do I need to cancel my insurance before the pickup?",
        delay: 800,
      },
      {
        from: "ai",
        text: `Great question! Actually, you should NOT cancel your insurance yet. Here's the order:\n\n1️⃣  After pickup, notify your state DMV that you no longer have the vehicle\n2️⃣  Then cancel your insurance\n\nCancelling before notifying the state can leave you liable. I can send you the specific steps for California if you'd like!`,
        delay: 1600,
      },
      {
        from: "donor",
        text: "Oh wow I almost made that mistake. Yes please send the CA steps!",
        delay: 2200,
      },
      {
        from: "ai",
        text: `For California:\n\n📋  Submit a Release of Liability (REG 138) to the CA DMV. You can do this online at dmv.ca.gov — it takes about 5 minutes.\n\nDo this within 5 days of the pickup. After that, you're clear to cancel insurance.\n\nI'll remind you after pickup too, so don't worry about forgetting. 😊`,
        delay: 2800,
      },
      {
        from: "donor",
        text: "You're a lifesaver. Literally nobody told me that when I donated a car years ago 😂",
        delay: 3400,
      },
      {
        from: "ai",
        text: `Ha! Glad I could help. Wait — you've donated a vehicle before? That's awesome. Was that also to the Red Cross, or a different organization?`,
        delay: 4000,
      },
      {
        from: "donor",
        text: "It was to Goodwill actually. Like 8 years ago. The experience was fine but I never heard from them again after",
        delay: 4600,
      },
      {
        from: "ai",
        text: `That's really common unfortunately. A lot of donors feel that disconnect after the initial gift.\n\nWhat would have made that experience better for you? Like, what kind of follow-up would have actually meant something?`,
        delay: 5200,
      },
      {
        from: "donor",
        text: "Honestly just knowing what happened with my car. Did they sell it? How much did the charity actually get? Did it help anyone specifically? I had no idea",
        delay: 5800,
      },
      {
        from: "ai",
        text: `That's valuable feedback. Transparency and impact visibility — knowing your gift actually landed somewhere meaningful. I'll make sure you get that level of detail this time around.\n\nYou'll hear from me every step of the way. See you Friday! 🚗`,
        delay: 6400,
      },
    ],
    signals: [
      { type: "behavior", value: "Repeat vehicle donor (prev: Goodwill, ~8 years ago)" },
      { type: "pain-point", value: "Felt disconnected post-donation — no follow-up, no impact transparency" },
      { type: "desire", value: "Wants to know what happened to her car and how the funds were used" },
      { type: "insight", value: "High-retention potential if engagement is maintained post-donation" },
    ],
  },
  {
    id: "post-pickup",
    label: "Vehicle Picked Up",
    timestamp: "Fri, Jan 31 · 3:47 PM",
    messages: [
      {
        from: "ai",
        text: `Maria, your 2016 Honda Civic has been picked up! 🎉\n\nDid you receive your Donation Receipt from the tow driver?`,
        delay: 0,
      },
      {
        from: "donor",
        text: "Yes got it! Feeling good about this. Little sad to see it go though ngl 😅",
        delay: 800,
      },
      {
        from: "ai",
        text: `Totally understandable — cars hold a lot of memories! But your Civic is about to start a whole new chapter helping people.\n\nHere's what happens next:\n📦  Your car goes to one of our evaluation centers\n🔧  We'll assess it and determine the best sales channel\n💰  After sale, proceeds go directly to the Red Cross\n📄  You'll get your tax receipt within 30 days of the sale\n\nThe whole process typically takes 4-12 weeks.`,
        delay: 1400,
      },
      {
        from: "ai",
        text: `Quick reminder: File your CA Release of Liability within the next 5 days! Here's the link: dmv.ca.gov/release\n\nAfter that's done, you can cancel your insurance on the Civic.`,
        delay: 2000,
      },
      {
        from: "donor",
        text: "On it. Hey random question — do you know roughly how much my car might go for?",
        delay: 2800,
      },
      {
        from: "ai",
        text: `Great question! I can't give you an exact number yet since it depends on the evaluation, but 2016 Civics in good condition typically do well at auction. You'll get the exact sale price on your tax receipt (IRS Form 1098-C).\n\nIf it sells for $500 or less, your donation receipt covers the tax deduction. If more than $500, the 1098-C is what you'll use. Either way, I'll walk you through it when the time comes.\n\nSpeaking of impact — if you could direct how the Red Cross used the funds from your car, what would you want them to go toward?`,
        delay: 3400,
      },
      {
        from: "donor",
        text: "Hmm probably disaster preparedness kits for families. Or training volunteers. Something that helps BEFORE the disaster hits. That's what would feel most meaningful to me.",
        delay: 4200,
      },
      {
        from: "ai",
        text: `I love that — you keep coming back to that preparedness theme. You're the kind of donor who thinks about systemic impact, not just the immediate emergency. That's rare and really valuable.\n\nI'll keep you posted as your car moves through the process! 🚗💨`,
        delay: 4800,
      },
    ],
    signals: [
      { type: "emotion", value: "Positive sentiment, emotional attachment to vehicle but optimistic about impact" },
      { type: "preference", value: "Would direct funds toward disaster preparedness kits and volunteer training" },
      { type: "donor-type", value: "Systems thinker — values prevention over reaction" },
      { type: "tax-awareness", value: "Asking about sale price — engaged with tax benefit process" },
    ],
  },
  {
    id: "sale-update",
    label: "Vehicle Sold",
    timestamp: "Thu, Feb 20 · 11:08 AM",
    messages: [
      {
        from: "ai",
        text: `Big update, Maria! Your 2016 Honda Civic has been sold. 🎊\n\n💰  Sale price: $8,740\n🎗️  Net proceeds to the Red Cross: $7,120\n📄  Your IRS Form 1098-C will arrive in the mail within 30 days\n\nThat $7,120 is going to make a real difference.`,
        delay: 0,
      },
      {
        from: "donor",
        text: "Wow that's more than I expected!! That's amazing!",
        delay: 800,
      },
      {
        from: "ai",
        text: `Right?! CARS works hard to maximize the return — your car was in great shape which helped a lot.\n\nTo put it in perspective: $7,120 could fund approximately 35 disaster preparedness kits for families, or help train about 15 new Red Cross volunteers.\n\nRemember when you said you wished you knew exactly how your donation was used? This time you'll know. 😊`,
        delay: 1600,
      },
      {
        from: "donor",
        text: "That actually means so much to hear. 35 families!! Okay now I'm crying a little 😭",
        delay: 2400,
      },
      {
        from: "ai",
        text: `You made that happen, Maria.\n\nI have one more question, if you don't mind — would you be open to the Red Cross reaching out to you about other ways to stay involved? Not asking for more money, but things like:\n\n• Volunteer opportunities\n• Disaster prep workshops in your area\n• Updates on how your donation funds are being used\n\nNo pressure at all — just want to connect you if you're interested.`,
        delay: 3000,
      },
      {
        from: "donor",
        text: "Absolutely yes. Especially the volunteer stuff and workshops. I've actually been wanting to get more involved but didn't know how",
        delay: 3800,
      },
      {
        from: "ai",
        text: `That's incredible. I'll pass along your interest to the Red Cross team — specifically that you're interested in volunteering and disaster prep workshops.\n\nMaria, it's been a pleasure being your guide through this. From your aunt's story to that Honda Civic becoming 35 preparedness kits — this has been a great journey. Thank you for making a difference. ❤️\n\nYour tax form will arrive in the mail soon. If you ever have questions about it, just text me!`,
        delay: 4400,
      },
      {
        from: "donor",
        text: "Thank YOU. This was the best donation experience I've ever had. I actually felt like someone cared about why I was giving, not just that I was giving.",
        delay: 5200,
      },
    ],
    signals: [
      { type: "engagement", value: "Open to ongoing relationship — volunteering, workshops, impact updates" },
      { type: "conversion", value: "Expressed desire to get MORE involved — high-value lead for Red Cross" },
      { type: "satisfaction", value: "Best donation experience ever — strong positive sentiment, emotional response" },
      { type: "insight", value: "Key driver: feeling seen and heard, not just transactional" },
    ],
  },
];

// Build the complete insight report from all signals
const INSIGHT_REPORT = {
  donor: DONOR_PROFILE,
  summary:
    "Maria is a high-value repeat donor driven by a deeply personal connection to disaster relief. She previously donated to Goodwill but felt abandoned post-donation — this experience addressed that pain point directly. She is a systems thinker who values preparedness over reaction, and she's actively seeking deeper involvement through volunteering and community workshops. She represents an ideal candidate for Red Cross's volunteer pipeline and recurring engagement programs.",
  signals: SCENES.flatMap((s) => s.signals),
  recommendations: [
    "Invite Maria to local disaster preparedness volunteer training within 30 days",
    "Send quarterly impact reports showing how vehicle donation funds were allocated",
    "Connect her with Red Cross community preparedness programs in San Diego",
    "Flag as high-retention donor — personal story + desire for ongoing involvement",
    "Ask permission to feature her story (aunt's hurricane experience → car donation → volunteering) in Red Cross communications",
  ],
  engagement_score: 94,
  retention_probability: "Very High",
  lifetime_value_indicator: "Expanding — likely to become multi-channel supporter (donor + volunteer + advocate)",
};

// ─── Color Palette ─────────────────────────────────────────────────
const COLORS = {
  bg: "#0a0a0c",
  surface: "#141418",
  surfaceHover: "#1a1a20",
  border: "#2a2a32",
  borderLight: "#3a3a44",
  text: "#e8e8ed",
  textMuted: "#8888a0",
  textDim: "#5a5a6e",
  accent: "#3478f6",
  accentDim: "#1a3d7a",
  green: "#34c759",
  greenDim: "#0f3d1a",
  orange: "#ff9f0a",
  orangeDim: "#3d2800",
  purple: "#af52de",
  purpleDim: "#2d1540",
  red: "#ff453a",
  bubble: "#3478f6",
  bubbleIncoming: "#1c1c22",
};

// ─── Styles ────────────────────────────────────────────────────────
const FONT = `"SF Pro Text", "SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif`;

// ─── Components ────────────────────────────────────────────────────

interface Message {
  from: string;
  text: string;
  delay: number;
}

function MessageBubble({ msg }: { msg: Message; isLast: boolean }) {
  const isAI = msg.from === "ai";
  return (
    <div style={{
      display: "flex", justifyContent: isAI ? "flex-start" : "flex-end",
      padding: "2px 8px", animation: "fadeSlideUp 0.3s ease-out forwards",
    }}>
      <div style={{
        maxWidth: "82%", padding: "9px 14px",
        background: isAI ? COLORS.bubbleIncoming : COLORS.bubble,
        borderRadius: isAI ? "18px 18px 18px 6px" : "18px 18px 6px 18px",
        color: COLORS.text, fontSize: 14.5, lineHeight: 1.45,
        fontFamily: FONT, whiteSpace: "pre-line", letterSpacing: -0.1,
      }}>
        {msg.text}
      </div>
    </div>
  );
}

interface Signal {
  type: string;
  value: string;
}

function SignalBadge({ signal }: { signal: Signal }) {
  const colorMap: Record<string, { bg: string; text: string; border: string }> = {
    motivation: { bg: COLORS.purpleDim, text: COLORS.purple, border: "#4a2070" },
    cause: { bg: COLORS.greenDim, text: COLORS.green, border: "#1a5a2a" },
    emotion: { bg: COLORS.orangeDim, text: COLORS.orange, border: "#5a3a00" },
    insight: { bg: COLORS.accentDim, text: COLORS.accent, border: "#2a4d9a" },
    behavior: { bg: COLORS.purpleDim, text: COLORS.purple, border: "#4a2070" },
    "pain-point": { bg: "#3d0a0a", text: COLORS.red, border: "#5a1a1a" },
    desire: { bg: COLORS.greenDim, text: COLORS.green, border: "#1a5a2a" },
    preference: { bg: COLORS.orangeDim, text: COLORS.orange, border: "#5a3a00" },
    "donor-type": { bg: COLORS.accentDim, text: COLORS.accent, border: "#2a4d9a" },
    "tax-awareness": { bg: COLORS.orangeDim, text: COLORS.orange, border: "#5a3a00" },
    engagement: { bg: COLORS.greenDim, text: COLORS.green, border: "#1a5a2a" },
    conversion: { bg: COLORS.purpleDim, text: COLORS.purple, border: "#4a2070" },
    satisfaction: { bg: COLORS.greenDim, text: COLORS.green, border: "#1a5a2a" },
  };
  const c = colorMap[signal.type] || colorMap.insight;
  return (
    <div style={{
      display: "flex", gap: 8, alignItems: "flex-start", padding: "8px 12px",
      background: c.bg, borderRadius: 10, border: `1px solid ${c.border}`,
    }}>
      <span style={{
        fontSize: 10, fontWeight: 600, textTransform: "uppercase", letterSpacing: 0.8,
        color: c.text, whiteSpace: "nowrap", marginTop: 2, fontFamily: FONT,
      }}>
        {signal.type.replace("-", " ")}
      </span>
      <span style={{ fontSize: 13, color: COLORS.text, lineHeight: 1.4, fontFamily: FONT }}>
        {signal.value}
      </span>
    </div>
  );
}

function PhoneFrame({ children }: { children: React.ReactNode }) {
  return (
    <div style={{
      width: 375, minHeight: 680, maxHeight: 720, background: COLORS.bg,
      borderRadius: 40, border: `2.5px solid ${COLORS.border}`,
      display: "flex", flexDirection: "column", overflow: "hidden",
      boxShadow: "0 25px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.04)",
      position: "relative", flexShrink: 0,
    }}>
      {/* Notch */}
      <div style={{
        position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)",
        width: 126, height: 32, background: COLORS.bg, borderRadius: "0 0 20px 20px",
        zIndex: 10,
      }} />
      {/* Status bar */}
      <div style={{
        height: 54, display: "flex", justifyContent: "space-between", alignItems: "flex-end",
        padding: "0 28px 6px", fontSize: 14, fontWeight: 600, color: COLORS.text,
        fontFamily: FONT, flexShrink: 0,
      }}>
        <span>9:41</span>
        <span style={{ display: "flex", gap: 5, fontSize: 13 }}>
          <span>●●●●</span>
          <span>🔋</span>
        </span>
      </div>
      {children}
    </div>
  );
}

interface Scene {
  id: string;
  label: string;
  timestamp: string;
  messages: Message[];
  signals: Signal[];
}

function InsightPanel({ scene, showReport, onToggleReport }: { scene: Scene; allScenes: Scene[]; showReport: boolean; onToggleReport: () => void }) {
  if (showReport) {
    const r = INSIGHT_REPORT;
    return (
      <div style={{
        flex: 1, minWidth: 380, maxWidth: 480, background: COLORS.surface,
        borderRadius: 20, border: `1px solid ${COLORS.border}`, overflow: "hidden",
        display: "flex", flexDirection: "column", maxHeight: 720,
      }}>
        {/* Header */}
        <div style={{
          padding: "20px 24px 16px", borderBottom: `1px solid ${COLORS.border}`,
          display: "flex", justifyContent: "space-between", alignItems: "center", flexShrink: 0,
        }}>
          <div>
            <div style={{ fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: 1.2, color: COLORS.accent, fontFamily: FONT, marginBottom: 4 }}>
              📊 Donor Insight Report
            </div>
            <div style={{ fontSize: 18, fontWeight: 700, color: COLORS.text, fontFamily: FONT }}>
              Packaged for Red Cross
            </div>
          </div>
          <button onClick={onToggleReport} style={{
            background: COLORS.accentDim, border: `1px solid ${COLORS.accent}33`, borderRadius: 8,
            color: COLORS.accent, fontSize: 12, fontWeight: 600, padding: "6px 12px", cursor: "pointer",
            fontFamily: FONT,
          }}>
            ← Back to Signals
          </button>
        </div>
        {/* Content */}
        <div style={{ flex: 1, overflowY: "auto", padding: 24, display: "flex", flexDirection: "column", gap: 20 }}>
          {/* Donor card */}
          <div style={{ background: COLORS.bg, borderRadius: 14, padding: 18, border: `1px solid ${COLORS.border}` }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
              <div>
                <div style={{ fontSize: 16, fontWeight: 700, color: COLORS.text, fontFamily: FONT }}>{r.donor.name}</div>
                <div style={{ fontSize: 12, color: COLORS.textMuted, fontFamily: FONT, marginTop: 2 }}>{r.donor.vehicle} → {r.donor.nonprofit}</div>
              </div>
              <div style={{
                background: `linear-gradient(135deg, ${COLORS.green}, ${COLORS.accent})`,
                borderRadius: 12, padding: "8px 14px", textAlign: "center",
              }}>
                <div style={{ fontSize: 22, fontWeight: 800, color: "#fff", fontFamily: FONT, lineHeight: 1 }}>{r.engagement_score}</div>
                <div style={{ fontSize: 8, fontWeight: 600, color: "rgba(255,255,255,0.7)", textTransform: "uppercase", letterSpacing: 0.5, fontFamily: FONT }}>Score</div>
              </div>
            </div>
            <div style={{ display: "flex", gap: 10 }}>
              <div style={{ flex: 1, background: COLORS.surface, borderRadius: 8, padding: "8px 12px" }}>
                <div style={{ fontSize: 10, color: COLORS.textMuted, fontFamily: FONT, textTransform: "uppercase", letterSpacing: 0.5 }}>Retention</div>
                <div style={{ fontSize: 13, fontWeight: 600, color: COLORS.green, fontFamily: FONT }}>{r.retention_probability}</div>
              </div>
              <div style={{ flex: 2, background: COLORS.surface, borderRadius: 8, padding: "8px 12px" }}>
                <div style={{ fontSize: 10, color: COLORS.textMuted, fontFamily: FONT, textTransform: "uppercase", letterSpacing: 0.5 }}>Lifetime Value</div>
                <div style={{ fontSize: 13, fontWeight: 600, color: COLORS.accent, fontFamily: FONT }}>{r.lifetime_value_indicator}</div>
              </div>
            </div>
          </div>

          {/* Summary */}
          <div>
            <div style={{ fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: 1, color: COLORS.textMuted, fontFamily: FONT, marginBottom: 8 }}>
              Donor Summary
            </div>
            <div style={{ fontSize: 13.5, color: COLORS.text, lineHeight: 1.6, fontFamily: FONT, background: COLORS.bg, borderRadius: 12, padding: 16, border: `1px solid ${COLORS.border}` }}>
              {r.summary}
            </div>
          </div>

          {/* All signals */}
          <div>
            <div style={{ fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: 1, color: COLORS.textMuted, fontFamily: FONT, marginBottom: 8 }}>
              All Zero-Party Data Captured ({r.signals.length} signals)
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              {r.signals.map((s, i) => (
                <SignalBadge key={i} signal={s} />
              ))}
            </div>
          </div>

          {/* Recommendations */}
          <div>
            <div style={{ fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: 1, color: COLORS.textMuted, fontFamily: FONT, marginBottom: 8 }}>
              Recommended Actions for Red Cross
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              {r.recommendations.map((rec, i) => (
                <div key={i} style={{
                  display: "flex", gap: 10, alignItems: "flex-start", padding: "10px 12px",
                  background: COLORS.bg, borderRadius: 10, border: `1px solid ${COLORS.border}`,
                }}>
                  <span style={{ fontSize: 14, color: COLORS.accent, fontWeight: 700, fontFamily: FONT, flexShrink: 0 }}>{i + 1}.</span>
                  <span style={{ fontSize: 13, color: COLORS.text, lineHeight: 1.4, fontFamily: FONT }}>{rec}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Normal signal view
  return (
    <div style={{
      flex: 1, minWidth: 340, maxWidth: 440, background: COLORS.surface,
      borderRadius: 20, border: `1px solid ${COLORS.border}`, overflow: "hidden",
      display: "flex", flexDirection: "column", maxHeight: 720,
    }}>
      <div style={{
        padding: "20px 24px 16px", borderBottom: `1px solid ${COLORS.border}`, flexShrink: 0,
      }}>
        <div style={{ fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: 1.2, color: COLORS.accent, fontFamily: FONT, marginBottom: 4 }}>
          🔍 Zero-Party Data Captured
        </div>
        <div style={{ fontSize: 16, fontWeight: 700, color: COLORS.text, fontFamily: FONT }}>
          {scene.label}
        </div>
        <div style={{ fontSize: 12, color: COLORS.textMuted, fontFamily: FONT }}>{scene.timestamp}</div>
      </div>
      <div style={{ flex: 1, overflowY: "auto", padding: "16px 20px", display: "flex", flexDirection: "column", gap: 8 }}>
        {scene.signals.map((s, i) => (
          <div key={i} style={{ animation: `fadeSlideUp 0.3s ease-out ${i * 0.1}s both` }}>
            <SignalBadge signal={s} />
          </div>
        ))}
      </div>
      {/* Show report button on last scene */}
      {scene.id === "sale-update" && (
        <div style={{ padding: "12px 20px 16px", borderTop: `1px solid ${COLORS.border}`, flexShrink: 0 }}>
          <button onClick={onToggleReport} style={{
            width: "100%", padding: "12px 16px", borderRadius: 12,
            background: `linear-gradient(135deg, ${COLORS.accent}, ${COLORS.purple})`,
            color: "#fff", fontSize: 14, fontWeight: 700, border: "none", cursor: "pointer",
            fontFamily: FONT, letterSpacing: -0.2,
            transition: "transform 0.15s ease, box-shadow 0.15s ease",
          }}
          onMouseEnter={e => { (e.target as HTMLButtonElement).style.transform = "scale(1.02)"; (e.target as HTMLButtonElement).style.boxShadow = "0 4px 20px rgba(52,120,246,0.3)"; }}
          onMouseLeave={e => { (e.target as HTMLButtonElement).style.transform = "scale(1)"; (e.target as HTMLButtonElement).style.boxShadow = "none"; }}
          >
            📊 View Packaged Insight Report
          </button>
        </div>
      )}
    </div>
  );
}

// ─── Main App ──────────────────────────────────────────────────────
export default function CARSDemo() {
  const [activeScene, setActiveScene] = useState(0);
  const [visibleMessages, setVisibleMessages] = useState<Message[]>([]);
  const [showReport, setShowReport] = useState(false);
  const chatRef = useRef<HTMLDivElement>(null);

  const scene = SCENES[activeScene];

  useEffect(() => {
    setShowReport(false);
    setVisibleMessages(scene.messages);
    // Scroll to top so user can scroll down through conversation
    if (chatRef.current) {
      chatRef.current.scrollTop = 0;
    }
  }, [activeScene, scene.messages]);

  const goToScene = (idx: number) => {
    if (idx !== activeScene) {
      setActiveScene(idx);
    }
  };

  return (
    <div style={{
      minHeight: "100vh", background: "#050507", display: "flex", flexDirection: "column",
      alignItems: "center", fontFamily: FONT, color: COLORS.text,
    }}>
      <style>{`
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulseGlow {
          0%, 100% { box-shadow: 0 0 0 0 rgba(52,120,246,0.3); }
          50% { box-shadow: 0 0 0 6px rgba(52,120,246,0); }
        }
        * { scrollbar-width: thin; scrollbar-color: ${COLORS.border} transparent; }
        *::-webkit-scrollbar { width: 5px; }
        *::-webkit-scrollbar-track { background: transparent; }
        *::-webkit-scrollbar-thumb { background: ${COLORS.border}; border-radius: 4px; }
      `}</style>

      {/* Back to Landing */}
      <a
        href="/"
        style={{
          position: "fixed",
          top: 16,
          left: 16,
          zIndex: 100,
          display: "flex",
          alignItems: "center",
          gap: 6,
          background: COLORS.surface,
          border: `1px solid ${COLORS.border}`,
          borderRadius: 10,
          padding: "10px 16px",
          color: COLORS.text,
          fontSize: 13,
          fontWeight: 600,
          textDecoration: "none",
          fontFamily: FONT,
          transition: "all 0.2s ease",
        }}
      >
        ← Back
      </a>

      {/* Hero header */}
      <div style={{
        width: "100%", maxWidth: 1000, padding: "36px 24px 8px", textAlign: "center",
      }}>
        <div style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: 2.5, color: COLORS.accent, marginBottom: 10, fontFamily: FONT }}>
          Frameshift × CARS
        </div>
        <h1 style={{ fontSize: 28, fontWeight: 800, color: COLORS.text, margin: "0 0 8px", lineHeight: 1.2, letterSpacing: -0.5, fontFamily: FONT }}>
          Conversational AI for Vehicle Donation
        </h1>
        <p style={{ fontSize: 14, color: COLORS.textMuted, margin: 0, maxWidth: 600, marginLeft: "auto", marginRight: "auto", lineHeight: 1.5, fontFamily: FONT }}>
          Turn every vehicle donation into a relationship. Capture zero-party data through natural iMessage conversations, then package insights for your 8,400+ nonprofit partners.
        </p>
      </div>

      {/* Timeline nav */}
      <div style={{
        display: "flex", gap: 4, padding: "20px 24px 16px", maxWidth: 1000,
        width: "100%", justifyContent: "center", flexWrap: "wrap",
      }}>
        {SCENES.map((s, i) => {
          const isActive = i === activeScene;
          return (
            <button key={s.id} onClick={() => goToScene(i)} style={{
              display: "flex", alignItems: "center", gap: 8,
              padding: "8px 16px", borderRadius: 10,
              background: isActive ? COLORS.accentDim : "transparent",
              border: `1px solid ${isActive ? COLORS.accent + "44" : COLORS.border}`,
              color: isActive ? COLORS.accent : COLORS.textMuted,
              cursor: "pointer",
              fontFamily: FONT, fontSize: 12.5, fontWeight: isActive ? 700 : 500,
              transition: "all 0.2s ease",
              letterSpacing: -0.1,
            }}>
              <span style={{
                width: 22, height: 22, borderRadius: "50%", display: "flex",
                alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700,
                background: isActive ? COLORS.accent : COLORS.border,
                color: isActive ? "#fff" : COLORS.textMuted,
              }}>
                {i + 1}
              </span>
              {s.label}
            </button>
          );
        })}
      </div>

      {/* Main content */}
      <div style={{
        display: "flex", gap: 20, padding: "0 24px 40px",
        maxWidth: 1000, width: "100%", justifyContent: "center",
        alignItems: "flex-start", flexWrap: "wrap",
      }}>
        {/* Phone with scroll indicator */}
        <div style={{ position: "relative" }}>
          <PhoneFrame>
            {/* iMessage header */}
            <div style={{
              padding: "8px 16px 12px", borderBottom: `0.5px solid ${COLORS.border}`,
              display: "flex", flexDirection: "column", alignItems: "center", flexShrink: 0,
            }}>
              <div style={{
                width: 40, height: 40, borderRadius: "50%",
                background: `linear-gradient(135deg, ${COLORS.accent}, ${COLORS.purple})`,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 18, marginBottom: 4,
              }}>
                🚗
              </div>
              <div style={{ fontSize: 15, fontWeight: 600, color: COLORS.text, fontFamily: FONT }}>CARS Donation Assistant</div>
              <div style={{ fontSize: 11, color: COLORS.textMuted, fontFamily: FONT }}>iMessage</div>
            </div>

            {/* Chat area */}
            <div ref={chatRef} style={{
              flex: 1, overflowY: "auto", padding: "12px 8px",
              display: "flex", flexDirection: "column", gap: 6,
            }}>
              {/* Date stamp */}
              <div style={{
                textAlign: "center", fontSize: 11, color: COLORS.textDim,
                padding: "4px 0 8px", fontFamily: FONT,
              }}>
                {scene.timestamp}
              </div>
              {visibleMessages.map((msg, i) => (
                <MessageBubble key={`${activeScene}-${i}`} msg={msg} isLast={i === visibleMessages.length - 1} />
              ))}
            </div>

            {/* Input bar */}
            <div style={{
              padding: "8px 12px 28px", borderTop: `0.5px solid ${COLORS.border}`,
              display: "flex", gap: 8, alignItems: "center", flexShrink: 0,
            }}>
              <div style={{ fontSize: 22, color: COLORS.textMuted, cursor: "default" }}>+</div>
              <div style={{
                flex: 1, height: 34, borderRadius: 18,
                border: `1px solid ${COLORS.border}`, background: COLORS.bg,
                display: "flex", alignItems: "center", paddingLeft: 14,
                fontSize: 14, color: COLORS.textDim, fontFamily: FONT,
              }}>
                iMessage
              </div>
            </div>
          </PhoneFrame>

          {/* Scroll indicator */}
          <div style={{
            position: "absolute",
            left: -160,
            top: "50%",
            transform: "translateY(-50%)",
            display: "flex",
            alignItems: "center",
            gap: 8,
            opacity: 0.7,
            fontSize: 14,
            color: COLORS.textMuted,
            fontFamily: FONT,
          }}>
            <span style={{ fontSize: 13, textAlign: "right", lineHeight: 1.4 }}>
              Scroll to see the<br/>full conversation
            </span>
            <span style={{ fontSize: 24 }}>→</span>
          </div>
        </div>

        {/* Insight panel */}
        <InsightPanel
          scene={scene}
          allScenes={SCENES}
          showReport={showReport}
          onToggleReport={() => setShowReport(!showReport)}
        />
      </div>

      {/* Bottom attribution */}
      <div style={{ padding: "0 24px 24px", textAlign: "center" }}>
        <div style={{ fontSize: 11, color: COLORS.textDim, fontFamily: FONT }}>
          Demo: Simulated iMessage conversation • Not connected to live systems
        </div>
      </div>
    </div>
  );
}
