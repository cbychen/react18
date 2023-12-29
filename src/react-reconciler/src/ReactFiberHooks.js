

/**
 * render FunctionComponent
 * @param {*} current old fiber
 * @param {*} workInProgress new fiber
 * @param {*} Component component define
 * @param {*} props component props
 * @returns VDom or reactElement
 */
export function renderWithHooks(current,workInProgress,Component,props){

  const children = Component(props);
  return children
  
}