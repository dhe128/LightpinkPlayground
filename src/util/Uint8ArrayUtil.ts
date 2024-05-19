import {uint8ArrayToBase64, base64ToUint8Array} from 'uint8array-extras'

export type DataUrl = string

// Utility methods for Buffer, ArrayBuffer, Blob, DataURL, etc
// Buffer is only available in nodejs

export const makeDataUrl = (data: string, contentType: string): DataUrl =>
  `data:${contentType};base64,${data}`

export const splitDataUrl = (
  url: DataUrl,
): {
  data: string
  contentType: string
} => {
  const [prefix, data] = url.split(',', 2)
  const [_, contentType, encoding] = prefix.match(/^data:(.*);(.*)/)!
  if (encoding !== 'base64') {
    throw new Error('Invalid encoding')
  }

  return {
    data,
    contentType,
  }
}

export const extractDataUrl = (
  url: DataUrl,
): {
  buffer: Uint8Array
  contentType: string
} => {
  const {data, contentType} = splitDataUrl(url)

  return {
    buffer: base64ToUint8Array(data),
    contentType,
  }
}

export const uint8ArrayToDataUrl = (
  buffer: Uint8Array,
  contentType: string,
): DataUrl => makeDataUrl(uint8ArrayToBase64(buffer), contentType)

export const dataUrlToUint8Array = (url: DataUrl): Uint8Array =>
  extractDataUrl(url).buffer

export const dataUrlToBlob = (url: DataUrl): Blob => {
  const {buffer, contentType} = extractDataUrl(url)
  return new Blob([buffer], {type: contentType})
}

export const blobToDataUrl = (blob: Blob): Promise<DataUrl> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result as string)
    reader.onerror = reject
    reader.readAsDataURL(blob)
  })
