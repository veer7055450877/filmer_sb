import React from 'react';
import { 
  Video, Camera, Scissors, Film, Monitor, Layers, Cpu, Zap, Trophy, Award, 
  Check, X 
} from 'lucide-react';

// --- HOME PAGE DATA ---

export const services = [
  {
    icon: <Video className="w-8 h-8" />,
    title: "Wedding Films",
    desc: "Cinematic storytelling of your special day, capturing every emotion."
  },
  {
    icon: <Camera className="w-8 h-8" />,
    title: "Pre-Wedding",
    desc: "Dreamy, romantic shoots that tell the story of your love before the big day."
  },
  {
    icon: <Scissors className="w-8 h-8" />,
    title: "Reels & Shorts",
    desc: "High-energy, engaging short-form content for Instagram and YouTube."
  },
  {
    icon: <Film className="w-8 h-8" />,
    title: "Event Highlights",
    desc: "Corporate or party events turned into dynamic highlight reels."
  }
];

export const faqItems = [
  {
    question: "How long does it take to edit a wedding film?",
    answer: "Typically, a teaser is delivered within 1 week, and the full cinematic film takes 4-6 weeks depending on the length and complexity. We prioritize quality to ensure your story is told perfectly."
  },
  {
    question: "Do you select the music?",
    answer: "Yes! We use licensed music that fits the mood and emotion of your footage. We can also work with your preferences if you have a specific vibe in mind."
  },
  {
    question: "Can I make changes to the video?",
    answer: "Absolutely. We offer up to 2 rounds of revisions to ensure you are 100% happy with the final result."
  },
  {
    question: "Do you travel for shoots?",
    answer: "Yes, Filmer SB is available worldwide. Travel and accommodation fees apply for locations outside our base area."
  }
];

export const workflowSteps = [
  { title: "Discovery", desc: "We chat about your vision." },
  { title: "Production", desc: "You shoot or we shoot." },
  { title: "Magic", desc: "Editing, grading & sound." },
  { title: "Delivery", desc: "Your story, ready to share." }
];

export const stats = [
  { label: "Years Experience", value: "5+" },
  { label: "Projects Completed", value: "200+" },
  { label: "Happy Clients", value: "150+" },
  { label: "Coffee Consumed", value: "∞" }
];

export const tools = [
  { name: "Premiere Pro", icon: <Monitor /> },
  { name: "After Effects", icon: <Layers /> },
  { name: "DaVinci Resolve", icon: <Cpu /> },
  { name: "Sound Design", icon: <Zap /> }
];

export const awards = [
  { title: "Best Wedding Edit 2024", org: "Wedding Film Awards" },
  { title: "Top Rated Freelancer", org: "Upwork" },
  { title: "Viral Reel of the Month", org: "InstaCreators" }
];

// --- PORTFOLIO PAGE DATA ---

export const portfolioCategories = ["All", "Wedding", "Pre-Wedding", "Reels", "Teasers", "Events"];

export const portfolioItems = [
  {
    id: 1,
    title: "Sarah & John's Wedding",
    category: "Wedding",
    image: "https://images.unsplash.com/photo-1511285560982-1351cdeb9820?q=80&w=1200&auto=format&fit=crop",
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-wedding-couple-kissing-during-ceremony-25032-large.mp4"
  },
  {
    id: 2,
    title: "Cinematic Pre-Wedding Shoot",
    category: "Pre-Wedding",
    image: "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?q=80&w=1200&auto=format&fit=crop",
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-couple-walking-through-the-forest-42220-large.mp4"
  },
  {
    id: 3,
    title: "Fashion Brand Reel",
    category: "Reels",
    image: "https://images.unsplash.com/photo-1492633423870-43d1cd2775eb?q=80&w=1200&auto=format&fit=crop",
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-fashion-model-posing-in-neon-light-32378-large.mp4"
  },
  {
    id: 4,
    title: "Corporate Event Highlights",
    category: "Events",
    image: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?q=80&w=1200&auto=format&fit=crop",
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-people-working-in-a-modern-office-4366-large.mp4"
  },
  {
    id: 5,
    title: "Mountain Elopement Teaser",
    category: "Teasers",
    image: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1200&auto=format&fit=crop",
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-aerial-view-of-a-forest-and-mountains-42228-large.mp4"
  },
  {
    id: 6,
    title: "Travel Vlog Edit",
    category: "Reels",
    image: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=1200&auto=format&fit=crop",
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-waves-coming-to-the-beach-5016-large.mp4"
  }
];

// --- SERVICES PAGE DATA ---

export const servicesList = [
  {
    title: "Wedding Films",
    price: "Starting at $500",
    description: "A complete cinematic documentation of your wedding day. We focus on raw emotions, candid moments, and the beautiful chaos of love.",
    features: ["Full Day Coverage Edit", "Cinematic Highlights (5-7 mins)", "Social Media Teaser", "Color Grading & Sound Design"]
  },
  {
    title: "Instagram Reels",
    price: "Starting at $100",
    description: "Engaging, fast-paced, and trend-focused short-form content designed to stop the scroll and grow your audience.",
    features: ["Vertical 9:16 Format", "Trending Audio Selection", "Dynamic Transitions", "Captions & Motion Graphics"]
  },
  {
    title: "Pre-Wedding Cinematic",
    price: "Starting at $300",
    description: "Tell your love story before the big day. A dreamy, movie-like sequence shot in beautiful locations.",
    features: ["Storyboarding", "Location Scouting Advice", "Drone Shots (if footage provided)", "Licensed Music"]
  },
  {
    title: "Event Highlights",
    price: "Custom Quote",
    description: "Perfect for corporate events, parties, or concerts. We condense hours of footage into a high-energy highlight reel.",
    features: ["Fast Turnaround", "Brand Integration", "Music Sync", "Multi-Camera Editing"]
  }
];

