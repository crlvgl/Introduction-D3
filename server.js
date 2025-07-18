const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 5500;

// Serve static files from the current directory
app.use(express.static('.'));

// Observable redirect middleware
app.use((req, res, next) => {
    const url = req.path;
    
    // First, exclude paths that are definitely part of this project
    const projectPaths = [
        /^\/Notebooks\//,           // Project notebook directories
        /^\/files\//,               // File attachments
        /^\/assets\//,              // Asset directories
        /^\/css\//,                 // CSS directories
        /^\/js\//,                  // JavaScript directories
        /^\/images\//,              // Image directories
        /^\/fonts\//,               // Font directories
        /^\/(index|404)\.html?$/,   // Main pages
        /^\/[^\/]*\.(html|css|js|json|csv|txt|md|png|jpg|jpeg|gif|svg|ico)$/,  // Files with extensions
        /^\/\.well-known\//,        // Well-known paths
        /^\/node_modules\//,        // Node modules
        /^\/\.vscode\//,            // VS Code settings
    ];
    
    // Check if this path should be excluded (is part of the project)
    for (let exclusion of projectPaths) {
        if (exclusion.test(url)) {
            return next(); // Continue to normal file serving
        }
    }
    
    // Check if URL matches Observable notebook patterns
    const observablePatterns = [
        /^\/@[^\/]+\/[^\/]+/, // /@username/notebook-name(/*) 
        /^\/d\/[a-f0-9]+/,    // /d/notebook-id(/*) - hexadecimal IDs
        /^\/collection\/[^\/]+/, // /collection/collection-name(/*)
    ];
    
    let isObservableUrl = false;
    for (let pattern of observablePatterns) {
        if (pattern.test(url)) {
            // Make sure it's not a real file that exists
            const filePath = path.join(__dirname, url);
            if (!fs.existsSync(filePath) && !fs.existsSync(filePath + '.html')) {
                isObservableUrl = true;
                break;
            }
        }
    }
    
    // More restrictive check for username/notebook pattern
    if (!isObservableUrl && /^\/[a-zA-Z0-9_-]+\/[a-zA-Z0-9_-]+/.test(url)) {
        const segments = url.split('/').filter(s => s.length > 0);
        if (segments.length >= 2) {
            const firstSegment = segments[0].toLowerCase();
            const secondSegment = segments[1].toLowerCase();
            
            // Exclude common project directory names
            const commonProjectDirs = [
                'notebooks', 'src', 'dist', 'build', 'public', 'static', 
                'assets', 'images', 'css', 'js', 'lib', 'vendor', 'api',
                'admin', 'test', 'tests', 'docs', 'documentation'
            ];
            
            if (!commonProjectDirs.includes(firstSegment) && 
                !commonProjectDirs.includes(secondSegment)) {
                // Make sure it's not a real file that exists
                const filePath = path.join(__dirname, url);
                if (!fs.existsSync(filePath) && !fs.existsSync(filePath + '.html')) {
                    isObservableUrl = true;
                }
            }
        }
    }
    
    if (isObservableUrl) {
        // Serve 404.html for Observable patterns
        res.status(404).sendFile(path.join(__dirname, '404.html'));
        return;
    }
    
    next();
});

// Handle all other 404s
app.use((req, res) => {
    res.status(404).sendFile(path.join(__dirname, '404.html'));
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
    console.log('Custom 404 handling enabled for Observable notebook redirects');
});

module.exports = app;
