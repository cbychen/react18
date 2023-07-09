export function initialUpdateQueue(fiber) {
	// pending 是一个循环链表
	const queue = {
		shared: {
			pending: null,
		},
	};

  fiber.updateQueue =queue
}


function createUpdate(){

  return {
  
  }
}

function getStateFromUpdate (update,newState){

}

function processUpdateQueue(fiber){

  const queue   = fiber.updateQueue
  const pending = queue.shared.pending
  
  if(pending !==null){
    
    queue.shared.pending = null
    const lastPendingUpdate = pending
    const firstPendingUpdate = lastPendingUpdate.next
    // 环状链表断开
    lastPendingUpdate.next =null

    let newState = fiber.memoizedState

    let update = firstPendingUpdate

    while(update){
      newState = getStateFromUpdate(update,newState)
    }


  }

}

function enqueueUpdate(fiber,update){

  const updateQueue = fiber.updateQueue

  const shared = updateQueue.shared
  const pending = shared.pending

  if(pending === null){
    update.next = update
  }else{
    update.next = pending.next

    pending.next = update
    
  }

}