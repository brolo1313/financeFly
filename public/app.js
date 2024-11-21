// Ініціалізація Framework7
const app = new Framework7({
    root: '#app', // Основний елемент додатку
    name: 'finance fly', // Назва додатку
    id: 'com.example.financeFly', // ID додатку
    panel: { swipe: 'left' }, // Дозволити свайп панель
    routes: [
      {
        path: '/home',  // Шлях для вкладки Home
        url: './views/pages/home.html',
      },
      {
        path: '/transaction',  // Шлях для вкладки Transaction
        url: './views/pages/transaction.html',
      },
      {
        path: '/budget',  // Шлях для вкладки Budget
        url: './views/pages/budget.html',
      },
      {
        path: '/profile',  // Шлях для вкладки Profile
        url: './views/pages/profile.html',
      }
    ],
    on: {
      init: function () {
        // Ініціалізація Swiper після того, як сторінки будуть завантажені
        const swiper = new Swiper('.swiper-container', {
          loop: false, // Безкінечний цикл
          slidesPerView: 1, // Одна вкладка за раз
          spaceBetween: 10, // Відстань між вкладками
          pagination: {
            el: '.swiper-pagination',
            clickable: true,
          }
        });
  
        // Подія для зміни слайдів (вкладок)
        swiper.on('slideChange', function () {
          const activeSlide = swiper.slides[swiper.activeIndex];
          const activeTab = activeSlide.id; // Отримуємо ID активної вкладки
  
          // Завантажуємо динамічно відповідний контент
          loadTabContent(activeTab);
        });
  
        // Завантаження контенту для початкової вкладки (home)
        loadTabContent('home');
      }
    }
  });
  
  // Функція для динамічного завантаження контенту вкладки
  function loadTabContent(tabId) {
    const tabContentContainer = document.querySelector(`#${tabId} .page-content`);
    // console.log('tabId', tabId);
  
    // Fetch the HTML content only from the page content (not the whole page)
    fetch(`/views/pages/${tabId}`) // Assuming the HTML file names match the tabId
      .then(response => response.text())
      .then(data => {
        // console.log('data', data);
        // console.log('tabContentContainer', tabContentContainer);
  
        // Extract the inner content from the fetched HTML (i.e., the content inside page-content)
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = data;
        const newContent = tempDiv.querySelector('.page-content');
  
        // Replace the existing content inside the tab
        tabContentContainer.innerHTML = newContent?.innerHTML;
      })
      .catch(error => {
        console.error('Error loading tab content:', error);
      });
  }
  
  
  // Ініціалізація основного перегляду
  const mainView = app.views.create('.view-main');
  