import PropTypes from 'prop-types';
import { sanitizeHtml } from '../../utils/sanitizeHtml';

/**
 * Safe HTML component for rendering sanitized content
 * Prevents XSS attacks by sanitizing HTML before rendering
 */
const SafeHtml = ({ content, className = '', tag: Tag = 'div' }) => {
  const sanitizedContent = sanitizeHtml(content);
  
  return (
    <Tag 
      className={className}
      dangerouslySetInnerHTML={{ __html: sanitizedContent }}
    />
  );
};

SafeHtml.propTypes = {
  content: PropTypes.string.isRequired,
  className: PropTypes.string,
  tag: PropTypes.string,
};

export default SafeHtml;