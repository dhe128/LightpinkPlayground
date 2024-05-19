import {ValueOf} from 'next/dist/shared/lib/constants'

export type PartializePredicate<State> = (
  key: keyof State,
  value: ValueOf<State>,
) => boolean

export const partializeByPredicate =
  <State>(predicate: PartializePredicate<State>) =>
  (state: State) => {
    const partial = {} as Record<string, unknown>
    for (const key in state) {
      if (predicate(key, state[key])) {
        partial[key] = state[key]
      }
    }
    return partial
  }
