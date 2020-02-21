/**
 * Implemented using arrays, use case is simple so who needs efficiency
 * @param {array} stack
 */
export function SafeStack(stack) {
	this.copy = () => new SafeStack([...stack])
	this.push = item => {
		if (this.peek() !== item) stack.push(item)
		return this
	}
	this.pop = item => {
		if (!this.isEmpty() && this.peek() === item) stack.pop()
		return this
	}
	this.peek = () => (this.isEmpty() ? 'empty stack' : stack[stack.length - 1])
	this.isEmpty = () => stack.length === 0
	this.get = () => stack // use only for testing
}

/**
 * Implemented using arrays, same as above
 * @param {array} queue
 */
export function SafeQueue(queue) {
	this.copy = () => new SafeQueue([...queue])
	this.enqueue = item => {
		if (queue[queue.length - 1] !== item) queue.push(item)
		return this
	}
	this.dequeue = item => {
		if (!this.isEmpty() && queue[queue.length - 1] === item) queue.shift()
		return this
	}
	this.front = () => (this.isEmpty() ? 'empty queue' : queue[0])
	this.isEmpty = () => queue.length === 0
	this.get = () => queue // use only for testing
}
