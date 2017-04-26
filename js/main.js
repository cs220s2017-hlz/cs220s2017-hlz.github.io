// <![CDATA[

var pics = [];
var canvasX = 0;
var canvasY = 0;
var timer = null;
var m_lastX = 0;
var m_lastY = 0;
var M_SPACE = 24;
var B_VMIN = 5;
var B_VMAX = 5;
var B_WIDTH = 13;
var B_HEIGHT = 13;

function rnd(n) {
  return Math.random()*n;
}

function rndI(n) {
  return parseInt(rnd(n));
}

function createPic(oParent) {
  oParent.appendChild(pics[0].cloneNode(true));
  initPic(pics[pics.length-1]);
  window.status = pics.length;
}

function createPicAtMouse(e) {
  e = e?e:event;
  createPic(document.getElementById('container'));
  with (pics[pics.length-1]) {
    _x = e.clientX;
    _y = e.clientY;
  }
}

function initPic(oPic) {
  oPic._x = rnd(canvasX);
  oPic._y = rnd(canvasY);
  oPic._vX = B_VMIN+rnd(B_VMAX)*(Math.random()>0.5?1:-1);
  oPic._vY = B_VMIN+rnd(B_VMAX);
}

function movePic(oPic) {
  oPic._x += oPic._vX;
  oPic._y += oPic._vY;
  oPic.style.left = oPic._x+'px';
  oPic.style.top = oPic._y+'px';
  if ((oPic._vX>0 && oPic._x+oPic._vX+B_WIDTH>canvasX) || (oPic._vX<0 && oPic._x+oPic._vX<0)) oPic._vX *= -1;
  if ((oPic._vY>0 && oPic._y+oPic._vY+B_HEIGHT>canvasY) || (oPic._vY<0 && oPic._y+oPic._vY<0)) oPic._vY *= -1;
}

function animateStuff() {
  for (var i=pics.length; i--;) {
    movePic(pics[i]);
  }
}

function startAnimation() {
  if (!timer) timer = setInterval(animateStuff,20);
}

function stopAnimation() {
  if (!timer) return false;
  clearInterval(timer);
  timer = null;
}

function mouseDown(e) {
  e = e?e:event;
  m_lastX = e.clientX;
  m_lastY = e.clientY;
  document.onmousemove = mouseMove;
  document.onmouseup = mouseUp;
}

function mouseMove(e) {
  e = e?e:event;
  if (Math.abs(e.clientX-m_lastX)>M_SPACE || Math.abs(e.clientY-m_lastY)>M_SPACE) {
    m_lastX = e.clientX;
    m_lastY = e.clientY;
    createPicAtMouse(e);
  }
  return false;
}

function mouseUp() {
  document.onmousemove = null;
  document.onmouseup = null;
}

function init() {
  pics = document.getElementById('container').getElementsByTagName('img');
  for (var i=pics.length; i--;) {
    initPic(pics[i]);
  }
  getWindowCoords();
  startAnimation();
  document.onmousedown = mouseDown;
}

getWindowCoords = (navigator.userAgent.toLowerCase().indexOf('opera')>0||navigator.appVersion.toLowerCase().indexOf('safari')!=-1)?function() {
  canvasX = window.innerWidth;
  canvasY = window.innerHeight;
}:function() {
  canvasX = document.documentElement.clientWidth||document.body.clientWidth||document.body.scrollWidth;
  canvasY = document.documentElement.clientHeight||document.body.clientHeight||document.body.scrollHeight;
}

window.onresize = getWindowCoords;

init();

// ]]>
