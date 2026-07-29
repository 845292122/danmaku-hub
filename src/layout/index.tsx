import { Box, Flex, Text, VStack } from '@chakra-ui/react'
import { BarChart2Icon, PrinterIcon, RadioIcon, ReceiptIcon } from 'lucide-react'
import React, { type ComponentType } from 'react'
import { NavLink, Outlet, useLocation, useNavigation } from 'react-router'
import Live from '~/pages/live'

const SIDEBAR_W = '88px'

const NAV_ITEMS: { label: string; icon: ComponentType<{ size?: number; strokeWidth?: number }>; path: string }[] = [
  { label: '直播', icon: RadioIcon, path: '/live' },
  { label: '打印', icon: PrinterIcon, path: '/print' },
  { label: '订单', icon: ReceiptIcon, path: '/orders' },
  { label: '数据', icon: BarChart2Icon, path: '/analytics' }
]

function NavItem({
  label,
  icon: Icon,
  path
}: {
  label: string
  icon: ComponentType<{ size?: number; strokeWidth?: number }>
  path: string
}) {
  return (
    <NavLink to={path} end={path === '/'} style={{ display: 'block', width: '100%' }}>
      {({ isActive }) => (
        <VStack
          role="group"
          gap={1}
          w="full"
          h="64px"
          align="center"
          justify="center"
          cursor="pointer"
          color={isActive ? 'brand.solid' : 'fg.muted'}
          _hover={{ color: 'brand.solid' }}
          transition="color 0.2s ease"
        >
          <VStack gap={1} px={4} py={2} borderRadius="xl" alignSelf="center" bg="transparent" transition="all 0.2s ease">
            <Icon size={28} strokeWidth={1.8} />
            <Text fontSize="9px" fontWeight="500" lineHeight="1">
              {label}
            </Text>
          </VStack>
        </VStack>
      )}
    </NavLink>
  )
}

const dragStyle = { WebkitAppRegion: 'drag', cursor: 'default' } as React.CSSProperties
const noDragStyle = { WebkitAppRegion: 'no-drag' } as React.CSSProperties

const Layout = () => {
  const navigation = useNavigation()
  const location = useLocation()
  const isLive = location.pathname === '/live'

  return (
    <Flex h="100vh" overflow="hidden">
      {/* Left Sidebar */}
      <Flex as="nav" direction="column" align="center" w={SIDEBAR_W} flexShrink={0} h="full" bg="bg" py={4} px={3} gap={0}>
        {/* macOS traffic light drag zone */}
        <Box w="full" h="28px" flexShrink={0} mt={-4} style={dragStyle} />
        {/* Logo - black hole */}
        <Box mb={12} mt={0} w="36px" h="36px" borderRadius="full" overflow="hidden" flexShrink={0} boxShadow="0 0 0 1px rgba(255,255,255,0.08)">
          <svg viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%', display: 'block' }}>
            <defs>
              <radialGradient id="bhBg" cx="42%" cy="38%" r="65%">
                <stop offset="0%" stopColor="#1c1c2e" />
                <stop offset="52%" stopColor="#080810" />
                <stop offset="100%" stopColor="#020206" />
              </radialGradient>
            </defs>
            <circle cx="18" cy="18" r="18" fill="url(#bhBg)" />
            <ellipse cx="18" cy="18" rx="13.5" ry="4.2" stroke="rgba(255,255,255,0.11)" strokeWidth="0.75" style={{ transformOrigin: '18px 18px', animation: 'bh-orbit 10s linear infinite' }} />
            <ellipse cx="18" cy="18" rx="9" ry="2.8" stroke="rgba(255,255,255,0.17)" strokeWidth="0.75" style={{ transformOrigin: '18px 18px', animation: 'bh-orbit 7s linear infinite reverse' }} />
            <circle cx="18" cy="18" r="5.5" fill="#000" />
          </svg>
          <style>{`@keyframes bh-orbit { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
        </Box>

        {/* Nav items */}
        <VStack gap={1} w="full" flex={1} style={noDragStyle}>
          {NAV_ITEMS.map(item => (
            <NavItem key={item.path} {...item} />
          ))}
        </VStack>

        {/* Bottom actions */}
        <VStack gap={2} align="center" mb={4} style={noDragStyle}>
          {/* <ColorModeButton /> */}
          {/* Avatar placeholder */}
          <Flex
            w="36px"
            h="36px"
            borderRadius="full"
            bg="bg.muted"
            borderWidth="2px"
            borderColor="border"
            align="center"
            justify="center"
            cursor="pointer"
            _hover={{ borderColor: 'brand.solid' }}
            transition="border-color 0.15s ease"
          >
            <Text fontSize="14px">👤</Text>
          </Flex>
        </VStack>
      </Flex>

      {/* Main content */}
      <Box flex={1} overflow="hidden" bg="bg" position="relative">
        {navigation.state === 'loading' && (
          <Box
            position="absolute"
            top={0}
            left={0}
            right={0}
            h="2px"
            bg="brand.solid"
            zIndex={10}
            style={{ animation: 'pulse 1s infinite' }}
          />
        )}
        {/* Live always mounted to preserve WebSocket connection across navigation */}
        <Box display={isLive ? 'block' : 'none'} h="full" w="full" overflow="hidden">
          <Live />
        </Box>
        {!isLive && (
          <Box h="full" w="full" overflow="auto">
            <Outlet />
          </Box>
        )}
      </Box>
    </Flex>
  )
}

export default Layout
