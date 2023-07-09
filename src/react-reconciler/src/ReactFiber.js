
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