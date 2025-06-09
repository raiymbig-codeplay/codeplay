// src/data/outputGuessQuestions.js
const questions = [
    {
      id: 1,
      lang: 'javascript',
      code: `console.log(2 + '2');`,
      options: ['22', '4', 'TypeError', 'NaN'],
      answer: '22',
      xp: 5,
    },
    {
      id: 2,
      lang: 'javascript',
      code: `console.log(true + true);`,
      options: ['2', 'truetrue', 'TypeError', 'NaN'],
      answer: '2',
      xp: 5,
    },
    {
      id: 3,
      lang: 'javascript',
      code: `let a; console.log(a + 3);`,
      options: ['3', 'undefined3', 'NaN', 'TypeError'],
      answer: 'NaN',
      xp: 5,
    },
    {
      id: 4,
      lang: 'javascript',
      code: `console.log([1,2] + [3,4]);`,
      options: ['1,23,4', '1,24', 'TypeError', 'NaN'],
      answer: '1,23,4',
      xp: 5,
    },
    {
      id: 5,
      lang: 'javascript',
      code: `console.log('5' - '2');`,
      options: ['3', '52', 'NaN', 'TypeError'],
      answer: '3',
      xp: 5,
    },
    {
      id: 6,
      lang: 'javascript',
      code: `console.log('5' * '2');`,
      options: ['10', '52', 'NaN', 'TypeError'],
      answer: '10',
      xp: 5,
    },
    {
      id: 7,
      lang: 'javascript',
      code: `console.log('5' / '2');`,
      options: ['2.5', '2', 'NaN', 'TypeError'],
      answer: '2.5',
      xp: 5,
    },
    {
      id: 8,
      lang: 'javascript',
      code: `console.log(null + 1);`,
      options: ['1', 'null1', 'NaN', 'TypeError'],
      answer: '1',
      xp: 5,
    },
    {
      id: 9,
      lang: 'javascript',
      code: `console.log(undefined + 1);`,
      options: ['NaN', 'undefined1', '1', 'TypeError'],
      answer: 'NaN',
      xp: 5,
    },
    {
      id: 10,
      lang: 'javascript',
      code: `console.log(![]);`,
      options: ['true', 'false', 'NaN', 'TypeError'],
      answer: 'false',
      xp: 5,
    },
  
    // Новое задание на Python

    {
      id: 11,
      lang: 'python',
      code: `# Python\n\na = 2\nb = 3\nprint(a + b)`,
      options: ['5', '23', 'Error', 'None'],
      answer: '5',
      xp: 5,
    },

    {
      id: 12,
      lang: 'python',
      code: `# Python\n\nprint('2' + '3')`,
      options: ['23', '5', 'Error', 'None'],
      answer: '23',
      xp: 5,
    },
    {
      id: 13,
      lang: 'python',
      code: `# Python\n\nprint('2' * 3)`,
      options: ['222', '6', 'Error', '23'],
      answer: '222',
      xp: 5,
    },
    {
      id: 14,
      lang: 'python',
      code: `# Python\n\nprint(3 * 'ab')`,
      options: ['ababab', 'ab3', 'Error', 'None'],
      answer: 'ababab',
      xp: 5,
    },
    {
      id: 15,
      lang: 'python',
      code: `# Python\n\nprint(True + False)`,
      options: ['1', 'TrueFalse', 'Error', '0'],
      answer: '1',
      xp: 5,
    },
    {
      id: 16,
      lang: 'python',
      code: `# Python\n\nprint(False and True)`,
      options: ['False', 'True', 'Error', 'None'],
      answer: 'False',
      xp: 5,
    },
    {
      id: 17,
      lang: 'python',
      code: `# Python\n\nprint(len('hello'))`,
      options: ['5', '4', 'Error', 'None'],
      answer: '5',
      xp: 5,
    },
    {
      id: 18,
      lang: 'python',
      code: `# Python\n\nprint([1,2] + [3,4])`,
      options: ['[1, 2, 3, 4]', '[1,2,3,4]', 'Error', 'None'],
      answer: '[1, 2, 3, 4]',
      xp: 5,
    },
    {
      id: 19,
      lang: 'python',
      code: `# Python\n\nprint({'x':1, 'y':2}['y'])`,
      options: ['2', 'y', 'Error', 'None'],
      answer: '2',
      xp: 5,
    },
    {
      id: 20,
      lang: 'python',
      code: `# Python\n\nprint(undefined_var)`,
      options: ['NameError', 'KeyError', 'None', '0'],
      answer: 'NameError',
      xp: 5,
    },
  
    // Новое задание на C++

    {
      id: 21,
      lang: 'cpp',
      code: `// C++\n#include <iostream>\n\nint main() {\n  int x = 2;\n  int y = 3;\n  std::cout << x + y;\n  return 0;\n}`,
      options: ['5', '23', 'Compilation error', 'NaN'],
      answer: '5',
      xp: 5,
    },
    {
      id: 22,
      lang: 'cpp',
      code: `// C++  
  #include <iostream>
  
  int main() {
    std::cout << "Hello" << "World";
    return 0;
  }`,
      options: ['HelloWorld', 'Hello World', 'Compilation error', 'NaN'],
      answer: 'HelloWorld',
      xp: 5,
    },
    {
      id: 23,
      lang: 'cpp',
      code: `// C++  
  #include <iostream>
  
  int main() {
    int a = 5;
    int b = 2;
    std::cout << a / b;
    return 0;
  }`,
      options: ['2', '2.5', 'Compilation error', 'NaN'],
      answer: '2',
      xp: 5,
    },
    {
      id: 24,
      lang: 'cpp',
      code: `// C++  
  #include <iostream>
  
  int main() {
    double a = 5.0;
    int b = 2;
    std::cout << a / b;
    return 0;
  }`,
      options: ['2.5', '2', 'Compilation error', 'NaN'],
      answer: '2.5',
      xp: 5,
    },
    {
      id: 25,
      lang: 'cpp',
      code: `// C++  
  #include <iostream>
  
  int main() {
    int a = 7;
    int b = 3;
    std::cout << a % b;
    return 0;
  }`,
      options: ['1', '2', 'Compilation error', 'NaN'],
      answer: '1',
      xp: 5,
    },
    {
      id: 26,
      lang: 'cpp',
      code: `// C++  
  #include <iostream>
  
  int main() {
    bool flag = false;
    std::cout << flag;
    return 0;
  }`,
      options: ['0', 'false', 'Compilation error', 'NaN'],
      answer: '0',
      xp: 5,
    },
    {
      id: 27,
      lang: 'cpp',
      code: `// C++  
  #include <iostream>
  
  int main() {
    char c = 'Z';
    std::cout << c;
    return 0;
  }`,
      options: ['Z', '\'Z\'', 'Compilation error', 'NaN'],
      answer: 'Z',
      xp: 5,
    },
    {
      id: 28,
      lang: 'cpp',
      code: `// C++  
  #include <iostream>
  
  int main() {
    int x = 1;
    std::cout << (x << 3);
    return 0;
  }`,
      options: ['8', '4', 'Compilation error', 'NaN'],
      answer: '8',
      xp: 5,
    },
    {
      id: 29,
      lang: 'cpp',
      code: `// C++  
  #include <iostream>
  
  int main() {
    int x = 10;
    int *p = &x;
    std::cout << *p;
    return 0;
  }`,
      options: ['10', '0', 'Compilation error', 'NaN'],
      answer: '10',
      xp: 5,
    },
    {
      id: 30,
      lang: 'cpp',
      code: `// C++  
  #include <iostream>
  
  int main() {
    int x = 0;
    std::cout << (x ? "Yes" : "No");
    return 0;
  }`,
      options: ['Yes', 'No', 'Compilation error', 'NaN'],
      answer: 'No',
      xp: 5,
    },
  
  ];
  
  export default questions;
  