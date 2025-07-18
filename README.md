# Learn D3: Interactive Data Visualization Tutorial

A comprehensive D3.js tutorial series created for university courses, featuring interactive Observable notebooks in both German and English. This tutorial provides hands-on learning experiences for data visualization using D3.js.

## Overview

This repository contains a complete D3.js learning path with 9 progressive lessons covering fundamental concepts to advanced data visualization techniques. Each lesson is available as an interactive Observable notebook that can be run locally or integrated into web applications.

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

### Running Individual Notebooks

Each notebook can be run independently:

```bash
cd Notebooks/en1  # or any other lesson folder
npx http-server
```

Then open `http://localhost:8080` in your browser.

### Using Observable Runtime

For integration into your own applications:

```bash
npm install @observablehq/runtime@5
npm install https://api.observablehq.com/d/[notebook-id].tgz?v=3
```

## Project Structure

```
Introduction-D3/
├── index.html             # Main tutorial landing page
├── README.md              # This file
└── Notebooks/             # Tutorial lessons
    ├── de1/               # German lesson 1
    ├── de2/               # German lesson 2
    ├── ...
    ├── en1/               # English lesson 1
    ├── en2/               # English lesson 2
    └── ...
```

Each lesson folder contains:
- `index.html` - The main notebook interface
- `index.js` - Notebook entry point
- `[notebook-id].js` - Observable notebook code
- `runtime.js` - Observable Runtime
- `inspector.css` - Styling
- `package.json` - Dependencies
- `README.md` - Lesson-specific documentation
- `files/` - Data files and assets (where applicable)

## Technologies Used

- **D3.js** - Data visualization library
- **Observable Runtime** - For running Observable notebooks
- **HTML5/CSS3** - Modern web standards
- **JavaScript ES6+** - Modern JavaScript features

## Features

- **Interactive Learning**: Hands-on exercises with immediate feedback
- **Bilingual Support**: Complete tutorials in German and English
- **Progressive Difficulty**: Structured learning path from basics to advanced
- **Modern Design**: Clean, professional interface with enhanced presentation
- **Local Development**: Run entirely offline for classroom use
- **Observable Integration**: Seamless integration with Observable notebooks

## Learning Objectives

By completing this tutorial series, students will learn:

- D3.js fundamentals and core concepts
- Data loading and manipulation techniques
- Creating scales, axes, and coordinate systems
- Building interactive visualizations
- Implementing smooth animations and transitions
- Working with complex data structures
- Best practices for data visualization design
- Creating responsive and accessible visualizations

## Contributing

Contributions are welcome! Please feel free to submit issues, suggestions, or pull requests to improve the tutorial content. <br>
_(For real though, if you find any errors or inconsistencies, please let me know! If you have **any** suggestions on how to improve the content, I would be very happy to hear them!)_

## Acknowledgments

- [**Mike Bostock**](https://observablehq.com/user/@mbostock) - Creator of D3.js and Observable, whose work in data visualization made this tutorial possible. Also the original creator of the notebooks used in this tutorial.
- [**Observable Team**](observablehq.com/) - For providing the Observable platform and runtime
- [**D3.js Community**](https://d3js.org) - For continuous development and support of the D3.js ecosystem

---

*Created for educational purposes as part of university data visualization coursework.*
