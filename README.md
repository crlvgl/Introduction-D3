# Learn D3: Interactive Data Visualization Tutorial

A comprehensive D3.js tutorial series created for university courses at Hochshule Düsseldorf, featuring interactive Observable notebooks in both German and English. This tutorial provides hands-on learning experiences for data visualization using D3.js.

## Table of Contents

- [Learn D3: Interactive Data Visualization Tutorial](#learn-d3-interactive-data-visualization-tutorial)
  - [Table of Contents](#table-of-contents)
  - [Disclaimer](#disclaimer)
  - [Overview](#overview)
  - [Tutorial Structure](#tutorial-structure)
    - [German Version (de1-de9)](#german-version-de1-de9)
    - [English Version (en1-en9)](#english-version-en1-en9)
  - [Getting Started](#getting-started)
    - [Prerequisites](#prerequisites)
    - [Running the Tutorial](#running-the-tutorial)
    - [Running Individual Notebooks](#running-individual-notebooks)
    - [Using Observable Runtime](#using-observable-runtime)
  - [Project Structure](#project-structure)
  - [Technologies Used](#technologies-used)
  - [Contributing](#contributing)
  - [Acknowledgments](#acknowledgments)
  - [Running Instructions](#running-instructions)
    - [The entire project](#the-entire-project)
      - [Method 1: Using Node.js](#method-1-using-nodejs)
      - [Method 2: Using Live Server Extension in Visual Studio Code](#method-2-using-live-server-extension-in-visual-studio-code)
      - [Method 3: Using Python's HTTP Server](#method-3-using-pythons-http-server)
    - [Single Notebooks](#single-notebooks)
      - [Method 1: Using Node.js](#method-1-using-nodejs-1)
      - [Method 2: Using Live Server Extension in Visual Studio Code](#method-2-using-live-server-extension-in-visual-studio-code-1)
      - [Method 3: Using Python's HTTP Server](#method-3-using-pythons-http-server-1)

## Disclaimer
This project is created for educational purposes as part of university data visualization coursework at Hochschule Düsseldorf. It is not affiliated with or endorsed by the original authors of the D3.js library or Observable notebooks.
The original notebooks used in this tutorial were created by [**Mike Bostock**](https://observablehq.com/user/@mbostock).
I have made some changes to the original notebooks to make them more suitable for our course, but the core content and structure remain the same. <br><br>
I do not guarantee that the notebooks will work as expected nor that they will be free of errors. Enjoy at your own risk! <br>
If you find any errors or inconsistencies, please let me know! I will be happy to fix them.

## Overview

This repository contains a complete D3.js learning path with 9 progressive lessons covering fundamental concepts to advanced data visualization techniques. Each lesson is available as an interactive Observable notebook that can be run locally or integrated into web applications. <br>
Credit for the original notebooks goes to [**Mike Bostock**](https://observablehq.com/user/@mbostock), the creator of D3.js and Observable.

## Tutorial Structure

The tutorial is organized into 9 progressive lessons (de1-de9 for German, en1-en9 for English):

### German Version (de1-de9)
- **de1**: Einführung (Introduction)
- **de2**: Nach Beispielen (By Example)
- **de3**: Daten (Data)
- **de4**: Skalen (Scales)
- **de5**: Formen (Shapes)
- **de6**: Animation (Animation)
- **de7**: Joins (Joins)
- **de8**: Interaktion (Interaction)
- **de9**: Weitere Themen (Further Topics)

### English Version (en1-en9)
- **en1**: Introduction
- **en2**: By Example
- **en3**: Data
- **en4**: Scales
- **en5**: Shapes
- **en6**: Animations
- **en7**: Joins
- **en8**: Interaction
- **en9**: Further Topics

## Getting Started

### Prerequisites
- Web browser with JavaScript support
- Node.js (for local development)
- Basic knowledge of HTML, CSS, and JavaScript

### Running the Tutorial

1. **Clone the repository:**
   ```bash
   git clone https://github.com/crlvgl/Introduction-D3.git
   cd Introduction-D3
   ```

2. **Start the main tutorial interface:**
   ```bash
   # Using Python
   python -m http.server 8000
   
   # Using Node.js
   npx http-server
   
   # Using PHP
   php -S localhost:8000
   ```

3. **Access the tutorial:**
   Open your browser and navigate to `http://localhost:8000`

> For more details on how to run, see the [Running Instructions](#running-instructions) section below or read HowToRun.txt.

### Running Individual Notebooks

Each notebook can be run independently:

```bash
cd Notebooks/en1  # or any other lesson folder
npx http-server
```

Then open `http://localhost:8080` in your browser.

> For more details on how to run, see the [Running Instructions](#running-instructions) section below or read HowToRun.txt.

### Using Observable Runtime

For integration into your own applications:

```bash
npm install @observablehq/runtime@5
npm install https://api.observablehq.com/d/[notebook-id].tgz?v=3
```

## Project Structure

```
Introduction-D3/
├── index.html                # Main tutorial landing page
├── 404.html                  # Error page
├── observable-redirect.js    # Redirect script for Observable notebooks
├── package.json              # Project dependencies
├── server.js                 # Node.js server script
├── README.md                 # This file
├── HowToRun.txt              # Instructions for running the project
├── .vscode/
│   └── settings.json         # VS Code workspace settings with configured live server
└── Notebooks/                # Tutorial lessons
    ├── de1/                  # German lesson 1
    ├── de2/                  # German lesson 2
    ├── ...
    ├── en1/                  # English lesson 1
    ├── en2/                  # English lesson 2
    └── ...
```

Each lesson folder contains:
- `index.html` - The main notebook interface
- `index.js` - Notebook entry point
- `[notebook-id].js` - Observable notebook code
- `runtime.js` - Observable Runtime
- `inspector.css` - Styling
- `package.json` - Dependencies
- `README.md` - Lesson-specific documentation, generated by Observable
- `files/` - Data files and assets (where applicable)

## Technologies Used

- **D3.js** - Data visualization library
- **Observable Runtime** - For running Observable notebooks
- **HTML5/CSS3** - Modern web standards
- **JavaScript ES6+** - Modern JavaScript features

## Contributing

Contributions are welcome! Please feel free to submit issues, suggestions, or pull requests to improve the tutorial content. <br>
_(For real though, if you find any errors or inconsistencies, please let me know! If you have **any** suggestions on how to improve the content, I would be very happy to hear them!)_

## Acknowledgments

- [**Mike Bostock**](https://observablehq.com/user/@mbostock) - Creator of D3.js and Observable, whose work in data visualization made this tutorial possible. Also the original creator of the notebooks used in this tutorial.
- [**Observable Team**](observablehq.com/) - For providing the Observable platform and runtime
- [**D3.js Community**](https://d3js.org) - For continuous development and support of the D3.js ecosystem

---
---
## Running Instructions

### The entire project

#### Method 1: Using Node.js
1. Ensure you have Node.js installed on your machine.
   - open a terminal or command prompt and type `node -v` to check if Node.js is installed.
   - If not installed, download and install it from https://nodejs.org/.
2. Navigate to the project directory in your terminal.
   - Use the command `cd path/to/your/project` to change directories.
   - You need to be in the directory where `package.json`, `index.html`, and `Notebook/` are located.
3. Install the required dependencies.
   - Run the command `npm install` to install all dependencies listed in `package.json`.
4. Start the server.
   - Run the command `npm start` to start the server.
   - The server should be configured to run on `http://localhost:5500` or a similar port. npm will tell you the exact URL.
5. Open your web browser.
   - Navigate to the URL provided by npm (e.g., `http://localhost:5500`).
6. You should see the project running in your browser.
   - if not, manually open `127.0.0.1:5500/index.html` in your browser.
   - make sure JavaScript is enabled in your browser settings.
7. To stop the server, go back to your terminal and press `Ctrl+C`.
   - If prompted, confirm that you want to stop the server by typing `y` or `j` (depending on your language settings).

#### Method 2: Using Live Server Extension in Visual Studio Code
> This method requires Visual Studio Code. If you want to use a different IDE, you can still follow the Node.js method.
1. Open Visual Studio Code.
2. Ensure you have the Live Server extension installed.
   - Open the Extensions view by clicking on the Extensions icon in the Activity Bar on the side of the window or pressing `Ctrl+Shift+X`.
   - Search for "Live Server" and install it if you haven't already.
      - Extension ID: ritwickdey.LiveServer
      - Link: https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer (Extension ID preferred)
3. Open the project folder in Visual Studio Code.
   - Use `File > Open Folder...` and select the project directory.
   - Ensure the folder contains `package.json`, `index.html`, and the `Notebook/` directory.
4. Start the Live Server.
   - In the bottom right corner of Visual Studio Code, click on the "Go Live" button.
      - This will start a local server and open your default web browser.
      - On default, it will run on `http://127.0.0.1:5500` or `http://localhost:5500`.
5. Open your web browser.
   - If it doesn't open automatically, manually navigate to `http://127.0.0.1:5500/index.html`.
6. You should see the project running in your browser.
   - make sure JavaScript is enabled in your browser settings.
7. To stop the server, click on the "Port: 5500" button in the bottom right corner of Visual Studio Code

#### Method 3: Using Python's HTTP Server
1. Ensure you have Python installed on your machine.
   - Open a terminal or command prompt and type `python --version` or `python3 --version` to check if Python is installed.
   - If not installed, download and install it from https://www.python.org/ or the Microsoft Store.
2. Navigate to the project directory in your terminal.
   - Use the command `cd path/to/your/project` to change directories.
   - You need to be in the directory where `index.html` and `Notebook/` are located.
3. Start the HTTP server.
   - Run the command `python -m http.server 5500` or `python3 -m http.server 5500`.
4. Open your web browser.
   - Navigate to `http://localhost:5500` or `http://127.0.0.1:5500`.
5. You should see the project running in your browser.
   - If not, manually open `http://127.0.0.1:5500/index.html` in your browser.
   - Make sure JavaScript is enabled in your browser settings.
6. To stop the server, go back to your terminal and press `Ctrl+C`.
<br><br>
### Single Notebooks

#### Method 1: Using Node.js
1. Ensure you have Node.js installed on your machine.
   - open a terminal or command prompt and type `node -v` to check if Node.js is installed.
   - If not installed, download and install it from https://nodejs.org/.
2. Navigate to the project directory in your terminal.
   - Use the command `cd path/to/your/project` to change directories.
   - Notebooks are located in the `Notebooks/` directory, for more information on which notebook to run, refer to the `README.md` file.
   - You need to be in the directory where `index.html`, `index.js`, and (optionally) the `files/` directory are located.
3. Install the required dependencies.
   - Run the command `npm install` to install all dependencies listed in `package.json`.
4. Start the server.
   - Run the command `npm start` to start the server.
   - The server should be configured to run on `http://localhost:5500` or a similar port. npm will tell you the exact URL.
5. Open your web browser.
   - Navigate to the URL provided by npm (e.g., `http://localhost:5500`).
6. You should see the project running in your browser.
   - if not, manually open `127.0.0.1:5500/index.html` in your browser.
   - make sure JavaScript is enabled in your browser settings.
7. To stop the server, go back to your terminal and press `Ctrl+C`.
   - If prompted, confirm that you want to stop the server by typing `y` or `j` (depending on your language settings).

#### Method 2: Using Live Server Extension in Visual Studio Code
> This method requires Visual Studio Code. If you want to use a different IDE, you can still follow the Node.js method.
1. Open Visual Studio Code.
2. Ensure you have the Live Server extension installed.
   - Open the Extensions view by clicking on the Extensions icon in the Activity Bar on the side of the window or pressing `Ctrl+Shift+X`.
   - Search for "Live Server" and install it if you haven't already.
      - Extension ID: ritwickdey.LiveServer
      - Link: https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer (Extension ID preferred)
3. Open the project folder in Visual Studio Code.
   - Use `File > Open Folder...` and select the project directory.
   - Ensure the folder contains `index.html`, `index.js`, and (optionally) the `files/` directory.
4. Start the Live Server.
   - In the bottom right corner of Visual Studio Code, click on the "Go Live" button.
      - This will start a local server and open your default web browser.
      - On default, it will run on `http://127.0.0.1:5500` or `http://localhost:5500`.
5. Open your web browser.
   - If it doesn't open automatically, manually navigate to `http://127.0.0.1:5500/index.html`.
6. You should see the project running in your browser.
   - make sure JavaScript is enabled in your browser settings.
7. To stop the server, click on the "Port: 5500" button in the bottom right corner of Visual Studio Code

#### Method 3: Using Python's HTTP Server
1. Ensure you have Python installed on your machine.
   - Open a terminal or command prompt and type `python --version` or `python3 --version` to check if Python is installed.
   - If not installed, download and install it from https://www.python.org/ or the Microsoft Store.
2. Navigate to the project directory in your terminal.
   - Use the command `cd path/to/your/project` to change directories.
   - You need to be in the directory where `index.html`, `index.js` and (optionally) `files/` are located.
3. Start the HTTP server.
   - Run the command `python -m http.server 5500` or `python3 -m http.server 5500`.
4. Open your web browser.
   - Navigate to `http://localhost:5500` or `http://127.0.0.1:5500`.
5. You should see the project running in your browser.
   - If not, manually open `http://127.0.0.1:5500/index.html` in your browser.
   - Make sure JavaScript is enabled in your browser settings.
6. To stop the server, go back to your terminal and press `Ctrl+C`.

---

*Created for educational purposes as part of university data visualization coursework at Hochschule Düsseldorf.*
