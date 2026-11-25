import { useEffect, useRef } from "react";
import { StyleSheet, Text, View } from "react-native";
import Animated, {
	Easing,
	runOnJS,
	useAnimatedStyle,
	useReducedMotion,
	useSharedValue,
	withDelay,
	withRepeat,
	withSequence,
	withTiming,
} from "react-native-reanimated";
import Ionicons from "@expo/vector-icons/Ionicons";
import { tokens } from "../theme/tokens.js";

const { color, radius, shadow, space } = tokens;

const BADGE = 132;
const TRACK_WIDTH = 168;
const HOLD_MS = 1700;

export function SplashScreen({ onFinish }) {
	const reduceMotion = useReducedMotion();
	const finishRef = useRef(onFinish);
	finishRef.current = onFinish;

	const fade = useSharedValue(reduceMotion ? 1 : 0);
	const pop = useSharedValue(reduceMotion ? 1 : 0.86);
	const pulse = useSharedValue(1);
	const progress = useSharedValue(0);

	useEffect(() => {
		const handleDone = () => finishRef.current?.();

		if (reduceMotion) {
			const timer = setTimeout(handleDone, 800);
			return () => clearTimeout(timer);
		}

		fade.set(withTiming(1, { duration: 360, easing: Easing.out(Easing.quad) }));
		pop.set(
			withTiming(1, { duration: 620, easing: Easing.out(Easing.back(1.4)) }),
		);
		pulse.set(
			withDelay(
				320,
				withRepeat(
					withSequence(
						withTiming(1.55, {
							duration: 900,
							easing: Easing.out(Easing.quad),
						}),
						withTiming(1, { duration: 0 }),
					),
					-1,
					false,
				),
			),
		);
		progress.set(
			withTiming(
				1,
				{ duration: HOLD_MS, easing: Easing.inOut(Easing.cubic) },
				(finished) => {
					if (!finished) return;
					fade.set(
						withTiming(
							0,
							{ duration: 320, easing: Easing.in(Easing.quad) },
							(done) => {
								if (done) runOnJS(handleDone)();
							},
						),
					);
				},
			),
		);

		return undefined;
	}, [fade, pop, progress, pulse, reduceMotion]);

	const containerStyle = useAnimatedStyle(() => ({ opacity: fade.value }));
	const badgeStyle = useAnimatedStyle(() => ({
		transform: [{ scale: pop.value }],
	}));
	const pulseStyle = useAnimatedStyle(() => ({
		transform: [{ scale: pulse.value }],
		opacity: 0.45 * (1 - (pulse.value - 1) / 0.55),
	}));
	const fillStyle = useAnimatedStyle(() => ({
		width: TRACK_WIDTH * progress.value,
	}));

	return (
		<Animated.View style={[styles.root, containerStyle]}>
			<View style={styles.center}>
				<View style={styles.badgeStage}>
					<Animated.View style={[styles.pulseRing, pulseStyle]} />
					<Animated.View style={[styles.badge, badgeStyle]}>
						<Ionicons name="thermometer-outline" size={56} color={color.primary} />
					</Animated.View>
				</View>

				<View style={styles.copy}>
					<Text style={styles.title} accessibilityRole="header">
						LiveTemp
					</Text>
					<Text style={styles.subtitle}>Pemantauan suhu real-time</Text>
				</View>

				<View
					style={styles.track}
					accessible
					accessibilityLabel="Memuat aplikasi LiveTemp"
				>
					<Animated.View style={[styles.fill, fillStyle]} />
				</View>
			</View>

			<Text style={styles.footer}>Kelompok 18 · Shift 3</Text>
		</Animated.View>
	);
}

const styles = StyleSheet.create({
	root: {
		flex: 1,
		width: "100%",
		backgroundColor: color.bg,
		alignItems: "center",
		justifyContent: "space-between",
		paddingVertical: 88,
	},
	center: {
		flex: 1,
		width: "100%",
		alignItems: "center",
		justifyContent: "center",
		gap: space.xl,
	},
	badgeStage: {
		width: BADGE,
		height: BADGE,
		alignItems: "center",
		justifyContent: "center",
	},
	pulseRing: {
		position: "absolute",
		width: BADGE,
		height: BADGE,
		borderRadius: BADGE / 2,
		borderWidth: 2,
		borderColor: color.primary,
	},
	badge: {
		width: BADGE,
		height: BADGE,
		borderRadius: BADGE / 2,
		borderCurve: "continuous",
		backgroundColor: color.surface,
		borderWidth: 1,
		borderColor: color.border,
		alignItems: "center",
		justifyContent: "center",
		boxShadow: shadow.card,
	},
	copy: {
		alignItems: "center",
		gap: 6,
	},
	title: {
		fontFamily: "monospace",
		fontSize: 30,
		fontWeight: "800",
		letterSpacing: -1.2,
		color: color.text,
	},
	subtitle: {
		fontSize: 14,
		color: color.text2,
	},
	track: {
		width: TRACK_WIDTH,
		height: 4,
		borderRadius: radius.pill,
		borderCurve: "continuous",
		backgroundColor: color.surface2,
		overflow: "hidden",
	},
	fill: {
		height: 4,
		borderRadius: radius.pill,
		backgroundColor: color.primary,
	},
	footer: {
		fontSize: 12,
		letterSpacing: 0.4,
		color: color.text3,
	},
});
