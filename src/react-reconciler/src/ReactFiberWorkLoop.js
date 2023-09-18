import { scheduleCallback } from "scheduler/index";


/**
 * 调度更新root
 * @param {*} root 
 */
export function scheduleUpdateOnFiber(root) {
  ensureRootIsScheduled(root)

}


export function ensureRootIsScheduled(root) {
  scheduleCallback(performConcurrentWorkOnRoot.bind(null, root))
}



/**
 * 根据fiber创建fiber树,创建真实的dom 并且插入到container
 */
function performConcurrentWorkOnRoot(root) {
  console.log('performConcurrentWorkOnRoot',root)


  renderRootSync(root)
}


/**
 * 同步方式渲染根节点
 * @param {*} root
 */
function renderRootSync(root) {
  
}