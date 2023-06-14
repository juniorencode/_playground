class Color {
  constructor(input) {
    if (!input || input.trim() === '')
      throw 'Invalid color: color cannot be empty or null.';

    this.regexHex = /^(#?)([a-f0-9]{3}(?:[a-f0-9]{3})?)$/i;
    this.regexRgba =
      /^(rgba?)\s*\(?\s*(\d{1,3})(?:\s*,\s*|\s+)(\d{1,3})(?:\s*,\s*|\s+)(\d{1,3})\s*(?:(?:,\s*|\s+)(0?\.?\d+))?\)?\s*$/i;
    this.regexHsxa =
      /^(hs(?:l|b|v)a?)\s*\(?\s*(\d{1,3})(?:\s*,\s*|\s+)(0?\.?\d{1,3}%?)(?:\s*,\s*|\s+)(0?\.?\d{1,3}%?)\s*(?:(?:,\s*|\s+)(0?\.?\d+))?\)?\s*$/i;

    this.rgba = { r: 0, g: 0, b: 0, a: 1 };
    this.validateInput(input);
    // this.rgba = this.parseRGBA(input);
  }

  validateInput(color) {
    // Hexadecimal:
    // 000
    // #000
    // 000000
    // #000000
    const matchHex = color.match(this.regexHex);
    if (matchHex) {
      this.rgba = this.hexToRgb(matchHex[2]);
      return true;
    }

    // RGB and RGBA:
    // rgb 255 0 0
    // rgb(255, 0, 0)
    // rgba 255 0 0 .5
    // rgba(255, 0, 0, .5)
    const matchRgba = color.match(this.regexRgba);
    if (matchRgba) {
      const type = matchRgba[1].toLowerCase();
      const red = parseInt(matchRgba[2]);
      const green = parseInt(matchRgba[3]);
      const blue = parseInt(matchRgba[4]);
      const alpha = matchRgba[5] && parseFloat(matchRgba[5]);

      if (type === 'rgb' && typeof alpha === 'number')
        throw 'Invalid RGB: must not include a fourth component.';

      if (type === 'rgba' && !typeof alpha === 'number')
        throw 'Invalid RGBA: must include a fourth component.';

      if (0 > red || red > 255)
        throw 'Invalid color: red color is out of valid range (0-255).';

      if (0 > green || green > 255)
        throw 'Invalid color: green color is out of valid range (0-255).';

      if (0 > blue || blue > 255)
        throw 'Invalid color: blue color is out of valid range (0-255).';

      if (0 > alpha || alpha > 1)
        throw 'Invalid color: the transparency value is outside the valid range (0-1).';

      this.rgba = { r: red, g: green, b: blue, a: alpha | 1 };

      return true;
    }

    // HSX and HSXA:
    // hsx 0 1 5.5
    // hsx 0 100% 50%
    // hsx(0, 1, .5)
    // hsx(0, 100%, 50%)
    // hsxa 0 1 .5 .5
    // hsxa 0 100% 50% .5
    // hsxa(0, 100%, 50%, .5)
    const matchHsxa = color.match(this.regexHsxa);
    if (matchHsxa) {
      const isSatPercent = matchHsxa[3].includes('%');
      const isValPercent = matchHsxa[4].includes('%');
      const type = matchHsxa[1].toLowerCase();
      const hue = parseInt(matchHsxa[2]);
      const alpha = matchHsxa[5] && parseFloat(matchHsxa[5]);
      let saturation, value;

      if (!type.includes('a') && typeof alpha === 'number')
        throw `Invalid ${type.toUpperCase()}: must not include a fourth component.`;

      if (type.includes('a') && !typeof alpha === 'number')
        throw `Invalid ${type.toUpperCase()}: must include a fourth component.`;

      if (0 > hue || hue > 360)
        throw 'Invalid color: hue is out of valid range (0-360).';

      if (isSatPercent) {
        saturation = parseInt(matchHsxa[3]);
        if (0 > saturation || saturation > 100)
          throw 'Invalid color: saturation is out of valid range (0-100)';
        saturation = parseFloat(saturation / 100);
      } else {
        saturation = parseFloat(matchHsxa[3]);
        if (0 > saturation || saturation > 1)
          throw 'Invalid color: saturation is out of valid range (0-1)';
      }

      const name = type.includes('hsl')
        ? 'lightness'
        : type.includes('hsb')
        ? 'brightness'
        : 'value';
      if (isValPercent) {
        value = parseInt(matchHsxa[4]);
        if (0 > value || value > 100)
          throw `Invalid color: ${name} is out of valid range (0-100)`;
        value = parseFloat(value / 100);
      } else {
        value = parseFloat(matchHsxa[4]);
        if (0 > value || value > 1)
          throw `Invalid color: ${name} is out of valid range (0-1)`;
      }

      if (0 > alpha || alpha > 1)
        throw 'Invalid color: the transparency value is outside the valid range (0-1).';

      if (this.type.includes('hsl'))
        this.rgba = { ...this.hslToRgb(hue, saturation, value), a: alpha | 1 };

      if (this.type.includes('hsb') || this.type.includes('hsv'))
        this.rgba = { ...this.hsvToRgb(hue, saturation, value), a: alpha | 1 };
    }

    // no match found for any format
    return false;
  }

  // convert color
  hexToRgb(hex) {
    if (hex.length === 3)
      hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];

    const red = parseInt(hex.substring(0, 2), 16);
    const green = parseInt(hex.substring(2, 4), 16);
    const blue = parseInt(hex.substring(4, 6), 16);

    return { r: red, g: green, b: blue, a: 1 };
  }

  hslToRgb(h, s, l) {
    let r, g, b;

    const hue = h / 360;
    const saturation = s / 100;
    const lightness = l / 100;

    if (saturation === 0) {
      r = g = b = lightness;
    } else {
      const q =
        lightness < 0.5
          ? lightness * (1 + saturation)
          : lightness + saturation - lightness * saturation;
      const p = 2 * lightness - q;

      r = hueToRgb(p, q, hue + 1 / 3);
      g = hueToRgb(p, q, hue);
      b = hueToRgb(p, q, hue - 1 / 3);
    }

    r = Math.round(r * 255);
    g = Math.round(g * 255);
    b = Math.round(b * 255);

    return { r, g, b };
  }

  hsvToRgb(h, s, v) {
    let r, g, b;

    const hue = h / 360;
    const saturation = s / 100;
    const value = v / 100;

    const c = value * saturation;
    const x = c * (1 - Math.abs((hue % 2) - 1));
    const m = value - c;

    if (hue >= 0 && hue < 1) [r, g, b] = [c, x, 0];
    else if (hue >= 1 && hue < 2) [r, g, b] = [x, c, 0];
    else if (hue >= 2 && hue < 3) [r, g, b] = [0, c, x];
    else if (hue >= 3 && hue < 4) [r, g, b] = [0, x, c];
    else if (hue >= 4 && hue < 5) [r, g, b] = [x, 0, c];
    else [r, g, b] = [c, 0, x];

    r = Math.round((r + m) * 255);
    g = Math.round((g + m) * 255);
    b = Math.round((b + m) * 255);

    return { r, g, b };
  }

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
    let h, s, l, v;

    l = (max + min) / 2;
    v = max;

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
      v: Math.round(v * 100) / 100
    };
  }

  rgbToHsl(rgb) {
    const { h, s, l } = this.rgbToHs(rgb);
    return { h, s, l };
  }

  rgbToHsb(rgb) {
    const { h, s, v } = this.rgbToHs(rgb);
    return { h, s, b: v };
  }

  rgbToHsv(rgb) {
    const { h, s, v } = this.rgbToHs(rgb);
    return { h, s, v };
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
    const { h, s, v } = this.rgbToHs(this.rgba);
    return { h, s, b: v, a: rgba.a };
  }

  rgbaToHsva(rgba) {
    const { h, s, v } = this.rgbToHs(this.rgba);
    return { h, s, v, a: rgba.a };
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

  hueToRgb(p, q, t) {
    if (t < 0) t += 1;
    if (t > 1) t -= 1;
    if (t < 1 / 6) return p + (q - p) * 6 * t;
    if (t < 1 / 2) return q;
    if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
    return p;
  }
}
