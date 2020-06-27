import React from 'react';
import Grid from "@material-ui/core/Grid";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import InputAdornment from "@material-ui/core/InputAdornment";

import { ApplicationData } from './App';
import { convertPercentInteger } from "../shared/calculations";

interface HouseTabProps {
    handleChange: (value: any) => void;
    values: ApplicationData;
}

const OngoingCostsTab = ({ handleChange, values }: HouseTabProps) => {
    const calculateAmount = ( value: string|number ) => convertPercentInteger( Number( value ) ) * values.monthlyRent;

    return (
        <Grid
            container
            justify="space-between"
            alignItems="flex-start"
            spacing={3}
        >
            <Grid item xs={5} sm={6}>
                <FormControl>
                    <InputLabel htmlFor="adornment-vacancy">Vacancy Rate (${ calculateAmount( values.vacancy ) })</InputLabel>
                    <Input
                        id="adornment-vacancy"
                        value={values.vacancy}
                        // @ts-ignore
                        onChange={handleChange('vacancy')}
                        endAdornment={<InputAdornment position="end">%</InputAdornment>}
                        variant="filled"
                    />
                </FormControl>
            </Grid>

            <Grid item xs={5} sm={6}>
                <FormControl>
                    <InputLabel htmlFor="adornment-maintenance">Maintenance (${ calculateAmount( values.maintenance ) })</InputLabel>
                    <Input
                        id="adornment-maintenance"
                        value={values.maintenance}
                        // @ts-ignore
                        onChange={handleChange('maintenance')}
                        endAdornment={<InputAdornment position="end">%</InputAdornment>}
                        variant="filled"
                    />
                </FormControl>
            </Grid>

            <Grid item xs={5} sm={6}>
                <FormControl>
                    <InputLabel htmlFor="adornment-capEx">CapEx (${ calculateAmount( values.capEx ) })</InputLabel>
                    <Input
                        id="adornment-capEx"
                        value={values.capEx}
                        // @ts-ignore
                        onChange={handleChange('capEx')}
                        endAdornment={<InputAdornment position="end">%</InputAdornment>}
                        variant="filled"
                    />
                </FormControl>
            </Grid>

            <Grid item xs={5} sm={6}>
                <FormControl>
                    <InputLabel htmlFor="adornment-management">Management (${ calculateAmount( values.management ) })</InputLabel>
                    <Input
                        id="adornment-management"
                        value={values.management}
                        // @ts-ignore
                        onChange={handleChange('management')}
                        endAdornment={<InputAdornment position="end">%</InputAdornment>}
                        variant="filled"
                    />
                </FormControl>
            </Grid>

            <Grid item xs={5} sm={6}>
                <FormControl>
                    <InputLabel htmlFor="adornment-insuranceCost">Monthly Insurance</InputLabel>
                    <Input
                        id="adornment-insuranceCost"
                        value={values.insuranceCost}
                        // @ts-ignore
                        onChange={handleChange('insuranceCost')}
                        startAdornment={<InputAdornment position="start">$</InputAdornment>}
                        variant="filled"
                    />
                </FormControl>
            </Grid>

            <Grid item xs={5} sm={6}>
                <FormControl>
                    <InputLabel htmlFor="adornment-hoa">HOA</InputLabel>
                    <Input
                        id="adornment-hoa"
                        value={values.hoa}
                        // @ts-ignore
                        onChange={handleChange('hoa')}
                        startAdornment={<InputAdornment position="start">$</InputAdornment>}
                        variant="filled"
                    />
                </FormControl>
            </Grid>
        </Grid>
    )
};

export default OngoingCostsTab;
