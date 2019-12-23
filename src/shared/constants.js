/**
 * Default mortgage length in years.
 *
 * @type {number}
 */
export const DEFAULT_MORTGAGE_YEARS = 30;

/**
 * Cap rate I want to hit.
 *
 * @type {number}
 */
export const DESIRED_CAP_RATE = 7;

/**
 * Per-unit cash rate.
 *
 * @type {number}
 */
export const DESIRED_MONTHLY_CASHFLOW = 200;

/**
 * Interest rate to start with.
 *
 * @type {number}
 */
export const STARTING_INTEREST_RATE = 4.0;

/**
 * Percent of PMI to work with for starters.
 *
 * @type {number}
 */
export const AVERAGE_PMI_PERCENT = 0.005;

/**
 * Basic data about cities I'm interested in.
 *
 * @type
 */
export const CITY_DATA = {
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
    'clayton': {
        properName: "Clayton, MO",
        taxRate: 1.409,
        vacancy: 7, // Note: this is wrong, but can't find rates
    }
};

export const DEFAULT_CITY = 'foco';