/* -------------------------------- */
/* Constants 						*/
/* -------------------------------- */
export const THRESHOLDS = Object.freeze({
	MASS_HEAVY: 20, // kilograms (kg)
	DIMENSION_BULKY: 150, // centimeters (cm)
	VOLUME_BULKY: 1_000_000, // centimeters cubed (cm^3)
});

/** @typedef {'STANDARD' | 'SPECIAL' | 'REJECTED'} StackName */
/**
 * @typedef {Object} PackageInput
 * @property {number} height   	- centimeters (cm)
 * @property {number} width 	- centimeters (cm)
 * @property {number} length 	- centimeters (cm)
 * @property {number} mass 		- kilograms (kg)
 */

export const SORT_STACKS = /** @type {const} */ Object.freeze({
	REJECTED: "REJECTED",
	SPECIAL: "SPECIAL",
	STANDARD: "STANDARD",
});

const REQUIRED_KEYS = ["height", "width", "length", "mass"];

/* -------------------------------- */
/* Helper Functions 				*/
/* -------------------------------- */
const isNumValid = num => typeof num === "number" && Number.isFinite(num) && num > 0;

/**
 * Validate presence and numeric quality of every required field.
 * @param {PackageInput} pkg
 * @throws {TypeError} if a field is missing or invalid.
 */
const validatePackageInput = (pkg /** @type {PackageInput} */) => {
	const invalidInputs = REQUIRED_KEYS.flatMap(key => {
		if (!(key in pkg)) return [`${key}: <missing>`];
		const value = pkg[key];
		return isNumValid(value) ? [] : [`${key}: ${value}`];
	});

	if (invalidInputs.length)
		throw new TypeError(
			`Invalid package input fields: ${invalidInputs.join(
				", "
			)} -- All fields must exist and be positive, finite numbers`
		);
};

const volume = ({ height, width, length }) => height * width * length;

const isBulky = ({ height, width, length }) =>
	Math.max(height, width, length) >= THRESHOLDS.DIMENSION_BULKY ||
	volume({ height, width, length }) >= THRESHOLDS.VOLUME_BULKY;

const isHeavy = mass => mass >= THRESHOLDS.MASS_HEAVY;

/* -------------------------------- */
/* Public API 						*/
/* -------------------------------- */
/**
 * Decide which stack the package belongs to.
 *
 * @param {PackageInput} pkg
 * @returns {StackName}
 */
export default function sortPackage(pkg) {
	validatePackageInput(pkg);

	const { height, width, length, mass } = pkg;
	const bulky = isBulky({ height, width, length });
	const heavy = isHeavy(mass);

	if (bulky && heavy) return SORT_STACKS.REJECTED;
	if (bulky || heavy) return SORT_STACKS.SPECIAL;
	else return SORT_STACKS.STANDARD;
}
