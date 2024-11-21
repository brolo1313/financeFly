// Initialize Framework7
const app = new Framework7({
    root: '#app', // Main app element
    name: 'finance fly', // App name
    id: 'com.example.financeFly', // App ID
    panel: { swipe: 'left' }, // Enable left swipe panel
    routes: [
      {
        path: '/home',
        url: './views/pages/home.html',
      },
      {
        path: '/transaction',
        url: './views/pages/transaction.html',
      },
      {
        path: '/budget',
        url: './views/pages/budget.html',
      },
      {
        path: '/profile',
        url: './views/pages/profile.html',
      },
    ],
    on: {
      init: function () {
        // Initialize Swiper after the pages are loaded
        const swiper = new Swiper('.swiper-container', {
          loop: false, // No infinite loop
          slidesPerView: 1, // One tab at a time
          spaceBetween: 10, // Space between tabs
          pagination: {
            el: '.swiper-pagination',
            clickable: true,
          },
        });
  
        // On slide change event
        swiper.on('slideChange', function () {
          const activeSlide = swiper.slides[swiper.activeIndex];
          const activeTab = activeSlide.id; // Get ID of the active tab
  
          // Dynamically load the content for the active tab
          loadTabContent(activeTab);
        });
  
        // Load content for the home tab initially
        loadTabContent('home');
  
        // Add event listeners for tab click handling
        document.querySelectorAll('.tab-link').forEach((tabLink) => {
            tabLink.addEventListener('click', function (e) {
              e.preventDefault(); // Prevent default link behavior
              const targetTabId = tabLink.getAttribute('href').replace('#', '');
    
              // Load the corresponding content for the tab
              loadTabContent(targetTabId);
    
              // Trigger the swiper to go to the correct slide
              const targetSlideIndex = Array.from(tabLink.parentNode.children).indexOf(tabLink);
              swiper.slideTo(targetSlideIndex);
    
              // Update the active tab
              document.querySelectorAll('.tab-link').forEach((link) => link.classList.remove('tab-link-active'));
              tabLink.classList.add('tab-link-active');
            });
          });
      },
    },
  });
  
  // Function to dynamically load content for each tab
  function loadTabContent(tabId) {
    const tabContentContainer = document.querySelector(`#${tabId} .page-content`);
  
    // Fetch the HTML content for the tab
    fetch(`/views/pages/${tabId}`)
      .then(response => response.text())
      .then(data => {
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = data;
        const newContent = tempDiv.querySelector('.page-content');
        tabContentContainer.innerHTML = newContent ? newContent.innerHTML : '';
      })
      .catch(error => {
        console.error('Error loading tab content:', error);
      });
  }
  
  // Initialize the main view (optional, depending on your structure)
  const mainView = app.views.create('.view-main');
  