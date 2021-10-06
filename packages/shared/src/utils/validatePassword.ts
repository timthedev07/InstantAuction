export const validatePassword = (password: string) => {
  if (password.length < 8 || password.length > 64) {
    throw "A valid password has to be longer than 8 characters and shorter than 64.";
  }
  const regex = [/\d+/g, /[a-z]+/g, /[A-Z]+/g, /[^A-Za-z0-9]+/g];

  if (regex.some((each) => !each.test(password))) {
    throw "A strong password has to include numbers, lowercase and uppercase letters, and special characters.";
  }
  return true;
};
