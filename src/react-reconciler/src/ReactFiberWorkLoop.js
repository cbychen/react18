import { scheduleCallback } from "scheduler/index";
import { beginWork } from "./ReactFiberBeginWork";
import { createWorkInProgress } from "./ReactFiber";
import { completeWork } from "./ReactFiberCompleteWork";
import logger from "shared/logger";
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
  console.log('root',root)
}


/**
 * 同步方式渲染根节点
 * @param {*} root
 */
function renderRootSync(root) {
  prepareFreshStack(root)

  workLoopSync()
  




}


/**
 * 根据原来老的创建新的根fiber
 * @param {*} root 
 */
function prepareFreshStack(root) {
  
   workInProgress = createWorkInProgress(root.current,null)
}

function workLoopSync() {

  while (workInProgress) {
    console.log('workLoopSync',workInProgress)
    performUnitOfWork(workInProgress)
  }
}



/**
 * 
 * @param {*} unitOfWork 单个fiber
 */
function performUnitOfWork(unitOfWork) {
  
  // 获取新的fiber 对应的老的fiber
  const current = unitOfWork.alternate

  // 完成当前fiber的子fiber的链表构建
  let next = beginWork(current, unitOfWork)

  unitOfWork.memoizedProps = unitOfWork.pendingProps

  if(!next) {
  	// 没有子节点 已经完成了

    
    workInProgress = null
    completeUnitOfWork(unitOfWork)
  }else{
  

    // 如果有子节点 继续递归 让workInProgress变成下一个子节点
    workInProgress = next
  }
}

function completeUnitOfWork(unitOfWork) {
	let completedWork = unitOfWork;
	do {
		console.log("completeUnitOfWork", completedWork);

    const current = completedWork.alternate;
		// 完成当前fiber的子fiber的链表构建
		let returnFiber = completedWork.return;
    
    
    completeWork(current, completedWork)

    const siblingFiber = completedWork.sibling

    if(siblingFiber !== null){

      workInProgress = siblingFiber
      return
    }
	
    // 如果没有弟弟 说明当前完成的是父fiber的最后一个节点 也就是说 当前父亲节点下面所有子节点都完成了
    completedWork = returnFiber
    workInProgress = completedWork
	} while (completedWork !== null);
}


