"use strict";

const timer = document.getElementById("timer");
const start = document.getElementById("start");
const stop = document.getElementById("stop"); // 大文字から修正
const reset = document.getElementById("reset");
const body = document.body;

let startTime;       // Startボタンクリック時の時刻
let timeoutid;       // ID
let stopTime = 0;    // Stopまでの経過時間
let soundEndflag = "0";

// ボタンを"初期"状態とする
setButtonStateInitial();

////////////////////////
// Startボタンクリック
////////////////////////
start.addEventListener("click", // 小文字に修正
  function() {
    if (soundEndflag === "1") {
      soundControl("end", "");
    }
    // ボタンをタイマー"動作中"状態とする
    soundControl("start", "sound/start.mp3");
    soundEndflag = "1";

    setButtonStateRunning();
    startTime = Date.now();
    countUp();
  }, false
);

////////////////////////
// Stopボタンクリック
////////////////////////
stop.addEventListener("click", 
function() {
  // タイマーを"停止中"状態とする
  setButtonStateStopped();  
  clearTimeout(timeoutid);  // タイマーを解除
  stopTime = Date.now() - startTime;
  
  if (soundEndflag === "1") {
    soundControl("end", "");
  }
  
  if (timer.textContent.substring(0, 5) === "00:10") {
    soundControl("start", "sound/stop2.mp3");
    body.style.backgroundImage = "url('img/fireworks.gif')";
    body.style.backgroundColor = "rgba(0,0,0,0)";
  } else {
    soundControl("start", "sound/stop1.mp3"); // タイポ修正
  }
  
  soundEndflag = "1"; // ここも修正
}, false);

reset.addEventListener("click", 
function() {
  // ボタンを"初期"状態とする
  setButtonStateInitial();  
  timer.textContent = "00:00.000";
  stopTime = 0;
  
  if (soundEndflag === "1") {
    soundControl("end", "");
  }
  
  soundControl("start", "sound/reset.mp3");
  soundEndflag = "1"; // タイポ修正
  document.body.style.backgroundImage = "";
  document.body.style.backgroundColor = "rgba(233,168,227,0.6)";
}, false);

function countUp() {
  const d = new Date(Date.now() - startTime + stopTime);
  const m = String(d.getMinutes()).padStart(2, "0");
  const s = String(d.getSeconds()).padStart(2, "0");
  const ms = String(d.getMilliseconds()).padStart(3, "0");
  timer.textContent = `${m}:${s}.${ms}`;

  timeoutid = setTimeout(() => {
    countUp();
  }, 10);
}

function setButtonStateInitial() {
  start.classList.remove("js-inactive");
  stop.classList.add("js-inactive");
  reset.classList.add("js-inactive");
  start.classList.remove("js-unclickable");
  stop.classList.add("js-unclickable");
  reset.classList.add("js-unclickable");
}

function setButtonStateRunning() {
  timer.classList.add("timer-fontColor_hidden");
  start.classList.add("js-inactive");
  stop.classList.remove("js-inactive");
  reset.classList.add("js-inactive");
  start.classList.add("js-unclickable");
  stop.classList.remove("js-unclickable");
  reset.classList.add("js-unclickable");
}

function setButtonStateStopped() {
  timer.classList.remove("timer-fontColor_hidden");
  timer.classList.add("timer_appear"); 
  start.classList.add("js-inactive");
  stop.classList.add("js-inactive");
  reset.classList.remove("js-inactive");
  start.classList.add("js-unclickable");
  stop.classList.add("js-unclickable");
  reset.classList.remove("js-unclickable");
}


let w_sound;
let music;
function soundControl(status, W_sound) { // 関数名を統一
  if (status === "start") {
    music = new Audio(W_sound);
    music.currentTime = 0;
    music.play();
  } else if (status === "end") {
    music.pause();
    music.currentTime = 0;
  }
}
