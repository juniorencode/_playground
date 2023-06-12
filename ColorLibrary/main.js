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

  rgbaToHex(rgba) {
    return this.rgbToHex(this.mixAlpha(rgba));
  }

  rgbToHex(rgb) {
    const { r, g, b } = rgb;

    return { hex: this.numbToHex(r) + this.numbToHex(g) + this.numbToHex(b) };
  }

  rgbaToCmyk(rgba) {
    return this.rgbToCmyk(this.mixAlpha(rgba));
  }

  rgbToCmyk(rgb) {
    const { r, g, b } = rgb;
    const red = r / 255;
    const green = g / 255;
    const blue = b / 255;
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

  toRgb() {
    return this.mixAlpha(this.rgba);
  }

  toRgbString() {
    const { r, g, b } = this.toRgb();
    return `rgba(${r}, ${g}, ${b})`;
  }

  toRgba() {
    return this.rgba;
  }

  toRgbaString() {
    const { r, g, b, a } = this.toRgba();
    return `rgba(${r}, ${g}, ${b}, ${a})`;
  }

  toHex() {
    return this.rgbaToHex(this.rgba);
  }

  toHexString() {
    return `#${this.toHex().hex}`;
  }

  toCmyk() {
    return this.rgbaToCmyk(this.rgba);
  }

  toCmykString() {
    const { c, m, y, k } = this.toCmyk();
    return `C${c} M${m} Y${y} K${k}`;
  }

  // helpers
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
