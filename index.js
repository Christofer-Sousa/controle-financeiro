const transactionUl = document.querySelector("#transactions")
const incomeDisplay = document.querySelector("#money-plus")
const expenseDisplay = document.querySelector("#money-minus")
const balanceDisplay = document.querySelector("#balance")
const form = document.querySelector("#form")
const inputTransactionName = document.querySelector("#text")
const inputTransactionAmout = document.querySelector("#amount")


const localStorageTransactions = JSON.parse(localStorage.getItem("transactions"))

let transactions = localStorage.getItem("transactions") !== null ? localStorageTransactions : []

const removeTransaction = ID => {
    transactions = transactions.filter(transaction => transaction.id !== ID)
    updateLocalStorage()
    init()
}

const addTransactionIntoDOM = transaction => {
    const operator = transaction.amout < 0 ? "-" : "+"
    const CSSClass = transaction.amout < 0 ? "minus" : "plus"
    const amoutWithoutOperator = Math.abs(transaction.amout)
    const li = document.createElement("li")

    li.classList.add(CSSClass)
    li.innerHTML = `${transaction.name} <span>${operator} R$ ${amoutWithoutOperator}</span><button class="delete-btn" onclick="removeTransaction(${transaction.id})">x</button>`
    
    transactionUl.append(li)    
}
const updateBalanceValues = () => {
    const transactionsAmouts = transactions.map(transaction => transaction.amout)
    const total = transactionsAmouts.reduce((acumulator, transaction) => acumulator + transaction, 0).toFixed(2)
    const income = transactionsAmouts.filter(value => value > 0).reduce((accumulator, value) => accumulator + value, 0).toFixed(2)

    const expense = Math.abs(transactionsAmouts.filter(value => value < 0).reduce((accumulator, value) => accumulator + value, 0).toFixed(2))
    
    balanceDisplay.textContent = `R$ ${total}`
    incomeDisplay.textContent = `R$ ${income}`
    expenseDisplay.textContent = `R$ ${expense}`
}
const init = () => {
    transactionUl.innerHTML = ""
    transactions.forEach(addTransactionIntoDOM)
    updateBalanceValues()
}
init()

const updateLocalStorage = () => {
    localStorage.setItem("transactions", JSON.stringify(transactions))
}

const generateID = () => Math.round(Math.random() * 1000)

form.addEventListener("submit", event => {
    event.preventDefault()

    const transactionName = inputTransactionName.value.trim()
    const transactionAmount = inputTransactionAmout.value.trim()
    if(inputTransactionName.value.trim() === "" || inputTransactionAmout.value.trim() === ""){
        alert("Por favor, preencha tanto o nome quanto o valor da tranação")
        return
    }

    const transaction = {
         id: generateID(),
         name: transactionName,
         amout: Number(transactionAmount)
    }
    
    transactions.push(transaction)
    init()
    updateLocalStorage()

    inputTransactionAmout.value = ""
    inputTransactionName.value = ""
    
})