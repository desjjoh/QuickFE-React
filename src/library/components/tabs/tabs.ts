export type TabId = string
export type Tone = 'primary' | 'neutral'
export type TabsContextValue = {
  id: string
  activeTab: TabId
  activate: (id: TabId) => void
  tone: Tone
  hasPanel: (id: TabId) => boolean
}
