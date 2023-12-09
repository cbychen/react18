import { REACT_ELEMENT_TYPE } from "shared/ReactSymbols";




/**
 * 
 * @param {*} shouldTrackEffects 是否跟踪副作用
 * @returns 
 */
function createChildReconciler(shouldTrackEffects){

  function reconcileSingleElement(returnFiber,currentFirstFiber,element){
  
    // 因为现在实现的是初次挂载,所以老节点的 currentFirstFiber是没有的 所以可以直接根据虚拟dom 创建新的fiber 节点
    const created = createFiberFromElement(element)
    created.return = returnFiber
    return created
    
  }

  /**
   * 比较子fiber dom-diff 就是用老的子fiber链表和新的虚拟dom进行比较的过程
   * @param {*} returnFiber 新的父fiber
   * @param {*} currentFirstFiber 老fiber的第一个子fiber current 一般来说 指的是老的意思
   * @param {*} newChild 新的子虚拟dom h1虚拟dom
   */
  function reconcileChildFibers(returnFiber,currentFirstFiber,newChild){

    // TODO 暂时先考虑新的节点只有一个的情况 后面在修改
    if(typeof newChild === 'object' && newChild !== null){

      switch (newChild.$$typeof) {
        case REACT_ELEMENT_TYPE:
          
          return reconcileSingleElement(returnFiber,currentFirstFiber,newChild);
      
        default:
          break;
      }

    }

  }

  return reconcileChildFibers

}


// 有老父fiber更新时候用这个`
export const mountChildFibers = createChildReconciler(false)

// 如果没有老的父fiber 初次挂载用这个
export const reconcileChildFibers = createChildReconciler(true)