import "./styles.css";
import autoComplete from "@tarekraafat/autocomplete.js";

const autoCompleteJS = new autoComplete({
  data: {
    src: ["構成", "ゆー", "y"]
  },
  selector: "#autoComplete",
  threshold: 0,
  debounce: 0,
  maxResults: 5,
  trigger: (query) => {
    return true;
  },
  resultItem: {
    highlight: true
  },
  events: {
    input: {
      focus: (event) => {
        autoCompleteJS.start();
      },
      selection: (event) => {
        const selection = event.detail.selection.value;
        autoCompleteJS.input.value = selection;
      }
    }
  }
});

document.querySelector("#open").addEventListener("click", () => {
  autoCompleteJS.open();
});
