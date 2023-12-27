import { appendChild } from "react-dom-bindings/src/client/ReactDOMHostConfig";
import { MutationMask, Placement } from "./ReactFiberFlags";
import { HostComponent ,HostText,HostRoot} from "./ReactWorkTags";

/**
 * 
 * @param {*} root 根节点
 * @param {*} parentFiber 父fiber
 */
function recursiveTraverseMutationEffects(root, parentFiber) {
	if (parentFiber.subtreeFlags & MutationMask) {
		
		let {child} = parentFiber
		while (child) {

			commitMutationEffectsOnFiber(child, root)
			child = child.sibling
		}
	}
}

/**
 * 处理自己的副作用
 * @param {*} finishedWork 
 */
function commitReconciliationEffects(finishedWork){

	const {flags} = finishedWork

	// 如果此fiber要执行插入的话
	if(flags & Placement){
		// 执行插入 把fiber 对应的真实dom 添加到父真实dom

		commitPlacement(finishedWork)
		// 把flags 里的Placement 移除
		finishedWork.flags &= ~Placement
	}
}
/**
 * 遍历fiber 树 执行fiber 上面的副作用
 * @param {*} finishedWork fiber节点
 * @param {*} root  根节点
 */
export function commitMutationEffectsOnFiber(finishedWork, root) {
	switch (finishedWork.tag) {
		case HostComponent:
		case HostText:
		case HostRoot: {
			// 先遍历他的子节点 处理他的子节点上的副作用
			recursiveTraverseMutationEffects(root, finishedWork)
			//处理自己的副作用
			commitReconciliationEffects(finishedWork)
			break
		}

		default:
			break;
	}
}

/**
 * 把子节点对应的真实dom插入到父节点dom中 
 * @param {*} node 将要插入的fiber节点
 * @param {*} parent 父亲真实dom节点
 */
function insertNode(node, parent) {
	const { tag } = node;
	// 判断fiber节点是不是真实的dom节点
	const isRoot = tag === HostComponent || tag === HostText;
	// 如果是的话直接插入
	if (isRoot) {
		const { stateNode } = node;
		appendChild(parent, stateNode);
	} else {
		// node 不是真实的dom节点 获取他的大儿子
		const { child } = node;
		if (child !== null) {
			// 大儿子添加到父亲dom
			insertNode(child, parent);
			let { sibling } = child;
			while (sibling !== null) {
				// 处理所有弟弟
				insertNode(sibling, parent);
				sibling = sibling.sibling;
			}
		}
	}
}

function isHostParent(fiber) {
	return fiber.tag === HostComponent || fiber.tag === HostRoot;
}

function getHostParentFiber(fiber) {
	let parent = fiber.return;
	while (parent) {
		if (isHostParent(parent)) {
			return parent;
		}
		parent = parent.return;
	}
	return parent;
}

/**
 * 把此fiber的真实dom 插入到父dom里
 * @param {*} finishedWork
 */
function commitPlacement(finishedWork) {
	// 获取父fiber

	const parentFiber = getHostParentFiber(finishedWork);

	switch (parentFiber.tag) {
		case HostRoot: {
			const parent = parentFiber.stateNode.containerInfo;

			insertNode(finishedWork, parent);
			break;
		}

		case HostComponent: {
			const parent = parentFiber.stateNode;
			insertNode(finishedWork, parent);
			break;
		}

		default:
			break;
	}
}