
// @prepend "prism.js";



// HEADER ====================================== // 
// Mini plugin for the header
const headers = document.querySelectorAll(".header");

headers.forEach(function (current) {

  let originalClasses = current.className, // Classes to be added on scroll
    scrollClasses = current.getAttribute("data-onscroll-classes"), // Classes to be added on scroll
    scrollLogo = current.getAttribute("data-onscroll-logo"), // Logo to show on scroll
    brandLogo = current.querySelector(".header__logo img"), // Gets the current logo img tag
    brandLogoUrl = current.querySelector(".header__logo img").getAttribute("src"), // Gets the current logo src
    menuToggle = current.querySelector("[data-toggle]"), // Gets the element to toggle the naviagtion on mobile devices
    menuMobile, // Gets the menu for the mobile or submenu
    dropdownLink = current.querySelectorAll(".dropdown-link"), // Gets the dropdown links
    scrollAmount = 100; // how far down (in px) 


  // Preventing the link default action
  for (let i = 0; i < dropdownLink.length; i++) {
    dropdownLink[i].addEventListener("click", function (e) {
      e.preventDefault();
    })
  }


  // Opening the mobile menu
  if (menuToggle) menuToggle.addEventListener("click", openMenu);
  // Adds classes on scroll
  if (scrollClasses) addClasses();
  // Changes logo on scroll
  if (scrollLogo) changeLogo();


  // FUNCTIONS ======================== // 
  function openMenu() { // opens mobile menu


    let menuToggleTarget = menuToggle.getAttribute("data-toggle");

    const open = JSON.parse(menuToggle.getAttribute("aria-expanded")); // converts to boolean and returns true or false
    menuToggle.setAttribute("aria-expanded", !open);

    menuMobile = current.querySelector("#" + menuToggleTarget); // Gets the menu that needs to be display
    menuMobile.classList.toggle("active"); // shows and hides the menu
    menuToggle.classList.toggle("rotate"); // little animation for the hamburger icon
  };


  function scrollEvents(type) {

    let scrolled = window.scrollY;

    if (scrolled > scrollAmount) {
      if (type === "class") {
        current.className = originalClasses + " " + scrollClasses;
      } else {
        brandLogo.setAttribute("src", scrollLogo);
      }
    }

    else {
      if (type === "class") {
        current.className = "";
        current.className = originalClasses
      } else {
        brandLogo.setAttribute("src", "");
        brandLogo.setAttribute("src", brandLogoUrl);
      }

    }

  }


  function addClasses() { window.addEventListener("scroll", function () { scrollEvents("class") }); };

  function changeLogo() { window.addEventListener("scroll", function () { scrollEvents("logo") }); };

});


function activeMenuItem() {
  var menuItems = document.querySelectorAll(".header__list");
  var headerNavEl = document.querySelector(".header .header__navitems");
  var menuToggle = document.querySelector(".header .header__mobile--icon[data-toggle]");

  for (var i = 0; i < menuItems.length; i++) {

    menuItems[i].addEventListener("click", function () {

      headerNavEl.classList.remove("active");
      menuToggle.classList.remove("rotate");

      if (this.classList.contains("active")) return;

      var activeItem = document.querySelector(".header__list.active");

      this.classList.add("active");
      activeItem.classList.remove("active");

    });

  }

}

activeMenuItem();
