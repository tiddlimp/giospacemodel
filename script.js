// ========================================
// CONFIGURAÇÕES GERAIS
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    console.log('Site GioSpace carregado!');
    
    // Inicializar funções
    initScrollEffects();
    initMobileMenu();
    initSmoothScroll();
});

// ========================================
// EFEITOS DE SCROLL
// ========================================

function initScrollEffects() {
    // Adicionar classe ao header quando rolar a página
    window.addEventListener('scroll', function() {
        const header = document.getElementById('header');
        if (header) {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        }
    });

    // Intersection Observer para animações ao scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observar todas as seções
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        observer.observe(section);
    });
}

// ========================================
// MENU MOBILE
// ========================================

function initMobileMenu() {
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    const menuIcon = document.getElementById('menu-icon');
    const closeIcon = document.getElementById('close-icon');
    const mobileMenuLinks = document.querySelectorAll('.mobile-menu-link');

    if (mobileMenuButton && mobileMenu) {
        // Toggle menu ao clicar no botão
        mobileMenuButton.addEventListener('click', function() {
            toggleMobileMenu();
        });

        // Fechar menu ao clicar em um link
        mobileMenuLinks.forEach(link => {
            link.addEventListener('click', function() {
                closeMobileMenu();
            });
        });
    }

    function toggleMobileMenu() {
        if (mobileMenu.classList.contains('hidden')) {
            openMobileMenu();
        } else {
            closeMobileMenu();
        }
    }

    function openMobileMenu() {
        mobileMenu.classList.remove('hidden');
        menuIcon.classList.add('hidden');
        closeIcon.classList.remove('hidden');
    }

    function closeMobileMenu() {
        mobileMenu.classList.add('hidden');
        menuIcon.classList.remove('hidden');
        closeIcon.classList.add('hidden');
    }

    console.log('Menu mobile inicializado');
}

// ========================================
// SCROLL SUAVE
// ========================================

