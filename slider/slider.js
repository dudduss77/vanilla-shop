"use strict"

const imagesArray = [
  {
    url: "1.jpg"
  },
  {
    url: "2.jpg"
  },
  {
    url: "3.jpg"
  }
]

var leftArrow = document.getElementById("sliderWrapper__leftArrow");
var rightArrow = document.getElementById("sliderWrapper__rightArrow");
leftArrow.addEventListener('click', moveLeft);
rightArrow.addEventListener('click', moveRight);

var sliderItems = document.getElementsByClassName('slider__item');

document.addEventListener('DOMContentLoaded', checkArrowDisplay);

for(let i = 0; i < sliderItems.length; i++) {
  sliderItems[i].children[0].style.backgroundImage = "url('./slider/images/" + imagesArray[i].url + "')";
  sliderItems[i].style.transform = "translateX("+ i * 100+"%)";
}

function moveLeft() {
  for(let i = 0; i < sliderItems.length; i++) {
    let transformValue = getActualTransformValue(sliderItems[i]);
      
    sliderAnimate(sliderItems[i], transformValue, 100);

    sliderItems[i].setAttribute("style", "transform: translateX(" + (transformValue + 100) +"%)")
  }
  checkArrowDisplay();
}

function moveRight() {
    for(let i = 0; i < sliderItems.length; i++) {
      let transformValue = getActualTransformValue(sliderItems[i]);

      sliderAnimate(sliderItems[i], transformValue, -100);

      sliderItems[i].setAttribute("style", "transform: translateX(" + (transformValue - 100) +"%)")
    }
    checkArrowDisplay();
  }

function getActualTransformValue(item) {
  let str = item.getAttribute("style");
  const regex = /-?\d+/g;
  return parseInt(str.match(regex)[0]);
}

function sliderAnimate(item, transformValue, deltaTransfromValue) {
  item.animate([
    {transform: 'translateX(' + transformValue + '%)'},
    {transform: 'translateX(' + (transformValue + deltaTransfromValue) + '%)'}
  ], {
    duration: 1000,
    fill: 'forwards'
  });
}

function checkArrowDisplay() {
  if(getActualTransformValue(sliderItems[0]) == 0) {
    leftArrow.style.display = 'none';
  } else if(getActualTransformValue(sliderItems[sliderItems.length -1]) == 0) {
    rightArrow.style.display = 'none';
  }else {
    leftArrow.style.display = 'flex';
    rightArrow.style.display = 'flex';
  }
}