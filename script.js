/* ==========================================================================
   LOGIX ENGENHARIA - INTERACTIVE SCRIPTS
   WhatsApp Integration, Dynamic Filtering, Modals & UI Interactions
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // 1. WhatsApp Configuration
  const WHATSAPP_NUMBER = '5519999532507';
  const WHATSAPP_DISPLAY = '(19) 99953-2507';

  // Helper to build WhatsApp direct link
  window.openWhatsAppQuote = function(service = '', urgency = false, city = '', customDetails = '') {
    let message = `Olá, equipe LOGIX Engenharia! Vim através do site institucional.`;
    
    if (urgency) {
      message += `\n🚨 *SOLICITAÇÃO DE ATENDIMENTO DE URGÊNCIA (PLANTÃO 24H)*`;
    } else {
      message += `\n📋 *SOLICITAÇÃO DE ORÇAMENTO TÉCNICO*`;
    }

    if (service) {
      message += `\n- *Serviço de interesse:* ${service}`;
    }
    if (city) {
      message += `\n- *Cidade/Região:* ${city}`;
    }
    if (customDetails) {
      message += `\n- *Detalhes:* ${customDetails}`;
    }

    message += `\n\nPor favor, gostaria de retorno de um engenheiro/técnico responsável.`;

    const encoded = encodeURIComponent(message);
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encoded}`;
    window.open(url, '_blank');
  };

  // 2. Header Scroll Effect
  const header = document.querySelector('.site-header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header?.classList.add('scrolled');
    } else {
      header?.classList.remove('scrolled');
    }
  });

  // 3. Mobile Navigation Toggle
  const mobileBtn = document.querySelector('.mobile-menu-btn');
  const mobileNav = document.querySelector('.main-nav');
  
  if (mobileBtn && mobileNav) {
    mobileBtn.addEventListener('click', () => {
      const isOpen = mobileNav.style.display === 'flex';
      if (isOpen) {
        mobileNav.style.display = 'none';
      } else {
        mobileNav.style.display = 'flex';
        mobileNav.style.flexDirection = 'column';
        mobileNav.style.position = 'absolute';
        mobileNav.style.top = '80px';
        mobileNav.style.left = '0';
        mobileNav.style.width = '100%';
        mobileNav.style.background = '#FFFFFF';
        mobileNav.style.padding = '1.5rem';
        mobileNav.style.boxShadow = '0 10px 25px rgba(0,0,0,0.1)';
        mobileNav.style.borderBottom = '2px solid var(--copper-primary)';
      }
    });

    // Close on link click
    mobileNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        if (window.innerWidth <= 768) {
          mobileNav.style.display = 'none';
        }
      });
    });
  }

  // 4. Services Filter / Tabs (if implemented as tabs)
  const serviceTabs = document.querySelectorAll('.tab-btn');
  const serviceCards = document.querySelectorAll('.service-card');

  serviceTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      serviceTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const category = tab.getAttribute('data-service-cat');
      serviceCards.forEach(card => {
        if (category === 'all' || card.getAttribute('data-category') === category) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // 5. Portfolio / Book Filters
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');
      projectCards.forEach(card => {
        if (filterValue === 'all' || card.getAttribute('data-filter-cat') === filterValue) {
          card.style.display = 'flex';
          card.style.animation = 'fadeIn 0.4s ease forwards';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // 6. Interactive Quote Calculator / Form submission to WhatsApp
  const quoteForm = document.getElementById('quoteCalculatorForm');
  if (quoteForm) {
    quoteForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const company = document.getElementById('quoteCompany')?.value || 'Não informado';
      const name = document.getElementById('quoteName')?.value || 'Não informado';
      const city = document.getElementById('quoteCity')?.value || 'Rio Claro / Região';
      const service = document.getElementById('quoteService')?.value || 'Elétrica e Automação Geral';
      const urgency = document.getElementById('quoteUrgency')?.checked || false;
      const details = document.getElementById('quoteDetails')?.value || '';

      const fullDetails = `Empresa: ${company} | Contato: ${name} | Detalhes: ${details || 'N/A'}`;
      window.openWhatsAppQuote(service, urgency, city, fullDetails);
    });
  }

  // 7. Modal Controls
  const quickQuoteModal = document.getElementById('quickQuoteModal');
  const openModalBtns = document.querySelectorAll('.js-open-quote-modal');
  const closeModalBtns = document.querySelectorAll('.js-close-modal');

  openModalBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      if (quickQuoteModal) {
        quickQuoteModal.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  closeModalBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      if (quickQuoteModal) quickQuoteModal.classList.remove('active');
      const projectModal = document.getElementById('projectDetailModal');
      if (projectModal) projectModal.classList.remove('active');
      document.body.style.overflow = 'auto';
    });
  });

  // Close modal when clicking outside
  document.querySelectorAll('.modal-overlay').forEach(modal => {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
      }
    });
  });

  // 8. Project Detail Modal
  window.openProjectModal = function(title, location, date, norms, description, imageSrc, tags) {
    const modal = document.getElementById('projectDetailModal');
    if (!modal) return;

    document.getElementById('modalProjectTitle').textContent = title;
    document.getElementById('modalProjectLocation').textContent = location;
    document.getElementById('modalProjectDate').textContent = date;
    document.getElementById('modalProjectNorms').textContent = norms;
    document.getElementById('modalProjectDesc').textContent = description;
    document.getElementById('modalProjectImg').src = imageSrc;

    const tagsContainer = document.getElementById('modalProjectTags');
    if (tagsContainer && tags) {
      tagsContainer.innerHTML = tags.split(',').map(tag => `<span class="tech-tag">${tag.trim()}</span>`).join('');
    }

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  };
});
