// For more information about this file see https://dove.feathersjs.com/guides/cli/hook.html

import { Jimp } from 'jimp'
import type { HookContext } from '../declarations'
import QRCode from 'qrcode'

export const generateQrcode = async (context: HookContext) => {
  
  const data = context.params;
  const { certificateSvg, verificationUrl, certificateId, sendMail } = data;

  console.log(`Generate QR code hook running for ${verificationUrl}`);

   try {
        // Generate QR code
        const qrCodeDataUrl = await QRCode.toDataURL(verificationUrl);
        const qrCodeImage = await Jimp.read(Buffer.from(qrCodeDataUrl.split(',')[1], 'base64'));

        // Load the image to overlay
        const overlayImage = await Jimp.read(certificateSvg);

        // Resize the overlay image if needed
        qrCodeImage.resize({ w: overlayImage.width / 8 });

        // Calculate the position to center the overlay image
        //const x = (overlayImage.width - qrCodeImage.width) - 40; // 10 pixels from the right
        //const y = (overlayImage.height - qrCodeImage.height) - 40;

        const x = 1230; // 40 pixels from the right
        const y = 800; // 40 pixels from the bottom

        // Composite the images
        overlayImage.composite(qrCodeImage, x, y);

        //const qrcodePath = `${process.cwd()}/teste.png` as `${string}.${string}`;
        // Save the result

      

        context.params = {
          ...context.params,
          certificatePng: overlayImage,
          certificateId,
          sendMail
        }

        //await overlayImage.write(qrcodePath);
        console.log('QR code with overlay created successfully!');
    } catch (error) {
        console.error('Error creating QR code with overlay:', error);
    }

    console.log('qrcode done')

}

