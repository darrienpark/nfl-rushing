import { Injectable } from '@angular/core';


@Injectable({
    providedIn: 'root'
})
export class CsvService {

    downloadFile(data: any, filename='data') {
        let csvData = this.ConvertToCSV(data, ['Player','Team', 'Pos', 'Att', 'Att/G', 'Yds', 'Avg', 'Yds/G', 'TD', 'Lng', '1st', '1st%', '20+', '40+', 'FUM']);
        let hiddenElement = document.createElement('a');
        hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(csvData);
        hiddenElement.target = '_blank';
        hiddenElement.download = filename + '.csv';
        hiddenElement.click();
    }

    ConvertToCSV(objArray: object, headerList: any) {
         let array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
         let str = '';
         let row = '';

         for (let index in headerList) {
             row += headerList[index] + ',';
         }
         row = row.slice(0, -1);
         str += row + '\r\n';
         for (let i = 0; i < array.length; i++) {
             let line = '';
             for (let index in headerList) {
                let head = headerList[index];

                 line += array[i][head] + ',';
             }
             str += line + '\r\n';
         }
         return str;
     }
}