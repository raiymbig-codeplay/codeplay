// src/data/trueFalseData.js
export const trueFalseData = {
    python: [
        {
          id: 'py1',
          question: 'В Python индексация в списках начинается с нуля.',
          answer: true,
          xp: 1,
          difficulty: 'Easy'
        },
        {
          id: 'py2',
          question: 'Функция `len()` возвращает длину только строк.',
          answer: false,
          xp: 1,
          difficulty: 'Easy'
        },
        {
          id: 'py3',
          question: 'В Python есть встроенная поддержка работы с указателями.',
          answer: false,
          xp: 1,
          difficulty: 'Medium'
        },
        {
          id: 'py4',
          question: 'Метод `append()` добавляет элемент в конец списка.',
          answer: true,
          xp: 1,
          difficulty: 'Easy'
        },
        {
          id: 'py5',
          question: 'Кортежи (tuples) в Python являются изменяемыми (mutable).',
          answer: false,
          xp: 1,
          difficulty: 'Easy'
        },
        {
          id: 'py6',
          question: 'f-строки (например, `f"{name}"`) поддерживают произвольные выражения внутри `{}`.',
          answer: true,
          xp: 1,
          difficulty: 'Medium'
        },
        {
          id: 'py7',
          question: 'Ключевое слово `self` в методах класса указывает на сам экземпляр объекта.',
          answer: true,
          xp: 1,
          difficulty: 'Medium'
        },
        {
          id: 'py8',
          question: 'В Python `==` и `is` делают одно и то же сравнение.',
          answer: false,
          xp: 1,
          difficulty: 'Medium'
        },
        {
          id: 'py9',
          question: 'Модуль `random` генерирует криптографически стойкие случайные числа.',
          answer: false,
          xp: 1,
          difficulty: 'Hard'
        },
        {
          id: 'py10',
          question: 'Конструкция `with open(...) as f:` автоматически закроет файл по выходу из блока.',
          answer: true,
          xp: 1,
          difficulty: 'Hard'
        }
      ],
      javascript: [
        {
          id: 'js1',
          question: 'В JavaScript `null == undefined` возвращает `true`.',
          answer: true,
          xp: 1,
          difficulty: 'Easy'
        },
        {
          id: 'js2',
          question: 'Метод `Array.prototype.map` не изменяет исходный массив.',
          answer: true,
          xp: 1,
          difficulty: 'Easy'
        },
        {
          id: 'js3',
          question: 'В JavaScript `typeof NaN === "number"` возвращает `true`.',
          answer: true,
          xp: 1,
          difficulty: 'Easy'
        },
        {
          id: 'js4',
          question: 'Оператор `===` в JS сравнивает только значения без приведения типов.',
          answer: true,
          xp: 1,
          difficulty: 'Easy'
        },
        {
          id: 'js5',
          question: 'Переменные, объявленные через `var`, имеют блочную область видимости.',
          answer: false,
          xp: 1,
          difficulty: 'Medium'
        },
        {
          id: 'js6',
          question: 'Замыкания (closures) позволяют функциям «запоминать» лексическое окружение.',
          answer: true,
          xp: 1,
          difficulty: 'Medium'
        },
        {
          id: 'js7',
          question: '`setTimeout` гарантированно выполнится ровно через указанный интервал.',
          answer: false,
          xp: 1,
          difficulty: 'Medium'
        },
        {
          id: 'js8',
          question: 'Промис, у которого не вызван ни `resolve`, ни `reject`, остаётся в состоянии pending навсегда.',
          answer: true,
          xp: 1,
          difficulty: 'Medium'
        },
    
        {
          id: 'js9',
          question: '`async/await` — это синтаксический сахар над промисами.',
          answer: true,
          xp: 1,
          difficulty: 'Hard'
        },
        {
          id: 'js10',
          question: 'Вызов `Array.prototype.sort()` без функции сравнения всегда сортирует числа по возрастанию.',
          answer: false,
          xp: 1,
          difficulty: 'Hard'
        }
      ],
      cpp: [
        {
          id: 'cpp1',
          question: 'В C++ можно передавать аргументы по значению и по ссылке.',
          answer: true,
          xp: 1,
          difficulty: 'Easy'
        },
        {
          id: 'cpp4',
          question: 'Класс std::vector позволяет динамически изменять размер массива.',
          answer: true,
          xp: 1,
          difficulty: 'Easy'
        },
        {
          id: 'cpp5',
          question: 'В C++ заголовочные файлы подключаются директивой `#import`.',
          answer: false,
          xp: 1,
          difficulty: 'Easy'
        },
        {
          id: 'cpp6',
          question: 'Оператор `::` в C++ называется “оператором области видимости”.',
          answer: true,
          xp: 1,
          difficulty: 'Easy'
        },
        {
          id: 'cpp2',
          question: 'В C++ нет деструкторов у классов.',
          answer: false,
          xp: 1,
          difficulty: 'Medium'
        },
        {
          id: 'cpp3',
          question: 'Оператор `new` в C++ возвращает сырой указатель.',
          answer: true,
          xp: 1,
          difficulty: 'Medium'
        },
        {
          id: 'cpp7',
          question: 'Цикл диапазона (`for (auto x : container)`) доступен начиная с C++11.',
          answer: true,
          xp: 1,
          difficulty: 'Medium'
        },
        {
          id: 'cpp8',
          question: 'Умный указатель `std::unique_ptr` нельзя передавать по перемещению (move).',
          answer: false,
          xp: 1,
          difficulty: 'Medium'
        },
        {
          id: 'cpp9',
          question: 'В C++ поддерживается множественное наследование от нескольких базовых классов.',
          answer: true,
          xp: 1,
          difficulty: 'Hard'
        },
        {
          id: 'cpp10',
          question: 'В C++ невозможно частично специализировать шаблон функции.',
          answer: true,
          xp: 1,
          difficulty: 'Hard'
        }
      ]
  };
  