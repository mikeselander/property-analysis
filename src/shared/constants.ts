/**
 * Default mortgage length in years.
 *
 * @type {number}
 */
export const DEFAULT_MORTGAGE_YEARS: number = 30;

/**
 * Cap rate I want to hit.
 *
 * @type {number}
 */
export const DESIRED_CAP_RATE: number = 7;

/**
 * Per-unit cash rate.
 *
 * @type {number}
 */
export const DESIRED_MONTHLY_CASHFLOW: number = 200;

/**
 * Interest rate to start with.
 *
 * @type {number}
 */
export const STARTING_INTEREST_RATE: number = 4.0;

/**
 * Percent of PMI to work with for starters.
 *
 * @type {number}
 */
export const AVERAGE_PMI_PERCENT: number = 0.005;

/**
 *
 */
export const DEFAULT_CITY: string = 'foco';

interface CityData {
    [key: string]: {
        properName: string;
        taxRate: number;
        vacancy: number;
    }
}

/**
 * Basic data about cities I'm interested in.
 *
 * @type {object}
 */
export const CITY_DATA: CityData = {
    'foco': {
        properName: "Fort Collins",
        taxRate: 0.567,
        vacancy: 4.64,
    },
    'loveland': {
        properName: "Loveland",
        taxRate: 0.567,
        vacancy: 5,
    },
    'wellington': {
        properName: "Wellington",
        taxRate: 0.567,
        vacancy: 7,
    },
    'cda': {
        properName: "Coeur d'Alene",
        taxRate: 0.656,
        vacancy: 4,
    },
    'clayton': {
        properName: "Clayton, MO",
        taxRate: 1.409,
        vacancy: 5.31,
    }
};

interface LoanTypeConfig {
    [key: string]: {
        percentDown: number;
        pmi: boolean;
    }
}

/**
 * Hold configuration of certain auto-filled values that we can fill in.
 *
 * @type {Object}
 */
export const LOAN_TYPE_CONFIG: LoanTypeConfig = {
    'rental': {
        percentDown: 20,
        pmi: false,
    },
    'house-hack': {
        percentDown: 5,
        pmi: true,
    },
    'cash': {
        percentDown: 100,
        pmi: false,
    },
};
