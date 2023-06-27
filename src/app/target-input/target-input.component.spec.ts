import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TargetInputComponent } from './target-input.component';

describe('TargetInputComponent', () => {
  let component: TargetInputComponent;
  let fixture: ComponentFixture<TargetInputComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TargetInputComponent]
    });
    fixture = TestBed.createComponent(TargetInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
