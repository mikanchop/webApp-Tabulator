function getData() {
    const ss = SpreadsheetApp.getActiveSpreadsheet()
    const ws = ss.getSheetByName('Customers')
    const dataRange = ws.getRange('A1').getDataRegion()
    const data = dataRange.getDisplayValues()
    const headers = data.shift()

    const jsData = data.map(r => {
        const tempObject = {}
        headers.forEach((header, i) => {
            tempObject[header] = r[i]
        })
        return tempObject
    })

    return jsData
} // end getData function


function editCell(props) {
    const ss = SpreadsheetApp.getActiveSpreadsheet()
    const ws = ss.getSheetByName('Customers')
    const idCellMatched = ws.getRange("A2:A").createTextFinder(props.id).matchEntireCell(true).matchCase(true).findNext()
    const columnCellMatched = ws.getRange("1:1").createTextFinder(props.field).matchEntireCell(true).matchCase(true).findNext()

    if(idCellMatched === null) throw new Error('No Matching Record')
    if(columnCellMatched === null) throw new Error('Invalid Field')

    const recordRowNumber = idCellMatched.getRow()
    const recordColumnNumber = columnCellMatched.getColumn()
    ws.getRange(recordRowNumber,recordColumnNumber).setValue(props.val)

}


function addRecord() {
    const ss = SpreadsheetApp.getActiveSpreadsheet()
    const ws = ss.getSheetByName('Customers')

    const timestamp = new Date().getTime().toString()
    const newId = timestamp.substring(0, 5) + '-' + timestamp.toString()

    ws.appendRow([newId])

    return newId
}