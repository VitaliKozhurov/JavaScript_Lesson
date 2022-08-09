function deepComp (value1, value2){
   // Записываем условие сравнения если аргументы принимают значение NaN (так, как NaN ничему не равен)
   if(Number.isNaN(value1)&&Number.isNaN(value2)){
      return true
   }
   
   // Записываем условие сравнения для примитивных типов данных
   if(value1===null||typeof value1 !== 'object'||value2===null||typeof value2 !== 'object'){
      return value1 === value2
   }
   // Выполняется проверка на принадлежность к массиву и объекту
   if (Object.prototype.toString.call(value1) !== Object.prototype.toString.call(value2)) {
      return false
   }
   
   // Записываем условие сравнения случае если аргументы являются массивами
   if (value1 instanceof Array && value2 instanceof Array){
   // Если длинны массивов не равны, то возвращаем FALSE
      if(value1.length !== value2.length){
         return false
      }
      for (let i = 0; i < value1.length; i++) {
         // Сравнение элементов массива
         if (!deepComp(value1[i], value2[i])) {
            return false
         }
   }
   return true
   }
   
   // Записываем условие сравнения случае если аргументы являются объектами (или один из аргументов массив)
   if (value1 instanceof Object && value2 instanceof Object){
      // Проверка на колличество свойств в объектах
      if (Object.keys(value1).length !== Object.keys(value2).length){
         return false
      }
      // Проверка на совпадение ключей в объектах
      for(let key in value1){
         if (!(key in value2)){
            return false
         }
      // Сравнение элементов объекта
         if (!deepComp(value1[key], value2[key])) {
            return false
      }
      }
      return true
   }
   }
   
   function myTest(){
   var H1={ a:5, b: { b1:6, b2:7 } };
   var H2={ b: { b1:6, b2:7 }, a:5 };
   var H3={ a:5, b: { b1:6 } };
   var H4={ a:5, b: { b1:66, b2:7 } };
   var H5={ a:5, b: { b1:6, b2:7, b3:8 } };
   var H6={ a:null, b:undefined, c:Number.NaN };
   var H7={ c:Number.NaN, b:undefined, a:null };
   var H8={a:5,b:6};
   var H9={c:5,d:6};
   var H10={a:5};
   var A1=[5,7];
   var A2=[5,5,7];
   var A3=[5,8,7];
   
   const testObj = [
      {id: 'Тест №1', firstEl: H1, secondEl: H2, res: true},
      {id: 'Тест №2', firstEl: H1, secondEl: H3, res: false},
      {id: 'Тест №3', firstEl: H1, secondEl: H4, res: false},
      {id: 'Тест №4', firstEl: H1, secondEl: H5, res: false},
      {id: 'Тест №5', firstEl: H6, secondEl: H7, res: true},
      {id: 'Тест №6', firstEl: H8, secondEl: H9, res: false},
      {id: 'Тест №7', firstEl: H8, secondEl: H10, res: false},
      {id: 'Тест №8', firstEl: null, secondEl: H10, res: false},
      {id: 'Тест №9', firstEl: H10, secondEl: null, res: false},
      {id: 'Тест №10', firstEl: null, secondEl: null, res: true},
      {id: 'Тест №11', firstEl: null, secondEl: undefined, res: false},
      {id: 'Тест №12', firstEl: 5, secondEl: '5', res: false},
      {id: 'Тест №13', firstEl: A1, secondEl: H1, res: false},
      {id: 'Тест №14', firstEl: A2, secondEl: A3, res: false},
      {id: 'Тест №15', firstEl: { a: 5, b: undefined }, secondEl: { a: 5, c: undefined }, res: false},
      {id: 'Тест №16', firstEl: [5, 7], secondEl:{ 0: 5, 1: 7 }, res: false},
      {id: 'Тест №17', firstEl: [5, 7], secondEl:{ 0: 5, 1: 7, length: 2 }, res: false},
      {id: 'Тест №18', firstEl: "aaa", secondEl:"bbb", res: false},
      {id: 'Тест №19', firstEl: Number.NaN, secondEl:Number.NaN, res: true}
   ]
   for (i = 0; i< testObj.length; i++){
      console.log(`${testObj[i].id}`)
   if (deepComp(testObj[i].firstEl, testObj[i].secondEl) === testObj[i].res){
       console.log(`Тест выполнен успешно, результат сравнения равен: ${deepComp(testObj[i].firstEl, testObj[i].secondEl)}
       `)
   } else console.log(`Тест не пройден
   `)
   }
   }
   
   myTest()