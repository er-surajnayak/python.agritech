import type { AssignmentQuestion, AssignmentSection, AssignmentTopic } from "@/types/content";

type QuestionInput = Omit<AssignmentQuestion, "id" | "number">;

function section(
  topicId: string,
  id: string,
  title: string,
  description: string,
  difficulty: AssignmentSection["difficulty"],
  startNumber: number,
  questions: QuestionInput[],
): AssignmentSection {
  return {
    id,
    title,
    description,
    difficulty,
    questions: questions.map((question, index) => ({
      ...question,
      id: `${topicId}-${startNumber + index}`,
      number: startNumber + index,
    })),
  };
}

const ifElseSections: AssignmentSection[] = [
  section("if-else", "basics", "Level 1 · Basics", "Warm-up decisions using a single condition or a small set of alternatives.", "Warm-up", 1, [
    { prompt: "Write a program to check whether a number is positive, negative, or zero." },
    { prompt: "Check whether a number is even or odd." },
    { prompt: "Take two numbers as input and print the greater number." },
    { prompt: "Check whether a given year is a leap year or not." },
    { prompt: "Write a program to check whether a person is eligible to vote.", requirements: ["The learner must be at least 18 years old."] },
    { prompt: "Take a character as input and check whether it is a vowel or consonant." },
    { prompt: "Check whether a number is a multiple of 5." },
    { prompt: "Take marks as input and display the result.", requirements: ["Marks greater than or equal to 40 → Pass", "Otherwise → Fail"] },
  ]),
  section("if-else", "decision-making", "Level 2 · Decision Making", "Combine comparisons and order multiple conditions correctly.", "Beginner", 9, [
    { prompt: "Write a program to check whether a number is divisible by both 3 and 7." },
    { prompt: "Take three numbers and print the largest among them." },
    { prompt: "Write a program to check whether a number is a two-digit number." },
    { prompt: "Check whether a character is uppercase, lowercase, a digit, or a special symbol." },
    { prompt: "Take salary as input and calculate the employee bonus.", requirements: ["Salary greater than or equal to ₹50,000 → 10% bonus", "Salary below ₹50,000 → 5% bonus"] },
    { prompt: "Write a program to check whether a number lies between 10 and 50." },
    { prompt: "Take a temperature and classify the weather.", requirements: ["Below 0°C → Freezing", "0–25°C → Cold", "26–35°C → Warm", "Above 35°C → Hot"] },
  ]),
  section("if-else", "real-world", "Level 3 · Real-World Scenarios", "Translate familiar systems into clear inputs, conditions, and outputs.", "Applied", 16, [
    { prompt: "Build an Electricity Bill Calculator.", requirements: ["Up to 100 units → ₹2 per unit", "101–200 units → ₹3 per unit", "Above 200 units → ₹5 per unit"] },
    { prompt: "Build a Student Grade System.", requirements: ["90 or above → A", "80–89 → B", "70–79 → C", "60–69 → D", "Below 60 → Fail"] },
    { prompt: "Build an ATM Withdrawal Check.", requirements: ["Confirm the available balance is sufficient.", "Maintain a minimum balance of ₹1,000 after withdrawal."] },
    { prompt: "Build a Login Validation program.", requirements: ["Correct username and password → Login Successful", "Otherwise → Invalid Credentials"] },
    { prompt: "Build a Movie Ticket Pricing program.", requirements: ["Age below 12 → ₹100", "Age 12–60 → ₹200", "Age above 60 → ₹150"] },
  ]),
  section("if-else", "logical-thinking", "Level 4 · Logical Thinking", "Reason about compound conditions, ranges, and classification rules.", "Intermediate", 21, [
    { prompt: "Check whether a number is divisible by 5 or 11." },
    { prompt: "Write a program to determine whether a triangle is valid.", requirements: ["The sum of its three angles must equal 180 degrees."] },
    { prompt: "Check whether three sides form an equilateral, isosceles, or scalene triangle." },
    { prompt: "Compare two numbers and report whether the first is larger, smaller, or equal to the second." },
    { prompt: "Take an integer and classify it as single-digit, double-digit, or multi-digit." },
  ]),
  section("if-else", "mini-challenges", "Level 5 · Mini Challenges", "Complete compact applications that resemble production decision rules.", "Challenge", 26, [
    { prompt: "Build an Online Shopping Discount calculator.", requirements: ["Cart value ₹5,000 or above → 20% discount", "₹3,000–₹4,999 → 10% discount", "Below ₹3,000 → No discount"] },
    { prompt: "Build a Password Strength Checker based on password length.", requirements: ["Below 6 characters → Weak", "6–10 characters → Medium", "Above 10 characters → Strong"] },
    { prompt: "Build a Traffic Signal System.", requirements: ["Red → Stop", "Yellow → Get Ready", "Green → Go"] },
    { prompt: "Build a Bank Loan Eligibility checker.", requirements: ["Age at least 21 and salary at least ₹25,000 → Eligible", "Otherwise → Not Eligible"] },
    { prompt: "Build an Exam Eligibility checker.", requirements: ["Attendance at least 75% → Allowed", "Otherwise → Not Allowed"] },
  ]),
];

