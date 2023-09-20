import { scheduleCallback } from "scheduler/index";
import { beginWork } from "./ReactFiberBeginWork";
import { createWorkInProgress } from "./ReactFiber";
let workInProgress = null
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
  prepareFreshStack(root)

  workLoopSync()
  




}


function prepareFreshStack(root) {
  
   workInProgress = createWorkInProgress(root.current,null)
}

function workLoopSync() {

  while (workInProgress) {
    console.log('workLoopSync',workInProgress)
    performUnitOfWork(workInProgress)
  }
}



function performUnitOfWork(unitOfWork) {
  
  // 获取新的fiber 对应的老的fiber
  const current = unitOfWork.alternate

  // 完成当前fiber的子fiber的链表构建
  const next = beginWork(current, unitOfWork)

  unitOfWork.memoizedProps = unitOfWork.pendingProps

  if(next===null) {
  	// 没有子节点 已经完成了

    workInProgress = null
    // completeUnitOfWork(unitOfWork)
  }else{
  

    // 如果有子节点 继续递归 让workInProgress变成下一个子节点
    workInProgress = next
  }
}

function completeUnitOfWork(unitOfWork) {
  
}


