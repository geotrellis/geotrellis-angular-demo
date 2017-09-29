import { LMDEMO } from '../demos/lm/lm-demo';
import { CHATTADEMO } from '../demos/chatta/chatta-demo';
import { POINTCLOUDDEMO } from '../demos/point-cloud/point-cloud-demo';
import { POTSDAMDEMO } from '../demos/potsdam/potsdam-demo';

export const DEMOS = {
  lm: LMDEMO,
  chatta: CHATTADEMO,
  pointCloud: POINTCLOUDDEMO,
  potsdam: POTSDAMDEMO
};

export const INFO = Object.values(DEMOS).map(el => {
  return {
    name: el.model,
    title: el.title,
    thumb: el.thumb,
  };
});


