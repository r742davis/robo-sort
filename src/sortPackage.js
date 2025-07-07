export const THRESHOLDS = Object.freeze({
	MASS_HEAVY: 20, // kilograms (kg)
	DIMENSION_BULKY: 150, // centimeters (cm)
	VOLUME_BULKY: 1_000_000, // centimeters cubed (cm^3)
});

export const SORT_STACKS = Object.freeze({
	REJECTED: "REJECTED",
	SPECIAL: "SPECIAL",
	STANDARD: "STANDARD",
});

const volume = ({ height, width, length }) => height * width * length;
const isBulky = ({ height, width, length }) =>
	Math.max(height, width, length) >= THRESHOLDS.DIMENSION_BULKY ||
	volume({ height, width, length }) >= THRESHOLDS.VOLUME_BULKY;
const isHeavy = mass => mass >= THRESHOLDS.MASS_HEAVY;

export default function sortPackage(pkg) {

	const { height, width, length, mass } = pkg;
	const bulky = isBulky({ height, width, length });
	const heavy = isHeavy(mass);

	if (bulky && heavy) return SORT_STACKS.REJECTED;
	if (bulky || heavy) return SORT_STACKS.SPECIAL;
	else return SORT_STACKS.STANDARD;
}
