import React from 'react'

// ── Shimmer primitive ─────────────────────────────────────────

const shimmerStyle: React.CSSProperties = {
  background: 'linear-gradient(90deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.09) 50%, rgba(255,255,255,0.04) 100%)',
  backgroundSize: '200% 100%',
  animation: 'skeletonShimmer 1.4s ease-in-out infinite',
  borderRadius: '5px',
}

export function Sk({
  w = '100%',
  h = '14px',
  radius = 5,
  style,
}: {
  w?: string | number
  h?: string | number
  radius?: number
  style?: React.CSSProperties
}) {
  return (
    <div
      style={{
        width: w,
        height: h,
        flexShrink: 0,
        borderRadius: radius,
        ...shimmerStyle,
        ...style,
      }}
    />
  )
}

// ── Page skeletons ────────────────────────────────────────────

export function OrdersSkeleton() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', padding: '0 16px' }}>
      {/* header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, height: 52, flexShrink: 0 }}>
        <Sk w="100px" h={20} />
        <Sk w="140px" h={28} />
        <Sk w="220px" h={28} />
        <div style={{ display: 'flex', gap: 8, marginLeft: 8 }}>
          {['64px','72px','72px','60px'].map((w, i) => <Sk key={i} w={w} h={26} radius={14} />)}
        </div>
      </div>
      {/* table header */}
      <div style={{ height: 28, display: 'flex', alignItems: 'center', gap: 12, borderBottom: '1px solid rgba(255,255,255,0.05)', flexShrink: 0 }}>
        {['60px','80px','1fr','100px','60px','68px','52px'].map((w, i) => (
          <Sk key={i} w={w} h={10} style={{ flex: w === '1fr' ? 1 : undefined }} />
        ))}
      </div>
      {/* rows */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 0, flex: 1, overflow: 'hidden' }}>
        {Array.from({ length: 12 }).map((_, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, height: 40, borderBottom: '1px solid rgba(255,255,255,0.04)', opacity: 1 - i * 0.06 }}>
            {['60px','80px','1fr','100px','60px','68px','52px'].map((w, j) => (
              <Sk key={j} w={w} h={11} style={{ flex: w === '1fr' ? 1 : undefined }} />
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

export function PrintSkeleton() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      {/* tab header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 16, height: 52, padding: '0 24px', flexShrink: 0 }}>
        <Sk w="80px" h={18} />
        <div style={{ display: 'flex', gap: 4 }}>
          <Sk w="70px" h={28} radius={6} />
          <Sk w="70px" h={28} radius={6} />
        </div>
      </div>
      {/* body */}
      <div style={{ display: 'flex', flex: 1, gap: 24, padding: '0 24px 16px', overflow: 'hidden' }}>
        {/* left editor */}
        <div style={{ width: 300, flexShrink: 0, display: 'flex', flexDirection: 'column', gap: 20 }}>
          {[['60%', '30px'], ['60%', '30px'], ['50%', '30px']].map(([w, h], i) => (
            <div key={i}>
              <Sk w="50px" h={10} style={{ marginBottom: 8 }} />
              <Sk w={w} h={h} radius={6} />
            </div>
          ))}
          <div>
            <Sk w="50px" h={10} style={{ marginBottom: 8 }} />
            {Array.from({ length: 7 }).map((_, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                <Sk w="14px" h={14} />
                <Sk w="14px" h={14} />
                <Sk w="100px" h={13} />
                <div style={{ flex: 1 }} />
                <Sk w="68px" h={22} radius={4} />
                <Sk w="22px" h={22} radius={4} />
              </div>
            ))}
          </div>
        </div>
        {/* right preview */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          <Sk w="50px" h={10} style={{ marginBottom: 12 }} />
          <div style={{ background: 'rgba(255,255,255,0.03)', borderRadius: 4, padding: 12, flex: 1 }}>
            {Array.from({ length: 8 }).map((_, i) => (
              <Sk key={i} w={`${50 + (i % 3) * 20}%`} h={14} style={{ marginBottom: 10, opacity: 1 - i * 0.08 }} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export function LiveSkeleton() {
  return (
    <div style={{ display: 'flex', height: '100%', width: '100%' }}>
      {/* Left settings panel */}
      <div style={{ width: 280, flexShrink: 0, borderRight: '1px solid rgba(255,255,255,0.05)', display: 'flex', flexDirection: 'column', padding: '16px 12px', gap: 16 }}>
        {/* keyword input */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          <Sk w="60px" h={10} />
          <Sk w="100%" h={32} radius={8} />
        </div>
        {/* format toggles */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          <Sk w="60px" h={10} />
          <div style={{ display: 'flex', gap: 6 }}>
            {['48px','48px','48px','48px'].map((w, i) => <Sk key={i} w={w} h={28} radius={6} />)}
          </div>
        </div>
        {/* range */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          <Sk w="50px" h={10} />
          <div style={{ display: 'flex', gap: 8 }}>
            <Sk w="80px" h={32} radius={6} />
            <Sk w="80px" h={32} radius={6} />
          </div>
        </div>
        {/* template select */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          <Sk w="60px" h={10} />
          <Sk w="100%" h={32} radius={6} />
        </div>
        <div style={{ flex: 1 }} />
        {/* footer button */}
        <Sk w="100%" h={36} radius={9} />
      </div>
      {/* Right danmaku panel */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        {/* toolbar */}
        <div style={{ height: 52, display: 'flex', alignItems: 'center', gap: 10, padding: '0 16px', flexShrink: 0 }}>
          <Sk w="140px" h={28} radius={6} />
          <Sk w="120px" h={28} radius={6} />
          <div style={{ flex: 1 }} />
          <Sk w="180px" h={32} radius={8} />
          <Sk w="72px" h={32} radius={8} />
        </div>
        {/* info bar */}
        <div style={{ height: 40, display: 'flex', alignItems: 'center', gap: 10, padding: '0 16px', flexShrink: 0 }}>
          {['40px','100px','80px','80px'].map((w, i) => <Sk key={i} w={w} h={12} />)}
        </div>
        {/* filter chips */}
        <div style={{ height: 36, display: 'flex', alignItems: 'center', gap: 8, padding: '0 16px', flexShrink: 0 }}>
          {['48px','72px','72px'].map((w, i) => <Sk key={i} w={w} h={26} radius={100} />)}
        </div>
        {/* table header */}
        <div style={{ height: 28, display: 'flex', alignItems: 'center', gap: 12, padding: '0 8px', flexShrink: 0, borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
          {['60px','88px','1fr','110px','56px','70px','50px'].map((w, i) => (
            <Sk key={i} w={w} h={10} style={{ flex: w === '1fr' ? 1 : undefined }} />
          ))}
        </div>
        {/* rows */}
        <div style={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
          {Array.from({ length: 14 }).map((_, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, height: 38, padding: '0 8px', borderBottom: '1px solid rgba(255,255,255,0.04)', opacity: 1 - i * 0.05 }}>
              {['60px','88px','1fr','110px','56px','70px','50px'].map((w, j) => (
                <Sk key={j} w={w} h={11} style={{ flex: w === '1fr' ? 1 : undefined }} />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export function GenericSkeleton() {
  return (
    <div style={{ padding: 32, display: 'flex', flexDirection: 'column', gap: 16 }}>
      <Sk w="180px" h={28} />
      <Sk w="80%" h={14} style={{ marginTop: 8 }} />
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <Sk w={`${60 - i * 8}%`} h={13} />
        </div>
      ))}
    </div>
  )
}
