const rangePrice = document.querySelector(".range__slide_price input");
const rangePercentInput = document.querySelector(".range__slide_percent input");
const rangePercentValue = document.querySelector(".range__percent");
const rangeValues = document.querySelectorAll(".range__value input");
const ranges = document.querySelectorAll(".range");
const rangeMonth = document.querySelector(".range__slide_month input");
const contractTotalValue = document.querySelectorAll(
  ".footer-calculator__bottom"
);
const maxValue = 6000000;
const minValue = 1000000;
const startValue = 3200000;
let currentMin = "330 000";
let currentMax = 1980000;

rangeValues.forEach((input, index) => {
  input.addEventListener("focus", function () {
    this.classList.add("active");
    ranges[index].classList.add("active");
  });

  input.addEventListener("blur", function () {
    this.classList.remove("active");
    ranges[index].classList.remove("active");
  });
});

rangeValues[1].value = `${currentMin} ₽`;
rangePrice.value = startValue;

calculatingTotalContractValue();
calculatingMonthlyPayment();

rangePrice.addEventListener("input", function () {
  const percentValue = Math.floor(
    rangePrice.value * (parseInt(rangePercentValue.textContent) / 100)
  );

  // rangePercentInput.min = Math.floor(rangePrice.value * 0.1);
  // rangePercentInput.max = Math.floor(rangePrice.value * 0.6);

  rangeValues[0].value = calculatingTotalValue(this);
  rangeValues[1].value = `${calculatingTotalValue(null, percentValue)} ₽`;

  calculatingMonthlyPayment();
  calculatingTotalContractValue();
});

rangePercentInput.addEventListener("input", function () {
  const percentValue = Math.round(
    rangeValues[0].value.split(" ").join("") *
      (parseInt(rangePercentInput.value) / 100)
  );

  rangePercentValue.textContent = `${rangePercentInput.value} %`;
  rangeValues[1].value = `${calculatingTotalValue(null, percentValue)} ₽`;

  calculatingMonthlyPayment();
  calculatingTotalContractValue();
});

rangeValues[0].addEventListener("change", function (event) {
  const newValue = calculateMinMax(event.target.value);

  event.target.value = calculatingTotalValue(null, newValue);
  rangeValues[1].value = `${calculatingTotalValue(null, currentMin)} ₽`;
  rangePercentInput.value = 10;
  rangePercentValue.textContent = `10%`;
  rangePrice.value = rangeValues[0].value.split(" ").join("");

  calculatingMonthlyPayment();
  calculatingTotalContractValue();
});

rangeValues[0].addEventListener("input", function (event) {
  const modifiedValue = checkInputLength(event.target.value, "6 000 000", 9);
  this.value = modifiedValue;
  rangePrice.value = modifiedValue.split(" ").join("");

  calculatingMonthlyPayment();
  calculatingTotalContractValue();
});

rangeValues[1].addEventListener("input", function (event) {
  const newValue = calculateMinMax(rangeValues[0].value);
  const maxPercent = calculatingTotalValue(null, Math.floor(newValue * 0.6));
  const common = Math.floor(
    (parseInt(rangeValues[1].value.split(" ").join("")) /
      rangeValues[0].value.split(" ").join("")) *
      100
  );

  const modifiedValue = checkInputLength(event.target.value, maxPercent, 9);
  this.value = modifiedValue;
  rangePercentInput.value = common;

  console.log(common, currentMax);

  rangePercentValue.textContent = `${common > 60 ? 60 : common} %`;
});

rangeValues[1].addEventListener("change", function (event) {
  const newValue = calculateMinMax(rangeValues[0].value);
  const minPercent = Math.floor(newValue * 0.1);

  if (parseInt(rangePercentValue.textContent) < 10) {
    rangePercentValue.textContent = `10%`;
  }

  if (minPercent > event.target.value.split(" ").join("")) {
    this.value = `${calculatingTotalValue(null, minPercent)} ₽`;
  } else {
    this.value = `${this.value} ₽`;
  }
});

