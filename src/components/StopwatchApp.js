import React, { Component } from "react";
import {
	StyleSheet,
	Text,
	View,
	TouchableOpacity,
	ScrollView,
} from "react-native";

class StopwatchApp extends Component {
	constructor(props) {
		super(props);
		this.state = {
			timer: null,
			milliseconds: 0,
			running: false,
			laps: [],
		};
	}

	startTimer() {
		const startTime = Date.now() - this.state.milliseconds;
		let timer = setInterval(() => {
			const currentTime = Date.now();
			const elapsedMilliseconds = currentTime - startTime;
			this.setState({
				milliseconds: elapsedMilliseconds,
				running: true,
			});
		}, 10);
		this.setState({ timer });
	}

	stopTimer() {
		clearInterval(this.state.timer);
		this.setState({ running: false });
	}

	resetTimer() {
		this.stopTimer();
		this.setState({ milliseconds: 0, laps: [] });
	}

	lap() {
		const { milliseconds, laps } = this.state;
		const formattedTime = this.formatMilliseconds();
		const newLap = `Lap ${laps.length + 1}: ${formattedTime}`;
		this.setState((prevState) => ({
			laps: [newLap, ...prevState.laps],
		}));
	}

	formatMilliseconds() {
		const { milliseconds } = this.state;
		let minutes = Math.floor((milliseconds / 60000) % 60);
		let seconds = Math.floor((milliseconds / 1000) % 60);
		let ms = Math.floor((milliseconds % 1000) / 10);

		minutes = minutes < 10 ? `0${minutes}` : minutes;
		seconds = seconds < 10 ? `0${seconds}` : seconds;
		ms = ms < 10 ? `0${ms}` : ms;

		return `${minutes}:${seconds}.${ms}`;
	}

	render() {
		const { milliseconds, running, laps } = this.state;
		return (
			<View style={styles.container}>
				<View style={styles.timerContainer}>
					<Text style={[styles.timer, { color: "#ffffff" }]}>
						{this.formatMilliseconds()}
					</Text>
				</View>
				<View style={styles.buttonContainer}>
					{running ? (
						<>
							<TouchableOpacity
								style={[styles.button, styles.resetButton]}
								onPress={() => this.lap()}
							>
								<Text style={[styles.buttonText, styles.lapText]}>Lap</Text>
							</TouchableOpacity>
							<TouchableOpacity
								style={[styles.button, styles.stopButton]}
								onPress={() => this.stopTimer()}
							>
								<Text style={styles.buttonText}>Stop</Text>
							</TouchableOpacity>
						</>
					) : (
						<>
							<TouchableOpacity
								style={[styles.button, styles.resetButton]}
								onPress={() => this.resetTimer()}
							>
								<Text style={[styles.buttonText, styles.resetButton]}>
									Reset
								</Text>
							</TouchableOpacity>
							<TouchableOpacity
								style={[styles.button, styles.startButton]}
								onPress={() => this.startTimer()}
							>
								<Text style={[styles.buttonText, styles.startButton]}>
									Start
								</Text>
							</TouchableOpacity>
						</>
					)}
				</View>
				<ScrollView style={styles.lapContainer}>
					{laps.map((lap, index) => (
						<Text key={index} style={styles.lapText}>
							{lap}
						</Text>
					))}
				</ScrollView>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		// justifyContent: "center",
		// alignItems: "center",
		backgroundColor: "#000000",
	},
	timerContainer: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		marginTop: "10%",
	},
	timer: {
		fontSize: 48,
		fontWeight: "bold",
	},
	buttonContainer: {
		flex: 1,
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
		// backgroundColor: "red",
		marginTop: "10%",
	},
	button: {
		justifyContent: "center",
		alignItems: "center",
		width: 100,
		height: 100,
		borderRadius: 50,
		marginHorizontal: 10,
	},
	buttonText: {
		fontSize: 18,
	},
	startButton: {
		backgroundColor: "#396330",
		color: "#5fe643",
	},
	stopButton: {
		backgroundColor: "#B53737",
		color: "#ffffff",
	},
	resetButton: {
		backgroundColor: "#424242",
		color: "#ffffff",
	},
	lapContainer: {
		flex: 1,
		width: "100%",
	},
	lapText: {
		fontSize: 18,
		color: "#ffffff",
		paddingHorizontal: 20,
		paddingVertical: 10,
		borderBottomWidth: 1,
		borderBottomColor: "#ffffff",
	},
});

export default StopwatchApp;
