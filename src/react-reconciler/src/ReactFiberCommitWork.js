import { appendChild,insertBefore } from "react-dom-bindings/src/client/ReactDOMHostConfig";
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
 * @param {*} before 
 * @param {*} parent 父亲真实dom节点
 */
function insertOrAppendPlacementNode(node, before, parent) {
	const { tag } = node;
	// 判断fiber节点是不是真实的dom节点
	const isRoot = tag === HostComponent || tag === HostText;
	// 如果是的话直接插入
	if (isRoot) {
		const { stateNode } = node;
		if (before) {
			insertBefore(parent, stateNode, before);
		}else{
			appendChild(parent, stateNode);
		}
		
	} else {
		// node 不是真实的dom节点 获取他的大儿子
		const { child } = node;
		if (child !== null) {
			// 大儿子添加到父亲dom
			insertOrAppendPlacementNode(child, parent);
			let { sibling } = child;
			while (sibling !== null) {
				// 处理所有弟弟
				insertOrAppendPlacementNode(sibling, parent);
				sibling = sibling.sibling;
			}
		}
	}
}
/**
 * 找到要插入的锚点
 * @param {*} fiber 
 */
function getHostSibling(fiber) {
	let node = fiber;
	sibling: while (true) {
		while (node.sibling === null) {
			// 没有弟弟了 找叔叔
			if (node.return === null || isHostParent(node.return)) {
				// 没有叔叔了 找爷爷
				return null;
			}
			node = node.return;
		}
		node = node.sibling;

		// 如果弟弟不是原生节点也不是文本节点的时候
		while (node.tag !== HostComponent && node.tag !== HostText) {
			// 如果一个子节点是将要插入的新节点 找他的弟弟
		
			if(node.flags & Placement){
				continue sibling;
			}else{

				// 找他的大儿子
				node =  node.child
			}
		}
		if(!(node.flags & Placement))	{
			return node.stateNode;
		}
		return node.stateNode;
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

			const before = getHostSibling(finishedWork);
			insertOrAppendPlacementNode(finishedWork, before, parent);
			break;
		}

		case HostComponent: {
			const parent = parentFiber.stateNode;
			const before = getHostSibling(finishedWork);
			insertOrAppendPlacementNode(finishedWork, before, parent);
			break;
		}

		default:
			break;
	}
}