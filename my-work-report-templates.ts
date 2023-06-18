import "./style.css";
import { computePosition, flip, shift, offset, arrow } from "@floating-ui/dom";

// テンプレートオブジェクトの型定義
interface Template {
  displayText: string;
  description: string;
}

// テンプレートの配列
const templates: Template[] = [
  { displayText: "残2", description: "残業" },
  { displayText: "残3", description: "残業3h" }
];
const templateContainer = document.querySelector<HTMLDivElement>(
  "#template-container"
)!;

function updateTooltip(element: HTMLElement, tooltip: HTMLDivElement) {
  computePosition(element, tooltip, {
    placement: "top",
    middleware: [offset(6), flip(), shift({ padding: 5 })]
  }).then(({ x, y }) => {
    Object.assign(tooltip.style, {
      left: `${x}px`,
      top: `${y}px`
    });
  });
}

function showTooltip(element: HTMLElement, tooltip: HTMLDivElement) {
  tooltip.style.display = "block";
  updateTooltip(element, tooltip);
}

function hideTooltip(tooltip: HTMLDivElement) {
  tooltip.style.display = "";
}

function renderTemplates() {
  // 一旦表示をクリア
  templateContainer.innerHTML = "";

  templates.forEach((template) => {
    const templateElem = document.createElement("div");
    templateElem.classList.add("template");
    templateElem.innerHTML = `
      <div>${template.displayText}</div>
      <div class="tooltip" role="tooltip">${template.description}</div>
    `;
    templateElem.addEventListener("click", () => alert("ok"));
    templateContainer.appendChild(templateElem);

    const tooltipElem = templateElem.querySelector<HTMLDivElement>(".tooltip")!;
    templateElem.addEventListener("mouseenter", () =>
      showTooltip(templateElem, tooltipElem)
    );
    templateElem.addEventListener("mouseleave", () => hideTooltip(tooltipElem));
  });

  // 設定用で、dialogを作成する。
  const templateDialogElement = document.createElement("dialog");
  templateDialogElement.classList.add("dialog-element");
  templateDialogElement.innerHTML = `
    <Button class="close">閉じる</Button>
  `;
  const cancelButton = templateDialogElement.querySelector<HTMLButtonElement>(
    ".close"
  )!;
  cancelButton.addEventListener("click", () => templateDialogElement.close());

  document.body.appendChild(templateDialogElement);

  // ダイアログを開く用を作成する。
  const templateElem = document.createElement("div");
  templateElem.classList.add("template");
  templateElem.innerHTML = `
    <div>...</div>
  `;
  templateElem.addEventListener("click", () =>
    templateDialogElement.showModal()
  );
  templateContainer.appendChild(templateElem);
}

renderTemplates();
