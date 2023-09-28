export function AddOrSubractDays(startingDate, days, add) {
  
  const time = days * 24 * 3600000;
  
  if (add) {
    return new Date(new Date().setTime(new Date(startingDate).getTime() + time));
  } else {
    return new Date(new Date().setTime(new Date(startingDate).getTime() - time));
  }
}