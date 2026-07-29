import { Box, Heading, Text } from '@chakra-ui/react'
import { BarChart2Icon } from 'lucide-react'

export default function Analytics() {
  return (
    <Box p={8}>
      <BarChart2Icon size={32} strokeWidth={1.5} color="var(--chakra-colors-fg-muted)" />
      <Heading mt={4} mb={2}>
        数据
      </Heading>
      <Text color="fg.muted">数据分析页面</Text>
    </Box>
  )
}
