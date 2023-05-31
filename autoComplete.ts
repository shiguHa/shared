interface AutocompleteSource {
  getWorkContents(): string[];
}

class ChromeStorageAutocompleteSource implements AutocompleteSource {
  public getWorkContents(): string[] {
    // Chromeストレージから作業内容を取得するロジックを実装する
    // ここではダミーデータを返す
    return ["作業内容1", "作業内容2", "作業内容3"];
  }
}

class AutocompleteManager {
  private autocompleteSource: AutocompleteSource;

  constructor(autocompleteSource: AutocompleteSource) {
    this.autocompleteSource = autocompleteSource;
    this.initializeAutocomplete();
  }

  private initializeAutocomplete(): void {
    const dataList = this.createDataList();
    this.attachDataList(dataList);
  }

  private createDataList(): HTMLDataListElement {
    const dataList = document.createElement("datalist");
    dataList.id = "workContentsList";
    const workContents = this.autocompleteSource.getWorkContents();
    workContents.forEach((content) => {
      const option = document.createElement("option");
      option.value = content;
      dataList.appendChild(option);
    });
    return dataList;
  }

  private attachDataList(dataList: HTMLDataListElement): void {
    document.body.appendChild(dataList);
  }
}

interface ColumnFiller {
  fillColumns(selectedContent: string, row: HTMLDivElement): void;
}

class CategoryCodeColumnFiller implements ColumnFiller {
  private categoryCodes: CategoryCode[];

  constructor(categoryCodes: CategoryCode[]) {
    this.categoryCodes = categoryCodes;
  }

  public fillColumns(selectedContent: string, row: HTMLDivElement): void {
    const selectedCategoryCode = this.categoryCodes.find((categoryCode) => categoryCode.content === selectedContent);
    if (selectedCategoryCode) {
      this.fillOtherColumns(selectedCategoryCode, row);
    }
  }

  private fillOtherColumns(categoryCode: CategoryCode, row: HTMLDivElement): void {
    const columnSelectors = {
      category: ".cellDiv.category input[type='text']",
      instraction: ".cellDiv.instraction input[type='text']",
      manufactureCode: ".cellDiv.manufactureCode input[type='text']",
      workTime: ".cellDiv.workTime input[type='text']",
      expence: ".cellDiv.expence input[type='text']",
      code: ".cellDiv.lastCell.code input[type='text']",
    };

    for (const [column, selector] of Object.entries(columnSelectors)) {
      const input = row.querySelector<HTMLInputElement>(selector);
      if (input) {
        input.value = categoryCode[column as keyof CategoryCode];
      }
    }
  }
}

interface CategoryCode {
  content: string;
  category: string;
  instraction: string;
  manufactureCode: string;
  workTime: string;
  expence: string;
  code: string;
}

// オプションページで保存された作業内容とcategory～codeの情報を取得
chrome.storage.sync.get(["workContents", "categoryCode"], function (result) {
  if (result.workContents && Array.isArray(result.workContents)) {
    const savedWorkContents: string[] = result.workContents;
    const savedCategoryCodes: CategoryCode[] = result.categoryCode || [];

    const autocompleteSource = new ChromeStorageAutocompleteSource();
    const autocompleteManager = new AutocompleteManager(autocompleteSource);
    const columnFiller = new CategoryCodeColumnFiller(savedCategoryCodes);

    const contentInputs = document.querySelectorAll<HTMLInputElement>(".cellDiv.content input[type='text']");
    contentInputs.forEach((input) => {
      input.setAttribute("list", "workContentsList");
      input.addEventListener("input", function (event) {
        const selectedContent = event.target.value;
        columnFiller.fillColumns(selectedContent, event.target.closest<HTMLDivElement>(".rowDiv"));
      });
    });
  }
});
