const cont = document.getElementById('cont');
const percent = document.getElementById('percent');
const month = document.getElementById('month');
const inputCount = document.getElementById('input-cont');
const inputPercent = document.getElementById('input-percent');
const inputMonth = document.getElementById('input-month');
const monthlyPayment = document.getElementById('monthly-payment');
const totalSum = document.getElementById('total-sum');
const formSpanJs = document.querySelector('.form__span-js');
const sumItemRub = document.querySelector('.sum__item-rub');
const sumItemLabel = document.querySelector('.sum__item-label');
const inputCountNumber = +inputCount.value.replace(/\s/g, '');
const inputPercentNumber = +inputPercent.value.replace(/\s/g, '');
const inputMonthNumber = +inputMonth.value.replace(/\s/g, '');

console.log(monthlyPayment);

function fun1(cont, inputCont) {
  inputCont.value = cont.value;
}
function funPercent(cont) {
  formSpanJs.textContent = cont.value;
}
let monthlyPaymentNumber;

function sumMonth(inputCountNumber, inputPercentNumber, inputMonthNumber) {
  const monthPay = Math.round(
    (inputCountNumber - inputPercentNumber) *
      ((0.035 * Math.pow(1 + 0.035, inputMonthNumber)) /
        (Math.pow(1 + 0.035, inputMonthNumber) - 1))
  );
  if (monthPay >= 0) {
    monthlyPaymentNumber = monthlyPayment.value = monthPay;
  } else {
    monthlyPaymentNumber = monthlyPayment.value = 1;
    alert('Слишком много вы столько не заработаете !!!');
  }
}

function sumLeasing(inputPercentNumber, inputMonthNumber) {
  const monthPayTotal = Math.round(
    inputPercentNumber + inputMonthNumber * monthlyPaymentNumber
  );
  sumItemRub.style.display = 'none';
  totalSum.value = `${monthPayTotal} ₽`;
}

let count = 0;
function progressColor(progress, inputCont) {
  progress.addEventListener('input', function () {
    const value = this.value;
    count = value;
    const percentValue = ((value - 1000000) * 100) / 5000000;
    this.style.background = `linear-gradient(to right, #ff9514  0%, #ff9514  ${percentValue}%, #fff ${percentValue}%, white 100%)`;
    fun1(progress, inputCont);

    sumMonth(value, inputPercentNumber, inputMonthNumber);
    sumLeasing(inputPercentNumber, inputMonthNumber);
  });
}

progressColor(cont, inputCount);

inputCount.addEventListener('blur', function () {
  const value = this.value;
  if (value !== '') {
    console.log(value);
    if (value < 1000000 || value > 6000000) this.value = 1000000;
  }
});
inputPercent.addEventListener('blur', function () {
  const value = this.value;
  if (value !== '') {
    console.log(value);
    if (value < 100000 || value > 600000) this.value = 1000000;
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

    sumMonth(inputCountNumber, inputPercent.value, inputMonthNumber);
    sumLeasing(inputPercentNumber, inputPercent.value);
  });
}

function progressColorMonth(progress, inputCont) {
  progress.addEventListener('input', function () {
    const value = this.value;
    const percentValue = ((value - 1) * 100) / 59;
    this.style.background = `linear-gradient(to right, #ff9514  0%, #ff9514  ${percentValue}%, #fff ${percentValue}%, white 100%)`;
    fun1(progress, inputCont);
    sumMonth(inputCountNumber, inputPercentNumber, value);
    sumLeasing(inputPercentNumber, value);
  });
}

progressColorPercent(percent, formSpanJs);
progressColorMonth(month, inputMonth);

function keyDownNumber(input) {
  input.addEventListener('keydown', function pressed(event) {
    if (event.key.length === 1 && /\D/.test(event.key)) {
      event.preventDefault();
    }
  });
}
keyDownNumber(inputCount);
keyDownNumber(inputPercent);
keyDownNumber(inputMonth);
keyDownNumber(monthlyPayment);
keyDownNumber(totalSum);

let emptyField = false;
const form = document.querySelector('.car__cost');
const formUrl =
  'https://test-form-a53f8-default-rtdb.europe-west1.firebasedatabase.app/men.json';

form.addEventListener('submit', (event) => {
  const formData = {};
  event.preventDefault();

  for (let { name, value } of form.elements) {
    if (name) {
      value = value.replace(/\s/g, '');
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
        // form.reset();
      })
      .catch((error) => {
        alert('an error has occurred, the status' + error.message);
      });
  }
});
