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





// import "./styles.css";
// import autoComplete from "@tarekraafat/autocomplete.js";

// const autoCompleteJS = new autoComplete({
//   data: {
//     src: [
//       { value: "月", index: 1 },
//       { value: "月", index: 2 },
//       { value: "月", index: 3 },
//       { value: "月", index: 4 },
//       { value: "月5", index: 5 }
//     ],
//     keys: ["value"]
//   },
//   selector: "#autoComplete",
//   threshold: 0,
//   debounce: 0,
//   maxResults: 3,
//   trigger: (query) => {
//     return true;
//   },
//   resultsList: {
//     noResults: true
//   },
//   resultItem: {
//     highlight: true, //Does not work with custom search engine. You'll need to implement this yourself if necessary
//     element: (element, data) => {
//       console.log(element, data);
//       element.style = "display: flex; justify-content: space-between;";
//       element.innerHTML = `
//       <span style="text-overflow: ellipsis; white-space: nowrap; overflow: hidden;">
//           ${data.match}
//       </span>
//       <span style="display: flex; align-items: center; font-size: 13px; font-weight: 100; text-transform: uppercase; color: rgba(0,0,0,.2);">
//           ${data.value.index}
//       </span>`;
//       // Here you can modify the div containing your data (item) and your data (data).
//     }
//   },
//   events: {
//     input: {
//       focus: (event) => {
//         autoCompleteJS.start();
//       },
//       selection: (event) => {
//         console.log(event.detail);
//         const selection = event.detail.selection.value.value;
//         autoCompleteJS.input.value = selection;
//       }
//     }
//   }
// });

// document.querySelector("#open").addEventListener("click", () => {
//   autoCompleteJS.open();
// });
