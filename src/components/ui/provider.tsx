'use client'

import { ChakraProvider } from '@chakra-ui/react'
import createCache from '@emotion/cache'
import { CacheProvider } from '@emotion/react'
import { system } from '~/theme'
import { cspNonce } from '~/utils/cspNonce'
import { ColorModeProvider, type ColorModeProviderProps } from './color-mode'

const emotionCache = createCache({ key: 'css', nonce: cspNonce })

export function Provider(props: ColorModeProviderProps) {
  return (
    <CacheProvider value={emotionCache}>
      <ChakraProvider value={system}>
        <ColorModeProvider defaultTheme="dark" {...props} />
      </ChakraProvider>
    </CacheProvider>
  )
}
