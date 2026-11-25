import { Pressable, Text, View, StyleSheet } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { tokens } from "../theme/tokens.js";

const { color, space, radius, shadow } = tokens;

export function PaginationBar({
	page,
	totalPages,
	totalItems,
	rangeStart,
	rangeEnd,
	onPrev,
	onNext,
}) {
	if (!totalItems) {
		return null;
	}

	const atStart = page <= 1;
	const atEnd = page >= totalPages;

	return (
		<View style={styles.bar}>
			<Pressable
				onPress={onPrev}
				disabled={atStart}
				accessibilityRole="button"
				accessibilityLabel="Sebelumnya"
				accessibilityState={{ disabled: atStart }}
				hitSlop={6}
				style={({ pressed }) => [
					styles.button,
					atStart && styles.buttonDisabled,
					pressed && !atStart && styles.pressed,
				]}
			>
				<Ionicons
					name="chevron-back"
					size={18}
					color={atStart ? color.text3 : color.primary}
				/>
				<Text style={[styles.buttonText, atStart && styles.buttonTextDisabled]}>
					Sebelumnya
				</Text>
			</Pressable>

			<View
				style={styles.indicator}
				accessible
				accessibilityLabel={`Halaman ${page} dari ${totalPages}. Data ${rangeStart} sampai ${rangeEnd} dari ${totalItems}.`}
			>
				<Text style={styles.pageText}>
					Halaman {page} dari {totalPages}
				</Text>
				<Text style={styles.rangeText}>
					{rangeStart}–{rangeEnd} dari {totalItems} data
				</Text>
			</View>

			<Pressable
				onPress={onNext}
				disabled={atEnd}
				accessibilityRole="button"
				accessibilityLabel="Berikutnya"
				accessibilityState={{ disabled: atEnd }}
				hitSlop={6}
				style={({ pressed }) => [
					styles.button,
					atEnd && styles.buttonDisabled,
					pressed && !atEnd && styles.pressed,
				]}
			>
				<Text style={[styles.buttonText, atEnd && styles.buttonTextDisabled]}>
					Berikutnya
				</Text>
				<Ionicons
					name="chevron-forward"
					size={18}
					color={atEnd ? color.text3 : color.primary}
				/>
			</Pressable>
		</View>
	);
}

const styles = StyleSheet.create({
	bar: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		gap: space.sm,
		backgroundColor: color.surface,
		borderRadius: radius.card,
		borderCurve: "continuous",
		borderWidth: 1,
		borderColor: color.border,
		paddingVertical: 8,
		paddingHorizontal: 6,
		boxShadow: shadow.card,
	},
	button: {
		flexDirection: "row",
		alignItems: "center",
		gap: 2,
		minHeight: 40,
		paddingHorizontal: 8,
	},
	buttonDisabled: {
		opacity: 0.55,
	},
	pressed: {
		opacity: 0.85,
		transform: [{ scale: 0.98 }],
	},
	buttonText: {
		fontSize: 13,
		fontWeight: "600",
		color: color.primary,
	},
	buttonTextDisabled: {
		color: color.text3,
	},
	indicator: {
		flex: 1,
		alignItems: "center",
		gap: 2,
	},
	pageText: {
		fontSize: 13,
		fontWeight: "700",
		color: color.text,
		fontVariant: ["tabular-nums"],
	},
	rangeText: {
		fontSize: 11,
		color: color.text3,
		fontVariant: ["tabular-nums"],
	},
});
