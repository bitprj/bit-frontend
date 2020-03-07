/**
 * Implemented using arrays, use case is simple so who needs efficiency
 * @param {array} stack
 */
export function SafeStack(stack) {
	this.copy = () => new SafeStack([...stack])
	this.push = item => {
		if (item && !this.has(item)) stack.push(item)
		return this
	}
	this.pop = item => {
		if (!this.isEmpty()) {
			if (this.peek() === item) stack.pop()
			else return stack.filter(i => i !== item)
		}
		return this
	}
	this.has = item => stack.includes(item)
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
		if (item && !this.has(item)) queue.push(item)
		return this
	}
	this.dequeue = item => {
		if (!this.isEmpty()) {
			if (this.front() === item) queue.shift()
			else return queue.filter(i => i !== item)
		}
		return this
	}
	this.has = item => queue.includes(item)
	this.front = () => (this.isEmpty() ? 'empty queue' : queue[0])
	this.isEmpty = () => queue.length === 0
	this.get = () => queue // use only for testing
}
