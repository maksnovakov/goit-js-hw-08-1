import throttle from 'lodash.throttle';
let throttle = require('lodash.throttle');

const formEl = document.querySelector('.feedback-form');
const STORAGE_KEY = 'feedback-form-state';
let formData = {};

backForm();

formEl.addEventListener('submit', onFormSubmit);
formEl.addEventListener('input', throttle(onFormInput, 500));

function onFormInput(evt) {
  formData[evt.target.name] = evt.target.value;
  const message = JSON.stringify(formData);
  localStorage.setItem(STORAGE_KEY, message);
}

function onFormSubmit(evt) {
  evt.preventDefault();
  const messageJson = localStorage.getItem(STORAGE_KEY);
  const savedMessage = JSON.parse(messageJson);
  if (formEl.email.value === '' || formEl.message.value === '') {
    alert('Заполните все поля!');
  } else if (savedMessage) {
    console.log(savedMessage);
    evt.currentTarget.reset();
    localStorage.removeItem(STORAGE_KEY);
    formData = {};
  }
}

function backForm() {
  const savedMessage = localStorage.getItem(STORAGE_KEY);
  if (savedMessage) {
    formData = JSON.parse(savedMessage);
    formEl.email.value = formData.email || '';
    formEl.message.value = formData.message || '';
  }
}
