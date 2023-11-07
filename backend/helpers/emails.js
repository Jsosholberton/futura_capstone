import nodemailer from "nodemailer";

// Function to send a registration confirmation email
export const emailReg = async (datos) => {
  const { email, name, token } = datos;

  // Create a transport configuration for sending email
  const transport = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "9030bcbcb86256",
      pass: "dad88d9b1587b2",
    },
  });

  // Compose and send the registration confirmation email
  const info = await transport.sendMail({
    from: '"Futura - Admin" <correo@Futura.com>', // Sender's information
    to: email, // Recipient's email
    subject: "Futura - Confirm your account", // Email subject
    text: "Confirm your account on Futura", // Plain text version of the email
    html: `<p>Hi: ${name} confirm your account on Futura</p>
    <p>Your account is almost ready you just have to confirm in the next link:
    <a href="${process.env.FRONTEND_URL}confirmar/${token}">Confirm the account</a> </p>
    <p>If you didn't create this account, you can ignore the message</p>
    `
  });
};

// Function to send an email for password restoration
export const emailPwd = async (datos) => {
    const { email, name, token } = datos;

    // Create a transport configuration for sending the password restoration email
    const transport = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "9030bcbcb86256",
        pass: "dad88d9b1587b2",
      },
    });

    // Compose and send the password restoration email
    const info = await transport.sendMail({
      from: '"Futura - Admin" <correo@Futura.com>', // Sender's information
      to: email, // Recipient's email
      subject: "Futura - Confirm your account", // Email subject
      text: "Restore your password on Futura", // Plain text version of the email
      html: `<p>Hi: ${name} restore your password from your account on Futura</p>
      <p>Follow the next link to restore your password:
      <a href="${process.env.FRONTEND_URL}olvidepassword/${token}">Restore</a> </p>
      <p>If you didn't restore the password, you can ignore the message</p>
      `
    });
  };
