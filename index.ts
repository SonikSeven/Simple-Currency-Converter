import * as readlineSync from 'readline-sync';

type Currencies = {[key: string]: number};

function main() {
  const currencies = { USD: 1.0, JPY: 113.5, EUR: 0.89, RUB: 74.36, GBP: 0.75 };
  console.log("Welcome to Currency Converter!");
  for (const [currency, equivalent] of Object.entries(currencies)) {
    console.log(`1 USD equals ${equivalent} ${currency}`);
  }
  while (true) {
    const command = Number(
        readlineSync.question(`What do you want to do?
1-Convert currencies 2-Exit program
`)
    );
    switch (command) {
      case 1:
        convertation(currencies);
        break;
      case 2:
        console.log("Have a nice day!");
        return;
      default:
        console.log("Unknown input");
    }
  }
}

function convertation(currencies: Currencies) {
  let original_currency, target_currency, amount;
  try {
    original_currency = getCurrency(
      "What do you want to convert?\nFrom: ",
      currencies
    );
    target_currency = getCurrency("To: ", currencies);
    amount = getAmount("Amount: ");
  } catch (error: any) {
    console.log(error.message);
    return;
  }
  const result = (
    (amount / currencies[original_currency]) *
    currencies[target_currency]
  ).toFixed(4);
  console.log(
    `Result: ${amount} ${original_currency} equals ${result} ${target_currency}`
  );
}

function getCurrency(message: string, currencies: Currencies) {
  const currency = readlineSync.question(message).toUpperCase();
  if (!currencies.hasOwnProperty(currency)) {
    throw new Error("Unknown currency");
  }
  return currency;
}

function getAmount(message: string) {
  const amount = Number(readlineSync.question(message));
  if (isNaN(amount)) {
    throw new Error("The amount has to be a number");
  } else if (amount < 1) {
    throw new Error("The amount cannot be less than 1");
  }
  return amount;
}

main();
