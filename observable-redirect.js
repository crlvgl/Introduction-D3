/**
 * Observable Link Redirect Handler
 * 
 * This script automatically detects and redirects broken Observable notebook links
 * to the correct Observable website URLs.
 * 
 * Usage: Include this script in your HTML pages to handle Observable redirects
 */

(function() {
    'use strict';
    
    // Configuration
    const OBSERVABLE_BASE_URL = 'https://observablehq.com';
    const REDIRECT_DELAY = 2000; // 2 seconds delay for user awareness
    
    /**
     * Check if a URL looks like an Observable notebook path
     */
    function isObservableNotebookPath(url) {
        // Remove protocol, domain, and query params for analysis
        const path = url.replace(/^https?:\/\/[^\/]+/, '').split('?')[0].split('#')[0];
        
        // Observable notebook patterns:
        // /@username/notebook-name
        // /d/notebook-id
        // /collection/collection-name
        // /username/notebook-name (alternative format)
        return /^(\/@[^\/]+\/[^\/]+|\/d\/[^\/]+|\/collection\/[^\/]+|\/[^\/]+\/[^\/]+)$/.test(path);
    }
    
    /**
     * Convert a local Observable-style path to a full Observable URL
     */
    function convertToObservableURL(url) {
        const urlObj = new URL(url, window.location.origin);
        const path = urlObj.pathname;
        const search = urlObj.search;
        const hash = urlObj.hash;
        
        let observablePath = '';
        
        if (path.startsWith('/@')) {
            // Already in correct format: /@username/notebook
            observablePath = path;
        } else if (path.match(/^\/d\/[^\/]+$/)) {
            // Notebook ID format: /d/notebook-id
            observablePath = path;
        } else if (path.match(/^\/collection\/[^\/]+$/)) {
            // Collection format: /collection/collection-name
            observablePath = path;
        } else if (path.match(/^\/[^\/]+\/[^\/]+$/)) {
            // User/notebook format: /username/notebook -> /@username/notebook
            observablePath = `/@${path.substring(1)}`;
        } else {
            // Fallback: try to construct from any path
            const cleanPath = path.replace(/^\//, '');
            if (cleanPath.includes('/')) {
                observablePath = `/@${cleanPath}`;
            } else {
                // Single segment, assume it's a username
                observablePath = `/@${cleanPath}`;
            }
        }
        
        return `${OBSERVABLE_BASE_URL}${observablePath}${search}${hash}`;
    }
    
    /**
     * Show a redirect notification to the user
     */
    function showRedirectNotification(originalUrl, targetUrl) {
        // Create notification element
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
            z-index: 10000;
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
            max-width: 400px;
            font-size: 14px;
            line-height: 1.4;
            border: 1px solid rgba(255, 255, 255, 0.2);
            backdrop-filter: blur(10px);
        `;
        
        notification.innerHTML = `
            <div style="display: flex; align-items: flex-start; gap: 10px;">
                <div style="font-size: 20px;">🔗</div>
                <div style="flex: 1;">
                    <div style="font-weight: 600; margin-bottom: 8px;">Redirecting to Observable</div>
                    <div style="opacity: 0.9; margin-bottom: 12px;">
                        This link points to an Observable notebook. You'll be redirected to the correct page in a moment.
                    </div>
                    <div style="display: flex; gap: 10px;">
                        <button id="redirect-now" style="
                            background: rgba(255, 255, 255, 0.2);
                            border: 1px solid rgba(255, 255, 255, 0.3);
                            color: white;
                            padding: 6px 12px;
                            border-radius: 5px;
                            cursor: pointer;
                            font-size: 12px;
                            font-weight: 500;
                        ">Go Now</button>
                        <button id="cancel-redirect" style="
                            background: transparent;
                            border: 1px solid rgba(255, 255, 255, 0.3);
                            color: white;
                            padding: 6px 12px;
                            border-radius: 5px;
                            cursor: pointer;
                            font-size: 12px;
                            font-weight: 500;
                        ">Cancel</button>
                    </div>
                </div>
                <button id="close-notification" style="
                    background: none;
                    border: none;
                    color: white;
                    cursor: pointer;
                    font-size: 18px;
                    padding: 0;
                    margin-left: 10px;
                    opacity: 0.7;
                ">×</button>
            </div>
        `;
        
        document.body.appendChild(notification);
        
        // Handle button clicks
        let redirectTimeout;
        
        const redirectNow = () => {
            window.open(targetUrl, '_blank');
            document.body.removeChild(notification);
            if (redirectTimeout) clearTimeout(redirectTimeout);
        };
        
        const cancelRedirect = () => {
            document.body.removeChild(notification);
            if (redirectTimeout) clearTimeout(redirectTimeout);
        };
        
        notification.querySelector('#redirect-now').addEventListener('click', redirectNow);
        notification.querySelector('#cancel-redirect').addEventListener('click', cancelRedirect);
        notification.querySelector('#close-notification').addEventListener('click', cancelRedirect);
        
        // Auto-redirect after delay
        redirectTimeout = setTimeout(() => {
            if (document.body.contains(notification)) {
                redirectNow();
            }
        }, REDIRECT_DELAY);
        
        return notification;
    }
    
    /**
     * Handle click events on links
     */
    function handleLinkClick(event) {
        const link = event.target.closest('a');
        if (!link || !link.href) return;
        
        try {
            // Check if this is a relative link that might be an Observable notebook
            const linkUrl = new URL(link.href, window.location.origin);
            const currentOrigin = window.location.origin;
            
            // Only handle links that are on the same domain (relative links)
            if (linkUrl.origin === currentOrigin && isObservableNotebookPath(linkUrl.href)) {
                event.preventDefault();
                
                const targetUrl = convertToObservableURL(linkUrl.href);
                showRedirectNotification(linkUrl.href, targetUrl);
            }
        } catch (error) {
            // Invalid URL, ignore
            console.warn('Observable redirect handler: Invalid URL', link.href);
        }
    }
    
    /**
     * Initialize the redirect handler
     */
    function initializeRedirectHandler() {
        // Add click event listener to catch Observable notebook links
        document.addEventListener('click', handleLinkClick);
        
        // Also check if the current page URL itself looks like an Observable notebook
        if (isObservableNotebookPath(window.location.href)) {
            const targetUrl = convertToObservableURL(window.location.href);
            
            // Create a simple redirect page
            document.body.innerHTML = `
                <div style="
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    min-height: 100vh;
                    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    margin: 0;
                    padding: 20px;
                ">
                    <div style="
                        text-align: center;
                        background: rgba(255, 255, 255, 0.1);
                        backdrop-filter: blur(10px);
                        border-radius: 20px;
                        border: 1px solid rgba(255, 255, 255, 0.2);
                        box-shadow: 0 8px 32px rgba(31, 38, 135, 0.37);
                        color: white;
                        padding: 60px 40px;
                        max-width: 600px;
                    ">
                        <h1 style="font-size: 2.5rem; margin-bottom: 20px;">🔗 Redirecting to Observable</h1>
                        <p style="font-size: 1.2rem; margin-bottom: 30px; opacity: 0.9;">
                            This appears to be an Observable notebook link. You'll be redirected to the correct page...
                        </p>
                        <div style="
                            border: 4px solid rgba(255, 255, 255, 0.3);
                            border-top: 4px solid white;
                            border-radius: 50%;
                            width: 40px;
                            height: 40px;
                            animation: spin 1s linear infinite;
                            margin: 20px auto;
                        "></div>
                        <a href="${targetUrl}" target="_blank" style="
                            display: inline-block;
                            margin-top: 30px;
                            padding: 15px 30px;
                            background: rgba(255, 255, 255, 0.2);
                            border-radius: 10px;
                            border: 1px solid rgba(255, 255, 255, 0.3);
                            text-decoration: none;
                            color: white;
                            font-weight: 500;
                            transition: all 0.3s ease;
                        ">Go to Observable</a>
                    </div>
                </div>
                <style>
                    @keyframes spin {
                        0% { transform: rotate(0deg); }
                        100% { transform: rotate(360deg); }
                    }
                </style>
            `;
            
            // Redirect after a short delay
            setTimeout(() => {
                window.location.href = targetUrl;
            }, 3000);
        }
    }
    
    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initializeRedirectHandler);
    } else {
        initializeRedirectHandler();
    }
    
    // Export for manual use if needed
    window.ObservableRedirect = {
        isObservableNotebookPath,
        convertToObservableURL,
        showRedirectNotification
    };
})();
