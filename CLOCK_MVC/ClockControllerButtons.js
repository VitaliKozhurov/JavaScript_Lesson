class ClockControllerButtons {
   constructor() {
      this.myModel = null;
      this.field = null;
   }
   initModel(model, field) {
      this.myModel = model;   // Связываем контроллер и модель
      this.field = field;     // Связываем контроллер и контейнер, в котором будут часы
      const start = this.field.querySelector('.start');  // Находим кнопку старт
      // Вешаем обработчик при нажатии на кнопку старт, вызываем метод модели
      start.addEventListener('click', () => {

         this.myModel.startTime()
      })
      const stop = this.field.querySelector('.stop');  // Находим кнопку стоп
      // Вешаем обработчик при нажатии на кнопку стоп, вызываем метод модели
      stop.addEventListener('click', () => {
         this.myModel.stopTime()
      });
   }
}