// Initialize Framework7
const app = new Framework7({
  root: "#app", // Main app element
  name: "finance fly", // App name
  id: "com.example.financeFly", // App ID
  panel: { swipe: "left" }, // Enable left swipe panel
  routes: [
    {
      path: "/home",
      url: "./home", // Вказуємо, що це тепер динамічний маршрут, а не статичний файл
    },
    {
      path: "/transaction",
      url: "./transaction", // Заміна .html на динамічний маршрут
    },
    {
      path: "/budget",
      url: "./budget", // Заміна .html на динамічний маршрут
    },
    {
      path: "/profile",
      url: "./profile", // Заміна .html на динамічний маршрут
    },
  ],
  on: {
    init: function () {
      // Initialize Swiper after the pages are loaded
      const swiper = new Swiper(".swiper-container", {
        loop: false, // No infinite loop
        slidesPerView: 1, // One tab at a time
        spaceBetween: 10, // Space between tabs
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
        },
      });

      setActiveTab('home');

      // On slide change event (Swiper)
      swiper.on("slideChange", function () {
        const activeSlide = swiper.slides[swiper.activeIndex];
        const activeTabId = activeSlide.id; // Get ID of the active tab
        setActiveTab(activeTabId); // Call the function to set the active tab
      });

      // Add event listeners for tab click handling
      document.querySelectorAll(".tab-link").forEach((tabLink) => {
        tabLink.addEventListener("click", function (e) {
          e.preventDefault(); // Prevent default link behavior

          // Trigger the swiper to go to the correct slide
          const targetSlideIndex = Array.from(
            tabLink.parentNode.children
          ).indexOf(tabLink);
          swiper.slideTo(targetSlideIndex);

          // Call the function to set the active tab when a tab is clicked
          const activeTabId = tabLink.getAttribute("href").substring(1); // Get the target tab ID (e.g., 'home', 'transaction', etc.)
          setActiveTab(activeTabId);
        });
      });
    },
  },
});

// Function to dynamically load content for each tab
function loadTabContent(tabId) {
  const tabContentContainer = document.querySelector(`#${tabId} .page-content`);

  const div = document.createElement("div");
  div.innerHTML = `<%- include('pages/transaction') %>`;
  tabContentContainer.appendChild(div);
}

function setActiveTab(activeTabId) {
  // Find the tab link and image corresponding to the active tab
  const activeTabLink = document.querySelector(
    `.tab-link[href="#${activeTabId}"]`
  );
  if (!activeTabLink) return; // Return if no matching tab link is found

  // Remove 'tab-link-active' class from all tab links and images
  document.querySelectorAll(".tab-link").forEach((otherTabLink) => {
    const otherImg = otherTabLink.querySelector("img");
    otherTabLink.classList.remove("tab-link-active");
    if (otherImg) {
      otherImg.classList.remove("tab-link-active");
    }
  });

  // Add 'tab-link-active' class to the active tab link and image
  activeTabLink.classList.add("tab-link-active");
  const img = activeTabLink.querySelector("img");
  if (img) {
    img.classList.add("tab-link-active");
  }
}


if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/service-worker.js')
      .then((registration) => {
        console.log('Service Worker зареєстровано з успіхом:', registration);
      })
      .catch((error) => {
        console.log('Помилка реєстрації Service Worker:', error);
      });
  });
}

// Initialize the main view (optional, depending on your structure)
const mainView = app.views.create(".view-main");
