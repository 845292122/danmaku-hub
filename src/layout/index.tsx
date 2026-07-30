import { Box, Flex, Text, VStack } from '@chakra-ui/react'
import { BarChart2Icon, PrinterIcon, RadioIcon, ReceiptIcon } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import React, { type ComponentType, useEffect, useRef, useState } from 'react'
import { NavLink, Outlet, useLocation, useNavigation } from 'react-router'
import { GenericSkeleton, LiveSkeleton, OrdersSkeleton, PrintSkeleton } from '~/components/Skeleton'
import Live from '~/pages/live'

const SKELETON_MAP: Record<string, React.ComponentType> = {
  '/orders': OrdersSkeleton,
  '/print': PrintSkeleton,
}

function PageWithSkeleton({ path }: { path: string }) {
  const [ready, setReady] = useState(false)

  useEffect(() => {
    setReady(false)
    const id = setTimeout(() => setReady(true), 220)
    return () => clearTimeout(id)
  }, [path])

  const SkeletonComp = SKELETON_MAP[path] ?? GenericSkeleton

  return (
    <div style={{ position: 'relative', height: '100%', width: '100%' }}>
      <Outlet />
      <AnimatePresence>
        {!ready && (
          <motion.div
            key="skeleton"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            style={{ position: 'absolute', inset: 0, zIndex: 10, background: '#08080f' }}
          >
            <SkeletonComp />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

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
          <VStack gap={1} px={4} py={2} borderRadius="xl" alignSelf="center" bg="transparent" position="relative">
            {isActive && (
              <motion.div
                layoutId="nav-active-pill"
                style={{
                  position: 'absolute',
                  inset: 0,
                  borderRadius: 12,
                  background: 'rgba(238,29,82,0.12)',
                  border: '1px solid rgba(238,29,82,0.20)',
                }}
                transition={{ type: 'spring', stiffness: 380, damping: 30 }}
              />
            )}
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
  const [showLiveSkeleton, setShowLiveSkeleton] = useState(false)
  const prevIsLiveRef = useRef(false)

  useEffect(() => {
    if (isLive && !prevIsLiveRef.current) {
      setShowLiveSkeleton(true)
      const id = setTimeout(() => setShowLiveSkeleton(false), 220)
      prevIsLiveRef.current = isLive
      return () => clearTimeout(id)
    }
    prevIsLiveRef.current = isLive
  }, [isLive])

  return (
    <Flex direction="column" h="100vh" overflow="hidden" bg="bg" position="relative">
      {/* Full-width titlebar drag zone — sits above all content, contains traffic lights */}
      <Box w="full" h="36px" flexShrink={0} zIndex={2} style={dragStyle} />

      {/* Background gradient orbs */}
      <Box position="fixed" inset={0} zIndex={0} pointerEvents="none" overflow="hidden">
        {/* Red orb — top right */}
        <Box
          position="absolute"
          top="-15%"
          right="-8%"
          w="55vw"
          h="55vw"
          borderRadius="full"
          background="radial-gradient(circle, rgba(238,29,82,0.22) 0%, transparent 65%)"
          style={{ filter: 'blur(72px)' }}
        />
        {/* Cyan orb — bottom left */}
        <Box
          position="absolute"
          bottom="-20%"
          left="-5%"
          w="50vw"
          h="50vw"
          borderRadius="full"
          background="radial-gradient(circle, rgba(105,201,208,0.14) 0%, transparent 65%)"
          style={{ filter: 'blur(90px)' }}
        />
        {/* Faint red center accent */}
        <Box
          position="absolute"
          top="40%"
          left="30%"
          w="35vw"
          h="35vw"
          borderRadius="full"
          background="radial-gradient(circle, rgba(238,29,82,0.05) 0%, transparent 60%)"
          style={{ filter: 'blur(60px)' }}
        />
      </Box>

      <Flex flex={1} overflow="hidden" position="relative">
      {/* Left Sidebar */}
      <Flex
        as="nav"
        direction="column"
        align="center"
        w={SIDEBAR_W}
        flexShrink={0}
        h="full"
        layerStyle="glass.sidebar"
        pt={2}
        pb={4}
        px={3}
        gap={0}
        zIndex={1}
        position="relative"
      >
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
      <Box flex={1} overflow="hidden" bg="transparent" position="relative" zIndex={1}>
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
        <Box display={isLive ? 'block' : 'none'} h="full" w="full" overflow="hidden" position="relative">
          <Live />
          <AnimatePresence>
            {showLiveSkeleton && (
              <motion.div
                key="live-skeleton"
                initial={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                style={{ position: 'absolute', inset: 0, zIndex: 10, background: '#08080f' }}
              >
                <LiveSkeleton />
              </motion.div>
            )}
          </AnimatePresence>
        </Box>
        <AnimatePresence initial={false}>
          {!isLive && (
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.02 }}
              transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
              style={{ height: '100%', width: '100%', overflow: 'auto', position: 'absolute', inset: 0 }}
            >
              <PageWithSkeleton path={location.pathname} />
            </motion.div>
          )}
        </AnimatePresence>
      </Box>
      </Flex>
    </Flex>
  )
}

export default Layout
