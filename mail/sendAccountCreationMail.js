const path = require("path");
const ejs = require("ejs");
const transporter = require("../mail/transporter");

const sendUserCreationEmail = async ({ name, email }) => {
  const templatePath = path.join(__dirname, "../views/AccountCreated.ejs");

  const data = await ejs.renderFile(templatePath, {
    name,
  });

  const mainOptions = {
    from: 'solankinisitgujarat@gmail.com',
    to: email,
    subject: "send email",
    html: data,
  };
  console.log(mainOptions)

  await transporter.sendMail(mainOptions);
};

module.exports = sendUserCreationEmail;
