class LocalStorage {
   /* Создаем обьект в котором будут храниться данные */
   // Праметр в конструкторе будет являться ключом LocalStorage, чтобы разделять два разных хранилища
   constructor(keyLS) {
      if (localStorage[keyLS]) {
         this.storage = JSON.parse(localStorage[keyLS]);
      } else this.storage = {};
      this.keyLS = keyLS
   }
   /* Описываем метод, для сохранения данных */
   addValue(key, value) {
      this.storage[key] = value;
      localStorage.setItem(this.keyLS, JSON.stringify(this.storage))
   }
   /* Описываем метод, для вывода данных*/
   getValue(key) {
      return this.storage[key]
   }
   /* Описываем метод, для удаления */
   deleteValue(key) {
      if (key in this.storage) {
         delete this.storage[key];
         localStorage.setItem(this.keyLS, JSON.stringify(this.storage));
         return true
      } else return false
   }
   /* Описываем метод, для вывода */
   getkeys() {
      return Object.keys(this.storage)
   }
}
/* Создаем объект */
let drinkStorage = new LocalStorage('drink');
/* Описываем фунцию, которая будет вызываться при нажатии на кнопку "Ввод информации о напитке", функция будет запрашивать данные о напитке у пользователя и при помощи метода объекта сохранять данные в обьект */
function inputInfoDrink() {
   let drinkName = prompt('Введите название напитка');
   let isAlc = confirm('Напиток является алкогольным? Если да, то нажмите ОК, если нет нажмите Отмена');
   let recipe = prompt('Введите рецепт напитка');
   return drinkStorage.addValue(drinkName, { alc: isAlc, rec: recipe })
}

/* Описываем функцию, которая будет вызываться при нажатии на кнопку "Получение информации о напитке", и возвращать пользователю инфорамцию о выбранном напитке. При вызове метода будет возвращаться значение свойства, в котором находится информация о напитке, также выполнена проверка на наличие свойства в объекте */
function getInfoDrink() {
   let drinkName = prompt('Введите название напитка, информацию о котором необходимо получить')
   let drinkInfo = drinkStorage.getValue(drinkName)
   if (drinkInfo !== undefined) {
      alert(`
   Напиток ${drinkName}
   Алкогольный: ${drinkInfo.alc ? 'Да' : 'Нет'}
   Рецепт: ${drinkInfo.rec}`)
   }
   else alert('Данного напитка нет в перечне')
}

/* Описываем функцию, которая будет вызываться при нажатии на кнопку "Удаление информации о напитке", вызывается метод, который из объекта будет удалять свойство, имя которого передал пользователь */
function deleteDrink() {
   let drinkName = prompt('Введите название напитка, который необходимо удалить');
   if (drinkStorage.deleteValue(drinkName)) {
      alert(`Напиток ${drinkName} удален`);
   }
   else { alert('Данного напитка нет в списке') }
}

/* Описываем функцию, которая будет вызываться при нажатии на кнопку "Перечень всех напитков", вызывается метод, который будет передавать имена свойств объекта */
function getAllDrink() {
   alert(drinkStorage.getkeys())
}

/* ====== Создаем объект для блюда ====== */
let dishStorage = new LocalStorage('dish');

function inputInfoDish() {
   let dishName = prompt('Введите название блюда');
   let recipe = prompt('Введите рецепт блюда');
   return dishStorage.addValue(dishName, recipe)
}

function getInfoDish() {
   let dishName = prompt('Введите название блюда, информацию о котором необходимо получить')
   let dishInfo = dishStorage.getValue(dishName)
   if (dishInfo !== undefined) {
      alert(`
   Блюдо ${dishName}
   Рецепт: ${dishInfo}`)
   }
   else alert('Данного блюда нет в перечне')
}

function deleteDish() {
   let dishName = prompt('Введите название блюда, которое необходимо удалить');
   if (dishStorage.deleteValue(dishName)) {
      alert(`Блюдо ${dishName} удалено`);
   }
   else { alert('Данного блюда нет в списке') }
}

function getAllDish() {
   alert(dishStorage.getkeys())
}