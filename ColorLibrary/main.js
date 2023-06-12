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
    const a = parseInt(rgbaValues[3]?.trim()) || 1;

    return { r, g, b, a };
  }
}
