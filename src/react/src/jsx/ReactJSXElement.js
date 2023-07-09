import { REACT_ELEMENT_TYPE } from "shared/ReactSymbols";
import hasOwnProperty from "shared/hasOwnProperty";
// react element virtual dom
// react 元素 虚拟dom
function ReactElement(type, key, ref, props) {
	return {
		$$typeof: REACT_ELEMENT_TYPE,
		key,
		ref,
		props,
		type,
	};
}

function hasValidKey(config) {
	return config.key !== undefined;
}

function hasValidRef(config) {
	return config.ref !== undefined;
}

const RESERVED_PROPS = {
	key: true,
	ref: true,
	__self: true,
	__source: true,
};

export function jsxDEV(type, config) {
	

	let propName;
	const props = {};

	let key = null;
	let ref = null;

	if (hasValidKey(config)) {
		key = config.key;
	}

	if (hasValidRef(config)) {
		ref = config.ref;
	}

	for (const propName in config) {
		if (
			Object.hasOwnProperty.call(config, propName) &&
			!RESERVED_PROPS.hasOwnProperty(propName)
		) {
			props[propName] = config[propName];
		}
	}

	return ReactElement(type, key, ref, props);
}
