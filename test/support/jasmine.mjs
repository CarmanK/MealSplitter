export default {
    spec_dir: "test",
    spec_files: [
        "**/*[sS]pec.?(m)js",
    ],
    env: {
        stopSpecOnExpectationFailure: false,
        random: true,
        forbidDuplicateNames: true
    }
}
