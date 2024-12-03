export default function HoverLetters(text, color="neongreen") {
    return (
        <div>
            {Array.from(text).map((letter, index) => (
                <span key={index} className={`hover:text-${color} transition-all duration-100 cursor-default `}>
                    {letter === ' ' ? '\u00A0' : letter}
                </span>
            ))}
        </div>
    )
};