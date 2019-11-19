import React from 'react';
import './App.css';

import InputForm from './form';
import Results from './results';
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import {Typography} from "@material-ui/core";

class App extends React.Component {

    constructor(props) {
        super( props );

        this.state = {
            capEx: 5,
            city: '',
            closingCosts: 3000,
            insuranceCost: 50,
            interestRate: 4.5,
            maintenance: 5,
            management: 11,
            monthlyRent: 0,
            percentDown: 20,
            pmi: false,
            price: 100000,
            repairCosts: 0,
            taxRate: 0.567,
            typeOfRental: 'rental',
            vacancy: 5,
        };
    }

    copyValues( values ) {
        this.setState( values );
        this.setState();
    }

    render() {
        console.table( this.state );

        return (
            <div className="App">
                <Container maxWidth="md">
                    <header>
                        <Typography variant="h1" component="h1" color="action">
                            Property Analysis
                        </Typography>
                    </header>

                    <Grid
                        container
                        alignItems="flex-start"
                        justify="space-between"
                    >

                        <InputForm allValues={ this.state } copyValues={ state => this.copyValues( state ) }  />
                        <Results allValues={ this.state } />
                    </Grid>
                </Container>
            </div>
        );
    }
}

export default App;
