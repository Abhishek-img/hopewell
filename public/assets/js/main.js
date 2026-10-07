document.addEventListener('DOMContentLoaded', () => {
  // Initialize Lucide icons if available
  if (window.lucide) {
    window.lucide.createIcons();
  }

  // Mobile Menu Toggle
  const menuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu-drawer');
  const menuCloseBtn = document.getElementById('mobile-menu-close');
  const menuOverlay = document.getElementById('mobile-menu-overlay');

  function openMobileMenu() {
    if (mobileMenu && menuOverlay) {
      mobileMenu.classList.remove('translate-x-full');
      menuOverlay.classList.remove('hidden');
      document.body.classList.add('overflow-hidden');
    }
  }

  function closeMobileMenu() {
    if (mobileMenu && menuOverlay) {
      mobileMenu.classList.add('translate-x-full');
      menuOverlay.classList.add('hidden');
      document.body.classList.remove('overflow-hidden');
    }
  }

  if (menuBtn) menuBtn.addEventListener('click', openMobileMenu);
  if (menuCloseBtn) menuCloseBtn.addEventListener('click', closeMobileMenu);
  if (menuOverlay) menuOverlay.addEventListener('click', closeMobileMenu);

  // Accordion Logic
  const accordionButtons = document.querySelectorAll('.accordion-btn');
  accordionButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-target');
      const content = document.getElementById(targetId) || btn.nextElementSibling;
      const icon = btn.querySelector('.accordion-icon');

      if (content) {
        const isHidden = content.classList.contains('hidden');
        // Close all in same accordion group if needed, or toggle current
        content.classList.toggle('hidden');
        if (icon) {
          icon.style.transform = isHidden ? 'rotate(180deg)' : 'rotate(0deg)';
        }
      }
    });
  });

  // Admission Modal Toggle
  const modalOpenBtns = document.querySelectorAll('.open-admission-modal');
  const modalCloseBtn = document.getElementById('close-admission-modal');
  const modalOverlay = document.getElementById('admission-modal');

  function openModal() {
    if (modalOverlay) {
      modalOverlay.classList.remove('hidden');
      modalOverlay.classList.add('flex');
      document.body.classList.add('overflow-hidden');
    }
  }

  function closeModal() {
    if (modalOverlay) {
      modalOverlay.classList.add('hidden');
      modalOverlay.classList.remove('flex');
      document.body.classList.remove('overflow-hidden');
    }
  }

  modalOpenBtns.forEach(btn => btn.addEventListener('click', (e) => {
    e.preventDefault();
    openModal();
  }));

  if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeModal);
  if (modalOverlay) {
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) closeModal();
    });
  }

  // Gallery Filter Tabs
  const filterBtns = document.querySelectorAll('.gallery-filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');

  if (filterBtns.length > 0) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const filter = btn.getAttribute('data-filter');
        filterBtns.forEach(b => {
          b.classList.remove('bg-sky-600', 'text-white');
          b.classList.add('bg-white', 'text-slate-700', 'hover:bg-slate-100');
        });
        btn.classList.add('bg-sky-600', 'text-white');
        btn.classList.remove('bg-white', 'text-slate-700', 'hover:bg-slate-100');

        galleryItems.forEach(item => {
          if (filter === 'all' || item.getAttribute('data-category') === filter) {
            item.classList.remove('hidden');
          } else {
            item.classList.add('hidden');
          }
        });
      });
    });
  }

  // Form Submission Feedback Mock
  const forms = document.querySelectorAll('form');
  forms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const submitBtn = form.querySelector('button[type="submit"]');
      if (submitBtn) {
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<span class="inline-flex items-center space-x-2"><svg class="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24" fill="none"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path></svg><span>Submitting Application...</span></span>';
        submitBtn.disabled = true;

        setTimeout(() => {
          submitBtn.innerHTML = '✓ Submitted Successfully!';
          submitBtn.classList.remove('bg-sky-600', 'hover:bg-sky-700');
          submitBtn.classList.add('bg-emerald-600');
          form.reset();

          setTimeout(() => {
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
            submitBtn.classList.remove('bg-emerald-600');
            submitBtn.classList.add('bg-sky-600', 'hover:bg-sky-700');
            closeModal();
          }, 2500);
        }, 1200);
      }
    });
  });
});
