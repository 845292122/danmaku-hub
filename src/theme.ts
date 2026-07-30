import { createSystem, defaultConfig, defineConfig, defineRecipe } from '@chakra-ui/react'

const config = defineConfig({
  preflight: { scope: ':where(html)' },
  theme: {
    tokens: {
      colors: {
        brand: {
          50: { value: '#fff0f3' },
          100: { value: '#ffd6e0' },
          200: { value: '#ffadc2' },
          300: { value: '#ff7299' },
          400: { value: '#ff3d73' },
          500: { value: '#EE1D52' },
          600: { value: '#cc0f40' },
          700: { value: '#a80d36' },
          800: { value: '#870e2f' },
          900: { value: '#6e0f2b' },
          950: { value: '#3d0014' }
        },
        tiktok: {
          50: { value: '#ecffff' },
          100: { value: '#cffcfd' },
          200: { value: '#a5f5f7' },
          300: { value: '#69C9D0' },
          400: { value: '#34b5bf' },
          500: { value: '#199aa5' },
          600: { value: '#177b89' },
          700: { value: '#196471' },
          800: { value: '#1b515c' },
          900: { value: '#1b444e' },
          950: { value: '#0b2a32' }
        }
      },
      fonts: {
        heading: { value: '"Inter", "PingFang SC", "Microsoft YaHei", sans-serif' },
        body: { value: '"Inter", "PingFang SC", "Microsoft YaHei", sans-serif' }
      }
    },
    semanticTokens: {
      colors: {
        bg: { value: { _light: '#ffffff', _dark: '#08080f' } },
        'bg.subtle': { value: { _light: '#f5f5f5', _dark: '#0e0e1a' } },
        'bg.muted': { value: { _light: '#ebebeb', _dark: '#14142a' } },
        'bg.panel': { value: { _light: '#ffffff', _dark: 'rgba(18,18,32,0.72)' } },
        fg: { value: { _light: '#0a0a0a', _dark: '#f5f5f5' } },
        'fg.muted': { value: { _light: '#545454', _dark: '#8a8a8a' } },
        'fg.subtle': { value: { _light: '#767676', _dark: '#5e5e5e' } },
        border: { value: { _light: '#e5e5e5', _dark: '#2a2a2a' } },
        'border.subtle': { value: { _light: '#f0f0f0', _dark: '#1f1f1f' } },
        brand: {
          solid: { value: { _light: '{colors.brand.500}', _dark: '{colors.brand.500}' } },
          contrast: { value: '#ffffff' },
          fg: { value: { _light: '{colors.brand.600}', _dark: '{colors.brand.300}' } },
          subtle: { value: { _light: '{colors.brand.50}', _dark: '{colors.brand.950}' } },
          muted: { value: { _light: '{colors.brand.100}', _dark: '{colors.brand.900}' } },
          emphasized: { value: { _light: '{colors.brand.200}', _dark: '{colors.brand.800}' } },
          focusRing: { value: { _light: '{colors.brand.500}', _dark: '{colors.brand.500}' } },
          border: { value: { _light: '{colors.brand.200}', _dark: '{colors.brand.800}' } }
        },
        tiktok: {
          solid: { value: { _light: '{colors.tiktok.300}', _dark: '{colors.tiktok.300}' } },
          contrast: { value: '#000000' },
          fg: { value: { _light: '{colors.tiktok.600}', _dark: '{colors.tiktok.300}' } },
          subtle: { value: { _light: '{colors.tiktok.50}', _dark: '{colors.tiktok.950}' } },
          muted: { value: { _light: '{colors.tiktok.100}', _dark: '{colors.tiktok.900}' } },
          emphasized: { value: { _light: '{colors.tiktok.200}', _dark: '{colors.tiktok.800}' } },
          focusRing: { value: { _light: '{colors.tiktok.300}', _dark: '{colors.tiktok.300}' } },
          border: { value: { _light: '{colors.tiktok.200}', _dark: '{colors.tiktok.800}' } }
        }
      }
    },
    layerStyles: {
      'tiktok.gradient': {
        backgroundImage: 'linear-gradient(135deg, {colors.brand.500}, {colors.tiktok.300})'
      },
      'tiktok.card': {
        bg: 'bg.panel',
        borderWidth: '1px',
        borderColor: 'border',
        borderRadius: 'xl'
      },
      'glass': {
        bg: 'rgba(255,255,255,0.04)',
        backdropFilter: 'blur(12px) saturate(150%)',
        WebkitBackdropFilter: 'blur(12px) saturate(150%)',
        borderWidth: '1px',
        borderColor: 'rgba(255,255,255,0.08)',
        borderRadius: 'xl'
      },
      'glass.sidebar': {
        bg: 'rgba(12,12,24,0.72)',
        backdropFilter: 'blur(20px) saturate(160%)',
        WebkitBackdropFilter: 'blur(20px) saturate(160%)',
        borderRightWidth: '1px',
        borderRightColor: 'rgba(255,255,255,0.06)'
      },
      'glass.card': {
        bg: 'rgba(255,255,255,0.04)',
        backdropFilter: 'blur(12px) saturate(150%)',
        WebkitBackdropFilter: 'blur(12px) saturate(150%)',
        borderWidth: '1px',
        borderColor: 'rgba(255,255,255,0.07)',
        borderRadius: 'xl',
        boxShadow: '0 4px 32px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.06)'
      }
    },
    textStyles: {
      'tiktok.logo': {
        fontWeight: '900',
        letterSpacing: '-0.02em',
        backgroundImage: 'linear-gradient(135deg, {colors.brand.500}, {colors.tiktok.300})',
        backgroundClip: 'text',
        WebkitTextFillColor: 'transparent'
      }
    },
    recipes: {
      button: defineRecipe({
        base: {
          rounded: 'md',
          fontWeight: '700',
          transition: 'all 0.15s ease',
          _hover: { transform: 'scale(1.03)' },
          _active: { transform: 'scale(0.97)' }
        },
        defaultVariants: {
          // @ts-expect-error -- 'brand' is a custom palette not in Chakra's generated ColorPalette type
          colorPalette: 'brand'
        }
      }),
      badge: defineRecipe({
        base: {
          rounded: 'md',
          fontWeight: '700'
        },
        defaultVariants: {
          // @ts-expect-error -- 'brand' is a custom palette not in Chakra's generated ColorPalette type
          colorPalette: 'brand',
          variant: 'subtle'
        }
      }),
      input: defineRecipe({
        base: {
          rounded: 'xl',
          _focusVisible: {
            outlineColor: 'brand.focusRing'
          }
        },
        defaultVariants: {
          variant: 'subtle'
        }
      })
    }
  },
  globalCss: {
    html: {
      '--chakra-colors-color-palette-50': 'var(--chakra-colors-brand-50)',
      '--chakra-colors-color-palette-100': 'var(--chakra-colors-brand-100)',
      '--chakra-colors-color-palette-200': 'var(--chakra-colors-brand-200)',
      '--chakra-colors-color-palette-300': 'var(--chakra-colors-brand-300)',
      '--chakra-colors-color-palette-400': 'var(--chakra-colors-brand-400)',
      '--chakra-colors-color-palette-500': 'var(--chakra-colors-brand-500)',
      '--chakra-colors-color-palette-600': 'var(--chakra-colors-brand-600)',
      '--chakra-colors-color-palette-700': 'var(--chakra-colors-brand-700)',
      '--chakra-colors-color-palette-800': 'var(--chakra-colors-brand-800)',
      '--chakra-colors-color-palette-900': 'var(--chakra-colors-brand-900)',
      '--chakra-colors-color-palette-950': 'var(--chakra-colors-brand-950)',
      '--chakra-colors-color-palette-solid': 'var(--chakra-colors-brand-solid)',
      '--chakra-colors-color-palette-contrast': 'var(--chakra-colors-brand-contrast)',
      '--chakra-colors-color-palette-fg': 'var(--chakra-colors-brand-fg)',
      '--chakra-colors-color-palette-subtle': 'var(--chakra-colors-brand-subtle)',
      '--chakra-colors-color-palette-muted': 'var(--chakra-colors-brand-muted)',
      '--chakra-colors-color-palette-emphasized': 'var(--chakra-colors-brand-emphasized)',
      '--chakra-colors-color-palette-focus-ring': 'var(--chakra-colors-brand-focus-ring)',
      '--chakra-colors-color-palette-border': 'var(--chakra-colors-brand-border)'
    },
    body: {
      bg: 'bg',
      color: 'fg',
      fontFamily: 'body'
    },
    'button, [role="button"], select, [data-scope="select"] [data-part="trigger"]': {
      cursor: 'pointer'
    }
  }
})

export const system = createSystem(defaultConfig, config)
