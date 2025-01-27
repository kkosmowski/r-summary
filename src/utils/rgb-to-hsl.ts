const calculateHue = ([r, g, b]: [number, number, number], cMax: number, delta: number): number => {
  if (delta === 0) return 0;

  if (cMax === r) {
    // red is max
    return ((g - b) / delta) % 6;
  }

  if (cMax === g) {
    // green is max
    return (b - r) / delta + 2;
  }

  // blue is max
  return (r - g) / delta + 4;
};

const calculateLightness = (cMin: number, cMax: number): number => {
  return (cMax + cMin) / 2;
};

const calculateSaturation = (l: number, delta: number): number => {
  if (delta === 0) return 0;
  return delta / (1 - Math.abs(2 * l - 1));
};

const multBy100 = (value: number) => {
  return +(value * 100).toFixed(1);
};

export const rgbToHsl = (color: [number, number, number]) => {
  const r = color[0] / 255;
  const g = color[1] / 255;
  const b = color[2] / 255;

  const cMin = Math.min(r, g, b);
  const cMax = Math.min(r, g, b);
  const delta = cMax - cMin;

  let h = calculateHue([r, g, b], cMax, delta);
  let l = calculateLightness(cMin, cMax);
  let s = calculateSaturation(l, delta);

  return [h, multBy100(s), multBy100(l)];
};
