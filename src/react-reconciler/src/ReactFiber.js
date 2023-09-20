
import { HostRoot } from "./ReactWorkTags"
import { NoFlags } from "./ReactFiberFlags"
/**
 * 
 * @param {*} tag 
 * @param {*} pendingProps 
 * @param {*} key 
 */
export function FiberNode(tag,pendingProps,key){

  this.tag = tag
  this.key = key
  this.type = null
  this.stateNode = null


  this.return = null
  this.sibling = null
  this.child = null

  this.pendingProps = pendingProps
  this.memoizedProps = null
  this.memoizedState = null


  this.updateQueue = null
  this.flags = null
  this.subtreeFlags = NoFlags
  this.alternate = null
}


export function createFiber(tag,pendingProps,key){
  return new FiberNode(tag,pendingProps,key)
}

export function createHostRootFiber(){

  return createFiber(HostRoot,null,null)
}

/**
 * 基于老的fiber 和新的属性 创建新的fiber
 * @param {*} current 老fiber
 * @param {*} pendingProps 新的属性
 */
export function createWorkInProgress(current,pendingProps) {
  
  let workInProgress =  current.alternate

  if(workInProgress === null){
    workInProgress = createFiber(current.tag,pendingProps,current.key)
    workInProgress.stateNode = current.stateNode
    workInProgress.updateQueue = current.updateQueue
    workInProgress.flags = current.flags
    workInProgress.subtreeFlags = current.subtreeFlags
    workInProgress.alternate = current
    current.alternate = workInProgress
  }
  else{
    // Update
    workInProgress.pendingProps = pendingProps
    workInProgress.flags = NoFlags
    workInProgress.subtreeFlags = NoFlags
    workInProgress.memoizedProps = current.memoizedProps
    workInProgress.memoizedState = current.memoizedState
    workInProgress.updateQueue = current.updateQueue
  }

  workInProgress.child = current.child
  workInProgress.memoizedProps = current.memoizedProps
  workInProgress.memoizedState = current.memoizedState
  workInProgress.updateQueue = current.updateQueue
  workInProgress.sibling = current.sibling
  workInProgress.index = current.index

  return workInProgress
}