// --- PACKAGES PAGE DATA ---

export const packages = [
  {
    name: "Essential",
    price: "$500",
    description: "Perfect for simple highlights and social media teasers.",
    features: [
      { name: "3-5 Minute Highlight Reel", included: true },
      { name: "Color Correction", included: true },
      { name: "Licensed Music", included: true },
      { name: "1 Revision Round", included: true },
      { name: "Social Media Teaser", included: false },
      { name: "Full Documentary Edit", included: false },
      { name: "Raw Footage", included: false },
    ]
  },
  {
    name: "Cinematic",
    price: "$1,200",
    description: "Our most popular package for weddings and events.",
    popular: true,
    features: [
      { name: "5-7 Minute Highlight Reel", included: true },
      { name: "Advanced Color Grading", included: true },
      { name: "Sound Design & Mixing", included: true },
      { name: "2 Revision Rounds", included: true },
      { name: "Social Media Teaser", included: true },
      { name: "Full Documentary Edit", included: false },
      { name: "Raw Footage", included: false },
    ]
  },
  {
    name: "Masterpiece",
    price: "$2,500",
    description: "The complete storytelling experience with no compromises.",
    features: [
      { name: "8-12 Minute Feature Film", included: true },
      { name: "Premium Color Grading", included: true },
      { name: "Cinematic Sound Design", included: true },
      { name: "Unlimited Revisions", included: true },
      { name: "3 Social Media Teasers", included: true },
      { name: "Full Documentary Edit", included: true },
      { name: "Raw Footage Delivery", included: true },
    ]
  }
];

// --- EXPERIENCE TIMELINE DATA ---

export const milestones = [
  {
    year: "2019",
    title: "The Beginning",
    role: "Junior Editor",
    desc: "Started editing wedding highlights for local studios. Mastered the basics of pacing and storytelling.",
    icon: <Film size={20} />
  },
  {
    year: "2021",
    title: "Freelance Leap",
    role: "Independent Creator",
    desc: "Launched Filmer SB. Edited 50+ wedding films and started working with international clients.",
    icon: <Monitor size={20} />
  },
  {
    year: "2023",
    title: "Viral Success",
    role: "Content Specialist",
    desc: "Specialized in short-form content. Helped clients achieve over 1M+ views on Instagram Reels.",
    icon: <Video size={20} />
  },
  {
    year: "2025",
    title: "Industry Leader",
    role: "Senior Editor",
    desc: "Leading a team of editors, winning awards for cinematic wedding storytelling.",
    icon: <Award size={20} />
  }
];

// --- TESTIMONIALS DATA ---

export const testimonials = [
  {
    id: 1,
    name: "Emily & Ryan",
    role: "Wedding Couple",
    text: "We are absolutely speechless. The way you wove our vows into the music was pure magic. It felt like watching a movie of our own lives.",
    rating: 5
  },
  {
    id: 2,
    name: "TechStart Inc.",
    role: "Corporate Client",
    text: "The event highlights reel was dynamic, fast-paced, and perfectly on brand. Filmer SB understands modern pacing better than anyone we've worked with.",
    rating: 5
  },
  {
    id: 3,
    name: "Sarah Jenkins",
    role: "Fashion Influencer",
    text: "My reels have never looked this good. The transitions are seamless, and the color grading is just chef's kiss. Engagement is up 200%!",
    rating: 5
  }
];

// --- INSTAGRAM FEED DATA ---

export const instagramReels = [
  {
    id: 1,
    instagramId: 'Cp6n9q_pZ_r', 
    thumbnail: 'https://images.unsplash.com/photo-1511285560982-1351cdeb9820?q=80&w=600&auto=format&fit=crop',
    likes: '1.2k',
    comments: 45,
    caption: "The moment they said 'I do' 💍✨ #wedding #love"
  },
  {
    id: 2,
    instagramId: 'CqJ5x8_L_9p', 
    thumbnail: 'https://images.unsplash.com/photo-1492633423870-43d1cd2775eb?q=80&w=600&auto=format&fit=crop',
    likes: '3.4k',
    comments: 120,
    caption: "Neon nights & city lights 🌃🎥 #cinematic #urban"
  },
  {
    id: 3,
    instagramId: 'CrK9y7_M_8o', 
    thumbnail: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=600&auto=format&fit=crop',
    likes: '890',
    comments: 22,
    caption: "Travel diaries: Bali Edition 🌊🌴 #travel #vlog"
  },
  {
    id: 4,
    instagramId: 'CsL0z1_N_7n', 
    thumbnail: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=600&auto=format&fit=crop',
    likes: '2.1k',
    comments: 85,
    caption: "Fashion film teaser 🎬👠 #fashion #editorial"
  }
];
