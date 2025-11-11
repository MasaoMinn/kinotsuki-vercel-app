

export function seededColor(seed: number) {
  // simple LCG
  const s = (seed * 9301 + 49297) % 233280;
  const rand = s / 233280;
  // generate hue from rand
  const h = Math.floor(rand * 360);
  const sPerc = 60 + Math.floor(rand * 20);
  const l = 50;
  // convert HSL to hex
  return hslToHex(h, sPerc, l);
}

function hslToHex(h: number, s: number, l: number) {
  s /= 100;
  l /= 100;
  const k = (n: number) => (n + h / 30) % 12;
  const a = s * Math.min(l, 1 - l);
  const f = (n: number) =>
    l - a * Math.max(Math.min(k(n) - 3, 9 - k(n), 1), -1);
  const toHex = (x: number) => {
    const v = Math.round(255 * x).toString(16).padStart(2, '0');
    return v;
  };
  return `#${toHex(f(0))}${toHex(f(8))}${toHex(f(4))}`;
}

export function invertHex(hex: string) {
  // normalize
  const hx = hex.replace('#', '');
  const r = parseInt(hx.substring(0, 2), 16);
  const g = parseInt(hx.substring(2, 4), 16);
  const b = parseInt(hx.substring(4, 6), 16);
  // luminance check -> pick black or white if extreme
  const lum = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  if (lum > 0.6) return '#000000';
  if (lum < 0.35) return '#ffffff';
  // otherwise invert color
  const ir = (255 - r).toString(16).padStart(2, '0');
  const ig = (255 - g).toString(16).padStart(2, '0');
  const ib = (255 - b).toString(16).padStart(2, '0');
  return `#${ir}${ig}${ib}`;
}
