'use client'

import { ChakraProvider } from '@chakra-ui/react'
import createCache from '@emotion/cache'
import { CacheProvider } from '@emotion/react'
import { system } from '~/theme'
import { ColorModeProvider, type ColorModeProviderProps } from './color-mode'

const nonce = document.querySelector<HTMLElement>('style[nonce]')?.nonce || undefined
const emotionCache = createCache({ key: 'css', nonce })

export function Provider(props: ColorModeProviderProps) {
  return (
    <CacheProvider value={emotionCache}>
      <ChakraProvider value={system}>
        <ColorModeProvider defaultTheme="dark" {...props} />
      </ChakraProvider>
    </CacheProvider>
  )
}
