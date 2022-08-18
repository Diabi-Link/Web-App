import { DataType } from '../types/data';

export type TimeInTargetData = {
  name: string;
  percentage: number;
};

export const formatTimeInTarget = (data: [DataType]) => {
  const { length } = data;

  let maxHyper = 0;
  let hyper = 0;
  let normal = 0;
  let hypo = 0;

  data.forEach(({ value }) => {
    if (value > 2.4) {
      maxHyper += 1;
    } else if (value >= 1.81 && value <= 2.4) {
      hyper += 1;
    } else if (value >= 0.7 && value <= 1.8) {
      normal += 1;
    } else {
      hypo += 1;
    }
  });
  const timeInTargetData: TimeInTargetData[] = [
    {
      name: '> 240',
      percentage: (maxHyper * 100) / length || 0,
    },
    {
      name: '181 - 240',
      percentage: (hyper * 100) / length || 0,
    },
    {
      name: '70 - 180',
      percentage: (normal * 100) / length || 0,
    },
    {
      name: '< 70',
      percentage: (hypo * 100) / length || 0,
    },
  ];

  return timeInTargetData;
};