rangeMonth.addEventListener("input", function (event) {
  rangeValues[2].value = event.target.value;

  calculatingMonthlyPayment();
  calculatingTotalContractValue();
});

rangeValues[2].addEventListener("change", function (event) {
  if (event.target.value > 60) {
    event.target.value = 60;
  } else if (event.target.value < 1) {
    event.target.value = 1;
  }

  rangeMonth.value = parseInt(event.target.value);

  calculatingMonthlyPayment();
  calculatingTotalContractValue();
});

function calculatingTotalContractValue() {
  contractTotalValue[0].textContent = `${calculatingTotalValue(
    null,
    parseInt(rangeValues[1].value.split(" ").join("")) +
      parseInt(rangeValues[2].value) *
        parseInt(contractTotalValue[1].textContent.split(" ").join(""))
  )} ₽`;
}

function calculatingMonthlyPayment() {
  contractTotalValue[1].textContent = `${calculatingTotalValue(
    null,
    Math.floor(
      Math.floor(
        parseInt(rangeValues[0].value.split(" ").join("")) -
          parseInt(rangeValues[1].value.split(" ").join("")) *
            (parseInt(rangePercentValue.textContent) /
              100 /
              ((parseInt(rangePercentValue.textContent) + 1) / 100) -
              parseInt(rangeValues[2].value) -
              1)
      ) / parseInt(rangeValues[2].value)
    )
  )} ₽`;
}

function checkMinMax(value, min, max) {
  let eventValue = value.split(" ").join("");
  let newValue = null;

  if (parseInt(eventValue) > max) {
    newValue = max;
  } else if (parseInt(eventValue) < min) {
    newValue = min;
  }

  return newValue ? newValue : eventValue;
}

function calculateMinMax(value) {
  if (value.split(" ").join("") > maxValue) {
    currentMax = maxValue * 0.6;
    currentMin = maxValue * 0.1;
  } else if (value.split(" ").join("") < minValue) {
    currentMax = minValue * 0.6;
    currentMin = minValue * 0.1;
  } else {
    currentMax = Math.floor(parseInt(value.split(" ").join("")) / 100) * 60;
    currentMin = Math.floor(parseInt(value.split(" ").join("")) / 100) * 10;
  }

  const newValue = checkMinMax(value, minValue, maxValue);

  return newValue;
}

function calculatingTotalValue(input, number = null) {
  let million,
    thousand,
    dozens = null;

  if (input) {
    million = Math.floor(input.value / 1000000);
    thousand = Math.floor((input.value % 1000000) / 1000);
    dozens = Math.floor((input.value % 1000000) % 1000);
  } else {
    million = Math.floor(number / 1000000);
    thousand = Math.floor((number % 1000000) / 1000);
    dozens = Math.floor((number % 1000000) % 1000);
  }

  const modifiedThousand = checkLength(thousand),
    modifiedDozens = checkLength(dozens);

  return `${million ? million : ""} ${thousand ? modifiedThousand : "000"} ${
    dozens ? modifiedDozens : "000"
  }`;
}

function checkInputLength(value, maxValue, maxLength) {
  const newValue = value.split(" ").join("");

  million = Math.floor(parseInt(newValue) / 1000000);
  thousand = Math.floor((parseInt(newValue) % 1000000) / 1000);
  dozens = Math.floor((parseInt(newValue) % 1000000) % 1000);

  const modifiedThousand = checkLength(thousand),
    modifiedDozens = checkLength(dozens);

  if (value.length < 3) {
    value = value;
  } else if (value.length > 3 && value.length < maxLength + 1) {
    value = `${million ? million : ""} ${
      modifiedThousand !== "000" || million ? modifiedThousand : ""
    } ${modifiedDozens !== "000" || modifiedThousand ? modifiedDozens : ""}`;
  } else if (value.length > maxLength) {
    value = `${maxValue}`;
  }

  return value;
}

function checkLength(value) {
  if (String(value).length === 2) {
    return `0${value}`;
  } else if (String(value).length === 1) {
    return `00${value}`;
  }

  return value;
}
