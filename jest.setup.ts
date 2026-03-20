import { Blob, File } from 'buffer';
import { createRequire } from 'module';
import { TextDecoder, TextEncoder } from 'util';
import { ReadableStream, TransformStream, WritableStream } from 'stream/web';
import { MessageChannel, MessagePort } from 'worker_threads';
import {
  clearImmediate,
  clearInterval,
  clearTimeout,
  setImmediate,
  setInterval,
  setTimeout,
} from 'timers';
import '@testing-library/jest-dom';

type PerformanceWithMarkResourceTiming = Performance & {
  markResourceTiming?: (...args: unknown[]) => void;
};

const requireUndici = createRequire(__filename);

Object.assign(globalThis, {
  Blob,
  File,
  MessageChannel,
  MessagePort,
  ReadableStream,
  clearImmediate,
  clearInterval,
  clearTimeout,
  setImmediate,
  setInterval,
  setTimeout,
  TextDecoder,
  TextEncoder,
  TransformStream,
  WritableStream,
});

const performanceWithMarkResourceTiming = globalThis.performance as
  | PerformanceWithMarkResourceTiming
  | undefined;

if (
  performanceWithMarkResourceTiming &&
  !performanceWithMarkResourceTiming.markResourceTiming
) {
  Object.assign(performanceWithMarkResourceTiming, {
    markResourceTiming: () => {},
  });
}

const {
  fetch,
  FormData: UndiciFormData,
  Headers,
  Request,
  Response,
} = requireUndici('undici');

Object.assign(globalThis, {
  fetch,
  Headers,
  Request,
  Response,
});

if (typeof globalThis.FormData === 'undefined') {
  Object.assign(globalThis, {
    FormData: UndiciFormData,
  });
}

if (typeof globalThis.BroadcastChannel === 'undefined') {
  class MockBroadcastChannel {
    name: string;
    onmessage: ((event: MessageEvent) => void) | null;

    constructor(name: string) {
      this.name = name;
      this.onmessage = null;
    }

    addEventListener() {}

    removeEventListener() {}

    postMessage() {}

    close() {}

    dispatchEvent() {
      return true;
    }
  }

  Object.assign(globalThis, {
    BroadcastChannel: MockBroadcastChannel,
  });
}

// runtime matchers are implemented in a separate module
import './src/setup/matchers';
