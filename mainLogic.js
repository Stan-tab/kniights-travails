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

function calculate(arr) {
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

function Node(position, childs = null) {
	return { position, childs };
}

function removeFrom(arr1, arr2) {
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

function createGraph(arr) {
	if(arr.length !== 2) throw new Error("Only two values");
	let children = calculate(arr);
	const root = Node(arr, children);
	const q = [root];
	const exclude = [arr, ...children];
	for (let i = 0; i < q.length; i++) {
		const node = q[i];
		if (node.childs === null) continue;
		for (let j = 0; j < node.childs.length; j++) {
			children = calculate(node.childs[j]);
			if (removeFrom(exclude, children)) {
				children = null;
			} else {
				exclude.push(...children);
			}
			const newNode = Node(node.childs[j], children);
			node.childs[j] = newNode;
			q.push(newNode);
		}
	}
	return root;
}

console.log(createGraph([0, 0]));
