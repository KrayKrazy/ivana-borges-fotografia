/**
 * Ivana Borges Fotografia - Script Interativo & Engenharia de Conversão
 */

document.addEventListener('DOMContentLoaded', () => {
  initMobileMenu();
  initGalleryFilter();
  initLightbox();
  initSimulator();
  initFAQ();
});

/* ==========================================================================
   1. Menu Mobile Drawer
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
   2. Filtro de Categorias da Galeria
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
          item.style.display = 'block';
          setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'scale(1)';
          }, 10);
        } else {
          item.style.opacity = '0';
          item.style.transform = 'scale(0.95)';
          setTimeout(() => {
            item.style.display = 'none';
          }, 200);
        }
      });
    });
  });
}

/* ==========================================================================
   3. Lightbox Modal Interativo
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
   4. Simulador Interativo de Orçamento Express (WhatsApp)
   ========================================================================== */
function initSimulator() {
  const form = document.getElementById('simuladorForm');
  const resultBtn = document.getElementById('btnSimuladorWhats');

  if (!form || !resultBtn) return;

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
   5. FAQ Accordion
   ========================================================================== */
function initFAQ() {
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const header = item.querySelector('.faq-header');
    if (!header) return;

    header.addEventListener('click', () => {
      const isActive = item.classList.contains('active');

      // Fecha todos
      faqItems.forEach(i => i.classList.remove('active'));

      // Abre apenas o clicado (se não estava aberto)
      if (!isActive) {
        item.classList.add('active');
      }
    });
  });
}
