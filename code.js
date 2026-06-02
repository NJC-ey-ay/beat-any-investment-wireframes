function hex(h) {
  return { r: parseInt(h.slice(1,3),16)/255, g: parseInt(h.slice(3,5),16)/255, b: parseInt(h.slice(5,7),16)/255 }
}

function rect(w, h, fill, radius) {
  const r = figma.createRectangle()
  r.resize(w, h)
  r.fills = [{ type: 'SOLID', color: hex(fill) }]
  if (radius) r.cornerRadius = radius
  return r
}

function line(x1, y1, x2, y2, stroke) {
  const l = figma.createLine()
  l.x = x1; l.y = y1; l.resize(x2 - x1, 0)
  l.strokes = [{ type: 'SOLID', color: hex(stroke) }]
  l.strokeWeight = 1
  return l
}

async function txt(str, x, y, size, color, family, weight) {
  const t = figma.createText()
  t.characters = str
  t.x = x; t.y = y
  t.fontSize = size
  t.fills = [{ type: 'SOLID', color: hex(color) }]
  if (family && weight) t.fontName = { family, style: weight }
  return t
}

// ── HERO WIREFRAME ──────────────────────────────────────
async function buildHeroPage(page) {
  const f = page

  // BG
  const bg = rect(1200, 700, '#0a0a0a', 12)
  f.appendChild(bg); bg.name = 'bg'

  // Nav
  const nav = rect(1200, 56, '#0a0a0a')
  f.appendChild(nav); nav.name = 'navBg'
  const navLine = line(0, 56, 1200, 56, '#222')
  f.appendChild(navLine); navLine.name = 'navLine'

  const logo = await txt('BEAT ANY INVESTMENT', 48, 18, 18, '#fff', 'Poppins', 'Bold')
  f.appendChild(logo); logo.name = 'logo'

  const links = ['For RIAs', 'How It Works', 'About', 'FAQs']
  links.forEach((l, i) => {
    const x = i === 0 ? 740 : [820, 920, 988][i-1]
    f.appendChild(async () => {
      const t = await txt(l, x, 20, 14, '#888', 'Inter', 'Regular'); t.name = `nav-${l}`; return t
    }())
  })

  // Waitlist button
  const ctaBtn = rect(1068, 16, '#257CFF', 14)
  f.appendChild(ctaBtn); ctaBtn.name = 'navCTA'

  // Hero left
  const eyeb = await txt('INTRODUCER ACCESS · INSTITUTIONAL OPPORTUNITIES', 48, 90, 12, '#257CFF', 'Inter', 'Semi Bold')
  f.appendChild(eyeb); eyeb.name = 'eyebrow'
  const h1 = await txt('Exclusive alternative investments', 48, 120, 48, '#fff', 'Poppins', 'Extra Bold')
  f.appendChild(h1); h1.name = 'h1a'
  const h1b = await txt('for independent', 48, 170, 48, '#fff', 'Poppins', 'Extra Bold')
  f.appendChild(h1b); h1b.name = 'h1b'
  const h1c = await txt('RIAs', 405, 170, 48, '#fff', 'Poppins', 'Extra Bold')
  f.appendChild(h1c); h1c.fills = [{ type: 'SOLID', color: hex('#257CFF') }]; h1c.name = 'h1c'

  const sub = await txt('We introduce independent RIAs to carefully curated, non-correlated\ninvestment strategies \u2014 no platform overhead, no white-label burden.\nJust access.', 48, 225, 17, '#aaa', 'Inter', 'Regular')
  f.appendChild(sub); sub.name = 'subtext'

  // Primary CTA
  const pBtn = rect(48, 310, '#257CFF', 25)
  pBtn.resize(190, 50)
  f.appendChild(pBtn); pBtn.name = 'primaryCTA'
  const pTxt = await txt('Join the Waitlist', 143, 328, 15, '#fff', 'Inter', 'Semi Bold')
  pTxt.textAlignHorizontal = 'CENTER'
  f.appendChild(pTxt); pTxt.name = 'primaryCTAText'

  // Secondary CTA
  const sTxt = await txt('See if you qualify \u2192', 258, 330, 14, '#888', 'Inter', 'Regular')
  f.appendChild(sTxt); sTxt.name = 'secondaryCTA'
  const sLine = line(258, 346, 416, 346, '#444')
  f.appendChild(sLine); sLine.name = 'secondaryLine'

  // Friction
  const fr = await txt('No commitment \u00b7 Pre-launch access \u00b7 Verified RIAs only', 48, 380, 13, '#555', 'Inter', 'Regular')
  f.appendChild(fr); fr.name = 'friction'

  // Hero right placeholder
  const phBg = rect(630, 80, '#0d2137', 16)
  phBg.resize(520, 380)
  phBg.fills = [{ type: 'SOLID', color: hex('#111') }]
  f.appendChild(phBg); phBg.name = 'placeholderBg'
  const phIcon = await txt('\uD83D\uDCCA', 890, 245, 48, '#444', 'Inter', 'Regular')
  phIcon.textAlignHorizontal = 'CENTER'
  f.appendChild(phIcon); phIcon.name = 'placeholderIcon'
  const phLabel = await txt('Institutional network graphic', 890, 295, 13, '#444', 'Inter', 'Regular')
  phLabel.textAlignHorizontal = 'CENTER'
  f.appendChild(phLabel); phLabel.name = 'placeholderLabel'

  // Trust strip
  const tsBg = rect(0, 500, '#0d0d0d')
  tsBg.resize(1200, 56)
  f.appendChild(tsBg); tsBg.name = 'trustBg'
  const tsLine = line(0, 500, 1200, 500, '#222')
  f.appendChild(tsLine); tsLine.name = 'trustLine'

  const tsItems = ['\u2713 $— B+ connected AUM', '\u2713 —+ RIA partnerships', '\u2713 SEC-compliant introducer model']
  tsItems.forEach(async (item, i) => {
    const x = [310, 600, 890][i]
    const t = await txt(item, x, 522, 13, '#555', 'Inter', 'Regular')
    t.textAlignHorizontal = 'CENTER'
    f.appendChild(t); t.name = `trust-${i}`
  })

  // Footer
  const fBg = rect(0, 556, '#0a0a0a')
  fBg.resize(1200, 48)
  f.appendChild(fBg); fBg.name = 'footerBg'
  const fLine = line(0, 556, 1200, 556, '#222')
  f.appendChild(fLine); fLine.name = 'footerLine'
  const fTxt = await txt('Wireframe \u2014 Hero Section (Desktop) \u00b7 Beat Any Investment 2026', 600, 574, 12, '#555', 'Inter', 'Regular')
  fTxt.textAlignHorizontal = 'CENTER'
  f.appendChild(fTxt); fTxt.name = 'footerText'
}

