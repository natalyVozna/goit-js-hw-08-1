import throttle from 'lodash.throttle';

const form = document.querySelector('form');
const emailEl = document.querySelector('input[name="email"]');
const messageEl = document.querySelector('textarea[name="message"]');
const dataLocalStorage = localStorage.getItem('feedback-form-state');

let dataParse;

if (dataLocalStorage && dataLocalStorage !== '') {
  try {
    dataParse = JSON.parse(dataLocalStorage);
    emailEl.value = dataParse.email || '';
    messageEl.value = dataParse.message || '';
  } catch (error) {
    console.log('error', error);
  }
}

const dataObj = {};
function handleChangeForm(e) {
  e.preventDefault();
  const { name, value } = e.target;
  dataObj[name] = value;

  if (Object.keys(dataObj).length > 0) {
    let data;
    try {
      data = JSON.stringify(dataObj);
      localStorage.setItem('feedback-form-state', data);
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

  localStorage.setItem('feedback-form-state', '');
  e.currentTarget.reset();
}

form.addEventListener('input', throttle(handleChangeForm, 500));
form.addEventListener('submit', handleSubmitForm);
