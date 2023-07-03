import { Injectable } from '@angular/core';
import { WeightDateDb } from './weight-date-db';
import { Chart } from 'chart.js';

@Injectable({
  providedIn: 'root'
})
export class UpdateChartService {
  label: string = "Weight";
  dateArray: string[] = [];
  valueArray = [];
  myData = {// values on X-Axis
    labels: this.dateArray,
    datasets: [
      {
        label: this.label,
        data: this.valueArray,
        backgroundColor: 'blue'
      },
    ]
  }
  constructor() { }
  public chart: any = new Chart("BarChart", {
    type: 'line', //this denotes tha type of chart
    data: this.myData,
    options: {
      responsive: true,
      maintainAspectRatio: false,
    }
  });
  convertDateStringToMilliseconds(date: string): number {
    let dateArray = date.split("/");
    console.log(date);
    let year = Number(dateArray[2]);
    let month = Number(dateArray[0]);
    let day = Number(dateArray[1]);
    let dateObject = new Date(year, month - 1, day);
    console.log(dateObject);
    return dateObject.getTime();
  }
  public table: HTMLTableElement = <HTMLTableElement>document.getElementById("weightDateTable");
  getWeightDateDb(): WeightDateDb[] {
    let tempWeightDateDb: WeightDateDb[] = JSON.parse(localStorage.getItem("weightDb") || '{}', this.dateTimeReviver);

    tempWeightDateDb.sort((a, b) => this.convertDateStringToMilliseconds(a.date) - this.convertDateStringToMilliseconds(b.date));
    return tempWeightDateDb;
  }
  updateBarChart(dateArray: string[], valueArray: Number[], label: string): any {
    if (this.chart)
      this.chart.destroy();
    let myData = {// values on X-Axis
      labels: dateArray,
      datasets: [
        {
          label: label,
          data: valueArray,
          backgroundColor: 'blue'
        },
      ]
    }
    this.chart = new Chart("BarChart", {
      type: 'line', //this denotes tha type of chart
      data: myData,
      options: {
        responsive: true,
        maintainAspectRatio: false,
      }
    });
    return this.chart;
  }
  updateTable(): void {

    let table = <HTMLTableElement>document.getElementById("weightDateTable");
    table.innerHTML = "";
    let row = table.insertRow(-1);
    let c1 = row.insertCell(0);
    let c2 = row.insertCell(1);
    let c3 = row.insertCell(2);

    // Add data to c1 and c2
    c1.innerText = "Date"
    c2.innerText = "Weight"
    c3.innerText = "Delete?"

    for (const entry of this.getWeightDateDb()) {
      this.addRow(entry.date, entry.weight.toString())
    }

  }
  addRow(date: string, weight: string) {
    // Get the table element in which you want to add row
    let table = <HTMLTableElement>document.getElementById("weightDateTable");

    // Create a row using the inserRow() method and
    // specify the index where you want to add the row
    let row = table.insertRow(-1); // We are adding at the end

    // Create table cells
    let c1 = row.insertCell(0);
    let c2 = row.insertCell(1);
    let c3 = row.insertCell(2);

    // Add data to c1 and c2
    c1.innerText = date;
    c2.innerText = weight;
    c3.innerHTML = "<button >DELETE</button>";
    c3.addEventListener("click", (event) => { this.deleteDatapoint(date); }, false);

  }
  dateTimeReviver = function (key: any, value: any) {
    var a;
    if (typeof value === 'string') {
      a = /\/Date\((\d*)\)\//.exec(value);
      if (a) {
        return new Date(+a[1]);
      }
    }
    return value;
  }
  deleteDatapoint(date: string): void {
    console.log("delete datapoint with date " + date);
    let tempWeightDateDb: WeightDateDb[] = this.getWeightDateDb();
    for (const entry of tempWeightDateDb) {
      if (entry.date == date) {
        tempWeightDateDb.splice(tempWeightDateDb.indexOf(entry), 1);
        break;
      }
    }
    localStorage.setItem("weightDb", JSON.stringify(tempWeightDateDb));
    this.updateBoth();
  }
  updateBarChartWeight(): any {

    let weightArray: Number[] = [];
    let dateArray: string[] = [];
    let weightDb: WeightDateDb[] = this.getWeightDateDb();
    for (const weightDate of weightDb) {
      weightArray.push(weightDate.weight);
      dateArray.push(weightDate.date);
    }
    this.updateBarChart(dateArray, weightArray, "Weight");
  }

  updateBarChartBmi(): any {
    if (this.chart)
      this.chart.destroy();
    let weightArray: Number[] = [];
    let heightArray: Number[] = [];
    let dateArray: string[] = [];

    let weightDb: WeightDateDb[] = this.getWeightDateDb();
    for (const weightDate of weightDb) {
      weightArray.push(weightDate.weight);
      dateArray.push(weightDate.date);
    }
    let height = Number(localStorage.getItem("height"));

    for (const weight of weightArray) {
      let bmi: Number = weight.valueOf() / ((height / 100) * (height / 100));
      heightArray.push(Number(bmi.toFixed(1)))
    }
    return this.updateBarChart(dateArray, heightArray, "BMI");
  }
  updateGraph(): void {
    let graphType = localStorage.getItem("graphType");
    if (graphType == "bmi") {
      this.updateBarChartBmi();
    }
    else {
      this.updateBarChartWeight();
    }
  }
  updateBoth(): void {
    this.updateTable();
    this.updateGraph();
  }

}
