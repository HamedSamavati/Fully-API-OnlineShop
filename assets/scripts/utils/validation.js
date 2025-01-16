const validateUsername = (username) => {
  const regex = /[a-zA-Z\d_]{5,20}$/;
  const result = regex.test(username);
  return result;
};

const validatePassword = (password) => {
  const regex = /^.{5,20}$/;
  const result = regex.test(password);
  return result;
};

const validateForm = (username, password) => {
  if (validatePassword(password) && validateUsername(username)) {
    return true;
  } else if (!validateUsername(username)) {
    alert("the username is not valid! Please retry.");
  } else if (!validatePassword(password)) {
    alert("the password is not valid! Please retry.");
  }
};

export { validateForm };
