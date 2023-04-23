class LinkedListNode {
    constructor(value, next = null) {
        this.value = value
        this.next = next
    }

    toString() {
        return `${this.value}`
    }
}

class LinkedList {
    constructor() {
        this.head = null
        this.tail = null
    }

    append(value) {
        const newNode = new LinkedListNode(value)
        if (!this.head || !this.tail) {
            this.head = newNode
            this.tail = newNode
            return
        }

        this.tail.next = newNode
        this.tail = newNode

    }

    toArray() {
        const nodes = []
        let currentNode = this.head

        while (currentNode) {
            nodes.push(currentNode.value)
            currentNode = currentNode.next
        }
        return nodes
    }

    toString() {
        return this.toArray().map(node => node.toString()).toString()
    }

    prepend(value) {
        const newNode = new LinkedListNode(value, this.head)
        this.head = newNode
        if (!this.tail) {
            this.tail = newNode
        }
    }

    find(value) {
        if (!this.head) {
            return null
        }
        let curNode = this.head
        while (curNode) {
            if (curNode.value === value) {
                return curNode
            }
            curNode = curNode.next

        }
        return null;
    }

    remove() {
        if (!this.head) {
            return null
        }
        if (this.length() === 1) {
            this.tail = null
        }
        let removedElem = this.head
        this.head = this.head.next
        return removedElem
    }

    delete() {
        if (!this.head) {
            return null
        }
        if (this.length() === 1) {
            this.head = null
            this.tail = null
            return
        }
        let size = this.length(), newSize = 0
        let curNode = this.head
        while (newSize !== size - 2) {
            ++newSize
            curNode = curNode.next
        }
        let removedItem = curNode.next
        curNode.next = null
        this.tail = curNode
        return removedItem
    }

    insertAfter(value, prevNode) {
        if (prevNode === null) {
            return
        }
        const newNode = new LinkedListNode(value)
        newNode.next = prevNode.next
        prevNode.next = newNode

        if (newNode.next === null) {
            this.tail = newNode
        }
    }

    length() {
        let size = 0, curNode = this.head
        while (curNode) {
            ++size
            curNode = curNode.next
        }
        return size
    }
}
module.exports = LinkedList