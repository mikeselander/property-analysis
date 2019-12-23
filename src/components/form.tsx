import React, {ReactChildren} from 'react';

import AppBar from '@material-ui/core/AppBar';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography'

import OngoingCostsTab from './ongoing-costs-tab';
import TheHouseTab from './the-house-tab';

import { CITY_DATA, LOAN_TYPE_CONFIG } from "../shared/constants";
import { ApplicationData } from './App';

function TabPanel(props: { children: ReactChildren | JSX.Element, value: any, index: number }) {
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

function a11yProps(index: number) {
    return {
        id: `scrollable-auto-tab-${index}`,
        'aria-controls': `scrollable-auto-tabpanel-${index}`,
    };
}

const InputForm = ({copyValues, allValues: values}: {copyValues: (values: object) => void, allValues: ApplicationData }) => {
    const handleChange = ( prop: string ) => ( event: Event ): void => {
        if ( ! event?.target?.value ) {
            return;
        }

        copyValues({...values, [prop]: event.target.value});
    };

    const handleSliderChange = ( prop: string ) => (event: Event, newValue): void => {
        copyValues({...values, [prop]: newValue});
    };

    const handleToggleChange = ( prop: string ) => ( event: Event ): void => {
        if ( ! event?.target?.checked ) {
            return;
        }

        copyValues({...values, [prop]: event.target.checked});
    };

    const handleCityChange = () => ( event: Event ): void => {
        if ( ! event?.target?.value ) {
            return;
        }

        const city = event.target.value;

        copyValues(
            {
                ...values,
                'city': city,
                ...CITY_DATA[city],
            }
        );
    };

    const handleTypeChange = () => ( event: Event ): void => {
        if ( ! event?.target?.value ) {
            return;
        }

        const type = event.target.value;

        copyValues(
            {
                ...values,
                'typeOfRental': type,
                ...LOAN_TYPE_CONFIG[type],
            }
        );
    };

    const [value, setValue] = React.useState(0);

    const handleTabChange = (event: Event, newValue: string): void => {
        setValue(newValue);
    };

    return (
        <>
            <AppBar position="static" color="default">
                <Tabs
                    value={value}
                    // @ts-ignore
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