import throttle from 'lodash.throttle';

const form = document.querySelector('form');
const emailEl = document.querySelector('input[name="email"]');
const messageEl = document.querySelector('textarea[name="message"]');

const STORAGE_KEY = 'feedback-form-state';

const dataObj = {
  email: '',
  message: '',
};

const dataLocalStorage =
  localStorage.getItem(STORAGE_KEY) || JSON.stringify(dataObj);
let dataParse;

getDataFromLocalStorage();

function getDataFromLocalStorage() {
  dataParse = JSON.parse(dataLocalStorage);
  dataObj.email = dataParse.email;
  dataObj.message = dataParse.message;
  emailEl.value = dataParse.email;
  messageEl.value = dataParse.message;
}

function handleChangeForm(e) {
  e.preventDefault();
  const { name, value } = e.target;
  dataObj[name] = value;
  console.log('dataObj  handleCh', dataObj);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(dataObj));
}

function handleSubmitForm(e) {
  e.preventDefault();
  const { email, message } = e.target.elements;

  console.log({
    [email.name]: email.value,
    [message.name]: message.value,
  });

  e.currentTarget.reset();
  localStorage.removeItem(STORAGE_KEY);
}

form.addEventListener('input', throttle(handleChangeForm, 500));
form.addEventListener('submit', handleSubmitForm);
