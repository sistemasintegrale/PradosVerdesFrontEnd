import { Injectable } from '@angular/core';
import { Workbook } from "exceljs";
import * as FileSaver from "file-saver";
import { UsuarioData } from 'src/app/models/usuario/usuario-data';
import { AuthService } from '../auth/auth.service';

const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';
@Injectable({
  providedIn: 'root'
})
export class Excelv2Service {
  user!: UsuarioData;
  constructor(
    public authservice: AuthService
  ) {
    this.user = authservice.usuario;
  }

  exportar(
    reportHeading: string,
    reportSubHeading: string,
    headersArray: string[],
    json: any[],
    footerData: any,
    excelFileName: string,
    sheetName: string
  ) {
    const header = headersArray;
    const data = json

    // CREATE A WORKBOOK AND WORKSHEET
    const workbook = new Workbook();
    workbook.creator = this.user.usua_nombre_usuario;
    workbook.lastModifiedBy = this.user.usua_nombre_usuario;
    workbook.created = new Date();
    workbook.modified = new Date();
    const worksheet = workbook.addWorksheet(sheetName);

    // ADD HEADER ROW
    worksheet.addRow([]);
    worksheet.mergeCells('A1:' + this.numToAlpha(header.length - 1) + '1');
    worksheet.getCell('A1').value = reportHeading;
    worksheet.getCell('A1').alignment = { horizontal: 'center' };
    worksheet.getCell('A1').font = { size: 15, bold: true };

    if (reportSubHeading !== '') {
      worksheet.addRow([]);
      worksheet.mergeCells('A2:' + this.numToAlpha(header.length - 1) + '2');
      worksheet.getCell('A2').value = reportSubHeading;
      worksheet.getCell('A2').alignment = { horizontal: 'center' };
      worksheet.getCell('A2').font = { size: 15, bold: false };
    }

    worksheet.addRow([]);

    // ADD HEADER ROW
    const hearderRow = worksheet.addRow(header);
    worksheet.autoFilter={
      from : 'A4',
      to : this.numToAlpha(header.length - 1)+'4'
    }
    // CELL STYLE : FILL AND BORDER
    hearderRow.eachCell((cell, index) => {
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'ede9fe' },
        bgColor: { argb: 'FF0000FF' } 
      };
      cell.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
      cell.font = { size: 12, bold: true }

      worksheet.getColumn(index).width = header[index - 1].length < 20 ? 20 : header[index - 1].length;
    });

    // GET ALL COLUMNS FROM JSON
    let columnsArray: any[];
    for (const key in json) {
      if (json.hasOwnProperty(key)) {
        columnsArray = Object.keys(json[key])
      }
    };

    // ADD DATA AND CONDITIONAL 

    data.forEach((element: any) => {
      const eachRow: any[] = [];
      columnsArray.forEach((column) => {
        eachRow.push(element[column]);
      });

      if (element.isDeleted === 'Y') {
        const deleteRow = worksheet.addRow(eachRow);
        deleteRow.eachCell((cell)=>{
          cell.font = {name : 'Calibri',family : 4,size : 11, bold : false, strike : true};
        });
      }else{
        worksheet.addRow(eachRow)
      }

    });
debugger
    let lastRow = worksheet.lastRow?.number! + 1;

    for (let index = 5; index < lastRow; index++) {
      worksheet.getCell(index,16).type.toFixed(2)
      
    }

    worksheet.addRow([]);

    // FOOTER DATA ROW
    if(footerData != null){
      footerData.forEach((element :any) => {

        const eachRow: any[] =[];
        element.forEach((val:any) => {
          eachRow.push(val)
        });

        const footerRow = worksheet.addRow(eachRow);
        footerRow.eachCell((cell)=>{
          cell.font = {bold : true}
        })

      });
    }

    // SAVE EXCEL FILE
    workbook.xlsx.writeBuffer().then((data:ArrayBuffer)=>{
      const blob = new Blob([data],{type : EXCEL_TYPE});
      FileSaver.saveAs(blob,excelFileName+EXCEL_EXTENSION)
    })

  }

  numToAlpha(num: number) {
    let alpha = '';
    for (; num >= 0; num = parseInt((num / 26).toString(), 10) - 1) {
      alpha = String.fromCharCode(num % 26 + 0x41) + alpha;

    }

    return alpha;
  }

}

