(() => {
	//To simplicity
	Array.prototype["compareTo"] = function compare(arr) {
		if (this.length !== arr.length) return false;
		const boolVal = [];
		for (let i = 0; i < this.length; i++) {
			boolVal.push(this[i] === arr[i]);
		}
		if (!boolVal.includes(false)) return true;
		return false;
	};
})();

export default class move {
	constructor(arg1, arg2) {
		if (
			Array.isArray(arg1) &&
			Array.isArray(arg2) &&
			arg1.length === 2 &&
			arg2.length === 2
		) {
			this.way = this.findWay(arg1, arg2);
		}
	}

	calculate(arr) {
		const newArr = [
			[arr[0] + 2, arr[1] + 1],
			[arr[0] + 2, arr[1] - 1],
			[arr[0] - 2, arr[1] + 1],
			[arr[0] - 2, arr[1] - 1],
			[arr[0] + 1, arr[1] + 2],
			[arr[0] - 1, arr[1] + 2],
			[arr[0] + 1, arr[1] - 2],
			[arr[0] - 1, arr[1] - 2],
		];
		for (let i = 0; i < newArr.length; i++) {
			if (
				newArr[i][0] < 0 ||
				newArr[i][0] > 7 ||
				newArr[i][1] < 0 ||
				newArr[i][1] > 7
			) {
				newArr.splice(i, 1);
				i--;
			}
		}
		return newArr;
	}

	Node(position, childs = null) {
		return { position, childs };
	}

	removeFrom(arr1, arr2) {
		for (let i = 0; i < arr1.length; i++) {
			for (let l = 0; l < arr2.length; l++) {
				if (arr1[i].compareTo(arr2[l])) {
					arr2.splice(l, 1);
					l--;
				}
			}
		}
		return arr2.length === 0 ? true : false;
	}

	createGraph(arr) {
		if (arr.length !== 2) throw new Error("Only two values");
		let children = this.calculate(arr);
		const q = [this.Node(arr, children)];
		const exclude = [arr, ...children];
		for (let i = 0; i < q.length; i++) {
			const node = q[i];
			if (node.childs === null) continue;
			for (let j = 0; j < node.childs.length; j++) {
				children = this.calculate(node.childs[j]);
				if (this.removeFrom(exclude, children)) {
					children = null;
				} else {
					exclude.push(...children);
				}
				const newNode = this.Node(node.childs[j], children);
				node.childs[j] = newNode;
				q.push(newNode);
			}
		}
		return q[0];
	}

	findWay(initial, final) {
		function getLeft(node) {
			const q = [[node, 1]];
			for (let i = 1; i <= q.length; i++)
				if (q.at(-i)[0].childs) q.unshift([q.at(-i)[0].childs[0], 1]);
			return q;
		}

		if (
			initial[0] > 7 ||
			initial[0] < 0 ||
			initial[1] > 7 ||
			initial[1] < 0 ||
			final[0] > 7 ||
			final[0] < 0 ||
			final[1] > 7 ||
			final[1] < 0
		)
			throw new Error("Out of range");
		const root = this.createGraph(initial);
		const q = getLeft(root);

		for (let i = 0; i < q.length; i++) {
			const node = q[i][0];
			if (node.position.compareTo(final)) break;
			if (!node.childs || node.childs.length <= q[i][1]) {
				q.splice(i, 1);
				i--;
				continue;
			}

			const newArr = getLeft(node.childs[q[i][1]]);
			q[i][1] += 1;
			q.splice(i, 0, ...newArr);
			i--;
		}

		this.way = q.map(e => e[0].position).reverse();
		return this.way;
	}
}

const hi = new move([0, 0], [1, 0]);
console.log(hi.way);
console.log(hi.findWay([5,5], [6,6]));
