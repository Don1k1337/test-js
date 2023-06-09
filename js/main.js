// helper function
const applyStyles = (element, styles) => {
  Object.entries(styles).forEach(([key, value]) => {
    element.style[key] = value;
  });
}
// Main implementation of Button component based on Class
class ButtonComponent {
  constructor(defaultOptions) {
    const {
      tag = "button",
      template = "",
      display = {},
      modifiers = [],
      textValues = [],
      events = {},
      styles = {},
    } = defaultOptions;

    this.defaultOptions = {
      tag,
      template,
      display,
      modifiers,
      textValues,
      events,
      styles,
    };
  }

  generateElement(customOptions) {
    const {
      tag,
      template,
      display,
      modifiers,
      textValues,
      events,
      styles,
    } = {
      ...this.defaultOptions,
      ...customOptions,
    };

    const element = document.createElement(tag);

    if (template) {
      element.innerHTML = template;
    }

    // Default values
    element.style.display = "inline-block";
    element.style.padding = "10px 20px";
    element.style.border = "none";
    element.style.borderRadius = "4px";
    element.style.fontFamily = "Helvetica, Arial, sans-serif";
    element.style.fontSize = "16px";
    element.style.fontWeight = "bold";
    element.style.color = "#fff";
    element.style.backgroundColor = "#007bff";
    element.style.cursor = "pointer";

    element.classList.add("container__button");

    if (display) {
      applyStyles(element, display);
    }

    if (styles) {
      applyStyles(element, styles);
    }

    modifiers?.forEach((modifier) => {
      element.classList.add(modifier);
    });

    textValues?.forEach((textValue) => {
      element.innerHTML += textValue;
    });

    Object.entries(events ?? {}).forEach(([key, value]) => {
      element.addEventListener(key, value);
    });

    return element;
  }
}

const container = document.querySelector(".container");

// Usage
const defaultOptions = {
  display: {
    color: "white",
    backgroundColor: "#007bff"
  }
}

let button;

let customButton = {
  textValues: ["Submit"],
  display: {
    backgroundColor: "#28a745",
    color: "white",
    borderRadius: "5px",
    padding: "10px 20px",
    fontWeight: "bold",
  },
  modifiers: ["btn"],
  events: {
    click: () => {
      button.innerHTML = "Submitting...";
      button.disabled = true;
      setTimeout(() => {
        button.innerHTML = "Submit";
        button.disabled = false;
        button.style.backgroundColor = "#28a745";
      }, 3000);
    },
    focus: () => {
      button.style.backgroundColor = "#2f8821";
      button.style.color = "white";
    },
    blur: () => {
      button.style.backgroundColor = "#605959";
      button.style.color = "white";
    },
  },
};

// Checks if the default button is being displayed
// customButton = null

// Checks for displaying custom button if it is provided
// Otherwise displaying a default button with default properties
button = new ButtonComponent(defaultOptions)
  .generateElement
  (customButton
    ? customButton
    : { textValues: ["Default"]
  });

container.appendChild(button);
