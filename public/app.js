// app.js

const app = new Framework7({
    root: '#app', // App root element
    id: 'com.myapp', // App ID
    name: 'Swipeable Tabs App', // App name
    theme: 'auto', // Auto theme (light or dark)
    routes: [
      {
        path: '/',
        url: './view/pages/index.html', // Path to index.html in view/pages folder
      },
      {
        path: '/home/',
        url: './views/pages/home.html',  // Home page in view/pages folder
      },
      {
        path: '/transaction/',
        url: './views/pages/transaction.html',  // Transaction page in view/pages folder
      },
      {
        path: '/budget/',
        url: './views/pages/budget.html',  // Budget page in view/pages folder
      },
      {
        path: '/profile/',
        url: './views/pages/profile.html',  // Profile page in view/pages folder
      }
    ],
    view: {
      dynamicNavbar: true, // Enable dynamic navbar
    },
  });
  
  const mainView = app.views.create('.view-main');
  
  // Swiper initialization
  const swiper = new Framework7.Swiper('.swiper-container', {
    spaceBetween: 10,
    slidesPerView: 1,
    navigation: true,
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    loop: true,  // Optional: Enable looping of tabs
    on: {
      slideChange: function () {
        // Update the tab navigation (active class) based on the swiper index
        const activeIndex = this.activeIndex;
        const tabLinks = document.querySelectorAll('.tab-link');
        tabLinks.forEach((tabLink, index) => {
          if (index === activeIndex) {
            tabLink.classList.add('tab-link-active');
          } else {
            tabLink.classList.remove('tab-link-active');
          }
        });
      },
    },
  });
  
  // Handle navigation when tab is clicked
  document.querySelectorAll('.tab-link').forEach(tabLink => {
    tabLink.addEventListener('click', function(e) {
      e.preventDefault();
      const targetTab = tabLink.getAttribute('href').replace('#', '');
      const targetSlideIndex = Array.from(tabLink.parentElement.children).indexOf(tabLink);
      
      // Update Swiper index to match clicked tab
      swiper.slideTo(targetSlideIndex);
      
      // Update the active link
      document.querySelectorAll('.tab-link').forEach(link => {
        link.classList.remove('tab-link-active');
      });
      tabLink.classList.add('tab-link-active');
      
      // Use the main view's router to navigate
      mainView.router.navigate(tabLink.getAttribute('href'));
    });
  });
  