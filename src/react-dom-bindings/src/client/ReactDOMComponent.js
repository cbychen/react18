import { setValueForStyle } from "./CSSPropertyOperation"
import { setValueForProperty } from "./DOMProperty";
import setTextContent from "./setTextContent"

const STYLE = 'style'
const CHILDREN = 'children'

/**
 * 设置初始化属性
 * @param {*} domElement 
 * @param {*} tag span p type 
 * @param {*} props 
 */
export function setInitialProperties(domElement, tag, props) {
	setInitialDOMProperties(domElement, tag, props);
}

function setInitialDOMProperties(domElement, tag, props) {
	for (const propKey in props) {
		if (props.hasOwnProperty(propKey)) {
			const nextProp = props[propKey];
			if (propKey === STYLE) {
				setValueForStyle(domElement, nextProp);
			} else if (propKey === CHILDREN) {
				if (typeof nextProp === "string") {
					setTextContent(domElement, nextProp);
				}else if(typeof nextProp === "number") {
					setTextContent(domElement, `${nextProp}`);
				}
			} else if (nextProp !== null) {
				setValueForProperty(domElement, propKey, nextProp);
			}
		}
	}
}