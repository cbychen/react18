

function FiberRootNode(containerInfo){
  this.containerInfo = containerInfo
}

export function  createFiberRoot(containerInfo){

  const root = new FiberRootNode(containerInfo)
  return root
}