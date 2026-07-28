// Sticker assets module - Spider-Man themed inline SVG stickers
// Using data URIs for Spider-Man themed decorative elements

const createSvgDataUri = (svgContent: string): string => {
  return `data:image/svg+xml,${encodeURIComponent(svgContent)}`;
};

// Spider emblem
const spiderSvg = createSvgDataUri(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 80"><circle cx="40" cy="35" r="8" fill="#1a1a1a"/><ellipse cx="40" cy="48" rx="5" ry="10" fill="#1a1a1a"/><line x1="40" y1="27" x2="20" y2="10" stroke="#1a1a1a" stroke-width="2"/><line x1="40" y1="27" x2="60" y2="10" stroke="#1a1a1a" stroke-width="2"/><line x1="33" y1="35" x2="10" y2="28" stroke="#1a1a1a" stroke-width="2"/><line x1="47" y1="35" x2="70" y2="28" stroke="#1a1a1a" stroke-width="2"/><line x1="35" y1="45" x2="12" y2="55" stroke="#1a1a1a" stroke-width="2"/><line x1="45" y1="45" x2="68" y2="55" stroke="#1a1a1a" stroke-width="2"/><line x1="37" y1="55" x2="22" y2="72" stroke="#1a1a1a" stroke-width="2"/><line x1="43" y1="55" x2="58" y2="72" stroke="#1a1a1a" stroke-width="2"/></svg>`);

// Web cluster
const webSvg = createSvgDataUri(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 80"><circle cx="40" cy="40" r="35" fill="none" stroke="#B91C1C" stroke-width="0.8" opacity="0.6"/><circle cx="40" cy="40" r="25" fill="none" stroke="#B91C1C" stroke-width="0.8" opacity="0.5"/><circle cx="40" cy="40" r="15" fill="none" stroke="#B91C1C" stroke-width="0.8" opacity="0.4"/><circle cx="40" cy="40" r="5" fill="none" stroke="#B91C1C" stroke-width="0.8" opacity="0.3"/><line x1="40" y1="5" x2="40" y2="75" stroke="#B91C1C" stroke-width="0.8" opacity="0.5"/><line x1="5" y1="40" x2="75" y2="40" stroke="#B91C1C" stroke-width="0.8" opacity="0.5"/><line x1="15" y1="15" x2="65" y2="65" stroke="#B91C1C" stroke-width="0.8" opacity="0.5"/><line x1="65" y1="15" x2="15" y2="65" stroke="#B91C1C" stroke-width="0.8" opacity="0.5"/></svg>`);

// Comic speech bubble "POW!"
const powSvg = createSvgDataUri(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 80"><polygon points="50,0 61,25 90,25 67,42 75,70 50,52 25,70 33,42 10,25 39,25" fill="#DC2626" stroke="#7F1D1D" stroke-width="2"/><text x="50" y="42" text-anchor="middle" fill="white" font-size="16" font-weight="bold" font-family="Impact,sans-serif">POW!</text></svg>`);

// Camera (Peter Parker's camera)
const cameraSvg = createSvgDataUri(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 60"><rect x="10" y="15" width="60" height="40" rx="5" fill="#374151"/><circle cx="40" cy="35" r="12" fill="#1E3A5F" stroke="#9CA3AF" stroke-width="2"/><circle cx="40" cy="35" r="7" fill="#60A5FA"/><circle cx="40" cy="35" r="3" fill="white" opacity="0.6"/><rect x="28" y="8" width="24" height="10" rx="2" fill="#4B5563"/><circle cx="60" cy="20" r="3" fill="#DC2626"/></svg>`);

// Comic "THWIP!" burst
const thwipSvg = createSvgDataUri(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 60"><ellipse cx="50" cy="30" rx="45" ry="25" fill="#FEF2F2" stroke="#DC2626" stroke-width="2"/><text x="50" y="36" text-anchor="middle" fill="#B91C1C" font-size="18" font-weight="bold" font-family="'Comic Sans MS',Impact,sans-serif">THWIP!</text></svg>`);

// Web shooter
const webShooterSvg = createSvgDataUri(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 80"><path d="M40 10 Q60 40 40 70" fill="none" stroke="#B91C1C" stroke-width="2" opacity="0.7"/><path d="M40 10 Q20 40 40 70" fill="none" stroke="#B91C1C" stroke-width="2" opacity="0.7"/><path d="M40 10 Q50 25 60 40 Q50 55 40 70" fill="none" stroke="#B91C1C" stroke-width="1" opacity="0.4"/><circle cx="40" cy="40" r="4" fill="#DC2626"/></svg>`);

// Spidey mask mini icon
const maskSvg = createSvgDataUri(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 70"><ellipse cx="40" cy="35" rx="30" ry="28" fill="#DC2626"/><ellipse cx="28" cy="30" rx="10" ry="8" fill="white" transform="rotate(-10 28 30)"/><ellipse cx="52" cy="30" rx="10" ry="8" fill="white" transform="rotate(10 52 30)"/><path d="M40 8 Q28 20 20 35 Q28 50 40 58 Q52 50 60 35 Q52 20 40 8" fill="none" stroke="#1a1a1a" stroke-width="1" opacity="0.4"/></svg>`);

// NYC skyline silhouette
const skylineSvg = createSvgDataUri(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 60"><rect x="10" y="30" width="12" height="30" fill="#1E3A5F" opacity="0.7"/><rect x="25" y="15" width="10" height="45" fill="#1E3A5F" opacity="0.7"/><rect x="38" y="25" width="15" height="35" fill="#1E3A5F" opacity="0.7"/><rect x="56" y="10" width="8" height="50" fill="#1E3A5F" opacity="0.7"/><rect x="67" y="20" width="14" height="40" fill="#1E3A5F" opacity="0.7"/><rect x="84" y="28" width="12" height="32" fill="#1E3A5F" opacity="0.7"/><rect x="99" y="18" width="11" height="42" fill="#1E3A5F" opacity="0.7"/></svg>`);

// Comic "WHAM!" 
const whamSvg = createSvgDataUri(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 60"><polygon points="50,2 58,22 80,22 62,36 68,56 50,44 32,56 38,36 20,22 42,22" fill="#FBBF24" stroke="#B91C1C" stroke-width="2"/><text x="50" y="38" text-anchor="middle" fill="#7F1D1D" font-size="14" font-weight="bold" font-family="Impact,sans-serif">WHAM!</text></svg>`);

// Daily Bugle newspaper
const bugleSvg = createSvgDataUri(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 60"><rect x="5" y="5" width="70" height="50" rx="2" fill="#FEF3C7" stroke="#92400E" stroke-width="1.5"/><rect x="10" y="10" width="60" height="8" fill="#92400E"/><text x="40" y="17" text-anchor="middle" fill="white" font-size="7" font-weight="bold" font-family="serif">DAILY BUGLE</text><line x1="10" y1="25" x2="65" y2="25" stroke="#D4A373" stroke-width="1"/><line x1="10" y1="30" x2="55" y2="30" stroke="#D4A373" stroke-width="1"/><line x1="10" y1="35" x2="60" y2="35" stroke="#D4A373" stroke-width="1"/><line x1="10" y1="40" x2="50" y2="40" stroke="#D4A373" stroke-width="1"/></svg>`);

// Red star (from reference images)
const redStarSvg = createSvgDataUri(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 80"><polygon points="40,5 49,30 75,30 54,45 62,72 40,55 18,72 26,45 5,30 31,30" fill="#DC2626" stroke="#7F1D1D" stroke-width="1.5"/></svg>`);

// Heart with web pattern
const webHeartSvg = createSvgDataUri(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 80"><path d="M40 70 L10 40 Q5 25 20 20 Q35 15 40 30 Q45 15 60 20 Q75 25 70 40 Z" fill="#DC2626" stroke="#7F1D1D" stroke-width="1.5"/><path d="M40 30 L40 65" stroke="white" stroke-width="0.5" opacity="0.3"/><path d="M25 35 L55 35" stroke="white" stroke-width="0.5" opacity="0.3"/></svg>`);

// Small spider silhouette
const miniSpiderSvg = createSvgDataUri(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50"><circle cx="25" cy="20" r="5" fill="#1a1a1a"/><ellipse cx="25" cy="30" rx="3" ry="7" fill="#1a1a1a"/><line x1="22" y1="18" x2="12" y2="10" stroke="#1a1a1a" stroke-width="1.5"/><line x1="28" y1="18" x2="38" y2="10" stroke="#1a1a1a" stroke-width="1.5"/><line x1="20" y1="22" x2="8" y2="25" stroke="#1a1a1a" stroke-width="1.5"/><line x1="30" y1="22" x2="42" y2="25" stroke="#1a1a1a" stroke-width="1.5"/><line x1="22" y1="30" x2="12" y2="40" stroke="#1a1a1a" stroke-width="1.5"/><line x1="28" y1="30" x2="38" y2="40" stroke="#1a1a1a" stroke-width="1.5"/></svg>`);

// Web corner decoration
const webCornerSvg = createSvgDataUri(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 80"><path d="M0 0 Q40 10 80 0" fill="none" stroke="#B91C1C" stroke-width="1" opacity="0.4"/><path d="M0 0 Q10 40 0 80" fill="none" stroke="#B91C1C" stroke-width="1" opacity="0.4"/><path d="M0 0 L80 80" stroke="#B91C1C" stroke-width="0.5" opacity="0.3"/><path d="M0 0 Q30 20 60 60" fill="none" stroke="#B91C1C" stroke-width="0.5" opacity="0.3"/></svg>`);

// Comic ZAP
const zapSvg = createSvgDataUri(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 90 60"><polygon points="45,0 55,20 90,10 60,30 85,55 45,35 5,55 30,30 0,10 35,20" fill="#FBBF24" stroke="#DC2626" stroke-width="2"/><text x="45" y="35" text-anchor="middle" fill="#7F1D1D" font-size="12" font-weight="bold" font-family="Impact,sans-serif">ZAP!</text></svg>`);

// I ❤️ NY style
const loveNYSvg = createSvgDataUri(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 60"><text x="10" y="25" fill="#1E3A5F" font-size="14" font-weight="bold" font-family="serif">I</text><path d="M28 25 L22 18 Q19 12 24 10 Q29 8 28 15 Q27 8 32 10 Q37 12 34 18 Z" fill="#DC2626"/><text x="38" y="25" fill="#1E3A5F" font-size="14" font-weight="bold" font-family="serif">NY</text></svg>`);

export const stickers = [
  spiderSvg,
  webSvg,
  powSvg,
  cameraSvg,
  thwipSvg,
  webShooterSvg,
  maskSvg,
  skylineSvg,
  whamSvg,
  bugleSvg,
  redStarSvg,
  webHeartSvg,
  miniSpiderSvg,
  webCornerSvg,
  zapSvg,
  loveNYSvg,
];

// All stickers are now SVG data URIs
export const stickersWebp = stickers;

export default stickers;