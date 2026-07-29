import {
  Badge,
  Box,
  Button,
  Flex,
  Grid,
  Heading,
  HStack,
  IconButton,
  Input,
  InputGroup,
  Stack,
  Text,
  Textarea
} from '@chakra-ui/react'

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <Box>
      <Text fontSize="xs" fontWeight="700" letterSpacing="0.1em" textTransform="uppercase" color="fg.subtle" mb={3}>
        {title}
      </Text>
      {children}
    </Box>
  )
}

export default function Home() {
  return (
    <Stack p={8} gap={10} maxW="680px" mx="auto">
      {/* Hero */}
      <Box>
        <Heading textStyle="tiktok.logo" fontSize="5xl" mb={1}>
          LiveHunter
        </Heading>
        <Text color="fg.muted" fontSize="md">
          TikTok 风格组件库 · Chakra UI v3
        </Text>
      </Box>

      {/* Buttons */}
      <Section title="按钮">
        <Stack gap={3}>
          <HStack gap={3} flexWrap="wrap">
            <Button size="lg">关注</Button>
            <Button size="lg" variant="outline">
              消息
            </Button>
            <Button size="lg" variant="ghost">
              分享
            </Button>
            <Button size="lg" colorPalette="tiktok">
              发现
            </Button>
          </HStack>
          <HStack gap={3} flexWrap="wrap">
            <Button size="sm">关注</Button>
            <Button size="sm" variant="outline">
              消息
            </Button>
            <Button size="sm" variant="subtle">
              分享
            </Button>
            <Button size="sm" colorPalette="tiktok" variant="outline">
              搜索
            </Button>
          </HStack>
        </Stack>
      </Section>

      {/* Icon Buttons */}
      <Section title="图标按钮">
        <HStack gap={3}>
          <IconButton aria-label="like" size="lg">
            ♥
          </IconButton>
          <IconButton aria-label="comment" size="lg" variant="outline">
            💬
          </IconButton>
          <IconButton aria-label="share" size="lg" variant="ghost">
            ↗
          </IconButton>
          <IconButton aria-label="music" size="lg" colorPalette="tiktok">
            ♪
          </IconButton>
          <IconButton aria-label="settings" size="lg" variant="subtle">
            ⚙
          </IconButton>
        </HStack>
      </Section>

      {/* Badges */}
      <Section title="徽章">
        <HStack gap={3} flexWrap="wrap">
          <Badge size="lg">热门</Badge>
          <Badge size="lg" variant="solid">
            新
          </Badge>
          <Badge size="lg" variant="outline">
            推荐
          </Badge>
          <Badge size="lg" colorPalette="tiktok">
            直播中
          </Badge>
          <Badge size="lg" colorPalette="tiktok" variant="solid">
            限时
          </Badge>
          <Badge size="lg" colorPalette="green">
            已关注
          </Badge>
        </HStack>
      </Section>

      {/* Inputs */}
      <Section title="输入框">
        <Stack gap={3}>
          <Input placeholder="搜索视频、话题或用户..." />
          <InputGroup startElement="🔍">
            <Input placeholder="输入关键词..." />
          </InputGroup>
          <Textarea placeholder="分享你的想法..." rows={3} />
        </Stack>
      </Section>

      {/* Gradient card */}
      <Section title="渐变卡片">
        <Box layerStyle="tiktok.gradient" p={6} borderRadius="2xl">
          <HStack justify="space-between" align="flex-start">
            <Box>
              <Heading size="lg" color="white" mb={1}>
                为你推荐
              </Heading>
              <Text color="whiteAlpha.800" fontSize="sm">
                根据你的兴趣个性化推荐内容
              </Text>
            </Box>
            <Badge variant="solid" colorPalette="blackAlpha" fontSize="xs">
              HOT
            </Badge>
          </HStack>
          <HStack gap={2} mt={5}>
            <Button size="sm" bg="whiteAlpha.300" color="white" _hover={{ bg: 'whiteAlpha.400' }}>
              查看全部
            </Button>
            <Button size="sm" variant="ghost" color="white" _hover={{ bg: 'whiteAlpha.200' }}>
              换一换
            </Button>
          </HStack>
        </Box>
      </Section>

      {/* Content cards */}
      <Section title="内容卡片">
        <Stack gap={3}>
          {[
            { title: '热门视频', sub: '今日播放量 +120万', badge: { label: '热门', palette: 'brand' } },
            { title: '最新动态', sub: '关注的人刚刚更新', badge: null },
            { title: '直播推荐', sub: '3 位主播正在直播', badge: { label: '直播中', palette: 'tiktok' } }
          ].map(({ title, sub, badge }) => (
            <Box key={title} layerStyle="tiktok.card" p={4}>
              <HStack justify="space-between" align="center">
                <Box>
                  <HStack gap={2} mb={0.5}>
                    <Text fontWeight="semibold">{title}</Text>
                    {badge && (
                      <Badge colorPalette={badge.palette} size="sm">
                        {badge.label}
                      </Badge>
                    )}
                  </HStack>
                  <Text fontSize="sm" color="fg.muted">
                    {sub}
                  </Text>
                </Box>
                <Button size="sm" variant="ghost">
                  查看
                </Button>
              </HStack>
            </Box>
          ))}
        </Stack>
      </Section>

      {/* Color palette */}
      <Section title="品牌色板">
        <Stack gap={2}>
          <Grid templateColumns="repeat(11, 1fr)" gap={1}>
            {[50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950].map(shade => (
              <Box key={shade} h="32px" borderRadius="md" bg={`brand.${shade}`} title={`brand.${shade}`} />
            ))}
          </Grid>
          <Flex justify="space-between">
            <Text fontSize="xs" color="fg.subtle">
              brand (TikTok Red)
            </Text>
            <Text fontSize="xs" color="fg.subtle">
              #EE1D52
            </Text>
          </Flex>

          <Grid templateColumns="repeat(11, 1fr)" gap={1} mt={1}>
            {[50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950].map(shade => (
              <Box key={shade} h="32px" borderRadius="md" bg={`tiktok.${shade}`} title={`tiktok.${shade}`} />
            ))}
          </Grid>
          <Flex justify="space-between">
            <Text fontSize="xs" color="fg.subtle">
              tiktok (Cyan)
            </Text>
            <Text fontSize="xs" color="fg.subtle">
              #69C9D0
            </Text>
          </Flex>

          <Box h="40px" borderRadius="lg" mt={1} bgGradient="to-r" gradientFrom="brand.500" gradientTo="tiktok.300" />
          <Text fontSize="xs" color="fg.subtle" textAlign="center">
            品牌渐变
          </Text>
        </Stack>
      </Section>
    </Stack>
  )
}
