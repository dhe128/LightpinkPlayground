'use server'
import {runpodApi2} from '@/api/RunpodApi'
import {throwOnError} from '@/util/ReplitUtil'
import {DataUrl, splitDataUrl} from '@/util/Uint8ArrayUtil'
import {Client} from '@replit/object-storage'
import {knex} from '@api/Knex'
import {LightpinkInstance} from '@/state/UiSlice'

export const imageToCaption = async (
  instance: LightpinkInstance,
  imageUrl: string,
): Promise<string> => {
  const [{id: captionGenId}] = await knex('caption_gen')
    .insert({
      ...instance,
      image_url: imageUrl,
    })
    .returning('id')

  const {data} = await runpodApi2.post('/3hgviwgd6zbee7/runsync', {
    input: {
      image_url: imageUrl,
    },
  })

  const caption = data.output.generated_text
  await knex('caption_gen').where('id', captionGenId).update({
    caption,
  })

  return caption
}

export const saveImageToStorage = async (
  dataUrl: string,
  fileName: string,
): Promise<DataUrl> => {
  const client = new Client()
  const {data, contentType} = splitDataUrl(dataUrl)
  const buffer = Buffer.from(data, 'base64')
  return await client.uploadFromBytes(fileName, buffer).then(throwOnError)
}
