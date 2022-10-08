import throttle from 'lodash.throttle';

const form = document.querySelector('form');
const emailEl = document.querySelector('input[name="email"]');
const messageEl = document.querySelector('textarea[name="message"]');

const STORAGE_KEY = 'feedback-form-state';
const dataLocalStorage = localStorage.getItem(STORAGE_KEY);

const dataObj = {};
let dataParse;

getDataFromLocalStorage();

function getDataFromLocalStorage() {
  if (dataLocalStorage && dataLocalStorage !== '') {
    try {
      dataParse = JSON.parse(dataLocalStorage);
      dataObj.email = dataParse.email;
      dataObj.message = dataParse.message;
      emailEl.value = dataParse.email || '';
      messageEl.value = dataParse.message || '';
    } catch (error) {
      console.log('error', error);
    }
  }
}

function handleChangeForm(e) {
  e.preventDefault();
  const { name, value } = e.target;
  dataObj[name] = value;

  if (Object.keys(dataObj).length > 0) {
    let data;
    try {
      data = JSON.stringify(dataObj);
      localStorage.setItem(STORAGE_KEY, data);
    } catch (error) {
      console.log(error, 'error');
    }
  }
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
