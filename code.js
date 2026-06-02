figma.loadFontAsync({ family: 'Inter', style: 'Regular' }).then(() => {
  const frame = figma.createFrame()
  frame.resize(1200, 700)
  frame.name = 'Hero Wireframe'
  frame.fills = [{ type: 'SOLID', color: { r: 0.04, g: 0.04, b: 0.04 } }]
  figma.currentPage.appendChild(frame)
  figma.currentPage.name = 'Hero Wireframe'

  const navBg = figma.createRectangle()
  navBg.resize(1200, 56)
  navBg.fills = [{ type: 'SOLID', color: { r: 0.04, g: 0.04, b: 0.04 } }]
  frame.appendChild(navBg)

  const logo = figma.createText()
  logo.characters = 'BEAT ANY INVESTMENT'
  logo.fontName = { family: 'Inter', style: 'Bold' }
  logo.fontSize = 18
  logo.x = 48; logo.y = 18
  logo.fills = [{ type: 'SOLID', color: { r: 1, g: 1, b: 1 } }]
  frame.appendChild(logo)

  const cta = figma.createRectangle()
  cta.resize(100, 28)
  cta.x = 1068; cta.y = 16
  cta.fills = [{ type: 'SOLID', color: { r: 0.145, g: 0.486, b: 1 } }]
  cta.cornerRadius = 14
  frame.appendChild(cta)

  const ctaText = figma.createText()
  ctaText.characters = 'Join Waitlist'
  ctaText.fontName = { family: 'Inter', style: 'Semi Bold' }
  ctaText.fontSize = 13
  ctaText.x = 1078; ctaText.y = 21
  ctaText.fills = [{ type: 'SOLID', color: { r: 1, g: 1, b: 1 } }]
  frame.appendChild(ctaText)

  const headline = figma.createText()
  headline.characters = 'Exclusive alternative investments for independent RIAs'
  headline.fontName = { family: 'Inter', style: 'Bold' }
  headline.fontSize = 48
  headline.x = 48; headline.y = 110
  headline.fills = [{ type: 'SOLID', color: { r: 1, g: 1, b: 1 } }]
  frame.appendChild(headline)

  const sub = figma.createText()
  sub.characters = 'We introduce independent RIAs to carefully curated, non-correlated\ninvestment strategies \u2014 no platform overhead, no white-label burden.'
  sub.fontName = { family: 'Inter', style: 'Regular' }
  sub.fontSize = 18
  sub.x = 48; headline.y = 180
  sub.fills = [{ type: 'SOLID', color: { r: 0.67, g: 0.67, b: 0.67 } }]
  frame.appendChild(sub)

  figma.closePlugin()
})
