export const pickDate = (period: number) => {
  const event = new Date();
  event.setDate(event.getDate() - period);
  return event.toJSON();
};
