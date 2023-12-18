import { REACT_ELEMENT_TYPE } from "shared/ReactSymbols";
import { Placement } from "./ReactFiberFlags";
import { createFiberFromElement, createFiberFromText } from "./ReactFiber";




/**
 * 
 * @param {*} shouldTrackEffects 是否跟踪副作用
 * @returns 
 */
function createChildReconciler(shouldTrackEffects) {
	function placeChild(newFiber, newIdx) {
		newFiber.index = newIdx;
		if (shouldTrackEffects) {

			// 如果一个fiber他的flags上有 Placement 标志，说明这个fiber是新的fiber，需要插入到父fiber中
			newFiber.flags |= Placement;
		}
	}

	/**
	 *
	 * @param {*} returnFiber
	 * @param {*} currentFirstFiber
	 * @param {*} newChildren
	 */
	function reconcileChildrenArray(returnFiber, currentFirstFiber, newChildren) {
		let resultingFirstChild = null; // 返回的第一个fiber
		let previousNewFiber = null; //上一个新的fiber
		let newIndex = 0;
		for (; newIndex < newChildren.length; newIndex++) {
			const newFiber = createChild(returnFiber, newChildren[newIndex]);

			if (newFiber === null) {
				continue;
			}
			placeChild(newFiber, newIndex);

			// 如果 previousNewFiber 是 null，说明这是第一个新的 fiber，那么 resultingFirstChild 就是 newFiber
			if(previousNewFiber === null){

				resultingFirstChild = newFiber;// newFiber 就是大儿子
			}else{
				// 说明这个不是大儿子 就把这个newFiber 添加上一个节点后面
				previousNewFiber.sibling = newFiber;

			}

			// 让newFiber成为最后一个或者上一个子fiber
			previousNewFiber = newFiber
		}
	}

	function createChild(returnFiber, newChild) {
		if (
			(typeof newChild === "string" && typeof newChild !== "") ||
			typeof newChild === "number"
		) {
			const created = createFiberFromText(`${newChild}`);
			created.return = returnFiber;
			return created;
		} else if (typeof newChild === "object" && newChild !== null) {
			switch (newChild) {
				case REACT_ELEMENT_TYPE:
					const created = createFiberFromElement(newChild);
					created.return = returnFiber;
					return created;

				default:
					break;
			}

			return null;
		}
	}

	/**
	 * 协调单个节点
	 * @param {*} returnFiber
	 * @param {*} currentFirstFiber
	 * @param {*} element
	 * @returns
	 */
	function reconcileSingleElement(returnFiber, currentFirstFiber, element) {
		// 因为现在实现的是初次挂载,所以老节点的 currentFirstFiber是没有的 所以可以直接根据虚拟dom 创建新的fiber 节点
		const created = createFiberFromElement(element);
		created.return = returnFiber;
		return created;
	}

	/**
	 * 设置副作用
	 * @param {*} newFiber
	 * @returns
	 */
	function placeSingleChild(newFiber) {
		// 设置副作用 插入节点
		if (shouldTrackEffects) {
			// 要在最后提交阶段插入这个节点 react渲染阶段分 渲染(创建fiber树) 和提交 (更新真实dom) 2个阶段
			newFiber.flags |= Placement;
		}
		return newFiber;
	}

	/**
	 * 比较子fiber dom-diff 就是用老的子fiber链表和新的虚拟dom进行比较的过程
	 * @param {*} returnFiber 新的父fiber
	 * @param {*} currentFirstFiber 老fiber的第一个子fiber current 一般来说 指的是老的意思
	 * @param {*} newChild 新的子虚拟dom h1虚拟dom
	 */
	function reconcileChildFibers(returnFiber, currentFirstFiber, newChild) {
		// TODO 暂时先考虑新的节点只有一个的情况 后面在修改
		if (typeof newChild === "object" && newChild !== null) {
			switch (newChild.$$typeof) {
				case REACT_ELEMENT_TYPE:
					return placeSingleChild(
						reconcileSingleElement(returnFiber, currentFirstFiber, newChild)
					);

				default:
					break;
			}
		}

		if (Array.isArray(newChild)) {
			return reconcileChildrenArray(returnFiber, currentFirstFiber, newChild);
		}

		return null;
	}

	return reconcileChildFibers;
}

// 有老父fiber更新时候用这个`
export const mountChildFibers = createChildReconciler(false);

// 如果没有老的父fiber 初次挂载用这个
export const reconcileChildFibers = createChildReconciler(true);