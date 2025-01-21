/**
 * Creates an element with the specified tag and attributes.
 *
 * @param {string} tag - The type of the HTML element to create.
 * @param {Object} attributes - A key-value pair object of attributes to set on the element.
 * @returns {HTMLElement} - The created HTML element.
 */
const createElement = (tag, attributes) => {
  const element = document.createElement(tag);
  for (const [key, value] of Object.entries(attributes)) {
    element.setAttribute(key, value);
  }
  return element;
};

/**
 * Appends children to the specified parent element.
 *
 * @param {HTMLElement} parent - The parent element to append children to.
 * @param {Array<string|HTMLElement>} children - An array of child elements or text to append to the parent.
 */
const appendChildren = (parent, children) => {
  children.forEach((child) => {
    if (typeof child === "string") {
      parent.appendChild(document.createTextNode(child));
    } else {
      parent.appendChild(child);
    }
  });
};

/**
 * Adds event handlers to the specified element.
 *
 * @param {HTMLElement} element - The element to add event handlers to.
 * @param {Object} handlers - A key-value pair object of event types and their respective handlers.
 */
const addEventHandlers = (element, handlers) => {
  for (const [event, handler] of Object.entries(handlers)) {
    element.addEventListener(event, handler);
  }
};

/**
 * Creates a new element with the specified options and appends it to the specified parent.
 *
 * @param {Object} options - Options for creating the element.
 * @param {string} [options.tag='div'] - The type of the HTML element to create.
 * @param {Object} [options.attributes={}] - A key-value pair object of attributes to set on the element.
 * @param {Array<string|HTMLElement>} [options.children=[]] - An array of child elements or text to append to the element.
 * @param {string} [options.textContent=''] - Text content to set on the element.
 * @param {Object} [options.eventHandlers={}] - A key-value pair object of event types and their respective handlers to add to the element.
 * @param {HTMLElement} [options.appendTo=null] - The parent element to append the created element to.
 * @returns {HTMLElement} - The created HTML element.
 */
export const createNewElement = ({
  tag = "div",
  attributes = {},
  children = [],
  textContent = "",
  eventHandlers = {},
  appendTo = null,
} = {}) => {
  const element = createElement(tag, attributes);

  if (textContent) {
    element.textContent = textContent;
  }

  appendChildren(element, children);
  addEventHandlers(element, eventHandlers);

  // Append to specified parent
  if (appendTo) {
    appendTo.appendChild(element);
  }

  return element;
};
