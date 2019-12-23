import React from 'react';
import Grid from "@material-ui/core/Grid";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import InputAdornment from "@material-ui/core/InputAdornment";
import Select from "@material-ui/core/Select";
import {CITY_DATA} from "../shared/constants";
import MenuItem from "@material-ui/core/MenuItem";
import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/core/Slider";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";

const TheHouseTab = ({ handleChange, handleCityChange, handleSliderChange, handleTypeChange, handleToggleChange, values }) => {
    return (
        <Grid
            container
            justify="space-between"
            alignItems="flex-start"
            spacing={3}
        >
            <Grid item xs={12}>
                <FormControl fullWidth>
                    <InputLabel htmlFor="city">City</InputLabel>
                    <Select
                        value={values.city}
                        onChange={handleCityChange()}
                        inputProps={{
                            name: 'city',
                            id: 'city',
                        }}
                    >
                        {Object.keys(CITY_DATA)
                            .map(key => <MenuItem key value={key}>{CITY_DATA[key].properName}</MenuItem>)
                        }
                    </Select>
                </FormControl>
            </Grid>

            <Grid item xs={12}>
                <FormControl fullWidth>
                    <InputLabel htmlFor="type">Type of Rental</InputLabel>
                    <Select
                        value={values.typeOfRental}
                        onChange={handleTypeChange()}
                        inputProps={{
                            name: 'typeOfRental',
                            id: 'type',
                        }}
                    >
                        <MenuItem value='rental'>Simple Rental</MenuItem>
                        <MenuItem value='house-hack'>House Hack</MenuItem>
                    </Select>
                </FormControl>
            </Grid>

            <Grid container item xs={12}>
                <FormControl fullWidth>
                    <Typography id="input-slider" gutterBottom align="left">
                        Price
                    </Typography>

                    <Grid container spacing={2}>
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
                                startAdornment={<InputAdornment position="start">$</InputAdornment>}
                            />
                        </Grid>
                    </Grid>
                </FormControl>
            </Grid>

            <Grid item xs={12}>
                <FormControl fullWidth>
                    <InputLabel htmlFor="adornment-amount">Repair Costs</InputLabel>
                    <Input
                        id="adornment-amount"
                        value={values.repairCosts}
                        onChange={handleChange('repairCosts')}
                        startAdornment={<InputAdornment position="start">$</InputAdornment>}
                    />
                </FormControl>
            </Grid>

            <Grid item xs={12}>
                <FormControl fullWidth>
                    <InputLabel htmlFor="adornment-amount">Monthly Rent</InputLabel>
                    <Input
                        id="adornment-amount"
                        value={values.monthlyRent}
                        onChange={handleChange('monthlyRent')}
                        startAdornment={<InputAdornment position="start">$</InputAdornment>}
                    />
                </FormControl>
            </Grid>

            <Grid item xs={5} sm={6}>
                <FormControl fullWidth>
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
                <FormControl fullWidth>
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
                <FormControl fullWidth>
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
                                inputProps={{'aria-label': 'primary checkbox'}}
                            />
                        }
                        label="PMI"
                    />
                </FormControl>
            </Grid>
        </Grid>
    )
};

export default TheHouseTab;
