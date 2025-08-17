const AnimatedGradientText = ({ children, className = '' }) => (
    <span className={`bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent animate-gradient-x ${className}`}>
        {children}
    </span>
);

export default AnimatedGradientText;