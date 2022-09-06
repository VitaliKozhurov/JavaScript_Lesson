// Находим кнопку
const createClock = document.querySelector('button');
// Вешаем обработчик на кнопку, функция отрисовки часов
createClock.addEventListener('click', drawClock);

function drawClock() {
   // Значение размера часов которые будем рисовать помещаем в переменную
   const clockSize = document.querySelector('input');
   const sizeValue = clockSize.value; // Записываем значения вводимые в поле инпут
   const clockCenter = sizeValue / 2; // Определяем будущий центр часов, он будет равен половине от размера Canvas
   const clockRadius = sizeValue / 2; // Определяем радиус для окружности часов
   const numberRadius = clockRadius / 8; // Определяем радиус для цифр циферблата
   const clockNum = 12; // Переменная, которая хранит количетво часов в циферблате
   const k = 1.5; // Коэффициент, кототрый будет регулировать отступ кругов цифр от круга циферблата
   const originalFontS = 16; // Определяем исходный размер шрифта
   const fontNumRatio = 0.025; // Коэффициент изменения размера шрифта для цифр циферблата
   const degHour = 30; // Значение в 30 градусов это шаг движения часовой стрелки
   const deg = 6; // Значение в градусах для одного деления циферблата (каждый шаг секундной или минутной стрелки равен 6 градусам)
   // Определяем переменные высоты и ширины всех стрелок
   const hourHeight = 4 * numberRadius;
   const hourWidth = sizeValue / 35;
   const minutesHeight = 5 * numberRadius;
   const minutesWidth = sizeValue / 55;
   const secondsHeight = 6 * numberRadius;
   const secondsWidth = sizeValue / 120;
   if (sizeValue === '' || parseInt(sizeValue) <= 0) {
      alert('Введите корректный размер для часов')
      return
   }

   // Убираем инпут и кнопку
   createClock.style.display = 'none';
   clockSize.style.display = 'none';

   function createCanvasClock() {
      // Находим тег CANVAS
      const canvas = document.querySelector('canvas');
      // Задаем размер Canvas
      canvas.width = sizeValue;
      canvas.height = sizeValue;
      // Создаем контекст для отрисовки часов
      const context = canvas.getContext('2d');

      /*==========ОТРИСОВКА ЦИФЕРБЛАТА==========*/
      context.beginPath(); // Начинаем отрисовку часов
      context.arc(clockCenter, clockCenter, clockRadius, 0, 2 * Math.PI); // Рисуем дугу, которая будет кругом (циферблат часов)
      context.fillStyle = 'orange'; // Выбираем цвет для заливки внутри круга
      context.fill();  // Вызываем метод для заливки

      /*==========ОТРИСОВКА ЦИФР==========*/
      for (let i = 1; i <= clockNum; i++) {
         let radiusForNum = clockRadius - k * numberRadius; // Удаление от центра часов до центра круга цифр
         // Определяем координаты центров по осям X и Y для всех цифр на циферблате
         let centerX = clockCenter + Math.sin((i * Math.PI / 6)) * radiusForNum;
         let centerY = clockCenter - Math.cos((i * Math.PI / 6)) * radiusForNum;
         // Для окружностей часов
         context.beginPath();
         context.fillStyle = 'green'; // Цвет заливки для кругов цифр
         context.arc(centerX, centerY, numberRadius, 0, 2 * Math.PI); // Рисуем дугу,
         context.fill();  // Вызываем метод для заливки

         // Для номеров цифр
         context.font = `${originalFontS + fontNumRatio * sizeValue}px serif`; // Задаем размер и шрифт текста
         context.fillStyle = 'black';  // Заливка текста
         context.textAlign = 'center';  // Выравнивание по оси Х
         context.textBaseline = 'middle'  // Выравнивание по оси Y
         context.fillText(i, centerX, centerY); // Указываем в каком месте какое текстовое содержимое необходимо зазместить
      }

      /*=====ФУНКЦИЯ ДЛЯ ОТРИСОВКИ СТРЕЛОК=====*/
      function drawTime(arrowAngle, arrowHeight, arrowWidth) {
         // Определяем переменные, которые будут хранить конечное положение стрелок
         let centerX = clockCenter + Math.sin((Math.PI * arrowAngle) / 180) * arrowHeight;
         let centerY = clockCenter - Math.cos((Math.PI * arrowAngle) / 180) * arrowHeight;
         context.beginPath(); //Начинаем отрисовку часовой стрелки
         context.moveTo(clockCenter, clockCenter);  // Началом является центр часов
         context.lineTo(centerX, centerY);// Координаты конца стрелок
         context.lineWidth = arrowWidth;  // Толщина стрелок
         context.globalAlpha = 0.7;  // Прозрачность стрелок
         context.strokeStyle = 'black'; // Цвет линии (стрелок)
         context.lineCap = 'round'; // Форма концов линии (стрелок)
         context.stroke();  // Отрисовка линии (стрелки)
      }
      const currTime = new Date();  // Текущая дата
      const hours = currTime.getHours(); // Часы
      const minutes = currTime.getMinutes();  // Минуты
      const seconds = currTime.getSeconds();  // Секунды
      const ms = currTime.getMilliseconds();  // Переменная, которая будет подстраивать наше время
      const currTimeStr = formatDateTime(hours, minutes, seconds);
      console.log(currTimeStr);
      /*=====ОТРИСОВКА ЦИФРОВЫХ ЧАСОВ=====*/
      context.beginPath();
      context.font = `${originalFontS + fontNumRatio * sizeValue}px serif`;
      context.fillStyle = 'black';
      context.textAlign = 'center';
      context.textBaseline = 'middle';
      context.fillText(currTimeStr, clockCenter, clockCenter / 2);

      // Определяем значение углов для стрелок
      let mm = minutes * deg; // Угол смещения минутной стрелки в зависимости от времени (минуты)
      let hh = hours * degHour + (mm / 12);  // Угол смещения часовой стрелки в зависимости от времени (часы и минуты)
      let ss = seconds * deg;  // Угол смещения секундной стрелки в зависимости от времени (секунды)

      drawTime(hh, hourHeight, hourWidth);
      drawTime(mm, minutesHeight, minutesWidth);
      drawTime(ss, secondsHeight, secondsWidth);

      // форматирует дату-время в формате чч:мм:сс
      function formatDateTime(hours, minutes, seconds) {
         return str0l(hours, 2) + ':' + str0l(minutes, 2) + ':' + str0l(seconds, 2);
      }

      // дополняет строку val слева нулями до длины Len
      function str0l(val, len) {
         let strVal = val.toString();
         while (strVal.length < len)
            strVal = '0' + strVal;
         return strVal;
      }
      setTimeout(createCanvasClock, 1020 - ms)
   }
   createCanvasClock() // Вызываем функцию для мгновенного отображения часов
}