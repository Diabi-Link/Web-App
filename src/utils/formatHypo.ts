import { DataType } from '../types/data';

export type HypoData = {
  name: string;
  hypo: number;
};

export const formatHypo = (data: [DataType]) => {
  const hypoData: HypoData[] = [
    {
      name: '00:00',
      hypo: 0,
    },
    {
      name: '06:00',
      hypo: 0,
    },
    {
      name: '12:00',
      hypo: 0,
    },
    {
      name: '18:00',
      hypo: 0,
    },
    {
      name: '00:00',
      hypo: 0,
    },
  ];

  data.forEach((d) => {
    if (d.value < 0.7) {
      const hypoHour = new Date(d.date).getHours();
      switch (true) {
        case hypoHour >= 18:
          hypoData[3].hypo += 1;
          break;
        case hypoHour >= 12:
          hypoData[2].hypo += 1;
          break;
        case hypoHour >= 6:
          hypoData[1].hypo += 1;
          break;
        case hypoHour > 0:
          hypoData[0].hypo += 1;
          break;
        default:
          hypoData[4].hypo += 1;
      }
    }
  });
  return hypoData;
};
