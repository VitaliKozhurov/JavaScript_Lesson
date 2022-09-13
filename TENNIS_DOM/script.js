// Игровое поле
const gameField = document.getElementById('game_field');
// Информационное поле
const gameInfo = document.getElementById('info');
// Значение ширины и высоты игрового поля
const fieldSize = {
   fieldWidth: 1200,
   fieldHeight: 600,
}
gameField.style.width = fieldSize.fieldWidth + 'px';
gameField.style.height = fieldSize.fieldHeight + 'px';
gameInfo.style.width = fieldSize.fieldWidth + 'px';
// Кнопка начала игры
const startBtn = document.querySelector('button');
// Переменные для подсчета очков игроков
let leftPlayerScore = document.getElementById('left_player');
let rightPlayerScore = document.getElementById('right_player');

// Переменная будет определять направление полета мяча при нажатии кнопки старт
let random;

/*====== ИГРОВОЙ МЯЧ ======*/
const ball = document.getElementById('ball');
// Определяем размер мяча
const ballSize = 30;
ball.style.width = ballSize + 'px';
ball.style.height = ballSize + 'px';
const ballInfo = {
   ballAccel: 0.2,
   posX: fieldSize.fieldWidth / 2 - ballSize / 2,
   posY: fieldSize.fieldHeight / 2 - ballSize / 2,
   updatePos: function () {
      ball.style.transform = `translateX(${this.posX}px) translateY(${this.posY}px)`;
   }
}
// Определяем позицию мяча
ballInfo.updatePos()

/*====== РАКЕТКИ ИГРОКОВ ======*/
// Левая
const leftRacket = document.getElementById('left_racket');
const racketWidth = 20;
const racketHeight = 125;
leftRacket.style.width = racketWidth + 'px';
leftRacket.style.height = racketHeight + 'px';
const leftRacketInfo = {
   speed: 7,
   posX: 0,
   posY: fieldSize.fieldHeight / 2 - racketHeight / 2,
   updatePos: function () {
      leftRacket.style.transform = `translateX(${this.posX}px) translateY(${this.posY}px)`
   }
}
// Правая
const rightRacket = document.getElementById('right_racket');
rightRacket.style.width = racketWidth + 'px';
rightRacket.style.height = racketHeight + 'px';
const rightRacketInfo = {
   speed: 7,
   posX: fieldSize.fieldWidth - racketWidth,
   posY: fieldSize.fieldHeight / 2 - racketHeight / 2,
   updatePos: function () {
      rightRacket.style.transform = `translateX(${this.posX}px) translateY(${this.posY}px)`
   }
}
// Определяем позицию ракеток
rightRacketInfo.updatePos()
leftRacketInfo.updatePos()

// Вешаем на кнопку обработчик события при нажатии
startBtn.addEventListener('click', startGame)

// Функция, которая будет возвращать в исходное состояние мячик и ракетки при нажатии кнопки старт
function setStartPos() {
   ballInfo.ballSpeedX = 6;
   ballInfo.ballSpeedY = 2;
   ballInfo.posX = fieldSize.fieldWidth / 2 - ballSize / 2;
   ballInfo.posY = fieldSize.fieldHeight / 2 - ballSize / 2;
   leftRacketInfo.posY = fieldSize.fieldHeight / 2 - racketHeight / 2;
   rightRacketInfo.posY = fieldSize.fieldHeight / 2 - racketHeight / 2;
}
// Объект, свойства которого будут изменяться в зависимости от событий keydown и keyup, так если фиксируется событие нажатия кнопки значение свойства становится true и в дальнейшем пока оно будет таким будет изменяться положение ракеток, до события отпускания кнопки
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
// Функция которая запускает игру
function startGame() {
   // Устанавливаем положение мяча
   setStartPos();
   // Переменная будет определять направление полета мяча в начале игры
   random = Math.floor(Math.random() * 10);
   // Планируем запуск функции tick при обновлении кадров экрана
   requestAnimationFrame(tick);
}

