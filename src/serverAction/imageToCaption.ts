'use server'
import {runpodApi2} from '@/api/RunpodApi'
import {useLightpinkStore} from '@/state/LightpinkStore'
import {throwOnError} from '@/util/ReplitUtil'
import {splitDataUrl} from '@/util/Uint8ArrayUtil'
import {Client} from '@replit/object-storage'
import knex from 'knex'

export const imageUrlToCaption = async (imageUrl: string): Promise<string> => {
  const {
    ui: {timeline, iteration},
  } = useLightpinkStore.getState()

  const [captionGenId] = await knex('caption_gen')
    .insert({
      image_url: imageUrl,
      timeline,
      iteration,
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

export const imageToCaption = async (dataUrl: string): Promise<string> => {
  const imageUrl = await saveImageToStorage(dataUrl)
  return await imageUrlToCaption(imageUrl)
}

export const saveImageToStorage = async (dataUrl: string, fileName: string) => {
  const client = new Client()
  const {data, contentType} = splitDataUrl(dataUrl)
  const buffer = Buffer.from(data, 'base64')
  return await client.uploadFromBytes(fileName, buffer).then(throwOnError)
}
