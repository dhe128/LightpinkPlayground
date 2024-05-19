import { DataUrl } from "./Uint8ArrayUtil"

export const triggerDownload = (dataUrl: DataUrl, fileName: string) => {
  const link = document.createElement('a')
  link.href = dataUrl
  link.download = fileName

  const syntheticEvent = new MouseEvent('click', {
    bubbles: true,
    cancelable: true,
    view: window,
  })
  link.dispatchEvent(syntheticEvent)
}
