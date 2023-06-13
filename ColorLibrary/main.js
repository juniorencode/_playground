class Color {
  constructor(input) {
    if (!input || input.trim() === '')
      throw new Error('Invalid color: color cannot be empty or null.');

    this.regexHex = /^#?[a-f0-9]{3}(?:[a-f0-9]{3})?$/i;

    console.log(this.validateInput(input));
    // this.validateInput(input);
    // this.rgba = this.parseRGBA(input);
  }

  validateInput(color) {
    // hexadecimal: #000, #0000, #000000
    if (this.regexHex.test(color)) {
      return true;
    }

    // no match found for any format
    return false;
  }

  parseRGBA(string) {
    string = string.replace('rgba(', '').replace(')', '');

    const rgbaValues = string.split(',');

    if (rgbaValues.length < 2 && rgbaValues.length > 3)
      throw new Error('Invalid color: values are missing or incorrect.');

    const r = parseInt(rgbaValues[0].trim());
    const g = parseInt(rgbaValues[1].trim());
    const b = parseInt(rgbaValues[2].trim());
    const a = parseFloat(rgbaValues[3]?.trim()) || 1;

    if (isNaN(r) || isNaN(g) || isNaN(b) || isNaN(a)) {
      throw new Error('Invalid color: values must be numeric.');
    }

    if (r < 0 || r > 255 || g < 0 || g > 255 || b < 0 || b > 255) {
      throw new Error('Invalid color: values must be between 0 and 255.');
    }

    if (a < 0 || a > 1) {
      throw new Error('Invalid color: alpha value must be between 0 and 1.');
    }

    return { r, g, b, a };
  }

  // convert color
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
    const delta = max - min;
    let h, s, l, b;

    l = (max + min) / 2;
    b = max;

    if (delta === 0) h = 0;
    else {
      if (max === red) h = (green - blue) / delta;
      else if (max === green) h = 2 + (blue - red) / delta;
      else h = 4 + (red - green) / delta;

      h *= 60;
      if (h < 0) h += 360;
    }

    if (delta === 0) s = 0;
    else s = delta / (1 - Math.abs(2 * l - 1));

    return {
      h: Math.round(h),
      s: Math.round(s * 100) / 100,
      l: Math.round(l * 100) / 100,
      b: Math.round(b * 100) / 100
    };
  }

  rgbToHsl(rgb) {
    const { h, s, l } = this.rgbToHs(rgb);
    return { h, s, l };
  }

  rgbToHsb(rgb) {
    const { h, s, b } = this.rgbToHs(rgb);
    return { h, s, b };
  }

  rgbToHsv(rgb) {
    const { h, s, b } = this.rgbToHs(rgb);
    return { h, s, v: b };
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

  rgbaToHsba(rgba) {
    const { h, s, b } = this.rgbToHs(this.rgba);
    return { h, s, b, a: rgba.a };
  }

  rgbaToHsva(rgba) {
    const { h, s, b } = this.rgbToHs(this.rgba);
    return { h, s, v: b, a: rgba.a };
  }

  // convert to object
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

  toHsb() {
    return this.rgbToHsb(this.mixAlpha(this.rgba));
  }

  toHsv() {
    return this.rgbToHsv(this.mixAlpha(this.rgba));
  }

  toRgba() {
    return this.rgba;
  }

  toHsla() {
    return this.rgbaToHsla(this.rgba);
  }

  toHsba() {
    return this.rgbaToHsba(this.rgba);
  }

  toHsva() {
    return this.rgbaToHsva(this.rgba);
  }

  // convert to string
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

  toHsbString() {
    const { h, s, b } = this.toHsb();
    return `hsb(${h}, ${Math.floor(s * 100)}%, ${Math.floor(b * 100)}%)`;
  }

  toHsvString() {
    const { h, s, v } = this.toHsv();
    return `hsv(${h}, ${Math.floor(s * 100)}%, ${Math.floor(v * 100)}%)`;
  }

  toRgbaString() {
    const { r, g, b, a } = this.toRgba();
    return `rgba(${r}, ${g}, ${b}, ${a})`;
  }

  toHslaString() {
    const { h, s, l, a } = this.toHsla();
    return `hsla(${h}, ${Math.round(s * 100)}%, ${Math.round(l * 100)}%, ${a})`;
  }

  toHsbaString() {
    const { h, s, b, a } = this.toHsba();
    return `hsba(${h}, ${Math.round(s * 100)}%, ${Math.round(b * 100)}%, ${a})`;
  }

  toHsvaString() {
    const { h, s, v, a } = this.toHsva();
    return `hsva(${h}, ${Math.round(s * 100)}%, ${Math.round(v * 100)}%, ${a})`;
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
