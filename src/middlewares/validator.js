const validator = require("validator");
const isUSerValidated = (req, res, next) => {
    const { email, password, gender, age, firstName, lastName , about , skills , profilePic } = req.body;

    if (!validator.isEmail(email)) {
      return res.status(400).send({ message: "Invalid email" });
    }

    if (!validator.isStrongPassword(password)) {
      return res.status(400).send({ message: "Password is weak" });
    }

    if (age < 18) {
      return res.status(400).send({ message: "Age should be greater than 18" });
    }

    const normalizedGender = gender?.toLowerCase();
    const acceptableGenders = ["male", "female", "other"];
    if (!acceptableGenders.includes(normalizedGender)) {
      return res.status(400).send({ message: "Gender is not valid" });
    }
    req.newUser = {
        email,
        password,
        gender: normalizedGender,
        age,
        firstName,
        lastName,
        about,
        skills,
        profilePic
    }
    next()

}

module.exports = isUSerValidated