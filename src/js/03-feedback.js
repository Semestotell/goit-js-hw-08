import throttle from 'lodash.throttle';

const STORAGE_KEY = 'feedback-form-state';

const refs = {
    form: document.querySelector('.feedback-form'),
    email: document.querySelector('.feedback-form  input'),
    textarea: document.querySelector('.feedback-form  textarea'),
};

refs.form.addEventListener('submit', onFormSubmit);
refs.form.addEventListener('input', throttle(onFormInput, 500));

populateTextarea();

function onFormSubmit(evt) {
    evt.preventDefault();
    const savedMessage = localStorage.getItem(STORAGE_KEY);
    if (savedMessage) {
        console.log(JSON.parse(savedMessage));
    }
    evt.currentTarget.reset();
    localStorage.removeItem(STORAGE_KEY);
}

function onFormInput(evt) {
    const savedMessage = localStorage.getItem(STORAGE_KEY);
    let data = {};
    if (savedMessage) {
        data = JSON.parse(savedMessage);
    }
    data[evt.target.name] = evt.target.value;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

function populateTextarea() {
    const savedMessage = localStorage.getItem(STORAGE_KEY);
    if (savedMessage) {
        const data = JSON.parse(savedMessage);
        refs.email.value = data.email;
        refs.textarea.value = data.message;
    }
}