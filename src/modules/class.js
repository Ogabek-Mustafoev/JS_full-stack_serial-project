function classes() {
  // Class
  class MenuCard {
    constructor(srs, alt, title, desc, price, parentSelector, ...classes) {
      this.srs = srs;
      this.alt = alt;
      this.title = title;
      this.desc = desc;
      this.price = price;
      this.parentSelector = document.querySelector(parentSelector);
      this.classes = classes;
      this.transfer = 1;
      this.changeToUZS();
    }

    changeToUZS() {
      this.price = this.price * this.transfer;
    }

    render() {
      this.classes.map((item) => console.log(item));
      const element = document.createElement("div");
      if (this.classes.length === 0) {
        element.classList.add("menu__item");
      } else {
        this.classes.forEach((item) => element.classList.add(item));
      }
      element.innerHTML = `
        <img src=${this.srs} alt=${this.alt} />
        <h3 class="menu__item-subtitle">${this.title}</h3>
        <div class="menu__item-descr">${this.desc}</div>
        <div class="menu__item-divider"></div>
        <div class="menu__item-price">
          <div class="menu__item-cost">Price:</div>
          <div class="menu__item-total"><span>
          ${this.price.toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
      }).slice(0, -3)}
          </span> /month</div>
        </div>
      `;
      this.parentSelector.append(element);
    }
  }
  /* jshint ignore:start */
  axios.get("http://localhost:3000/menu").then((data) => {
    data.data.map(({ img, altImg, subs, descr, price }) => {
      new MenuCard(
        img,
        altImg,
        subs,
        descr,
        price,
        ".menu .container"
      ).render();
    });
  });
  /* jshint ignore:end */
}
export default classes;
