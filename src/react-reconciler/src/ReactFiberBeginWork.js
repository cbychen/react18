
import logger from "shared/logger"

export function beginWork(current, workInProgress) {
  logger('beginWork',workInProgress)
  if (current) {
    // return update(current, workInProgress)
  }

  return null
  // return workInProgress
}