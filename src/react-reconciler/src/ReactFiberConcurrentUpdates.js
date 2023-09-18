
// 并发更新


import { HostRoot } from "./ReactWorkTags"
/**
 * 找到根节点
 * @param {*} sourceFiber 
 */
export function markUpdateLaneFromFiberToRoot(sourceFiber) {
  let node =  sourceFiber
  let parent = sourceFiber.return
  while (parent) {
    node = parent
    parent = node.return
  }

  if(node.tag==HostRoot) {
  	return node.stateNode
  }

  return null
}