// For more information about this file see https://dove.feathersjs.com/guides/cli/hook.html
import type { HookContext } from '../declarations'
import supabaseClient from '../supabase'
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type'
};

export const uploadStorage = async (context: HookContext) => {
  console.log(`Running hook upload-storage`);
  const data = context.params;
  const { certificateId, certificatePng, sendOptions } = data;

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

      const { data: urlData } = supabaseClient.storage.from('certificates').getPublicUrl(fileName);
      const certificateImageUrl = urlData.publicUrl;

      const { error: updateError } = await supabaseClient.from('certificates').update({
        certificate_url: certificateImageUrl
      }).eq('id', certificateId);

      if (updateError) {
        console.error('Error updating certificate URL in database:', updateError);
        return new Response(JSON.stringify({
          error: 'Failed to update certificate URL in database',
          details: updateError.message
        }), {
          status: 500,
          headers: {
            ...corsHeaders,
            'Content-Type': 'application/json'
          }
        });
      }

      context.params = {
      ...context.params,
      certificateUrl:certificateImageUrl,
      sendOptions
    }

    context.result = {
        success: true,
        certificate_url: certificateImageUrl,
  }

  
  console.log('Certificate image uploaded successfully:', certificateImageUrl);
    return context
}
