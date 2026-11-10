/**
 * Ivana Borges Fotografia - Engine Interativo & Slider Zero-Crop
 * Exibição de 100% de cada foto (sem cortes indesejados), Lightbox, Simulador e WhatsApp
 */

document.addEventListener('DOMContentLoaded', () => {
  initMobileMenu();
  initCinematicSlider();
  initGalleryFilter();
  initLightbox();
  initSimulator();
  initFAQ();
});

/* ==========================================================================
   1. BANCO DE DADOS DAS 38 FOTOS DO CATÁLOGO (ZERO-CROP)
   ========================================================================== */
const fotosCatalogo = [
  {
    id: 1,
    src: 'assets/img/foto-01.jpg',
    thumb: 'assets/thumbs/foto-01.jpg',
    title: 'Alegria Genuína na Festa Infantil',
    cat: 'Festa Infantil',
    orient: 'Vertical 9:16 (Stories)',
    ratio: '1216 x 2160',
    desc: 'Sorrisos espontâneos capturados na hora do brinquedo, com luz natural e expressão pura.'
  },
  {
    id: 2,
    src: 'assets/img/foto-02.webp',
    thumb: 'assets/thumbs/foto-02.webp',
    title: 'Detalhes Encantados da Mesa do Bolo',
    cat: 'Festa Infantil',
    orient: 'Retrato 4:5 (Feed)',
    ratio: 'Feed HD',
    desc: 'Cada doce modelado e detalhe da cenografia guardado com carinho e nitidez cristalina.'
  },
  {
    id: 3,
    src: 'assets/img/foto-03.jpg',
    thumb: 'assets/thumbs/foto-03.jpg',
    title: 'Emoção do Parabéns em Família',
    cat: 'Festa Infantil',
    orient: 'Retrato 3:4 Clássico',
    ratio: '3072 x 4096',
    desc: 'O momento da velinha acesa com os olhares emocionados dos pais e a palminha dos amigos.'
  },
  {
    id: 4,
    src: 'assets/img/foto-04.jpg',
    thumb: 'assets/thumbs/foto-04.jpg',
    title: 'Smash the Cake • Primeira Lambança',
    cat: 'Smash the Cake',
    orient: 'Vertical 9:16 (Stories)',
    ratio: '1217 x 2160',
    desc: 'A descoberta curiosa do chantilly, texturas doces e a expressão impagável de diversão.'
  },
  {
    id: 5,
    src: 'assets/img/foto-05.webp',
    thumb: 'assets/thumbs/foto-05.webp',
    title: 'Acompanhamento do Bebê • Primeiros Olhares',
    cat: 'Bebês & Mesversário',
    orient: 'Retrato 4:5 (Feed)',
    ratio: 'Feed HD',
    desc: 'Conforto e acolhimento total respeitando o ritmo e as sonequinhas do bebê.'
  },
  {
    id: 6,
    src: 'assets/img/foto-06.webp',
    thumb: 'assets/thumbs/foto-06.webp',
    title: 'Marcos do Desenvolvimento • Sentando Sozinho',
    cat: 'Bebês & Mesversário',
    orient: 'Retrato 4:5 (Feed)',
    ratio: 'Feed HD',
    desc: 'A fase fofinha dos primeiros dentinhos e a curiosidade com o mundo ao redor.'
  },
  {
    id: 7,
    src: 'assets/img/foto-07.webp',
    thumb: 'assets/thumbs/foto-07.webp',
    title: 'Banho Quentinho Pós-Smash',
    cat: 'Smash the Cake',
    orient: 'Retrato 4:5 (Feed)',
    ratio: 'Feed HD',
    desc: 'A hora relaxante da banheirinha com água morna e bolhinhas de sabão depois do bolo.'
  },
  {
    id: 8,
    src: 'assets/img/foto-08.webp',
    thumb: 'assets/thumbs/foto-08.webp',
    title: 'Cenografia Temática Smash the Cake',
    cat: 'Smash the Cake',
    orient: 'Retrato 4:5 (Feed)',
    ratio: 'Feed HD',
    desc: 'Cenários seguros, lúdicos e higienizados montados com paleta suave e afetuosa.'
  },
  {
    id: 9,
    src: 'assets/img/foto-09.webp',
    thumb: 'assets/thumbs/foto-09.webp',
    title: 'Dobrinhas & Detalhes Encantadores',
    cat: 'Bebês & Mesversário',
    orient: 'Retrato 4:5 (Feed)',
    ratio: 'Feed HD',
    desc: 'Pezinhos, mãozinhas e a pureza que passa tão rápido no primeiro aninho de vida.'
  },
  {
    id: 10,
    src: 'assets/img/foto-10.webp',
    thumb: 'assets/thumbs/foto-10.webp',
    title: 'Sessão Lúdica de Mesversário',
    cat: 'Bebês & Mesversário',
    orient: 'Retrato 4:5 (Feed)',
    ratio: 'Feed HD',
    desc: 'Temas leves e criativos para celebrar cada mês de conquista e amor incondicional.'
  },
  {
    id: 11,
    src: 'assets/img/foto-11.webp',
    thumb: 'assets/thumbs/foto-11.webp',
    title: 'Soninho Doce e Acolhedor',
    cat: 'Bebês & Mesversário',
    orient: 'Retrato 4:5 (Feed)',
    ratio: 'Feed HD',
    desc: 'Ambiente climatizado e seguro para registrar a calmaria do bebê dormindo.'
  },
  {
    id: 12,
    src: 'assets/img/foto-12.jpg',
    thumb: 'assets/thumbs/foto-12.jpg',
    title: 'Cenografia Panorâmica da Festa',
    cat: 'Festa Infantil',
    orient: 'Horizontal 16:9 Panorâmica',
    ratio: '2397 x 1712',
    desc: 'Visão ampla da decoração completa do salão, capturando todo o investimento e dedicação dos pais.'
  },
  {
    id: 13,
    src: 'assets/img/foto-13.jpg',
    thumb: 'assets/thumbs/foto-13.jpg',
    title: 'Ensaio Família na Golden Hour',
    cat: 'Família & Gestante',
    orient: 'Horizontal 16:9 Panorâmica',
    ratio: '2400 x 1600',
    desc: 'A luz dourada do pôr do sol em Goiânia iluminando o abraço mais sincero da família.'
  },
  {
    id: 14,
    src: 'assets/img/foto-14.jpg',
    thumb: 'assets/thumbs/foto-14.jpg',
    title: 'Aniversariante & Mesa de Doces',
    cat: 'Festa Infantil',
    orient: 'Vertical 9:16 (Stories)',
    ratio: '720 x 1280',
    desc: 'Retrato vertical perfeito para compartilhar com toda a família no WhatsApp e redes.'
  },
  {
    id: 15,
    src: 'assets/img/foto-15.jpg',
    thumb: 'assets/thumbs/foto-15.jpg',
    title: 'Crianças Brincando Sem Parar',
    cat: 'Festa Infantil',
    orient: 'Retrato 3:4 Clássico',
    ratio: '3072 x 4096',
    desc: 'A verdadeira essência de uma festa infantil: correr, pular e celebrar a infância livre.'
  },
  {
    id: 16,
    src: 'assets/img/foto-16.jpg',
    thumb: 'assets/thumbs/foto-16.jpg',
    title: 'Storymaker & Reels Mobile em Ação',
    cat: 'Festa Infantil',
    orient: 'Retrato 3:4 Clássico',
    ratio: '3072 x 4096',
    desc: 'Momentos espontâneos registrados com agilidade para entrega no mesmo dia.'
  },
  {
    id: 17,
    src: 'assets/img/foto-17.webp',
    thumb: 'assets/thumbs/foto-17.webp',
    title: 'Ensaio Gestante • A Doce Espera',
    cat: 'Família & Gestante',
    orient: 'Retrato 4:5 (Feed)',
    ratio: 'Feed HD',
    desc: 'A conexão profunda e silenciosa entre a mãe e o bebê que está por vir.'
  },
  {
    id: 18,
    src: 'assets/img/foto-18.jpg',
    thumb: 'assets/thumbs/foto-18.jpg',
    title: 'Álbum Fotográfico Infantil Encadernado',
    cat: 'Festa Infantil',
    orient: 'Vertical 9:16 (Stories)',
    ratio: '468 x 832',
    desc: 'O resultado palpável: fotolivro de luxo para folhear com os filhos por gerações.'
  },
  {
    id: 19,
    src: 'assets/img/foto-19.jpg',
    thumb: 'assets/thumbs/foto-19.jpg',
    title: 'Abraço Cúmplice de Mãe e Filho',
    cat: 'Família & Gestante',
    orient: 'Vertical 9:16 (Stories)',
    ratio: '1217 x 2160',
    desc: 'O colo que acalma, protege e eterniza o sentimento mais puro do mundo.'
  },
  {
    id: 20,
    src: 'assets/img/foto-20.jpg',
    thumb: 'assets/thumbs/foto-20.jpg',
    title: 'Iluminação Quente & Magia do Ambiente',
    cat: 'Festa Infantil',
    orient: 'Vertical 9:16 (Stories)',
    ratio: '720 x 1280',
    desc: 'Tratamento de cor e luz com tons naturais que valorizam a pele e os tons da festa.'
  },
  {
    id: 21,
    src: 'assets/img/foto-21.jpg',
    thumb: 'assets/thumbs/foto-21.jpg',
    title: 'Gargalhada Gostosa no Smash the Cake',
    cat: 'Smash the Cake',
    orient: 'Retrato 3:4 Clássico',
    ratio: '3072 x 4096',
    desc: 'Quando a criança se solta e a sessão vira uma grande e inesquecível brincadeira.'
  },
  {
    id: 22,
    src: 'assets/img/foto-22.jpg',
    thumb: 'assets/thumbs/foto-22.jpg',
    title: 'Pai & Filho • Laços para Toda a Vida',
    cat: 'Família & Gestante',
    orient: 'Retrato 3:4 Clássico',
    ratio: '2511 x 3348',
    desc: 'A admiração no olhar e a cumplicidade entre gerações eternizada em foto.'
  },
  {
    id: 23,
    src: 'assets/img/foto-23.jpg',
    thumb: 'assets/thumbs/foto-23.jpg',
    title: 'Pezinhos Sujos de Bolo',
    cat: 'Smash the Cake',
    orient: 'Vertical 9:16 (Stories)',
    ratio: '720 x 1280',
    desc: 'Aqueles detalhes que os pais amam guardar no álbum de recordações.'
  },
  {
    id: 24,
    src: 'assets/img/foto-24.jpg',
    thumb: 'assets/thumbs/foto-24.jpg',
    title: 'A Grande Roda de Brincadeiras',
    cat: 'Festa Infantil',
    orient: 'Horizontal 16:9 Panorâmica',
    ratio: '1440 x 1028',
    desc: 'Animação e diversão com todos os convidados reunidos na pista.'
  },
  {
    id: 25,
    src: 'assets/img/foto-25.jpg',
    thumb: 'assets/thumbs/foto-25.jpg',
    title: 'Irmãozinhos Celebrando Juntos',
    cat: 'Família & Gestante',
    orient: 'Vertical 9:16 (Stories)',
    ratio: '2126 x 3776',
    desc: 'O carinho e a amizade que nasce entre irmãos registrada com sensibilidade.'
  },
  {
    id: 26,
    src: 'assets/img/foto-26.jpg',
    thumb: 'assets/thumbs/foto-26.jpg',
    title: 'Entrada Triunfal do Aniversariante',
    cat: 'Festa Infantil',
    orient: 'Vertical 9:16 (Stories)',
    ratio: '1352 x 2400',
    desc: 'A expectativa e o brilho nos olhos ao ver os amigos e a festa pronta.'
  },
  {
    id: 27,
    src: 'assets/img/foto-27.jpg',
    thumb: 'assets/thumbs/foto-27.jpg',
    title: 'Retrato Intimista de Família',
    cat: 'Família & Gestante',
    orient: 'Retrato 3:4 Clássico',
    ratio: '1440 x 1919',
    desc: 'Foto protocolar que não pode faltar: elegante, espontânea e com afeto verdadeiro.'
  },
  {
    id: 28,
    src: 'assets/img/foto-28.webp',
    thumb: 'assets/thumbs/foto-28.webp',
    title: 'O Primeiro Sorriso Espontâneo',
    cat: 'Bebês & Mesversário',
    orient: 'Retrato 4:5 (Feed)',
    ratio: 'Feed HD',
    desc: 'Aquele sorriso desdentado que derrete qualquer coração de mãe.'
  },
  {
    id: 29,
    src: 'assets/img/foto-29.jpg',
    thumb: 'assets/thumbs/foto-29.jpg',
    title: 'Brincando com o Figurino Temático',
    cat: 'Festa Infantil',
    orient: 'Vertical 4:5 (Feed)',
    ratio: '1200 x 1500',
    desc: 'A roupinha especial do tema escolhida com todo o amor pelos pais.'
  },
  {
    id: 30,
    src: 'assets/img/foto-30.jpg',
    thumb: 'assets/thumbs/foto-30.jpg',
    title: 'Carinho dos Avós no Aniversário',
    cat: 'Família & Gestante',
    orient: 'Vertical 4:5 (Feed)',
    ratio: '1440 x 1799',
    desc: 'A bênção e o carinho dos avós que se tornam o maior tesouro da família no futuro.'
  },
  {
    id: 31,
    src: 'assets/img/foto-31.jpg',
    thumb: 'assets/thumbs/foto-31.jpg',
    title: 'Hora dos Docinhos e Confeitos',
    cat: 'Festa Infantil',
    orient: 'Vertical 4:5 (Feed)',
    ratio: '1440 x 1800',
    desc: 'A mãozinha tímida pegando o primeiro brigadeiro escondido na mesa.'
  },
  {
    id: 32,
    src: 'assets/img/foto-32.webp',
    thumb: 'assets/thumbs/foto-32.webp',
    title: 'Curiosidade e Primeiros Passos',
    cat: 'Bebês & Mesversário',
    orient: 'Retrato 4:5 (Feed)',
    ratio: 'Feed HD',
    desc: 'O equilíbrio desajeitado e lindo que marca o final do primeiro ano.'
  },
  {
    id: 33,
    src: 'assets/img/foto-33.jpg',
    thumb: 'assets/thumbs/foto-33.jpg',
    title: 'Reação dos Amiguinhos na Festa',
    cat: 'Festa Infantil',
    orient: 'Vertical 9:16 (Stories)',
    ratio: '640 x 1136',
    desc: 'A gargalhada coletiva na hora das brincadeiras e recreação infantil.'
  },
  {
    id: 34,
    src: 'assets/img/foto-34.jpg',
    thumb: 'assets/thumbs/foto-34.jpg',
    title: 'Abraço Coletivo na Hora do Parabéns',
    cat: 'Festa Infantil',
    orient: 'Vertical 9:16 (Stories)',
    ratio: '1216 x 2160',
    desc: 'O clímax da comemoração com todos os familiares e amigos aplaudindo.'
  },
  {
    id: 35,
    src: 'assets/img/foto-35.jpg',
    thumb: 'assets/thumbs/foto-35.jpg',
    title: 'Olhar de Gratidão dos Pais',
    cat: 'Festa Infantil',
    orient: 'Vertical 9:16 (Stories)',
    ratio: '1217 x 2160',
    desc: 'A sensação de dever cumprido ao ver o filho feliz e cercado de amor.'
  },
  {
    id: 36,
    src: 'assets/img/foto-36.jpg',
    thumb: 'assets/thumbs/foto-36.jpg',
    title: 'Retrato Oficial da Aniversariante',
    cat: 'Festa Infantil',
    orient: 'Retrato 3:4 Clássico',
    ratio: '3082 x 4096',
    desc: 'A foto perfeita para colocar no porta-retratos da sala e no álbum de luxo.'
  },
  {
    id: 37,
    src: 'assets/img/foto-37.jpg',
    thumb: 'assets/thumbs/foto-37.jpg',
    title: 'Close Encantador de Sorriso',
    cat: 'Festa Infantil',
    orient: 'Quadrado 1:1 Perfeito',
    ratio: '1440 x 1440',
    desc: 'Foco nos olhos brilhantes e na gargalhada mais gostosa da infância.'
  },
  {
    id: 38,
    src: 'assets/img/foto-38.jpg',
    thumb: 'assets/thumbs/foto-38.jpg',
    title: 'Despedida com Gostinho de Quero Mais',
    cat: 'Festa Infantil',
    orient: 'Retrato 3:4 Clássico',
    ratio: '1440 x 1920',
    desc: 'O cansaço bom de quem brincou até o último minuto e foi muito feliz.'
  }
];

