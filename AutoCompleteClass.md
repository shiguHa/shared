classDiagram
    class AutocompleteSource {
        +getWorkContents(): string[]
    }

    class ChromeStorageAutocompleteSource {
        +getWorkContents(): string[]
    }

    class AutocompleteManager {
        -autocompleteSource: AutocompleteSource
        +initializeAutocomplete(): void
        +createDataList(): HTMLDataListElement
        +attachDataList(dataList: HTMLDataListElement): void
    }

    interface ColumnFiller {
        +fillColumns(selectedContent: string, row: HTMLDivElement): void
    }

    class CategoryCodeColumnFiller {
        -categoryCodes: CategoryCode[]
        +fillColumns(selectedContent: string, row: HTMLDivElement): void
        -fillOtherColumns(categoryCode: CategoryCode, row: HTMLDivElement): void
    }

    class CategoryCode {
        +content: string
        +category: string
        +instraction: string
        +manufactureCode: string
        +workTime: string
        +expence: string
        +code: string
    }

    class AutocompleteManager ..> AutocompleteSource
    AutocompleteManager --> HTMLDataListElement
    AutocompleteManager ..> ColumnFiller
    CategoryCodeColumnFiller --> CategoryCode

    class ChromeStorageAutocompleteSource ..|> AutocompleteSource
