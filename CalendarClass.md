```mermaid
classDiagram
    interface IWeekData {
        +date: string
        +type: DayType
    }

    interface ICalendarData {
        +getRows(): HTMLTableRowElement[]
        +getCellValue(cell: HTMLTableCellElement): string
    }

    interface ICellClassifier {
        +classifyCell(cell: HTMLTableCellElement): DayType
    }

    class TableCalendarData {
        -table: HTMLTableElement
        +constructor(table: HTMLTableElement)
        +getRows(): HTMLTableRowElement[]
        +getCellValue(cell: HTMLTableCellElement): string
    }

    class CellClassifier {
        +classifyCell(cell: HTMLTableCellElement): DayType
    }

    class Calendar {
        -cellClassifier: ICellClassifier
        -calendarData: ICalendarData
        +constructor(calendarData: ICalendarData, cellClassifier: ICellClassifier)
        +getCalendarData(): IWeekData[][]
    }

    enum DayType {
        Workday
        Holiday
    }

    IWeekData --* Calendar
    ICalendarData <|.. TableCalendarData
    ICellClassifier <|.. CellClassifier
    ICalendarData <-- Calendar
    ICellClassifier <-- Calendar
    DayType <-- IWeekData
    TableCalendarData "1" --> "*" HTMLTableRowElement
    TableCalendarData "1" --> "*" HTMLTableCellElement
```



@startuml

interface IWeekData {
    +date: string
    +type: DayType
}

interface ICalendarData {
    +getRows(): HTMLTableRowElement[]
    +getCellValue(cell: HTMLTableCellElement): string
}

interface ICellClassifier {
    +classifyCell(cell: HTMLTableCellElement): DayType
}

class TableCalendarData {
    -table: HTMLTableElement
    +TableCalendarData(table: HTMLTableElement)
    +getRows(): HTMLTableRowElement[]
    +getCellValue(cell: HTMLTableCellElement): string
}

class CellClassifier {
    +classifyCell(cell: HTMLTableCellElement): DayType
}

class Calendar {
    -cellClassifier: ICellClassifier
    -calendarData: ICalendarData
    +Calendar(calendarData: ICalendarData, cellClassifier: ICellClassifier)
    +getCalendarData(): IWeekData[][]
}

enum DayType {
    Workday
    Holiday
}

IWeekData --* Calendar
ICalendarData <|.. TableCalendarData
ICellClassifier <|.. CellClassifier
ICalendarData <-- Calendar
ICellClassifier <-- Calendar
DayType <-- IWeekData
TableCalendarData "1" --> "*" HTMLTableRowElement
TableCalendarData "1" --> "*" HTMLTableCellElement

@enduml