/* ==========================================================================
   2. SLIDER CINEMATOGRÁFICO ZERO-CROP (TODAS AS FOTOS SEM CORTE)
   ========================================================================== */
function initCinematicSlider() {
  const sliderStage = document.getElementById('sliderStage');
  const sliderImg = document.getElementById('sliderImg');
  const sliderBackdrop = document.getElementById('sliderBackdrop');
  const sliderTitle = document.getElementById('sliderTitle');
  const sliderCat = document.getElementById('sliderCat');
  const sliderDesc = document.getElementById('sliderDesc');
  const sliderRatioBadge = document.getElementById('sliderRatioBadge');
  const sliderCounter = document.getElementById('sliderCounter');
  const sliderProgress = document.getElementById('sliderProgress');
  const sliderPrev = document.getElementById('sliderPrev');
  const sliderNext = document.getElementById('sliderNext');
  const sliderCotarBtn = document.getElementById('sliderCotarBtn');
  const sliderZoomBtn = document.getElementById('sliderZoomBtn');
  const thumbsContainer = document.getElementById('sliderThumbs');

  if (!sliderStage || !sliderImg) return;

  let currentIndex = 0;
  const totalSlides = fotosCatalogo.length;
  let autoplayTimer = null;
  const autoplayDelay = 5500;

  // Gerar miniaturas na barra horizontal
  if (thumbsContainer) {
    thumbsContainer.innerHTML = '';
    fotosCatalogo.forEach((foto, idx) => {
      const btn = document.createElement('button');
      btn.className = `thumb-btn ${idx === 0 ? 'active' : ''}`;
      btn.setAttribute('type', 'button');
      btn.setAttribute('aria-label', `Ver foto ${idx + 1}: ${foto.title}`);
      btn.innerHTML = `
        <img src="${foto.thumb}" alt="Miniatura ${idx + 1}" loading="lazy" />
        <span class="thumb-num">${idx + 1}</span>
      `;
      btn.addEventListener('click', () => {
        goToSlide(idx);
        restartAutoplay();
      });
      thumbsContainer.appendChild(btn);
    });
  }

  // Renderizar o slide atual preservando 100% da imagem (object-fit: contain)
  const renderSlide = (index) => {
    const foto = fotosCatalogo[index];
    if (!foto) return;

    // Efeito suave de transição
    sliderImg.style.opacity = '0';
    sliderImg.style.transform = 'scale(0.98)';

    setTimeout(() => {
      sliderImg.src = foto.src;
      sliderImg.alt = foto.title;
      sliderImg.style.opacity = '1';
      sliderImg.style.transform = 'scale(1)';
    }, 140);

    if (sliderBackdrop) {
      sliderBackdrop.style.backgroundImage = `url("${foto.thumb}")`;
    }

    if (sliderTitle) sliderTitle.textContent = foto.title;
    if (sliderCat) sliderCat.textContent = foto.cat;
    if (sliderDesc) sliderDesc.textContent = foto.desc;
    if (sliderRatioBadge) {
      sliderRatioBadge.textContent = `${foto.orient} • ${foto.ratio}`;
    }

    if (sliderCounter) {
      const curStr = String(index + 1).padStart(2, '0');
      const totStr = String(totalSlides).padStart(2, '0');
      sliderCounter.textContent = `${curStr} / ${totStr}`;
    }

    // Atualizar link contextual de WhatsApp no slide
    if (sliderCotarBtn) {
      const msg = `Olá, Ivana! Adorei a foto "${foto.title}" (Foto ${index + 1} do carrossel do site). Gostaria de um orçamento para fotos com esse estilo para o meu filho.`;
      sliderCotarBtn.href = `https://wa.me/5562991123830?text=${encodeURIComponent(msg)}`;
    }

    // Atualizar miniaturas ativas
    if (thumbsContainer) {
      const thumbBtns = thumbsContainer.querySelectorAll('.thumb-btn');
      thumbBtns.forEach((btn, idx) => {
        if (idx === index) {
          btn.classList.add('active');
          btn.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
        } else {
          btn.classList.remove('active');
        }
      });
    }

    // Resetar barra de progresso
    if (sliderProgress) {
      sliderProgress.style.transition = 'none';
      sliderProgress.style.width = '0%';
      setTimeout(() => {
        sliderProgress.style.transition = `width ${autoplayDelay}ms linear`;
        sliderProgress.style.width = '100%';
      }, 50);
    }
  };

  const nextSlide = () => {
    currentIndex = (currentIndex + 1) % totalSlides;
    renderSlide(currentIndex);
  };

  const prevSlide = () => {
    currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
    renderSlide(currentIndex);
  };

  const goToSlide = (index) => {
    currentIndex = index;
    renderSlide(currentIndex);
  };

  const startAutoplay = () => {
    stopAutoplay();
    autoplayTimer = setInterval(nextSlide, autoplayDelay);
  };

  const stopAutoplay = () => {
    if (autoplayTimer) {
      clearInterval(autoplayTimer);
      autoplayTimer = null;
    }
    if (sliderProgress) {
      sliderProgress.style.transition = 'none';
    }
  };

  const restartAutoplay = () => {
    stopAutoplay();
    startAutoplay();
  };

  // Eventos de clique
  if (sliderNext) {
    sliderNext.addEventListener('click', () => {
      nextSlide();
      restartAutoplay();
    });
  }

  if (sliderPrev) {
    sliderPrev.addEventListener('click', () => {
      prevSlide();
      restartAutoplay();
    });
  }

  // Pausar autoplay ao passar o mouse
  sliderStage.addEventListener('mouseenter', stopAutoplay);
  sliderStage.addEventListener('mouseleave', startAutoplay);

  // Botão de zoom abre no lightbox
  if (sliderZoomBtn) {
    sliderZoomBtn.addEventListener('click', () => {
      const modal = document.getElementById('lightboxModal');
      const modalImg = document.getElementById('lightboxImg');
      if (modal && modalImg) {
        const foto = fotosCatalogo[currentIndex];
        modalImg.src = foto.src;
        modalImg.alt = foto.title;
        modal.classList.add('active');
        document.body.classList.add('overflow-hidden');
      }
    });
  }

  // Clique na imagem principal também abre o lightbox
  sliderImg.addEventListener('click', () => {
    if (sliderZoomBtn) sliderZoomBtn.click();
  });

  // Navegação por teclado (quando visível)
  document.addEventListener('keydown', (e) => {
    const modal = document.getElementById('lightboxModal');
    if (modal && modal.classList.contains('active')) return; // Prioriza o lightbox

    if (e.key === 'ArrowRight') {
      nextSlide();
      restartAutoplay();
    } else if (e.key === 'ArrowLeft') {
      prevSlide();
      restartAutoplay();
    }
  });

  // Gestos touch / swipe para celulares
  let touchStartX = 0;
  let touchEndX = 0;

  sliderStage.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
    stopAutoplay();
  }, { passive: true });

  sliderStage.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    const diff = touchStartX - touchEndX;
    if (Math.abs(diff) > 45) {
      if (diff > 0) {
        nextSlide();
      } else {
        prevSlide();
      }
    }
    startAutoplay();
  }, { passive: true });

  // Inicialização do slider
  renderSlide(0);
  startAutoplay();
}

