document.addEventListener("DOMContentLoaded", function () {
  // when document loads. drop the header into view.

  ///////////////////////////////////////////////
  // Global Variables
  ///////////////////////////////////////////////

  ///////////////////////////////////////////////
  // Global Functions
  ///////////////////////////////////////////////

  // this function will return true or false if you are checking to see if the element (el) is visible.
  function elementInViewport(el) {
    let top = el.offsetTop;
    let left = el.offsetLeft;
    let width = el.offsetWidth;
    let height = el.offsetHeight;

    while (el.offsetParent) {
      el = el.offsetParent;
      top += el.offsetTop;
      left += el.offsetLeft;
    }

    return (
      top < window.pageYOffset + window.innerHeight &&
      left < window.pageXOffset + window.innerWidth &&
      top + height > window.pageYOffset &&
      left + width > window.pageXOffset
    );
  }

  /////////////////////////////////////////////
  // on load
  /////////////////////////////////////////////

  // /* This animation will slide the header title into view. */
  //   if (document.getElementById("header") && document.getElementById("footerLogo")) {
  //     gsap.from("#header", { duration: 2, delay: 1, y: "-101%", opacity: 0 });
  //   } catch (error) {
  //     /* Item is not on the DOM at all*/
  //   }

  document.getElementById("LoginForm")
    ? gsap.from("#LoginForm", { duration: 2, delay: 1, y: "-101%", opacity: 0 }) &&
    gsap.from("#welcomeMessage1", { duration: 2, delay: 1, x: "-101%", opacity: 0 }) &&
    gsap.from("#welcomeMessage2", { duration: 2, delay: 1, x: "101%", opacity: 0 })
    : null;

  // 
  // document.getElementById("welcomeMessage")
  // ? gsap.from("#LoginForm", { duration: 2, delay: 1, y: "-101%", opacity: 0 })
  // : null;

  //start game button fades in on document load

  //gsap.from("#startGame", { duration: 2, delay: 0.5, opacity: 0 });

  //////////////////////////////////////////////
  // on click
  //////////////////////////////////////////////

  //////////////////////////////////////////////
  // on scroll
  //////////////////////////////////////////////

  window.addEventListener("scroll", function (event) {
    // on scroll will fire every time the window scrolls up or down.
  });

  ///////////////////////////////////////////////////////////////////////////////////////////////////
  // // // // // // // // // // // // no code below this line. \\ \\ \\ \\ \\ // \\ // // // // // //
  ///////////////////////////////////////////////////////////////////////////////////////////////////
});
