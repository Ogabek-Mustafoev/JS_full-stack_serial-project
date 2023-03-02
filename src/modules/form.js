import { closeModal, openModal } from "./modal";
import { postData } from "../server/server";

function form(formSelector, modalTimerId) {
  // Form
  const msg = {
    loading: "./img/spinner.svg",
    success: "Thanks for contacting us!",
    failure: "Something went wrong!",
  };
  const forms = document.querySelectorAll(formSelector);
  forms.forEach((form) => bindPostData(form));

  function bindPostData(form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const statusMessage = document.createElement("img");
      statusMessage.src = msg.loading;
      statusMessage.style.cssText = `
        display:block;
        margin:0 auto;
      `;
      form.insertAdjacentElement("afterend", statusMessage);

      const formData = new FormData(form);

      const json = JSON.stringify(Object.fromEntries(formData.entries()));

      postData("http://localhost:3000/request", json)
        .then(() => {
          showThanksModal(msg.success);
          statusMessage.remove();
        })
        .catch(() => {
          showThanksModal(msg.failure);
        })
        .finally(() => {
          form.reset();
        });
    });
  }

  function showThanksModal(message) {
    const prevModalDialog = document.querySelector(".modal__dialog");
    prevModalDialog.classList.add("hide");
    openModal(".modal", modalTimerId);

    const thansModal = document.createElement("div");
    thansModal.classList.add("modal__dialog");
    thansModal.innerHTML = `
      <div class="modal__content">
        <div data-close class="modal__close">&times;</div>
        <div class="modal__title">${message}</div>
      </div>
    `;
    document.querySelector(".modal").append(thansModal);
    setTimeout(() => {
      thansModal.remove();
      prevModalDialog.classList.remove("hide");
      prevModalDialog.classList.add("show");
      closeModal(".modal");
    }, 4000);
  }
}
export default form;
