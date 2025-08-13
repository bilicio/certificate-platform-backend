// For more information about this file see https://dove.feathersjs.com/guides/cli/hook.html
import type { HookContext } from '../declarations'

export const mailImersionCertificate = async (context: HookContext) => {
  console.log(`Running hook mail-imersion-certificate on ${context.path}.${context.method}`)


  const { recipientName, recipientEmail, certificateUrl, sendMail } = context.params;

    console.log('Data:', recipientName, recipientEmail, certificateUrl, sendMail);

    if(sendMail){
  const response = await fetch('https://42sp-send-mail.4hkf7y.easypanel.host/send-certificate', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ name:recipientName, email:recipientEmail, certificateUrl })
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Failed to send certificate email: ${response.status} ${errorText}`);
  }else{
    console.log('Email sent successfully');
  }
}else{
  console.log('Email sending skipped');
}
};
