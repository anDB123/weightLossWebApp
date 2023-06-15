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


  @Input() weightDb: WeightDateDb[] = [];
  constructor() { }

  ngOnInit(): void {
    this.updateBarChart();
  }

  updateBarChart() {
    if (this.chart)
      this.chart.destroy();
    let weightArray: Number[] = [];
    let dateArray: string[] = [];
    for (const weightDate of this.weightDb) {
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
        aspectRatio: 2.5
      }

    });
    return this.chart;
  }
  enterWeightDate(weightInput: string, date: string): void {
    if (!weightInput || !date)
      return;
    this.weightDb.push({ weight: Number(weightInput), date: date });
    console.log("added weight and date \n" + this.weightDb.at(-1)?.weight + ", " + this.weightDb.at(-1)?.date);
    this.updateBarChart();
  }
}