function initSmoothScroll() {
    // Scroll suave para links de navegação
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// ========================================
// FUNÇÕES DO HEADER
// ========================================

// Adicionar espaçamento ao body para compensar o header fixo
function adjustBodyPadding() {
    const header = document.getElementById('header');
    if (header) {
        const headerHeight = header.offsetHeight;
        document.body.style.paddingTop = headerHeight + 'px';
    }
}

// Ajustar padding quando a página carregar e quando redimensionar
window.addEventListener('load', adjustBodyPadding);
window.addEventListener('resize', adjustBodyPadding);

// ========================================
// FUNÇÕES DO HERO
// ========================================

function initHeroAnimations() {
    // Parallax suave no scroll
    window.addEventListener('scroll', function() {
        const hero = document.getElementById('hero');
        if (hero) {
            const scrolled = window.pageYOffset;
            const heroImage = hero.querySelector('img');
            if (heroImage && scrolled <= hero.offsetHeight) {
                heroImage.style.transform = `translateY(${scrolled * 0.5}px)`;
            }
        }
    });
}

// Inicializar animações do hero
document.addEventListener('DOMContentLoaded', function() {
    initHeroAnimations();
});

// ========================================
// FUNÇÕES DOS MODELOS
// ========================================

// Funções específicas dos modelos serão adicionadas depois

// ========================================
// FUNÇÕES DOS TAMANHOS
// ========================================

// Funções específicas dos tamanhos serão adicionadas depois

// ========================================
// CARROSSEL DE GALERIA
// ========================================

function initCarousel() {
    const track = document.getElementById('carousel-track');
    const prevBtn = document.getElementById('carousel-prev');
    const nextBtn = document.getElementById('carousel-next');
    const indicatorsContainer = document.getElementById('carousel-indicators');
    
    if (!track || !prevBtn || !nextBtn) return;

    const items = track.querySelectorAll('.carousel-item');
    const totalItems = items.length;
    
    // Configuração responsiva
    let itemsPerView = window.innerWidth >= 768 ? 3 : 1; // 3 no desktop, 1 no mobile
    let currentIndex = 0;
    let autoplayInterval;

    // Criar indicadores
    function createIndicators() {
        indicatorsContainer.innerHTML = '';
        const totalSlides = Math.ceil(totalItems / itemsPerView);
        
        for (let i = 0; i < totalSlides; i++) {
            const indicator = document.createElement('button');
            indicator.className = 'w-3 h-3 rounded-full bg-gray-300 hover:bg-blue-500 transition-all duration-300';
            indicator.addEventListener('click', () => goToSlide(i));
            indicatorsContainer.appendChild(indicator);
        }
        updateIndicators();
    }

    // Atualizar indicadores ativos
    function updateIndicators() {
        const indicators = indicatorsContainer.querySelectorAll('button');
        const activeSlide = Math.floor(currentIndex / itemsPerView);
        
        indicators.forEach((indicator, index) => {
            if (index === activeSlide) {
                indicator.classList.add('active');
            } else {
                indicator.classList.remove('active');
            }
        });
    }

    // Ir para slide específico
    function goToSlide(slideIndex) {
        currentIndex = slideIndex * itemsPerView;
        updateCarousel();
    }

    // Atualizar posição do carrossel
    function updateCarousel() {
        const itemWidth = 100 / itemsPerView;
        const translateX = -(currentIndex * itemWidth);
        track.style.transform = `translateX(${translateX}%)`;
        updateIndicators();
    }

    // Próximo slide
    function nextSlide() {
        currentIndex += itemsPerView;
        if (currentIndex >= totalItems) {
            currentIndex = 0;
        }
        updateCarousel();
    }

    // Slide anterior
    function prevSlide() {
        currentIndex -= itemsPerView;
        if (currentIndex < 0) {
            currentIndex = Math.max(0, totalItems - itemsPerView);
        }
        updateCarousel();
    }

    // Autoplay
    function startAutoplay() {
        stopAutoplay(); // Limpar qualquer autoplay existente
        autoplayInterval = setInterval(nextSlide, 3000); // Muda a cada 3 segundos
    }

    function stopAutoplay() {
        if (autoplayInterval) {
            clearInterval(autoplayInterval);
        }
    }

    // Event listeners
    nextBtn.addEventListener('click', () => {
        nextSlide();
        stopAutoplay();
        startAutoplay(); // Reinicia o autoplay após interação manual
    });

    prevBtn.addEventListener('click', () => {
        prevSlide();
        stopAutoplay();
        startAutoplay();
    });

    // Pausar autoplay quando o mouse está sobre o carrossel
    track.addEventListener('mouseenter', stopAutoplay);
    track.addEventListener('mouseleave', startAutoplay);

    // Atualizar ao redimensionar a tela
    window.addEventListener('resize', () => {
        const newItemsPerView = window.innerWidth >= 768 ? 3 : 1;
        if (newItemsPerView !== itemsPerView) {
            itemsPerView = newItemsPerView;
            currentIndex = 0;
            createIndicators();
            updateCarousel();
        }
    });

    // Inicializar
    createIndicators();
    updateCarousel();
    startAutoplay();
}

// ========================================
// FUNÇÕES DO CONTATO
// ========================================

function initContactForm() {
    const form = document.getElementById('contact-form');
    const telefoneInput = document.getElementById('telefone');
    
    if (!form) return;

    // Máscara de telefone
    if (telefoneInput) {
        telefoneInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length <= 11) {
                value = value.replace(/^(\d{2})(\d)/g, '($1) $2');
                value = value.replace(/(\d)(\d{4})$/, '$1-$2');
                e.target.value = value;
            }
        });
    }

    // Validação e envio do formulário
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Limpar mensagens de erro anteriores
        clearErrors();
        
        // Validar campos
        const nome = document.getElementById('nome').value.trim();
        const email = document.getElementById('email').value.trim();
        const telefone = document.getElementById('telefone').value.trim();
        const mensagem = document.getElementById('mensagem').value.trim();
        
        let isValid = true;

        // Validar nome
        if (nome === '' || nome.length < 3) {
            showError('nome', 'Por favor, digite seu nome completo');
            isValid = false;
        }

        // Validar email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (email === '' || !emailRegex.test(email)) {
            showError('email', 'Por favor, digite um e-mail válido');
            isValid = false;
        }

        // Validar telefone
        const telefoneNumeros = telefone.replace(/\D/g, '');
        if (telefoneNumeros.length < 10) {
            showError('telefone', 'Por favor, digite um telefone válido');
            isValid = false;
        }

        // Validar mensagem
        if (mensagem === '' || mensagem.length < 10) {
            showError('mensagem', 'Por favor, digite uma mensagem com pelo menos 10 caracteres');
            isValid = false;
        }

        // Se válido, simular envio
        if (isValid) {
            submitForm(nome, email, telefone, mensagem);
        }
    });
}

function showError(fieldId, message) {
    const field = document.getElementById(fieldId);
    const errorSpan = field.nextElementSibling;
    
    field.classList.add('input-error', 'border-red-500');
    errorSpan.textContent = message;
    errorSpan.classList.remove('hidden');
    
    // Remover erro ao começar a digitar
    field.addEventListener('input', function() {
        field.classList.remove('input-error', 'border-red-500');
        errorSpan.classList.add('hidden');
    }, { once: true });
}

function clearErrors() {
    const errorMessages = document.querySelectorAll('.error-message');
    const inputs = document.querySelectorAll('#contact-form input, #contact-form textarea');
    
    errorMessages.forEach(span => span.classList.add('hidden'));
    inputs.forEach(input => input.classList.remove('input-error', 'border-red-500'));
}

function submitForm(nome, email, telefone, mensagem) {
    // Simular envio (aqui você integraria com backend)
    console.log('Formulário enviado:', { nome, email, telefone, mensagem });
    
    // Mostrar mensagem de sucesso
    const successMessage = document.getElementById('success-message');
    successMessage.classList.remove('hidden');
    
    // Limpar formulário
    document.getElementById('contact-form').reset();
    
    // Esconder mensagem de sucesso após 5 segundos
    setTimeout(() => {
        successMessage.classList.add('hidden');
    }, 5000);
}

// Inicializar formulário de contato e carrossel
document.addEventListener('DOMContentLoaded', function() {
    initCarousel();
    initContactForm();
});

// ========================================
// UTILITÁRIOS
// ========================================

// Função para formatar telefone
function formatPhone(phone) {
    return phone.replace(/\D/g, '')
                .replace(/^(\d{2})(\d)/g, '($1) $2')
                .replace(/(\d)(\d{4})$/, '$1-$2');
}

// Função para validar email
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}
