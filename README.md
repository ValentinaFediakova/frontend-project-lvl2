# Gendiff

**Gendiff** is a CLI tool that compares two configuration files and shows a difference.
It supports `.json` and `.yml` formats and can output the difference in three styles: `stylish`, `plain`, and `json`.

[![Test Coverage](https://api.codeclimate.com/v1/badges/2a697c3d1afb290f45bc/test_coverage)](https://codeclimate.com/github/ValentinaFediakova/frontend-project-lvl2/test_coverage)

### Asciinema 1:

https://asciinema.org/a/InGr5qzuYUtiOVzOnWOaEzJpD

### Asciinema 2:

https://asciinema.org/a/CEjodQ0383vQYcebfZ7xbZJUd

### Asciinema 3:

https://asciinema.org/a/td2Cfnx5f8g4rT8jadfgL9G3b

### Asciinema 4:

https://asciinema.org/a/8qWgsHu7s4Zf2w9g7LLB5Kttv

## 📆 Features

- Compares files in `.json` and `.yml` formats
- Outputs differences in 3 formats:

  - Stylish (default)
  - Plain text
  - JSON

- Recursive comparison for deeply nested structures
- Full test coverage with Jest

## 🛠️ Technologies

- JavaScript (Node.js)
- Commander.js
- Lodash
- Jest
- ESLint

## 🚀 Installation

```bash
git clone https://github.com/ValentinaFediakova/frontend-project-lvl2.git
cd frontend-project-lvl2
make install
```

## 💻 Usage

Run from command line:

```bash
gendiff [options] <filepath1> <filepath2>
```

### Options

- `-f, --format [type]` output format: `stylish`, `plain`, `json` (default: `stylish`)
- `-h, --help` display help for command

### Example

```bash
gendiff file1.json file2.json
gendiff --format plain file1.yml file2.yml
```

## 🧪 Run Tests

```bash
make test
```
