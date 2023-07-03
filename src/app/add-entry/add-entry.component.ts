import { Component, OnInit, Input } from '@angular/core';
import { WeightDateDb } from '../weight-date-db';
import { Chart, registerables, } from 'chart.js';
import { UpdateChartService } from '../update-chart.service';

Chart.register(...registerables);

@Component({
  selector: 'app-add-entry',
  templateUrl: './add-entry.component.html',
  styleUrls: ['./add-entry.component.scss']
})
export class AddEntryComponent implements OnInit {
  public chart: any;
  tableData: WeightDateDb[] = [];

  constructor(private _updateChartService: UpdateChartService) { }

  ngOnInit(): void {
    this._updateChartService.updateBarChart([], [], "Weight");
    if (localStorage.getItem("weightDb") === null) {
      let tempWeightDateDb: WeightDateDb[] = [];
      localStorage.setItem("weightDb", JSON.stringify(tempWeightDateDb));
    }
    localStorage.setItem("graphType", "weight");
    this.changeGraphType("weight");
    this._updateChartService.updateBoth();
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

  deleteData() {
    let tempWeightDateDb: WeightDateDb[] = [];
    localStorage.setItem("weightDb", JSON.stringify(tempWeightDateDb));
    this._updateChartService.updateBoth();
  }
  viewDataTable() {
    let tempWeightDateDb: WeightDateDb[] = JSON.parse(localStorage.getItem("weightDb") || '{}', this.dateTimeReviver);
    tempWeightDateDb.sort((a, b) => a.date.localeCompare(b.date));
    this.tableData = tempWeightDateDb;
  }

  enterWeightDate(weightInput: string, date: string): void {
    if (!weightInput || !date)
      return;
    console.log("day is: " + date)

    let inputDate = new Date(date);
    let currentDate: Date = new Date();
    if (inputDate > currentDate) {
      alert("You cannot enter a date in the future");
      return;
    }
    if (Number(weightInput) < 0) {
      alert("You cannot enter a negative weight");
      return;
    }
    let weightDb: WeightDateDb[] = JSON.parse(localStorage.getItem("weightDb") || '{}', this.dateTimeReviver);
    //alert if date already in weightDB
    for (let i = 0; i < weightDb.length; i++) {
      if (weightDb[i].date == date) {
        alert("You already entered a weight for this date");
        return;
      }
    }
    weightDb.push({ weight: Number(weightInput), date: date });

    //sort weight date by date
    weightDb.sort((a, b) => this._updateChartService.convertDateStringToMilliseconds(b.date) - this._updateChartService.convertDateStringToMilliseconds(a.date));
    localStorage.setItem("weightDb", JSON.stringify(weightDb));
    this._updateChartService.updateBoth();
  }

  changeGraphType(graphType: string): void {
    //check that height has been set in local storage before allowing bmi graph
    if (graphType == "bmi" && !localStorage.getItem("height")) {
      alert("You must set your height before viewing BMI");
    }
    localStorage.setItem("graphType", graphType);
    //set button for weightGraphButton to a greyed out color
    let weightGraphButton: HTMLInputElement = <HTMLInputElement>document.getElementById("weightGraphButton");
    let bmiGraphButton: HTMLInputElement = <HTMLInputElement>document.getElementById("bmiGraphButton");
    if (weightGraphButton && bmiGraphButton) {
      weightGraphButton.style.backgroundColor = "white";
      weightGraphButton.style.color = "black";
      bmiGraphButton.style.backgroundColor = "white";
      bmiGraphButton.style.color = "black";
      if (graphType == "weight") {
        weightGraphButton.style.color = "white";
        weightGraphButton.style.backgroundColor = "blue";

      }
      else if (graphType == "bmi") {
        bmiGraphButton.style.backgroundColor = "blue";
        bmiGraphButton.style.color = "white";
      }
    }

    this._updateChartService.updateBoth();
  }



}
