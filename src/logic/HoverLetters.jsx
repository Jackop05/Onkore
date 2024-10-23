export default function HoverLetters(text) {
    return (
        <div>
            {Array.from(text).map((letter, index) => (
                <span key={index} className="hover:text-neongreen transition-all duration-100 cursor-default ">
                    {letter === ' ' ? '\u00A0' : letter}
                </span>
            ))}
        </div>
    )
};