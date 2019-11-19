import React from 'react';

import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Grid from '@material-ui/core/Grid';
import Input from '@material-ui/core/Input'
import InputAdornment from '@material-ui/core/InputAdornment';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Slider from '@material-ui/core/Slider';
import Switch from '@material-ui/core/Switch';
import Typography from '@material-ui/core/Typography'

const InputForm = ( { copyValues, allValues: values } ) => {
    /**
     * Hold configuration of certain auto-filled values that we can fill in.
     *
     * @type {Object}
     */
    const cityConfig = {
        'foco': {
            taxRate: 0.567,
            vacancy: 4.64,
        },
        'loveland': {
            taxRate: 0.567,
            vacancy: 5,
        },
        'wellington': {
            taxRate: 0.567,
            vacancy: 7,
        },
    };

    /**
     * Hold configuration of certain auto-filled values that we can fill in.
     *
     * @type {Object}
     */
    const typeConfig = {
        'rental': {
            percentDown: 20,
            pmi: false,
        },
        'house-hack': {
            percentDown: 5,
            pmi: true,
        },
    };

    const handleChange = prop => event => {
        copyValues({ ...values, [prop]: event.target.value });
    };

    const handleSliderChange = prop => (event, newValue) => {
        copyValues({ ...values, [prop]: newValue });
    };

    const handleToggleChange = prop => event => {
        copyValues({ ...values, [prop]: event.target.checked });
    };

    const handleCityChange = () => event => {
        const city = event.target.value;

        copyValues(
            {
                ...values,
                'city': city,
                ...cityConfig[ city ],
            }
        );
    };

    const handleTypeChange = () => event => {
        const type = event.target.value;

        copyValues(
            {
                ...values,
                'typeOfRental': type,
                ...typeConfig[ type ],
            }
        );
    };

    return (
        <Grid
            container
            justify="space-between"
            alignItems="flex-start"
            spacing={2}
            xs={12} sm={8}
        >
            <Grid item xs={12} sm={12}>
                <Typography variant="h4" component="h2" gutterBottom align="left" color="textSecondary">
                    The House
                </Typography>
            </Grid>

            <Grid item xs={12} sm={12}>
                <FormControl fullWidth>
                    <InputLabel htmlFor="city">City</InputLabel>
                    <Select
                        value={values.city}
                        onChange={handleCityChange()}
                        inputProps={{
                            name: 'city',
                            id: 'city',
                        }}
                        variant="outlined"
                    >
                        <MenuItem value='foco'>Fort Collins</MenuItem>
                        <MenuItem value='loveland'>Loveland</MenuItem>
                        <MenuItem value='wellington'>Wellington</MenuItem>
                    </Select>
                </FormControl>
            </Grid>

            <Grid item xs={12} sm={12}>
                <FormControl fullWidth >
                    <Typography id="input-slider" gutterBottom align="left">
                        Price
                    </Typography>

                    <Grid container fullWidth spacing={2}>
                        <Grid item md>
                        <Slider
                            onChange={handleSliderChange('price')}
                            value={typeof values.price === 'number' ? values.price : 100000}
                            aria-labelledby="input-slider"
                            name='price'
                            step={1000}
                            min={10000}
                            max={1000000}
                        />
                        </Grid>

                        <Grid item>
                            <Input
                                value={values.price}
                                margin="dense"
                                onChange={handleChange('price')}
                                inputProps={{
                                    step: 1000,
                                    min: 10000,
                                    max: 1000000,
                                    type: 'number',
                                    'aria-labelledby': 'input-slider',
                                }}
                                variant="outlined"
                                startAdornment={<InputAdornment position="start">$</InputAdornment>}
                            />
                        </Grid>
                    </Grid>
                </FormControl>

                {/*<Grid item xs={12} sm={12}>*/}
                {/*    <FormControl fullWidth>*/}
                {/*        <InputLabel htmlFor="adornment-amount">Repair Costs</InputLabel>*/}
                {/*        <Input*/}
                {/*            id="adornment-amount"*/}
                {/*            value={values.repairCosts}*/}
                {/*            onChange={handleChange('repairCosts')}*/}
                {/*            startAdornment={<InputAdornment position="start">$</InputAdornment>}*/}
                {/*        />*/}
                {/*    </FormControl>*/}
                {/*</Grid>*/}

                <Grid item xs={12} sm={12}>
                    <FormControl fullWidth>
                        <InputLabel htmlFor="adornment-amount">Monthly Rent</InputLabel>
                        <Input
                            id="adornment-amount"
                            value={values.monthlyRent}
                            onChange={handleChange('monthlyRent')}
                            startAdornment={<InputAdornment position="start">$</InputAdornment>}
                            variant="outlined"
                        />
                    </FormControl>
                </Grid>
            </Grid>

            <Grid item xs={12} sm={12}>
                <Typography variant="h4" component="h2" gutterBottom align="left" color="textSecondary">
                    The Loan
                </Typography>
            </Grid>

            <Grid item xs={12} sm={12}>
                <FormControl fullWidth>
                    <InputLabel htmlFor="type">Type of Rental</InputLabel>
                    <Select
                        value={values.typeOfRental}
                        onChange={handleTypeChange()}
                        inputProps={{
                            name: 'typeOfRental',
                            id: 'type',
                        }}
                        variant="outlined"
                    >
                        <MenuItem value='rental'>Simple Rental</MenuItem>
                        <MenuItem value='house-hack'>House Hack</MenuItem>
                    </Select>
                </FormControl>
            </Grid>

            <Grid item xs={5} sm={6}>
                <FormControl>
                    <InputLabel htmlFor="adornment-amount">Interest Rate</InputLabel>
                    <Input
                        id="adornment-amount"
                        value={values.interestRate}
                        onChange={handleChange('interestRate')}
                        endAdornment={<InputAdornment position="end">%</InputAdornment>}
                    />
                </FormControl>
            </Grid>

            <Grid item xs={5} sm={6}>
                <FormControl>
                    <InputLabel htmlFor="adornment-amount">Closing Costs</InputLabel>
                    <Input
                        id="adornment-amount"
                        value={values.closingCosts}
                        onChange={handleChange('closingCosts')}
                        startAdornment={<InputAdornment position="start">$</InputAdornment>}
                    />
                </FormControl>
            </Grid>

            <Grid item xs={5} sm={6}>
                <FormControl>
                    <InputLabel htmlFor="adornment-amount">Percent Down</InputLabel>
                    <Input
                        id="adornment-amount"
                        value={values.percentDown}
                        onChange={handleChange('percentDown')}
                        endAdornment={<InputAdornment position="end">%</InputAdornment>}
                    />
                </FormControl>
            </Grid>

            <Grid item xs={5} sm={6}>
                <FormControl>
                    <FormControlLabel
                        control={
                            <Switch
                                checked={values.pmi}
                                onChange={handleToggleChange('pmi')}
                                value="pmi"
                                color="primary"
                                inputProps={{ 'aria-label': 'primary checkbox' }}
                            />
                        }
                        label="PMI"
                    />
                </FormControl>
            </Grid>

            <Grid item xs={12} sm={12}>
                <Typography variant="h4" component="h2" gutterBottom align="left" color="textSecondary">
                    Ongoing Costs
                </Typography>
            </Grid>

            <Grid item xs={5} sm={4}>
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

            <Grid item xs={5} sm={4}>
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

            <Grid item xs={5} sm={4}>
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

            <Grid item xs={5} sm={4}>
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

            <Grid item xs={5} sm={4}>
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
        </Grid>
    )
};

export default InputForm;