
// Imports
import { createNewElement } from './utils.js';

export default class ToastMessaging {
  constructor(parent) {
    this.parent = parent;
  }

  showMessage(message, type = "info") {
    const toast = createNewElement({
      attributes: { class: `toast toast-${type}` },
      children:[
        createNewElement({
          tag: "i",
          attributes: { class: `toast-icon toast-${type} ${this.getType(type)}` },
        }),
        createNewElement({
          attributes: { class: "toast-message" },
          textContent: message
        }),
        createNewElement({
          tag: "i",
          attributes: { class: "toast-close fas fa-close" },
        }),
        createNewElement({
          tag: "div",
          attributes: { class: `toast-border toast-${type}` },
        }),
      ],
      appendTo: this.parent
    });
    setInterval(() => {
      this.removeToast(toast);
    }, 3000);
  }

  getType(type) {
    switch (type) {
      case "error":
        return "fas fa-exclamation-circle";
      case "success":
        return "fas fa-check-circle";
      case "warning":
        return "fas fa-exclamation-triangle";
      default:
        return "fas fa-info-circle";
    }
  }

  removeToast(toast) {
    toast.remove();
  }
}