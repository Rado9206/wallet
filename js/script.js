const incomeArea = document.querySelector('.income-area')
const expensesArea = document.querySelector('.expenses-area')
const availableMoney = document.querySelector('.available-money')

const addTransactionPanel = document.querySelector('.add-transaction-panel')
const nameInput = document.querySelector('#name')
const amountInput = document.querySelector('#amount')
const categorySelect = document.querySelector('#category')

const addBtn = document.querySelector('.add-transaction')
const saveBtn = document.querySelector('.save')
const cancelBtn = document.querySelector('.cancel')
const deleteBtn = document.querySelector('.delete')
const deleteAllBtn = document.querySelector('.delete-all')
const lightBtn = document.querySelector('.light')
const darkBtn = document.querySelector('.dark')

const transactionName = document.querySelector('.transaction-name')
const transactionAmount = document.querySelector('.transaction-amount')

let root = document.documentElement
let ID = 0
let categoryIcon
let selectedCategory
let moneyArray = [0]

const showPanel = () => {
	addTransactionPanel.style.display = 'flex'
}

const closePanel = () => {
	addTransactionPanel.style.display = 'none'
	clearInputs()
}

const checkForm = () => {
	if (nameInput.value !== '' && amountInput.value !== '' && categorySelect.value !== 'none') {
		createNewTransaction()
	} else {
		alert('Uzupełnij wszystkie pola!')
	}
}

const clearInputs = () => {
	nameInput.value = ''
	amountInput.value = ''
	categorySelect.selectedIndex = 0
}

const createNewTransaction = () => {
	const newTransaction = document.createElement('div')
	newTransaction.classList.add('transaction')
	newTransaction.setAttribute('id', ID)

	checkCategory(selectedCategory)

	newTransaction.innerHTML = `
	<p class="transaction-name"> ${categoryIcon} ${nameInput.value} </p>
	<p class="transaction-amount"> ${amountInput.value} zł 
	<button class="delete" onclick="deleteTransaction(${ID})"><i class="fas fa-times"></i></button> </p>
	`

	amountInput.value > 0
		? incomeArea.appendChild(newTransaction) && newTransaction.classList.add('income')
		: expensesArea.appendChild(newTransaction) && newTransaction.classList.add('expense')

	moneyArray.push(parseFloat(amountInput.value))
	countMoney(moneyArray)
	closePanel()
	ID++
	clearInputs()
}

const checkCategory = transaction => {
	switch (transaction) {
		case '[+] Przychód':
			categoryIcon = '<i class="fas fa-money-bill-wave"></i>'
			break
		case '[-] Zakupy':
			categoryIcon = '<i class="fas fa-cart-arrow-down"></i>'
			break
		case '[-] Restauracje':
			categoryIcon = '<i class="fas fa-hamburger"></i>'
			break
		case '[-] Kino':
			categoryIcon = '<i class="fas fa-film"></i>'
			break
	}
}

const selectCategory = () => {
	selectedCategory = categorySelect.options[categorySelect.selectedIndex].text
}

countMoney = money => {
	const newMoney = money.reduce((x, y) => x + y)
	availableMoney.textContent = `${newMoney} zł`
}

addBtn.addEventListener('click', showPanel)
cancelBtn.addEventListener('click', closePanel)
saveBtn.addEventListener('click', checkForm)
