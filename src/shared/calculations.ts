import {
    AVERAGE_PMI_PERCENT,
    DEFAULT_MORTGAGE_YEARS,
    DESIRED_MONTHLY_CASHFLOW,
} from './constants';

/**
 * Calculate Principal and Interest per month.
 *
 * @param purchasePrice
 * @param percentDown
 * @param interestRate
 * @returns {number}
 */
export const calculateMonthlyPandI = ( purchasePrice: number, percentDown: number, interestRate: number ) => {
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
 * Calculate total monthly payment for mortgage.
 *
 * @param pAndI
 * @param insurance
 * @param taxes
 * @returns {*}
 */
export const calculateMonthlyPayment = ( pAndI: number, insurance: number, taxes: number ) => {
    return pAndI + insurance + taxes;
};

/**
 * Calculate all monthly non-mortgage costs.
 *
 * @param monthlyRent
 * @param vacancy
 * @param maintenance
 * @param capEx
 * @param management
 * @param hoa
 * @returns {number}
 */
export const calculateMonthlyFixedExpenses = ( monthlyRent: number, vacancy: number, maintenance: number, capEx: number, management: number, hoa: number ) => {
    return (monthlyRent * convertPercentInteger(vacancy))
        + (monthlyRent * convertPercentInteger(maintenance))
        + (monthlyRent * convertPercentInteger(capEx))
        + (monthlyRent * convertPercentInteger(management))
        + hoa
};

/**
 * Calculate taxes for a whole year.
 *
 * @param purchasePrice
 * @param taxRate
 * @returns {number}
 */
export const calculateYearlyTaxes = ( purchasePrice: number, taxRate: number ) => {
    return purchasePrice * convertPercentInteger(taxRate);
};

/**
 * Calculate the caprate for the money we've put down.
 *
 * @param moneyDown
 * @param monthlyCashFlow
 * @returns {number}
 */
export const calculateCapRate = ( moneyDown: number, monthlyCashFlow: number ) => {
    return Math.round( ((monthlyCashFlow * 12) / moneyDown)  * 100 );
};

/**
 * Calculate the monthly cash flow
 *
 * @param mortgagePayment
 * @param fixedExpenses
 * @param monthlyRent
 * @param monthlyTaxes
 * @param monthlyInsurance
 * @returns {number}
 */
export const calculateMonthlyCashFlow = ( mortgagePayment: number, fixedExpenses: number, monthlyRent: number ) => {
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
export const calculateMonthlyInsurance = ( insuranceCost: number, hasPmi: boolean, price: number, percentDown: number ) => {
    const pmiCost = hasPmi ? calculateMonthlyPmi( price, percentDown ) : 0;

    return insuranceCost + pmiCost;
};

/**
 *
 * @param purchasePrice
 * @param percentDown
 * @returns {number}
 */
export const calculateMonthlyPmi = ( purchasePrice: number, percentDown: number ) => {
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
export const calculateMoneyDown = ( purchasePrice: number, percentDown: number, closingCosts: number, repairCosts: number ) => {
    return (purchasePrice * convertPercentInteger(percentDown)) + closingCosts + repairCosts;
};

/**
 *
 * @param purchasePrice
 * @param percentDown
 * @returns {number}
 */
export const calculatePrincipal = ( purchasePrice: number, percentDown: number ) => {
    return purchasePrice - (convertPercentInteger(percentDown) * purchasePrice);
};

/**
 * 
 * @param monthlyMortgagePayment
 * @param hoa
 * @param capEx
 * @param maintenance
 * @param vacancy
 * @param propertyManagement
 */
export const calculateToCashflowGoalByRent = (monthlyMortgagePayment: number, hoa: number, capEx: number, maintenance: number, vacancy: number, propertyManagement: number): number => {
    const upper = monthlyMortgagePayment + hoa + DESIRED_MONTHLY_CASHFLOW;
    const lower = 1 - (vacancy + capEx + maintenance + propertyManagement) / 100;

    return upper / lower;
};

/**
 *
 * @param percentInteger
 * @returns {number}
 */
const convertPercentInteger = ( percentInteger: number ) => percentInteger / 100;
