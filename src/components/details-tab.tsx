import React from 'react';
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import { getAmortizationTable } from '../shared/calculations';

import { INITIAL_STATE } from '../shared/constants';

import { ApplicationData } from './App';
import Typography from "@material-ui/core/Typography";

const DetailsTab = ({ values, copyValues }: { values: ApplicationData, copyValues: ( state: object ) => void }) => {
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
                <Button variant="contained" color="secondary" onClick={ () => copyValues( INITIAL_STATE ) }>
                    Reset to Default
                </Button>
            </Grid>

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
