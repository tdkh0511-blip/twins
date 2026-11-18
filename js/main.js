/**
 * Twins Family - Official Website Scripts
 * ツインズリハビリ訪問看護ステーション / ツインズケアプランセンター
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Mobile Menu Drawer Toggle
  const mobileToggle = document.getElementById('mobileToggle');
  const mobileNav = document.getElementById('mobileNav');
  const mobileBackdrop = document.getElementById('mobileNavBackdrop');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');

  function toggleMobileMenu(open) {
    if (open) {
      mobileToggle.classList.add('active');
      mobileNav.classList.add('open');
      mobileBackdrop.classList.add('open');
      document.body.style.overflow = 'hidden';
    } else {
      mobileToggle.classList.remove('active');
      mobileNav.classList.remove('open');
      mobileBackdrop.classList.remove('open');
      document.body.style.overflow = '';
    }
  }

  if (mobileToggle) {
    mobileToggle.addEventListener('click', () => {
      const isOpen = mobileNav.classList.contains('open');
      toggleMobileMenu(!isOpen);
    });
  }

  if (mobileBackdrop) {
    mobileBackdrop.addEventListener('click', () => toggleMobileMenu(false));
  }

  mobileLinks.forEach(link => {
    link.addEventListener('click', () => toggleMobileMenu(false));
  });

  // 2. Sticky Header Elevation on Scroll
  const mainHeader = document.querySelector('.main-header');
  const backToTopBtn = document.getElementById('backToTop');

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;

    // Header shadow enhancement
    if (mainHeader) {
      if (scrollY > 50) {
        mainHeader.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
      } else {
        mainHeader.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.04)';
      }
    }

    // Back to top visibility
    if (backToTopBtn) {
      if (scrollY > 400) {
        backToTopBtn.classList.add('show');
      } else {
        backToTopBtn.classList.remove('show');
      }
    }
  });

  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // 3. FAQ Accordion
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    if (question) {
      question.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        
        // Close others for clean accordion experience (optional, lets you keep only one open or multiple)
        faqItems.forEach(otherItem => {
          if (otherItem !== item) {
            otherItem.classList.remove('active');
          }
        });

        item.classList.toggle('active', !isActive);
      });
    }
  });

  // Open first FAQ by default
  if (faqItems.length > 0) {
    faqItems[0].classList.add('active');
  }

  // 4. Contact Form Validation & Submission Modal
  const contactForm = document.getElementById('inquiryForm');
  const successModal = document.getElementById('successModal');
  const modalCloseBtn = document.getElementById('modalCloseBtn');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('userName').value.trim();
      const tel = document.getElementById('userTel').value.trim();
      const message = document.getElementById('userMessage').value.trim();

      if (!name || !tel || !message) {
        alert('必須項目（お名前、電話番号、お問い合わせ内容）をご入力ください。');
        return;
      }

      // Show confirmation modal
      if (successModal) {
        successModal.classList.add('open');
      }

      // Reset form
      contactForm.reset();
    });
  }

  if (modalCloseBtn && successModal) {
    modalCloseBtn.addEventListener('click', () => {
      successModal.classList.remove('open');
    });

    successModal.addEventListener('click', (e) => {
      if (e.target === successModal) {
        successModal.classList.remove('open');
      }
    });
  }

  // 5. Active Navigation Link Highlighting on Scroll
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  function updateActiveNavLink() {
    const scrollPos = window.scrollY + 120;

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');

      if (scrollPos >= top && scrollPos < top + height) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', updateActiveNavLink);
  updateActiveNavLink();
});
