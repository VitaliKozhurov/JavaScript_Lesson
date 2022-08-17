const myForm = document.getElementById('myForm')  // Находим форму
myForm.addEventListener('submit', validateMyForm, false)  // Вешаем обработчик событий на отправку формы

const radioInput = myForm.elements.placement
const dev = myForm.elements.author;
const saitName = myForm.elements.site_title;
const saitAddress = myForm.elements.site_address;
const startDate = myForm.elements.start_date;
const visitors = myForm.elements.persons;
const mail = myForm.elements.mail;
const selectRubric = myForm.elements.rubric
const check = myForm.elements.comments
const textarea = myForm.elements.article
const sp = document.getElementById('vip')
const currentDay = new Date
const checkMail = /^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i
const divRadio = document.getElementById('div_radio')

// Проверка поля разработчики
function develop() {
   if (dev.value === '') {
      dev.classList.add('error');
      dev.nextSibling.innerText = 'Это поле необходимо заполнить, оно не может быть пустым'
   } else {
      dev.nextSibling.innerText = '';
      dev.classList.remove('error');
   }
}
dev.addEventListener('blur', develop)

// Проверка поля название сайта
function saitDescr() {
   if (saitName.value === '') {
      saitName.classList.add('error');
      saitName.nextSibling.innerText = 'Это поле необходимо заполнить, оно не может быть пустым'
   } else {
      saitName.nextSibling.innerText = '';
      saitName.classList.remove('error');
   }
}
saitName.addEventListener('blur', saitDescr)

// Проверка поля URL сайта (на пустую строку и содержимое ввода)
function saitInfo() {
   if (saitAddress.value === '') {
      saitAddress.classList.add('error');
      saitAddress.nextSibling.innerText = 'Это поле необходимо заполнить, оно не может быть пустым'
   } else if (saitAddress.value.split('.')[saitAddress.value.split('.').length - 1] !== 'com' && saitAddress.value.split('.')[saitAddress.value.split('.').length - 1] !== 'ru' && saitAddress.value.split('.')[saitAddress.value.split('.').length - 1] !== 'by') {
      console.log(saitAddress.value.split('.')[saitAddress.value.split('.').length - 1])
      saitAddress.classList.add('error');
      saitAddress.nextSibling.innerText = 'Введите корректный адрес сайта, должен заканчиваться на "com", "ru", "by"'
   } else {
      saitAddress.nextSibling.innerText = '';
      saitAddress.classList.remove('error');
   }
}
saitAddress.addEventListener('blur', saitInfo)

// Проверка даты (на пустую строку, также нельзя установить прошедшую дату)
function setDateStart() {
   if (startDate.value === '') {
      startDate.classList.add('error');
      startDate.nextSibling.innerText = 'Это обязательное поле, необходимо выбрать дату';
   } else if ((new Date(startDate.value)).getTime() < currentDay.getTime()) {
      startDate.classList.add('error');
      startDate.nextSibling.innerText = 'Установленная дата не может быть указана';
   } else {
      startDate.nextSibling.innerText = '';
      startDate.classList.remove('error');
   }
}
startDate.addEventListener('blur', setDateStart)

// Проверка на пустую строку и ввод цифр
function setPersons() {
   if (visitors.value === '') {
      visitors.classList.add('error');
      visitors.nextSibling.innerText = 'Это обязательное поле, оно не может быть пустым';
   } else if (isNaN(visitors.value.trim())) {
      visitors.classList.add('error');
      visitors.nextSibling.innerText = 'В данное поле необходимо ввести данные в цифровом формате';
   } else {
      visitors.nextSibling.innerText = '';
      visitors.classList.remove('error');
   }
}
visitors.addEventListener('blur', setPersons)

// Проверка на ввод данных в формате электронной почты
function setMail() {
   if (mail.value === '') {
      mail.classList.add('error');
      mail.nextSibling.innerText = 'Это поле необходимо заполнить, оно не может быть пустым'
   } else if (!checkMail.test(mail.value)) {
      mail.classList.add('error');
      mail.nextSibling.innerText = 'Введите корректный E-mail, с указанием символа @ и домена'
   } else {
      mail.nextSibling.innerText = '';
      mail.classList.remove('error');
   }
}
mail.addEventListener('blur', setMail)

// Проверка чекбокса
function setPermit() {
   if (!check.checked) {
      check.classList.add('error');
      check.nextSibling.innerText = 'Для продолжения необходимо дать разрешение'
   } else {
      check.nextSibling.innerText = '';
      check.classList.remove('error');
   }
}
check.addEventListener('change', setPermit)

// Проверка, на предмет невозможности выбора определенного пункта селекта
function setRubric() {
   if (selectRubric.value === '1') {
      selectRubric.classList.add('error');
      selectRubric.nextSibling.innerText = 'К сожалению данную рубрику в настоящее время выбрать нельзя'
   } else {
      selectRubric.nextSibling.innerText = '';
      selectRubric.classList.remove('error');
   }
}
selectRubric.addEventListener('change', setRubric)

// Проверка, на предмет невозможности выбора определенного пункта инпутов
function setRadioBtn() {
   if (radioInput.value === '') {
      sp.nextSibling.innerText = 'Это поле необходимо заполнить, оно не может быть пустым'
   } else if (radioInput.value === '1') {
      sp.nextSibling.innerText = 'Извините, данный тип размещения выбрать нельзя'
   } else {
      sp.nextSibling.innerText = '';
   }
}
divRadio.addEventListener('change', setRadioBtn)

// Проверка поля название сайта
function setTextArticle() {
   if (textarea.value === '') {
      textarea.classList.add('error');
      textarea.nextSibling.innerText = 'Это поле необходимо заполнить, оно не может быть пустым'
   } else {
      textarea.nextSibling.innerText = '';
      textarea.classList.remove('error');
   }
}
textarea.addEventListener('blur', setTextArticle)

function validateMyForm(eo) {
   eo = eo || window.event;
   // вызываем ранее описанные функции
   develop();
   saitDescr();
   saitInfo();
   setDateStart();
   setPersons();
   setMail();
   setPermit();
   setRubric();
   setRadioBtn();
   setTextArticle()

   // по результатам вызова функции определяем умолчательное поведение функции отправки формы
   // также определяем фокус на ошибочном сообщении
   if (dev.nextSibling.innerText !== '') {
      dev.focus()
      eo.preventDefault()
   } else if (saitName.nextSibling.innerText !== '') {
      saitName.focus()
      eo.preventDefault()
   } else if (saitAddress.nextSibling.innerText !== '') {
      saitAddress.focus()
      eo.preventDefault()
   } else if (startDate.nextSibling.innerText !== '') {
      startDate.focus()
      eo.preventDefault()
   } else if (visitors.nextSibling.innerText !== '') {
      visitors.focus()
      eo.preventDefault()
   } else if (mail.nextSibling.innerText !== '') {
      mail.focus()
      eo.preventDefault()
   } else if (selectRubric.nextSibling.innerText !== '') {
      console.log(selectRubric)
      selectRubric.scrollIntoView()
      eo.preventDefault()
   } else if (check.nextSibling.innerText !== '') {
      check.focus()
      eo.preventDefault()
   } else if (sp.nextSibling.innerText !== '') {
      divRadio.scrollIntoView()
      eo.preventDefault()
   } else if (textarea.nextSibling.innerText !== '') {
      textarea.focus()
      eo.preventDefault()
   }
}
