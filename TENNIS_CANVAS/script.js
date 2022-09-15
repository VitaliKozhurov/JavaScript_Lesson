/*===== Переменные ======*/
const fieldWidth = 1200;
const fieldHeight = 700;
const ballSize = 30;
const ballRadius = 15;
const heightDif = 100;
const textPosY = 90;
const textDif = 30;
const racketHeight = 125;
const racketWidth = 30;
const racketSpeed = 10;
let speedX;
let speedY;
const speedAccel = 0.25;

// Находим тег canvas в документе
const canvas = document.getElementById('canvas');
// Задаем размеры CANVAS
canvas.width = fieldWidth;
canvas.height = fieldHeight;
// Контекст для отрисовки 
const context = canvas.getContext('2d');
// Параметры игрового поля
const gameFieldInfo = {
   x: 0,
   y: heightDif,
   width: fieldWidth,
   height: fieldHeight - heightDif,
   color: 'yellow',
   colorStr: 'black',
}
// Параметры мяча
const ballInfo = {
   x: fieldWidth / 2,
   y: (fieldHeight + heightDif) / 2,
   r: ballRadius,
   color: 'red',
}
// Параметры ракеток
const leftRacketInfo = {
   x: 0,
   y: (fieldHeight + heightDif) / 2 - racketHeight / 2,
   width: racketWidth,
   height: racketHeight,
   color: 'green',
}
const rightRacketInfo = {
   x: fieldWidth - racketWidth,
   y: (fieldHeight + heightDif) / 2 - racketHeight / 2,
   width: racketWidth,
   height: racketHeight,
   color: 'blue',
}
// Параметры текста
const textInfoL = {
   text: 0,
   x: fieldWidth / 2 - textDif,
   y: textPosY,
   align: 'right'
}
const textInfoR = {
   text: 0,
   x: fieldWidth / 2 + textDif,
   y: textPosY,
   align: 'left'
}
const textInfoMid = {
   text: ':',
   x: fieldWidth / 2,
   y: textPosY,
   align: 'center'
}
// Функция для отрисовки прямоугольника
function drawRect(x, y, width, height, color, colorStr) {
   context.fillStyle = color;  // Цвет прямоугольника
   context.fillRect(x, y, width, height); // Координаты и размеры прямоугольника
   if (colorStr) {
      context.strokeStyle = colorStr; // Цвет обводки
      context.strokeRect(x, y, width, height); // рамка прямоугольника 
   }
}
// Функция для отрисовки мяча
function drawBall(x, y, r, color) {
   context.beginPath();
   context.arc(x, y, r, 0, Math.PI * 2);
   context.fillStyle = color;
   context.fill()
}
// Функция для отрисовки текста
function drawText(text, x, y, align) {
   context.fillStyle = 'black';
   context.font = '64px bold serif';
   context.textAlign = align;
   context.fillText(text, x, y);
}
// Слушаем события клавиатуры
document.addEventListener('keydown', startMove);
document.addEventListener('keyup', endMove);
// Описываем оброботчик при нажатии управляющих кнопок
function startMove(eo) {
   eo = eo || window.Event;
   eo.preventDefault();
   if (eo.keyCode === 16) {
      keyState.leftTop = true;
   }
   if (eo.keyCode === 17) {
      keyState.leftBot = true
   }
   if (eo.keyCode === 38) {
      keyState.rightTop = true
   }
   if (eo.keyCode === 40) {
      keyState.rightBot = true
   }
}
// Описываем оброботчик при отпускании управляющих кнопок
function endMove(eo) {
   eo = eo || window.Event;
   eo.preventDefault();
   if (eo.keyCode === 16) {
      keyState.leftTop = false;
   }
   if (eo.keyCode === 17) {
      keyState.leftBot = false
   }
   if (eo.keyCode === 38) {
      keyState.rightTop = false
   }
   if (eo.keyCode === 40) {
      keyState.rightBot = false
   }
}

const keyState = {
   leftTop: false,
   leftBot: false,
   rightTop: false,
   rightBot: false
}

// Переменная, которая будет определять начало игры (будут активны мячик и ракетки)
let gameStart = false;
function start() {
   gameStart = true;
   speedY = 4;
   speedX = 6;
   let randomX = Math.floor(Math.random() * 10);
   let randomY = Math.floor(Math.random() * 10);
   if (randomX < 5) {
      speedX = -speedX;
   }
   if (randomY < 5) {
      speedY = -speedY;
   }
   ballInfo.x = fieldWidth / 2;
   ballInfo.y = (fieldHeight + heightDif) / 2;
   leftRacketInfo.y = (fieldHeight + heightDif) / 2 - racketHeight / 2;
   rightRacketInfo.y = (fieldHeight + heightDif) / 2 - racketHeight / 2;
}
document.querySelector('button').addEventListener('click', start)

