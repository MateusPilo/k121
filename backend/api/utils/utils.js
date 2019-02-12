const sendMail = require('@sendgrid/mail');
const config = require('../../config/constants');

sendMail.setApiKey(config.email.key);

// eslint-disable-next-line const/prefer-default-export
const emailSend = async ({ peoples }) => {
  let result = {};
  try {
    // eslint-disable-next-line array-callback-return
    peoples.forEach((element) => {
      const data = {
        from: 'Mateus <teste@exaple.com>',
        to: element.email,
        subject: 'Amigo Secreto :)',
        text: `Seu amigo(a) secreto é: ${element.amigo}`,
      };

      sendMail.send(data);
    });
    result = { success: true };
  } catch (error) {
    result = { success: false, error };
  }

  return result;
};

module.exports = emailSend;
