class ViewDOM {
   constructor() {
      this.myModel = null;
      this.field = null;
      this.size = 300;
      this.number = 12; // Количество часов на циферблате
      this.ratio = 10;  // Коэффициеет, во сколько раз окружность цифр будет меньше циферблата  
      this.angle = 0;  // Угол на который будут смещаться цифры циферблата
      this.diff = 15;   // Смещение цифр от края циферблата
      // Указываем коэффициенты размера для стрелок часов
      this.hourRatioW = 30;
      this.hourRatioH = 3.5;
      this.minutRatioW = 40;
      this.minutRatioH = 3;
      this.secondRatioW = 60;
      this.secondRatioH = 2.5;
      this.degHour = 30; // Угол смещения часовоф стрелки
      this.deg = 6; // Угол смещения минутной и секундной стрелки
      // Создаем стрелки часов
      this.arrowHour = document.createElement('div');
      this.arrowMinut = document.createElement('div');
      this.arrowSecond = document.createElement('div');
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
      const clockCircle = document.createElement('div'); // Создаем циферблат 
      // В корневой див добавляем все созданны элемнты
      this.field.appendChild(span);
      this.field.appendChild(clockCircle);
      // Устанавливаем стиливые свойства
      clockCircle.style.width = this.size + 'px';
      clockCircle.style.height = clockCircle.offsetWidth + 'px';
      clockCircle.style.background = 'orange';
      clockCircle.style.borderRadius = 50 + '%';
      clockCircle.style.margin = 10 + 'px';
      clockCircle.style.position = 'relative';
      // Создаем цифры и окружности для них и размещаем их на страницы
      for (let i = 0; i < this.number; i++) {
         const hour = document.createElement('div');
         hour.style.position = 'absolute';
         hour.style.display = 'flex';
         hour.style.justifyContent = 'center';
         hour.style.alignItems = 'center';
         hour.style.background = 'green';
         hour.style.borderRadius = 50 + '%';
         hour.style.width = clockCircle.offsetWidth / this.ratio + 'px';
         hour.style.height = clockCircle.offsetWidth / this.ratio + 'px';
         hour.innerText = i + 1;
         clockCircle.appendChild(hour);
         const centrPos = clockCircle.offsetWidth / 2 - hour.offsetWidth / 2;
         this.angle += 30;
         hour.style.left = (centrPos + (clockCircle.offsetWidth - hour.offsetWidth - this.diff) / 2 * Math.sin((this.angle * Math.PI) / 180)) + 'px';
         hour.style.top = (centrPos - (clockCircle.offsetWidth - hour.offsetWidth - this.diff) / 2 * Math.cos((this.angle * Math.PI) / 180)) + 'px';
      }

      this.arrowHour.classList.add('arrows');
      this.arrowMinut.classList.add('arrows');
      this.arrowSecond.classList.add('arrows');
      // Добавляем стрелки в циферблат
      clockCircle.appendChild(this.arrowHour);
      clockCircle.appendChild(this.arrowMinut);
      clockCircle.appendChild(this.arrowSecond);

      // Устанавливаем  стилевые свойства для стрелок и позиционируем их
      this.arrowHour.style.width = clockCircle.offsetWidth / this.hourRatioW + 'px';
      this.arrowHour.style.height = clockCircle.offsetWidth / this.hourRatioH + 'px';
      this.arrowHour.style.left = clockCircle.offsetWidth / 2 - this.arrowHour.offsetWidth / 2 + 'px';
      this.arrowMinut.style.width = clockCircle.offsetWidth / this.minutRatioW + 'px';
      this.arrowMinut.style.height = clockCircle.offsetWidth / this.minutRatioH + 'px';
      this.arrowMinut.style.left = clockCircle.offsetWidth / 2 - this.arrowMinut.offsetWidth / 2 + 'px';
      this.arrowSecond.style.width = clockCircle.offsetWidth / this.secondRatioW + 'px';
      this.arrowSecond.style.height = clockCircle.offsetWidth / this.secondRatioH + 'px';
      this.arrowSecond.style.left = clockCircle.offsetWidth / 2 - this.arrowSecond.offsetWidth / 2 + 'px';
   }
   // Метод, который будет обновлять позицию стрелок в зависимости от данных, которые передала модель
   update() {
      const hours = this.myModel.timeUtc.getHours();
      const minutes = this.myModel.timeUtc.getMinutes();
      const seconds = this.myModel.timeUtc.getSeconds();
      let hh = hours * this.degHour;
      let mm = minutes * this.deg;
      let ss = seconds * this.deg;
      this.arrowHour.style.transform = `rotateZ(${hh + (mm / 12)}deg)`;
      this.arrowMinut.style.transform = `rotateZ(${mm}deg)`;
      this.arrowSecond.style.transform = `rotateZ(${ss}deg)`;
   }
}
