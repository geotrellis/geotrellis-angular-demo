import { Injectable } from '@angular/core';
import { Demo } from '../models/demo.d';
import { LMDEMO } from '../../demos/lm/lm-demo';
import { CHATTADEMO } from '../../demos/chatta/chatta-demo';
import { POINTCLOUDDEMO } from '../../demos/point-cloud/point-cloud-demo';
import { POTSDAMDEMO } from '../../demos/potsdam/potsdam-demo';

@Injectable()
export class DemoService {
  demos: Demo[] = [LMDEMO, CHATTADEMO, POINTCLOUDDEMO, POTSDAMDEMO];

  getDemosInfo(): Promise<{
    name: string;
    title: string;
    thumb: string;
  }[]> {
    const demosInfo = [];
    this.demos.forEach(el => {
      demosInfo.push({
        name: el.model,
        title: el.title,
        thumb: el.thumb,
      });
    });
    return Promise.resolve(demosInfo);
  }
}
