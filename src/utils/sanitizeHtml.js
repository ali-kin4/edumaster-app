import DOMPurify from 'dompurify';

/**
 * Safely sanitize HTML content to prevent XSS attacks
 * @param {string} htmlContent - The HTML content to sanitize
 * @param {Object} options - DOMPurify options
 * @returns {string} - Sanitized HTML
 */
export const sanitizeHtml = (htmlContent, options = {}) => {
  if (!htmlContent || typeof htmlContent !== 'string') {
    return '';
  }

  const defaultOptions = {
    ALLOWED_TAGS: [
      'p', 'br', 'strong', 'em', 'u', 'i', 'b', 
      'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
      'ul', 'ol', 'li', 'a', 'span', 'div',
      'blockquote', 'code', 'pre'
    ],
    ALLOWED_ATTR: ['href', 'target', 'rel', 'class'],
    ALLOW_DATA_ATTR: false,
    ...options
  };

  return DOMPurify.sanitize(htmlContent, defaultOptions);
};

/**
 * Convert newlines to HTML line breaks and sanitize
 * @param {string} text - Plain text with newlines
 * @returns {string} - Sanitized HTML with proper line breaks
 */
export const textToSafeHtml = (text) => {
  if (!text || typeof text !== 'string') {
    return '';
  }
  
  const htmlWithBreaks = text.replace(/\n/g, '<br />');
  return sanitizeHtml(htmlWithBreaks);
};

