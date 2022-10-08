const cont = document.getElementById('cont');
const percent = document.getElementById('percent');
const month = document.getElementById('month');
const inputCount = document.getElementById('input-cont');
const inputPercent = document.getElementById('input-percent');
const inputMonth = document.getElementById('input-month');
const formSpanJs = document.querySelector('.form__span-js');

function fun1(cont, inputCont) {
  inputCont.value = cont.value;
}
function funPercent(cont, inputCont) {
  formSpanJs.textContent = cont.value;
}
let count = 0;
function progressColor(progress, inputCont) {
  progress.addEventListener('input', function () {
    const value = this.value;
    count = value;
    const percentValue = ((value - 1000000) * 100) / 5000000;
    this.style.background = `linear-gradient(to right, #ff9514  0%, #ff9514  ${percentValue}%, #fff ${percentValue}%, white 100%)`;
    fun1(progress, inputCont);
  });
}
function progressColorPercent(progress, inputCont) {
  progress.addEventListener('input', function () {
    const value = this.value;
    const percentValue = ((value - 10) * 100) / 50;
    let countPercent;
    this.style.background = `linear-gradient(to right, #ff9514  0%, #ff9514  ${percentValue}%, #fff ${percentValue}%, white 100%)`;
    funPercent(progress, inputCont);
    if (count) {
      countPercent = count;
    } else {
      countPercent = inputCount.value;
    }
    let inputCountPercent = (+countPercent.replace(/\s/g, '') * value) / 100;
    inputPercent.value = Math.round(inputCountPercent);
  });
}
function progressColorMonth(progress, inputCont) {
  progress.addEventListener('input', function () {
    const value = this.value;
    const percentValue = ((value - 1) * 100) / 59;
    this.style.background = `linear-gradient(to right, #ff9514  0%, #ff9514  ${percentValue}%, #fff ${percentValue}%, white 100%)`;
    fun1(progress, inputCont);
  });
}

progressColor(cont, inputCount);
progressColorPercent(percent, formSpanJs);
progressColorMonth(month, inputMonth);

inputCount.addEventListener('keydown', function pressed(e) {
  e.target.value = e.target.value.replace(/[^0-9+]/g, '');
});
