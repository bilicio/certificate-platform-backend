// For more information about this file see https://dove.feathersjs.com/guides/cli/hook.html
import { createCanvas, loadImage } from 'canvas';
import type { HookContext } from '../declarations'
import supabaseClient from '../supabase'
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type'
};

export const generateImage = async (context: HookContext) => {
  
  const data = context.data;
  const { certificateId, recipientName, recipientEmail, courseName, date, companyName, templateId, sendOptions } = data;

  console.log(`Generate image hook running for ${recipientEmail} - SendOptions ${sendOptions}`);

  /*console.log('Received data:', {
    recipientName,
    recipientEmail,
    courseName,
    date,
    companyName,
    templateId,
    certificateId
  });*/

  const { data: template, error: templateError } = await supabaseClient.from('certificate_templates').select('*').eq('id', templateId).single();
      if (templateError || !template) {
        console.error('Template fetch error:', templateError);
        return new Response(JSON.stringify({
          error: 'Template not found'
        }), {
          status: 404,
          headers: {
            ...corsHeaders,
            'Content-Type': 'application/json'
          }
        });
      }
      const config = template.config || {};

      const certificateSvg = await generatePngCertificate(template, config, recipientName, courseName, date, companyName);
      console.log('Certificate SVG generated using template, length:', certificateSvg.length);

      const verificationUrl = `https://certificate-platform.onrender.com/verify/${certificateId}`;

      context.params = {
        recipientName,
        recipientEmail,
        certificateSvg,
        verificationUrl,
        certificateId,
        sendOptions,
        config
      };
    

}

const generatePngCertificate = async (
  template: any,
  config: any,
  recipientName: string,
  courseName: string,
  date: string,
  companyName: string
): Promise<Buffer> => {
  // Double the size for higher resolution
  const width = 1600
  const height = 1200
  const canvas = createCanvas(width, height)
  const ctx = canvas.getContext('2d')

  // Draw background (either template image or fallback)
  if (template.image_url) {
    try {
      const img = await loadImage(template.image_url)
      ctx.drawImage(img, 0, 0, width, height)
    } catch (e) {
      // fallback to white background if image fails
      ctx.fillStyle = '#fff'
      ctx.fillRect(0, 0, width, height)
    }
  } else {
    // fallback: simple gradient background
    const gradient = ctx.createLinearGradient(0, 0, width, height)
    gradient.addColorStop(0, '#f8f9fa')
    gradient.addColorStop(1, '#e9ecef')
    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, width, height)
    ctx.strokeStyle = '#d4af37'
    ctx.lineWidth = 8
    ctx.strokeRect(80, 80, width - 160, height - 160)
    ctx.lineWidth = 4
    ctx.strokeRect(120, 120, width - 240, height - 240)
  }

  // Helper to draw text with shadow
  function drawText(
    text: string,
    x: number,
    y: number,
    font: string,
    color: string,
    align: CanvasTextAlign = 'center',
    shadow: boolean = true
  ) {
    ctx.save()
    ctx.font = font
    ctx.fillStyle = color
    ctx.textAlign = align
    if (shadow) {
      ctx.shadowColor = 'rgba(0,0,0,0.3)'
      ctx.shadowBlur = 4
      ctx.shadowOffsetX = 4
      ctx.shadowOffsetY = 4
    }
    ctx.fillText(text, x, y)
    ctx.restore()
  }


  if (config.recipientName) {
    drawText(
      recipientName.toUpperCase(),
      config.recipientName.x ? config.recipientName.x * 2 : width / 2,
      config.recipientName.y ? config.recipientName.y * 2 : 540,
      `bold ${config.recipientName.fontSize ? config.recipientName.fontSize * 2 : 50}px arial`,
      config.recipientName.color || '#2c3e50'
    )
    
  }

  if (config.courseName) {
    drawText(
      courseName,
      config.courseName.x ? config.courseName.x * 2 : width / 2,
      config.courseName.y ? config.courseName.y * 2 : 760,
      `bold ${config.courseName.fontSize ? config.courseName.fontSize * 2 : 48}px serif`,
      config.courseName.color || '#2c3e50'
    )
    ctx.strokeStyle = '#34495e'
    ctx.lineWidth = 2
    ctx.beginPath()
    ctx.moveTo(width / 2 - 500, 790)
    ctx.lineTo(width / 2 + 500, 790)
    ctx.stroke()
  }

  if (config.date) {
    drawText(
      `on ${date}`,
      config.date.x ? config.date.x * 2 : width / 2,
      config.date.y ? config.date.y * 2 : 880,
      `${config.date.fontSize ? config.date.fontSize * 2 : 32}px serif`,
      config.date.color || '#7f8c8d'
    )
  }

  if (config.signature) {
    drawText(
      companyName,
      config.signature.x ? config.signature.x * 2 : width / 2,
      config.signature.y ? config.signature.y * 2 : 1000,
      `bold ${config.signature.fontSize ? config.signature.fontSize * 2 : 36}px serif`,
      config.signature.color || '#2c3e50'
    )
    ctx.strokeStyle = '#34495e'
    ctx.lineWidth = 2
    ctx.beginPath()
    ctx.moveTo(width / 2 - 200, 1030)
    ctx.lineTo(width / 2 + 200, 1030)
    ctx.stroke()
    drawText(
      'Authorized Signature',
      width / 2,
      1070,
      '24px serif',
      '#7f8c8d'
    )
  }

  // Use PNG with highest quality (compressionLevel: 0)
  return canvas.toBuffer('image/png', { compressionLevel: 0 })
}
