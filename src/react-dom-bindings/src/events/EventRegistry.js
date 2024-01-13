
export const allNativeEvents = new Set();

/**
 * 注册2个阶段的事件
 * @param {*} registrationName react事件名字 onClick
 * @param {*} dependencies 原生事件数组
 */
export function registerTwoPhaseEvent(registrationName, dependencies) {
	// 注册事件
	// 注册事件处理函数
	// 注册事件处理函数的依赖
	// 注册事件处理函数的依赖的依赖
	// ...

	registerDirectEvent(registrationName, dependencies);

	registerDirectEvent(registrationName + "Capture", dependencies);
}

export function registerDirectEvent(registrationName, dependencies) {
	for (let i = 0; i < dependencies.length; i++) {
		allNativeEvents.add(dependencies[i]);
	}
}