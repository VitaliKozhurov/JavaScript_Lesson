// Определяем количество часов будет отображать циферблат часов
const clockNum = 12;

// Определяем во сколько раз размер цифр будет меньше размера часов
const clockNumRatio = 10

// Определяем исходный размер шрифта, это предоставит возможность изменять размер шрифта в зависимости от размера часов
const originalFontS = 16

// Коэффициент изменения размера шрифта для часов в цифровом формате
const fontRatio = 0.04

// Коэффициент изменения размера шрифта для цифр циферблата
const fontNumRatio = 0.025

// Определяем количество стрелок на циферблате
const arrowNum = 3

// Определяем коэффтцтент, который показывает во сколько раз ширина (width) часовой стрелки меньше ширины часов
const hourArrowWidth = 40
// Определяем коэффтцтент, который показывает во сколько раз высота (height) часовой стрелки меньше ширины часов
const hourArrowHeight = 2.85

// Определяем коэффтцтент, который показывает во сколько раз ширина (width) минутной стрелки меньше ширины часов
const minutArrowWidth = 55
// Определяем коэффтцтент, который показывает во сколько раз высота (height) минутной стрелки меньше ширины часов
const minutArrowHeight = 2.5

// Определяем коэффтцтент, который показывает во сколько раз ширина (width) стрелки меньше ширины часов
const secondArrowWidth = 130
// Определяем коэффтцтент, который показывает во сколько раз высота (height) стрелки меньше ширины часов
const secondArrowHeight = 2.3

// Описываем переменную, которая будет определять угол между цифрами
let angle = 0;

// Значение в градусах для одного деления циферблата (каждый шаг секундной или минутной стрелки равен 6 градусам)
const deg = 6;

// Значение в 30 градусов это шаг движения часовой стрелки
const degHour = 30;

// Значение переменной определяет отступ цифр до края циферблата, чтобы цифры не располагались вплотную к краю
const indent = 15;

// Находим кнопку для создания часов
const btn = document.getElementById('create_clock')

// Вешаем на кнопку обработчик
btn.addEventListener('click', createClock)

