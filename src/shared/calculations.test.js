import {
    calculateMonthlyPandI,
    calculateMonthlyPayment,
    calculateMonthlyFixedExpenses,
    calculateCapRate,
    calculateMonthlyCashFlow,
    calculateMonthlyInsurance,
    calculateMonthlyPmi,
    calculateMoneyDown,
    calculatePrincipal,
    calculateToCashflowGoalByRent,
    calculateYearlyDepreciationWriteOff,
    convertPercentInteger,
} from './calculations';

describe( 'Calculations Simple Unit Tests', () => {
    it( 'Calculates Monthly Expenses', () => {
        expect( calculateMonthlyFixedExpenses( 1000, 5, 5, 5, 5, 50 ) )
            .toEqual( 250 );
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

    it( 'Calculates Money Down', () => {
        expect( calculateMoneyDown(  250000, 10, 5000, 5000 ) )
            .toEqual( 35000 );
    } );
} );

describe( 'calculateMonthlyPandI', () => {
    it.each(
        [
            [100000, 10, 3.125, "385.54"],
            [1000000, 20, 5, "4294.57"],
            [250000, 40, 10, "1316.36"],
        ]
    )("calculates $%s price and %s% down and %s interest as %s", (purchasePrice, percentDown, interestRate, expected) => {
        expect(calculateMonthlyPandI( purchasePrice, percentDown, interestRate ).toFixed(2)).toBe( expected );
    });
} );



describe( 'calculateMonthlyPayment', () => {
    it.each(
        [
            [1, 2, 3, 4, 10],
            [1.2, 3.5, 8.9, 10.12, 23.72],
            [1316.23, 50, 0, 100, 1466.23],

        ]
    )("adds %d, %d, %d, and %d correctly", (one, two, three, four, expected) => {
        expect(calculateMonthlyPayment( one, two, three, four )).toBe( expected );
    });
} );

describe("calculatePrincipal", () => {
    it.each(
        [
            [100000, 10, 90000],
            [1000000, 20, 800000],
            [10, 90, 1],

        ]
    )("calculates $%s price and %s% down as %s", (purchasePrice, percentDown, expected) => {
        expect(calculatePrincipal( purchasePrice, percentDown )).toBe( expected );
    });
});

describe( 'calculateCapRate', () => {
    it.each([
        [100000, 100, 1.2],
        [250000, 300, 1.44],
        [500000, 1000, 2.4],
    ])("calculates $%d value and $%d monthly noi as %d", (moneyDown, monthlyCashFlow, expected) => {
        expect(calculateCapRate( moneyDown, monthlyCashFlow )).toBe( expected );
    });
} );

describe( 'calculateMonthlyPmi', () => {
    it.each([
        [100000, 10, "37.50"],
        [400000, 5, "158.33"],
        [200000, 15, "70.83"],
    ])("calculates $%d price and %d% down as %d", (purchasePrice, percentDown, expected) => {
        expect(calculateMonthlyPmi( purchasePrice, percentDown ).toFixed(2)).toBe( expected );
    });
} );

describe("calculateToCashflowGoalByRent", () => {
    it("", () => {});

    it( 'Calculates Cashflow Goal by Rent', () => {
        expect(
            Number( calculateToCashflowGoalByRent(  1000, 100, 5, 5, 5, 10 ) ).toFixed( 2 ) )
            .toEqual(  "1733.33" );
    } );
});

describe("calculateYearlyDepreciationWriteOff", () => {
    it.each([
        [ 100000, null, "3272.73" ],
        [ 500000, null, "16363.64" ],
        [ 500000, 0.8, "14545.45" ],
    ])("", ( price, basis, expected ) => {
        if ( basis ) {
            expect( calculateYearlyDepreciationWriteOff( price, basis ).toFixed( 2 ) ).toBe( expected )
        } else {
            expect( calculateYearlyDepreciationWriteOff( price ).toFixed( 2 ) ).toBe( expected )
        }
    });
});

describe("calculateTotalLoanInterest", () => {
    it("", () => {});
});

describe("calculateTaxDeductions", () => {
    it("", () => {});
});

describe("getAmortizationTable", () => {
   it("", () => {});
});

describe( "convertPercentInteger", () => {
    it.each(
        [
            [6000, 60],
            [102, 1.02],
            [40, .4],
            [6, .06]
        ]
    )("converts %s correctly into %s", ( input, expected ) => {
        expect(convertPercentInteger(input)).toBe(expected);
    })
} );