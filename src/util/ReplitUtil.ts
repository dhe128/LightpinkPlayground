export type ReplitResponse<Data, E extends {message: string} = Error> = {
  value?: Data | null
  error: E | null
  ok: boolean
}

export const throwOnError = <Data, Error extends {message: string}>({
  value,
  error,
  ok,
}: ReplitResponse<Data, Error>): Data => {
  if (!ok) {
    throw new Error(error.message)
  }
  return value!
}
