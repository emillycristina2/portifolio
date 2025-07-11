document.addEventListener('DOMContentLoaded', function() {
    // --- AOS (Animate On Scroll) Initialization ---
    AOS.init({
        duration: 1000, // Duração padrão da animação (em ms)
        once: true      // Animar apenas uma vez ao rolar para baixo
    });

    // --- Destaque do item de menu ativo na navegação ---
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.menu a');
    const header = document.querySelector('header');

    function highlightNavLink() {
        let current = '';
        const headerOffset = header.offsetHeight; 

        sections.forEach(section => {
            const sectionTop = section.offsetTop - headerOffset - 1; 
            const sectionHeight = section.offsetHeight; 
            
            if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionTop + sectionHeight) {
                current = section.id;
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.href.includes(current)) {
                link.classList.add('active');
            }
        });
    }

    // --- Botão "Voltar ao Topo" ---
    const backToTopBtn = document.getElementById('backToTopBtn');

    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTopBtn.classList.add('show'); 
        } else {
            backToTopBtn.classList.remove('show');
        }
    });

    // --- Efeito de Digitação (Typewriter Effect) ---
    const typedTextSpan = document.getElementById('typed-text');
    const phrases = [
        "Estudante criativa apaixonada por design, natureza e tecnologia.",
        "Transformando ideias em experiências digitais.",
        "Criando sites bonitos, funcionais e com significado."
    ];
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    const typingSpeed = 70; 
    const deletingSpeed = 40;
    const pauseTime = 1500;

    function typeWriterEffect() {
        const currentPhrase = phrases[phraseIndex];

        if (isDeleting) {
            typedTextSpan.textContent = currentPhrase.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typedTextSpan.textContent = currentPhrase.substring(0, charIndex + 1);
            charIndex++;
        }

        let currentTypingSpeed = isDeleting ? deletingSpeed : typingSpeed;

        if (!isDeleting && charIndex === currentPhrase.length) {
            currentTypingSpeed = pauseTime;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            currentTypingSpeed = typingSpeed;
        }

        setTimeout(typeWriterEffect, currentTypingSpeed);
    }

    // --- Inicia todas as funcionalidades ao carregar a página ---
    highlightNavLink();
    typeWriterEffect();
});
