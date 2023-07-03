import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-target-input',
  templateUrl: './target-input.component.html',
  styleUrls: ['./target-input.component.scss']
})
export class TargetInputComponent {
  ngOnInit(): void {
    console.log(localStorage.getItem("height"));
    console.log(localStorage.getItem("targetWeight"));
    if (localStorage.getItem("height") != null) {
      let heightInput: HTMLInputElement = <HTMLInputElement>document.getElementById("heightInput");
      heightInput.value = localStorage.getItem("height") || "";
      console.log(localStorage.getItem("height"));
    }
    if (localStorage.getItem("targetWeight")) {
      let targetWeightInput: HTMLInputElement = <HTMLInputElement>document.getElementById("targetWeightInput");
      targetWeightInput.value = localStorage.getItem("targetWeight") || "";
      console.log(localStorage.getItem("targetWeight"));
    }
    if (localStorage.getItem("weightLossMonths")) {
      let targetWeightInput: HTMLInputElement = <HTMLInputElement>document.getElementById("weightLossMonthsInput");
      targetWeightInput.value = localStorage.getItem("weightLossMonths") || "";
      console.log(localStorage.getItem("weightLossMonths"));
    }
    this.generateEstimates();

  }
  generateEstimates(): void {
    let height: number = Number(localStorage.getItem("height"));
    let targetWeight: number = Number(localStorage.getItem("targetWeight"));
    let weightLossMonths: number = Number(localStorage.getItem("weightLossMonths"));
    let targetBmi: number = targetWeight / ((height / 100) * (height / 100));
    var bmiEstimate = document.getElementById("bmiVal");
    console.log(bmiEstimate);
    if (bmiEstimate)
      bmiEstimate.innerText = "Target BMI: " + targetBmi.toFixed(1).toString();
    let currentWeight = 80;
    let calorieGoalTarget = ((10 * targetWeight + 6.25 * height - 5 * 23 + 5) * 1.375) - 7700 * (currentWeight - targetWeight) / (30 * weightLossMonths);
    var calorieGoal = document.getElementById("calorieGoal");
    if (calorieGoal)
      calorieGoal.innerText = calorieGoalTarget.toFixed(0).toString() + "Calorie Goal: calories";

  }
  enterTargets(height: string, targetWeight: string, weightLossMonths: string): void {
    if (height === "" || targetWeight === "") {
      alert("Please enter a value for height and target weight");
      return;
    }
    if (isNaN(Number(height)) || isNaN(Number(targetWeight))) {
      alert("Please enter a number for height and target weight");
      return;
    }
    if (Number(height) < 0 || Number(targetWeight) < 0) {
      alert("Please enter a positive number for height and target weight");
      return;
    }

    localStorage.setItem("height", height.toString());
    localStorage.setItem("targetWeight", targetWeight.toString());
    localStorage.setItem("weightLossMonths", weightLossMonths.toString());
    console.log(localStorage.getItem("height"));
    console.log(localStorage.getItem("targetWeight"));
    console.log(localStorage.getItem("weightLossMonths"));
    this.generateEstimates();
  }
  toggleAdditionalInput(): void {
    var additionalInput = document.getElementById("additionalData");
    if (additionalInput)
      if (additionalInput.style.display === "block") {
        additionalInput.style.display = "none";
      } else {
        additionalInput.style.display = "block";
      }
  }
}
