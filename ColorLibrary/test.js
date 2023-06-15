// Examples

new Color('#000'); // true
new Color('000'); // true
new Color('#f0f0f6'); // true
new Color('f0f0f6'); // true
new Color({ hex: '000' }); // true
new Color({ hex: '#000' }); // true
new Color({ hex: '000000' }); // true
new Color({ hex: '#000000' }); // true
new Color('#369C'); // false
new Color('369C'); // false

new Color('C0 M0 Y0 K0'); // true
new Color('C0M0Y0K0'); // true
new Color('C0,M0,Y0,K0'); // true
new Color('C0-M0-Y0-K0'); // true
new Color({ c: 0, m: 0, y: 0, k: 0 });

new Color('rgb (255, 0, 0)'); // true
new Color('rgba (255, 0, 0, .5)'); // true
new Color('rgb 255 0 0'); // true
new Color('rgba 255 0 0 .5'); // true
new Color({ r: 255, g: 0, b: 0 }); // true
new Color({ r: 255, g: 0, b: 0, a: 0.5 }); //true
new Color('rgb(255, 0, 0, 1)'); // false
new Color('rgba(255, 0, 0)'); // false
new Color('rgb(400, 0, 0)'); // false
new Color('rgb(255, 400, 0)'); // false
new Color('rgb(255, 0, 400)'); // false
new Color('rgba(255, 0, 0, 2)'); // false
new Color('rgba (255, 0, 0, .)'); // false
new Color('rgba (255, 0, , .5)'); // false
new Color('rgb 255 0 '); // false

new Color('hsl(0, 100%, 50%)'); // true
new Color('hsla(0, 100%, 50%, .5)'); // true
new Color('hsl(0, 1, .5)'); // true
new Color('hsla(0, 1, .5, .5)'); // true
new Color('hsl 0 100% 50%'); // true
new Color('hsl 0 100% 50% .5'); // true
new Color('hsl 0 1 .5'); // true
new Color('hsl 0 1 .5 .5'); // true
new Color({ h: 0, s: 1, l: 0.5 }); // true
new Color({ h: 0, s: 1, l: 0.5, a: 0.5 }); // true
new Color({ h: 0, s: 100, l: 50 }); // false
new Color({ h: 0, s: 100, l: 50, a: 0.5 }); // false
new Color('hsl(0, 100%, 100%, .5)'); // false
new Color('hsla(0, 100%, 100%)'); // false
new Color('hsl(400, 100%, 100%)'); // false
new Color('hsl(0, 200%, 100%)'); // false
new Color('hsl(0, 2, 100%)'); // false
new Color('hsl(0, 100%, 200%)'); // false
new Color('hsl(0, 100%, 2)'); // false
new Color('hsla(0, 100%, %, .5)'); // false
new Color('hsla(0, 100%, 100%, .)'); // false
new Color('hsl 0 1'); // false

new Color('hsb(0, 100%, 50%)');
new Color('hsba(0, 100%, 50%, .5)');
new Color('hsb(0, 1, .5)');
new Color('hsba(0, 1, .5, .5)');
new Color('hsb 0 1 .5');
new Color('hsb 0 1 .5 .5');
new Color({ h: 0, s: 1, b: 0.5 }); // true
new Color({ h: 0, s: 1, b: 0.5, a: 0.5 }); // true
new Color({ h: 0, s: 100, b: 50 }); // false
new Color({ h: 0, s: 100, b: 50, a: 0.5 }); // false
new Color('hsb(0, 100%, 100%, .5)'); // false
new Color('hsba(0, 100%, 100%)'); // false
new Color('hsb(400, 100%, 100%)'); // false
new Color('hsb(0, 200%, 100%)'); // false
new Color('hsb(0, 2, 100%)'); // false
new Color('hsb(0, 100%, 200%)'); // false
new Color('hsb(0, 100%, 2)'); // false
new Color('hsba(0, 100%, %, .5)'); // false
new Color('hsba(0, 100%, 100%, .)'); // false
new Color('hsb 0 1'); // false

new Color('hsv(0, 100%, 50%)');
new Color('hsva(0, 100%, 50%, .5)');
new Color('hsv(0, 1, .5)');
new Color('hsva(0, 1, .5, .5)');
new Color('hsv 0 1 .5');
new Color('hsv 0 1 .5 .5');
new Color({ h: 0, s: 1, v: 0.5 }); // true
new Color({ h: 0, s: 1, v: 0.5, a: 0.5 }); // true
new Color({ h: 0, s: 100, v: 50 }); // false
new Color({ h: 0, s: 100, v: 50, a: 0.5 }); // false
new Color('hsv(0, 100%, 100%, .5)'); // false
new Color('hsva(0, 100%, 100%)'); // false
new Color('hsv(400, 100%, 100%)'); // false
new Color('hsv(0, 200%, 100%)'); // false
new Color('hsv(0, 2, 100%)'); // false
new Color('hsv(0, 100%, 200%)'); // false
new Color('hsv(0, 100%, 2)'); // false
new Color('hsva(0, 100%, %, .5)'); // false
new Color('hsva(0, 100%, 100%, .)'); // false
new Color('hsv 0 1'); // false
