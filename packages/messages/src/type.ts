export type Qrl = {
  dev: {
    file: string
    lo: number
    hi: number
    displayName: string
  }
  $symbol$: string
  $captureRef$?: []
}

type Task = {
  $qrl$: Qrl
}

type Component = {
  $appendStyles$: {
    content: string
    styleId: string
  }[]
  $componentQrl$: Qrl
  $watches$: Task[]
  $vdom$: any[]
  $parent$?: Component
  $props$: Record<string, any>
  li: Record<string, any>
}

export type QcElement = Element & {
  _qc_?: Component
}
