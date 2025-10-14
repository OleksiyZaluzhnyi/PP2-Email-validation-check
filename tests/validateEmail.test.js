const validateEmail = require("../src/validateEmail")

// Positive tests
test("Entering valid email should return 'true'", () => {
    expect(validateEmail("a.zaluzhnyy24@gmail.com")).toBeTruthy();
})

// Negative tests
// Basic Structure tests
test("Entering non-string value should return Error object", () => {
    expect(validateEmail(52)).toStrictEqual(Error("Email must be a string!"));
    expect(validateEmail(52n)).toStrictEqual(Error("Email must be a string!"));
    expect(validateEmail(true)).toStrictEqual(Error("Email must be a string!"));
    expect(validateEmail({ a: 1 })).toStrictEqual(Error("Email must be a string!"));
    expect(validateEmail(undefined)).toStrictEqual(Error("Email must be a string!"));
    expect(validateEmail(null)).toStrictEqual(Error("Email must be a string!"));
    expect(validateEmail(Symbol("non-string"))).toStrictEqual(Error("Email must be a string!"));
});

test("Entering an empty array should return Error object", () => {
    expect(validateEmail("")).toStrictEqual(Error("Email field must be filled!"));
});

test("Entering too big email should return Error object", () => {
    expect(validateEmail("t".repeat(245) + "@gmail.com")).toStrictEqual(Error("Too long email!"));
});

test("Entering email without '@' sign should return Error object", () => {
    expect(validateEmail("JoeBartolozzi_gmail.com")).toStrictEqual(Error("Email must contain '@' symbol!"));
});

test("Entering email with whitespaces between local name and '@' sign should return Error object", () => {
    expect(validateEmail("Joe Bartolozzi@gmail.com")).toStrictEqual(Error("Email cannot contain spaces!"));
});

test("Entering email with brackets should return Error object", () => {
    expect(validateEmail("Joe(Bartolozzi@gmail.com")).toStrictEqual(Error("Brackets are not allowed!"));
    expect(validateEmail("JoeBartolozzi)@gmail.com")).toStrictEqual(Error("Brackets are not allowed!"));
    expect(validateEmail("Joe(Bartolozzi)@gmail.com")).toStrictEqual(Error("Brackets are not allowed!"));
});

// Local part tests
test("Entering email with empty local part should return Error object", () => {
    expect(validateEmail("@gmail.com")).toStrictEqual(Error("Local part (before '@') cannot be empty!"));
});

test("Entering email with too short or long local part should return Error object", () => {
    expect(validateEmail("Jo@gmail.com")).toStrictEqual(Error("Local part length must be 3–16 symbols!"));
    expect(validateEmail("JoeBartolozziChad@gmail.com")).toStrictEqual(Error("Local part length must be 3–16 symbols!"));
});

test("Entering email with dot sign at start or end in local part should return Error object", () => {
    expect(validateEmail(".JoeBartolozzi@gmail.com")).toStrictEqual(Error("Local part cannot start or end with a dot!"));
    expect(validateEmail("JoeBartolozzi.@gmail.com")).toStrictEqual(Error("Local part cannot start or end with a dot!"));
});

test("Entering email with more than two consecutive dot signs in local part should return Error object", () => {
    expect(validateEmail("JoeBarto..lozzi@gmail.com")).toStrictEqual(Error("Local part cannot contain consecutive dots!"));
});

// Domain part tests
test("Entering email without domain part should return Error object", () => {
    expect(validateEmail("JoeBartolozzi@")).toStrictEqual(Error("Domain part (after '@') cannot be empty!"));
});

test("Entering email with too short or long domain part should return Error object", () => {
    expect(validateEmail("JoeBartolozzi@gm")).toStrictEqual(Error("Domain part length must be 3–32 symbols!"));
    expect(validateEmail(`JoeBartolozzi@${"gm".repeat(17)}`)).toStrictEqual(Error("Domain part length must be 3–32 symbols!"));
});

test("Entering email with dot sign at start or end of domain part should return Error object", () => {
    expect(validateEmail("JoeBartolozzi@.gmail.com")).toStrictEqual(Error("Domain cannot start or end with a dot!"));
    expect(validateEmail("JoeBartolozzi@gmail.com.")).toStrictEqual(Error("Domain cannot start or end with a dot!"));
});

test("Entering email with more than two consecutive dot signs in domain part should return Error object", () => {
    expect(validateEmail("JoeBartolozzi@gm..ail.com")).toStrictEqual(Error("Domain cannot contain consecutive dots!"));
});

// Domain structure tests
test("Entering email with invalid domain part structure should return Error object", () => {
    expect(validateEmail("JoeBartolozzi@ail")).toStrictEqual(Error("Invalid domain format!"));
});