const controlFlowSections: AssignmentSection[] = [
  section("control-flow", "loop-basics", "Section A · If–Else + Loop Basics", "Practice iteration changes using conditions and loop-control statements.", "Beginner", 1, [
    { prompt: "Print numbers from 1 to 20 and display whether each number is even or odd." },
    { prompt: "Print numbers from 1 to 50 and skip multiples of 7." },
    { prompt: "Print numbers from 1 to 100 and stop when the number becomes 65." },
    { prompt: "Print numbers from 1 to 30 and ignore numbers divisible by both 3 and 5." },
    { prompt: "Print numbers from 1 to 10 and do nothing when the number is 5.", requirements: ["Use pass for the no-operation branch."] },
  ]),
  section("control-flow", "loop-decisions", "Section B · Loop with Decision Making", "Combine repetition, branching, early exits, and skipped iterations.", "Intermediate", 6, [
    { prompt: "Take a number and print its multiplication table.", requirements: ["Stop when the product becomes greater than 50."] },
    { prompt: "Print numbers from 1 to 50.", requirements: ["Skip even numbers.", "Stop when the number reaches 37."] },
    { prompt: "Print numbers from 1 to 20.", requirements: ["Divisible by 3 → print Fizz", "Divisible by 5 → print Buzz", "Divisible by both → skip printing"] },
    { prompt: "Print numbers from 1 to 30.", requirements: ["Print only odd numbers.", "Stop once 21 is printed."] },
    { prompt: "Print numbers from 1 to 100.", requirements: ["Skip multiples of 10.", "Stop when the number reaches 70."] },
  ]),
  section("control-flow", "number-problems", "Section C · Number-Based Problems", "Use loops to inspect and transform the digits of a number.", "Intermediate", 11, [
    { prompt: "Take a number and count its digits.", requirements: ["Skip digit 0 while counting."] },
    { prompt: "Take a number and find the sum of its digits.", requirements: ["Stop the calculation if a digit is greater than 7."] },
    { prompt: "Take a number and print its digits one by one.", requirements: ["Skip digit 5."] },
    { prompt: "Check whether a number is prime.", requirements: ["Stop checking as soon as a factor is found."] },
    { prompt: "Reverse a number.", requirements: ["Skip digit 0 while reversing."] },
  ]),
  section("control-flow", "real-world-logic", "Section D · Real-World Logic", "Model retry limits, unavailable records, capacity, and user exits.", "Applied", 16, [
    { prompt: "Build an ATM withdrawal simulation.", requirements: ["Allow a maximum of three attempts.", "Stop when the correct PIN is entered."] },
    { prompt: "Build an online exam flow for questions 1–20.", requirements: ["Skip question 13.", "Stop the exam if the student chooses to exit."] },
    { prompt: "Build a bus ticket booking flow for seats 1–40.", requirements: ["Skip already booked seats.", "Stop booking when all seats are full."] },
    { prompt: "Build a mobile recharge reminder for five days.", requirements: ["Stop reminders when the recharge is completed."] },
    { prompt: "Build a password character checker.", requirements: ["Skip special characters.", "Stop checking if the password length exceeds 12."] },
  ]),
  section("control-flow", "patterns", "Section E · Pattern + Control Flow", "Apply control statements while generating compact console patterns.", "Intermediate", 21, [
    { prompt: "Print the increasing number pattern and skip the line for 3.", example: "1\n12\n123\n1234" },
    { prompt: "Print the decreasing star pattern and stop when the row reaches two stars.", example: "*****\n****\n***\n**\n*" },
    { prompt: "Print the repeated-number pattern and skip the row for number 2.", example: "1\n22\n333\n4444" },
    { prompt: "Print numbers 1 through 5 on one line and skip number 4.", example: "1 2 3 4 5" },
    { prompt: "Print numbers from 1 to 10.", requirements: ["Use pass for numbers greater than 8."] },
  ]),
  section("control-flow", "mini-challenges", "Section F · Mini Challenges", "Integrate several control-flow tools into complete algorithms.", "Challenge", 26, [
    { prompt: "Print all numbers between 1 and 100.", requirements: ["Skip numbers divisible by 4.", "Stop when the number reaches 77."] },
    { prompt: "Print prime numbers between 1 and 50.", requirements: ["Stop checking factors once a number is confirmed non-prime."] },
    { prompt: "Find the factorial of a number.", requirements: ["Stop the calculation if the factorial exceeds 500."] },
    { prompt: "Print a Fibonacci series.", requirements: ["Skip values greater than 50."] },
    { prompt: "Build a menu-driven program.", requirements: ["Display the menu at most five times.", "Skip invalid choices.", "Stop when the user selects Exit."] },
  ]),
];

export const assignmentTopics: AssignmentTopic[] = [
  {
    id: "if-else",
    shortTitle: "If–Else",
    title: "Python If–Else Practice Assignment",
    description: "Progress from single decisions to realistic multi-branch applications using carefully ordered conditions.",
    concepts: ["if", "if-else", "if-elif-else", "nested decisions", "logical operators"],
    sections: ifElseSections,
  },
  {
    id: "control-flow",
    shortTitle: "Loops + Control",
    title: "If–Else, Loops & Loop Control Practice",
    description: "Combine decisions with for, while, break, continue, and pass in progressively richer programs.",
    concepts: ["for", "while", "break", "continue", "pass"],
    sections: controlFlowSections,
  },
];
