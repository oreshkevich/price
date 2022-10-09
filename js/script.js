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

progressColor(cont, inputCount);

inputCount.addEventListener('blur', function () {
  const value = this.value;
  console.log(value);
  if (value !== '') {
    console.log(value);
    if (value < 1000000 || value > 6000000) this.value = 1000000;
  }
});

function progressColorPercent(progress, inputCont) {
  progress.addEventListener('input', function () {
    const value = this.value;
    const percentValue = ((value - 10) * 100) / 50;
    let countPercent;
    let inputCountPercent;
    let countReplay;
    this.style.background = `linear-gradient(to right, #ff9514  0%, #ff9514  ${percentValue}%, #fff ${percentValue}%, white 100%)`;
    funPercent(progress, inputCont);
    if (count) {
      countPercent = count;
    } else {
      countReplay = inputCount.value;
      countPercent = +countReplay.replace(/\s/g, '');
    }
    console.log(countPercent);
    console.log(!isNaN(countPercent));
    if (isNaN(countPercent)) {
      inputCountPercent = 100000;
    } else {
      inputCountPercent = (countPercent * value) / 100;
    }
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

progressColorPercent(percent, formSpanJs);
progressColorMonth(month, inputMonth);

inputCount.addEventListener('keydown', function pressed(event) {
  if (event.key.length === 1 && /\D/.test(event.key)) {
    event.preventDefault();
  }
});

function sumLeasing() {}

let emptyField = false;
const form = document.querySelector('.car__cost');
const formUrl =
  'https://test-form-a53f8-default-rtdb.europe-west1.firebasedatabase.app/men.json';

form.addEventListener('submit', (event) => {
  const formData = {};

  event.preventDefault();

  for (let { name, value } of form.elements) {
    if (name) {
      value = value.trim();
      formData[name] = value;

      if (value == '') {
        emptyField = true;
      }
    }
  }

  console.log(formData);
  if (emptyField) {
    alert('The form is filled out incorrectly!');
  } else {
    fetch(formUrl, {
      method: 'POST',
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (response.status === 200 || response.status === 201) {
          return response.json();
        } else {
          throw new Error(response.status);
        }
      })
      .then((formData) => {
        console.log(formData);
        alert('Регистрация прошла успешно!');
        form.reset();
      })
      .catch((error) => {
        alert('an error has occurred, the status' + error.message);
      });
  }
});
