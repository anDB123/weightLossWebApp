import { Component, OnInit, Input } from '@angular/core';
import { WeightDateDb } from '../weight-date-db';
import { Chart, registerables, } from 'chart.js';
Chart.register(...registerables);

@Component({
  selector: 'app-add-entry',
  templateUrl: './add-entry.component.html',
  styleUrls: ['./add-entry.component.scss']
})
export class AddEntryComponent implements OnInit {
  public chart: any;



  constructor() { }

  ngOnInit(): void {
    if (localStorage.getItem("weightDb") === null) {
      let tempWeightDateDb: WeightDateDb[] = [];
      localStorage.setItem("weightDb", JSON.stringify(tempWeightDateDb));
    }

    this.updateBarChart();
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
    this.updateBarChart();
  }
  updateBarChart() {
    if (this.chart)
      this.chart.destroy();
    let weightArray: Number[] = [];
    let dateArray: string[] = [];


    let weightDb: WeightDateDb[] = JSON.parse(localStorage.getItem("weightDb") || '{}', this.dateTimeReviver);
    weightDb.sort((a, b) => a.date.localeCompare(b.date));
    for (const weightDate of weightDb) {
      weightArray.push(weightDate.weight);
      dateArray.push(weightDate.date);
    }
    let myData = {// values on X-Axis
      labels: dateArray,
      datasets: [
        {
          label: "Weight",
          data: weightArray,
          backgroundColor: 'blue'
        },
      ]
    }
    this.chart = new Chart("BarChart", {
      type: 'bar', //this denotes tha type of chart
      data: myData,
      options: {
        responsive: true,
        maintainAspectRatio: false,
      }

    });
    return this.chart;
  }
  enterWeightDate(weightInput: string, date: string): void {
    if (!weightInput || !date)
      return;
    console.log("day is: " + date)

    let weightDb: WeightDateDb[] = JSON.parse(localStorage.getItem("weightDb") || '{}', this.dateTimeReviver);
    weightDb.push({ weight: Number(weightInput), date: date });
    localStorage.setItem("weightDb", JSON.stringify(weightDb));

    this.updateBarChart();

  }
}
