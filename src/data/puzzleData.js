export const puzzleData = {
    python: [
      {
        id: 'py1',
        title: 'Функция приветствия',
        lines: [
          'def greet(name):',
          '    print(f"Hello, {name}!")',
          'greet("World")'
        ],
        xp: 5,
        difficulty: 'Easy'
      },
      {
        id: 'py2',
        title: 'Сумма списка',
        lines: [
          'def sum_list(lst):',
          'total = 0',
          'for num in lst:',
          '    total += num',
          'return total'
        ],
        xp: 5,
        difficulty: 'Easy'
      },
      {
        id: 'py3',
      title: 'Подсчёт гласных',
      lines: [
        'def count_vowels(s):',
        "    count = 0",
        "    for ch in s:",
        "        if ch.lower() in 'aeiou':",
        '            count += 1',
        '    return count'
      ],
        xp: 10,
        difficulty: 'Medium'
      },
      {
        id: 'py4',
        title: 'Фильтрация чётных',
        lines: [
        'def filter_even(nums):',
        '    result = []',
        '    for n in nums:',
        '        if n % 2 == 0:',
        '            result.append(n)',
        '    return result'
        ],
        xp: 10,
        difficulty: 'Medium'
      },
      {
        id: 'py5',
        title: 'Фибоначчи (итеративно)',
        lines: [
          'def fib(n):',
          'a, b = 0, 1',
          'for _ in range(2, n):',
          'a, b = b, a + b',
          'return a'
        ],
        xp: 15,
        difficulty: 'Hard'
      },
      {
        id: 'py6',
        title: 'Факториал (рекурсивно)',
        lines: [
          'def factorial(n):',
          'if n <= 1:',
          '    return 1',
          'return n * factorial(n - 1)'
        ],
        xp: 15,
        difficulty: 'Hard'
      }
    ],

    javascript: [
        
        {
          id: 'js1',
          title: 'Квадрат числа',
          lines: [
            'function square(n) {',
            '  return n * n;',
            '}',
            'console.log(square(5));'
          ],
          xp: 5,
          difficulty: 'Easy'
        },
        {
          id: 'js2',
          title: 'Уникальные элементы массива',
          lines: [
            'function unique(arr) {',
            '  return [...new Set(arr)];',
            '}',
            'console.log(unique([1,2,2,3]));'
          ],
          xp: 5,
          difficulty: 'Easy'
        },
    
        {
          id: 'js3',
          title: 'Проверка палиндрома',
          lines: [
            'function isPalindrome(str) {',
            "  const reversed = str.split('').reverse().join('');",
            '  return str === reversed;',
            '}'
          ],
          xp: 10,
          difficulty: 'Medium'
        },
        {
          id: 'js4',
          title: 'Сумма значений объекта',
          lines: [
            'function sumValues(obj) {',
            '  return Object.values(obj).reduce((acc, val) => acc + val, 0);',
            '}',
            'console.log(sumValues({a:1,b:2,c:3}));'
          ],
          xp: 10,
          difficulty: 'Medium'
        },
    
        {
          id: 'js5',
          title: 'Бинарный поиск',
          lines: [
            'function binarySearch(arr, target) {',
            '  let left = 0, right = arr.length - 1;',
            '  while (left <= right) {',
            '    const mid = Math.floor((left + right) / 2);',
            '    if (arr[mid] === target) return mid;',
            '    else if (arr[mid] < target) left = mid + 1;',
            '    else right = mid - 1;',
            '  }',
            '  return -1;',
            '}'
          ],
          xp: 15,
          difficulty: 'Hard'
        },
        {
          id: 'js6',
          title: 'Слияние двух отсортированных массивов',
          lines: [
            'function mergeSorted(a, b) {',
            '  const result = [];',
            '  let i = 0, j = 0;',
            '  while (i < a.length && j < b.length) {',
            '    if (a[i] < b[j]) result.push(a[i++]);',
            '    else result.push(b[j++]);',
            '  }',
            '  while (i < a.length) result.push(a[i++]);',
            '  while (j < b.length) result.push(b[j++]);',
            '  return result;',
            '}'
          ],
          xp: 15,
          difficulty: 'Hard'
        }
      ],

      cpp: [
        
        {
          id: 'cpp1',
          title: 'Swap Two Integers',
          lines: [
            'void swapInts(int &a, int &b) {',
            '    int temp = a;',
            '    a = b;',
            '    b = temp;',
            '}'
          ],
          xp: 5,
          difficulty: 'Easy'
        },
        {
          id: 'cpp2',
          title: 'Find Maximum in Vector',
          lines: [
            'int findMax(const std::vector<int>& v) {',
            '    int maxVal = v[0];',
            '    for (int num : v) {',
            '        if (num > maxVal) {',
            '            maxVal = num;',
            '        }',
            '    }',
            '    return maxVal;',
            '}'
          ],
          xp: 5,
          difficulty: 'Easy'
        },
    
        {
          id: 'cpp3',
          title: 'Prime Number Check',
          lines: [
            'bool isPrime(int n) {',
            '    if (n < 2) return false;',
            '    for (int i = 2; i <= n / 2; ++i) {',
            '        if (n % i == 0) return false;',
            '    }',
            '    return true;',
            '}'
          ],
          xp: 10,
          difficulty: 'Medium'
        },
        {
          id: 'cpp4',
          title: 'Reverse a String',
          lines: [
            'string reverseStr(const string &s) {',
            '    string rev = s;',
            '    std::reverse(rev.begin(), rev.end());',
            '    return rev;',
            '}'
          ],
          xp: 10,
          difficulty: 'Medium'
        },
    
        // ===== Hard (15 XP) =====
        {
          id: 'cpp5',
          title: 'Binary Search',
          lines: [
            'int binarySearch(const vector<int>& arr, int target) {',
            '    int left = 0, right = arr.size() - 1;',
            '    while (left <= right) {',
            '        int mid = left + (right - left) / 2;',
            '        if (arr[mid] == target) return mid;',
            '        if (arr[mid] < target) left = mid + 1;',
            '        else right = mid - 1;',
            '    }',
            '    return -1;',
            '}'
          ],
          xp: 15,
          difficulty: 'Hard'
        },
        {
          id: 'cpp6',
          title: 'Merge Two Sorted Vectors',
          lines: [
            'vector<int> mergeSorted(const vector<int>& a, const vector<int>& b) {',
            '    std::vector<int> result;',
            '    int i = 0, j = 0;',
            '    while (i < a.size() && j < b.size()) {',
            '        if (a[i] < b[j]) result.push_back(a[i++]);',
            '        else result.push_back(b[j++]);',
            '    }',
            '    while (i < a.size()) result.push_back(a[i++]);',
            '    while (j < b.size()) result.push_back(b[j++]);',
            '    return result;',
            '}'
          ],
          xp: 15,
          difficulty: 'Hard'
        }
      ]
  };