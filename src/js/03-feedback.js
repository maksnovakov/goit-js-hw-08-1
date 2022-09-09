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

// form.addEventListener('input', throttle(onFormData, 500));
// form.addEventListener('submit', onSubmitForm);

// const formData = {};

// function onFormData(e) {
//   formData[e.target.name] = e.target.value;
//   localStorage.setItem('feedback-form-state', JSON.stringify(formData));
// }

// function onSubmitForm(e) {
//   console.log(JSON.parse(localStorage.getItem('feedback-form-state')));
//   e.preventDefault();
//   e.currentTarget.reset();
//   localStorage.removeItem('feedback-form-state');
// }
// (function dataFromLocalStorage() {
//   const data = JSON.parse(localStorage.getItem('feedback-form-state'));
//   const email = document.querySelector('.feedback-form input');
//   const message = document.querySelector('.feedback-form textarea');
//   if (data) {
//     email.value = data.email;
//     message.value = data.message;
//   }
// })();
