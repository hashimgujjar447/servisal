export const categories = [
  {
    id: "1",
    title: "Power Tools",
    icon: require("../assets/icons/drill.png"),
  },
  {
    id: "2",
    title: "Hand Tools",
    icon: require("../assets/icons/hammer.png"),
  },
  {
    id: "3",
    title: "Cutting Tools",
    icon: require("../assets/icons/saw.png"),
  },
  {
    id: "4",
    title: "Lifting Tools",
    icon: require("../assets/icons/crane.png"),
  },
  {
    id: "5",
    title: "HVAC",
    icon: require("../assets/icons/ac.png"),
  },
  {
    id: "6",
    title: "Gardening",
    icon: require("../assets/icons/garden.png"),
  },
];

export const providers = [
  {
    id: "1",
    name: "Ronaldo Saeed",
    image: require("../assets/images/provider.png"),
    rating: 4.8,
    completedJobs: 154,
    experience: "8 Years",
  },
];

export const services = [
  {
    id: "1",
    title: "Impact Drivers",
    categoryId: "1",
    image: require("../assets/images/tools1.png"),
    price: 18,
    rating: 5,
    reviewCount: 520,
    providerId: "1",
    description:
      "Professional impact driver suitable for industrial and household work.",
  },
  {
    id: "2",
    title: "Rotary Tools",
    categoryId: "1",
    image: require("../assets/images/tools2.png"),
    price: 22,
    rating: 4.9,
    reviewCount: 410,
    providerId: "1",
    description: "High quality rotary tool for cutting and polishing.",
  },
];
export const reviews = [
  {
    id: "1",
    providerId: "1",
    userName: "Michael Stark",
    userImage: require("../assets/images/user.png"),
    rating: 5,
    review: "Very professional service. The tools were in perfect condition and the provider was on time. Highly recommended!",
  },
  {
    id: "2",
    providerId: "1",
    userName: "Sarah Johnson",
    userImage: require("../assets/images/user.png"),
    rating: 5,
    review: "Excellent experience! Got the job done quickly and efficiently. Will definitely use again.",
  },
  {
    id: "3",
    providerId: "1",
    userName: "Ahmed Khan",
    userImage: require("../assets/images/user.png"),
    rating: 4,
    review: "Great service overall. Very reliable and the equipment quality is top-notch.",
  },
];
