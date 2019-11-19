import { DEFAULT_MORTGAGE_YEARS, AVERAGE_PMI_PERCENT } from './constants';


var M; //monthly mortgage payment
var P = 400000; //principle / initial amount borrowed
var I = 3.5 / 100 / 12; //monthly interest rate
var N = 30 * 12; //number of payments months

//monthly mortgage payment
M = monthlyPayment(P, N, I);

console.log(M);

function monthlyPayment(p, n, i) {
    return p * i * (Math.pow(1 + i, n)) / (Math.pow(1 + i, n) - 1);
}

/**
 *
 *
 * @param purchasePrice
 * @param percentDown
 * @param interestRate
 * @returns {number}
 */
export const calculateMonthlyPandI = (purchasePrice, percentDown, interestRate ) => {
    const numberOfPaymentsTotal = DEFAULT_MORTGAGE_YEARS * 12;
    const principal = calculatePrincipal( purchasePrice, percentDown );
    const interestFloat = convertPercentInteger(interestRate) / 12;

    return principal
        * interestFloat
        * (
            Math.pow(1 + interestFloat, numberOfPaymentsTotal))
            / (Math.pow(1 + interestFloat, numberOfPaymentsTotal)
            - 1
        );
};

/**
 *
 * @param pAndI
 * @param insurance
 * @param taxes
 * @returns {*}
 */
export const calculateMonthlyPayment = ( pAndI, insurance, taxes ) => {
    return pAndI + insurance + taxes;
};

/**
 *
 * @param monthlyRent
 * @param vacancy
 * @param maintenance
 * @param capEx
 * @param management
 * @returns {number}
 */
export const calculateMonthlyFixedExpenses = (monthlyRent, vacancy, maintenance, capEx, management) => {
    return (monthlyRent * convertPercentInteger(vacancy))
        + (monthlyRent * convertPercentInteger(maintenance))
        + (monthlyRent * convertPercentInteger(capEx))
        + (monthlyRent * convertPercentInteger(management))
};

/**
 *
 * @param purchasePrice
 * @param taxRate
 * @returns {number}
 */
export const calculateYearlyTaxes = ( purchasePrice, taxRate ) => {
    return purchasePrice * convertPercentInteger(taxRate);
};

/**
 *
 * @param moneyDown
 * @param monthlyCashFlow
 * @returns {number}
 */
export const calculateCapRate = ( moneyDown, monthlyCashFlow ) => {

    console.table( (monthlyCashFlow * 12), moneyDown );
    return Math.round( ((monthlyCashFlow * 12) / moneyDown)  * 100 );
};

/**
 *
 * @param mortgagePayment
 * @param fixedExpenses
 * @param monthlyRent
 * @param monthlyTaxes
 * @param monthlyInsurance
 * @returns {number}
 */
export const calculateMonthlyCashFlow = ( mortgagePayment, fixedExpenses, monthlyRent ) => {
    return Number((monthlyRent - mortgagePayment - fixedExpenses).toFixed(2));
};

/**
 *
 * @param insuranceCost
 * @param hasPmi
 * @param price
 * @param percentDown
 * @returns {*}
 */
export const calculateMonthlyInsurance = ( insuranceCost, hasPmi, price, percentDown ) => {
    const pmiCost = hasPmi ? calculateMonthlyPmi( price, percentDown ) : 0;

    return insuranceCost + pmiCost;
};

/**
 *
 * @param purchasePrice
 * @param percentDown
 * @returns {number}
 */
export const calculateMonthlyPmi = ( purchasePrice, percentDown ) => {
    return (calculatePrincipal( purchasePrice, percentDown ) * AVERAGE_PMI_PERCENT) / 12;
};

/**
 *
 * @param purchasePrice
 * @param percentDown
 * @param closingCosts
 * @param repairCosts
 * @returns {number}
 */
export const calculateMoneyDown = ( purchasePrice, percentDown, closingCosts, repairCosts ) => {
    return (purchasePrice * convertPercentInteger(percentDown)) + closingCosts + repairCosts;
};

/**
 *
 * @param purchasePrice
 * @param percentDown
 * @returns {number}
 */
export const calculatePrincipal = ( purchasePrice, percentDown ) => {
    return purchasePrice - (convertPercentInteger(percentDown) * purchasePrice);
};

/**
 *
 * @param percentInteger
 * @returns {number}
 */
const convertPercentInteger = percentInteger => percentInteger / 100;
