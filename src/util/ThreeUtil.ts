import {type Loader} from 'three'

export const makePromise = <Data>(
  Loader: new () => Loader<Data>,
  url: string,
): Promise<Data> =>
  new Promise((resolve, reject) => {
    new Loader().load(
      url,
      value => {
        resolve(value)
      },
      undefined,
      error => {
        reject(error)
      },
    )
  })
