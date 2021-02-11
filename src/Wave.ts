import p5 from "p5";

export type Wave = {
  pos: {
    x: number;
    y: number;
  };
  center: {
    centerX: number;
    centerY: number;
  };
  rad: number;
  angle: {
    angleX: number;
    angleY: number;
    angleZ: number;
  };
  noise: {
    noiseX: number;
    noiseY: number;
  };
  color: {
    col: p5.Color;
    colNoise: number;
  };
}
