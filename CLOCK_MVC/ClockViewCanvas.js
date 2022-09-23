class ViewCanvas {
   constructor() {
      this.myModel = null;
      this.field = null;
      this.size = 300;
      this.center = this.size / 2;
      this.radius = this.size / 2;
      this.number = 12; // Количество часов на циферблате
      this.ratio = 10;  // Коэффициеет, во сколько раз окружность цифр будет меньше циферблата  
      this.angle = 0;  // Угол на который будут смещаться цифры циферблата
      this.diff = 15;   // Смещение цифр от края циферблата

      // Указываем коэффициенты размера для стрелок часов
      this.hourRatioW = 30;
      this.minutRatioW = 40;
      this.secondRatioW = 60;

      this.hourHeight = 70;
      this.minutesHeight = 95;
      this.secondsHeight = 115;

      this.degHour = 30; // Угол смещения часовоф стрелки
      this.deg = 6; // Угол смещения минутной и секундной стрелки

      this.canvas = document.createElement('canvas');
      this.context = this.canvas.getContext('2d');
   }
   // Связываем представление и модель
   initModel(model, field) {
      this.myModel = model;
      this.field = field;
   }
   // Метод отрисовки часов
   createClock() {
      const span = document.createElement('span'); // Спан для информации о часовом поясе
      span.innerText = this.myModel.nameTimeZone; // Название часового пояса
      this.canvas.style.margin = 10 + 'px';
      this.canvas.width = this.size;
      this.canvas.height = this.size;
      // В корневой див добавляем все созданны элементы
      this.field.appendChild(span);
      this.field.appendChild(this.canvas);
   }
   // Метод, который будет обновлять позицию стрелок в зависимости от данных, которые передала модель
   update() {
      this.context.clearRect(0, 0, this.size, this.size)

      // Отрисовка циферблата
      this.context.beginPath();
      this.context.arc(this.center, this.center, this.size / 2, 0, 2 * Math.PI);
      this.context.fillStyle = 'orange';
      this.context.fill();

      // Создаем цифры и окружности для них и размещаем их на странице
      for (let i = 0; i < this.number; i++) {
         let centerX = this.center + Math.sin(((i + 1) * Math.PI / 6)) * (this.radius - this.size / this.ratio);
         let centerY = this.center - Math.cos(((i + 1) * Math.PI / 6)) * (this.radius - this.size / this.ratio);

         this.context.beginPath();
         this.context.fillStyle = 'green'; // Цвет заливки для кругов цифр
         this.context.arc(centerX, centerY, this.size / (2 * this.ratio), 0, 2 * Math.PI); // Рисуем дугу,
         this.context.fill();  // Вызываем метод для заливки

         // Для номеров цифр
         this.context.fillStyle = 'black';  // Заливка текста
         this.context.textAlign = 'center';  // Выравнивание по оси Х
         this.context.textBaseline = 'middle'  // Выравнивание по оси Y
         this.context.font = `16px serif`;
         this.context.fillText(i + 1, centerX, centerY); // Указываем в каком месте какое текстовое содержимое необходимо зазместить
      }

      const hours = this.myModel.timeUtc.getHours();
      const minutes = this.myModel.timeUtc.getMinutes();
      const seconds = this.myModel.timeUtc.getSeconds();
      let mm = minutes * this.deg;
      let hh = hours * this.degHour + (mm / 12);
      let ss = seconds * this.deg;

      const drawTime = (arrowAngle, arrowHeight, arrowWidth) => {
         // Определяем переменные, которые будут хранить конечное положение стрелок
         let centerX = this.center + Math.sin((Math.PI * arrowAngle) / 180) * arrowHeight;
         let centerY = this.center - Math.cos((Math.PI * arrowAngle) / 180) * arrowHeight;
         this.context.beginPath(); //Начинаем отрисовку  стрелки
         this.context.moveTo(this.center, this.center);  // Началом является центр часов
         this.context.lineTo(centerX, centerY);// Координаты конца стрелок
         this.context.lineWidth = arrowWidth;  // Толщина стрелок
         this.context.strokeStyle = 'black'; // Цвет линии (стрелок)
         this.context.lineCap = 'round'; // Форма концов линии (стрелок)
         this.context.stroke();  // Отрисовка линии (стрелки)
      }

      drawTime(hh, this.hourHeight, this.size / this.hourRatioW);
      drawTime(mm, this.minutesHeight, this.size / this.minutRatioW);
      drawTime(ss, this.secondsHeight, this.size / this.secondRatioW);
   }
}
