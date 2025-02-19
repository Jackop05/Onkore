// Makes every letter of the given string show green color when hovering over it
export default function HoverLetters(text, color = "neongreen") {
    return (
      <div className="flex flex-wrap justify-center text-center w-full gap-1">
        {text.split(" ").map((word, index) => (
          <span key={index} className="flex">
            {Array.from(word).map((letter, letterIndex) => (
              <span key={letterIndex} className={`hover:text-${color} transition-all duration-100 cursor-default`}>
                {letter}
              </span>
            ))}
            <span className="w-2"></span> {/* Space between words */}
          </span>
        ))}
      </div>
    );
  }
  