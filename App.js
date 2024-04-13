import React from "react";
import { StyleSheet, View } from "react-native";
import StopwatchApp from "./src/components/StopwatchApp";

export default function App() {
	return (
		<View style={styles.container}>
			<StopwatchApp />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#000000",
		alignItems: "center",
		justifyContent: "center",
	},
});
