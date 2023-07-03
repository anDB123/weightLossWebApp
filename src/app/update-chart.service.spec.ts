import { TestBed } from '@angular/core/testing';

import { UpdateChartService } from './update-chart.service';

describe('UpdateChartService', () => {
  let service: UpdateChartService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UpdateChartService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