requestAnimationFrame(tick);
// Функция которая будет перерисовывать холст в зависимости от изменения координат элементов
function tick() {
   // Перерисовываем холст, каждый раз при обновлении экрана
   context.clearRect(0, 0, fieldWidth, fieldHeight);
   if (gameStart) {
      ballInfo.x += speedX;
      ballInfo.y += speedY;
      /*===== ДВИЖЕНИЕ МЯЧА И СТОЛКНОВЕНИЕ =====*/
      if ((ballInfo.y + ballRadius > fieldHeight) || (ballInfo.y - ballRadius < heightDif)) {
         speedX > 0 ? speedX = speedX + speedAccel : speedX = speedX - speedAccel; // Ускорение
         speedY = -speedY; // Изменение направления движения по оси Y
      }
      // Столкновение с левой стенкой
      if (ballInfo.x - ballRadius < 0) {
         speedY = 0;
         speedX = 0;
         ballInfo.x = ballRadius;
         gameStart = false;
         textInfoL.text++;
      }
      // Столкновение с правой стенкой
      if (ballInfo.x + ballRadius > fieldWidth) {
         speedY = 0;
         speedX = 0;
         ballInfo.x = fieldWidth - ballRadius;
         gameStart = false;
         textInfoR.text++;
      }
      // Столкновение с левой ракеткой
      if (ballInfo.x - ballRadius < racketWidth && ballInfo.y > leftRacketInfo.y && ballInfo.y < leftRacketInfo.y + racketHeight) {
         ballInfo.x = racketWidth + ballRadius;
         speedX > 0 ? speedX = speedX + speedAccel : speedX = speedX - speedAccel; // Ускорение
         speedX = -speedX; // Изменение направления движения по оси X
      }
      // Столкновение с правой ракеткой
      if (ballInfo.x + ballRadius > fieldWidth - racketWidth && ballInfo.y > rightRacketInfo.y && ballInfo.y < rightRacketInfo.y + racketHeight) {
         ballInfo.x = fieldWidth - racketWidth - ballRadius;
         speedX > 0 ? speedX = speedX + speedAccel : speedX = speedX - speedAccel; // Ускорение
         speedX = -speedX; // Изменение направления движения по оси X
      }
      console.log(speedX)

      /*===== ДВИЖЕНИЕ РАКЕТОК =====*/
      // Движение левой ракетки вверх
      if (keyState.leftTop && leftRacketInfo.y > heightDif) {
         leftRacketInfo.y -= racketSpeed
      }
      // Движение левой ракетки вниз
      if (keyState.leftBot && leftRacketInfo.y + racketHeight < fieldHeight) {
         leftRacketInfo.y += racketSpeed
      }
      // Движение правой ракетки вверх
      if (keyState.rightTop && rightRacketInfo.y > heightDif) {
         rightRacketInfo.y -= racketSpeed
      }
      // Движение правой ракетки вниз
      if (keyState.rightBot && rightRacketInfo.y + racketHeight < fieldHeight) {
         rightRacketInfo.y += racketSpeed
      }
   }

   /*====== Игровое поле =======*/
   drawRect(gameFieldInfo.x, gameFieldInfo.y, gameFieldInfo.width, gameFieldInfo.height, gameFieldInfo.color, gameFieldInfo.colorStr);
   drawBall(ballInfo.x, ballInfo.y, ballInfo.r, ballInfo.color);
   // Ракетка левая
   drawRect(leftRacketInfo.x, leftRacketInfo.y, leftRacketInfo.width, leftRacketInfo.height, leftRacketInfo.color);
   // Ракетка правая
   drawRect(rightRacketInfo.x, rightRacketInfo.y, rightRacketInfo.width, rightRacketInfo.height, rightRacketInfo.color);
   // Счет левого игрока
   drawText(textInfoL.text, textInfoL.x, textInfoL.y, textInfoL.align);
   // Счет правого игрока
   drawText(textInfoR.text, textInfoR.x, textInfoR.y, textInfoR.align);
   // разделитель счета
   drawText(textInfoMid.text, textInfoMid.x, textInfoMid.y, textInfoMid.align);
   requestAnimationFrame(tick)
}