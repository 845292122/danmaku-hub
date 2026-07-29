import { Box, Button, Flex, Input, Text, VStack } from '@chakra-ui/react'
import { MessageSquareIcon, PhoneIcon } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

const COUNTDOWN = 60

function OtpButton({ onClick, disabled }: { onClick: () => void; disabled: boolean }) {
  const [seconds, setSeconds] = useState(0)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)

  function handleClick() {
    if (seconds > 0 || disabled) return
    onClick()
    setSeconds(COUNTDOWN)
    timerRef.current = setInterval(() => {
      setSeconds(s => {
        if (s <= 1) {
          clearInterval(timerRef.current!)
          timerRef.current = null
          return 0
        }
        return s - 1
      })
    }, 1000)
  }

  useEffect(
    () => () => {
      if (timerRef.current) clearInterval(timerRef.current)
    },
    []
  )

  const counting = seconds > 0
  return (
    <Button
      size="sm"
      flexShrink={0}
      disabled={counting || disabled}
      onClick={handleClick}
      colorPalette="brand"
      variant="outline"
      borderRadius="xl"
      fontSize="12px"
      px={3}
      minW="88px"
    >
      {counting ? `${seconds}s 后重试` : '获取验证码'}
    </Button>
  )
}

export default function Login() {
  const [phone, setPhone] = useState('')
  const [code, setCode] = useState('')

  return (
    <Flex h="100vh" w="full" align="center" justify="center" bg="bg" position="relative" overflow="hidden">
      {/* Radial glow behind card */}
      <Box
        position="absolute"
        top="50%"
        left="50%"
        transform="translate(-50%, -50%)"
        w="600px"
        h="600px"
        borderRadius="full"
        style={{
          background: 'radial-gradient(circle, rgba(238,29,82,0.18) 0%, rgba(105,201,208,0.10) 45%, transparent 70%)',
          filter: 'blur(40px)',
          pointerEvents: 'none'
        }}
      />

      {/* Card */}
      <Box
        layerStyle="tiktok.card"
        w="380px"
        px={8}
        py={10}
        position="relative"
        zIndex={1}
        style={{ backdropFilter: 'blur(12px)' }}
      >
        <VStack gap={6} align="stretch">
          {/* Logo + Title */}
          <VStack gap={3} align="center">
            <Flex w="48px" h="48px" borderRadius="xl" layerStyle="tiktok.gradient" align="center" justify="center">
              <Text fontSize="18px" fontWeight="900" color="white" letterSpacing="-0.05em">
                LH
              </Text>
            </Flex>
            <VStack gap={1} align="center">
              <Text fontSize="22px" fontWeight="800" color="fg" letterSpacing="-0.03em">
                欢迎回来
              </Text>
              <Text fontSize="13px" color="fg.muted">
                登录你的 LiveHunter 账号
              </Text>
            </VStack>
          </VStack>

          {/* Form */}
          <VStack gap={3} align="stretch">
            {/* Phone input */}
            <Box position="relative">
              <Box position="absolute" left={3} top="50%" transform="translateY(-50%)" color="fg.subtle" zIndex={1}>
                <PhoneIcon size={15} />
              </Box>
              <Input
                pl="36px"
                placeholder="手机号"
                value={phone}
                onChange={e => setPhone(e.target.value)}
                borderRadius="xl"
                bg="bg.muted"
                borderColor="border"
                _focus={{ borderColor: 'brand.solid' }}
                fontSize="14px"
              />
            </Box>

            {/* Code input + button */}
            <Flex gap={2} align="center">
              <Box position="relative" flex={1}>
                <Box position="absolute" left={3} top="50%" transform="translateY(-50%)" color="fg.subtle" zIndex={1}>
                  <MessageSquareIcon size={15} />
                </Box>
                <Input
                  pl="36px"
                  placeholder="验证码"
                  value={code}
                  onChange={e => setCode(e.target.value)}
                  borderRadius="xl"
                  bg="bg.muted"
                  borderColor="border"
                  _focus={{ borderColor: 'brand.solid' }}
                  fontSize="14px"
                />
              </Box>
              <OtpButton onClick={() => {}} disabled={!phone} />
            </Flex>
          </VStack>

          {/* Action buttons */}
          <VStack gap={3} align="stretch">
            <Button
              size="md"
              w="full"
              borderRadius="xl"
              layerStyle="tiktok.gradient"
              color="white"
              fontWeight="700"
              fontSize="15px"
              border="none"
              _hover={{ opacity: 0.9, transform: 'scale(1.02)' }}
              _active={{ transform: 'scale(0.98)' }}
              disabled={!phone || !code}
            >
              登录
            </Button>

            <Button
              size="md"
              w="full"
              borderRadius="xl"
              bg="tiktok.solid"
              color="black"
              fontWeight="700"
              fontSize="15px"
              border="none"
              _hover={{ opacity: 0.85, transform: 'scale(1.02)' }}
              _active={{ transform: 'scale(0.98)' }}
            >
              微信登录
            </Button>
          </VStack>

          {/* Footer link */}
          <Flex justify="center" gap={1}>
            <Text fontSize="13px" color="fg.muted">
              没有账号？
            </Text>
            <Text fontSize="13px" color="brand.solid" cursor="pointer" _hover={{ opacity: 0.8 }}>
              立即注册
            </Text>
          </Flex>
        </VStack>
      </Box>
    </Flex>
  )
}
