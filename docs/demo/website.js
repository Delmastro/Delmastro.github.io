/* Set the width of the sidebar to 250px and the left margin of the page content to 250px */
function openNav() {
  // document.getElementById("mySidebar").style.width = "250px";
  document.getElementById("mySidebar").style.width = "250px";
  // document.getElementById("mySidebar").style.width = "250px";
  // document.getElementById("main").style.color =  "#000033";
}

/* Set the width of the sidebar to 0 and the left margin of the page content to 0 */
function closeNav() {
  document.getElementById("mySidebar").style.width = "0";
  document.getElementById("main").style.marginLeft = "0";
}

var TxtRotate = function(el, toRotate, period) {
  this.toRotate = toRotate;
  this.el = el;
  this.loopNum = 0;
  this.period = parseInt(period, 10) || 2000;
  this.txt = '';
  this.tick();
  this.isDeleting = false;
  // this.color = "#000033";
};

TxtRotate.prototype.tick = function() {
  var i = this.loopNum % this.toRotate.length;
  var fullTxt = this.toRotate[i];

  if (this.isDeleting) {
    this.txt = fullTxt.substring(0, this.txt.length - 1);
  } else {
    this.txt = fullTxt.substring(0, this.txt.length + 1);
  }

  this.el.innerHTML = '<span class="wrap">'+this.txt+'</span>';

  var that = this;
  var delta = 300 - Math.random() * 100;

  if (this.isDeleting) { delta /= 2; }

  if (!this.isDeleting && this.txt === fullTxt) {
    delta = this.period;
    this.isDeleting = true;
  } else if (this.isDeleting && this.txt === '') {
    this.isDeleting = false;
    this.loopNum++;
    delta = 500;
  }

  setTimeout(function() {
    that.tick();
  }, delta);
};

window.onload = function() {
  var elements = document.getElementsByClassName('txt-rotate');
  for (var i=0; i<elements.length; i++) {
    var toRotate = elements[i].getAttribute('data-rotate');
    var period = elements[i].getAttribute('data-period');
    if (toRotate) {
      new TxtRotate(elements[i], JSON.parse(toRotate), period);
    }
  }
  // INJECT CSS
  var css = document.createElement("style");
  css.type = "text/css";
  css.innerHTML = ".txt-rotate > .wrap { border-right: 0.08em solid #000033 }";
  // document.body.appendChild(css);
  document.body.appendChild(css);
};


let progress = document.getElementById('progressbar');
let totalHeight = document.body.scrollHeight - window.innerHeight;
window.onscroll = function(){
	let progressHeight = (window.pageOffset / totalHeight) * 100;
	progressbar.style.height = progressHeight + "%";
}


// Wrap every letter in a span
var textWrapper = document.querySelector('.writeText .letters');
textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='letter'>$&</span>");

anime.timeline({loop: true})
  .add({
    targets: '.writeText .letter',
    scale: [0, 1],
    duration: 2000,
    elasticity: 600,
    delay: (el, i) => 45 * (i+1)
  }).add({
    targets: '.writeText',
    opacity: 0,
    duration: 2000,
    easing: "easeOutExpo",
    delay: 1000
  });


//Ripple Effect
  $(document).ready(function() {
  try {
    $('body').ripples({
      resolution: 512,
      dropRadius: 20, //px
      perturbance: 0.04,
    });
    $('main').ripples({
      resolution: 128,
      dropRadius: 10, //px
      perturbance: 0.04,
      interactive: false
    });
  }
  catch (e) {
    $('.error').show().text(e);
  }

  $('.js-ripples-disable').on('click', function() {
    $('body, main').ripples('destroy');
    $(this).hide();
  });

  $('.js-ripples-play').on('click', function() {
    $('body, main').ripples('play');
  });

  $('.js-ripples-pause').on('click', function() {
    $('body, main').ripples('pause');
  });

  // Automatic drops
  setInterval(function() {
    var $el = $('main');
    var x = Math.random() * $el.outerWidth();
    var y = Math.random() * $el.outerHeight();
    var dropRadius = 20;
    var strength = 0.04 + Math.random() * 0.04;

    $el.ripples('drop', x, y, dropRadius, strength);
  }, 400);
});