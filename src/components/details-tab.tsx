import React from 'react';
import Grid from "@material-ui/core/Grid";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import { getAmortizationTable } from '../shared/calculations';

import { ApplicationData } from './App';
import Typography from "@material-ui/core/Typography";

const DetailsTab = ({ values }: { values: ApplicationData }) => {
    const {
        price,
        percentDown,
        interestRate,
    } = values;

    const amortization = getAmortizationTable( Number( price ), percentDown, interestRate );

    const formatter = new Intl.NumberFormat( 'en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2
    } );

    // @ts-ignore
    return (
        <Grid
            container
            justify="space-between"
            alignItems="flex-start"
            spacing={3}
        >
            <Grid item sm={12}>
                <Typography variant="h6">Deal Values</Typography>

                <Table stickyHeader>
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>Value</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            Object.keys( values ).map( ( key ) => (
                                <TableRow>
                                    <TableCell>{ key }</TableCell>
                                    <TableCell>
                                        {
                                            // @ts-ignore
                                            values[ key ]
                                        }
                                    </TableCell>
                                </TableRow>
                            ) )
                        }
                    </TableBody>
                </Table>
            </Grid>

            <Grid item sm={12}>
                <Typography variant="h6">Amortizaion Table</Typography>
                
                <Table stickyHeader>
                    <TableHead>
                        <TableRow>
                            <TableCell>Month</TableCell>
                            <TableCell>Interest</TableCell>
                            <TableCell>Principal</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            amortization.map( ( month, index ) => (
                                <TableRow>
                                    <TableCell>{ index + 1 }</TableCell>
                                    <TableCell>{ formatter.format( month.interest ) }</TableCell>
                                    <TableCell>{ formatter.format( month.principal ) }</TableCell>
                                </TableRow>
                            ) )
                        }
                    </TableBody>
                </Table>
            </Grid>
        </Grid>
    )
};

export default DetailsTab;
