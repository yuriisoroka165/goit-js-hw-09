import Notiflix from 'notiflix';

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

const refs = {
  siteForm: document.querySelector('.form'),
}
refs.siteForm.addEventListener('submit', onFormSubmit);

function onFormSubmit(event) {
  event.preventDefault();
  const formData = new FormData(event.currentTarget);
  const data = [];
  formData.forEach((value) => {
    data.push(value);
  });
  let delay = Number(data[0]);
  for (let i = 1; i <= Number(data[2]); i++) {
    createPromise(i, delay)
      .then(onResolve)
      .catch(onReject);
    delay += Number(data[1]);
  }
}

function onResolve({ position, delay }) {
  Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`)
}

function onReject({ position, delay }) {
  Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`)
}