export function calculateAge(dateOfBirth) {
  const today = new Date();
  const dob = new Date(dateOfBirth);
  const age = today.getFullYear() - dob.getFullYear();

  if(today.getMonth() <= dob.getMonth() && today.getDate() < dob.getDate()) {
    return age - 1;
  }

  return age;
}

export function formatdateForInput(date) {
  const month = ("0" + (date.getMonth() + 1)).slice(-2);
  const day = ("0" + (date.getMonth() + 1)).slice(-2);

  return `${date.getFullYear()}-${month}-${day}`;
}

export function difference(date1, date2) {
  const diff = date2.getTime() - date1.getTime();
  const seconds = diff / 1000;
  const minutes = Math.round(seconds / 60);
  const hours = Math.round(minutes / 60);

  return Math.round(hours / 24);
}

export function differenceFromToday(date) {
  return difference(date, new Date());
}