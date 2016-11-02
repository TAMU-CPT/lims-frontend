/**
 * Export default constants used throughout the app
 * @param {object} base The base application.
 */
export default function(base) {
	base.constant("DRF_URL", "http://localhost:8000/");

	base.constant("PERMISSION_LEVELS", {
		0: "view",
		1: "edit",
		2: "admin",
	});
}
