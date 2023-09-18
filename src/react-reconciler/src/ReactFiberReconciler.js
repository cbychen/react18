
import {markUpdateLaneFromFiberToRoot} from "./ReactFiberConcurrentUpdates"
import { createUpdate,enqueueUpdate } from "./ReactFiberClassUpdateQueue";

import { scheduleUpdateOnFiber } from "./ReactFiberWorkLoop";

import { createFiberRoot } from "./ReactFiberRoot"
export function createContainer(containerInfo){

  return createFiberRoot(containerInfo)
} 


/**
 * 更新容器 把虚拟dom 插入到container 中 渲染虚拟dom
 * 
 * @param {*} element 虚拟dom
 * @param {*} container 根节点
 */
export function updateContainer(element,container) {
  
  // get current root fiber
  // 获取当前的根fiber
  const current = container.current;

  // create update
  // 创建更新
  const update = createUpdate()

  // 要更新的虚拟dom
  update.payload = { element }

  //入对列 把更新对象添加到current的fiber的更新队列上`
  const root  = enqueueUpdate(current,update)


  
  scheduleUpdateOnFiber(root)

}