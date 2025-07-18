/**
 * Universal 404 Handler for Observable Redirects
 * 
 * This script can be added to any HTML page to detect if the current URL
 * represents a 404 error for an Observable notebook and redirect accordingly.
 * 
 * Usage: Include this script in your main pages or as a fallback handler
 */

(function() {
    'use strict';
    
    // Only run this on what appears to be a 404 error
    function detect404AndRedirect() {
        // Check if we're on a page that might be a 404
        const currentPath = window.location.pathname;
        const currentUrl = window.location.href;
        
        // Don't run on obvious pages that should exist
        const skipPatterns = [
            /^\/$/,                    // Home page
            /^\/index\.html?$/,        // Index pages
            /^\/Notebooks\//,          // Valid notebook directories
            /\.(html|css|js|json|csv)$/, // File extensions that should exist
        ];
        
        for (let pattern of skipPatterns) {
            if (pattern.test(currentPath)) {
                return; // This page should exist, don't interfere
            }
        }
        
        // Check if this looks like an Observable URL
        const observablePatterns = [
            /^\/@[^\/]+\/[^\/]+/,     // /@username/notebook-name(/*) 
            /^\/d\/[^\/]+/,           // /d/notebook-id(/*)
            /^\/collection\/[^\/]+/,  // /collection/collection-name(/*)
            /^\/[^\/]+\/[^\/]+$/      // /username/notebook (be careful with this)
        ];
        
        let isObservableUrl = false;
        for (let pattern of observablePatterns) {
            if (pattern.test(currentPath)) {
                isObservableUrl = true;
                break;
            }
        }
        
        if (isObservableUrl) {
            // Wait a moment to see if the page actually loads
            setTimeout(() => {
                // Check if we're still on the same page and it seems like a 404
                if (window.location.href === currentUrl) {
                    // Check for signs this might be a 404
                    const bodyText = document.body ? document.body.textContent.toLowerCase() : '';
                    const title = document.title.toLowerCase();
                    
                    const errorIndicators = [
                        'not found',
                        '404',
                        'page not found',
                        'cannot be found',
                        'does not exist',
                        'file not found'
                    ];
                    
                    let seemsLike404 = false;
                    for (let indicator of errorIndicators) {
                        if (bodyText.includes(indicator) || title.includes(indicator)) {
                            seemsLike404 = true;
                            break;
                        }
                    }
                    
                    // Also check if the page is very empty (possible 404)
                    if (!seemsLike404 && document.body && document.body.textContent.trim().length < 100) {
                        seemsLike404 = true;
                    }
                    
                    if (seemsLike404) {
                        // This looks like a 404 for an Observable URL, redirect to our custom page
                        window.location.href = '/404.html';
                    }
                }
            }, 1000); // Wait 1 second for page to load
        }
    }
    
    // Run when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', detect404AndRedirect);
    } else {
        detect404AndRedirect();
    }
})();
