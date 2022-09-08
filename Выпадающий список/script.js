var menu = [
   {
      name: 'Пункт 1', submenu:
         [
            {
               name: 'Пункт 1.1', submenu:
                  [
                     { name: 'Пункт 1.1.1', url: 'http://www.tut.by' },
                     { name: 'Пункт 1.1.2 длинный', url: 'http://www.tut.by' }
                  ]
            },
            { name: 'Пункт 1.2', url: 'http://www.tut.by' },
            {
               name: 'Пункт 1.3 длинный', submenu:
                  [
                     { name: 'Пункт 1.3.1', url: 'http://www.tut.by' },
                     { name: 'Пункт 1.3.2', url: 'http://www.tut.by' },
                     { name: 'Пункт 1.3.3', url: 'http://www.tut.by' },
                     { name: 'Пункт 1.3.4 длинный', url: 'http://www.tut.by' }
                  ]
            }
         ]
   },
   { name: 'Пункт 2 длинный', url: 'http://www.tut.by' },
   {
      name: 'Пункт 3', submenu:
         [
            { name: 'Пункт 3.1 длинный', url: 'http://www.tut.by' },
            { name: 'Пункт 3.2', url: 'http://www.tut.by' }
         ]
   }
];

// Описываем функцию построения списка
function createMenu(menu, elem) {

   // Сначала построим дерево DOM элементов , для этого отдельная функция, аргументами функции является исходный массив и элемент (место) куда будет добавляться список
   function createDom(menu, elem) {
      // Создаем список корневой 'ul', в него в дальнейшем будем добавлять элементы меню
      let ul = document.createElement('ul');
      // Сам список добавляем в элемент DOM (будем добавлять в body)
      elem.appendChild(ul);
      // В зависимости от того в каком месте будем размещать список определяем ему стилевой класс (если это список первого уровня, то он отображается на странице, другие списки скрываем)
      if (ul.parentElement === document.body) {
         ul.classList.add('ul')
      } else {
         ul.classList.add('hidden');
      }

      // Проходим циклом по массиву
      for (let i = 0; i < menu.length; i++) {
         // Создаем элемент списка 'li'
         let menuItem = document.createElement('li');
         // Добавляем стилевой класс к элементам списка
         menuItem.classList.add('item');
         // Сначала проверим самое простое условие, если элемент массива не содержит подмассивов (каждый элемент массива это объект и если в объекте есть свойство  с ключом submenu, то значением этого свойства является массив)
         if (!menu[i].submenu) {
            // Создаем ссылку 'a'
            let menuLink = document.createElement('a');
            // Добавляем текстовое содержимое для ссылки
            menuLink.innerText = menu[i].name;
            // Добавляем атрибут для ссылки, адрес куда ведет ссылка
            menuLink.setAttribute('href', menu[i].url);
            // Добавляем в тег 'li' тег 'a'
            menuItem.appendChild(menuLink);
            // В список добавляем элемент списка, который внутри содержит ссылку
            ul.appendChild(menuItem);
         }
         // Опишсываем  случай если элемент массива содержит подмассив
         else {
            // Так как этот элемент не будет являться ссылкой, добавляем ему текстовое значение
            menuItem.innerText = menu[i].name;
            // В список добавляем элементы списка, рассчитанные при проходе массива
            ul.appendChild(menuItem);
            // Также сразу определяем стилевой класс, который будет применяться к элементу списка, в зависимости от его элемента UL в который добавили элемент li
            if (ul.classList.contains('ul')) {
               menuItem.classList.add('submenu');
            } else menuItem.classList.add('submenu_right')

            // Вызываем функцию, но аргументами функции уже будут вложенный подмассив элементы которого будут добавлены в menuItem (тег li)
            createDom(menu[i].submenu, menuItem);
         }
      }
   }
   // Вызываю функцию для построения DOM элементов (menu это исходный массив, elem в данном случае это document.body)
   createDom(menu, elem)

   // Теперь необходимо определить поведение элементов при наведении мыши
   // Отлавливать события мыши будем на родительском элементе, для этого находим самый первый UL
   const rootUl = document.querySelector('.ul');
   // Вешаем на этот UL обработчик на событие мыши mouseover
   rootUl.addEventListener('mouseover', function (eo) {
      eo = eo || window.Event;
      // Вызываем функцию которая будет сворачивать подменю, которые в данный момент не нужны для просмотра
      closeElem(eo.target);
      // Описываем поведение обработчика, если элемент над которым произошло событие имеет стилевой класс ('submenu'), то его дочернему элементу присваеваем стилевой класс visible (в результате внизу появляется подменю)
      if (eo.target.classList.contains('submenu')) {
         eo.target.firstElementChild.classList.add('visible');
         // В другом случае дочернему элементу присваеваем стилевой класс visible_right, после чего подменю появляется справа
      } else if (eo.target.classList.contains('submenu_right')) {
         eo.target.firstElementChild.classList.add('visible_right');
      }
   })

   // Необходимо решить проблему с закрытием неактуальных подменю. Функция которая будет убирать незадействовванные элементы меню
   function closeElem(current) {
      // Создаем массив в который будем добавлять все родительские элементы начиная с элемента, на котором произошло событие
      let parrents = [];
      if (current) {
         // для элемента на котором произошло событие заполняем массив из предков
         let currentParent = current.parentNode;
         while (currentParent) {
            if (currentParent.classList.contains('ul') || currentParent.nodeName === 'BODY') break
            if (currentParent.nodeName === 'UL') parrents.push(currentParent);
            currentParent = currentParent.parentNode;
         }
      }

      // Определяем в каких случая необходимо закрывать подменю, для этого создаем коллекцию из всех подменю
      const subMenuList = document.querySelectorAll('ul .hidden')
      Array.from(subMenuList).forEach(el => {
         // Если подменю не содержится в массиве предков для элемента на котором произошло событие и список не равен текущему элементу, то прячем подменю
         if (el !== current && !parrents.includes(el)) {
            el.classList.remove('visible', 'visible_right')
         }
      })
   }
   // В случае если произошло событие mouseleave для корневого списка UL  то все подменю прячем
   rootUl.addEventListener('mouseleave', function (eo) {
      eo = eo || window.Event;
      const subMenuList = document.querySelectorAll('ul .hidden');
      Array.from(subMenuList).forEach(el => el.classList.remove('visible', 'visible_right')
      )
   })

}

createMenu(menu, document.body)
