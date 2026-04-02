import { ProfileSection } from '../components/Dashboard/ProfileSection.jsx'
import { ResultsSection } from '../components/Dashboard/ResultsSection.jsx'
import { MealPlanSection } from '../components/Dashboard/MealPlanSection.jsx'
import { ProgressSection } from '../components/Dashboard/ProgressSection.jsx'

function WaveDivider({ flip = false }) {
  return (
    <svg
      viewBox="0 0 1440 40"
      fill="none"
      style={{ width: '100%', height: 40, display: 'block', transform: flip ? 'scaleY(-1)' : 'none' }}
    >
      <path
        d="M0 20 Q360 0 720 20 Q1080 40 1440 20 L1440 40 L0 40 Z"
        fill="rgba(0,229,196,0.05)"
      />
    </svg>
  )
}

export function DashboardPage({ userId }) {
  return (
    <div
      className="h-full overflow-y-auto"
      style={{ backgroundColor: 'var(--bg-deep)', scrollSnapType: 'y proximity' }}
    >
      <div style={{ scrollSnapAlign: 'start' }}>
        <ProfileSection />
      </div>
      <WaveDivider />
      <div style={{ scrollSnapAlign: 'start' }}>
        <ResultsSection />
      </div>
      <WaveDivider flip />
      <div style={{ scrollSnapAlign: 'start' }}>
        <MealPlanSection />
      </div>
      <WaveDivider />
      <div style={{ scrollSnapAlign: 'start' }}>
        <ProgressSection />
      </div>
    </div>
  )
}
