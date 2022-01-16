import React from "react";
import "../App.css";

import InputForm from "./form";
import Results from "./results";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import { ThemeProvider } from "@material-ui/core/styles";
import theme from "../theme";
import useLocalStorage from "../shared/use-local-storage";

import { INITIAL_STATE } from "../shared/constants";

export interface ApplicationData {
	capEx: number;
	city: string;
	closingCosts: number;
	hoa: number;
	insuranceCost: number;
	interestRate: number;
	maintenance: number;
	management: number;
	monthlyRent: number;
	percentDown: number;
	pmi: boolean;
	price: number | string;
	repairCosts: number;
	taxRate: number;
	typeOfRental: string;
	vacancy: number;
}

/**
 * @todo::
 *
 * Add address lookup
 * Add automatic Rentometer link
 * Add ability to save results to localStorage
 */

const App = () => {
	const [state, copyValues] = useLocalStorage("prop-data", INITIAL_STATE);

	return (
		<div className="App">
			<ThemeProvider theme={theme}>
				<Container maxWidth="md">
					<Grid container alignItems="flex-start" justify="space-between">
						<InputForm
							allValues={state}
							copyValues={(state: object) => copyValues(state)}
						/>
						<Results allValues={state} />
					</Grid>
				</Container>
			</ThemeProvider>
		</div>
	);
};

export default App;
