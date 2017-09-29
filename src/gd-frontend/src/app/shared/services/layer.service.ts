import { Injectable } from '@angular/core';
import { LmDemoService } from '../../demos/lm/lm-demo.service';
import { ChattaDemoService } from '../../demos/chatta/chatta-demo.service';
import { PointCloudDemoService } from '../../demos/point-cloud/point-cloud-demo.service';
import { PotsdamDemoService } from '../../demos/potsdam/potsdam-demo.service';

@Injectable()
export class LayerService {
  services = {};
  constructor(
    private lmDemoService: LmDemoService,
    private chattaDemoService: ChattaDemoService,
    private pointCloudDemoService: PointCloudDemoService,
    private potsdamDemoService: PotsdamDemoService,
  ) {
    this.services['lm'] = lmDemoService;
    this.services['chatta'] = chattaDemoService;
    this.services['point-cloud'] = pointCloudDemoService;
    this.services['potsdam'] = potsdamDemoService;
  }

  getService(model: string) {
    return this.services[`${model}`];
  }
}
