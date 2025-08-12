import Queue, { QueueWorker } from 'queue'
import { isMobile } from './device'

export const queue = new Queue({
  autostart: true,
  concurrency: isMobile() ? 3 : 10
})

export function pushQueue(fn: QueueWorker, delay?: number) {
  if (!delay) {
    queue.push(fn)
    return
  }
  setTimeout(() => {
    queue.push(fn)
  }, delay)
}
