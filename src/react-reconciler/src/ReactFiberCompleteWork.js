import logger from "shared/logger";
import { NoFlags } from "./ReactFiberFlags";
import { appendInitialChild, createInstance, createTextInstance } from "react/-dom-bindings/src/client/ReactDOMHostConfig";
import { HostComponent, HostText } from "./ReactWorkTags";


/**
 * 把当前完成的fiber的所有子节点的真实dom 挂载到自己父parent真实dom节点上面
 * @param {*} parent 当前完成的fiber的真实的dom节点
 * @param {*} workInProgress 完成的fiber
 */
export function appendAllChildren(parent, workInProgress) {
	let node = workInProgress.child;
	while (node) {
		// 如果子节点类型是一个 原生节点 或者文本节点
		if (node.tag === HostComponent || node.tag === HostText) {
			appendInitialChild(parent, node.stateNode);
			// 如果第一个儿子不是一个原生节点 说明 可能是一个函数组件
		} else if (node.child !== null) {
			node = node.child;
			continue;
		}

		// 如果当前的节点没有弟弟 回到父亲 return
		while (node.sibling === null) {
			if (node.return === workInProgress) {
				return;
			}
			node = node.return;
		}
		node = node.sibling;
	}
}

/**
 * 完成一个fiber节点
 * @param {*} current old fiber
 * @param {*} workInProgress new fiber
 */
export function completeWork(current, workInProgress) {
	logger("completeWork", workInProgress);
	const newProps = workInProgress.pendingProps;

	switch (workInProgress.tag) {
		case HostComponent:
			// 创建真实dom
			const instance = createInstance(workInProgress.type);
			// 把真实dom挂载到fiber上
			workInProgress.stateNode = instance;

			// 初始的儿子们挂载到自己身上

			// 把子节点挂载到真实dom上
			appendAllChildren(instance, workInProgress)
			break;
		case HostText:
			const newText = newProps;
			// 创建真实的dom节点
			const textInstance = createTextInstance(newText);
			workInProgress.stateNode = textInstance;

			// 向上冒泡属性
			bubbleProperties(workInProgress);
			break;
		case ClassComponent:
			break;
		default:
			break;
	}
}

function bubbleProperties(completedWork) {
	// 向上冒泡属性
	let subtreeFlags = NoFlags;
	let child = completedWork.child;
	while (child) {
		subtreeFlags |= child.subtreeFlags;
		subtreeFlags |= child.flags;
		child = child.sibling;
	}

	completedWork.subtreeFlags = subtreeFlags;
}