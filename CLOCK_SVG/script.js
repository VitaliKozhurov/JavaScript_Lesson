// Определяем количество часов будет отображать циферблат часов
const clockNum = 12;
// Определяем во сколько раз размер окружности цифр будет меньше размера часов
const clockNumRatio = 10;
// Определяем исходный размер шрифта, это предоставит возможность изменять размер шрифта в зависимости от размера часов
const originalFontS = 16;
// Коэффициент изменения размера шрифта для часов в цифровом формате
const fontRatio = 0.04;
// Коэффициент который изменяет положение цифровых часов относительно оси Y и ширины тега SVG
const posYDif = 3;
// Коэффициент изменения размера шрифта для цифр циферблата
const fontNumRatio = 0.015
// Определяем количество стрелок на циферблате
const arrowNum = 3
// Определяем коэффтцтент, который показывает во сколько раз ширина (width) часовой стрелки меньше ширины часов
const hourArrowWidth = 40
// Определяем коэффтцтент, который показывает координату Y2  относительно часов, для определения высоты часовой стрелки
const hourArrowHeight = 4
// Определяем коэффтцтент, который показывает во сколько раз ширина (width) минутной стрелки меньше ширины часов
const minutArrowWidth = 55
// Определяем коэффтцтент, который показывает во сколько раз высота (height) минутной стрелки меньше ширины часов
const minutArrowHeight = 6
// Определяем коэффтцтент, который показывает во сколько раз ширина (width) стрелки меньше ширины часов
const secondArrowWidth = 130
// Определяем коэффтцтент, который показывает во сколько раз высота (height) стрелки меньше ширины часов
const secondArrowHeight = 10
// Описываем переменную, которая будет определять угол между цифрами
let angle = 30;
// Значение в градусах для одного деления циферблата (каждый шаг секундной или минутной стрелки равен 6 градусам)
const deg = 6;
// Значение в 30 градусов это шаг движения часовой стрелки
const degHour = 30;
// Значение переменной определяет отступ цифр до края циферблата, чтобы цифры не располагались вплотную к краю
const indent = 15;
// Находим кнопку для создания часов
const btn = document.getElementById('create_clock');
// Вешаем на кнопку обработчик
btn.addEventListener('click', createClock);

