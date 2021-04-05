// Form actions

const modalFormRequest = document.querySelector(".request-modal__form");

modalFormRequest.addEventListener("submit", postDataFromForm);

function postDataFromForm(event) {
  event.preventDefault();

  let form = event.target,
    error = formValidate(form);

  if (error === 0) {
    postData(form);
  }
}

// Валидации формы в целом

function formValidate(form) {
  let error = 0,
    formReq = form.querySelectorAll("._req"),
    forErrors = form.querySelectorAll(".error-text");

  formReq.forEach((input, index) => {
    formRemoveError(input, forErrors[index]);

    if (input.value === "") {
      formAddError(input, forErrors[index]);
      error++;
    }
  });

  return error;
}

// Функции компонентов для валидации и тогл классов ошибок

function formAddError(input, error) {
  input.classList.add("_error");
  error.classList.add("active");
}

function formRemoveError(input, error) {
  input.classList.remove("_error");
  error.classList.remove("active");
}

// Fetch funcions

async function postData(form) {
  const tel = form.querySelectorAll("._req")[0].value,
    name = form.querySelectorAll("._req")[1].value,
    cost = rangeValues[0].value,
    firstPay = rangeValues[1].value,
    month = rangeValues[2].value,
    contractTotal = contractTotalValue[0].textContent,
    monthPay = contractTotalValue[1].textContent;

  const data = {
    tel,
    name,
    cost,
    firstPay,
    month,
    contractTotal,
    monthPay,
  };

  let response = await fetch("https://jsonplaceholder.typicode.com/posts", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(`Couldn't fetch post url , status ${response.status}`);
  }

  const items = document.querySelectorAll(".form__item");

  items.forEach((item) => {
    item.classList.add("_complite");
  });

  setTimeout(() => {
    items.forEach((item) => {
      item.classList.remove("_complite");
    });
    document.querySelector(".request-modal").classList.remove("active");
    form.reset();
  }, 3000);

  return;
}
