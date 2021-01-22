export const mobileValid = (mobileNumber: string) => {
  const num = mobileNumber.split('');

  if (num.length > 11 || num.length < 11) {
    return false;
  }

  if (num.includes('-')) {
    return num;
  }
};
