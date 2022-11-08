// left panel
const billInput = document.querySelector("#money");
const peopleInput = document.querySelector("#people");
const tipBtns = document.querySelectorAll(".tip-btn");
const customValueInput = document.querySelector("#custom");

// right panel
const total = document.querySelector("#total");
const amount = document.querySelector("#amount");
const reset = document.querySelector(".reset");

let billValue = 0;
let selectedTip = 0;
let tipValue;
let peopleCount = 1;

tipBtns.forEach((tip) => {
	tip.addEventListener("click", (e) => {
		selectedTip = e.target.attributes[1].value;
		checkTipBtns();
		e.target.classList.add("active");
		calculateTip();
	});
});

const checkTipBtns = () => {
	tipBtns.forEach((btn) => {
		if (btn.classList.contains("active")) {
			btn.classList.remove("active");
		}
	});
};

const billValidation = () => {
	if (billInput.value < 0) {
		billInput.classList.add("error");
		return false;
	} else {
		billInput.classList.remove("error");
		return true;
	}
};

const peopleValidation = () => {
	if (peopleInput.value <= 0) {
		peopleInput.classList.add("error");
		return false;
	} else {
		peopleInput.classList.remove("error");
		return true;
	}
};

const resetAllValues = () => {
	customValueInput.value = "";
	billInput.value = 0;
	peopleInput.value = 1;
	amount.textContent = `$ 0.00`;
	total.textContent = `$ 0.00`;
};

const calculateTip = () => {
	billValue = parseFloat(billInput.value);
	peopleCount = peopleInput.value;

	if (peopleValidation() && billValidation()) {
		const amountValue = (billValue * selectedTip) / peopleCount;
		const totalValue = (billValue * selectedTip + billValue) / peopleCount;

		amount.textContent = `$ ${amountValue.toFixed(2)}`;
		total.textContent = `$ ${totalValue.toFixed(2)}`;
	}
};

billInput.addEventListener("input", calculateTip);
customValueInput.addEventListener("click", checkTipBtns);
customValueInput.addEventListener("input", () => {
	selectedTip = customValueInput.value / 100;
	calculateTip();
});
peopleInput.addEventListener("input", calculateTip);
reset.addEventListener("click", resetAllValues);