// ── FUNNEL WIREFRAME ─────────────────────────────────────
async function buildFunnelPage(page) {
  const f = page
  const bg = rect(900, 1400, '#0a0a0a')
  f.appendChild(bg); bg.name = 'bg'

  // Header
  f.appendChild(await txt('Beat Any Investment \u2014 Visitor Flow', 0, 30, 28, '#fff', 'Inter', 'Bold'))
  f.appendChild(await txt('How someone moves from first visit to waitlist registration', 0, 65, 14, '#888'))

  // Funnel stages
  const stages = [
    { title: '', label: '', desc: 'A visitor arrives at the page via search, referral, or ad', color: '#333', y: 100 },
    { title: 'First Impression', label: 'STAGE 1', desc: 'They see the hero section \u2014 they understand what this is and whether it\u2019s relevant.', color: '#333', y: 170 },
    { title: 'Interest', label: 'STAGE 2', desc: 'They scroll to the Problem section and nod along. They recognize their own challenges.', color: '#444', y: 260 },
    { title: 'Trust & Desire', label: 'STAGE 3', desc: 'They see the team credentials, read the free guide, and see that other RIAs are involved.', color: '#555', y: 350 },
    { title: 'Action', label: 'STAGE 4', desc: 'Their remaining questions are answered in the FAQ. They scroll to the final sign-up form.', color: '#257CFF', y: 440 },
    { title: 'Follow-Up', label: 'STAGE 5', desc: 'They receive a welcome email, educational content, and a notification when the service launches.', color: '#333', y: 530 },
  ]

  stages.forEach(async (s, i) => {
    const w = i === 0 ? 500 : i === 1 ? 500 : i === 2 ? 550 : i === 3 ? 600 : i === 4 ? 650 : 550
    const xOff = (900 - w) / 2
    const isAction = i === 4
    const bgColor = isAction ? '#0d1f3c' : '#111'
    const strokeColor = isAction ? '#257CFF' : s.color
    const strokeW = isAction ? 2 : 1

    const box = rect(w, i === 0 ? 40 : 80, bgColor, 8)
    box.x = xOff; box.y = s.y
    box.strokes = [{ type: 'SOLID', color: hex(strokeColor) }]
    box.strokeWeight = strokeW
    f.appendChild(box); box.name = `stage${i}`

    if (s.label) {
      const l = await txt(s.label, xOff + 16, s.y + 12, 11, isAction ? '#257CFF' : '#888', 'Inter', 'Semi Bold')
      f.appendChild(l); l.name = `stage${i}Label`
    }
    if (s.title) {
      const t = await txt(s.title, xOff + 16, s.y + 32, 16, isAction ? '#fff' : '#fff', 'Inter', 'Bold')
      f.appendChild(t); t.name = `stage${i}Title`
    }
    const d = await txt(s.desc, xOff + 16, s.y + 56, 13, '#888')
    f.appendChild(d); d.name = `stage${i}Desc`

    // Arrow between stages
    if (i < stages.length - 1) {
      const arr = await txt('\u2193', 450, s.y + (i === 0 ? 48 : 88) + 8, 24, '#333')
      arr.textAlignHorizontal = 'CENTER'
      f.appendChild(arr); arr.name = `arrow${i}`
    }
  })

  // Sections header
  f.appendChild(await txt('Page Sections', 0, 650, 20, '#fff', 'Inter', 'Bold'))
  f.appendChild(await txt('10 sections top to bottom', 0, 678, 14, '#888'))

  // Sections grid
  const sections = [
    ['01', 'Navigation', 'Logo, page links, Join Waitlist button', false],
    ['02', 'Hero', 'Headline, subtext, primary CTA, secondary CTA, trust bar', true],
    ['03', 'Problem', 'Three pain point cards (access, differentiation, fee pressure)', false],
    ['04', 'How It Works', 'Three-step introducer process', false],
    ['05', 'Credentials', 'Team, track record, regulatory standing', false],
    ['06', 'Free Guide', 'Educational PDF download with email capture', true],
    ['07', 'Social Proof', 'Testimonials and interest metrics', false],
    ['08', 'FAQ', '9 questions covering introducer model, compliance, fees', false],
    ['09', 'Sign-Up', 'Benefit recap + waitlist registration form', true],
    ['10', 'Footer', 'Legal disclaimer, links, contact', false],
  ]

  sections.forEach(async (s, i) => {
    const col = i % 2
    const row = Math.floor(i / 2)
    const x = col === 0 ? 0 : 450
    const y = 700 + row * 72
    const borderC = s[3] ? '#257CFF' : '#222'

    const card = rect(430, 60, '#0d0d0d', 8)
    card.x = x; card.y = y
    card.strokes = [{ type: 'SOLID', color: hex(borderC) }]
    card.strokeWeight = s[3] ? 2 : 1
    f.appendChild(card); card.name = `section${s[0]}`

    const num = await txt(s[0], x + 12, y + 10, 11, '#257CFF', 'Inter', 'Bold')
    f.appendChild(num)
    const title = await txt(s[1], x + 12, y + 26, 13, '#fff', 'Inter', 'Semi Bold')
    f.appendChild(title)
    const desc = await txt(s[2], x + 12, y + 42, 12, '#888')
    f.appendChild(desc)
  })

  // Legend
  f.appendChild(await txt('\u25a0 Action / CTA section', 225, 1100, 12, '#888'))
  f.appendChild(await txt('\u25a0 Content section', 480, 1100, 12, '#888'))
}

