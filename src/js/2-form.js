'use strict';
import validator from 'validator';

const STORAGE_KEY = 'feedback-form-state';
const form = document.querySelector('.feedback-form');
const textarea = form.querySelector('textarea');

//вішаємо прослуховувача на всю форму
form.addEventListener('input', () => {
  // console.log('hello');

  //дістаємо два поля для зберігання
  const formData = new FormData(form); //передаємо помічнику нашу форму
  const email = formData.get('email').trim(); // помічник дістань мені email і видали зайві пробіли
  const message = formData.get('message').trim(); //помічник дістань мені message і видали зайві пробіли
  const data = { email, message };
  //збережи мені до lokalStoredg
  saveToLS('email', email);
  saveToLS('message', message);
  saveToLS('userInfo', data);
});

// window.addEventListener('DOMContentLoaded', () => {
//   const email = loadFromLS('email');
//   const message = loadFromLS('message');
//   console.log(form.elements.email);
//   form.elements.email.value = email || 'Anonymous';
//   form.elements.message.value = message;
// });

window.addEventListener('DOMContentLoaded', () => {
  const data = loadFromLS('userInfo');
  console.log(data);
  form.elements.email.value = data?.email || '';
  form.elements.message.value = data?.message || '';
});

form.addEventListener('submit', e => {
  e.preventDefault();

  const formData = new FormData(form);
  const email = formData.get('email');
  const message = formData.get('message');
  const data = { email, message };
  console.log(data);

  if (data.email === '' || data.message === '') {
    alert('Fill please all fields');
  } else {
    console.log(data);
  }

  localStorage.removeItem('email');
  localStorage.removeItem('message');
  localStorage.removeItem('userInfo');
  form.reset();
});

function saveToLS(key, value) {
  const jsonData = JSON.stringify(value);
  localStorage.setItem(key, jsonData);
}
function loadFromLS(key) {
  const json = localStorage.getItem(key);
  try {
    const data = JSON.parse(json);
    return data;
  } catch {
    return json;
  }
}
