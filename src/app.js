/**
 * Al-Wesam Al-Dhahabi Application Entry Point & Bootstrap
 */
document.addEventListener('DOMContentLoaded', () => {
  console.log('مرحباً بكم في منصة الوسام الذهبي للخدمات العامة واستشارات التجنيس وتصاريح الزواج.');

  // Initialize Router
  if (window.Router) {
    Router.init();
  }

  // Subscribe to Store updates
  if (window.Store) {
    Store.fetchSettings();
    Store.fetchServices();
    Store.fetchArticles();
    Store.fetchFaqs();
  }

  // Mobile Drawer Toggle Listener
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileDrawer = document.getElementById('mobile-drawer');

  if (mobileMenuBtn && mobileDrawer) {
    mobileMenuBtn.addEventListener('click', () => {
      mobileDrawer.classList.toggle('hidden');
    });

    // Close drawer when a mobile link is clicked
    document.querySelectorAll('.mobile-nav-item').forEach(link => {
      link.addEventListener('click', () => {
        mobileDrawer.classList.add('hidden');
      });
    });
  }

  // Global smooth link handling
  document.addEventListener('click', (e) => {
    const anchor = e.target.closest('a[href^="#"]');
    if (anchor) {
      const href = anchor.getAttribute('href');
      if (href.length > 1) {
        // Router will handle hash change
      }
    }
  });
});
