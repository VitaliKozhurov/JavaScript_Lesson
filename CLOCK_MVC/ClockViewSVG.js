class ViewSvg {
   constructor() {
      this.myModel = null;
      this.field = null;
      this.size = 300; // Размер часов
      this.center = this.size / 2; // Центр часов
      this.radius = this.size / 2; // Радиус часов
      this.ratio = 10;  // Коэффициеет, во сколько раз окружность цифр будет меньше циферблата
      this.number = 12; // Количество часов на циферблате
      this.angle = 0;  // Угол на который будут смещаться цифры циферблата
      this.diff = 15;   // Смещение цифр от края циферблата
      // Указываем коэффициенты размера для стрелок часов
      this.hourRatioW = 30;
      this.minutRatioW = 40;
      this.secondRatioW = 60;
      // Высота стрелок
      this.hourArrowHeight = 4;
      this.minutArrowHeight = 6;
      this.secondArrowHeight = 10;

      this.degHour = 30; // Угол смещения часовой стрелки
      this.deg = 6; // Угол смещения минутной и секундной стрелки
      // Создаем стрелки часов
      this.arrowHour = document.createElementNS('http://www.w3.org/2000/svg', 'line');
      this.arrowMinut = document.createElementNS('http://www.w3.org/2000/svg', 'line');
      this.arrowSecond = document.createElementNS('http://www.w3.org/2000/svg', 'line');


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
      const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg'); // Тег SVG
      svg.setAttribute("style", `width:${this.size}px;height:${this.size}px;`); // Задаем высоту и ширину тега SVG
      svg.style.margin = 10 + 'px';
      this.field.appendChild(span); // Добавляем в контейнер спан для информации о часовом поясе
      this.field.appendChild(svg); // Добавляем тег SVG
      const clockCircle = document.createElementNS("http://www.w3.org/2000/svg", 'circle'); // Создаем круг
      clockCircle.style.fill = 'orange';
      clockCircle.setAttribute("cx", this.center); // Координаты центра окружности по оси Х (половина ширины тега svg)
      clockCircle.setAttribute("cy", this.center); // Координаты центра окружности по оси У (половина высоты тега svg)
      clockCircle.setAttribute("r", this.radius); // Радиус окружности
      svg.appendChild(clockCircle);  // Добавляем элемент в тег SVG

      // Создаем цифры и окружности для них и размещаем их на страницы
      for (let i = 0; i < this.number; i++) {
         const hour = document.createElementNS("http://www.w3.org/2000/svg", 'circle');
         hour.style.fill = 'green';
         // Добавляем окружность для цифр
         svg.appendChild(hour);
         this.angle += 30; // Каждую итерацию изменяем угол на 30 градусов
         // Позиционируем цифры циферблата
         const posX = (this.center + (this.size - this.size / this.ratio - this.diff) / 2 * Math.sin((this.angle * Math.PI) / 180)); // Если плюс то угол изменяется по часовой стрелке, если минус, то наоборот
         const posY = (this.center - (this.size - this.size / this.ratio - this.diff) / 2 * Math.cos((this.angle * Math.PI) / 180)); // Если минус, то отсчет идет сверху вниз, если плюс то наоборот

         hour.setAttribute("cx", posX); // Координаты центра окружности по оси Х
         hour.setAttribute("cy", posY); // Координаты центра окружности по оси У
         hour.setAttribute("r", this.size / (2 * this.ratio)); // Радиус окружности для цифр циферблата

         // Создаем цифры и добавляем их в центр окружностей
         const clockNumber = document.createElementNS('http://www.w3.org/2000/svg', 'text');
         clockNumber.setAttribute('dominant-baseline', 'mathematical'); // Выравнивание по оси Y
         clockNumber.setAttribute('text-anchor', 'middle');  // Выравниваем элемент относительно осей X по-центру
         clockNumber.setAttribute("x", posX);  // Координаты текста относительно оси Х
         clockNumber.setAttribute("y", posY);  // Координаты текста относительно оси Y
         clockNumber.textContent = i + 1  // Изменяем номер цифры при каждой итерации
         svg.appendChild(clockNumber);  // Добавляем элемент в тег SVG
      }

      // Позиционируем стрелки часов
      this.arrowHour.style.transformOrigin = `${this.center}px ${this.center}px`;
      this.arrowHour.setAttribute('stroke', 'black');
      this.arrowHour.setAttribute('x1', this.center);
      this.arrowHour.setAttribute('y1', this.center);
      this.arrowHour.setAttribute('x2', this.center);
      this.arrowHour.setAttribute('y2', this.size / this.hourArrowHeight);
      this.arrowHour.setAttribute('stroke-linecap', 'round');
      this.arrowHour.setAttribute('stroke-width', this.size / this.hourRatioW);

      this.arrowMinut.style.transformOrigin = `${this.center}px ${this.center}px`;
      this.arrowMinut.setAttribute('stroke', 'black');
      this.arrowMinut.setAttribute('x1', this.center);
      this.arrowMinut.setAttribute('y1', this.center);
      this.arrowMinut.setAttribute('x2', this.center);
      this.arrowMinut.setAttribute('y2', this.size / this.minutArrowHeight);
      this.arrowMinut.setAttribute('stroke-linecap', 'round');
      this.arrowMinut.setAttribute('stroke-width', this.size / this.minutRatioW);

      this.arrowSecond.style.transformOrigin = `${this.center}px ${this.center}px`;
      this.arrowSecond.setAttribute('stroke', 'black');
      this.arrowSecond.setAttribute('x1', this.center);
      this.arrowSecond.setAttribute('y1', this.center);
      this.arrowSecond.setAttribute('x2', this.center);
      this.arrowSecond.setAttribute('y2', this.size / this.secondArrowHeight);
      this.arrowSecond.setAttribute('stroke-linecap', 'round');
      this.arrowSecond.setAttribute('stroke-width', this.size / this.secondRatioW);

      // Добавляем стрелки в циферблат
      svg.appendChild(this.arrowHour);
      svg.appendChild(this.arrowMinut);
      svg.appendChild(this.arrowSecond);

   }
   // Обновляем положение стрелок в зависимости от данных модели
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