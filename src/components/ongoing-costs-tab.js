import React from 'react';
import Grid from "@material-ui/core/Grid";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import InputAdornment from "@material-ui/core/InputAdornment";

const OngoingCostsTab = ({ handleChange, values }) => {
    return (
        <Grid
            container
            justify="space-between"
            alignItems="flex-start"
            spacing={3}
        >
            <Grid item xs={5} sm={6}>
                <FormControl>
                    <InputLabel htmlFor="adornment-amount">Vacancy Rate</InputLabel>
                    <Input
                        id="adornment-vacancy"
                        value={values.vacancy}
                        onChange={handleChange('vacancy')}
                        endAdornment={<InputAdornment position="end">%</InputAdornment>}
                        variant="filled"
                    />
                </FormControl>
            </Grid>

            <Grid item xs={5} sm={6}>
                <FormControl>
                    <InputLabel htmlFor="adornment-amount">Maintenance</InputLabel>
                    <Input
                        id="adornment-maintenance"
                        value={values.maintenance}
                        onChange={handleChange('maintenance')}
                        endAdornment={<InputAdornment position="end">%</InputAdornment>}
                        variant="filled"
                    />
                </FormControl>
            </Grid>

            <Grid item xs={5} sm={6}>
                <FormControl>
                    <InputLabel htmlFor="adornment-amount">CapEx</InputLabel>
                    <Input
                        id="adornment-capEx"
                        value={values.capEx}
                        onChange={handleChange('capEx')}
                        endAdornment={<InputAdornment position="end">%</InputAdornment>}
                        variant="filled"
                    />
                </FormControl>
            </Grid>

            <Grid item xs={5} sm={6}>
                <FormControl>
                    <InputLabel htmlFor="adornment-amount">Management</InputLabel>
                    <Input
                        id="adornment-management"
                        value={values.management}
                        onChange={handleChange('management')}
                        endAdornment={<InputAdornment position="end">%</InputAdornment>}
                        variant="filled"
                    />
                </FormControl>
            </Grid>

            <Grid item xs={5} sm={6}>
                <FormControl>
                    <InputLabel htmlFor="adornment-amount">Monthly Insurance</InputLabel>
                    <Input
                        id="adornment-insuranceCost"
                        value={values.insuranceCost}
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
