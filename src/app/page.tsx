'use client';

import Link from 'next/link';

export default function LandingPage() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600;9..40,700;9..40,800&family=DM+Serif+Display&family=JetBrains+Mono:wght@400;500&display=swap');

        :root {
          --bg: #0B0C10; --surface: #12131A; --border: #262736; --border-light: #353650;
          --text: #E6E7F0; --text-muted: #8B8DA6; --text-dim: #5B5D74;
          --accent: #3B82F6; --accent-dim: rgba(59,130,246,0.12);
          --green: #22C55E; --green-dim: rgba(34,197,94,0.1);
          --orange: #F59E0B; --orange-dim: rgba(245,158,11,0.1);
          --purple: #A855F7; --purple-dim: rgba(168,85,247,0.1);
          --red: #EF4444; --red-dim: rgba(239,68,68,0.1);
          --serif: 'DM Serif Display', Georgia, serif;
          --sans: 'DM Sans', -apple-system, sans-serif;
          --mono: 'JetBrains Mono', monospace;
        }
        .landing-page * { margin: 0; padding: 0; box-sizing: border-box; }
        .landing-page { font-family: var(--sans); background: var(--bg); color: var(--text); line-height: 1.7; -webkit-font-smoothing: antialiased; min-height: 100vh; }

        .landing-page nav {
          position: fixed; top: 0; left: 0; right: 0; z-index: 100;
          padding: 14px 40px; display: flex; justify-content: space-between; align-items: center;
          background: rgba(11,12,16,0.85); backdrop-filter: blur(20px); border-bottom: 1px solid var(--border);
        }
        .landing-page .nav-brand { font-weight: 700; font-size: 14px; letter-spacing: 2px; text-transform: uppercase; color: var(--text-muted); }
        .landing-page .nav-brand em { font-style: normal; color: var(--accent); }
        .landing-page .nav-links { display: flex; gap: 28px; }
        .landing-page .nav-links a { font-size: 13px; color: var(--text-muted); text-decoration: none; transition: color 0.2s; }
        .landing-page .nav-links a:hover { color: var(--text); }

        .landing-page .hero {
          min-height: 100vh; display: flex; flex-direction: column; justify-content: center;
          padding: 120px 40px 80px; max-width: 880px; margin: 0 auto;
        }
        .landing-page .hero-eyebrow { font-family: var(--mono); font-size: 12px; color: var(--accent); letter-spacing: 3px; text-transform: uppercase; margin-bottom: 20px; opacity:0; animation: fadeUp .8s ease .2s forwards; }
        .landing-page .hero h1 { font-family: var(--serif); font-size: clamp(34px,5vw,58px); line-height: 1.1; letter-spacing: -1px; margin-bottom: 24px; opacity:0; animation: fadeUp .8s ease .4s forwards; }
        .landing-page .hero h1 span { color: var(--accent); }
        .landing-page .hero-sub { font-size: 17px; color: var(--text-muted); max-width: 600px; opacity:0; animation: fadeUp .8s ease .6s forwards; }
        .landing-page .hero-stats { display: flex; gap: 36px; margin-top: 44px; padding-top: 28px; border-top: 1px solid var(--border); opacity:0; animation: fadeUp .8s ease .8s forwards; flex-wrap: wrap; }
        .landing-page .hero-stat-number { font-family: var(--serif); font-size: 34px; line-height: 1; }
        .landing-page .hero-stat-label { font-size: 11px; color: var(--text-dim); letter-spacing: 1px; text-transform: uppercase; margin-top: 4px; }

        .landing-page .hero-ctas { display: flex; gap: 16px; margin-top: 36px; opacity:0; animation: fadeUp .8s ease 1s forwards; flex-wrap: wrap; }
        .landing-page .cta-button { display: inline-flex; align-items: center; gap: 8px; padding: 14px 28px; border-radius: 10px; font-size: 15px; font-weight: 600; text-decoration: none; transition: all 0.2s ease; border: none; cursor: pointer; }
        .landing-page .cta-button.primary { background: var(--accent); color: #fff; }
        .landing-page .cta-button.primary:hover { background: #2563EB; transform: translateY(-2px); }
        .landing-page .cta-button.secondary { background: var(--surface); color: var(--text); border: 1px solid var(--border); }
        .landing-page .cta-button.secondary:hover { background: var(--border); transform: translateY(-2px); }

        .landing-page section { padding: 80px 40px; max-width: 1000px; margin: 0 auto; }
        .landing-page .divider { height: 1px; background: var(--border); max-width: 1000px; margin: 0 auto; }
        .landing-page .section-label { font-family: var(--mono); font-size: 11px; color: var(--accent); letter-spacing: 3px; text-transform: uppercase; margin-bottom: 12px; }
        .landing-page .section-title { font-family: var(--serif); font-size: clamp(26px,3vw,38px); line-height: 1.15; margin-bottom: 16px; }
        .landing-page .section-desc { font-size: 16px; color: var(--text-muted); max-width: 640px; margin-bottom: 36px; }

        .landing-page .story-timeline { position: relative; padding-left: 36px; }
        .landing-page .story-timeline::before { content:''; position: absolute; left: 6px; top: 0; bottom: 0; width: 2px; background: linear-gradient(to bottom, var(--accent), var(--purple), var(--green)); border-radius: 2px; }
        .landing-page .story-beat { position: relative; padding-bottom: 36px; }
        .landing-page .story-beat:last-child { padding-bottom: 0; }
        .landing-page .story-beat::before { content:''; position: absolute; left: -36px; top: 5px; width: 14px; height: 14px; border-radius: 50%; background: var(--bg); border: 2px solid var(--accent); }
        .landing-page .story-beat:nth-child(2)::before { border-color: var(--purple); }
        .landing-page .story-beat:nth-child(3)::before { border-color: var(--green); }
        .landing-page .story-beat h3 { font-family: var(--serif); font-size: 21px; margin-bottom: 6px; }
        .landing-page .story-beat p { font-size: 15px; color: var(--text-muted); max-width: 580px; }
        .landing-page .story-beat blockquote { margin: 12px 0 0; padding: 14px 18px; border-left: 3px solid var(--accent); background: var(--accent-dim); border-radius: 0 10px 10px 0; font-size: 14px; color: var(--text); font-style: italic; max-width: 540px; }

        .landing-page .comparison { display: grid; grid-template-columns: 1fr auto 1fr; margin: 36px 0; border: 1px solid var(--border); border-radius: 14px; overflow: hidden; }
        .landing-page .comparison-side { padding: 28px; }
        .landing-page .comparison-side.current { background: var(--red-dim); }
        .landing-page .comparison-side.new { background: var(--green-dim); }
        .landing-page .comparison-divider { width: 1px; background: var(--border); }
        .landing-page .comparison-label { font-family: var(--mono); font-size: 10px; letter-spacing: 2px; text-transform: uppercase; margin-bottom: 12px; }
        .landing-page .comparison-side.current .comparison-label { color: var(--red); }
        .landing-page .comparison-side.new .comparison-label { color: var(--green); }
        .landing-page .comparison-side h4 { font-family: var(--serif); font-size: 18px; margin-bottom: 10px; }
        .landing-page .comparison-list { list-style: none; display: flex; flex-direction: column; gap: 6px; }
        .landing-page .comparison-list li { font-size: 13px; color: var(--text-muted); padding-left: 16px; position: relative; line-height: 1.5; }
        .landing-page .comparison-side.current .comparison-list li::before { content:'✕'; position:absolute; left:0; color:var(--red); font-size:11px; font-weight:700; }
        .landing-page .comparison-side.new .comparison-list li::before { content:'✓'; position:absolute; left:0; color:var(--green); font-size:12px; font-weight:700; }

        .landing-page .imessage-preview { background: var(--surface); border: 1px solid var(--border); border-radius: 18px; padding: 28px; margin: 32px 0; max-width: 480px; }
        .landing-page .imessage-header { text-align: center; padding-bottom: 14px; border-bottom: 1px solid var(--border); margin-bottom: 16px; }
        .landing-page .imessage-header .icon { width: 36px; height: 36px; border-radius: 50%; background: linear-gradient(135deg, var(--accent), var(--purple)); display: flex; align-items: center; justify-content: center; font-size: 16px; margin: 0 auto 6px; }
        .landing-page .imessage-header .name { font-size: 13px; font-weight: 600; }
        .landing-page .msg-row { display: flex; margin-bottom: 5px; }
        .landing-page .msg-row.ai { justify-content: flex-start; }
        .landing-page .msg-row.donor { justify-content: flex-end; }
        .landing-page .msg-bubble { max-width: 80%; padding: 8px 13px; font-size: 13px; line-height: 1.4; border-radius: 16px; }
        .landing-page .msg-row.ai .msg-bubble { background: #1C1C24; border-radius: 16px 16px 16px 5px; }
        .landing-page .msg-row.donor .msg-bubble { background: var(--accent); border-radius: 16px 16px 5px 16px; color: #fff; }
        .landing-page .msg-signal { margin: 10px 0 14px; padding: 7px 11px; border-radius: 7px; display: flex; align-items: center; gap: 7px; font-size: 11px; background: var(--green-dim); border: 1px solid rgba(34,197,94,0.2); color: var(--green); }
        .landing-page .msg-signal .dot { width: 5px; height: 5px; border-radius: 50%; background: var(--green); }

        .landing-page .signals-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 10px; margin: 24px 0; }
        .landing-page .signal-card { padding: 14px 16px; border-radius: 10px; border: 1px solid var(--border); }
        .landing-page .signal-card .sig-type { font-family: var(--mono); font-size: 10px; letter-spacing: 1px; text-transform: uppercase; margin-bottom: 4px; }
        .landing-page .signal-card .sig-example { font-size: 12px; color: var(--text-muted); line-height: 1.5; }
        .landing-page .signal-card.motivation { background: var(--purple-dim); } .landing-page .signal-card.motivation .sig-type { color: var(--purple); }
        .landing-page .signal-card.cause { background: var(--green-dim); } .landing-page .signal-card.cause .sig-type { color: var(--green); }
        .landing-page .signal-card.emotion { background: var(--orange-dim); } .landing-page .signal-card.emotion .sig-type { color: var(--orange); }
        .landing-page .signal-card.behavior { background: var(--accent-dim); } .landing-page .signal-card.behavior .sig-type { color: var(--accent); }
        .landing-page .signal-card.desire { background: var(--red-dim); } .landing-page .signal-card.desire .sig-type { color: var(--red); }
        .landing-page .signal-card.conversion { background: rgba(34,197,94,0.06); border-color: rgba(34,197,94,0.15); } .landing-page .signal-card.conversion .sig-type { color: var(--green); }

        .landing-page .econ-row { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 14px; margin: 28px 0; }
        .landing-page .econ-card { background: var(--surface); border: 1px solid var(--border); border-radius: 12px; padding: 20px; }
        .landing-page .econ-card .label { font-family: var(--mono); font-size: 10px; color: var(--text-dim); letter-spacing: 1.5px; text-transform: uppercase; margin-bottom: 6px; }
        .landing-page .econ-card .number { font-family: var(--serif); font-size: 30px; line-height: 1; margin-bottom: 4px; }
        .landing-page .econ-card .detail { font-size: 12px; color: var(--text-muted); line-height: 1.5; }
        .landing-page .econ-card.a { border-color: var(--accent); } .landing-page .econ-card.a .number { color: var(--accent); }
        .landing-page .econ-card.g { border-color: var(--green); } .landing-page .econ-card.g .number { color: var(--green); }
        .landing-page .econ-card.p { border-color: var(--purple); } .landing-page .econ-card.p .number { color: var(--purple); }

        .landing-page .revenue-flow { display: flex; align-items: center; justify-content: center; gap: 0; margin: 32px 0; flex-wrap: wrap; }
        .landing-page .revenue-node { background: var(--surface); border: 1px solid var(--border); border-radius: 12px; padding: 16px 20px; text-align: center; min-width: 160px; }
        .landing-page .revenue-node .node-title { font-size: 12px; font-weight: 600; margin-bottom: 2px; }
        .landing-page .revenue-node .node-detail { font-size: 11px; color: var(--text-muted); }
        .landing-page .revenue-arrow { font-size: 18px; color: var(--accent); padding: 0 10px; }
        .landing-page .revenue-node.hl { border-color: var(--green); background: var(--green-dim); } .landing-page .revenue-node.hl .node-title { color: var(--green); }

        .landing-page .roi-callout { background: linear-gradient(135deg, rgba(59,130,246,0.08), rgba(168,85,247,0.08)); border: 1px solid rgba(59,130,246,0.2); border-radius: 18px; padding: 36px; margin: 36px 0; text-align: center; }
        .landing-page .roi-number { font-family: var(--serif); font-size: 48px; background: linear-gradient(135deg, var(--accent), var(--purple)); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; line-height: 1; margin-bottom: 6px; }
        .landing-page .roi-label { font-size: 15px; color: var(--text-muted); }
        .landing-page .roi-detail { font-size: 13px; color: var(--text-dim); margin-top: 10px; max-width: 460px; margin-left: auto; margin-right: auto; line-height: 1.6; }

        .landing-page .cta-section { text-align: center; padding: 60px 40px 100px; max-width: 640px; margin: 0 auto; }
        .landing-page .cta-section h2 { font-family: var(--serif); font-size: clamp(26px,3vw,36px); margin-bottom: 14px; }
        .landing-page .cta-section p { font-size: 15px; color: var(--text-muted); line-height: 1.7; }
        .landing-page .cta-section .sig { font-size: 13px; color: var(--text-dim); margin-top: 20px; }

        .landing-page .section-cta { margin-top: 24px; }

        @keyframes fadeUp { from { opacity:0; transform:translateY(16px); } to { opacity:1; transform:translateY(0); } }
        @media (max-width: 700px) {
          .landing-page nav { padding: 12px 20px; } .landing-page .nav-links { display: none; }
          .landing-page .hero, .landing-page section { padding-left: 20px; padding-right: 20px; }
          .landing-page .comparison { grid-template-columns: 1fr; } .landing-page .comparison-divider { width:100%; height:1px; }
          .landing-page .econ-row { grid-template-columns: 1fr; }
          .landing-page .revenue-flow { flex-direction: column; } .landing-page .revenue-arrow { transform: rotate(90deg); }
        }
      `}</style>

      <div className="landing-page">
        <nav>
          <div className="nav-brand"><em>Frameshift</em> × CARS</div>
          <div className="nav-links">
            <a href="#story">Story</a>
            <Link href="/donate">Form</Link>
            <Link href="/imessage-demo">AI</Link>
            <a href="#math">Math</a>
          </div>
        </nav>

        {/* Hero */}
        <div className="hero">
          <div className="hero-eyebrow">A proposal born from listening</div>
          <h1>What if every vehicle donation told you <span>who the donor really is?</span></h1>
          <p className="hero-sub">
            I walked into our meeting to learn everything I could about CARS. This idea didn&apos;t hit me until the ride home. So I spent all night putting this together — a vision for how CARS can turn 100,000+ annual vehicle donations into the richest donor intelligence dataset in the nonprofit industry, and a new revenue stream selling it to your 8,400 partners.
          </p>
          <p className="hero-sub" style={{ marginTop: 16, opacity: 0.7 }}>
            I know it&apos;s a lot. But when I see a vision for something, I become obsessed and I have to see it through.
          </p>
          <div className="hero-stats">
            <div><div className="hero-stat-number">8,400+</div><div className="hero-stat-label">Nonprofit partners</div></div>
            <div><div className="hero-stat-number">100K+</div><div className="hero-stat-label">Annual donations</div></div>
            <div><div className="hero-stat-number">$600M+</div><div className="hero-stat-label">Returned to partners</div></div>
            <div><div className="hero-stat-number">0</div><div className="hero-stat-label">Data on why they gave</div></div>
          </div>
          <div className="hero-ctas">
            <Link href="/donate" className="cta-button primary">Try the Form Demo →</Link>
            <Link href="/imessage-demo" className="cta-button secondary">Agentic iMessage Demo →</Link>
          </div>
        </div>

        <div className="divider"></div>

        {/* Story */}
        <section id="story">
          <div className="section-label">Origin</div>
          <div className="section-title">How this started</div>
          <div className="story-timeline">
            <div className="story-beat">
              <h3>CARS already has the relationship</h3>
              <p>Your Donor Support Reps talk to every person who donates — a real conversation at the exact moment they&apos;re giving. Most nonprofits would kill for that.</p>
            </div>
            <div className="story-beat">
              <h3>But the data dies on the form</h3>
              <p>The form captures logistics: name, address, vehicle info. It doesn&apos;t capture <em>why</em>. Why this nonprofit? What does the donor care about? Would they give again?</p>
              <blockquote>&ldquo;Today&apos;s vehicle donor could become tomorrow&apos;s major donor, annual supporter, or capital campaign contributor.&rdquo; — Your website. But there&apos;s no mechanism to make that happen.</blockquote>
            </div>
            <div className="story-beat">
              <h3>Two additions that change everything</h3>
              <p>A reimagined form that captures motivation at registration, and a conversational AI that deepens understanding over the 4–12 week lifecycle. Together they turn every donation into a relationship profile CARS packages for partners.</p>
            </div>
          </div>
        </section>

        <div className="divider"></div>

        {/* Product 1: Form */}
        <section id="form">
          <div className="section-label">Product One</div>
          <div className="section-title">The Reimagined Donation Form</div>
          <div className="section-desc">Six new fields. 45 extra seconds. A donor motivation profile attached to every record in NAV.</div>

          <div className="comparison">
            <div className="comparison-side current">
              <div className="comparison-label">Current form</div>
              <h4>Logistics Only</h4>
              <ul className="comparison-list">
                <li>Name, address, phone, email</li>
                <li>Vehicle year, make, model, condition</li>
                <li>Selected nonprofit</li>
                <li>Tax ID, title status, pickup location</li>
              </ul>
            </div>
            <div className="comparison-divider"></div>
            <div className="comparison-side new">
              <div className="comparison-label">New fields add</div>
              <h4>Donor Identity</h4>
              <ul className="comparison-list">
                <li>&ldquo;What inspired you to donate?&rdquo;</li>
                <li>&ldquo;What area of their mission matters most?&rdquo;</li>
                <li>&ldquo;Have you donated a vehicle before?&rdquo;</li>
                <li>&ldquo;Open to updates / volunteering?&rdquo;</li>
                <li>Opt-in for iMessage updates</li>
              </ul>
            </div>
          </div>

          <p style={{ fontSize: 14, color: 'var(--text-muted)', maxWidth: 600, lineHeight: 1.7 }}>
            Partners already get intake reports through NAV. Now that same report includes: &ldquo;This donor gave because their aunt was affected by Hurricane Helene. They care about disaster preparedness. They want to volunteer.&rdquo; The difference between a check and a relationship — at almost zero cost to implement.
          </p>

          <div className="section-cta">
            <Link href="/donate" className="cta-button primary">See the live prototype →</Link>
          </div>
        </section>

        <div className="divider"></div>

        {/* Product 2: AI */}
        <section id="ai">
          <div className="section-label">Product Two</div>
          <div className="section-title">Conversational AI for the Donation Lifecycle</div>
          <div className="section-desc">The form captures the spark. The AI fans the flame over 4–12 weeks via iMessage — answering questions, sending updates, and naturally mining zero-party data.</div>

          <div className="imessage-preview">
            <div className="imessage-header">
              <div className="icon">🚗</div>
              <div className="name">CARS Donation Assistant</div>
            </div>
            <div className="msg-row ai"><div className="msg-bubble">Hi Maria! 👋 Your Honda Civic donation to the Red Cross is registered. I&apos;ll guide you through — text me anytime!</div></div>
            <div className="msg-row ai"><div className="msg-bubble">What made you choose the Red Cross specifically?</div></div>
            <div className="msg-row donor"><div className="msg-bubble">My aunt&apos;s house was damaged in the hurricanes. The Red Cross was there for her. It felt personal.</div></div>
            <div className="msg-signal"><div className="dot"></div><strong>Signal:</strong>&nbsp; Personal connection — family impacted by hurricane</div>
            <div className="msg-row ai"><div className="msg-bubble">Is disaster relief the area that matters most, or are there other causes close to your heart?</div></div>
            <div className="msg-row donor"><div className="msg-bubble">Disaster relief is big. But also community preparedness — helping people before something happens.</div></div>
            <div className="msg-signal"><div className="dot"></div><strong>Signal:</strong>&nbsp; Systems thinker — values prevention over reaction</div>
          </div>

          <div className="signals-grid">
            <div className="signal-card motivation"><div className="sig-type">Motivation</div><div className="sig-example">Personal stories and emotional drivers behind the gift</div></div>
            <div className="signal-card cause"><div className="sig-type">Cause Alignment</div><div className="sig-example">Specific mission areas that resonate</div></div>
            <div className="signal-card emotion"><div className="sig-type">Engagement Intent</div><div className="sig-example">Willingness to volunteer, stay connected</div></div>
            <div className="signal-card behavior"><div className="sig-type">Donor History</div><div className="sig-example">Repeat patterns, past experiences</div></div>
            <div className="signal-card desire"><div className="sig-type">Trust Breakers</div><div className="sig-example">What kills retention (&ldquo;nobody followed up&rdquo;)</div></div>
            <div className="signal-card conversion"><div className="sig-type">Upgrade Signals</div><div className="sig-example">&ldquo;How can I get more involved?&rdquo;</div></div>
          </div>

          <div style={{ marginTop: 24, padding: 22, background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 14, maxWidth: 600 }}>
            <h4 style={{ fontFamily: 'var(--serif)', fontSize: 18, marginBottom: 8 }}>What partners receive</h4>
            <p style={{ fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.7 }}>
              Each donation produces a <strong style={{ color: 'var(--text)' }}>Donor Insight Report</strong>: motivation, cause alignment, engagement score, retention probability, and recommended actions. Like DonorSearch — but instead of third-party wealth data, it&apos;s <strong style={{ color: 'var(--accent)' }}>first-person data donors gave voluntarily</strong>. Zero-party data is the gold standard.
            </p>
          </div>

          <div className="section-cta">
            <Link href="/imessage-demo" className="cta-button primary">Watch the full demo →</Link>
          </div>
        </section>

        <div className="divider"></div>

        {/* Economics */}
        <section id="math">
          <div className="section-label">The Business Case</div>
          <div className="section-title">How the math works</div>
          <div className="section-desc">CARS pays a flat fee. Sells donor intelligence profiles back to partners — the same way you already deliver reports, marketing, and analytics.</div>

          <div className="econ-row">
            <div className="econ-card a"><div className="label">Frame Shift Engagement Engine</div><div className="number">$4,800 + 1% of net</div><div className="detail">/month — handles 5–7K messages/day, 24/7, no sick days, no Saturday overtime</div></div>
            <div className="econ-card g"><div className="label">Capacity</div><div className="number">5–7K</div><div className="detail">iMessages/day via Linq — covers full donor volume</div></div>
            <div className="econ-card p"><div className="label">Partners</div><div className="number">8,400</div><div className="detail">Receive enhanced profiles alongside existing reports</div></div>
          </div>

          <div className="revenue-flow">
            <div className="revenue-node"><div className="node-title">Donor registers</div><div className="node-detail">Form captures &ldquo;why&rdquo;</div></div>
            <div className="revenue-arrow">→</div>
            <div className="revenue-node"><div className="node-title">AI engages</div><div className="node-detail">4-12 weeks via iMessage</div></div>
            <div className="revenue-arrow">→</div>
            <div className="revenue-node"><div className="node-title">Report generated</div><div className="node-detail">Per-donor profile</div></div>
            <div className="revenue-arrow">→</div>
            <div className="revenue-node hl"><div className="node-title">CARS sells to partner</div><div className="node-detail">New data revenue</div></div>
          </div>

          <div style={{ margin: '36px 0', padding: '24px 28px', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 16 }}>
            <div style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--green)', letterSpacing: 2, textTransform: 'uppercase', marginBottom: 10 }}>Before new revenue — cost savings</div>
            <div style={{ fontFamily: 'var(--serif)', fontSize: 20, marginBottom: 10 }}>The AI pays for itself in call deflection alone</div>
            <p style={{ fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.7, marginBottom: 16 }}>
              CARS operates a 70+ person call center, 7 days a week. Donors call about DMV paperwork, title signing, insurance timing, pickup scheduling, tax receipts, sale status. The AI handles all of these questions via iMessage — 24/7, instantly, at scale. Every text conversation that resolves a donor&apos;s question is a phone call that didn&apos;t happen.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              <div style={{ padding: 16, background: 'var(--bg)', borderRadius: 10, border: '1px solid var(--border)' }}>
                <div style={{ fontSize: 11, color: 'var(--text-dim)', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 4 }}>Avg inbound support call</div>
                <div style={{ fontFamily: 'var(--serif)', fontSize: 22 }}>~$8–15</div>
                <div style={{ fontSize: 12, color: 'var(--text-dim)' }}>fully loaded (staffing, training, systems, 7-day coverage)</div>
              </div>
              <div style={{ padding: 16, background: 'var(--bg)', borderRadius: 10, border: '1px solid var(--border)' }}>
                <div style={{ fontSize: 11, color: 'var(--text-dim)', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 4 }}>Avg AI text conversation</div>
                <div style={{ fontFamily: 'var(--serif)', fontSize: 22, color: 'var(--green)' }}>pennies</div>
                <div style={{ fontSize: 12, color: 'var(--text-dim)' }}>iMessage + AI inference cost per exchange</div>
              </div>
            </div>
            <p style={{ fontSize: 13, color: 'var(--text-dim)', marginTop: 14, lineHeight: 1.6 }}>
              If the AI deflects even 500 calls/month — routine status checks, DMV questions, tax form timing — that&apos;s $4,000–$7,500/month in support cost savings. The platform nearly pays for itself before CARS charges a single partner for data. And your reps get freed up for the complex, high-touch calls that actually need a human.
            </p>
          </div>

        </section>

        <div className="divider"></div>

        <div className="cta-section">
          <div style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--accent)', letterSpacing: 2, textTransform: 'uppercase', marginBottom: 16 }}>The Opportunity</div>
          <h2 style={{ marginBottom: 20 }}>&ldquo;Lifelong donor engagement begins with CARS.&rdquo;</h2>
          <p style={{ fontSize: 16, lineHeight: 1.8, marginBottom: 24 }}>
            You already deliver marketing, reports, analytics, branded pages, and CAMM automation. Zero-party donor profiles are a natural extension — <strong style={{ color: 'var(--text)' }}>the mechanism to deliver on the promise you&apos;re already making</strong>.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 32 }}>
            <a href="mailto:adamlinssen@gmail.com?cc=hello@frameshiftvideo.com&amp;subject=Let's%20Do%20It" className="cta-button primary">Let&apos;s talk →</a>
          </div>
          <div className="sig">Adam Linssen · Frameshift · San Diego, CA<br/>adamlinssen@gmail.com · (858) 518-5567</div>
        </div>
      </div>
    </>
  );
}
