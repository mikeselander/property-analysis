/**
 * Default mortgage length in years.
 *
 * @type {number}
 */
export const DEFAULT_MORTGAGE_YEARS: number = 30;

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
export const STARTING_INTEREST_RATE: number = 3.75;

/**
 * Percent of PMI to work with for starters.
 *
 * @type {number}
 */
export const AVERAGE_PMI_PERCENT: number = 0.005;

/**
 * Default basis for the depreciation writeoff.
 *
 * Totally made up number, will eventually add a field for this.
 *
 * @type {number}
 */
export const DEFAULT_BASIS: number = 0.9;

/**
 *
 */
export const DEFAULT_CITY: string = "foco";

interface CityData {
	[key: string]: {
		properName: string;
		taxRate: number;
		vacancy: number;
	};
}

/**
 * Basic data about cities I'm interested in.
 *
 * @type {object}
 */
export const CITY_DATA: CityData = {
	foco: {
		properName: "Fort Collins",
		taxRate: 0.715,
		vacancy: 4.64,
	},
	timnath: {
		properName: "Timnath",
		taxRate: 0.72,
		vacancy: 4.64,
	},
	loveland: {
		properName: "Loveland",
		taxRate: 0.567,
		vacancy: 5,
	},
	wellington: {
		properName: "Wellington",
		taxRate: 0.567,
		vacancy: 7,
	},
	cda: {
		properName: "Coeur d'Alene",
		taxRate: 0.656,
		vacancy: 4,
	},
	"kansas-city": {
		properName: "Kansas City, MO",
		taxRate: 1.376,
		vacancy: 4.7,
	},
};

interface LoanTypeConfig {
	[key: string]: {
		properName: string;
		percentDown: number;
		pmi: boolean;
	};
}

/**
 * Hold configuration of certain auto-filled values that we can fill in.
 *
 * @type {Object}
 */
export const LOAN_TYPE_CONFIG: LoanTypeConfig = {
	conventional: {
		properName: "20% Down Mortgage",
		percentDown: 20,
		pmi: false,
	},
	"live-in": {
		properName: "Live-in (5% down + PMI)",
		percentDown: 5,
		pmi: true,
	},
	cash: {
		properName: "All Cash",
		percentDown: 100,
		pmi: false,
	},
	"seller-financing": {
		properName: "Seller Financing",
		percentDown: 0,
		pmi: false,
	},
};

export const INITIAL_STATE = {
	capEx: 5,
	city: DEFAULT_CITY,
	closingCosts: 3700,
	hoa: 0,
	insuranceCost: 50,
	interestRate: STARTING_INTEREST_RATE,
	maintenance: 5,
	management: 11,
	monthlyRent: 1000,
	percentDown: 20,
	pmi: false,
	price: 100000,
	repairCosts: 0,
	taxRate: CITY_DATA[DEFAULT_CITY].taxRate,
	typeOfRental: "conventional",
	vacancy: CITY_DATA[DEFAULT_CITY].vacancy,
};
