/*===== ПЕРЕМЕННЫЕ ======*/
const fieldWidth = 1200; // Ширина игрового и информационного поля
const fieldHeight = 600; // Высота игрового поля
const fieldInfoHeight = 80; // Высота информационного поля
const racketWidth = 30; // Ширина ракеток
const racketHeight = 125; // Высота ракеток
const ballSize = 30; // Размер мяча
const ballRadius = 15; // Радиус мяча
const textDif = 20; // Переменная для позиционирования элементов text тега svg
const btnWidth = 100; // Ширина кнопки
const btnHeight = 40; // Высота кнопки
const racketSpeed = 10; // Скорость движения ракеток
let ballSpeedX = 5; // Скорость мяча по оси X
let ballSpeedY = 4; // Скорость мяча по оси Y
const ballAccel = 0.2; // Ускорение мяча

/*===== Создаем теги SVG =====*/
// Создаем тег SVG для формирования информационного поля
const svgInfo = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
// Создаем тег SVG для формирования игрового поля
const svgPlay = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
// Описываем функцию для установки параметров SVG тегов
function createSvg(item) {
   item.setAttribute('width', this.width); // ширина
   item.setAttribute('height', this.height); // высота
   item.style.display = 'block'; // стилевое свойство для позиционирования
   item.style.margin = '0 auto'; // позиционирование по-центру страницы
   document.body.appendChild(item); //добавляем в боди
}
// Объект для SVGINFO
const mainInfo = {
   width: fieldWidth,
   height: fieldInfoHeight,
   setSvg: createSvg
}
// Устанавливаем параметры тега SVG (здесь будет отображаться счет и кнопка старт)
mainInfo.setSvg(svgInfo);

// Объект для SVGPLAY
const mainPlay = {
   width: fieldWidth,
   height: fieldHeight,
   setSvg: createSvg
}
// Устанавливаем параметры тега SVG (здесь будет игровое поле)
mainPlay.setSvg(svgPlay);

// Создаем текстовые элементы SVG для отображения счета
const leftScore = document.createElementNS('http://www.w3.org/2000/svg', 'text');
const midDash = document.createElementNS('http://www.w3.org/2000/svg', 'text');
const rightScore = document.createElementNS('http://www.w3.org/2000/svg', 'text');
// Функция, которая будет устанавливать параметры элементов text тега SVG
function createText(elem, parent) {
   elem.setAttribute("x", this.posX);
   elem.setAttribute("y", this.posY);
   elem.textContent = this.text;
   elem.style.fontSize = 30 + 'px';
   parent.appendChild(elem);
}
// Объект для счета левого игрока
const leftScoreInfo = {
   posX: fieldWidth / 2 - textDif,
   posY: fieldInfoHeight - textDif,
   text: 0,
   setPos: createText
}
// Разделитель счета
const midDashs = {
   posX: fieldWidth / 2 + textDif / 4, // Положение разделительных точек по оси X
   posY: fieldInfoHeight - textDif,
   text: ':',
   setPos: createText
}
midDashs.setPos(midDash, svgInfo)
// Объект для счета правого игрока
const rightScoreInfo = {
   posX: fieldWidth / 2 + textDif,
   posY: fieldInfoHeight - textDif,
   text: 0,
   setPos: createText
}
// Описываем функцию для установки параметров прямоугольных SVG элементов
function createSvgRect(elem, parent) {
   elem.setAttribute("x", this.posX);
   elem.setAttribute("y", this.posY);
   elem.setAttribute("width", this.width);
   elem.setAttribute('height', this.height);
   elem.setAttribute('stroke', this.strColor);
   elem.setAttribute('stroke-width', this.strWidth);
   elem.setAttribute('fill', this.color);
   parent.appendChild(elem)
}

