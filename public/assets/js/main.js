document.addEventListener('DOMContentLoaded', () => {
  // Initialize Lucide icons if available
  if (window.lucide) {
    window.lucide.createIcons();
  }

  // Sticky Transparent-to-White Header on Scroll (for pages with Hero Banner)
  const siteHeader = document.getElementById('site-header');
  const mainBanner = document.getElementById('main-banner');

  if (siteHeader && mainBanner) {
    function handleHeaderScroll() {
      if (window.scrollY > 30) {
        siteHeader.classList.add('header-scrolled');
        siteHeader.classList.remove('header-transparent');
      } else {
        siteHeader.classList.remove('header-scrolled');
        siteHeader.classList.add('header-transparent');
      }
    }
    window.addEventListener('scroll', handleHeaderScroll, { passive: true });
    handleHeaderScroll();
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

  // Close mobile drawer when clicking links inside the menu
  if (mobileMenu) {
    mobileMenu.addEventListener('click', (e) => {
      const link = e.target.closest('a');
      if (link) {
        closeMobileMenu();
      }
    });
  }

  // Mobile Courses Dropdown Toggle in Mobile Menu Drawer
  document.addEventListener('click', (e) => {
    const coursesBtn = e.target.closest('.mobile-courses-btn');
    if (coursesBtn) {
      e.preventDefault();
      e.stopPropagation();
      const parent = coursesBtn.closest('.space-y-1') || coursesBtn.parentElement;
      const submenu = parent ? parent.querySelector('.mobile-courses-submenu') : coursesBtn.nextElementSibling;
      const icon = coursesBtn.querySelector('.mobile-courses-icon, [data-lucide="chevron-down"], svg');

      if (submenu) {
        const isHidden = submenu.classList.toggle('hidden');
        if (icon) {
          icon.style.transform = isHidden ? 'rotate(0deg)' : 'rotate(180deg)';
        }
      }
    }
  });

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

  // Standard Admission Modal HTML (Identical to home page index.html)
  const admissionModalHTML = `
  <div id="admission-modal"
    class="fixed inset-0 bg-slate-950/70 backdrop-blur-sm z-50 hidden items-center justify-center p-4">
    <div
      class="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative border border-slate-100 max-h-[90vh] overflow-y-auto">
      <button id="close-admission-modal" type="button" title="Close Admission Form"
        class="absolute top-6 right-6 text-slate-400 hover:text-slate-700 p-1 rounded-lg cursor-pointer transition-colors">
        <i data-lucide="x" class="w-6 h-6"></i>
      </button>

      <div class="space-y-1 mb-6">
        <span class="text-sky-600 text-xs font-bold uppercase tracking-wider">Admission Enquiry</span>
        <h3 class="text-2xl font-extrabold text-slate-900">Hopewell Group of Colleges</h3>
        <p class="text-xs text-slate-500">Fill in your information below and our admissions team will contact you promptly.</p>
      </div>

      <form class="space-y-4">
        <div>
          <label class="block text-xs font-bold text-slate-700 uppercase mb-1">Full Name *</label>
          <input type="text" required placeholder="Enter student's full name"
            class="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-sky-500 text-sm">
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label class="block text-xs font-bold text-slate-700 uppercase mb-1">Mobile Number *</label>
            <input type="tel" required placeholder="10-digit mobile number"
              class="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-sky-500 text-sm">
          </div>
          <div>
            <label class="block text-xs font-bold text-slate-700 uppercase mb-1">Email</label>
            <input type="email" placeholder="student@example.com"
              class="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-sky-500 text-sm">
          </div>
        </div>

        <div>
          <label class="block text-xs font-bold text-slate-700 uppercase mb-1">Course of Interest *</label>
          <select required
            class="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-sky-500 text-sm bg-white">
            <option value="">-- Select Course --</option>
            <option value="bsc-nursing">B.Sc. Nursing (Bachelor of Science in Nursing)</option>
            <option value="gnm">GNM (General Nursing and Midwifery)</option>
            <option value="d-pharmacy">D. Pharmacy (Diploma in Pharmacy)</option>
            <option value="danp">DAN&P (Diploma in Ayush Nursing & Pharmacy)</option>
          </select>
        </div>

        <div>
          <label class="block text-xs font-bold text-slate-700 uppercase mb-1">Highest Qualification *</label>
          <select required
            class="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-sky-500 text-sm bg-white">
            <option value="">-- Select Highest Qualification --</option>
            <option value="12-pcb">10+2 Science (PCB)</option>
            <option value="12-pcm">10+2 Science (PCM)</option>
            <option value="12-arts-comm">10+2 Arts / Commerce</option>
            <option value="10th">10th Standard</option>
            <option value="graduate">Graduate Degree</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div>
          <label class="block text-xs font-bold text-slate-700 uppercase mb-1">Message</label>
          <textarea rows="3" placeholder="Enter your enquiry or message here..."
            class="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-sky-500 text-sm"></textarea>
        </div>

        <button type="submit"
          class="btn-creative w-full py-3.5 text-white font-bold text-base shadow-md cursor-pointer">
          Submit Enquiry
        </button>
      </form>
    </div>
  </div>`;

  function getOrCreateAdmissionModal() {
    let modal = document.getElementById('admission-modal');
    if (!modal) {
      document.body.insertAdjacentHTML('beforeend', admissionModalHTML);
      modal = document.getElementById('admission-modal');
      if (window.lucide) {
        window.lucide.createIcons();
      }
    }
    return modal;
  }

  function openModal(preferredCourse) {
    if (typeof closeMobileMenu === 'function') {
      closeMobileMenu();
    }
    const modal = getOrCreateAdmissionModal();
    if (modal) {
      if (!preferredCourse) {
        const path = window.location.pathname.toLowerCase();
        if (path.includes('bsc-nursing')) preferredCourse = 'bsc-nursing';
        else if (path.includes('gnm')) preferredCourse = 'gnm';
        else if (path.includes('d-pharmacy')) preferredCourse = 'd-pharmacy';
        else if (path.includes('danp')) preferredCourse = 'danp';
      }

      const courseSelect = modal.querySelector('select');
      if (courseSelect) {
        courseSelect.value = preferredCourse || '';
      }

      modal.classList.remove('hidden');
      modal.classList.add('flex');
      document.body.classList.add('overflow-hidden');
    }
  }

  function closeModal() {
    const modal = document.getElementById('admission-modal');
    if (modal) {
      modal.classList.add('hidden');
      modal.classList.remove('flex');
      document.body.classList.remove('overflow-hidden');
    }
  }

  // Delegated click listener for opening / closing admission modal
  document.addEventListener('click', (e) => {
    // Check if clicked element or its parent has .open-admission-modal
    const openBtn = e.target.closest('.open-admission-modal, [data-modal="admission"]');
    if (openBtn) {
      e.preventDefault();
      const course = openBtn.getAttribute('data-course');
      openModal(course);
      return;
    }

    // Check for explicit "Apply Now" buttons
    const btn = e.target.closest('button:not([type="submit"]), a');
    if (btn && btn.textContent) {
      const text = btn.textContent.trim().toLowerCase();
      const href = btn.getAttribute('href');
      if (
        (text.includes('apply now') || text.includes('apply for admission') || text.includes('apply online')) &&
        !href?.startsWith('#apply-form')
      ) {
        if (!href || href === '#' || href.startsWith('javascript:') || btn.tagName === 'BUTTON') {
          e.preventDefault();
          const course = btn.getAttribute('data-course');
          openModal(course);
          return;
        }
      }
    }

    // Close button
    if (e.target.closest('#close-admission-modal')) {
      e.preventDefault();
      closeModal();
      return;
    }

    // Click on backdrop
    const modal = document.getElementById('admission-modal');
    if (modal && e.target === modal) {
      closeModal();
    }
  });

  // ESC key listener to close modal
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeModal();
    }
  });

  // Gallery Filter Tabs
  const filterBtns = document.querySelectorAll('.gallery-filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');

  if (filterBtns.length > 0) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const filter = btn.getAttribute('data-filter');

        filterBtns.forEach(b => {
          b.classList.remove('active');
          b.setAttribute('aria-selected', 'false');
        });
        btn.classList.add('active');
        btn.setAttribute('aria-selected', 'true');

        // Smooth scroll selected tab into view on smaller/scrollable viewports
        btn.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });

        galleryItems.forEach(item => {
          const category = item.getAttribute('data-category');
          if (filter === 'all' || category === filter) {
            item.classList.remove('hidden');
          } else {
            item.classList.add('hidden');
          }
        });
      });
    });
  }

  // Form Submission Feedback Mock (handles both static and dynamic forms)
  document.addEventListener('submit', (e) => {
    const form = e.target;
    if (!form || form.tagName !== 'FORM') return;

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

  // Hero Swiper Initialization (Amrita.edu Style with "Up Next" Floating Preview Card)
  if (document.querySelector('.hero-swiper') && window.Swiper) {
    const heroSlidesData = [
      {
        title: "Hopewell Campus",
        desc: "Lush Green Campus & Modern Laboratories",
        thumb: "public/images/hopewellCollegeImg4.webp"
      },
      {
        title: "B.Sc. Nursing",
        desc: "4 Year Degree • Clinical Hospital Rotations",
        thumb: "public/images/hopewellStudents.webp"
      },
      {
        title: "GNM Nursing",
        desc: "3 Year Diploma • Bedside Emergency & Maternity",
        thumb: "public/images/hopewellBloodDonationGirls.webp"
      },
      {
        title: "D.Pharmacy",
        desc: "2 Year Diploma • PCI Approved Drug Labs",
        thumb: "public/images/hopewellLab2.webp"
      },
      {
        title: "DAN&P Ayurved",
        desc: "2.6 Year Diploma • Panchakarma & Herbal Units",
        thumb: "public/images/hopewellPharmcyBloodDonaition.webp"
      },
    ];

    const nextThumb = document.getElementById('hero-next-thumb');
    const nextTitle = document.getElementById('hero-next-title');
    const nextDesc = document.getElementById('hero-next-desc');
    const progressBar = document.getElementById('hero-card-progress');

    function updateNextCard(realIndex) {
      const nextIndex = (realIndex + 1) % heroSlidesData.length;
      const nextData = heroSlidesData[nextIndex];
      if (nextThumb && nextData) {
        nextThumb.src = nextData.thumb;
        nextThumb.alt = nextData.title;
      }
      if (nextTitle && nextData) nextTitle.textContent = nextData.title;
      if (nextDesc && nextData) nextDesc.textContent = nextData.desc;
    }

    const heroSwiper = new window.Swiper('.hero-swiper', {
      slidesPerView: 1,
      spaceBetween: 0,
      loop: true,
      effect: 'fade',
      fadeEffect: {
        crossFade: true
      },
      speed: 800,
      autoplay: {
        delay: 5500,
        disableOnInteraction: false,
      },
      pagination: {
        el: '.hero-pagination',
        clickable: true,
      },
      on: {
        init: function () {
          updateNextCard(this.realIndex || 0);
          if (window.lucide) window.lucide.createIcons();
        },
        slideChange: function () {
          updateNextCard(this.realIndex || 0);
        },
        autoplayTimeLeft: function (s, time, progress) {
          if (progressBar) {
            progressBar.style.width = Math.min(100, Math.max(0, (1 - progress) * 100)) + '%';
          }
        }
      }
    });

    const heroNextCard = document.getElementById('hero-next-card');
    const heroCustomNext = document.getElementById('hero-custom-next');
    const heroCustomPrev = document.getElementById('hero-custom-prev');

    if (heroCustomNext) {
      heroCustomNext.addEventListener('click', (e) => {
        e.stopPropagation();
        heroSwiper.slideNext();
      });
    }

    if (heroCustomPrev) {
      heroCustomPrev.addEventListener('click', (e) => {
        e.stopPropagation();
        heroSwiper.slidePrev();
      });
    }

    if (heroNextCard) {
      heroNextCard.addEventListener('click', (e) => {
        if (e.target.closest('#hero-custom-prev')) return;
        heroSwiper.slideNext();
      });
    }
  }

  // Course Swiper Initialization
  if (document.querySelector('.course-swiper') && window.Swiper) {
    new window.Swiper('.course-swiper', {
      slidesPerView: 1,
      spaceBetween: 20,
      loop: true,
      autoplay: {
        delay: 4000,
        disableOnInteraction: false,
      },
      pagination: {
        el: '.course-pagination',
        clickable: true,
      },
      navigation: {
        nextEl: '.course-next',
        prevEl: '.course-prev',
      },
      breakpoints: {
        640: {
          slidesPerView: 2,
          spaceBetween: 24,
        },
        1024: {
          slidesPerView: 4,
          spaceBetween: 24,
        }
      }
    });
  }

  // Pillars Swiper Initialization
  if (document.querySelector('.pillars-swiper') && window.Swiper) {
    new window.Swiper('.pillars-swiper', {
      slidesPerView: 1,
      spaceBetween: 20,
      loop: true,
      autoplay: {
        delay: 4500,
        disableOnInteraction: false,
      },
      pagination: {
        el: '.pillars-pagination',
        clickable: true,
      },
      navigation: {
        nextEl: '.pillars-next',
        prevEl: '.pillars-prev',
      },
      breakpoints: {
        640: {
          slidesPerView: 2,
          spaceBetween: 24,
        },
        1024: {
          slidesPerView: 4,
          spaceBetween: 24,
        }
      }
    });
  }

  // Gallery Swiper Initialization
  if (document.querySelector('.gallery-swiper') && window.Swiper) {
    new window.Swiper('.gallery-swiper', {
      slidesPerView: 1,
      spaceBetween: 24,
      loop: true,
      autoplay: {
        delay: 3500,
        disableOnInteraction: false,
      },
      pagination: {
        el: '.gallery-pagination',
        clickable: true,
      },
      navigation: {
        nextEl: '.gallery-next',
        prevEl: '.gallery-prev',
      },
      breakpoints: {
        640: {
          slidesPerView: 2,
          spaceBetween: 24,
        },
        1024: {
          slidesPerView: 3,
          spaceBetween: 24,
        }
      }
    });
  }

  // Clickable Course Cards Redirect
  const clickableCourseCards = document.querySelectorAll('.course-card-clickable');
  clickableCourseCards.forEach(card => {
    card.addEventListener('click', (e) => {
      // Don't redirect if clicked on an inner button (e.g. Enquire modal button) or an inner link
      if (e.target.closest('button, a')) return;
      const targetUrl = card.getAttribute('data-href');
      if (targetUrl) {
        window.location.href = targetUrl;
      }
    });

    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        if (e.target.closest('button, a')) return;
        const targetUrl = card.getAttribute('data-href');
        if (targetUrl) {
          window.location.href = targetUrl;
        }
      }
    });
  });
});
