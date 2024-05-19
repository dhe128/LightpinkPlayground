import {makeDataUrl, DataUrl} from '@/util/Uint8ArrayUtil'

export const blobToDataUrl = async (blob: Blob): Promise<DataUrl> => {
  const buffer = Buffer.from(await blob.arrayBuffer())
  return makeDataUrl(buffer.toString('base64'), blob.type)
}

export const dataUrlToBuffer = (dataUrl: DataUrl): Buffer => {
  const base64 = dataUrl.split(',')[1]
  return Buffer.from(base64, 'base64')
}
