class Color {
  constructor(input) {
    this.rgba = this.parseRGBA(input);

    console.log(this.rgba);
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

  mixAlpha(rgba) {
    const { r, g, b, a } = rgba;
    const mixedR = Math.round((1 - a) * 255 + a * r);
    const mixedG = Math.round((1 - a) * 255 + a * g);
    const mixedB = Math.round((1 - a) * 255 + a * b);

    return { r: mixedR, g: mixedG, b: mixedB };
  }

  rgbToHex(rgb) {
    const { r, g, b } = rgb;

    return { hex: this.numbToHex(r) + this.numbToHex(g) + this.numbToHex(b) };
  }

  numbToHex(numb) {
    return numb.toString(16).padStart(2, '0');
  }

  toHex() {
    return this.rgbaToHex(this.rgba);
  }

  toHexString() {
    return `#${this.toHex().hex}`;
  }
}
