// Years: 40 years from current year
export const YEARS = Array.from({ length: 40 }, (_, i) => 2026 - i);

// Makes
export const MAKES = [
  "Acura", "Audi", "BMW", "Buick", "Cadillac", "Chevrolet", "Chrysler",
  "Dodge", "Ford", "GMC", "Honda", "Hyundai", "Jeep", "Kia", "Land Rover",
  "Lexus", "Lincoln", "Mazda", "Mercedes-Benz", "Mini", "Mitsubishi",
  "Nissan", "Porsche", "Ram", "Subaru", "Tesla", "Toyota", "Volkswagen",
  "Volvo", "Other"
];

// Body types for silhouette selection
export const BODY_TYPES = [
  { id: 'sedan', label: 'Sedan', emoji: '🚗' },
  { id: 'suv', label: 'SUV', emoji: '🚙' },
  { id: 'truck', label: 'Pickup Truck', emoji: '🛻' },
  { id: 'convertible', label: 'Convertible', emoji: '🏎️' },
  { id: 'van', label: 'Van / Minivan', emoji: '🚐' },
  { id: 'hatchback', label: 'Hatchback', emoji: '🚘' },
] as const;

export type BodyType = typeof BODY_TYPES[number]['id'];

// Colors
export const COLORS = [
  { name: "Black", hex: "#2a2a2a" },
  { name: "White", hex: "#e8e4dd" },
  { name: "Silver", hex: "#aeb4b8" },
  { name: "Gray", hex: "#6e7275" },
  { name: "Red", hex: "#c0392b" },
  { name: "Blue", hex: "#2e6da4" },
  { name: "Green", hex: "#27804a" },
  { name: "Gold", hex: "#c5a44e" },
  { name: "Brown", hex: "#6d4c2e" },
  { name: "Orange", hex: "#d35400" },
  { name: "Yellow", hex: "#d4ac0d" },
  { name: "Purple", hex: "#7b3fa0" },
];

// US States
export const STATES = [
  "AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "FL", "GA",
  "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD",
  "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ",
  "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC",
  "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY"
];

// Reasons for donation
export const REASONS = [
  { id: "upgrade", text: "getting something new", emoji: "🚗" },
  { id: "simplify", text: "simplifying my life", emoji: "🧘" },
  { id: "no_need", text: "I don't need it anymore", emoji: "🤷" },
  { id: "costly", text: "it costs too much to keep", emoji: "💸" },
  { id: "give_back", text: "I want to give back", emoji: "💛" },
  { id: "tax", text: "the tax benefit", emoji: "📋" },
  { id: "inherited", text: "I inherited it", emoji: "🏡" },
  { id: "moving", text: "I'm moving", emoji: "📦" },
];

// Causes (zero-party data)
export const CAUSES = [
  { id: "hunger", text: "fighting hunger", emoji: "🍞" },
  { id: "housing", text: "housing & shelter", emoji: "🏠" },
  { id: "veterans", text: "supporting veterans", emoji: "🎖️" },
  { id: "animals", text: "helping animals", emoji: "🐾" },
  { id: "children", text: "kids & youth", emoji: "✨" },
  { id: "environment", text: "the environment", emoji: "🌿" },
  { id: "health", text: "health & wellness", emoji: "💚" },
  { id: "education", text: "education", emoji: "📚" },
  { id: "community", text: "my community", emoji: "🤝" },
];

// Vehicle conditions
export const CONDITIONS = [
  { id: "great", text: "Runs great", description: "Starts right up", icon: "🟢" },
  { id: "ok", text: "Runs, needs work", description: "Gets around, has issues", icon: "🟡" },
  { id: "rough", text: "Doesn't run", description: "Won't start", icon: "🟠" },
  { id: "bad", text: "Pretty rough", description: "Missing parts, damage", icon: "🔴" },
  { id: "unknown", text: "Not sure", description: "Haven't checked", icon: "❓" },
];

// Memories (zero-party data)
export const MEMORIES = [
  { id: "roadtrips", text: "Road trips", emoji: "🛣️" },
  { id: "commute", text: "Daily commutes", emoji: "☕" },
  { id: "family", text: "Family moments", emoji: "👨‍👩‍👧" },
  { id: "firstcar", text: "First car ever", emoji: "🔑" },
  { id: "dates", text: "Date nights", emoji: "🌙" },
  { id: "moving", text: "Moving day", emoji: "📦" },
  { id: "music", text: "Singing along", emoji: "🎵" },
  { id: "learn", text: "Learning to drive", emoji: "🎓" },
];

// Total steps in the flow
export const TOTAL_STEPS = 15;
