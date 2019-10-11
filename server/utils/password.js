const passwordRegEx = /^(?=.*\d)(?=.*\W)(?=.*[a-zA-Z]).{8,20}$/;

module.exports = password => passwordRegEx.test(password);
