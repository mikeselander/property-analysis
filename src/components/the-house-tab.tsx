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

import { ApplicationData } from './App';

interface HouseTabProps {
    handleChange: (name: string) => void;
    handleCityChange: () => void;
    handleSliderChange: (name: string) => void;
    handleTypeChange: () => void;
    handleToggleChange: (name: string) => void;
    values: ApplicationData;
}

const TheHouseTab = ({ handleChange, handleCityChange, handleSliderChange, handleTypeChange, handleToggleChange, values }: HouseTabProps) => {
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
                        // @ts-ignore
                        onChange={handleCityChange()}
                        inputProps={{
                            name: 'city',
                            id: 'city',
                        }}
                    >
                        {Object.keys(CITY_DATA)
                            .map(key => <MenuItem
                                    key={key}
                                    value={key}
                                >
                                        {CITY_DATA[key].properName}
                                </MenuItem>
                            )
                        }
                    </Select>
                </FormControl>
            </Grid>

            <Grid item xs={12}>
                <FormControl fullWidth>
                    <InputLabel htmlFor="type">Type of Financing</InputLabel>
                    <Select
                        value={values.typeOfRental}
                        // @ts-ignore
                        onChange={handleTypeChange()}
                        inputProps={{
                            name: 'typeOfRental',
                            id: 'type',
                        }}
                    >
                        <MenuItem value='rental'>20% Down Mortgage</MenuItem>
                        <MenuItem value='house-hack'>House Hack (5% down + PMI)</MenuItem>
                        <MenuItem value='cash'>All Cash</MenuItem>
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
                                // @ts-ignore
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
                                // @ts-ignore
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
                    <InputLabel htmlFor="adornment-repairCosts">Repair Costs</InputLabel>
                    <Input
                        id="adornment-repairCosts"
                        value={values.repairCosts}
                        // @ts-ignore
                        onChange={handleChange('repairCosts')}
                        startAdornment={<InputAdornment position="start">$</InputAdornment>}
                    />
                </FormControl>
            </Grid>

            <Grid item xs={12}>
                <FormControl fullWidth>
                    <InputLabel htmlFor="adornment-rent">Total Monthly Rent</InputLabel>
                    <Input
                        id="adornment-rent"
                        value={values.monthlyRent}
                        // @ts-ignore
                        onChange={handleChange('monthlyRent')}
                        startAdornment={<InputAdornment position="start">$</InputAdornment>}
                    />
                </FormControl>
            </Grid>

            <Grid item xs={5} sm={6}>
                <FormControl fullWidth>
                    <InputLabel htmlFor="adornment-interestRate">Interest Rate</InputLabel>
                    <Input
                        id="adornment-interestRate"
                        value={values.interestRate}
                        // @ts-ignore
                        onChange={handleChange('interestRate')}
                        endAdornment={<InputAdornment position="end">%</InputAdornment>}
                    />
                </FormControl>
            </Grid>

            <Grid item xs={5} sm={6}>
                <FormControl fullWidth>
                    <InputLabel htmlFor="adornment-closingcosts">Closing Costs</InputLabel>
                    <Input
                        id="adornment-closingcosts"
                        value={values.closingCosts}
                        // @ts-ignore
                        onChange={handleChange('closingCosts')}
                        startAdornment={<InputAdornment position="start">$</InputAdornment>}
                    />
                </FormControl>
            </Grid>

            <Grid item xs={5} sm={6}>
                <FormControl fullWidth>
                    <InputLabel htmlFor="adornment-percentDown">Percent Down</InputLabel>
                    <Input
                        id="adornment-percentDown"
                        value={values.percentDown}
                        // @ts-ignore
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
                                // @ts-ignore
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
