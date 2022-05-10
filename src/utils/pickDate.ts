export const pickDate = (type: string, period: number) => {
  const event = new Date();

  switch (type) {
    case 'hours':
      event.setHours(event.getHours() - period);
      break;
    case 'days':
      event.setDate(event.getDate() - period);
      break;
    default:
      break;
  }
  return event.toJSON();
};
