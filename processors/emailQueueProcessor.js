const sendUserCreationEmail = require("../mail/sendAccountCreationMail");

const emailQueueProcessor = async (job, done) => {
  try {
    const { email } = job.data.user;
    console.log({ email });
    //send confirmation email
    await sendUserCreationEmail({
      email
    });

    done();
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = emailQueueProcessor;
