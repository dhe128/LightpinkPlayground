'use client'
import {NextUIProvider} from '@nextui-org/system'
import {useRouter} from 'next/navigation'
import {ThemeProvider as NextThemesProvider} from 'next-themes'
import {ThemeProviderProps} from 'next-themes/dist/types'
import type {PropsWithChildren} from 'react'

export type ProvidersProps = {
  themeProps?: Omit<ThemeProviderProps, 'children'>
}

export const Providers = ({
  children,
  themeProps,
}: PropsWithChildren<ProvidersProps>) => {
  const router = useRouter()

  return (
    <NextUIProvider navigate={router.push}>
      <NextThemesProvider {...themeProps}>{children}</NextThemesProvider>
    </NextUIProvider>
  )
}