/* ==========================================================================
   3. Menu Mobile Drawer
   ========================================================================== */
function initMobileMenu() {
  const menuToggle = document.getElementById('mobileMenuToggle');
  const mobileMenu = document.getElementById('mobileMenu');
  const closeMenu = document.getElementById('closeMobileMenu');
  const navLinks = document.querySelectorAll('.mobile-nav-link');

  if (!menuToggle || !mobileMenu) return;

  const toggle = () => {
    mobileMenu.classList.toggle('hidden');
    document.body.classList.toggle('overflow-hidden');
  };

  menuToggle.addEventListener('click', toggle);
  if (closeMenu) closeMenu.addEventListener('click', toggle);

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.add('hidden');
      document.body.classList.remove('overflow-hidden');
    });
  });
}

/* ==========================================================================
   4. Filtro de Categorias da Galeria (Zero-Crop Masonry)
   ========================================================================== */
function initGalleryFilter() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');

  if (!filterBtns.length || !galleryItems.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      galleryItems.forEach(item => {
        const category = item.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          item.style.display = 'inline-block';
          setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
          }, 10);
        } else {
          item.style.opacity = '0';
          item.style.transform = 'translateY(10px)';
          setTimeout(() => {
            item.style.display = 'none';
          }, 200);
        }
      });
    });
  });
}

