/* global window, document, requestAnimationFrame*/
let c = document.createElement('canvas'),
  ctx = c.getContext("2d");
document.body.appendChild(c);
window.onresize = resize;

/*-----------------------*/

let dots = [],
  colW = 70,
  lineH = 54,
  nbCols,
  nbLines,
  nbDots,
  t = 0,
  mouse = {
    x: window.innerWidth * 0.5,
    y: window.innerHeight * 0.5
  },
  action = {
    x: window.innerWidth * 0.5,
    y: window.innerHeight * 0.5
  },
  zoneRadius,
  zoneStep = 100;

class Dot{
  constructor(x,y){
    this.x = this.ax = x;
    this.y = this.ay = y;
  }
}


const createDots = () => {
  let w = c.width,
      h = c.height,
      decalX = -17,
      decalY = -10;
  nbCols = ~~(w / colW) + 2;
  nbLines = ~~(h / lineH) + 2;
  nbDots = nbCols * nbLines;
  dots = [];

  for (var i = 0; i < nbLines; i++) {
    for (var j = 0; j < nbCols; j++) {
      dots.push(new Dot(decalX + j * colW, decalY + i * lineH));
    }
  }
}

const drawDots = (anchors, color, radius) => {
  let dot, dist;
  for (var i = 0; i < nbDots; i++) {
    dot = dots[i];
    dist = getDistance(dot, action);
    ctx.globalAlpha = Math.max(1 - (dist / (zoneRadius * 1.2)), 0);
    ctx.beginPath();
    if (anchors) {
      ctx.moveTo(dot.ax, dot.ay);
      ctx.arc(dot.ax, dot.ay, radius, 0, Math.PI * 2, true);
    } else {
      ctx.moveTo(dot.x, dot.y);
      ctx.arc(dot.x, dot.y, radius, 0, Math.PI * 2, true);
    }
    ctx.closePath();
    ctx.fillStyle = color;
    ctx.fill();
  }
}

const drawLines = color => {
  let dot, nextDot, col, line, dist;
  for (var i = 0; i < nbDots; i++) {
    line = ~~(i / nbCols);
    col = i % nbCols;

    dot = dots[i];
    dist = getDistance(dot, action);
    ctx.globalAlpha = Math.max(1 - (dist / (zoneRadius * 1.2)), 0.05);
    ctx.beginPath();
    if (line < (nbLines - 1)) {
      nextDot = dots[i + nbCols];
      ctx.moveTo(dot.x, dot.y);
      ctx.lineTo(nextDot.x, nextDot.y);
    }
    if (col < (nbCols - 1)) {
      nextDot = dots[i + 1];
      ctx.moveTo(dot.x, dot.y);
      ctx.lineTo(nextDot.x, nextDot.y);
    }
    ctx.closePath();
    ctx.strokeStyle = color;
    ctx.stroke();
  }
}

const drawJoints = color => {
  let dot, dist;
  for (var i = 0; i < nbDots; i++) {
    dot = dots[i];
    dist = getDistance(dot, action);
    ctx.globalAlpha = Math.max(1 - (dist / (zoneRadius * 1.2)), 0.05);
    ctx.beginPath();

    ctx.moveTo(dot.x, dot.y);
    ctx.lineTo(dot.ax, dot.ay);

    ctx.closePath();
    ctx.strokeStyle = color;
    ctx.stroke();
  }
}

const getDistance = (d1, d2) => Math.sqrt((d2.x - d1.x) * (d2.x - d1.x) + (d2.y - d1.y) * (d2.y - d1.y));

const moveDots = () => {
  let dot, dist, angle;
  for (var i = 0; i < nbDots; i++) {
    dot = dots[i];
    angle = -Math.atan2(action.x - dot.ax, action.y - dot.ay) - (Math.PI * 0.5);
    dist = getDistance(dot, action);

    if (dist <= zoneRadius) {
      dot.x = dot.ax + zoneStep * (1 - (dist / zoneRadius)) * Math.cos(angle);
      dot.y = dot.ay + zoneStep * (1 - (dist / zoneRadius)) * Math.sin(angle);
    } else {
      dot.x = dot.ax;
      dot.y = dot.ay;
    }
  }
}


const renderer = () => {
  t += 0.01;

  mouse.x = (Math.cos(t + 1) + 1) * 0.5 * c.width * (0.5 * (Math.cos(t + 12) + 2)) * 0.5 + c.width * 0.5;
  mouse.y = (Math.sin(t) + 1) * 0.5 * (0.5 * (Math.cos(t * 3 + 4) + 1)) * c.height * 0.5 + c.height * 0.5;

  ctx.clearRect(0, 0, c.width, c.height);
  action.x += (mouse.x - action.x) * 0.07;
  action.y += (mouse.y - action.y) * 0.07;
  moveDots();
  drawLines("rgb(0,200,255)");
  drawJoints("rgb(0,200,255)");
  drawDots(true, "rgb(0,200,255)", 1);
}


const draw = () => {
  requestAnimationFrame(draw);
  renderer();
}

export const resize = () => {
  let box = c.getBoundingClientRect(),
      w = box.width,
      h = box.height;
  c.width = w;
  c.height = h;
  zoneRadius = Math.min(c.width * 0.2, 250);
  createDots();
}
export const start = () => draw();
