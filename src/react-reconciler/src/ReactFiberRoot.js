
import { createHostRootFiber } from "./ReactFiber"
import {initialUpdateQueue} from './ReactFiberClassUpdateQueue'
function FiberRootNode(containerInfo){
  this.containerInfo = containerInfo
}

export function  createFiberRoot(containerInfo){

  const root = new FiberRootNode(containerInfo)

  const uninitializedFiber = createHostRootFiber()
  root.current = uninitializedFiber
  uninitializedFiber.stateNode =  root
  initialUpdateQueue(uninitializedFiber)
  return root
}

