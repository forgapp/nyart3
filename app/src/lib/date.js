export function calculateAge(dateOfBirth) {
  const today = new Date();
  const dob = new Date(dateOfBirth);
  const age = today.getFullYear() - dob.getFullYear();

  if(today.getMonth() <= dob.getMonth() && today.getDate() < dob.getDate()) {
    return age - 1;
  }

  return age;
}