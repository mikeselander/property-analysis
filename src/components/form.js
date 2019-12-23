import React from 'react';

import AppBar from '@material-ui/core/AppBar';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography'

import OngoingCostsTab from './ongoing-costs-tab';
import TheHouseTab from './the-house-tab';

import {CITY_DATA} from "../shared/constants";

function TabPanel(props) {
    const {children, value, index, ...other} = props;

    return (
        <Typography
            component="div"
            role="tabpanel"
            hidden={value !== index}
            id={`scrollable-auto-tabpanel-${index}`}
            aria-labelledby={`scrollable-auto-tab-${index}`}
            {...other}
        >
            {value === index && <Box p={3}>{children}</Box>}
        </Typography>
    );
}

function a11yProps(index) {
    return {
        id: `scrollable-auto-tab-${index}`,
        'aria-controls': `scrollable-auto-tabpanel-${index}`,
    };
}

const InputForm = ({copyValues, allValues: values}) => {
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
        copyValues({...values, [prop]: event.target.value});
    };

    const handleSliderChange = prop => (event, newValue) => {
        copyValues({...values, [prop]: newValue});
    };

    const handleToggleChange = prop => event => {
        copyValues({...values, [prop]: event.target.checked});
    };

    const handleCityChange = () => event => {
        const city = event.target.value;

        copyValues(
            {
                ...values,
                'city': city,
                ...CITY_DATA[city],
            }
        );
    };

    const handleTypeChange = () => event => {
        const type = event.target.value;

        copyValues(
            {
                ...values,
                'typeOfRental': type,
                ...typeConfig[type],
            }
        );
    };

    const [value, setValue] = React.useState(0);

    const handleTabChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <>
            <AppBar position="static" color="default">
                <Tabs
                    value={value}
                    onChange={handleTabChange}
                    indicatorColor="primary"
                    textColor="primary"
                >
                    <Tab label="The Property" {...a11yProps(0)} />
                    <Tab label="Ongoing costs" {...a11yProps(1)} />
                </Tabs>
            </AppBar>

            <Grid
                container
                justify="space-between"
                alignItems="flex-start"
                spacing={2}
                sm={8}
                xs={12}
            >
                <TabPanel value={value} index={0}>
                    <TheHouseTab
                        handleChange={handleChange}
                        handleCityChange={handleCityChange}
                        handleSliderChange={handleSliderChange}
                        handleTypeChange={handleTypeChange}
                        handleToggleChange={handleToggleChange}
                        values={values}
                    />
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <OngoingCostsTab handleChange={handleChange} values={values} />
                </TabPanel>
            </Grid>
        </>
    )
};

export default InputForm;