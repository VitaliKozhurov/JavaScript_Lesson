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
  
   for(let i=0; i<arr.length; i++){
   const newDiv = document.createElement('div'); // Создаем DIV(блочный элемент), чтобы новые элементы создавались с новой строки
   myForm.appendChild(newDiv);

   const arrEl = arr[i]; // Для удобства i-ый элемент массива присваеваем переменной

   if('label' in arrEl){
   const newLabel = document.createElement('label'); // Создаем элемент LABEL
   newLabel.innerHTML=arrEl.label; // Содержимое тега LABEL
   newDiv.appendChild(newLabel); // Добавление тега LABEL в тег FORM
   }
   // Создание тега INPUT, для поля ввода текста
   if (arrEl.kind === 'longtext' || arrEl.kind === 'shorttext'||arrEl.kind === 'number'){
      const newInput = document.createElement('input');
      newInput.setAttribute('name', arrEl.name);  // Добавляем атрибут NAME
      newInput.setAttribute('type', 'text'); // Добавляем атрибут TYPE и значение TEXT
      newDiv.appendChild(newInput); // Добавляем элемент в DIV
    }
   // Создание тега SELECT
    if (arrEl.kind === 'combo'){
      const newSelect = document.createElement('select'); 
      newSelect.setAttribute('name', arrEl.name); // Добавляем атрибут NAME
      newDiv.appendChild(newSelect); // Добавляем элемент в DIV
      // Создание пунктов списка, тега SELECT
      for(j=0; j<arrEl.variants.length; j++){
      const newOption = document.createElement('option');
      newOption.innerHTML=arrEl.variants[j].text; // Содержимое тега OPTION
      newOption.setAttribute('value', arrEl.variants[j].value); // Добавляем атрибут VALUE
      newSelect.appendChild(newOption);
      }
    }
    // Создание радиокнопок
    if (arrEl.kind === 'radio'){
      for(k=0; k<arrEl.variants.length; k++){
      const newRadio = document.createElement('input'); // Создаем тег INPUT
      newRadio.setAttribute('value', arrEl.variants[k].value); // Добавляем атрибут VALUE
      newRadio.setAttribute('type', 'radio'); // Добавляем атрибут TYPE = RADIO
      newDiv.appendChild(newRadio);
      const newSpan = document.createElement('span'); // Создаем тег SPAN
      newSpan.innerHTML=arrEl.variants[k].text; // Содержимое тега SPAN
      newDiv.appendChild(newSpan)
      }
    }
    // Создание CHEKBOX
    if (arrEl.kind === 'check'){
      const newCheck = document.createElement('input'); // Создаем тег INPUT
      newCheck.setAttribute('type', 'checkbox'); // Добавляем атрибут TYPE = checkbox
      newCheck.setAttribute('name', arrEl.name); // Добавляем атрибут NAME
      newCheck.setAttribute('checked', ''); // Добавляем атрибут checked (чекбокс выбран)
      newDiv.appendChild(newCheck);
    }
    // Создание тега TEXTAREA
    if (arrEl.kind === 'memo'){
      const newText = document.createElement('textarea');
      newText.setAttribute('name', arrEl.name); // Добавляем атрибут NAME
      const divText = document.createElement('div');
      newDiv.appendChild(divText);
      divText.appendChild(newText);
    }

    if (arrEl.kind === 'submit'){
      // Создание кнопок подтверждения
   const newSubmit = document.createElement('input');
   newSubmit.setAttribute('type', arrEl.kind); // Добавляем атрибут TYPE = SUBMIT
   newSubmit.setAttribute('value', arrEl.caption); // Добавляем атрибут VALUE и его значение
   myForm.appendChild(newSubmit)
    }
   }
}

const btn1 = document.getElementById('form1');
const btn2 = document.getElementById('form2');
btn1.addEventListener('click', createForm.bind(this, formDef1));
btn2.addEventListener('click', createForm.bind(this, formDef2));

