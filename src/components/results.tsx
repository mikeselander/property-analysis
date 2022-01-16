import React from "react";

import Grid from "@material-ui/core/Grid";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";

import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import { DESIRED_MONTHLY_CASHFLOW } from "../shared/constants";
import { ApplicationData } from "./App";

import {
	calculateCapRate,
	calculateMonthlyCashFlow,
	calculateGrossMonthlyCashFlow,
	calculateMoneyDown,
	calculateMonthlyFixedExpenses,
	calculateToCashflowGoalByRent,
	calculateYearlyDepreciationWriteOff,
	calculateTaxDeductions,
	getDealData,
} from "../shared/calculations";
import Typography from "@material-ui/core/Typography";

const Results = ({ allValues }: { allValues: ApplicationData }) => {
	const { capEx, interestRate, maintenance, management, percentDown, vacancy } =
		allValues;

	let { closingCosts, price, repairCosts } = allValues;

	// @todo:: there's certainly a better way to do this.
	closingCosts = Number(closingCosts);
	price = Number(price);
	repairCosts = Number(repairCosts);

	const formatter = new Intl.NumberFormat("en-US", {
		style: "currency",
		currency: "USD",
		minimumFractionDigits: 2,
	});

	const percentFormatter = new Intl.NumberFormat("en-US", {
		style: "percent",
		minimumFractionDigits: 2,
	});

	const dealData = getDealData(allValues);

	const fixedExpenses = calculateMonthlyFixedExpenses(dealData);
	const cashFlow = calculateMonthlyCashFlow(
		dealData.mortgagePayment.monthly,
		fixedExpenses,
		dealData.grossRent.monthly
	);
	const grossCashFlow = calculateGrossMonthlyCashFlow(
		cashFlow,
		dealData.vacancy.monthly,
		dealData.maintenance.monthly,
		dealData.capEx.monthly
	);
	const moneyDown = calculateMoneyDown(
		price,
		percentDown,
		closingCosts,
		repairCosts
	);
	const capRate = calculateCapRate(moneyDown, cashFlow);

	const doesCashFlow = DESIRED_MONTHLY_CASHFLOW < cashFlow;

	let byRentIncrease: number;
	if (!doesCashFlow) {
		byRentIncrease = calculateToCashflowGoalByRent(
			dealData.mortgagePayment.monthly,
			dealData.hoa.monthly,
			capEx,
			maintenance,
			vacancy,
			management
		);
	}

	const [showMore, setShowMore] = React.useState(false);
	const [showTax, setShowTax] = React.useState(false);

	const mainRows = [
		{
			name: "Money Upfront",
			data: formatter.format(moneyDown),
		},
		{
			name: "Monthly Payment",
			data: formatter.format(dealData.mortgagePayment.monthly),
		},
		{
			name: "Fixed Expenses",
			data: formatter.format(fixedExpenses),
		},
		{
			name: "Gross Cash Flow",
			data: formatter.format(grossCashFlow),
		},
		{
			name: "Net Cash Flow",
			data: formatter.format(cashFlow),
		},
		{
			name: "Cap Rate",
			data: `${percentFormatter.format(capRate / 100)}`,
		},
	];

	const individualRows = [
		{
			name: "P and I",
			data: formatter.format(dealData.principalAndInterest.monthly),
		},
		{
			name: "Taxes",
			data: formatter.format(dealData.propertyTaxes.monthly),
		},
		{
			name: "Insurance",
			data: formatter.format(dealData.insurance.monthly),
		},
		{
			name: "Vacancy",
			data: formatter.format(dealData.vacancy.monthly),
		},
		{
			name: "Maintenance",
			data: formatter.format(dealData.maintenance.monthly),
		},
		{
			name: "CapEx",
			data: formatter.format(dealData.capEx.monthly),
		},
		{
			name: "Management",
			data: formatter.format(dealData.propertyManagement.monthly),
		},
	];

	if (dealData.hoa.monthly > 0) {
		individualRows.push({
			name: "HOA",
			data: formatter.format(dealData.hoa.monthly),
		});
	}

	if (dealData.pmi.monthly > 0) {
		individualRows.push({
			name: "Mortgage Insurance (PMI)",
			data: formatter.format(dealData.pmi.monthly),
		});
	}

	const taxRows = [
		{
			name: "Yearly Depreciation",
			data: formatter.format(calculateYearlyDepreciationWriteOff(price)),
		},
		{
			// Interest + Management Fees + Property Taxes + HOA
			name: "Deductions",
			data: formatter.format(
				calculateTaxDeductions(
					price,
					percentDown,
					interestRate,
					dealData.propertyManagement.monthly,
					dealData.grossRent.monthly,
					dealData.propertyTaxes.monthly,
					dealData.hoa.monthly
				)
			),
		},
		{
			name: "Yearly Gross Income",
			data: formatter.format(dealData.grossRent.yearly),
		},
	];

	const toCashflowRows = [
		{
			name: "Rent Necessary to Cashflow",
			// @ts-ignore
			data: formatter.format(byRentIncrease),
		},
	];

	return (
		<Grid
			item
			xs={12}
			sm={4}
			style={{
				position: "sticky",
			}}
		>
			<Grid item xs={12} sm={12} alignContent="flex-start">
				<Table aria-label="simple table">
					<TableBody>
						{mainRows.map((row) => (
							<TableRow key={row.name}>
								<TableCell component="th" scope="row">
									{row.name}
								</TableCell>
								<TableCell align="right">{row.data}</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>

				{!doesCashFlow && (
					<Table aria-label="simple table">
						<TableBody>
							{toCashflowRows.map((row) => (
								<TableRow key={row.name}>
									<TableCell component="th" scope="row">
										{row.name}
									</TableCell>
									<TableCell align="right">{row.data}</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				)}
			</Grid>

			<Grid item xs={12} sm={12} alignContent="flex-start">
				<Grid
					container
					justify="space-between"
					onClick={() => setShowMore(!showMore)}
				>
					<Typography variant="h6">Monthly Expense Breakdown</Typography>
					<ExpandMoreIcon color="action" />
				</Grid>
				{showMore && (
					<Table aria-label="simple table">
						<TableBody>
							{individualRows.map((row) => (
								<TableRow key={row.name}>
									<TableCell component="th" scope="row">
										{row.name}
									</TableCell>
									<TableCell align="right">{row.data}</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				)}
			</Grid>

			<Grid item xs={12} sm={12} alignContent="flex-start">
				<Grid
					container
					justify="space-between"
					onClick={() => setShowTax(!showTax)}
				>
					<Typography variant="h6">Tax Details</Typography>
					<ExpandMoreIcon color="action" />
				</Grid>
				{showTax && (
					<Table aria-label="simple table">
						<TableBody>
							{taxRows.map((row) => (
								<TableRow key={row.name}>
									<TableCell component="th" scope="row">
										{row.name}
									</TableCell>
									<TableCell align="right">{row.data}</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				)}
			</Grid>
		</Grid>
	);
};

export default Results;
