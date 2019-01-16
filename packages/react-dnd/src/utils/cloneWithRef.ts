import { cloneElement } from 'react'
const invariant = require('invariant')

export default function cloneWithRef(
	element: any,
	newRef: any,
): React.ReactElement<any> {
	const previousRef = element.ref
	invariant(
		typeof previousRef !== 'string',
		'Cannot connect React DnD to an element with an existing string ref. ' +
			'Please use a callback ref or createRef() instead or wrap it into a <span> or <div>. ' +
			'Read more: https://facebook.github.io/react/docs/more-about-refs.html#the-ref-callback-attribute',
	)

	if (!previousRef) {
		// When there is no ref on the element, use the new ref directly
		return cloneElement(element, {
			ref: newRef,
		})
	}

	return cloneElement(element, {
		ref: (node: any) => {
			newRef(node)
			if (typeof previousRef === 'function') {
				// callback ref
				previousRef(node)
			} else if (typeof previousRef === 'object' && 'current' in previousRef) {
				// object ref created using createRef
				previousRef.current = node
			}
		},
	})
}
