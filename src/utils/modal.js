import { createNewElement } from "./utils.js";

export default class Modal {
  constructor(title, options = {}) {
    this.title = title;
    this.options = {
      width: options.width || "400px",
      height: options.height || "200px",
    };

    this.isResizing = false;
    this.isDragging = false;

    this.createWindow();
  }

  createWindow() {
    this.createFrame();
    this.createHeader();
    this.createContent();
  }

  createFrame() {
    const windowWidth = parseInt(this.options.width);
    const windowHeight = parseInt(this.options.height);
  
    this.window = createNewElement({
      tag: "div",
      attributes: {
        class: "modal",
        style: {
          width: this.options.width,
          height: this.options.height,
          position: "fixed",
          top: `calc(50% - ${windowHeight / 2}px)`,
          left: `calc(50% - ${windowWidth / 2}px)`,
        },
      },
      appendTo: document.body,
    });
  }
  
  createHeader() {
    const header = createNewElement({
      tag: "div",
      attributes: {
        class: "modal-header flex-row align-center justify-between",
        style: { cursor: "move" },
      },
      appendTo: this.window,
      eventHandlers: { mousedown: (e) => this.setDraggable(e) },
    });

    const title = createNewElement({
      tag: "h2",
      textContent: this.title,
      appendTo: header,
    });

    const close = createNewElement({
      tag: "button",
      attributes: {
        class: "modal-close tooltip-bottom-right", tooltip: "Close",
      },
      children: [
        createNewElement({
          tag: "i",
          attributes: {
            class: "fas fa-times",
          },
        }),
      ],
      eventHandlers: { click: () => this.close() },
      appendTo: header,
    });
  }

  createContent() {
    this.content = createNewElement({
      tag: "div",
      attributes: {
        class: "modal-content",
      },
      appendTo: this.window,
    });

    this.buttonContainer = createNewElement({
      tag: "div",
      attributes: {
        class: "button-container",
      },
      appendTo: this.window,
    });

    this.resizer = createNewElement({
      tag: "img",
      attributes: {
        class: "resizer",
        src: "/src/static/icons/resizer.png",
        alt: "Resize icon",
      },
      appendTo: this.window,
      eventHandlers: { mousedown: (e) => this.setResizable(e) },
    });
  }

  createOverlay() {
    this.overlay = createNewElement({
      tag: "div",
      attributes: {
        class: "modal-overlay",
      },
      appendTo: document.body,
      eventHandlers: { click: () => this.close() },
    });
  }

  open() {
    this.window.style.display = "flex";
    this.createOverlay();
  }

  close() {
    this.window.style.display = "none";
    delete this;
    this.overlay.remove();
  }

  setContent(content) {
    this.content.innerHTML = "";
    this.content.appendChild(content);
  }

  addButton(text, callback) {
    const button = createNewElement({
      tag: "button",
      textContent: text,
      appendTo: this.buttonContainer,
      eventListeners: {
        click: callback,
      },
    });
  }

  setResizable(e) {
    if (this.isDragging) return;
    this.isResizing = true;
    this.resize(e);
  }

  resize(e) {
    e.preventDefault();
    const startX = e.clientX;
    const startY = e.clientY;
    const startWidth = this.window.offsetWidth;
    const startHeight = this.window.offsetHeight;

    const resizeMouseMoveHandler = (e) => {
      const dx = e.clientX - startX;
      const dy = e.clientY - startY;

      this.window.style.width = startWidth + dx + "px";
      this.window.style.height = startHeight + dy + "px";
    };

    const resizeMouseUpHandler = () => {
      this.isResizing = false;
      document.removeEventListener("mousemove", resizeMouseMoveHandler);
      document.removeEventListener("mouseup", resizeMouseUpHandler);
    };

    document.addEventListener("mousemove", resizeMouseMoveHandler);
    document.addEventListener("mouseup", resizeMouseUpHandler);
  }

  setDraggable(e) {
    if (this.isResizing) return;
    this.isDragging = true;
    this.drag(e);
  }

  drag(e) {
    e.preventDefault();
    const startX = e.clientX;
    const startY = e.clientY;
    const startLeft = this.window.offsetLeft;
    const startTop = this.window.offsetTop;

    const mouseMoveHandler = (e) => {
      const dx = e.clientX - startX;
      const dy = e.clientY - startY;

      this.window.style.left = startLeft + dx + "px";
      this.window.style.top = startTop + dy + "px";
    };

    const mouseUpHandler = () => {
      this.isDragging = false;
      document.removeEventListener("mousemove", mouseMoveHandler);
      document.removeEventListener("mouseup", mouseUpHandler);
    };

    document.addEventListener("mousemove", mouseMoveHandler);
    document.addEventListener("mouseup", mouseUpHandler);
  }
}
