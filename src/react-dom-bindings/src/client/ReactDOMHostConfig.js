
/**
 * 创建文本节点
 * @param {*} text 文本内容
 * @returns 返回文本节点
 */
export function createTextInstance(text){

  return document.createTextNode(text);

}

/**
 * 是否设置文本
 * @param {*} type 
 * @param {*} props 
 * @returns 返回布尔指
 */
export function shouldSetTextContent(type,props){

  return typeof props.children === 'string' || typeof props.children === 'number';

}

/**
 * 根据类型创建dom
 * @param {*} type 文本类型
 * @param {*} props 
 * @returns 返回dom元素
 */
export function createInstance(type){
  const domElement = document.createElement(type);

  // TODO 属性添加
  return domElement;
}


export function appendInitialChild(parent,child){
  parent.appendChild(child);
}

export function finalizeInitialChildren(domElement,type,props){
  // TODO 初始化子元素
}



export function prepareForCommit(){
  // TODO 准备提交
}

export function resetAfterCommit(){
  // TODO 提交后重置
}