// ── FULL PAGE WIREFRAME ──────────────────────────────────
async function buildFullpagePage(page) {
  const f = page
  const bg = rect(1000, 980, '#0a0a0a')
  f.appendChild(bg); bg.name = 'bg'
  f.appendChild(await txt('Beat Any Investment \u2014 Full Page Layout', 0, 20, 26, '#fff', 'Poppins', 'Bold'))
  f.appendChild(await txt('Desktop \u00b7 10 sections top to bottom', 0, 52, 14, '#888'))

  const sections = [
    { n: '01', t: 'NAVIGATION', desc: '[LOGO] \u00b7 For RIAs \u00b7 How It Works \u00b7 About \u00b7 FAQs \u00b7 [Join Waitlist]', isCTA: false, y: 80, h: 40 },
    { n: '02', t: 'HERO', desc: 'Eyebrow \u2192 H1 \u2192 Subtext \u2192 Primary CTA \u2192 Secondary CTA \u2192 Right visual', isCTA: true, y: 130, h: 70 },
    { n: '03', t: 'PROBLEM', desc: '3 pain point cards: Limited Access \u00b7 Hard to Stand Out \u00b7 Fee Pressure', isCTA: false, y: 210, h: 40 },
    { n: '04', t: 'HOW IT WORKS', desc: '3-step: We Source \u2192 You Offer \u2192 We Facilitate', isCTA: false, y: 260, h: 40 },
    { n: '05', t: 'CREDENTIALS', desc: 'Team photos + bios \u00b7 SEC-compliant \u00b7 Verifiable track record', isCTA: false, y: 310, h: 40 },
    { n: '06', t: 'LEAD MAGNET', desc: '"Alternative Investments for Independent RIAs" PDF \u00b7 Name \u00b7 Email \u00b7 Firm \u00b7 AUM', isCTA: true, y: 360, h: 50 },
    { n: '07', t: 'SOCIAL PROOF', desc: 'RIA testimonials with photo + name + firm', isCTA: false, y: 420, h: 40 },
    { n: '08', t: 'FAQ', desc: '9 questions: introducer model \u00b7 compliance \u00b7 fees \u00b7 vettings', isCTA: false, y: 470, h: 40 },
    { n: '09', t: 'FINAL SIGN-UP', desc: 'Benefit recap + form: Name \u00b7 Email \u00b7 Firm \u00b7 AUM \u00b7 Phone', isCTA: true, y: 520, h: 50 },
    { n: '10', t: 'FOOTER', desc: 'Disclaimer \u00b7 Terms \u00b7 Privacy \u00b7 partners@beatanyinvestment.com \u00b7 LinkedIn', isCTA: false, y: 580, h: 40 },
  ]

  sections.forEach(async (s, i) => {
    const borderC = s.isCTA ? '#257CFF' : '#333'
    const bgC = s.n === '10' ? '#0d0d0d' : '#0d0d0d'
    const numBg = s.isCTA ? '#257CFF' : '#222'
    const numFg = '#fff'

    const card = rect(1000, s.h, bgC, 8)
    card.x = 0; card.y = s.y
    card.strokes = [{ type: 'SOLID', color: hex(borderC) }]
    card.strokeWeight = s.isCTA ? 2 : 1
    f.appendChild(card); card.name = `section${s.n}`

    // Circle with number
    const circle = rect(24, 24, numBg, 12)
    circle.x = 8; circle.y = s.y + (s.h - 24) / 2
    f.appendChild(circle); circle.name = `num${s.n}`
    const num = await txt(s.n, 20, s.y + (s.h - 24) / 2 + 2, 11, numFg, 'Inter', 'Bold')
    num.textAlignHorizontal = 'CENTER'
    f.appendChild(num)

    const title = await txt(s.t, 44, s.y + 8, 13, '#fff', 'Inter', 'Semi Bold')
    f.appendChild(title)
    const desc = await txt(s.desc, 44, s.y + s.h - 20, 12, '#888')
    f.appendChild(desc)
  })

  // Legend
  f.appendChild(await txt('\u25a0 Action / CTA section', 265, 660, 12, '#888'))
  f.appendChild(await txt('\u25a0 Content section', 465, 660, 12, '#888'))
  f.appendChild(await txt('\u25a0 Footer', 640, 660, 12, '#888'))
}

// ── MAIN ──────────────────────────────────────────────────
async function main() {
  await figma.loadFontAsync({ family: 'Inter', style: 'Regular' })
  await figma.loadFontAsync({ family: 'Inter', style: 'Bold' })
  await figma.loadFontAsync({ family: 'Inter', style: 'Semi Bold' })
  await figma.loadFontAsync({ family: 'Inter', style: 'Extra Bold' })
  await figma.loadFontAsync({ family: 'Poppins', style: 'Regular' })
  await figma.loadFontAsync({ family: 'Poppins', style: 'Bold' })
  await figma.loadFontAsync({ family: 'Poppins', style: 'Extra Bold' })

  const heroPage = figma.createPage()
  heroPage.name = 'Hero Wireframe'
  await buildHeroPage(heroPage)

  const funnelPage = figma.createPage()
  funnelPage.name = 'Funnel Flow'
  await buildFunnelPage(funnelPage)

  const fullPage = figma.createPage()
  fullPage.name = 'Full Page Layout'
  await buildFullpagePage(fullPage)

  figma.currentPage = heroPage
  figma.closePlugin()
}

main()
