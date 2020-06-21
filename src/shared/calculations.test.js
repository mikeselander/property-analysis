import {
    calculateMonthlyPandI,
    calculateMonthlyPayment,
    calculateMonthlyFixedExpenses,
    calculateYearlyTaxes,
    calculateCapRate,
    calculateMonthlyCashFlow,
    calculateMonthlyInsurance,
    calculateMonthlyPmi,
    calculateMoneyDown,
    calculatePrincipal,
    calculateToCashflowGoalByRent,
    convertPercentInteger,
} from './calculations';

describe( 'Calculations Simple Unit Tests', () => {
    it( 'Calculates Monthly Principal and Interest', () => {
        expect(
            Number( calculateMonthlyPandI( 200000, 20, 4.5 ) ).toFixed( 1 )
        )
            .toEqual( Number( 810.70 ).toString() );
    } );

    it( 'Calculates Monthly Payment', () => {
        expect( calculateMonthlyPayment( 1000, 75, 100 ) )
            .toEqual( 1175 );
    } );

    it( 'Calculates Monthly Expenses', () => {
        expect( calculateMonthlyFixedExpenses( 1000, 5, 5, 5, 5, 50 ) )
            .toEqual( 250 );
    } );

    it( 'Calculates Yearly Taxes', () => {
        expect( calculateYearlyTaxes( 100000, .67 ) )
            .toEqual( 670 );
    } );

    it( 'Calculates a Cap Rate', () => {
        expect( calculateCapRate( 20000, 200 ) )
            .toEqual( 12 );
    } );

    it( 'Calculates Monthly Cashflow', () => {
        expect( calculateMonthlyCashFlow( 1500, 300, 2000 ) )
            .toEqual( 200 );

        // @todo:: Also do negative
    } );

    it( 'Calculates Monthly Insurance', () => {
        expect( calculateMonthlyInsurance( 75, false, 200000, 20 ) )
            .toEqual( 75 );

        expect( calculateMonthlyInsurance( 75, true, 100000, 10 ) )
            .toEqual( 112.5 );
    } );

    it( 'Calculates Primary Mortgage Insurance', () => {
        expect( calculateMonthlyPmi(  100000, 10 ) )
            .toEqual( 37.5 );
    } );

    it( 'Calculates Money Down', () => {
        expect( calculateMoneyDown(  250000, 10, 5000, 5000 ) )
            .toEqual( 35000 );
    } );

    it( 'Calculates Principal', () => {
        expect( calculatePrincipal(  100000, 10 ) )
            .toEqual( 90000 );
    } );

    it( 'Calculates Cashflow Goal by Rent', () => {
        expect(
            Number( calculateToCashflowGoalByRent(  1000, 100, 5, 5, 5, 10 ) ).toFixed( 2 ) )
            .toEqual(  "1733.33" );
    } );

    it( 'Calculates Depreciation Writeoff', () => {
        // calculateYearlyDepreciationWriteOff
    } );

    it( 'Calculates Interest over the lifetime of the loan', () => {
        // calculateTotalLoanInterest
    } );

    it( 'Calculates Tax Deductions', () => {
        // calculateTaxDeductions
    } );

    it( 'Generates an Amortization Table', () => {
        // getAmortizationTable
    } );

    it( 'Calculates a Whole Percentage into a Decimal Form', () => {
        expect( convertPercentInteger( 102 ) ).toEqual( 1.02 );
        expect( convertPercentInteger( 40 ) ).toEqual( .4 );
        expect( convertPercentInteger( 6 ) ).toEqual( .06 );
    } );
} );