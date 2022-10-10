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
let inputCountNumber = +inputCount.value.replace(/\s/g, '');
let inputPercentNumber = +inputPercent.value.replace(/\s/g, '');
let inputMonthNumber = +inputMonth.value.replace(/\s/g, '');
let inputMonthlyPayment = +monthlyPayment.value.replace(/\s/g, '');
let getPercentValue;

function fun1(cont, inputCont) {
  inputCont.value = cont.value;
}

function funPercent(cont) {
  formSpanJs.textContent = cont;
}

function sumMonth(inputCountNumber, inputPercentNumber, inputMonthNumber) {
  const monthPay = Math.round(
    (inputCountNumber - inputPercentNumber) *
      ((0.035 * Math.pow(1 + 0.035, inputMonthNumber)) /
        (Math.pow(1 + 0.035, inputMonthNumber) - 1))
  );
  if (monthPay >= 0) {
    inputMonthlyPayment = monthlyPayment.value = monthPay;
  } else {
    inputMonthlyPayment = monthlyPayment.value = 1;
  }
}

function sumLeasing(inputPercentNumber, inputMonthNumber) {
  const monthPayTotal = Math.round(
    inputPercentNumber + inputMonthNumber * inputMonthlyPayment
  );
  sumItemRub.style.display = 'none';
  totalSum.value = `${monthPayTotal} ₽`;
}

let count = 0;
function progressColor(progress, inputCont) {
  progress.addEventListener('input', function () {
    const value = +this.value;
    inputCountNumber = value;
    const percentValue = ((value - 1000000) * 100) / 5000000;
    this.style.background = `linear-gradient(to right, #ff9514  0%, #ff9514  ${percentValue}%, #fff ${percentValue}%, white 100%)`;
    fun1(progress, inputCont);
    inputPercentNumber = inputPercent.value = Math.round(value / 10);
    getPercentValue = Math.round((inputPercentNumber * 100) / inputCountNumber);
    funPercent(getPercentValue);
    sumMonth(value, inputPercentNumber, inputMonthNumber);
    sumLeasing(inputPercentNumber, inputMonthNumber);
  });
}

progressColor(cont, inputCount);

inputCount.addEventListener('blur', function () {
  const value = this.value;
  let valueNumber = +value.replace(/\s/g, '');
  if (valueNumber !== '') {
    if (valueNumber < 1000000 || valueNumber > 6000000) {
      let valueNumber = (this.value = 1000000);
      inputCountNumber = valueNumber;
      inputPercentNumber = inputPercent.value = Math.round(valueNumber / 10);
      getPercentValue = Math.round(
        (inputPercentNumber * 100) / inputCountNumber
      );
      funPercent(getPercentValue);
      sumMonth(valueNumber, inputPercentNumber, inputMonthNumber);
      sumLeasing(inputPercentNumber, inputMonthNumber);
    } else {
      inputCountNumber = valueNumber;
      inputPercentNumber = inputPercent.value = Math.round(valueNumber / 10);
      getPercentValue = Math.round(
        (inputPercentNumber * 100) / inputCountNumber
      );
      funPercent(getPercentValue);
      sumMonth(valueNumber, inputPercentNumber, inputMonthNumber);
      sumLeasing(inputPercentNumber, inputMonthNumber);
    }
  }
});
inputPercent.addEventListener('blur', function () {
  const value = this.value;
  let valueNumber = +value.replace(/\s/g, '');
  if (value !== '') {
    let minPercent = Math.round((valueNumber * 100) / inputCountNumber);
    if (minPercent < 10 || minPercent > 60) {
      let valueNumber = (this.value = inputCountNumber / 10);
      inputPercentNumber = valueNumber;
      getPercentValue = Math.round((valueNumber * 100) / inputCountNumber);
      funPercent(getPercentValue);
      sumMonth(inputCountNumber, valueNumber, inputMonthNumber);
      sumLeasing(valueNumber, inputMonthNumber);
    } else {
      inputPercentNumber = valueNumber;
      getPercentValue = Math.round((valueNumber * 100) / inputCountNumber);
      funPercent(getPercentValue);
      sumMonth(inputCountNumber, valueNumber, inputMonthNumber);
      sumLeasing(valueNumber, inputMonthNumber);
    }
  }
});
inputMonth.addEventListener('blur', function () {
  const value = this.value;
  let valueNumber = +value.replace(/\s/g, '');
  if (value !== '') {
    if (value < 1 || value > 60) {
      let valueNumber = (this.value = 1);
      inputMonthNumber = valueNumber;
      sumMonth(inputCountNumber, inputPercentNumber, valueNumber);
      sumLeasing(inputPercentNumber, valueNumber);
    } else {
      inputMonthNumber = valueNumber;
      sumMonth(inputCountNumber, inputPercentNumber, valueNumber);
      sumLeasing(inputPercentNumber, valueNumber);
    }
  }
});

function progressColorPercent(progress, inputCont) {
  progress.addEventListener('input', function () {
    const value = +this.value;
    const percentValue = ((value - 10) * 100) / 50;
    let inputCountPercent;
    this.style.background = `linear-gradient(to right, #ff9514  0%, #ff9514  ${percentValue}%, #fff ${percentValue}%, white 100%)`;
    funPercent(progress.value);
    inputCountPercent = (inputCountNumber * value) / 100;
    inputPercentNumber = inputPercent.value = Math.round(inputCountPercent);

    sumMonth(inputCountNumber, inputPercentNumber, inputMonthNumber);
    sumLeasing(inputPercentNumber, inputMonthNumber);
  });
}

function progressColorMonth(progress, inputCont) {
  progress.addEventListener('input', function () {
    const value = +this.value;
    inputMonthNumber = value;
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
const buttonSubmit = document.getElementById('btn-place-order');

function checkForm(meaning) {
  buttonSubmit.textContent = '';
  // buttonSubmit.classList.add('icons-btn');
  buttonSubmit.disabled = meaning;
  cont.disabled = meaning;
  percent.disabled = meaning;
  month.disabled = meaning;
}
function checkFormRemove() {
  // buttonSubmit.classList.remove('icons-btn');
  buttonSubmit.textContent = 'Оставить заявку';
}

form.addEventListener('submit', (event) => {
  checkForm(true);
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
        checkForm(false);
        checkFormRemove();
        // alert('Регистрация прошла успешно!');

        // form.reset();
      })
      .catch((error) => {
        alert('an error has occurred, the status' + error.message);
      });
  }
});
