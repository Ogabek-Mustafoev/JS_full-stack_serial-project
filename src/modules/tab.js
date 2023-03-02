function tab(tabsSelector, tabsContentSelector, activeClass) {
  // Tabs
  const tabs = document.querySelectorAll(tabsSelector),
    tabsContent = document.querySelectorAll(tabsContentSelector);

  function hideTabContent() {
    tabsContent.forEach((item) => {
      item.classList.add("hide");
      item.classList.remove("show", "fade");
    });
    tabs.forEach((item) => item.classList.remove(activeClass));
  }
  function showTabContent(i = 0) {
    tabsContent[i].classList.add("show", "fade");
    tabsContent[i].classList.remove("hide");
    tabs[i].classList.add(activeClass);
  }
  hideTabContent();
  showTabContent();

  tabs.forEach((item, idx) => {
    item.addEventListener("click", () => {
      hideTabContent();
      showTabContent(idx);
    });
  });
}
export default tab;
