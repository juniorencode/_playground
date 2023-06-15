class Color {
  constructor(input) {
    if (!input || input === null)
      throw new Error('Invalid color: color cannot be empty or null.');

    this.input = input;
    this.rgba = { r: 0, g: 0, b: 0, a: 1 };

    this.regexHex = /^\s*(#?)([a-f0-9]{3}(?:[a-f0-9]{3})?)$/i;
    this.regexCmyk =
      /^\s*C(\d{1,})\s*(?:(?:,|-)\s*)?M(\d{1,})\s*(?:(?:,|-)\s*)?Y(\d{1,})\s*(?:(?:,|-)\s*)?K(\d{1,})\s*$/i;
    this.regexRgba =
      /^\s*(rgba?)\s*\(?\s*(\d{1,3})(?:\s*,\s*|\s+)(\d{1,3})(?:\s*,\s*|\s+)(\d{1,3})\s*(?:(?:,\s*|\s+)(0?\.?\d+|0|1))?\)?\s*$/i;
    this.regexHsxa =
      /^\s*(hs(?:l|b|v)a?)\s*\(?\s*(\d{1,3})(?:\s*,\s*|\s+)(0?\.?\d{1,3}%?)(?:\s*,\s*|\s+)(0?\.?\d{1,3}%?)\s*(?:(?:,\s*|\s+)(0?\.?\d+))?\)?\s*$/i;

    this.format = this.validateInput();
    console.log(this.format);
  }

  validateInput() {
    if (typeof this.input === 'string') {
      return this.validateString(this.input);
    } else if (typeof this.input === 'object' && !Array.isArray(this.input)) {
      return this.validateObject(this.input);
    }

    return 'rgba';
  }

  validateHex(hex) {
    if (hex.length !== 3 && hex.length !== 6)
      throw new Error(
        'Invalid color: make sure the hexadecimal code is 3 or 6 characters long'
      );
  }

  validateCmyk(cyan, magenta, yellow, kblack) {
    if (0 > cyan || cyan > 100)
      throw new Error(
        'Invalid color: cyan color is out of valid range (0-100).'
      );

    if (0 > magenta || magenta > 100)
      throw new Error(
        'Invalid color: magenta color is out of valid range (0-100).'
      );

    if (0 > yellow || yellow > 100)
      throw new Error(
        'Invalid color: yellow color is out of valid range (0-100).'
      );

    if (0 > kblack || kblack > 100)
      throw new Error(
        'Invalid color: black color is out of valid range (0-100).'
      );
  }

  validateRgba(red, green, blue, alpha) {
    if (0 > red || red > 255)
      throw new Error(
        'Invalid color: red color is out of valid range (0-255).'
      );

    if (0 > green || green > 255)
      throw new Error(
        'Invalid color: green color is out of valid range (0-255).'
      );

    if (0 > blue || blue > 255)
      throw new Error(
        'Invalid color: blue color is out of valid range (0-255).'
      );

    if (0 > alpha || alpha > 1)
      throw new Error(
        'Invalid color: the transparency value is outside the valid range (0-1).'
      );
  }

  validateHsxa(
    type,
    hue,
    saturation,
    isSatPercent,
    value,
    isValPercent,
    alpha
  ) {
    const name = type.includes('hsl')
      ? 'lightness'
      : type.includes('hsb')
      ? 'brightness'
      : 'value';

    if (0 > hue || hue > 360)
      throw new Error('Invalid color: hue is out of valid range (0-360).');

    if (isSatPercent) {
      saturation = parseInt(saturation);
      if (0 > saturation || saturation > 100)
        throw new Error(
          'Invalid color: saturation is out of valid range (0-100)'
        );
      saturation = parseFloat(saturation / 100);
    } else {
      saturation = parseFloat(saturation);
      if (0 > saturation || saturation > 1)
        throw new Error(
          'Invalid color: saturation is out of valid range (0-1)'
        );
    }

    if (isValPercent) {
      value = parseInt(value);
      if (0 > value || value > 100)
        throw new Error(`Invalid color: ${name} is out of valid range (0-100)`);
      value = parseFloat(value / 100);
    } else {
      value = parseFloat(value);
      if (0 > value || value > 1)
        throw new Error(`Invalid color: ${name} is out of valid range (0-1)`);
    }

    if (0 > alpha || alpha > 1)
      throw new Error(
        'Invalid color: the transparency value is outside the valid range (0-1).'
      );
  }

  validateObject(object) {
    // Hexadecimal:
    // { hex: '000' }
    // { hex: '#000' }
    // { hex: '000000' }
    // { hex: '#000000' }
    if (this.hasAttr(object, 'hex')) {
      const matchHex = object.hex.match(this.regexHex);
      const hex = matchHex[2];

      this.validateHex(hex);
      this.rgba = this.hexToRgb(hex);
      return 'hex';
    }

    // CMYK:
    // { c: 0, m: 0, y: 0, k: 0 }
    if (
      this.hasAttr(object, 'c') &&
      this.hasAttr(object, 'm') &&
      this.hasAttr(object, 'y') &&
      this.hasAttr(object, 'k')
    ) {
      const cyan = object.c | object.C;
      const magenta = object.m | object.M;
      const yellow = object.y | object.Y;
      const kblack = object.k | object.K;

      this.validateCmyk(cyan, magenta, yellow, kblack);
      this.rgba = { ...this.cmykToRgb(cyan, magenta, yellow, kblack), a: 1 };
      return 'cmyk';
    }

    // RGB and RGBA:
    // { r: 255, g: 0, b: 0 }
    // { r: 255, g: 0, b: 0, a: 1 }
    if (
      this.hasAttr(object, 'r') &&
      this.hasAttr(object, 'g') &&
      this.hasAttr(object, 'b')
    ) {
      const red = object.r | object.R;
      const green = object.g | object.G;
      const blue = object.b | object.B;
      const alpha = object.a | object.A;

      this.validateRgba(red, green, blue, alpha);
      this.rgba = { r: red, g: green, b: blue, a: alpha | 1 };
      return alpha ? 'rgba' : 'rgb';
    }

    // HSX and HSXA:
    // { h: 0, s: 1, x: .5 }
    // { h: 0, s: 1, x: .5, a: 0 }
    if (this.hasAttr(object, 'h') && this.hasAttr(object, 's')) {
      const type = this.hasAttr(object, 'l')
        ? 'hsl'
        : this.hasAttr(object, 'l')
        ? 'hsb'
        : this.hasAttr(object, 'v')
        ? 'hsv'
        : undefined;
      if (type) {
        const hue = this.getAttr(object, 'h');
        const saturation = this.getAttr(object, 's');
        const value = this.getAttr(object, type[type.length - 1]);
        const alpha = this.getAttr(object, 'a');

        this.validateHsxa(type, hue, saturation, false, value, false, alpha);
        this.rgba = {
          ...this[type + 'ToRgb'](hue, saturation, value),
          a: alpha | 1
        };
        return typeof alpha === 'number' ? type + 'a' : type;
      }
    }
  }

  validateString(string) {
    // Hexadecimal:
    // 000
    // #000
    // 000000
    // #000000
    const matchHex = string.match(this.regexHex);
    if (matchHex) {
      const hex = matchHex[2];

      this.validateHex(hex);
      this.rgba = this.hexToRgb(hex);
      return 'hex';
    }

    // CMYK:
    // C0 M0 Y0 K0
    // C0M0Y0K0
    // C0,M0,Y0,K0
    // C0-M0-Y0-K0
    const matchCmyk = string.match(this.regexCmyk);
    if (matchCmyk) {
      const cyan = matchCmyk[1];
      const magenta = matchCmyk[2];
      const yellow = matchCmyk[3];
      const kblack = matchCmyk[4];

      this.validateCmyk(cyan, magenta, yellow, kblack);
      this.rgba = { ...this.cmykToRgb(cyan, magenta, yellow, kblack), a: 1 };
      return 'cmyk';
    }

    // RGB and RGBA:
    // rgb 255 0 0
    // rgb(255, 0, 0)
    // rgba 255 0 0 .5
    // rgba(255, 0, 0, .5)
    const matchRgba = string.match(this.regexRgba);
    if (matchRgba) {
      const type = matchRgba[1].toLowerCase();
      const red = parseInt(matchRgba[2]);
      const green = parseInt(matchRgba[3]);
      const blue = parseInt(matchRgba[4]);
      const alpha = matchRgba[5] && parseFloat(matchRgba[5]);

      if (type === 'rgb' && typeof alpha === 'number')
        throw new Error('Invalid RGB: must not include a fourth component.');

      if (type === 'rgba' && typeof alpha !== 'number')
        throw new Error('Invalid RGBA: must include a fourth component.');

      this.validateRgba(red, green, blue, alpha);
      this.rgba = { r: red, g: green, b: blue, a: alpha | 1 };
      return alpha ? 'rgba' : 'rgb';
    }

    // HSX and HSXA:
    // hsx 0 1 5.5
    // hsx 0 100% 50%
    // hsx(0, 1, .5)
    // hsx(0, 100%, 50%)
    // hsxa 0 1 .5 .5
    // hsxa 0 100% 50% .5
    // hsxa(0, 100%, 50%, .5)
    const matchHsxa = string.match(this.regexHsxa);
    if (matchHsxa) {
      const isSatPercent = matchHsxa[3].includes('%');
      const isValPercent = matchHsxa[4].includes('%');
      const type = matchHsxa[1].toLowerCase();
      const hue = parseInt(matchHsxa[2]);
      const alpha = matchHsxa[5] && parseFloat(matchHsxa[5]);
      let saturation, value;

      if (!type.includes('a') && typeof alpha === 'number')
        throw new Error(
          `Invalid ${type.toUpperCase()}: must not include a fourth component.`
        );

      if (type.includes('a') && typeof alpha !== 'number')
        throw new Error(
          `Invalid ${type.toUpperCase()}: must include a fourth component.`
        );

      this.validateHsxa(
        type,
        hue,
        saturation,
        isSatPercent,
        value,
        isValPercent,
        alpha
      );
      this.rgba = {
        ...this[type.replace('a', '') + 'ToRgb'](hue, saturation, value),
        a: alpha | 1
      };
      return typeof alpha === 'number' ? type + 'a' : type;
    }

    // no match found for any format
    throw new Error('Invalid color: the color format is incorrect or unknown.');
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

  cmykToRgb(c, m, y, k) {
    const cyan = c / 100;
    const magenta = m / 100;
    const yellow = y / 100;
    const kblack = k / 100;
    const r = Math.round(255 * (1 - cyan) * (1 - kblack));
    const g = Math.round(255 * (1 - magenta) * (1 - kblack));
    const b = Math.round(255 * (1 - yellow) * (1 - kblack));

    return { r, g, b };
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

      r = this.hueToRgb(p, q, hue + 1 / 3);
      g = this.hueToRgb(p, q, hue);
      b = this.hueToRgb(p, q, hue - 1 / 3);
    }

    r = Math.round(r * 255);
    g = Math.round(g * 255);
    b = Math.round(b * 255);

    return { r, g, b };
  }

  hsbToRgb(h, s, b) {
    return this.hsvToRgb(h, s, b);
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

  hasAttr(obj, attr) {
    const upperCaseAttr = attr.toUpperCase();
    const lowerCaseAttr = attr.toLowerCase();

    return (
      obj.hasOwnProperty(upperCaseAttr) || obj.hasOwnProperty(lowerCaseAttr)
    );
  }

  getAttr(obj, attr) {
    const upperCaseAttr = attr.toUpperCase();
    const lowerCaseAttr = attr.toLowerCase();

    return obj.hasOwnProperty(upperCaseAttr)
      ? obj[upperCaseAttr]
      : obj.hasOwnProperty(lowerCaseAttr)
      ? obj[lowerCaseAttr]
      : undefined;
  }
}
