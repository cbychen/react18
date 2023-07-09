
import { createHostRootFiber } from "./ReactFiber"

function FiberRootNode(containerInfo){
  this.containerInfo = containerInfo
}

export function  createFiberRoot(containerInfo){

  const root = new FiberRootNode(containerInfo)

  const uninitializedFiber = createHostRootFiber()
  root.current = uninitializedFiber
  uninitializedFiber.stateNode =  root
  return root
}