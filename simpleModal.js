import { closeModal, openModal } from "./utils/common";

const modal = ({
  containerSelector = `.js-modal-container`,
  modalSelector = `.js-modal`,
  openButtonSelector = `.js-modal-open`,
  closeButtonSelector = `.js-modal-close`,
  openClass = `show`,
  overflowBodyClass = `js-modal-open`,
}) => {
  const modalContainers = document.querySelectorAll(containerSelector);

  if (modalContainers.length) {
    modalContainers.forEach((container) => {
      const modalElement = container.querySelector(modalSelector);
      const openButtonElement = container.querySelector(openButtonSelector);
      const closeButtonElements = container.querySelectorAll(closeButtonSelector);

      // Открытие модального окна
      const showModal = (evt) => {
        openModal(modalElement, `flex`);
        // fadeIn(modalElement, 300, 'flex');
        document.body.classList.add(overflowBodyClass);
        closeButtonElements.forEach((closeButtonElement) => {
          closeButtonElement.addEventListener(`click`, hideModal);
        });
        modalElement.addEventListener(`click`, onLayoutClick);
      };

      // Закрытие модального окна
      const hideModal = () => {
        closeModal(modalElement);
        document.body.classList.remove(overflowBodyClass);
        closeButtonElements.forEach((closeButtonElement) => {
          closeButtonElement.removeEventListener(`click`, hideModal);
        });
        modalElement.removeEventListener(`click`, onLayoutClick);
      };

      // Закртыие модального окна при клике вне окна
      const onLayoutClick = (evt) => {
        if (evt.target === evt.currentTarget) {
          hideModal();
        }
      };

      if (openButtonElement) {
        openButtonElement.addEventListener(`click`, showModal);
      }
    });
  }
};

export default modal;
