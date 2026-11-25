import { Linking, Pressable, ScrollView, Text, View, StyleSheet } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { tokens } from "../theme/tokens.js";

const { color, space, radius, shadow } = tokens;

// Isi dengan URL repository GitHub kelompok setelah repo-nya dibuat.
const REPO_URL = "https://github.com/hafiyyandimas/PraktikumPBB_Mod6_ReactNative";

const MEMBERS = [
	{
		nim: "21120124140130",
		name: "Hafiyyan Dimas Walana",
		initials: "HW",
		tone: "#2563EB",
	},
	{
		nim: "21120124130064",
		name: "Rafi Muhammad Arsyad",
		initials: "RA",
		tone: "#7C3AED",
	},
	{
		nim: "21120120140134",
		name: "Muhammad Dzakwan Fakhriy Habibie",
		initials: "MD",
		tone: "#059669",
	},
	{
		nim: "21120122140152",
		name: "Geihansyah Lisdianov Marjanto",
		initials: "GL",
		tone: "#D97706",
	},
];

const STACK = [
	{ icon: "phone-portrait-outline", label: "React Native + Expo SDK 58" },
	{ icon: "pulse-outline", label: "MQTT melalui HiveMQ WebSocket" },
	{ icon: "server-outline", label: "REST API Node.js + Neon PostgreSQL" },
];

function MemberCard({ member, isFirst }) {
	return (
		<View
			style={[styles.memberCard, isFirst && styles.memberCardFirst]}
			accessible
			accessibilityLabel={`${member.name}, NIM ${member.nim}`}
		>
			<View style={[styles.avatar, { backgroundColor: member.tone }]}>
				<Text style={styles.avatarText}>{member.initials}</Text>
			</View>
			<View style={styles.memberInfo}>
				<Text style={styles.memberName}>{member.name}</Text>
				<Text style={styles.memberNim}>{member.nim}</Text>
			</View>
		</View>
	);
}

