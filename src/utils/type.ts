export type Qrl = {
  $dev$: {
    file: string;
    lo: number;
    hi: number;
    displayName: string;
  };
  $symbol$: string;
  $captureRef$?: [];
};

type Task = {
  $qrl$: Qrl;
};

export type QcElement = Element & {
  _qc_?: Component;
};

type Component = {
  $appendStyles$: {
    content: string;
    styleId: string;
  }[];
  $componentQrl$: Qrl;
  $watches$: Task[];
  $vdom$: any[];
  $parent$?: Component;
  $props$: Record<string, any>;
  li: Record<string, any>;
};

export type RequestLog = chrome.devtools.network.Request;

export type RoutePath = {
  path: string;
  regexp: string;
  meta: Record<string, any>;
};

export type RenderStats = {
  byOp: Record<string, number>;
  roots: any;
  hostElements: any;
  operations: any;
};

export type HTMLElementEvent<T extends HTMLElement> = Event & {
  target: T;
};
