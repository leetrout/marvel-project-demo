/* global ScrollMagic, makeChart */
let spideyInfo;

let render = () => {
  let comicsCnt = document.querySelector('.comics.big-num')
  comicsCnt.innerText = spideyInfo.comics.available;
  
  let profile = document.querySelector('.profile');
  let pic = document.createElement('img');
  pic.setAttribute("alt", spideyInfo.name);
  let url = spideyInfo.thumbnail.path;
  // convert thumbnail to https
  url = url.replace(/p:\/\//, 'ps://');
  pic.setAttribute("src", `${url}.${spideyInfo.thumbnail.extension}`)
  profile.append(pic);
  let p = document.createElement('p');
  p.innerText = spideyInfo.description;
  profile.append(p);
  makeChart(spideyInfo);
}

let init = () => {
  // get the loading element
  let loading = document.querySelector('.loading');
  
  // listen for the transition to complete and remove it
  loading.addEventListener("transitionend", () => {
    loading.remove();
  });
  
  // get our spiderman data
  fetch("/spiderman")
    .then((resp) => resp.json())
    .then((data) => {
      spideyInfo = data[0];
      render();
      console.log(spideyInfo);
      loading.classList.add("fade-out");
    }); 
}

window.addEventListener("load", init);

// view-source:http://scrollmagic.io/examples/basic/section_wipes_natural.html
window.addEventListener("DOMContentLoaded", () => {
  var controller = new ScrollMagic.Controller({
    globalSceneOptions: {
      triggerHook: 'onLeave'
    }
  });
  
  // get all slides
  var slides = document.querySelectorAll(".panel");
  
  let header = document.querySelector('header');
  
  new ScrollMagic.Scene({
      triggerElement: header
    })
    .setPin(header,  {pushFollowers: false})
    .addTo(controller);

  // create scene for every slide
  for (var i=0; i < slides.length; i++) {
  new ScrollMagic.Scene({
      triggerElement: slides[i]
    })
    .setPin(slides[i])
    .addTo(controller);
  }
});