// Создаем прямоугольник для кнопки Старт
const btnBg = document.createElementNS("http://www.w3.org/2000/svg", 'rect');
btnBg.style.cursor = 'pointer'; // При наведении меняем курсор
const btnBgInfo = {
   posX: 0,
   posY: fieldInfoHeight - 2 * textDif,
   color: 'grey',
   width: btnWidth,
   height: btnHeight,
   setRect: createSvgRect
}
btnBgInfo.setRect(btnBg, svgInfo)
// Создаем текстовый элемент для кнопки старт
const startBtn = document.createElementNS('http://www.w3.org/2000/svg', 'text');
startBtn.style.cursor = 'pointer'; // При наведении меняем курсор
const startBtnInfo = {
   posX: 0,
   posY: fieldInfoHeight - 0.5 * textDif,
   text: 'Старт!',
   setPos: createText
}
startBtnInfo.setPos(startBtn, svgInfo)
startBtn.setAttribute('textLength', btnWidth) // Размещаем текст на всю ширину кнопки


// Создаем SVG элемент rect, котрый будет игровым полем
const gameField = document.createElementNS("http://www.w3.org/2000/svg", 'rect');
// В обьекте описываем информацию о параметрах игрового поля
const gameFieldInfo = {
   posX: 0,
   posY: 0,
   color: 'yellow',
   width: fieldWidth,
   height: fieldHeight,
   strColor: 'black',
   strWidth: 2,
   setRect: createSvgRect
}
gameFieldInfo.setRect(gameField, svgPlay)

// Создаем SVG элемент rect, котрый будет левой ракеткой
const leftRacket = document.createElementNS("http://www.w3.org/2000/svg", 'rect');
const leftRacketInfo = {
   posX: 0,
   posY: fieldHeight / 2 - racketHeight / 2,
   color: 'green',
   width: racketWidth,
   height: racketHeight,
   setRect: createSvgRect
}

// Создаем SVG элемент rect, котрый будет правой ракеткой
const rightRacket = document.createElementNS("http://www.w3.org/2000/svg", 'rect');
const rightRacketInfo = {
   posX: fieldWidth - racketWidth,
   posY: fieldHeight / 2 - racketHeight / 2,
   color: 'blue',
   width: racketWidth,
   height: racketHeight,
   setRect: createSvgRect
}

// Создаем SVG элемент circle, который будет мячиком
const ball = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
const ballInfo = {
   centerX: fieldWidth / 2,
   centerY: fieldHeight / 2,
   radius: ballRadius,
   color: 'red',
   setBall: function () {
      ball.setAttribute("cx", this.centerX);
      ball.setAttribute("cy", this.centerY);
      ball.setAttribute("r", this.radius);
      ball.setAttribute("fill", this.color);
      svgPlay.appendChild(ball);
   }
}
// Переменная, которая будет определять начало игры, в зависимости от её значения
let startGame = false;
// Описываем функцию, которая будет устанавливать исходные параметры (позицию, скорость) для объектов игрового поля
// Также при вызове функции переменная startGame меняет свое значение и начнется движение мяча и ракеток
function start() {
   ballInfo.centerX = fieldWidth / 2;
   ballInfo.centerY = fieldHeight / 2;
   ballSpeedX = 5;
   ballSpeedY = 4;
   leftRacketInfo.posY = fieldHeight / 2 - racketHeight / 2;
   rightRacketInfo.posY = fieldHeight / 2 - racketHeight / 2;
   startGame = true;
}

// Вешаем обработчики событий на кнопку для запуска игры
startBtn.addEventListener('click', start)
btnBg.addEventListener('click', start)

// Объект, свойства которого будут изменяться в зависимости от событий keydown и keyup, так если фиксируется событие нажатия кнопки значение свойства становится true и в дальнейшем пока оно будет таким, будет изменяться положение ракеток, до события keyup
const keyEvent = {
   leftTop: false,
   leftBot: false,
   rightTop: false,
   rightBot: false,
}

// Вешаем обработчики на события кнопок
document.addEventListener('keydown', startMove);
document.addEventListener('keyup', endMove);

