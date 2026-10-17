import { CenteredLayout } from '@/shared/layouts/CenteredLayout'

import { AppLayout } from './layouts/AppLayout'

import { Hero } from './widgets/Hero'
import { Documentation } from './widgets/Documentation'
import { Connect } from './widgets/Connect'

function App(): React.JSX.Element {
  return (
    <CenteredLayout>
      <AppLayout top={<Hero />} bottomLeft={<Documentation />} bottomRight={<Connect />} />
    </CenteredLayout>
  )
}

export default App
