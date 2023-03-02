function slider({
  container,
  slide,
  nextArrow,
  prevArrow,
  totalCounter,
  currentCounter,
  wrapper,
  field,
}) {
  // SLIDER
  const slides = document.querySelectorAll(slide),
    next = document.querySelector(nextArrow),
    prev = document.querySelector(prevArrow),
    total = document.querySelector(totalCounter),
    current = document.querySelector(currentCounter),
    slidesWrapper = document.querySelector(wrapper),
    slidesField = document.querySelector(field),
    width = window.getComputedStyle(slidesWrapper).width,
    slider = document.querySelector(container);

  let slideIdx = 1,
    offset = 0;

  function setZero(current, total) {
    if (slides.length < 10) {
      current.textContent = `0${slideIdx}`;
      if (total) {
        total.textContent = `0${slides.length}`;
      }
    } else {
      current.textContent = slideIdx;
      if (total) {
        total.textContent = slides.length;
      }
    }
  }
  setZero(current, total);

  slidesField.style.cssText = `
    width: ${100 * slides.length}%; 
    display:flex;
    transition:.7s ease all;
  `;
  slidesWrapper.style.overflow = "hidden";
  slides.forEach((slide) => (slide.style.width = width));

  function setDotOpacity(arg) {
    arg.forEach((dot) => (dot.style.opacity = ".5"));
    arg[slideIdx - 1].style.opacity = 1;
  }
  const indicators = document.createElement("ol");
  const dots = [];
  indicators.classList.add("carousel-indicators");
  slider.append(indicators);

  for (let i = 0; i < slides.length; i++) {
    const dot = document.createElement("li");
    dot.setAttribute("data-slide-to", i + 1);
    dot.classList.add("carousel-dot");
    if (i === 0) {
      dot.style.opacity = 1;
    }
    indicators.append(dot);
    dots.push(dot);
  }
  function stringToNumber(arg) {
    return +arg.slice(0, -2);
  }
  function fixedOfst(offset) {
    return +offset.toFixed(2);
  }
  next.addEventListener("click", () => {
    if (fixedOfst(offset) === stringToNumber(width) * (slides.length - 1)) {
      offset = 0;
    } else {
      offset += stringToNumber(width);
    }
    slidesField.style.transform = `translateX(-${fixedOfst(offset)}px)`;
    if (slideIdx === slides.length) {
      slideIdx = 1;
    } else {
      slideIdx++;
    }
    setZero(current);
    setDotOpacity(dots);
  });
  prev.addEventListener("click", () => {
    if (fixedOfst(offset) === 0) {
      offset = stringToNumber(width) * (slides.length - 1);
    } else {
      offset -= stringToNumber(width);
    }
    slidesField.style.transform = `translateX(-${fixedOfst(offset)}px)`;
    if (slideIdx === 1) {
      slideIdx = slides.length;
    } else {
      slideIdx--;
    }
    setZero(current);
    setDotOpacity(dots);
  });
  dots.forEach((dot) => {
    dot.addEventListener("click", (e) => {
      const slideTo = e.target.getAttribute("data-slide-to");
      slideIdx = slideTo;
      offset = stringToNumber(width) * (slideTo - 1);
      slidesField.style.transform = `translateX(-${fixedOfst(offset)}px)`;
      setZero(current);
      setDotOpacity(dots);
    });
  });
}
export default slider;
