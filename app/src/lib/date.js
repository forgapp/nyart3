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