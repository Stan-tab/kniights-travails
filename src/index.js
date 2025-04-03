import moveTo from './mainLogic.js';
import './style.css';
import horse from "../assets/horse.svg"

const horseImg = document.createElement("img")
horseImg.src = horse;

const way = new moveTo();

//create board
(() => {
	const board = document.querySelector('.board');
	for (let i = 0; i < 8; i++) {
		for (let j = 0; j < 8; j++) {
			const div = document.createElement('div');
			// add(div);
			div.setAttribute('y', i);
			div.setAttribute('x', j);
			div.style.position = 'relative';
			if ((i + j) % 2 !== 0) div.classList = 'black';
			board.appendChild(div);
		}
	}
})();

class DOMmanipulate {
	initial = null;
	final = null;
	redish = null;

	constructor() {
		this.redish = document.createElement("div");
		this.redish.classList = "redish";

		const subMenu = document.createElement('div');
		const paras = [
			document.createElement('p'),
			document.createElement('p')
		];

		paras[0].textContent = 'Place horse';
		paras[1].textContent = 'Final point';

		this.paraSet(paras);

		subMenu.classList = 'sub';
		paras.forEach((e) => subMenu.appendChild(e));
		const arr = document.querySelectorAll('.board > div');
		for (let i = 0; i < arr.length; i++) {
			arr[i].addEventListener('click', () => {
				arr[i].appendChild(subMenu);

				setTimeout(() => {
					if ([...arr[i].childNodes].includes(subMenu))
						arr[i].removeChild(subMenu);
				}, 1500);
			});
		}
	}

	paraSet (arr) {
		arr[0].addEventListener("click", (e) => {
			const element = e.target.parentNode.parentNode;
			element.appendChild(horseImg)
			this.initial = [+element.getAttribute("x"), +element.getAttribute("y")];
			if(this.final) {
				console.log(way.findWay(this.initial, this.final))
				this.final = this.initial = null;
			}
		})
		arr[1].addEventListener("click", (e) => {
			const element = e.target.parentNode.parentNode;
			element.appendChild(this.redish)
			this.final = [+element.getAttribute("x"), +element.getAttribute("y")]
			if(this.initial) {
				console.log(way.findWay(this.initial, this.final))
				this.final = this.initial = null;
			}
		})
	}
}

const x = new DOMmanipulate();
