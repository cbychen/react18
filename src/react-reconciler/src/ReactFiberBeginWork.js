
import logger from "shared/logger"
import { FunctionComponent, HostComponent, HostRoot, HostText, IndeterminateComponent  } from "./ReactWorkTags"
import { processUpdateQueue } from "./ReactFiberClassUpdateQueue"
import { mountChildFibers, reconcileChildFibers } from "./ReactChildFiber"
import { shouldSetTextContent } from "react-dom-bindings/src/client/ReactDOMHostConfig"
import { renderWithHooks } from "./ReactFiberHooks"



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

export function mountIndeterminateComponent(current,workInProgress,Component){
	const props = workInProgress.pendingProps

	const value = renderWithHooks(current,workInProgress,Component,props)
	workInProgress.tag = FunctionComponent
	reconcileChildren(current,workInProgress,value)
	return workInProgress.child
}

export function beginWork(current, workInProgress) {
  logger('beginWork',workInProgress)

  switch (workInProgress.tag) {
		case IndeterminateComponent:
			return mountIndeterminateComponent(current,workInProgress,workInProgress.type)
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
 * 构建原生组件的子fiber链表 
 * @param {*} current 
 * @param {*} workInProgress 
 */
function updateHostComponent(current, workInProgress) {

	const {type} = workInProgress
	const nextProps = workInProgress.pendingProps
	let nextChildren = nextProps.children
	// 判断当前虚拟dom的儿子是不是一个独生子
	const isDirectChild = shouldSetTextContent(type,nextProps)

	if(isDirectChild){
		nextChildren = null
	}

	reconcileChildren(current, workInProgress, nextChildren)

	return workInProgress.child

}