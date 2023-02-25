import type { OnMessageFn } from '../utils/bridge';
import {
  createPortMessanger,
  createRuntimeMessanger,
  DEVTOOLS_CONNECTION_NAME,
  DEVTOOLS_CONTENT_PORT,
} from './messager';
import { log, createCallbackStack } from '../utils';

log('background script working');

const { postRuntimeMessage } = createRuntimeMessanger();

// state reused between panels
let onPortMessage: OnMessageFn;

chrome.webNavigation.onCompleted.addListener(() => {
  postRuntimeMessage('NavComplete', true);
});

chrome.runtime.onConnect.addListener((port) => {
  // handle the connection to the devtools page (devtools.html)
  if (port.name === DEVTOOLS_CONNECTION_NAME) {
    const disconnectListener = () => {
      log('Devtools Port disconnected');
      port.onDisconnect.removeListener(disconnectListener);
    };
    port.onDisconnect.addListener(disconnectListener);
    return;
  }

  // handle the connection to the content script (content.js)
  if (port.name !== DEVTOOLS_CONTENT_PORT) return log('Ignored connection:', port.name);

  const { push: addCleanup, execute: clearRuntimeListeners } = createCallbackStack();

  port.onDisconnect.addListener(() => {
    clearRuntimeListeners();
    log('Content Port disconnected.');
  });

  const messanger = createPortMessanger(port);
  onPortMessage = messanger.onPortMessage;

  addCleanup(
    onPortMessage('QwikDevtoolsLogs', (data) => {
      postRuntimeMessage('QwikDevtoolsLogs', data);
    })
  );
});

export {};
