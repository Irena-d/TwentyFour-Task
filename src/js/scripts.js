window.onload = function () {

   var el = document.createElement("div");
    el.innerHTML = "RABBIT TEST ";
    var div = document.getElementById("headline");
    //insertAfter(div, el);

    /* FUNCTIONS */

    // Inserts newNode after referenceNode
    //function insertAfter(referenceNode, newNode) {
      //  referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
    //}

    // Sidebar toggle
    window.toggleSidebar = function() {
      var sidebar = document.getElementById('searchSidebar');
      var logo = document.querySelector('.logo');
      var menuButton = document.querySelector('.navbar-toggler');
      var searchIcon = document.querySelector('.search-icon');
      var sidebarContent = document.getElementById('SidebarContent');
  
      // Show sidebar
      sidebar.classList.toggle('open');
      sidebarContent.classList.toggle('open');

      // Hide logo and menu button
      var isOpen = sidebar.classList.contains('open');
      logo.style.visibility = isOpen ? 'hidden' : 'visible';
      menuButton.style.visibility  = isOpen ? 'hidden' : 'visible';
      menuButton.style.opacity = isOpen ? '0' : '1';

      // Change icon
      searchIcon.style.transform = isOpen ? 'rotate(45deg)' :  'rotate(0)';
      
      // Hide nav menu
      var navMenu = document.getElementById('navbarCollapse');
      navMenu.style.display = isOpen ? 'none': '';
    }

    // Navbar
    window.changeButton = function(button) {
      button.classList.toggle('change');
    }


    // Search function
    let keywords = [
      'The most expensive coffee on the market',
      '10 type of coffee beans you need to know',
      'Wonderful Copenhagen 2021',
      'Challenge your barista skills to the max',
      'Wonderful Copenhagen 2020',
      'Wonderful Copenhagen 2019',
      'Wonderful Copenhagen 2018',
      'Wonderful Copenhagen 2017',
      'Wonderful Copenhagen 2016',
    ];

    // Desktop
    const resultsBox = document.querySelector(".result-box");
    const inputBox = document.querySelector(".input-box");
    // Mobile
    const resultsBoxMobile = document.querySelector(".result-box-mobile");
    const inputBoxMobile = document.querySelector(".input-box-mobile");

    function handleSearch(inputEl, resultEl, keywords) {
      return function() {
        let result = [];
        let input = inputEl.value;  //search query value
        if(input.length) { //if not empty 
          result = keywords.filter((keyword) => {
           return keyword.toLowerCase().includes(input.toLowerCase());
          });
          //console.log(result);
        }
        displayResults(result, resultEl);
         //hide empty
        if(!result.length) {
        resultsBox.innerHTML = '';
        }
      }
    }

    //onkeyup - showing the results when starts typing
    inputBox.onkeyup = handleSearch(inputBox, resultsBox, keywords);
    //onkeyup - mobile
    inputBoxMobile.onkeyup = handleSearch(inputBoxMobile, resultsBoxMobile, keywords);

    //Display results - map gets each item in array
    function displayResults(result, resultEl){
      const content = result.map ((item) => {
        return `
        <li>
          <h4>${item}</h4>
          <span>Published 12/07/2021</span>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut...
          <div class="spacer"></div>
        </li>
      `;
      });
      resultEl.innerHTML = "<ul>" + content.join('') + "</ul>" //join - remove ','
    }

    // Modal opening
    function selectInput() {
      //console.log('clicked');
      let modal = document.getElementById('postModal');
      // Open the modal
      const bootstrapModal = new bootstrap.Modal(modal);
      bootstrapModal.show();
    }
  
    //event listener for desktop
    resultsBox.addEventListener('click', function (event) {
      const clickedElement = event.target;  //get clicked element
      // Check if the clicked element has the specified class
      const isResultElement = clickedElement.closest('.result-box');
      if (isResultElement) {
        selectInput();
      }
    });

    //event listener for mobile
    resultsBoxMobile.addEventListener('click', function (event) {
      const clickedElement = event.target;
      // Check if the clicked element has the specified class
      const isResultElement = clickedElement.closest('.result-box-mobile');
      if (isResultElement) {
        selectInput();
      }
    });
  
    //Close result box - icon click
    window.closeResults = function() {
      const currentDisplay = window.getComputedStyle(resultsBox).display;
      resultsBox.style.display = (currentDisplay === 'none') ? 'block' : 'none';
    }
    
    
    // Slider
    const slides = [
      { image: "/brown_rabbit/src/assets/images/slider/image1.jpg", text: '"Coffee in code out, thi is the way of eternal life and empowerment od the sould"' },
      { image: "/brown_rabbit/src/assets/images/slider/image2.jpg", text: '"To create an enviroment in which knowledge about coffee and its sphere can be obtained"' },
      { image: "/brown_rabbit/src/assets/images/slider/image3.jpg", text: '"This is a great introduction to the coffee industrys best beans on the planet"' }
    ];
    const slideImage = document.getElementById("slide-image");
    const slideText = document.getElementById("slide-text");
    let currentSlide = 0;

    var slider = document.getElementById('slider'),
    sliderItems = document.getElementById('slides'),
    prev = document.getElementById('prev'),
    next = document.getElementById('next');

    function slide(wrapper, items, prev, next) {
      var posX1 = 0,
          posX2 = 0,
          posInitial,
          posFinal,
          threshold = 100,
          slides = items.getElementsByClassName('slide'),
          slidesLength = slides.length,
          slideSize = items.getElementsByClassName('slide')[0].offsetWidth,
          firstSlide = slides[0],
          lastSlide = slides[slidesLength - 1],
          cloneFirst = firstSlide.cloneNode(true),   // Clone first and last slide to make smooth loop
          cloneLast = lastSlide.cloneNode(true),
          index = 0,
          allowShift = true;
      
      // Adding cloned first and last slide
      items.appendChild(cloneFirst);
      items.insertBefore(cloneLast, firstSlide); //instert last before first slide
      wrapper.classList.add('loaded');
      
      // Mouse events
      items.onmousedown = dragStart; // onmousedown - listen if clicked and hold
      
      // Touch events
      items.addEventListener('touchstart', dragStart);
      items.addEventListener('touchend', dragEnd);
      items.addEventListener('touchmove', dragAction);
      
      // Click events
      prev.addEventListener('click', function () { shiftSlide(-1) });
      next.addEventListener('click', function () { shiftSlide(1) });
      
      // Transition events
      items.addEventListener('transitionend', checkIndex);
      
      function dragStart (e) {
        e.preventDefault();
        posInitial = items.offsetLeft;
        if (e.type == 'touchstart') {
          posX1 = e.touches[0].clientX;
        } else {
          posX1 = e.clientX;
          document.onmouseup = dragEnd;
          document.onmousemove = dragAction;
        }
      }

      function dragAction (e) {
        if (e.type == 'touchmove') {
          posX2 = posX1 - e.touches[0].clientX;
          posX1 = e.touches[0].clientX;
        } else {
          posX2 = posX1 - e.clientX;
          posX1 = e.clientX;
        }
        items.style.left = (items.offsetLeft - posX2) + "px";
      }
      
      function dragEnd (e) {
        posFinal = items.offsetLeft;
        if (posFinal - posInitial < -threshold) {  //left shift
          shiftSlide(1, 'drag');
        } else if (posFinal - posInitial > threshold) {  // right shift
          shiftSlide(-1, 'drag');
        } else {
          items.style.left = (posInitial) + "px"; // shifting not triggered
        }

        //movement is finish
        document.onmouseup = null;
        document.onmousemove = null;
      }
      
      function shiftSlide(dir, action) {
        items.classList.add('shifting');
        
        if (allowShift) {
          if (!action) { posInitial = items.offsetLeft; }

          if (dir == 1) {
            items.style.left = (posInitial - slideSize) + "px";
            index++;      
          } else if (dir == -1) {
            items.style.left = (posInitial + slideSize) + "px";
            index--;      
          }
        };
        
        allowShift = false;
      }
        
      function checkIndex (){
        items.classList.remove('shifting');

        if (index == -1) {
          items.style.left = -(slidesLength * slideSize) + "px";
          index = slidesLength - 1;
        }

        if (index == slidesLength) {
          items.style.left = -(1 * slideSize) + "px";
          index = 0;
        }
        
        allowShift = true;
      }
    }

    slide(slider, sliderItems, prev, next);
 
    // Slider text box, 250ms text, 50ms opacity
    window.prevSlide = function() {
      if (currentSlide === 0) {
          currentSlide = slides.length - 1;
      } else {
          currentSlide--;
      }
      slideText.style.transition = 'transform 0.5s ease-in-out, opacity 0.5s ease-in-out';
      slideText.style.opacity = 0;
      setTimeout(() => {
          slideText.innerText = slides[currentSlide].text;
          setTimeout(() => {
              slideText.style.opacity = 1;
          }, 50);
      }, 250); 
    };

    window.nextSlide = function() {
      if (currentSlide === slides.length - 1) {
          currentSlide = 0;
      } else {
          currentSlide++;
      }
      slideText.style.transition = 'transform 0.5s ease-in-out, opacity 0.5s ease-in-out';
      slideText.style.opacity = 0;
      setTimeout(() => {
          slideText.innerText = slides[currentSlide].text;
          setTimeout(() => {
              slideText.style.opacity = 1;
          }, 50); 
      }, 250);
    }


    // Pagination
    const postsPerPage = 4;  // Number of posts to display per page
    let currentPage = 1;

    window.changePageNumber = function(index) {
        const posts = document.querySelectorAll('.post');
        const totalPages = Math.ceil(posts.length / postsPerPage);
        currentPage += index;
        // Ensure currentPage stays within valid range
        if (currentPage < 1) {
            currentPage = 1;
        } else if (currentPage > totalPages) {
            currentPage = totalPages;
        }
        updatePageContent();
    }

    function updatePageContent() {
        const posts = document.querySelectorAll('.post');
        const startIdx = (currentPage - 1) * postsPerPage;
        const endIdx = startIdx + postsPerPage;

        posts.forEach((posts, index) => {
            if (index >= startIdx && index < endIdx) {
                posts.style.display = 'block';
            } else {
                posts.style.display = 'none';
            }
        });

        // Update the page number
        const pageNumberElement = document.getElementById("page-number");
        pageNumberElement.textContent = `Page ${currentPage} of ${Math.ceil(posts.length / postsPerPage)}`;
    }

    //console.log("test")
};
