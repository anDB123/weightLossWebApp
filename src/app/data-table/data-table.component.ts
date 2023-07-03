import { Component } from '@angular/core';
import { WeightDateDb } from '../weight-date-db';
import { UpdateChartService } from '../update-chart.service';


@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss'],
})

export class DataTableComponent {
  displayedColumns: string[] = ['date', 'weight'];
  constructor(private _updateChartService: UpdateChartService) { }

  deleteData() {
    let tempWeightDateDb: WeightDateDb[] = [];
    localStorage.setItem("weightDb", JSON.stringify(tempWeightDateDb));
    this._updateChartService.updateBoth();

  }
  viewDataTable() {
    console.log("viewDataTable (currently non-functional)");
  }

  downloadDataAsCSV() {

    let jsondata = this._updateChartService.getWeightDateDb();
    if (jsondata.length == 0) {
      alert("No data to download");
      return;
    }

    const csvdata = this.csvmaker(jsondata);
    this.download(csvdata);

  }
  csvmaker = function (data: any) {


    let csvRows = [];
    const headers = Object.keys(data[0]);
    csvRows.push(headers.join(','));

    for (const row of data) {
      const values = headers.map(e => {
        return row[e]
      })
      csvRows.push(values.join(','))
    }

    return csvRows.join('\n')
  }
  download(data: any) {

    const blob = new Blob([data], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')

    a.setAttribute('href', url)
    a.setAttribute('download', 'download.csv');
    a.click()
  }
  toggleDataTable(): void {
    var additionalInput = document.getElementById("dataTable");
    if (additionalInput)

      if (additionalInput.style.display === "block") {
        additionalInput.style.display = "none";
      } else {
        additionalInput.style.display = "block";
      }
  }
}



