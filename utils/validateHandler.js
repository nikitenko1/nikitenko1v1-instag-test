module.exports.validateEmail = (email) => {
  if (!email || !email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)) {
    return "Enter a valid email address.";
  }
  return false;
};
module.exports.validateFullName = (fullName) => {
  if (!fullName) {
    return "Enter a valid name.";
  }
  return false;
};
module.exports.validateUsername = (username) => {
  if (!username) {
    return "Enter a valid username.";
  } else if (username.length > 30 || username.length < 3) {
    return "Please choose a username between 3 and 30 characters.";
  } else if (!username.match(/^[a-zA-Z0-9\_.]+$/)) {
    return "A username can only contain the following: letters A-Z, numbers 0-9 and the symbols _ . ";
  }
  return false;
};
module.exports.validatePassword = (password) => {
  if (!password) {
    return "Enter a valid password.";
  } else if (password.length < 6) {
    return "For security purposes we require a password to be at least 6 characters.";
  } else if (
    !password.match(/^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z]).{6,}$/)
  ) {
    return `A password needs to have at least one uppercase letter, 
    one lowercase letter, one special character and one number.`;
  }
  return false;
};
module.exports.validateBio = (bio) => {
  if (bio.length > 130) {
    return "Your bio has to be 120 characters or less.";
  }
  return false;
};
module.exports.validateWebsite = (website) => {
  if (
    !website.match(
      /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/
    )
  ) {
    return "Please provide a valid website.";
  }
  return false;
};
