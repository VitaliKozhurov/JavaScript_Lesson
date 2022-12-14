function result() {
   // В переменную заносим значение из поля ввода
   let str = document.getElementById('input_expr').value;
   // Если нажать кнопку расчета значения при пустой строке, то выводим информационное сообщение
   if (str === '') {
      return document.getElementById('show_result').innerHTML = 'Ошибка, введите математическое выражение в поле ввода'
   }
   // Разбиваем принятую от пользователя строку  на массив (целые числа, дробные, операторы)
   const sortStr = str.match(/\d+(?:\.\d+)?|[+*\/-]|[\(\)]/g);
   // Создаем объект, где ключами будут являться операторы, а значение свойств это приоритет операторов
   const symbalObj = {
      '(': 1,
      '+': 2,
      '-': 2,
      '*': 3,
      '/': 3,
   }

   // Создаем массив для проверок
   const symbal = ['+', '-', '*', '/', '(', ')'];

   // Массив для конвертации в ОПЗ
   const newArr = []
   for (i = 0; i < sortStr.length; i++) {
      if (sortStr[i] === '-') {
         if (i === 0 || sortStr[i - 1] === '(') {
            newArr.push(0);
            newArr.push(sortStr[i])
         } else if (sortStr[i - 1] === '*') {
            newArr.push(-1)
            newArr.push('*')
         } else if (sortStr[i - 1] === '/') {
            newArr.push(-1)
            newArr.push('/')
         } else if (sortStr[i - 1] === '-') {
            newArr.push('*')
            newArr.push(-1)
         } else if (sortStr[i - 1] === '+') {
            newArr.push('*')
            newArr.push(-1)
         }
         else newArr.push(sortStr[i])
      } else newArr.push(sortStr[i])
   }
   // Описываем функцию, которая конвертирует массив в обратную польскую запись
   function calculate(expr) {
      const stack = [];
      const arr = []
      for (i = 0; i < expr.length; i++) {
         if (!isNaN(expr[i])) {
            arr.push(expr[i])
         }
         if (expr[i] === '+' || expr[i] === '-' || expr[i] === '*' || expr[i] === '/') {
            if (stack.length === 0 || symbalObj[expr[i]] > symbalObj[stack[stack.length - 1]]) {
               stack.push(expr[i])
            }
            else if (stack.length !== 0) {
               while (symbalObj[stack[stack.length - 1]] >= symbalObj[expr[i]]) {
                  arr.push(stack.pop())
               }
               if (!isNaN(expr[i])) {
                  arr.push(expr[i])
               }
               if (stack.length === 0 || symbalObj[expr[i]] > symbalObj[stack[stack.length - 1]]) {
                  stack.push(expr[i])
               }
            }
         }
         if (expr[i] === '(') {
            stack.push(expr[i])
         }
         else if (expr[i] === ')') {
            while (stack[stack.length - 1] !== '(') {
               arr.push(stack.pop())
            }
            if (stack[stack.length - 1] === '(') {
               stack.pop()
            }
         }
      }
      return arr.concat(stack.reverse())

   }
   // Описываем алгоритм по которому будут вычисляться элементы из массива
   const arrRes = calculate(newArr);
   console.log(arrRes)
   const arrOfStack = [];
   for (i = 0; i < arrRes.length; i++) {
      if (!symbal.includes(arrRes[i])) {
         arrOfStack.push(arrRes[i])
      } else {
         let y = +arrOfStack.pop();
         let x = +arrOfStack.pop();
         switch (arrRes[i]) {
            case "+":
               let sum = x + y;
               arrOfStack.push(sum)
               break;
            case "-":
               let sub = x - y;
               arrOfStack.push(sub)
               break;
            case "*":
               let mult = x * y;
               arrOfStack.push(mult)
               break;
            case "/":
               let division = x / y;
               if (y === 0) {
                  return document.getElementById('show_result').innerHTML = 'Произошла ошибка, на ноль делить нельзя'
               }
               arrOfStack.push(division)
               break;
         }
      }
   }
   // Возвращаем рультат вычислений в див, в котором информация будет выводиться пользователю
   return document.getElementById('show_result').innerHTML = arrOfStack[0]
}
// Описываем событие нажатия на кнопу, при нажатии на кнопку будет вызываться функция, которая возвращает результат выражения
const btn = document.getElementById('btn_calc')
btn.addEventListener('click', result)