function tick() {
   // определяем первоначальное направление полета мячика по оси X
   if (random > 5) {
      ballInfo.posX += ballInfo.ballSpeedX;
   } else ballInfo.posX -= ballInfo.ballSpeedX;
   // определяем первоначальное направление полета мячика по оси Y
   ballInfo.posY -= ballInfo.ballSpeedY;

   // Реакция на столкновение с нижней границей
   if (ballInfo.posY + ballSize > fieldSize.fieldHeight) {
      ballInfo.ballSpeedY = -(ballInfo.ballSpeedY)
      ballInfo.posY = fieldSize.fieldHeight - ballSize
   }
   // Реакция на столкновение с верхней границей
   if (ballInfo.posY < 0) {
      ballInfo.ballSpeedY = -ballInfo.ballSpeedY;
      ballInfo.posY = 0;
   }

   // Реакция на столкновение с правой границей
   if (ballInfo.posX + ballSize > fieldSize.fieldWidth) {
      leftPlayerScore.innerText = +leftPlayerScore.innerText + 1;
      return
   }
   // Реакция на столкновение с левой границей
   if (ballInfo.posX < 0) {
      rightPlayerScore.innerText = +rightPlayerScore.innerText + 1;
      return
   }

   /*====== Столкновение с ракетками ======*/
   // Столкновение с левой
   if ((ballInfo.posY + ballSize / 2) >= leftRacketInfo.posY && (ballInfo.posY + ballSize / 2) <= (leftRacketInfo.posY + racketHeight) && ballInfo.posX <= racketWidth) {
      // Описываем ускорение
      ballInfo.ballSpeedX > 0 ? ballInfo.ballSpeedX = ballInfo.ballSpeedX + ballInfo.ballAccel : ballInfo.ballSpeedX = ballInfo.ballSpeedX - ballInfo.ballAccel;
      ballInfo.ballSpeedX = - ballInfo.ballSpeedX;
      ballInfo.posX = racketWidth;
   }

   // Столкновение с правой
   if ((ballInfo.posY + ballSize / 2) >= rightRacketInfo.posY && (ballInfo.posY + ballSize / 2) <= (rightRacketInfo.posY + racketHeight) && (ballInfo.posX + ballSize) >= (fieldSize.fieldWidth - racketWidth)) {
      // Описываем ускорение
      ballInfo.ballSpeedX > 0 ? ballInfo.ballSpeedX = ballInfo.ballSpeedX + ballInfo.ballAccel : ballInfo.ballSpeedX = ballInfo.ballSpeedX - ballInfo.ballAccel;
      ballInfo.ballSpeedX = - ballInfo.ballSpeedX;
      ballInfo.posX = fieldSize.fieldWidth - racketWidth - ballSize;
   }

   /*===== Движение левой ракетки ======*/
   // Движение левой ракетки вверх (пока значение будет true и положение ракетки не выходит за верхнюю границу поля)
   if (keyEvent.leftTop === true && leftRacketInfo.posY > 0) {
      leftRacketInfo.posY -= leftRacketInfo.speed;
   }
   // Движение левой ракетки вниз (пока значение будет true и положение ракетки не выходит за нижнюю границу поля)
   if (keyEvent.leftBot === true && leftRacketInfo.posY < fieldSize.fieldHeight - racketHeight) {
      leftRacketInfo.posY += leftRacketInfo.speed;
   }

   /*===== Движение правой ракетки ======*/
   // Движение правой ракетки вверх (пока значение будет true и положение ракетки не выходит за верхнюю границу поля)
   if (keyEvent.rightTop === true && rightRacketInfo.posY > 0) {
      rightRacketInfo.posY -= rightRacketInfo.speed;
   }
   // Движение правой ракетки вниз (пока значение будет true и положение ракетки не выходит за нижнюю границу поля)
   if (keyEvent.rightBot === true && rightRacketInfo.posY < fieldSize.fieldHeight - racketHeight) {
      rightRacketInfo.posY += rightRacketInfo.speed;
   }

   ballInfo.updatePos();
   leftRacketInfo.updatePos();
   rightRacketInfo.updatePos();
   requestAnimationFrame(tick);
}