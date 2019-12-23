import React from 'react';
import Grid from "@material-ui/core/Grid";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import InputAdornment from "@material-ui/core/InputAdornment";

import { ApplicationData } from './App';

interface HouseTabProps {
    handleChange: (value: any) => void;
    values: ApplicationData;
}

const OngoingCostsTab = ({ handleChange, values }: HouseTabProps) => {
    return (
        <Grid
            container
            justify="space-between"
            alignItems="flex-start"
            spacing={3}
        >
            <Grid item xs={5} sm={6}>
                <FormControl>
                    <InputLabel htmlFor="adornment-vacancy">Vacancy Rate</InputLabel>
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
                    <InputLabel htmlFor="adornment-maintenance">Maintenance</InputLabel>
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
                    <InputLabel htmlFor="adornment-capEx">CapEx</InputLabel>
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
                    <InputLabel htmlFor="adornment-management">Management</InputLabel>
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
