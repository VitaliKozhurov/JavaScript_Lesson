class Clock {
   constructor(offsetTime, nameTimeZone) {
      self = this;
      this.nameTimeZone = nameTimeZone;
      this.time = new Date; // Текущее время
      this.offsetTime = offsetTime; // Указываем разницу по времени между часовыми поясами
      this.timeUtc = new Date(this.time.getTime() + this.offsetTime); // Время с учетом часового пояса
      this.timeIsGo = true; // Состояние часов (запущены или нет)
      this.myView = null;
   }

   // Метод, который будет обновлять показания времени при срабатывании таймера, если состояние часов "запущены"
   updateTime() {
      if (this.timeIsGo) {
         this.time = new Date;
         this.timeUtc = new Date(this.time.getTime() + this.offsetTime);

         this.updateView();
      }
      setInterval(() => {
         if (this.timeIsGo) {
            this.time = new Date;
            this.timeUtc = new Date(this.time.getTime() + this.offsetTime);
            this.updateView();
         }
      }, 1000) // Запускаем обновление через 1 секунду
   }
   // Метод, который будет определять состояние часов "запущены"
   startTime() {
      this.timeIsGo = true;
   }
   // Метод, который будет определять состояние часов "остановлены"  
   stopTime() {
      this.timeIsGo = false;
   }

   // Метод, который связывает модель и его отображение
   initView(view) {
      this.myView = view;
   }
   // Метод, который будет вызываться каждый раз при изменении модели
   updateView() {
      this.myView.update()
   }
}