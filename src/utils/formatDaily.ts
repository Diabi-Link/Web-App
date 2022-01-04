import { DataType } from '../types/data';

export type DailyData = {
  time: number;
  val: number;
};

export type BrainData = {
  timeInTarget: number;
  lastScan: string;
  average: number;
};

// export const getDailyDomain = () => {
//   const actualDate = new Date();
//   const domain: number[] = [];

//   domain.push(new Date(actualDate).setHours(0, 0, 0, 0));
//   const tomorrow = new Date(actualDate);
//   tomorrow.setDate(actualDate.getDate() + 1);
//   domain.push(tomorrow.setHours(0, 0, 0, 0));

//   return domain;
// };
// export const getDailyTicks = () => {
//   const actualDate = new Date();

//   const hours = [
//     [0, 0],
//     [3, 0],
//     [6, 0],
//     [9, 0],
//     [12, 0],
//     [15, 0],
//     [18, 0],
//     [21, 0],
//     [23, 59],
//   ];

//   const dailyTicks: number[] = [];

//   hours.forEach((hour) => {
//     dailyTicks.push(
//       new Date(actualDate.setHours(hour[0], hour[1], 0, 0)).getTime(),
//     );
//   });
//   return dailyTicks;
// };

export const formatDaily = (data: [DataType]) => {
  const dailyData: DailyData[] = [];

  data.forEach((d) => {
    const obj = { time: new Date(d.date).getTime(), val: d.value * 100 };

    dailyData.push(obj);
  });

  return dailyData;
};

export const dailyBrain = (data: [DataType]) => {
  const actualDate = new Date('January 10 2022 00:00').getTime();
  const todayTime: number[] = [];
  const targetTime: number[] = [];
  const allValues: number[] = [];
  const lastScan = new Date(data.slice(-1)[0].date);

  data.forEach((d) => {
    const date = new Date(d.date).getTime();
    if (date >= actualDate) {
      if (d.value >= 0.7 && d.value <= 1.7) {
        targetTime.push(date);
      }
      todayTime.push(date);
      allValues.push(d.value);
    }
  });

  const todaySum = todayTime.reduce((a, b) => a + b, 0);
  const targetSum = targetTime.reduce((a, b) => a + b, 0);
  const targetAvg = Math.round((targetSum * 100) / todaySum);

  const sum = allValues.reduce((a, b) => a + b, 0);
  const avg = Math.round((sum / allValues.length || 0) * 100);

  return {
    timeInTarget: targetAvg,
    lastScan: `${lastScan.getHours()}:${lastScan.getMinutes()}`,
    average: avg,
  };
};
