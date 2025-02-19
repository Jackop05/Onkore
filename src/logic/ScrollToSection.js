// Scrolls to element with given id
const ScrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
      closeMenu(); 
    }
};

export default ScrollToSection;