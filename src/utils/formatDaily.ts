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

export const formatDaily = (data: DataType[]) => {
  const dailyData: DailyData[] = [];

  data.forEach((d) => {
    const obj = {
      time: new Date(d.date).getTime(),
      val: parseFloat((d.value * 100).toFixed(2)),
    };

    dailyData.push(obj);
  });

  return dailyData;
};

export const dailyBrain = (data: DataType[]) => {
  const today = new Date();
  const actualDate = new Date(`${today.toDateString()} 00:00`).getTime();
  const todayTime: number[] = [];
  const targetTime: number[] = [];
  const allValues: number[] = [];
  if (!data.length)
    return {
      timeInTarget: 0,
      lastScan: '',
      average: 0,
    };
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
    lastScan: `${`0${lastScan.getHours()}`.slice(
      -2,
    )}:${`0${lastScan.getMinutes()}`.slice(-2)}`,
    average: avg,
  };
};
