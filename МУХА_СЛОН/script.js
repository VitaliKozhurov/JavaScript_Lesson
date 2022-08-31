const searchWordString = (firstWord, lastWord) => {
   const wordList = ["ЛУЖА", "МУЗА", "ЛИРА", "МЕХА", "ЛИГА", "ТАРА", "ЛИПА", "ТУРА", "ПАРК", "ЛОЖЬ", "ЛУПА", "ПЛОТ", "МУРА", "ПАУК", "ПАУТ", "ПЛУТ", "ЛОЖА", "СЛОТ", "ПАРА"];
   // Функция, которая будет находить очередные слова из словаря которые будут отличаться на одну букву от исходного
   const findNeighbors = (word, wordSet) => {
      const result = [];
      const startLetterCode = 1040; // Код первого символа алфавита (символ с большой буквы)
      // Запускаем цикл по буквам слова, вместо каждой буквы поочереди подставляем все буквы алфавита, тем самым получаем новое слово и затем проверяем есть ли новое слово в словаре, если есть, то добавляем его в массив. Эти слова будут являться соседями исходного слова.
      for (let i = 0; i < word.length; i++) {
         const firstHalf = word.substring(0, i);
         const lastHalf = word.substring(i + 1);
         for (let j = 0; j < 32; j++) {
            const newWord = firstHalf + String.fromCharCode(startLetterCode + j) + lastHalf;
            if (wordSet.has(newWord)) {
               result.push(newWord);
            }
         }
      }
      return result;
   }

   // Добавляем последнее слово в массив слов, чтобы в конце можно было проверить будет ли являться соседнее слово искомым
   wordList.push(lastWord)
   // Преобразовываем массив в коллекцию, в дальнейшем с ней будет проще работать
   const wordSet = new Set(wordList);
   // Создаем массив, который будет являться очередью, первый символ здесь будет первым словом
   const queue = [firstWord];
   // Создаем коллекцию  в которую будем добавлять соседние слова
   const resultStr = new Set();
   while (queue.length > 0) {
      const word = queue.shift(); //Извлекаем первое слово из очереди
      // Добавляем это слово в коллекцию
      resultStr.add(word)
      // Для этого слова мы хотим найти всех соседей, удовлетворяющих условию задачи
      const neighbors = findNeighbors(word, wordSet);
      // Если для этого слова соседей нет (значит оно тупиковое), то мы удаляем его из коллекции
      if (neighbors.length === 0) {
         resultStr.delete(word)
      }
      // Циклом проходимся по соседним словам
      for (let i = 0; i < neighbors.length; i++) {
         // Есди соседнее слово равно последнему, то значит мы дошли до самого короткого решения
         if (neighbors[i] === lastWord) {
            resultStr.add(neighbors[i])
            return Array.from(resultStr).join('-');
         }
         // Если соседнее слово не равно  последнему, то добавляем его в очередь для дальнейших проверок и удаляем из исходной коллекции, чтобы при новом поиске соседей не добавлять это слово еще раз.
         queue.push(neighbors[i])
         wordSet.delete(neighbors[i])
      }
   }
   return 'Цепочку слов составить нельзя'
}

console.log(searchWordString('ЛИСА', 'ЛОСЬ'))
console.log(searchWordString('МУХА', 'СЛОН'))