// Описываем функцию для создания часов
function createClock() {
   // Находим инпут, который будет задавать размер часов
   const clockSize = document.getElementById('clock_size');
   if (clockSize.value === '' || parseInt(clockSize.value) < 0) {
      alert('Введите корректный размер для часов')
      return
   }
   // Скрываем элементы ввова и кнопку
   btn.style.visibility = 'hidden';
   clockSize.style.visibility = 'hidden';

   // Создаем тег SVG и добавляем атрибуты
   const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
   svg.setAttribute("style", `width:${clockSize.value}px;height:${clockSize.value}px;`); // Задаем высоту и ширину тега SVG
   svg.style.margin = '100px auto 0px';  // Спозиционировали тег SVG на странице
   document.body.appendChild(svg);  // Добавляем тег SVG на страницу

   // Определяем позицию центра окружности
   const clockCenter = clockSize.value / 2;

   // Создаем циферблат
   const clock = document.createElementNS("http://www.w3.org/2000/svg", 'circle');
   clock.style.fill = 'gold';
   clock.setAttribute("cx", clockCenter); // Координаты центра окружности по оси Х (половина ширины тега svg)
   clock.setAttribute("cy", clockCenter); // Координаты центра окружности по оси У (половина высоты тега svg)
   clock.setAttribute("r", clockSize.value / 2); // Радиус окружности
   svg.appendChild(clock);  // Добавляем элемент в тег SVG

   // Цифровые часы, котрый будет выводить актуально время каждую секунду
   const showTimeNumber = document.createElementNS('http://www.w3.org/2000/svg', 'text'); // SVG тег текст
   showTimeNumber.style.fontSize = originalFontS + clockSize.value * fontRatio + 'px';  // Задаем размер шрифта в зависимости от размера циферблата
   showTimeNumber.setAttribute('text-anchor', 'middle');  // Выравниваем элемент относительно оси X  по-центру
   showTimeNumber.setAttribute("x", clockSize.value / 2);  // Координаты цифровых часов по оси Х (половина ширины тега SVG)
   showTimeNumber.setAttribute("y", clockSize.value / posYDif);  // Координаты цифровых часов по оси Y
   svg.appendChild(showTimeNumber);  // Добавляем элемент в тег SVG

   // Определяем диаметр цифры циферблата
   const diamNumberOfHour = clockSize.value / clockNumRatio;
   // Создаем цифры для часов
   for (let i = 0; i < clockNum; i++) {
      // Создаем цифры циферблата (круг для цифр)
      const numberOfHour = document.createElementNS("http://www.w3.org/2000/svg", 'circle');
      numberOfHour.style.fill = 'rgb(8, 171, 98)';
      // Добавляем окружность для цифр
      svg.appendChild(numberOfHour);
      // Позиционируем цифры циферблата
      const posX = (clockCenter + (clockSize.value - diamNumberOfHour - indent) / 2 * Math.sin((angle * Math.PI) / 180)); // Если плюс то угол изменяется по часовой стрелке, если минус, то наоборот
      const posY = (clockCenter - (clockSize.value - diamNumberOfHour - indent) / 2 * Math.cos((angle * Math.PI) / 180)); // Если минус, то отсчет идет сверху вниз, если плюс то наоборот
      angle += 30; // Каждую итерацию изменяем угол на 30 градусов

      numberOfHour.setAttribute("cx", posX); // Координаты центра окружности по оси Х
      numberOfHour.setAttribute("cy", posY); // Координаты центра окружности по оси У
      numberOfHour.setAttribute("r", diamNumberOfHour / 2); // Радиус окружности для цифр циферблата

      // Создаем цифры и добавляем их в центр окружностей
      const clockNumber = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      clockNumber.style.fontSize = originalFontS + clockSize.value * fontNumRatio + 'px';
      clockNumber.setAttribute('dominant-baseline', 'mathematical'); // Выравнивание по оси Y
      clockNumber.setAttribute('text-anchor', 'middle');  // Выравниваем элемент относительно осей X по-центру
      clockNumber.setAttribute("x", posX);  // Координаты текста относительно оси Х
      clockNumber.setAttribute("y", posY);  // Координаты текста относительно оси Y
      clockNumber.textContent = i + 1  // Изменяем номер цифры при каждой итерации
      svg.appendChild(clockNumber);  // Добавляем элемент в тег SVG
   }

   // Создаем стрелки для часов
   for (let i = 0; i < arrowNum; i++) {
      // Создаем стрелки циферблата
      const clockArrow = document.createElementNS('http://www.w3.org/2000/svg', 'line');
      // Добавляем стрелки в (циферблат)
      clockArrow.classList.add('arrows');
      svg.appendChild(clockArrow);
      clockArrow.setAttribute('stroke', 'black');
      clockArrow.setAttribute('x1', clockCenter);  // Задаем координаты относительно центра циферблата
      clockArrow.setAttribute('y1', clockCenter);
      clockArrow.setAttribute('x2', clockCenter);
      clockArrow.style.transformOrigin = `${clockCenter}px ${clockCenter}px`; // Определяем порядок вращения стрелок относительно центра циферблата
      clockArrow.setAttribute('stroke-linecap', 'round');  // Тип линии
   }

   const arrows = document.querySelectorAll('.arrows')
   // Стилизуем и позиционируем стрелки
   arrows[0].setAttribute('stroke-width', clockSize.value / hourArrowWidth);
   arrows[0].setAttribute('y2', clockSize.value / hourArrowHeight);
   arrows[1].setAttribute('stroke-width', clockSize.value / minutArrowWidth);
   arrows[1].setAttribute('y2', clockSize.value / minutArrowHeight);
   arrows[2].setAttribute('stroke-width', clockSize.value / secondArrowWidth);
   arrows[2].setAttribute('y2', clockSize.value / secondArrowHeight);

   setInterval(updateTime, 1000);
   function updateTime() {
      const currTime = new Date(); // Текущая дата
      const hours = currTime.getHours();  // Часы
      const minutes = currTime.getMinutes();  // Минуты
      const seconds = currTime.getSeconds();  // Секунды
      const currTimeStr = formatDateTime(hours, minutes, seconds); // Дата в строковом формате
      showTimeNumber.textContent = currTimeStr;  // Добавляем в цифровые часы информацию о времени
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
