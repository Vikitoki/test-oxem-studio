const rangePrice = document.querySelector(".range__slide_price input");
const rangePercentInput = document.querySelector(".range__slide_percent input");
const rangePercentValue = document.querySelector(".range__percent");
const rangeValues = document.querySelectorAll(".range__value input");
const rangeMonth = document.querySelector(".range__slide_month");
const maxValue = 6000000;
const minValue = 1000000;
const startValue = 3200000;
let currentMin = "330 000";
let currentMax = 1980000;

rangeValues[1].value = `${currentMin} ₽`;
rangePrice.value = startValue;

rangePrice.addEventListener("input", function () {
  const percentValue = Math.floor(
    rangePrice.value * (rangePercentInput.value / 100)
  );

  rangeValues[0].value = calculatingTotalValue(this);
  rangeValues[1].value = `${calculatingTotalValue(null, percentValue)} ₽`;
});

rangePercentInput.addEventListener("input", function () {
  const percentValue = Math.round(
    rangeValues[0].value.split(" ").join("") * (rangePercentInput.value / 100)
  );

  rangeValues[1].value = `${calculatingTotalValue(null, percentValue)} ₽`;
  rangePercentValue.textContent = `${rangePercentInput.value}%`;
});

rangeValues[0].addEventListener("change", function (event) {
  if (event.target.value.split(" ").join("") > maxValue) {
    currentMax = maxValue * 0.6;
    currentMin = maxValue * 0.1;
  } else if (event.target.value.split(" ").join("") < minValue) {
    currentMax = minValue * 0.6;
    currentMin = minValue * 0.1;
  } else {
    currentMax =
      Math.floor(parseInt(event.target.value.split(" ").join("")) / 100) * 60;
    currentMin =
      Math.floor(parseInt(event.target.value.split(" ").join("")) / 100) * 10;
  }

  const newValue = checkMinMax(event, minValue, maxValue);

  event.target.value = calculatingTotalValue(null, newValue);
  rangeValues[1].value = `${calculatingTotalValue(null, currentMin)} ₽`;
  rangePercentInput.value = 10;
  rangePercentValue.textContent = `10%`;
  rangePrice.value = rangeValues[0].value.split(" ").join("");
});

rangeValues[0].addEventListener("input", function (event) {
  const newValue = event.target.value.split(" ").join("");

  million = Math.floor(parseInt(newValue) / 1000000);
  thousand = Math.floor((parseInt(newValue) % 1000000) / 1000);
  dozens = Math.floor((parseInt(newValue) % 1000000) % 1000);

  const modifiedThousand = checkLength(thousand),
    modifiedDozens = checkLength(dozens);

  console.log(event.target.value.length);

  if (event.target.value.length < 3) {
    event.target.value = event.target.value;
  } else if (event.target.value.length > 3) {
    event.target.value = `${million ? million : ""} ${
      modifiedThousand !== "000" ? modifiedThousand : ""
    } ${modifiedDozens !== "000" ? modifiedDozens : ""}`;
  } 

  rangePrice.value = rangeValues[0].value.split(" ").join("");
});

rangeMonth.addEventListener("input", function (event) {
  rangeValues[2].value = event.target.value;
});

function checkMinMax(event, min, max) {
  let eventValue = event.target.value.split(" ").join("");
  let newValue = null;

  if (parseInt(eventValue) > max) {
    newValue = max;
  } else if (parseInt(eventValue) < min) {
    newValue = min;
  }

  return newValue ? newValue : eventValue;
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

function checkLength(value) {
  if (String(value).length === 2) {
    return `0${value}`;
  } else if (String(value).length === 1) {
    return `00${value}`;
  }

  return value;
}
