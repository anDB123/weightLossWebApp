import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-target-input',
  templateUrl: './target-input.component.html',
  styleUrls: ['./target-input.component.scss']
})
export class TargetInputComponent {
  ngONInit(): void {


  }
  generateEstimates(): void {
    let height: number = Number(localStorage.getItem("height"));
    let targetWeight: number = Number(localStorage.getItem("targetWeight"));
    let targetBmi: number = targetWeight / ((height / 100) * (height / 100));
    var bmiEstimate = document.getElementById("bmiVal");
    console.log(bmiEstimate);
    if (bmiEstimate)
      bmiEstimate.innerText = targetBmi.toFixed(1).toString();

  }
  enterTargets(height: string, targetWeight: string): void {
    localStorage.setItem("height", height.toString());
    localStorage.setItem("targetWeight", targetWeight.toString());
    this.generateEstimates();
  }
}
