import React from 'react';

import Grid from '@material-ui/core/Grid';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import NotInterestedIcon from '@material-ui/icons/NotInterested';

import { DESIRED_CAP_RATE, DESIRED_MONTHLY_CASHFLOW } from "../shared/constants";
import { ApplicationData } from './App';

import {
    calculateCapRate,
    calculateMonthlyCashFlow,
    calculateMoneyDown,
    calculateMonthlyFixedExpenses,
    calculateMonthlyInsurance,
    calculateMonthlyPandI,
    calculateYearlyTaxes,
    calculateMonthlyPayment,
    calculateToCashflowGoalByRent,
    calculateYearlyDepreciationWriteOff,
    calculateTaxDeductions,
} from '../shared/calculations';
import Typography from "@material-ui/core/Typography";

const Results = ( { allValues }: { allValues: ApplicationData } ) => {

    const {
        capEx,
        interestRate,
        maintenance,
        management,
        percentDown,
        pmi,
        taxRate,
        vacancy,
    } = allValues;

    let {
        closingCosts,
        hoa,
        insuranceCost,
        monthlyRent,
        price,
        repairCosts,
    } = allValues;

    // @todo:: there's certainly a better way to do this.
    closingCosts  = Number(closingCosts);
    hoa           = Number(hoa);
    insuranceCost = Number(insuranceCost);
    monthlyRent   = Number(monthlyRent);
    price         = Number(price);
    repairCosts   = Number(repairCosts);

    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2
    });

    const monthlyPandI     = calculateMonthlyPandI(price, percentDown, interestRate);
    const yearlyTaxes      = calculateYearlyTaxes(price, taxRate);
    const monthlyTaxes     = yearlyTaxes / 12;
    const monthlyInsurance = calculateMonthlyInsurance(insuranceCost, pmi, price, percentDown);
    const monthlyPayment   = calculateMonthlyPayment(monthlyPandI, monthlyInsurance, monthlyTaxes);

    const fixedExpenses    = calculateMonthlyFixedExpenses(monthlyRent, vacancy, maintenance, capEx, management, hoa);
    const cashFlow         = calculateMonthlyCashFlow(monthlyPayment, fixedExpenses, monthlyRent);
    const moneyDown        = calculateMoneyDown(price, percentDown, closingCosts, repairCosts);
    const capRate          = calculateCapRate(moneyDown, cashFlow);

    const doesCashFlow = (DESIRED_MONTHLY_CASHFLOW < cashFlow);
    const doesCapRate  = (DESIRED_CAP_RATE < capRate);

    let byRentIncrease: number;
    if (! doesCashFlow) {
        byRentIncrease = calculateToCashflowGoalByRent(monthlyPayment, hoa, capEx, maintenance, vacancy, management);
    }

    const noIcon  = <NotInterestedIcon fontSize="small" color="error" />;
    const yesIcon = <CheckCircleOutlineIcon fontSize="small" color="action" />;

    const [showMore, setShowMore] = React.useState(false);
    const [showTax, setShowTax] = React.useState(false);

    const mainRows = [
        {
            name: 'Money Down',
            data: formatter.format(moneyDown),
        },
        {
            name: 'Monthly Payment',
            data: formatter.format(monthlyPayment),
        },
        {
            name: 'Fixed Expenses',
            data: formatter.format(fixedExpenses),
        },
        {
            name: 'Cash Flow',
            data: formatter.format(cashFlow),
            icon: doesCashFlow ? yesIcon : noIcon,
        },
        {
            name: 'Cap Rate',
            data: `${capRate}%`,
            icon: doesCapRate ? yesIcon : noIcon,
        },
    ];

    const individualRows = [
        {
            name: 'P and I',
            data: formatter.format(monthlyPandI),
        },
        {
            name: 'Taxes',
            data: formatter.format(yearlyTaxes / 12),
        },
        {
            name: 'Insurance',
            data: formatter.format(monthlyInsurance),
        },
        {
            name: 'Vacancy',
            data: formatter.format((vacancy/100) * monthlyRent),
        },
        {
            name: 'Maintenance',
            data: formatter.format((maintenance/100) * monthlyRent),
        },
        {
            name: 'CapEx',
            data: formatter.format((capEx/100) * monthlyRent),
        },
        {
            name: 'Management',
            data: formatter.format((management/100) * monthlyRent),
        },
    ];

    const taxRows = [
        {
            name: 'Yearly Depreciation',
            data: formatter.format( calculateYearlyDepreciationWriteOff( price ) ),
        },
        {
            // Interest + Management Fees + Property Taxes + HOA
            name: 'Deductions',
            data: formatter.format( calculateTaxDeductions( price, percentDown, interestRate, management, monthlyRent, monthlyTaxes, hoa ) ),
        },
        {
            name: 'Yearly Income',
            data: formatter.format( monthlyRent * 12 )
        }
    ];

    const toCashflowRows = [
        {
            name: 'By Purchase Price',
            data: 0,
        },
        {
            name: 'By Rent',
            // @ts-ignore
            data: formatter.format(byRentIncrease),
        },
    ];

    return (
        <Grid
            item
            xs={12} sm={4}
            style={
                {
                    position: 'sticky'
                }
            }
        >
            <Grid item xs={12} sm={12} alignContent="flex-start">
                <Table aria-label="simple table">
                    <TableBody>
                        {mainRows.map(row => (
                            <TableRow key={row.name}>
                                <TableCell component="th" scope="row">
                                    {row.name}
                                </TableCell>
                                <TableCell align="right">{row.data} {row.icon ? row.icon : null}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>

                {!doesCashFlow && (
                    <Table aria-label="simple table">
                        <TableBody>
                            {toCashflowRows.map(row => (
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
                <Grid container justify="space-between" onClick={ () => setShowMore( ! showMore ) }>
                    <Typography variant="h6">Details</Typography>
                    <ExpandMoreIcon color="action" />
                </Grid>
                { showMore && ( <Table aria-label="simple table">
                    <TableBody>
                        {individualRows.map(row => (
                            <TableRow key={row.name}>
                                <TableCell component="th" scope="row">
                                    {row.name}
                                </TableCell>
                                <TableCell align="right">
                                    {row.data}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table> ) }
            </Grid>

            <Grid item xs={12} sm={12} alignContent="flex-start">
                <Grid container justify="space-between" onClick={ () => setShowTax( ! showTax ) }>
                    <Typography variant="h6">Tax Details</Typography>
                    <ExpandMoreIcon color="action" />
                </Grid>
                { showTax && ( <Table aria-label="simple table">
                    <TableBody>
                        {taxRows.map(row => (
                            <TableRow key={row.name}>
                                <TableCell component="th" scope="row">
                                    {row.name}
                                </TableCell>
                                <TableCell align="right">
                                    {row.data}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table> ) }
            </Grid>
        </Grid>
    )
};

export default Results;