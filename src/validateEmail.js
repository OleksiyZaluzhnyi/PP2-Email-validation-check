function validateEmail(email) {
    if (typeof email !== "string") {
        return new Error("Email must be a string!");
    }

    const trimmed = email.trim();

    // 1. Basic structural checks
    if (trimmed.length === 0) return new Error("Email field must be filled!");
    if (trimmed.length > 254) return new Error("Too long email!");
    if (!trimmed.includes("@")) return new Error("Email must contain '@' symbol!");
    if (/\s/.test(trimmed)) return new Error("Email cannot contain spaces!");
    if (/[()]/.test(trimmed)) return new Error("Brackets are not allowed!");

    const [local, domain] = trimmed.split("@");

    // 2. Local part validation
    if (!local) return new Error("Local part (before '@') cannot be empty!");
    if (local.length < 3 || local.length > 16) return new Error("Local part length must be 3–16 symbols!");
    if (/^\./.test(local) || /\.$/.test(local)) return new Error("Local part cannot start or end with a dot!");
    if (/\.\./.test(local)) return new Error("Local part cannot contain consecutive dots!");

    // 3. Domain part validation
    if (!domain) return new Error("Domain part (after '@') cannot be empty!");
    if (domain.length < 3 || domain.length > 32) return new Error("Domain part length must be 3–32 symbols!");
    if (/^\./.test(domain) || /\.$/.test(domain)) return new Error("Domain cannot start or end with a dot!");
    if (/\.\./.test(domain)) return new Error("Domain cannot contain consecutive dots!");

    // 4. Domain structure check (must contain dot and valid TLD)
    if (!/^[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(domain)) {
        return new Error("Invalid domain format!");
    }

    // Passed all checks
    console.log("Email is valid!");
    return true;
}

module.exports = validateEmail;