/* ==========================================================================
   5. Lightbox Modal Interativo (Sem Cortes)
   ========================================================================== */
let currentImageIndex = 0;
let visibleImages = [];

function initLightbox() {
  const modal = document.getElementById('lightboxModal');
  const modalImg = document.getElementById('lightboxImg');
  const closeBtn = document.getElementById('lightboxClose');
  const prevBtn = document.getElementById('lightboxPrev');
  const nextBtn = document.getElementById('lightboxNext');
  const galleryItems = document.querySelectorAll('.gallery-item');

  if (!modal || !modalImg) return;

  const updateVisibleList = () => {
    visibleImages = Array.from(galleryItems).filter(item => item.style.display !== 'none');
  };

  const openLightbox = (index) => {
    updateVisibleList();
    if (!visibleImages.length) return;

    currentImageIndex = index >= 0 && index < visibleImages.length ? index : 0;
    const targetItem = visibleImages[currentImageIndex];
    const imgEl = targetItem.querySelector('img');

    if (imgEl) {
      modalImg.src = imgEl.src;
      modalImg.alt = imgEl.alt || 'Foto por Ivana Borges';
      modal.classList.add('active');
      document.body.classList.add('overflow-hidden');
    }
  };

  const closeLightbox = () => {
    modal.classList.remove('active');
    document.body.classList.remove('overflow-hidden');
  };

  const showNext = (e) => {
    if (e) e.stopPropagation();
    updateVisibleList();
    if (visibleImages.length <= 1) return;
    currentImageIndex = (currentImageIndex + 1) % visibleImages.length;
    const imgEl = visibleImages[currentImageIndex].querySelector('img');
    if (imgEl) modalImg.src = imgEl.src;
  };

  const showPrev = (e) => {
    if (e) e.stopPropagation();
    updateVisibleList();
    if (visibleImages.length <= 1) return;
    currentImageIndex = (currentImageIndex - 1 + visibleImages.length) % visibleImages.length;
    const imgEl = visibleImages[currentImageIndex].querySelector('img');
    if (imgEl) modalImg.src = imgEl.src;
  };

  galleryItems.forEach((item, idx) => {
    item.addEventListener('click', () => {
      updateVisibleList();
      const currentListIndex = visibleImages.indexOf(item);
      openLightbox(currentListIndex >= 0 ? currentListIndex : idx);
    });
  });

  if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
  if (nextBtn) nextBtn.addEventListener('click', showNext);
  if (prevBtn) prevBtn.addEventListener('click', showPrev);

  modal.addEventListener('click', (e) => {
    if (e.target === modal || e.target.classList.contains('lightbox-content')) {
      closeLightbox();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (!modal.classList.contains('active')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowRight') showNext();
    if (e.key === 'ArrowLeft') showPrev();
  });
}

/* ==========================================================================
   6. Simulador Interativo de Orçamento Express (WhatsApp)
   ========================================================================== */
function initSimulator() {
  const form = document.getElementById('simuladorForm');
  const resultBtn = document.getElementById('btnSimuladorWhats');

  if (!form || !resultBtn) return;

  // Previne recarregamento acidental ao teclar Enter
  form.addEventListener('submit', (e) => e.preventDefault());

  const phone = '5562991123830'; // (62) 99112-3830

  function updateWhatsAppLink() {
    const servico = form.querySelector('input[name="sim_servico"]:checked')?.value || 'Cobertura de Festa Infantil';
    const local = form.querySelector('select[name="sim_local"]')?.value || 'Salão de Festas';
    const mes = form.querySelector('select[name="sim_mes"]')?.value || 'Próximos 30 dias';
    
    const checkboxes = form.querySelectorAll('input[name="sim_extras"]:checked');
    const extras = Array.from(checkboxes).map(c => c.value);

    let msg = `Olá, Ivana! Estive no seu site e gostaria de um orçamento personalizado:\n\n`;
    msg += `✨ *Tipo de Ensaio/Cobertura:* ${servico}\n`;
    msg += `📍 *Local Previsto:* ${local}\n`;
    msg += `📅 *Previsão de Data:* ${mes}\n`;

    if (extras.length > 0) {
      msg += `🎁 *Desejo Incluir:* ${extras.join(', ')}\n`;
    }

    msg += `\nPoderia me enviar os detalhes dos pacotes e disponibilidade de data para Goiânia? Obrigado(a)!`;

    resultBtn.href = `https://wa.me/${phone}?text=${encodeURIComponent(msg)}`;
  }

  form.addEventListener('change', updateWhatsAppLink);
  updateWhatsAppLink();
}

/* ==========================================================================
   7. FAQ Accordion
   ========================================================================== */
function initFAQ() {
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const header = item.querySelector('.faq-header');
    if (!header) return;

    header.setAttribute('role', 'button');
    header.setAttribute('tabindex', '0');

    const toggle = () => {
      const isActive = item.classList.contains('active');

      // Fecha todos
      faqItems.forEach(i => i.classList.remove('active'));

      // Abre apenas o clicado (se não estava aberto)
      if (!isActive) {
        item.classList.add('active');
      }
    };

    header.addEventListener('click', toggle);
    header.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggle();
      }
    });
  });
}
