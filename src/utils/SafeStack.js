/**
 * Implemented using arrays, use case is simple so who needs efficiency
 * @param {array} stack
 */
export default function SafeStack(stack) {
	this.push = item => {
		if (this.peek() !== item) {
			stack.push(item)
		}
		return this
	}
	this.pop = item => {
		if (!this.isEmpty() && this.peek() === item) {
			stack.pop()
		}
		return this
	}
	this.peek = () => stack[stack.length - 1]
	this.isEmpty = () => stack.length === 0
	this.stack = () => stack
}
