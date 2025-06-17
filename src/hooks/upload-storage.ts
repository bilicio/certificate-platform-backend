// For more information about this file see https://dove.feathersjs.com/guides/cli/hook.html
import type { HookContext } from '../declarations'
import supabaseClient from '../supabase'
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type'
};

export const uploadStorage = async (context: HookContext) => {
  console.log(`Running hook upload-storage on ${context.path}.${context.method}`)
  const data = context.params;
  const { certificateId, certificatePng } = data;

   const fileName = `certificate_${certificateId}.png`;
  // Convert Jimp instance to PNG buffer
  const imageBuffer = await certificatePng.getBuffer("image/png", {
    quality: 90,
  });
  const { data: uploadData, error: uploadError } = await supabaseClient.storage
    .from('certificates')
    .upload(
      fileName,
      imageBuffer as any,
      {
        contentType: 'image/png',
        upsert: true
      }
    );
      if (uploadError) {
        console.error('Error uploading certificate to storage:', uploadError);
        return new Response(JSON.stringify({
          error: 'Failed to upload certificate image',
          details: uploadError.message
        }), {
          status: 500,
          headers: {
            ...corsHeaders,
            'Content-Type': 'application/json'
          }
        });
      }

      console.log('Certificate uploaded to storage:', uploadData.path);

      const { data: urlData } = supabaseClient.storage.from('certificates').getPublicUrl(fileName);
      const certificateImageUrl = urlData.publicUrl;

      const { error: updateError } = await supabaseClient.from('certificates').update({
        certificate_url: certificateImageUrl
      }).eq('id', certificateId);

      context.result = {
        success: true,
        certificate_url: certificateImageUrl,
      }

      return context
}
