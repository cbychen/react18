import assign from 'shared/assign';
import {markUpdateLaneFromFiberToRoot} from './ReactFiberConcurrentUpdates'

export const UpdateState = 0

export function initialUpdateQueue(fiber) {
	// pending 是一个循环链表
	const queue = {
		shared: {
			pending: null,
		},
	};

  fiber.updateQueue =queue
}


export function createUpdate() {
	const update = {
		tag:UpdateState
	}
	return update
}

/**
 * 根据老的状态和更新计算新的状态 
 * @param {*} update
 * @param {*} prevState
 */
function getStateFromUpdate(update, prevState) {


	switch (update.tag) {
		case UpdateState:

			const { payload } = update
			return assign({},prevState,payload)

		default:
			break;
	}

}

/**
 * 根据老的状态更新队列中的更新计算最新的状态
 * @param {*} fiber  要计算的fiber
 */
export function processUpdateQueue(fiber) {
	const queue = fiber.updateQueue;
	const pending = queue.shared.pending;

	// 如果有更新,或者说更新队列中有内容
	if (pending !== null) {
		// 清除等待生效的更新
		queue.shared.pending = null;

		// 获取更新队列中最后一个更新 
		const lastPendingUpdate = pending;
		// 指向第一个更新
		const firstPendingUpdate = lastPendingUpdate.next;
		// 环状链表断开
		lastPendingUpdate.next = null;

		// 获取老的状态
		let newState = fiber.memoizedState;

		let update = firstPendingUpdate;

		while (update) {
			newState = getStateFromUpdate(update, newState);
			update=update.next
		}

		// 把最后计算到的状态给 memoizedState
		fiber.memoizedState =  newState
	}
}

export function enqueueUpdate(fiber, update) {
	const updateQueue = fiber.updateQueue;

	const shared = updateQueue.shared;
	const pending = shared.pending;

	if (pending === null) {
		update.next = update;
	} else {
		update.next = pending.next;

		pending.next = update;
	}

	updateQueue.shared.pending = update;

	// 返回根节点
	return markUpdateLaneFromFiberToRoot(fiber);
}