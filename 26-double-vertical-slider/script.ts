const sliderContainer =
  document.querySelector<HTMLDivElement>('.slider-container')
const slideRight = document.querySelector<HTMLDivElement>('.right-slide')
const slideLeft = document.querySelector<HTMLDivElement>('.left-slide')
const upButton = document.querySelector<HTMLButtonElement>('.up-button')
const downButton = document.querySelector<HTMLButtonElement>('.down-button')

let slidesLength: number
let activeSlideIndex: number = 0
if (slideRight != null && slideLeft != null && slideLeft != null) {
  slidesLength = slideRight.querySelectorAll('div').length

  slideLeft.style.top = `-${(slidesLength - 1) * 100}vh`
}

if (upButton != null && downButton != null) {
  upButton.addEventListener('click', () => changeSlide('up'))
  downButton.addEventListener('click', () => changeSlide('down'))
}

const changeSlide = (direction: string) => {
  let sliderHeight
  if (sliderContainer) {
    sliderHeight = sliderContainer.clientHeight
  }
  if (direction === 'up') {
    activeSlideIndex++
    if (activeSlideIndex > slidesLength - 1) {
      activeSlideIndex = 0
    }
  } else if (direction === 'down') {
    activeSlideIndex--
    if (activeSlideIndex < 0) {
      activeSlideIndex = slidesLength - 1
    }
  }

  if (slideRight != null && slideLeft != null && sliderHeight != undefined) {
    slideRight.style.transform = `translateY(-${
      activeSlideIndex * sliderHeight
    }px)`
    slideLeft.style.transform = `translateY(${
      activeSlideIndex * sliderHeight
    }px)`
  }
}
