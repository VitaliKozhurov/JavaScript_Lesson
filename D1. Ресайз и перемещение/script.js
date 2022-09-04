// Находим элемент, размер которого будем изменять
const elem = document.getElementById('elem');
// Находим все элементы, которыми можно изменять размер картинки
const resize = document.querySelectorAll('.resize')

// Переменная, которая будет определять какую функцию вызывать (либо для ресайза изображения либо для перемещения)
let isResize = false;

elem.addEventListener('mouseenter', showCursor);
function showCursor(eo) {
   eo = eo || window.Event;
   eo.preventDefault();
   elem.style.cursor = 'move';
}

// Пройдем по всем элемнтам циклом и повесим слушатель mausedown
for (let i = 0; i < resize.length; i++) {
   let currentResizer = resize[i];
   currentResizer.addEventListener('mousedown', startResize);
   currentResizer.addEventListener('mouseenter', resizeCursor);

   function resizeCursor(eo) {
      eo = eo || window.Event;
      if (currentResizer.classList.contains('mid_top') || currentResizer.classList.contains('mid_bottom')) {
         currentResizer.style.cursor = 'ns-resize';
      }
      else if (currentResizer.classList.contains('mid_left') || currentResizer.classList.contains('mid_right')) {
         currentResizer.style.cursor = 'ew-resize';
      }
      else if (currentResizer.classList.contains('left_top') || currentResizer.classList.contains('right_bottom')) {
         currentResizer.style.cursor = 'nwse-resize';
      }
      else if (currentResizer.classList.contains('right_top') || currentResizer.classList.contains('left_bottom')) {
         currentResizer.style.cursor = 'nesw-resize';
      }
   }

   // Переменные, которые будут хранить информацию о координатах мыши в момент события mousedown
   let currMousePosX
   let currMousePosY
   // Переменная , которая будет хранить координаты картинки в момент события mousedown
   let elemInfo

   function startResize(eo) {
      eo = eo || window.Event;
      // Присваеваем значение переменных ИМЕННО в момент события mousedown, от этого значения будут отталкиваться дальнейшие вычисления
      isResize = true;
      elemInfo = elem.getBoundingClientRect();
      currMousePosX = eo.pageX;
      currMousePosY = eo.pageY;
      // Отключаем умолчательное поведение браузера
      eo.preventDefault();
      // Вешаем обработчики событий на document
      document.addEventListener('mousemove', resize);
      document.addEventListener('mouseup', endResize);

      function resize(eo) {
         eo.preventDefault();
         // Переменная, которая буде описывать изменение ширины картинки при ресайзе с левой стороны
         let widthForLeft = elemInfo.width + currMousePosX - eo.clientX;
         // Переменная, которая буде описывать изменение ширины картинки при ресайзе с правой стороны
         let widthForRight = elemInfo.width + eo.clientX - currMousePosX;
         // Переменная, которая буде описывать изменение высоты картинки при ресайзе сверху вниз
         let heightForTop = elemInfo.height - eo.clientY + currMousePosY;
         // Переменная, которая буде описывать изменение высоты картинки при ресайзе снизу вверх
         let heightForBottom = elemInfo.height + eo.clientY - currMousePosY;
         // Описываем работу правого управляющего элемента
         if (currentResizer.classList.contains('mid_right')) {
            elem.style.width = widthForRight + 'px';
         }
         // Описываем работу левого управляющего элемента
         else if (currentResizer.classList.contains('mid_left')) {
            // Вводим ограничение, до какого значения можно изменять ширину и положение картинки, если этого не сделать, то при достижении минимальной ширины картинка будет двигаться влево
            if (widthForLeft > currentResizer.clientWidth) {
               elem.style.width = widthForLeft + 'px';
               // Уменьшать ширину картинки можно только справа налево, но чтобы выглядело как слева направо, необходимо одновременно изменять положение картинки (двигать картинку вправо)
               elem.style.left = elemInfo.left + eo.clientX - currMousePosX + 'px';
            }
         }
         // Описываем работу нижнего управляющего элемента
         else if (currentResizer.classList.contains('mid_bottom')) {
            elem.style.height = heightForBottom + 'px';
         }
         // Описываем работу верхнего управляющего элемента
         else if (currentResizer.classList.contains('mid_top')) {
            if (heightForTop > currentResizer.clientHeight) {
               elem.style.height = heightForTop + 'px';
               // При ресайзе  сверху вниз также необходимо изменять положение картинки, двигать вниз
               elem.style.top = elemInfo.top + eo.clientY - currMousePosY + 'px';
            }
         }
         // Описываем поведение при ресайзе с правого нижнего угла
         else if (currentResizer.classList.contains('right_bottom')) {
            // Для того чтобы изменение размера происходило пропорционально необходимо изменять высоту и ширину на одинаковую величину
            elem.style.height = elemInfo.height + eo.clientY - currMousePosY + 'px';
            elem.style.width = elemInfo.width + eo.clientY - currMousePosY + 'px';
         }
         // Описываем поведение при ресайзе с левого нижнего угла
         else if (currentResizer.classList.contains('left_bottom')) {
            // Вводим ограничение по изменению размера и положения элемента
            if (widthForLeft > currentResizer.clientWidth) {
               elem.style.height = elemInfo.height - eo.clientX + currMousePosX + 'px';
               elem.style.width = widthForLeft + 'px';
               elem.style.left = elemInfo.left + eo.clientX - currMousePosX + 'px';
            }
         }
         // Описываем поведение при ресайзе с левого верхнего угла
         else if (currentResizer.classList.contains('left_top')) {
            // Вводим ограничение по изменению размера и положения элемента
            if ((widthForLeft > currentResizer.clientWidth) && (elemInfo.height - eo.clientX + currMousePosX > currentResizer.clientWidth)) {
               // При ресайзе с левого верхнего угла необходимо учитывать сразу 4 параметра(изменение ширины, высоты, положение по верикали и горизонтали)
               elem.style.height = elemInfo.height - eo.clientX + currMousePosX + 'px';
               elem.style.width = widthForLeft + 'px';
               elem.style.left = elemInfo.left + eo.clientX - currMousePosX + 'px';
               elem.style.top = elemInfo.top + eo.clientX - currMousePosX + 'px';
            }
         }
         // Описываем поведение при ресайзе с правог верхнего угла
         else if (currentResizer.classList.contains('right_top')) {
            // Вводим ограничение по изменению размера и положения элемента
            if ((widthForRight > currentResizer.clientWidth) && (elemInfo.height + eo.clientX - currMousePosX > currentResizer.clientWidth)) {
               // При ресайзе с правого верхнего угла необходимо учитывать 3 параметра(изменение ширины, высоты, положение по верикали)
               elem.style.width = widthForRight + 'px';
               elem.style.height = elemInfo.height + eo.clientX - currMousePosX + 'px';
               elem.style.top = elemInfo.top - eo.clientX + currMousePosX + 'px';
            }
         }
      }
      function endResize(eo) {
         eo.preventDefault();
         isResize = false;
         document.removeEventListener('mousemove', resize);
         document.removeEventListener('mouseup', endResize);
      }

   }
}


// На картинку вешаем обработчик при возникновении события mousedown
elem.addEventListener('mousedown', startRemove)
function startRemove(eo) {
   eo = eo || window.Event;
   eo.preventDefault();
   if (!isResize) {
      // Вешаем обработчики на объект document (они будут перемещать нашу картинку)
      document.addEventListener('mousemove', remove);
      elem.addEventListener('mouseup', endRemove);
      // Определяем разницу между точкой касания мыши и началом картинки (по оси X и Y)
      let difX = eo.pageX - elem.offsetLeft;
      let difY = eo.pageY - elem.offsetTop;


      function remove(eo) {
         eo.preventDefault();
         elem.style.left = eo.pageX - difX + 'px';
         elem.style.top = eo.pageY - difY + 'px';
      }

      function endRemove(eo) {
         eo.preventDefault();
         document.removeEventListener('mousemove', remove);
         elem.removeEventListener('mouseup', endRemove);
      }
   }

}
