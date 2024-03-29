
// import { createContainer } from "react-reconciler/src/ReactFiberReconciler"
import { createContainer,updateContainer } from "react-reconciler/src/ReactFiberReconciler"

function ReactDOMRoot(internalRoot){
  this._internalRoot = internalRoot
}

export function createRoot (container){

  const root = createContainer(container)


  return new ReactDOMRoot(root)
}


ReactDOMRoot.prototype.render = function (children) {
  const root = this._internalRoot; // root
  const container = root.containerInfo; // div#root
  updateContainer(children, root, null, null);
};
