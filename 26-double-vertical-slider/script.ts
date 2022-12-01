const sliderContainer =
  document.querySelector<HTMLDivElement>('.slider-container')
const slideRight = document.querySelector<HTMLDivElement>('.right-slide')
const slideLeft = document.querySelector<HTMLDivElement>('.left-slide')
const upButton = document.querySelector<HTMLButtonElement>('.up-button')
const downButton = document.querySelector<HTMLButtonElement>('.down-button')

const slidesData = [
  {
    title: 'Nature flower',
    text: 'all in pink',
    color: '#fd3555',
    image:
      'https://images.unsplash.com/photo-1510942201312-84e7962f6dbb?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=da4ca7a78004349f1b63f257e50e4360&auto=format&fit=crop&w=1050&q=80',
  },
  {
    title: 'Bluuue Sky',
    text: "with it's mountains",
    color: '#2a86ba',
    image:
      'https://images.unsplash.com/photo-1486899430790-61dbf6f6d98b?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=8ecdee5d1b3ed78ff16053b0227874a2&auto=format&fit=crop&w=1002&q=80',
  },
  {
    title: 'Lonely castle',
    text: 'in the wilderness',
    color: '#252e33',
    image:
      'https://images.unsplash.com/photo-1519981593452-666cf05569a9?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=90ed8055f06493290dad8da9584a13f7&auto=format&fit=crop&w=715&q=80',
  },
  {
    title: 'Flying eagle',
    text: 'in the sunset',
    color: '#ffb866',
    image:
      'https://images.unsplash.com/photo-1508768787810-6adc1f613514?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=e27f6661df21ed17ab5355b28af8df4e&auto=format&fit=crop&w=1350&q=80',
  },
]

let reverseImageArr: string[] = []
slidesData.forEach((slideData) => {
  reverseImageArr.unshift(slideData.image)
})

slidesData.forEach((slideData, i) => {
  const slide = document.createElement('div')
  const slideImg = document.createElement('div')
  slide.style.backgroundColor = slideData.color
  slideImg.style.backgroundImage = `url(${reverseImageArr[i]})`
  slide.innerHTML = `
  <h1>${slideData.title}</h1>
  <p>${slideData.text}</p>
  `
  slideLeft?.append(slide)
  slideRight?.append(slideImg)
})

const slidesLength: number = slidesData.length
let activeSlideIndex: number = 0
if (slideLeft) {
  slideLeft.style.top = `-${(slidesLength - 1) * 100}vh`
}

if (upButton && downButton) {
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

  if (slideRight && slideLeft && sliderHeight) {
    slideRight.style.transform = `translateY(-${
      activeSlideIndex * sliderHeight
    }px)`
    slideLeft.style.transform = `translateY(${
      activeSlideIndex * sliderHeight
    }px)`
  }
}