// Описываем функцию для создания часов
function createClock() {
   // Находим инпут, который будет задавать размер часов
   const clockSize = document.getElementById('clock_size');
   if (clockSize.value === '' || parseInt(clockSize.value) < 0) {
      alert('Введите корректный размер для часов')
      return
   }
   // Скрываем элементы ввова и кнопку
   btn.classList.add('hidden')
   clockSize.classList.add('hidden')

   // Создаем див, который будет являться часами
   const clock = document.createElement('div')
   // Для созданных часов определяем стилевой класс
   clock.classList.add('clock')
   //  Задаем размер для часов используя значение инпута
   clock.style.width = clockSize.value + 'px'
   clock.style.height = clockSize.value + 'px'
   document.body.appendChild(clock)
   // Таймер, котрый будет выводить актуально время каждую секунду

   const showTimeNumber = document.createElement('span');
   showTimeNumber.classList.add('show_time');
   showTimeNumber.style.fontSize = originalFontS + clock.offsetWidth * fontRatio + 'px'
   clock.appendChild(showTimeNumber);

   // Создаем цифры для часов
   for (let i = 0; i < clockNum; i++) {
      // Создаем цифры циферблата
      let numberOfHour = document.createElement('div');
      // Добавляем цифры в диф (циферблат)
      clock.appendChild(numberOfHour);
      // Задаем размер цифр, относительно размер циферблата
      numberOfHour.style.width = clockSize.value / clockNumRatio + 'px';
      numberOfHour.style.height = clockSize.value / clockNumRatio + 'px';
      numberOfHour.innerText = i + 1;
      // Размер текста для цифр циферблата
      numberOfHour.style.fontSize = originalFontS + clock.offsetWidth * fontNumRatio + 'px'
      // Задаем расположение цифр на циферблате
      const clockCenter = clock.offsetWidth / 2 - numberOfHour.offsetWidth / 2  // определяем центр часов
      angle += 30

      numberOfHour.style.left = (clockCenter + (clock.offsetWidth - numberOfHour.offsetWidth - indent) / 2 * Math.sin((angle * Math.PI) / 180)) + 'px'; // Если плюс то угол изменяется по часовой стрелке, если минус, то наоборот

      numberOfHour.style.top = (clockCenter - (clock.offsetWidth - numberOfHour.offsetWidth - indent) / 2 * Math.cos((angle * Math.PI) / 180)) + 'px'; // Если минус, то отсчет идет сверху вниз, если плюс то наоборот

      // Добавляем стилевой класс для цифр
      numberOfHour.classList.add('clock_number');

   }

   // Создаем стрелки для часов
   for (let i = 0; i < arrowNum; i++) {
      // Создаем cnhtkrb циферблата
      let clockArrow = document.createElement('div');
      // Добавляем цифры в диф (циферблат)
      clock.appendChild(clockArrow);
      // Добавляем стилевой класс для стрелок
      clockArrow.classList.add('arrows');
   }
   const arrows = document.querySelectorAll('.arrows')
   // Стилизуем и позиционируем часовую стрелку
   arrows[0].style.height = clockSize.value / hourArrowHeight + 'px';
   arrows[0].style.width = clockSize.value / hourArrowWidth + 'px';
   arrows[0].style.left = (clockSize.value / 2 - arrows[0].offsetWidth / 2) + 'px';

   // Стилизуем и позиционируем минутную стрелку
   arrows[1].style.height = clockSize.value / minutArrowHeight + 'px';
   arrows[1].style.width = clockSize.value / minutArrowWidth + 'px';
   arrows[1].style.left = (clockSize.value / 2 - arrows[1].offsetWidth / 2) + 'px';

   // Стилизуем и позиционируем секундную стрелку
   arrows[2].style.height = clockSize.value / secondArrowHeight + 'px';
   arrows[2].style.width = clockSize.value / secondArrowWidth + 'px';
   arrows[2].style.left = (clockSize.value / 2 - arrows[2].offsetWidth / 2) + 'px';
   setInterval(updateTime, 1000);
   function updateTime() {
      const currTime = new Date();
      const hours = currTime.getHours();
      const minutes = currTime.getMinutes();
      const seconds = currTime.getSeconds();
      const currTimeStr = formatDateTime(hours, minutes, seconds);
      showTimeNumber.innerHTML = currTimeStr;
      let hh = hours * degHour;  // Угол смещения часовой стрелки в зависимости от времени (часы)
      let mm = minutes * deg; // Угол смещения минутной стрелки в зависимости от времени (минуты)
      let ss = seconds * deg;  // Угол смещения секундной стрелки в зависимости от времени (секунды)
      arrows[0].style.transform = `rotateZ(${hh + (mm / 12)}deg)`; // Устанавливаем стилевое свойство rotate для часовой стрелки (Изменение одного часа равно 30 градусам, но чтобы изменение происходило плавно прибавляем значение в градусах относительно текущей минуты)
      arrows[1].style.transform = `rotateZ(${mm}deg)`;  // Rotate для минутной стрелки
      arrows[2].style.transform = `rotateZ(${ss}deg)`;  // Rotate для секундной стрелки

   }
   updateTime() // Сразу вызываем функцию, для отображаения текущего времени, чтобы не было задержек

   // форматирует дату-время в формате чч:мм:сс
   function formatDateTime(hours, minutes, seconds) {
      console.log(str0l(hours, 2) + ':' + str0l(minutes, 2) + ':' + str0l(seconds, 2))
      return str0l(hours, 2) + ':' + str0l(minutes, 2) + ':' + str0l(seconds, 2);
   }

   // дополняет строку val слева нулями до длины Len
   function str0l(val, len) {
      let strVal = val.toString();
      while (strVal.length < len)
         strVal = '0' + strVal;
      return strVal;
   }
}