export function ProfileScreen() {
	const hasRepo = REPO_URL.length > 0;

	const openRepo = () => {
		if (hasRepo) {
			Linking.openURL(REPO_URL).catch(() => {});
		}
	};

	return (
		<ScrollView
			style={styles.safe}
			contentContainerStyle={styles.container}
			contentInsetAdjustmentBehavior="automatic"
		>
			<View style={styles.heroCard}>
				<Text style={styles.eyebrow}>Kelompok 18</Text>
				<Text style={styles.title} accessibilityRole="header">
					LiveTemp
				</Text>
				<Text style={styles.subtitle}>
					Aplikasi pemantauan suhu secara real-time berbasis MQTT
				</Text>
				<View style={styles.chipRow}>
					<View style={styles.chip}>
						<Text style={styles.chipText}>Shift 3</Text>
					</View>
					<View style={styles.chip}>
						<Text style={styles.chipText}>Modul 6</Text>
					</View>
					<View style={styles.chip}>
						<Text style={styles.chipText}>Pemrograman Perangkat Bergerak</Text>
					</View>
				</View>
			</View>

			<View style={styles.sectionHeader}>
				<Text style={styles.sectionTitle}>Anggota Kelompok</Text>
			</View>
			<View style={styles.memberList}>
				{MEMBERS.map((member, index) => (
					<MemberCard
						key={member.nim}
						member={member}
						isFirst={index === 0}
					/>
				))}
			</View>

			<View style={styles.sectionHeader}>
				<Text style={styles.sectionTitle}>Teknologi Aplikasi</Text>
			</View>
			<View style={styles.stackCard}>
				{STACK.map((item) => (
					<View key={item.label} style={styles.stackRow}>
						<Ionicons name={item.icon} size={18} color={color.text3} />
						<Text style={styles.stackText}>{item.label}</Text>
					</View>
				))}
			</View>

			<Pressable
				onPress={openRepo}
				disabled={!hasRepo}
				accessibilityRole="button"
				accessibilityLabel="Buka repository GitHub kelompok"
				accessibilityState={{ disabled: !hasRepo }}
				style={({ pressed }) => [
					styles.linkCard,
					!hasRepo && styles.linkCardDisabled,
					pressed && hasRepo && styles.pressed,
				]}
			>
				<View style={styles.linkIcon}>
					<Ionicons name="logo-github" size={22} color={color.text} />
				</View>
				<View style={styles.memberInfo}>
					<Text style={styles.linkTitle}>Repository GitHub</Text>
					<Text style={styles.linkSubtitle} numberOfLines={1}>
						{hasRepo ? REPO_URL.replace(/^https?:\/\//, "") : "Belum diisi"}
					</Text>
				</View>
				<Ionicons name="open-outline" size={18} color={color.text3} />
			</Pressable>

			<Text style={styles.footer}>
				Praktikum Pemrograman Perangkat Bergerak · Universitas Diponegoro
			</Text>
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	safe: {
		flex: 1,
		backgroundColor: color.bg,
	},
	container: {
		padding: space.lg,
		paddingBottom: space.xxl,
		gap: space.md,
		backgroundColor: color.bg,
	},
	heroCard: {
		backgroundColor: color.surface,
		padding: space.xl,
		borderRadius: radius.card,
		borderCurve: "continuous",
		borderWidth: 1,
		borderColor: color.border,
		boxShadow: shadow.card,
		gap: space.sm,
	},
	eyebrow: {
		fontSize: 12,
		fontWeight: "600",
		textTransform: "uppercase",
		letterSpacing: 0.8,
		color: color.text3,
	},
	title: {
		fontFamily: "monospace",
		fontSize: 26,
		fontWeight: "800",
		letterSpacing: -1,
		color: color.text,
	},
	subtitle: {
		fontSize: 14,
		lineHeight: 20,
		color: color.text2,
	},
	chipRow: {
		flexDirection: "row",
		flexWrap: "wrap",
		gap: space.sm,
		marginTop: space.sm,
	},
	chip: {
		backgroundColor: color.surface2,
		borderRadius: radius.chip,
		borderCurve: "continuous",
		paddingVertical: 5,
		paddingHorizontal: 10,
	},
	chipText: {
		fontSize: 12,
		fontWeight: "600",
		color: color.text2,
	},
	sectionHeader: {
		marginTop: space.md,
		marginBottom: -space.sm,
	},
	sectionTitle: {
		fontSize: tokens.type.section,
		fontWeight: "700",
		color: color.text,
	},
	memberList: {
		backgroundColor: color.surface,
		borderRadius: radius.card,
		borderCurve: "continuous",
		borderWidth: 1,
		borderColor: color.border,
		overflow: "hidden",
		boxShadow: shadow.card,
	},
	memberCard: {
		flexDirection: "row",
		alignItems: "center",
		gap: space.md,
		paddingVertical: 14,
		paddingHorizontal: space.md,
		borderTopWidth: 1,
		borderTopColor: color.border,
	},
	memberCardFirst: {
		borderTopWidth: 0,
	},
	avatar: {
		width: 42,
		height: 42,
		borderRadius: 21,
		alignItems: "center",
		justifyContent: "center",
	},
	avatarText: {
		fontSize: 14,
		fontWeight: "700",
		color: color.onPrimary,
		letterSpacing: 0.5,
	},
	memberInfo: {
		flex: 1,
		gap: 2,
	},
	memberName: {
		fontSize: 14,
		fontWeight: "600",
		color: color.text,
	},
	memberNim: {
		fontSize: 13,
		color: color.text3,
		fontVariant: ["tabular-nums"],
	},
	stackCard: {
		backgroundColor: color.surface,
		borderRadius: radius.card,
		borderCurve: "continuous",
		borderWidth: 1,
		borderColor: color.border,
		padding: space.md,
		gap: space.md,
		boxShadow: shadow.card,
	},
	stackRow: {
		flexDirection: "row",
		alignItems: "center",
		gap: space.sm,
	},
	stackText: {
		flex: 1,
		fontSize: 13,
		color: color.text2,
	},
	linkCard: {
		flexDirection: "row",
		alignItems: "center",
		gap: space.md,
		marginTop: space.md,
		backgroundColor: color.surface,
		borderRadius: radius.card,
		borderCurve: "continuous",
		borderWidth: 1,
		borderColor: color.border,
		padding: space.md,
		boxShadow: shadow.card,
	},
	linkCardDisabled: {
		opacity: 0.6,
	},
	linkIcon: {
		width: 40,
		height: 40,
		borderRadius: 20,
		backgroundColor: color.surface2,
		alignItems: "center",
		justifyContent: "center",
	},
	linkTitle: {
		fontSize: 14,
		fontWeight: "600",
		color: color.text,
	},
	linkSubtitle: {
		fontSize: 12,
		color: color.text3,
	},
	footer: {
		marginTop: space.md,
		fontSize: 12,
		textAlign: "center",
		color: color.text3,
	},
	pressed: {
		opacity: 0.9,
		transform: [{ scale: 0.98 }],
	},
});
