import p5 from "p5";
import { Wave } from "./Wave"

const sketch = (p: p5) => {
  let wave: Wave = {
    pos: {
      x: 0,
      y: 0,
    },
    center: {
      centerX: 0,
      centerY: 50
    },
    rad: 300,
    angle: {
      angleX: 0,
      angleY: 0,
      angleZ: 0
    },
    noise: {
      noiseX: 0,
      noiseY: 0
    },
    color: {
      col: p.color(40),
      colNoise: 0
    }
  };

  const initWave = () => {
    wave.angle.angleX = Math.random() * p.random(0, p.PI * 2);
    wave.angle.angleY = Math.random() * p.random(0, p.PI * 2);
    wave.angle.angleZ = Math.random() * p.random(0, p.PI * 2);
    wave.color.colNoise = Math.random() * 10;
  };

  const display = () => {
    wave.color.col = p.color(p.map(p.noise(wave.color.colNoise), 0, 1, 150, 360), 10);
    wave.center.centerX = p.map(p.noise(wave.noise.noiseX), 0, 1, p.width / 2 - 200, p.width / 2 + 200);
    wave.center.centerY = p.map(p.noise(wave.noise.noiseY), 0, 1, p.height / 2 - 50, p.height / 2 + 50);
    p.push();
    // p.translate(wave.center.centerX, wave.center.centerY);
    p.rotateY(wave.angle.angleY);
    p.rotateZ(wave.angle.angleZ);
    p.rotateX(wave.angle.angleX);

    for (var i = 0; i < 360; i += 72) {
      var radian = p.radians(i);
      wave.pos.x = wave.rad * p.cos(radian);
      wave.pos.y = wave.rad * p.sin(radian);
      p.strokeWeight(0.5);
      p.stroke(wave.color.col);
      p.noFill();
      p.line(0, 0, wave.pos.x, wave.pos.y);
      p.strokeWeight(2);
      p.point(wave.pos.x, wave.pos.y);
    }
    p.pop();
  };

  const update = () => {
    wave.angle.angleX += 0.001;
    wave.angle.angleY += 0.002;
    wave.angle.angleZ += 0.0014;
    wave.color.colNoise += 0.001;
    wave.noise.noiseX += 0.0006;
    wave.noise.noiseY += 0.0001;
  };

  const run = () => {
    update();
    display();
  };

  p.setup = () => {
    initWave();
    p.createCanvas(p.windowWidth, p.windowHeight, p.WEBGL);
    //p.background(90);

    // p.pixelDensity(2);
    p.colorMode(p.HSB, 100, 100, 100, 100);
    bg();
  };

  const bg = () => {
    var c1: p5.Color = p.color(0);
    var c2: p5.Color = p.color(20, 50, 15);

    for (var i: number = 2000; i > 0; i -= 5) {
      var c = p.lerpColor(c1, c2, i / 1400);
      p.fill(c);
      p.noStroke();
      p.ellipse(p.width / 80, p.height / 7, i, i);
    };
  };

  p.mousePressed = () => {
    bg();
  };

  p.keyPressed = () => {
    if (p.key == ' ') {
      p.saveFrames('out', 'png', 1, 25);
    }
  }

  p.draw = () => {
    run();
  };
}

new p5(sketch);
