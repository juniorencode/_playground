class Color {
  constructor(input) {
    this.rgba = this.parseRGBA(input);
  }

  parseRGBA(string) {
    string = string.replace('rgba(', '').replace(')', '');

    const rgbaValues = string.split(',');

    const r = parseInt(rgbaValues[0].trim());
    const g = parseInt(rgbaValues[1].trim());
    const b = parseInt(rgbaValues[2].trim());
    const a = parseFloat(rgbaValues[3]?.trim()) || 1;

    return { r, g, b, a };
  }

  // convert
  rgbToHex(rgb) {
    const { r, g, b } = rgb;

    return { hex: this.numbToHex(r) + this.numbToHex(g) + this.numbToHex(b) };
  }

  rgbToCmyk(rgb) {
    const { red, green, blue } = this.normalizeRgb(rgb);
    let c = 1 - red;
    let m = 1 - green;
    let y = 1 - blue;
    let k = Math.min(c, m, y);

    c = Math.round((((c - k) / (1 - k)) * 100) / 100) || 0;
    m = Math.round((((m - k) / (1 - k)) * 100) / 100) || 0;
    y = Math.round((((y - k) / (1 - k)) * 100) / 100) || 0;
    k = Math.round((k * 100) / 100) || 0;

    return { c, m, y, k };
  }

  rgbToHs(rgb) {
    const { red, green, blue } = this.normalizeRgb(rgb);
    const max = Math.max(red, green, blue);
    const min = Math.min(red, green, blue);
    let h, s, l;

    l = (max + min) / 2;

    if (max === min) return { h: 0, s: 0, l };

    const delta = max - min;

    if (max === red) h = (green - blue) / delta;
    else if (max === green) h = 2 + (blue - red) / delta;
    else h = 4 + (red - green) / delta;

    h *= 60;
    s = delta / (1 - Math.abs(2 * l - 1));

    if (h < 0) h += 360;

    return {
      h: Math.round(h),
      s: Math.round(s * 100) / 100,
      l: Math.round(l * 100) / 100
    };
  }

  rgbToHsl(rgb) {
    const { h, s, l } = this.rgbToHs(rgb);
    return { h, s, l };
  }

  rgbaToHex(rgba) {
    return this.rgbToHex(this.mixAlpha(rgba));
  }

  rgbaToCmyk(rgba) {
    return this.rgbToCmyk(this.mixAlpha(rgba));
  }

  rgbaToHsla(rgba) {
    const { h, s, l } = this.rgbToHs(this.rgba);
    return { h, s, l, a: rgba.a };
  }

  // object
  toHex() {
    return this.rgbaToHex(this.rgba);
  }

  toCmyk() {
    return this.rgbaToCmyk(this.rgba);
  }

  toRgb() {
    return this.mixAlpha(this.rgba);
  }

  toHsl() {
    return this.rgbToHsl(this.mixAlpha(this.rgba));
  }

  toRgba() {
    return this.rgba;
  }

  toHsla() {
    return this.rgbaToHsla(this.rgba);
  }

  // string
  toHexString() {
    const { hex } = this.toHex();
    return `#${hex}`;
  }

  toCmykString() {
    const { c, m, y, k } = this.toCmyk();
    return `C${c} M${m} Y${y} K${k}`;
  }

  toRgbString() {
    const { r, g, b } = this.toRgb();
    return `rgb(${r}, ${g}, ${b})`;
  }

  toHslString() {
    const { h, s, l } = this.toHsl();
    return `hsl(${h}, ${Math.floor(s * 100)}%, ${Math.floor(l * 100)}%)`;
  }

  toRgbaString() {
    const { r, g, b, a } = this.toRgba();
    return `rgba(${r}, ${g}, ${b}, ${a})`;
  }

  toHslaString() {
    const { h, s, l, a } = this.toHsla();
    return `hsla(${h}, ${Math.round(s * 100)}%, ${Math.round(l * 100)}%, ${a})`;
  }

  // helpers
  normalizeRgb(rgb) {
    const { r, g, b } = rgb;
    const red = r / 255;
    const green = g / 255;
    const blue = b / 255;

    return { red, green, blue };
  }

  mixAlpha(rgba) {
    const { r, g, b, a } = rgba;
    const mixedR = Math.round((1 - a) * 255 + a * r);
    const mixedG = Math.round((1 - a) * 255 + a * g);
    const mixedB = Math.round((1 - a) * 255 + a * b);

    return { r: mixedR, g: mixedG, b: mixedB };
  }

  numbToHex(numb) {
    return numb.toString(16).padStart(2, '0');
  }
}