// Описывем работу функций
function startMove(eo) {
   eo = eo || window.Event;
   eo.preventDefault();
   if (eo.keyCode === 16) keyEvent.leftTop = true;
   if (eo.keyCode === 17) keyEvent.leftBot = true;
   if (eo.keyCode === 38) keyEvent.rightTop = true;
   if (eo.keyCode === 40) keyEvent.rightBot = true;
}
function endMove(eo) {
   eo = eo || window.Event;
   eo.preventDefault();
   if (eo.keyCode === 16) keyEvent.leftTop = false;
   if (eo.keyCode === 17) keyEvent.leftBot = false;
   if (eo.keyCode === 38) keyEvent.rightTop = false;
   if (eo.keyCode === 40) keyEvent.rightBot = false;
}

// Вызов функции при смене кадров
requestAnimationFrame(tick)

// Описываем работу функции
function tick() {
   // Если игра началась описываем порядок движения (смены координатов) ракеток
   if (startGame) {
      if (keyEvent.leftTop && leftRacketInfo.posY > 0) {
         leftRacketInfo.posY -= racketSpeed
      }
      if (keyEvent.leftBot && leftRacketInfo.posY + racketHeight < fieldHeight) {
         leftRacketInfo.posY += racketSpeed
      }
      if (keyEvent.rightTop && rightRacketInfo.posY > 0) {
         rightRacketInfo.posY -= racketSpeed
      }
      if (keyEvent.rightBot && rightRacketInfo.posY + racketHeight < fieldHeight) {
         rightRacketInfo.posY += racketSpeed
      }
   }
   // Если игра началась запускаем мячик
   if (startGame) {
      ballInfo.centerX += ballSpeedX;
      ballInfo.centerY -= ballSpeedY;
   }
   // Столкновение с нижней границей
   if (ballInfo.centerY + ballRadius > fieldHeight) {
      ballSpeedY = -ballSpeedY;
      ballSpeedX > 0 ? ballSpeedX = ballSpeedX + ballAccel : ballSpeedX = ballSpeedX - ballAccel
   }
   // Столкновение с верхней границей
   if (ballInfo.centerY - ballRadius < 0) {
      ballSpeedY = -ballSpeedY;
      ballSpeedX > 0 ? ballSpeedX = ballSpeedX + ballAccel : ballSpeedX = ballSpeedX - ballAccel
   }
   // Столкновение с правой границей
   if (ballInfo.centerX + ballRadius > fieldWidth) {
      ballInfo.centerX = fieldWidth - ballRadius;
      leftScoreInfo.text++;
      startGame = false;
   }
   // Столкновение с левой границей
   if (ballInfo.centerX - ballRadius < 0) {
      ballInfo.centerX = ballRadius;
      rightScoreInfo.text++;
      startGame = false;
   }
   // Столкновение с левой ракеткой
   if (ballInfo.centerX - ballRadius <= racketWidth && ballInfo.centerY >= leftRacketInfo.posY && ballInfo.centerY <= leftRacketInfo.posY + racketHeight) {
      ballInfo.centerX = racketWidth + ballRadius;
      ballSpeedX = -ballSpeedX;
      ballSpeedX > 0 ? ballSpeedX = ballSpeedX + ballAccel : ballSpeedX = ballSpeedX - ballAccel
   }
   // Столкновение с правой ракеткой
   if (ballInfo.centerX + ballRadius >= fieldWidth - racketWidth && ballInfo.centerY >= rightRacketInfo.posY && ballInfo.centerY <= rightRacketInfo.posY + racketHeight) {
      ballSpeedX = -ballSpeedX;
      ballSpeedX > 0 ? ballSpeedX = ballSpeedX + ballAccel : ballSpeedX = ballSpeedX - ballAccel
   }
   leftRacketInfo.setRect(leftRacket, svgPlay)
   rightRacketInfo.setRect(rightRacket, svgPlay)
   ballInfo.setBall();
   leftScoreInfo.setPos(leftScore, svgInfo)
   rightScoreInfo.setPos(rightScore, svgInfo)
   requestAnimationFrame(tick)
}