
import logger from "shared/logger"
import { HostComponent, HostRoot, HostText } from "./ReactWorkTags"
import { processUpdateQueue } from "./ReactFiberClassUpdateQueue"
import { mountChildFibers, reconcileChildFibers } from "./ReactChildFiber"

/**
 * 根据新的虚拟dom生成新的fiber链表
 * @param {*} current 老的父fiber
 * @param {*} workInProgress 新的Fiber
 * @param {*} nextChildren 新的子虚拟dom
 */
function reconcileChildren(current,workInProgress,nextChildren) {

	if(current===null) {
		
		workInProgress.child = mountChildFibers(workInProgress,null,nextChildren)
	}else{

		workInProgress.child = reconcileChildFibers(workInProgress,current.child,nextChildren)

	}

}
export function beginWork(current, workInProgress) {
  logger('beginWork',workInProgress)

  switch (workInProgress.tag) {
		case HostRoot:
			return updateHostRoot(current, workInProgress);
		case HostComponent:
			return updateHostComponent(current, workInProgress);
		case HostText:
			return null;
		default:
			return null;
	}

}


/**
 * 
 * @param {*} current 
 * @param {*} workInProgress 
 * @returns 
 */

function updateHostRoot(current, workInProgress) {
	// 需要知道他儿子的虚拟dom 信息  在更新队列上获取相关信息

	logger("updateHostRoot", workInProgress);
	processUpdateQueue(workInProgress);

	const nextState = workInProgress.memoizedState;
	const nextChildren = nextState.element;

	// 协调子节点 dom-diff 算法

	reconcileChildren(current, workInProgress, nextChildren)
	// updateHostContainer(current, workInProgress)
	return workInProgress.child; //{tag:'5',type:'h1'}
}

/**
 * updateHost 
 * @param {*} current 
 * @param {*} workInProgress 
 */
function updateHostComponent(current, workInProgress) {}