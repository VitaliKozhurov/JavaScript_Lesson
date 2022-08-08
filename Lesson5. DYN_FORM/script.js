const formDef1=
[
  {label:'Название сайта:',kind:'longtext',name:'sitename'},
  {label:'URL сайта:',kind:'longtext',name:'siteurl'},
  {label:'Посетителей в сутки:',kind:'number',name:'visitors'},
  {label:'E-mail для связи:',kind:'shorttext',name:'email'},
  {label:'Рубрика каталога:',kind:'combo',name:'division',
    variants:[{text:'здоровье',value:1},{text:'домашний уют',value:2},{text:'бытовая техника',value:3}]},
  {label:'Размещение:',kind:'radio',name:'payment',
    variants:[{text:'бесплатное',value:1},{text:'платное',value:2},{text:'VIP',value:3}]},
  {label:'Разрешить отзывы:',kind:'check',name:'votes'},
  {label:'Описание сайта:',kind:'memo',name:'description'},
  {caption:'Опубликовать',kind:'submit'},
]

const formDef2=
[
  {label:'Фамилия:',kind:'longtext',name:'lastname'},
  {label:'Имя:',kind:'longtext',name:'firstname'},
  {label:'Отчество:',kind:'longtext',name:'secondname'},
  {label:'Возраст:',kind:'number',name:'age'},
  {caption:'Зарегистрироваться',kind:'submit'},
];

const createForm =  function(arr){
   const myBody = document.body
   const myScript = document.getElementsByTagName('script')[0];
   const myForm = document.createElement('form'); // Создаем элемент FORM
   myForm.style.margin = 30+'px';
   myForm.setAttribute('action', 'https://fe.it-academy.by/TestForm.php'); // Установка атрибута тегу FORM
   myBody.insertBefore(myForm, myScript); // Добавление формы перед тегом SCRIPT
   const key1 = 'label';
   const key2 = 'kind';
   const key3 = 'name';
   const key4 = 'variants';
   const key5 = 'text';
   const key6 = 'value';
   const key7 = 'caption';
   for(let i=0; i<arr.length-1; i++){
   const newDiv = document.createElement('div'); // Создаем DIV(блочный элемент), чтобы новые элементы создавались с новой строки
   myForm.appendChild(newDiv);

   const newLabel = document.createElement('label'); // Создаем элемент LABEL
   newLabel.innerHTML=arr[i][key1]; // Содержимое тега LABEL
   newDiv.appendChild(newLabel); // Добавление тега LABEL в тег FORM

   // Создание тега INPUT, для поля ввода текста
   if (arr[i][key2] === 'longtext' || arr[i][key2] === 'shorttext'||arr[i][key2] === 'number'){
      const newInput = document.createElement('input'); 
      newInput.setAttribute(key3, arr[i][key3]);  // Добавляем атрибут NAME
      newInput.setAttribute('type', 'text'); // Добавляем атрибут TYPE и значение TEXT
      newDiv.appendChild(newInput); // Добавляем элемент в DIV
    }
   // Создание тега SELECT
    if (arr[i][key2] === 'combo'){
      const newSelect = document.createElement('select'); 
      newSelect.setAttribute(key3, arr[i][key3]); // Добавляем атрибут NAME
      newDiv.appendChild(newSelect); // Добавляем элемент в DIV
      // Создание пунктов списка, тега SELECT
      for(j=0; j<arr[i][key4].length; j++){
      const newOption = document.createElement('option');
      newOption.innerHTML=arr[i][key4][j][key5]; // Содержимое тега OPTION
      newOption.setAttribute(key6, arr[i][key4][j][key6]); // Добавляем атрибут VALUE
      newSelect.appendChild(newOption);
      }
    }
    // Создание радиокнопок
    if (arr[i][key2] === 'radio'){
      for(k=0; k<arr[i][key4].length; k++){
      const newRadio = document.createElement('input'); // Создаем тег INPUT
      newRadio.setAttribute(key6, arr[i][key4][k][key6]); // Добавляем атрибут VALUE
      newRadio.setAttribute('type', 'radio'); // Добавляем атрибут TYPE = RADIO
      newDiv.appendChild(newRadio);
      const newSpan = document.createElement('span'); // Создаем тег SPAN
      newSpan.innerHTML=arr[i][key4][k][key5]; // Содержимое тега SPAN
      newDiv.appendChild(newSpan)
      }
    }
    // Создание CHEKBOX
    if (arr[i][key2] === 'check'){
      const newCheck = document.createElement('input'); // Создаем тег INPUT
      newCheck.setAttribute('type', 'checkbox'); // Добавляем атрибут TYPE = checkbox
      newCheck.setAttribute(key3, arr[i][key3]); // Добавляем атрибут NAME
      newCheck.setAttribute('checked', ''); // Добавляем атрибут checked (чекбокс выбран)
      newDiv.appendChild(newCheck);
    }
    // Создание тега TEXTAREA
    if (arr[i][key2] === 'memo'){
      const newText = document.createElement('textarea');
      newText.setAttribute(key3, arr[i][key3]); // Добавляем атрибут NAME
      const divText = document.createElement('div');
      newDiv.appendChild(divText);
      divText.appendChild(newText);
    }
   }
   // Создание кнопок подтверждения
   const newSubmit = document.createElement('input');
   newSubmit.setAttribute('type', arr[arr.length-1][key2]); // Добавляем атрибут TYPE = SUBMIT
   newSubmit.setAttribute(key6, arr[arr.length-1][key7]); // Добавляем атрибут VALUE и его значение
   myForm.appendChild(newSubmit)
}

const btn1 = document.getElementById('form1');
const btn2 = document.getElementById('form2');
btn1.addEventListener('click', createForm.bind(this, formDef1));
btn2.addEventListener('click', createForm.bind(this, formDef2));

