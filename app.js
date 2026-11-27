/* ==========================================================================
   mustafaphotostate — Shop QR Referral & Loyalty Web App
   Application State, Template SVG Avatars, Countdown & Real-Time Cloud Sync
   ========================================================================== */

/**
 * 1. FIREBASE CLOUD SYNC CONFIGURATION
 * --------------------------------------------------------------------------
 * To enable real-time cloud sync between customers' phones and your Owner
 * Panel on any device, paste your Firebase project keys below.
 *
 * Leave `apiKey` as an empty string ("") to run automatically in offline /
 * localStorage mode — no setup required to test or use on one device!
 */
const firebaseConfig = {
  apiKey: "AIzaSyDVmWO8cw4RZHu6099cZusz29Z9KQlL9-M",
  authDomain: "mustafaphotostate-3e337.firebaseapp.com",
  projectId: "mustafaphotostate-3e337",
  storageBucket: "mustafaphotostate-3e337.firebasestorage.app",
  messagingSenderId: "847363284127",
  appId: "1:847363284127:web:bebcd6d65674b660b696aa",
  measurementId: "G-C917FGSGMS"
};

const OWNER_PIN = "mustafa150150";
const LOCAL_STORAGE_KEY = "mustafaphotostate_loyalty_customers_v1";
const VIP_DURATION_MS = 180 * 24 * 60 * 60 * 1000; // 6 months (180 days)
const MAX_STAMPS = 6;

/* ==========================================================================
   2. SNAPCHAT-STYLE TEMPLATE-ONLY SVG AVATAR STUDIO
   ========================================================================== */

const AVATAR_BACKDROPS = [
  { id: "mint", label: "Sage Mint", hex: "#CCFBF1" },
  { id: "cream", label: "Warm Cream", hex: "#FEF3C7" },
  { id: "sky", label: "Sky Mist", hex: "#E0F2FE" },
  { id: "rose", label: "Blush Rose", hex: "#FCE7F3" },
  { id: "lavender", label: "Soft Lavender", hex: "#EDE9FE" },
  { id: "peach", label: "Apricot", hex: "#FFEDD5" },
  { id: "sage", label: "Studio Leaf", hex: "#DCFCE7" },
  { id: "emerald", label: "Deep Emerald", hex: "#0F766E" }
];

const AVATAR_CATEGORIES = [
  { id: "all", label: "All" },
  { id: "boys", label: "Boys" },
  { id: "girls", label: "Girls" },
  { id: "hijab", label: "Hijab" },
  { id: "glasses", label: "Glasses" },
  { id: "beard", label: "Beard" }
];

/**
 * Curated Snapchat-inspired character templates.
 * Each template renders as a crisp circular vector portrait.
 */
const AVATAR_TEMPLATES = [
  {
    id: "studio-classic",
    name: "Studio Classic",
    tags: ["boys"],
    defaultBackdrop: "#CCFBF1",
    skin: "#F1C29B",
    skinShade: "#DFAA80",
    hairColor: "#292524",
    shirt: "#0F766E",
    hairStyle: "quiff",
    eyes: "happy",
    mouth: "bigSmile",
    beard: "none",
    glasses: "none",
    hijab: null
  },
  {
    id: "emerald-hijab",
    name: "Emerald Hijab",
    tags: ["girls", "hijab"],
    defaultBackdrop: "#FEF3C7",
    skin: "#F4C9A5",
    skinShade: "#E2B28B",
    hairColor: "#1C1917",
    shirt: "#064E3B",
    hairStyle: "none",
    eyes: "lashes",
    mouth: "warmSmile",
    beard: "none",
    glasses: "none",
    hijab: { main: "#0F766E", fold: "#064E3B", trim: "#D4AF37" }
  },
  {
    id: "beard-boss",
    name: "Beard Boss",
    tags: ["boys", "beard", "glasses"],
    defaultBackdrop: "#E0F2FE",
    skin: "#D99B72",
    skinShade: "#C3845B",
    hairColor: "#1C1917",
    shirt: "#1E293B",
    hairStyle: "fade",
    eyes: "confident",
    mouth: "smirkSmile",
    beard: "full",
    glasses: "square",
    hijab: null
  },
  {
    id: "creative-specs",
    name: "Creative Specs",
    tags: ["girls", "glasses"],
    defaultBackdrop: "#FCE7F3",
    skin: "#F8D5B8",
    skinShade: "#E7BD9C",
    hairColor: "#4A2C20",
    shirt: "#BE185D",
    hairStyle: "bob",
    eyes: "bright",
    mouth: "bigSmile",
    beard: "none",
    glasses: "roundGold",
    hijab: null
  },
  {
    id: "gold-hijab",
    name: "Champagne Hijab",
    tags: ["girls", "hijab", "glasses"],
    defaultBackdrop: "#EDE9FE",
    skin: "#E8B78E",
    skinShade: "#D3A076",
    hairColor: "#1C1917",
    shirt: "#78350F",
    hairStyle: "none",
    eyes: "lashes",
    mouth: "warmSmile",
    beard: "none",
    glasses: "roundGold",
    hijab: { main: "#D4AF37", fold: "#B48A1E", trim: "#FFFBEB" }
  },
  {
    id: "cap-vibes",
    name: "Street Cap",
    tags: ["boys"],
    defaultBackdrop: "#FFEDD5",
    skin: "#C6865C",
    skinShade: "#AE7048",
    hairColor: "#18181B",
    shirt: "#EA580C",
    hairStyle: "cap",
    capColor: "#0F766E",
    eyes: "wink",
    mouth: "bigSmile",
    beard: "stubble",
    glasses: "none",
    hijab: null
  },
  {
    id: "sunny-waves",
    name: "Sunny Waves",
    tags: ["girls"],
    defaultBackdrop: "#DCFCE7",
    skin: "#F5CBA7",
    skinShade: "#E1B28C",
    hairColor: "#5C3317",
    shirt: "#0D9488",
    hairStyle: "longWaves",
    eyes: "bright",
    mouth: "bigSmile",
    beard: "none",
    glasses: "none",
    hijab: null
  },
  {
    id: "scholar-gentle",
    name: "Scholar Look",
    tags: ["boys", "glasses", "beard"],
    defaultBackdrop: "#FEF3C7",
    skin: "#EAC09E",
    skinShade: "#D6A885",
    hairColor: "#27272A",
    shirt: "#334155",
    hairStyle: "sidePart",
    eyes: "happy",
    mouth: "warmSmile",
    beard: "goatee",
    glasses: "roundDark",
    hijab: null
  },
  {
    id: "rose-hijab",
    name: "Blush Hijab",
    tags: ["girls", "hijab"],
    defaultBackdrop: "#CCFBF1",
    skin: "#F6D1B3",
    skinShade: "#E2B898",
    hairColor: "#1C1917",
    shirt: "#9D174D",
    hairStyle: "none",
    eyes: "bright",
    mouth: "bigSmile",
    beard: "none",
    glasses: "none",
    hijab: { main: "#E11D48", fold: "#9F1239", trim: "#FBCFE8" }
  },
  {
    id: "curly-chill",
    name: "Curly Chill",
    tags: ["boys", "glasses"],
    defaultBackdrop: "#EDE9FE",
    skin: "#A66A46",
    skinShade: "#8E5636",
    hairColor: "#18181B",
    shirt: "#4F46E5",
    hairStyle: "curly",
    eyes: "happy",
    mouth: "bigSmile",
    beard: "none",
    glasses: "shades",
    hijab: null
  },
  {
    id: "studio-bun",
    name: "Top Bun",
    tags: ["girls", "glasses"],
    defaultBackdrop: "#FFEDD5",
    skin: "#DDA67E",
    skinShade: "#C68F68",
    hairColor: "#261B16",
    shirt: "#0F766E",
    hairStyle: "topBun",
    eyes: "lashes",
    mouth: "warmSmile",
    beard: "none",
    glasses: "catEye",
    hijab: null
  },
  {
    id: "royal-beard",
    name: "Royal Beard",
    tags: ["boys", "beard"],
    defaultBackdrop: "#DCFCE7",
    skin: "#E5B28A",
    skinShade: "#CF9B73",
    hairColor: "#1C1917",
    shirt: "#064E3B",
    hairStyle: "pompadour",
    eyes: "confident",
    mouth: "warmSmile",
    beard: "full",
    glasses: "none",
    hijab: null
  },
  {
    id: "navy-hijab",
    name: "Midnight Hijab",
    tags: ["girls", "hijab"],
    defaultBackdrop: "#E0F2FE",
    skin: "#D99F78",
    skinShade: "#C28862",
    hairColor: "#1C1917",
    shirt: "#1E3A8A",
    hairStyle: "none",
    eyes: "lashes",
    mouth: "bigSmile",
    beard: "none",
    glasses: "none",
    hijab: { main: "#1E293B", fold: "#0F172A", trim: "#93C5FD" }
  },
  {
    id: "cool-shades",
    name: "VIP Shades",
    tags: ["boys", "glasses"],
    defaultBackdrop: "#FEF3C7",
    skin: "#F2C5A0",
    skinShade: "#DDB08A",
    hairColor: "#3F2A1D",
    shirt: "#18181B",
    hairStyle: "spiky",
    eyes: "confident",
    mouth: "smirkSmile",
    beard: "stubble",
    glasses: "shades",
    hijab: null
  },
  {
    id: "ponytail-joy",
    name: "Ponytail Joy",
    tags: ["girls"],
    defaultBackdrop: "#FCE7F3",
    skin: "#B57853",
    skinShade: "#9C6240",
    hairColor: "#1C1917",
    shirt: "#7C3AED",
    hairStyle: "ponytail",
    eyes: "happy",
    mouth: "bigSmile",
    beard: "none",
    glasses: "none",
    hijab: null
  },
  {
    id: "fresh-fade",
    name: "Fresh Fade",
    tags: ["boys", "beard"],
    defaultBackdrop: "#CCFBF1",
    skin: "#8D5534",
    skinShade: "#754326",
    hairColor: "#141414",
    shirt: "#0F766E",
    hairStyle: "fade",
    eyes: "bright",
    mouth: "bigSmile",
    beard: "goatee",
    glasses: "none",
    hijab: null
  }
];

function renderAvatarSvg(templateId, backdropHex) {
  const tpl = AVATAR_TEMPLATES.find((t) => t.id === templateId) || AVATAR_TEMPLATES[0];
  const bg = backdropHex || tpl.defaultBackdrop;

  // Back hair layer (behind head & ears)
  let backHair = "";
  if (!tpl.hijab) {
    if (tpl.hairStyle === "longWaves") {
      backHair = `
        <path d="M38 72 C34 105, 32 135, 44 152 L116 152 C128 135, 126 105, 122 72 C118 42, 42 42, 38 72 Z" fill="${tpl.hairColor}"/>
      `;
    } else if (tpl.hairStyle === "bob") {
      backHair = `
        <path d="M40 70 C36 96, 38 118, 52 124 L108 124 C122 118, 124 96, 120 70 C116 40, 44 40, 40 70 Z" fill="${tpl.hairColor}"/>
      `;
    } else if (tpl.hairStyle === "topBun") {
      backHair = `
        <circle cx="80" cy="28" r="17" fill="${tpl.hairColor}"/>
        <path d="M67 30 Q80 22 93 30" stroke="rgba(255,255,255,0.18)" stroke-width="2.5" fill="none" stroke-linecap="round"/>
      `;
    } else if (tpl.hairStyle === "ponytail") {
      backHair = `
        <path d="M112 52 C136 52, 138 98, 124 126 C118 110, 114 90, 108 76 Z" fill="${tpl.hairColor}"/>
        <circle cx="114" cy="57" r="5" fill="#D4AF37"/>
      `;
    } else if (tpl.hairStyle === "curly") {
      backHair = `
        <g fill="${tpl.hairColor}">
          <circle cx="44" cy="60" r="14"/><circle cx="116" cy="60" r="14"/>
          <circle cx="52" cy="42" r="15"/><circle cx="108" cy="42" r="15"/>
          <circle cx="80" cy="34" r="17"/>
        </g>
      `;
    }
  }

  // Hijab outer drape behind face
  let hijabBack = "";
  let hijabFront = "";
  if (tpl.hijab) {
    hijabBack = `
      <path d="M36 74 C36 38, 124 38, 124 74 L132 146 C114 156, 46 156, 28 146 Z" fill="${tpl.hijab.main}"/>
      <path d="M40 74 C40 44, 120 44, 120 74" fill="none" stroke="${tpl.hijab.trim}" stroke-width="2.5" opacity="0.8"/>
    `;
    hijabFront = `
      <path d="M43 68 C45 45, 115 45, 117 68 C108 55, 52 55, 43 68 Z" fill="${tpl.hijab.fold}"/>
      <path d="M43 72 C41 102, 54 124, 80 129 C106 124, 119 102, 117 72 C121 96, 124 126, 118 144 C100 150, 60 150, 42 144 C36 126, 39 96, 43 72 Z" fill="${tpl.hijab.main}"/>
      <path d="M46 126 Q80 138 114 126" fill="none" stroke="${tpl.hijab.fold}" stroke-width="4" stroke-linecap="round"/>
    `;
  }

  // Front hair layer
  let frontHair = "";
  if (!tpl.hijab) {
    switch (tpl.hairStyle) {
      case "quiff":
        frontHair = `
          <path d="M43 72 C42 42, 68 32, 92 36 C112 39, 118 55, 117 72 C112 58, 98 52, 80 54 C62 56, 49 60, 43 72 Z" fill="${tpl.hairColor}"/>
          <path d="M58 46 Q82 37 103 48" stroke="rgba(255,255,255,0.16)" stroke-width="2.5" fill="none" stroke-linecap="round"/>
        `;
        break;
      case "fade":
        frontHair = `
          <path d="M45 68 C45 42, 115 42, 115 68 C108 55, 52 55, 45 68 Z" fill="${tpl.hairColor}"/>
          <rect x="48" y="45" width="64" height="14" rx="7" fill="${tpl.hairColor}"/>
        `;
        break;
      case "sidePart":
        frontHair = `
          <path d="M43 72 C42 40, 118 40, 117 72 C110 56, 94 50, 72 56 C58 59, 49 63, 43 72 Z" fill="${tpl.hairColor}"/>
        `;
        break;
      case "pompadour":
        frontHair = `
          <path d="M43 70 C40 42, 62 28, 94 31 C116 33, 120 53, 117 70 C109 55, 92 50, 72 53 C56 55, 48 61, 43 70 Z" fill="${tpl.hairColor}"/>
        `;
        break;
      case "spiky":
        frontHair = `
          <path d="M43 70 L46 48 L59 53 L68 34 L82 47 L95 34 L103 50 L116 46 L117 70 C106 56, 54 56, 43 70 Z" fill="${tpl.hairColor}"/>
        `;
        break;
      case "curly":
        frontHair = `
          <g fill="${tpl.hairColor}">
            <circle cx="52" cy="52" r="11"/><circle cx="67" cy="46" r="12"/>
            <circle cx="84" cy="45" r="12"/><circle cx="101" cy="49" r="11"/>
            <circle cx="112" cy="58" r="9"/><circle cx="47" cy="60" r="8"/>
          </g>
        `;
        break;
      case "cap":
        frontHair = `
          <path d="M41 67 C43 35, 117 35, 119 67 Z" fill="${tpl.capColor || "#0F766E"}"/>
          <path d="M39 65 Q80 56 129 66 Q104 71 39 65 Z" fill="#064E3B"/>
          <circle cx="80" cy="41" r="3" fill="#D4AF37"/>
        `;
        break;
      case "longWaves":
      case "bob":
      case "topBun":
      case "ponytail":
        frontHair = `
          <path d="M43 72 C44 40, 116 40, 117 72 C108 55, 92 49, 80 56 C68 49, 52 55, 43 72 Z" fill="${tpl.hairColor}"/>
        `;
        break;
    }
  }

  // Eyes
  let eyesSvg = "";
  if (tpl.eyes === "wink") {
    eyesSvg = `
      <circle cx="64" cy="82" r="4.2" fill="#1C1917"/>
      <circle cx="65.4" cy="80.5" r="1.4" fill="#FFFFFF"/>
      <path d="M90 82 Q96 77 102 82" stroke="#1C1917" stroke-width="3" fill="none" stroke-linecap="round"/>
    `;
  } else if (tpl.eyes === "lashes") {
    eyesSvg = `
      <circle cx="64" cy="82" r="4.2" fill="#1C1917"/>
      <circle cx="65.4" cy="80.5" r="1.4" fill="#FFFFFF"/>
      <path d="M58 79 L61 81" stroke="#1C1917" stroke-width="1.8" stroke-linecap="round"/>
      <circle cx="96" cy="82" r="4.2" fill="#1C1917"/>
      <circle cx="97.4" cy="80.5" r="1.4" fill="#FFFFFF"/>
      <path d="M102 79 L99 81" stroke="#1C1917" stroke-width="1.8" stroke-linecap="round"/>
    `;
  } else {
    eyesSvg = `
      <circle cx="64" cy="82" r="4.2" fill="#1C1917"/>
      <circle cx="65.4" cy="80.5" r="1.4" fill="#FFFFFF"/>
      <circle cx="96" cy="82" r="4.2" fill="#1C1917"/>
      <circle cx="97.4" cy="80.5" r="1.4" fill="#FFFFFF"/>
    `;
  }

  // Beard
  let beardSvg = "";
  if (tpl.beard === "full") {
    beardSvg = `
      <path d="M45 86 C45 113, 61 124, 80 124 C99 124, 115 113, 115 86 C110 95, 102 98, 92 97 C86 96, 83 94, 80 94 C77 94, 74 96, 68 97 C58 98, 50 95, 45 86 Z" fill="${tpl.hairColor}" opacity="0.95"/>
    `;
  } else if (tpl.beard === "goatee") {
    beardSvg = `
      <path d="M68 103 C68 117, 73 122, 80 122 C87 122, 92 117, 92 103 C88 106, 72 106, 68 103 Z" fill="${tpl.hairColor}" opacity="0.92"/>
    `;
  } else if (tpl.beard === "stubble") {
    beardSvg = `
      <path d="M48 92 C50 112, 64 120, 80 120 C96 120, 110 112, 112 92 C106 106, 94 114, 80 114 C66 114, 54 106, 48 92 Z" fill="${tpl.hairColor}" opacity="0.22"/>
    `;
  }

  // Mouth
  let mouthSvg = "";
  if (tpl.mouth === "bigSmile") {
    mouthSvg = `
      <path d="M68 99 Q80 111 92 99 Z" fill="#FFFFFF"/>
      <path d="M68 99 Q80 111 92 99" fill="none" stroke="#9F1239" stroke-width="2" stroke-linecap="round"/>
    `;
  } else if (tpl.mouth === "smirkSmile") {
    mouthSvg = `
      <path d="M70 101 Q82 107 93 98" fill="none" stroke="#FFFFFF" stroke-width="3" stroke-linecap="round"/>
      <path d="M70 101 Q82 107 93 98" fill="none" stroke="#7F1D1D" stroke-width="1.6" stroke-linecap="round"/>
    `;
  } else {
    mouthSvg = `
      <path d="M70 100 Q80 108 90 100" fill="none" stroke="#9F1239" stroke-width="2.6" stroke-linecap="round"/>
    `;
  }

  // Glasses
  let glassesSvg = "";
  if (tpl.glasses === "square") {
    glassesSvg = `
      <g stroke="#1C1917" stroke-width="2.6" fill="rgba(255,255,255,0.14)">
        <rect x="50" y="73" width="26" height="17" rx="4"/>
        <rect x="84" y="73" width="26" height="17" rx="4"/>
        <line x1="76" y1="81" x2="84" y2="81"/>
      </g>
    `;
  } else if (tpl.glasses === "roundGold") {
    glassesSvg = `
      <g stroke="#B48A1E" stroke-width="2.4" fill="rgba(255,255,255,0.12)">
        <circle cx="64" cy="82" r="12"/>
        <circle cx="96" cy="82" r="12"/>
        <path d="M76 82 Q80 79 84 82" fill="none"/>
      </g>
    `;
  } else if (tpl.glasses === "roundDark") {
    glassesSvg = `
      <g stroke="#27272A" stroke-width="2.6" fill="rgba(255,255,255,0.12)">
        <circle cx="64" cy="82" r="12"/>
        <circle cx="96" cy="82" r="12"/>
        <path d="M76 82 Q80 79 84 82" fill="none"/>
      </g>
    `;
  } else if (tpl.glasses === "catEye") {
    glassesSvg = `
      <g stroke="#9F1239" stroke-width="2.4" fill="rgba(255,255,255,0.12)">
        <path d="M49 75 L75 77 C75 88, 69 92, 62 92 C53 92, 49 85, 49 75 Z"/>
        <path d="M111 75 L85 77 C85 88, 91 92, 98 92 C107 92, 111 85, 111 75 Z"/>
        <line x1="75" y1="80" x2="85" y2="80"/>
      </g>
    `;
  } else if (tpl.glasses === "shades") {
    glassesSvg = `
      <g>
        <rect x="50" y="73" width="27" height="17" rx="5" fill="#18181B" stroke="#D4AF37" stroke-width="1.8"/>
        <rect x="83" y="73" width="27" height="17" rx="5" fill="#18181B" stroke="#D4AF37" stroke-width="1.8"/>
        <line x1="77" y1="79" x2="83" y2="79" stroke="#D4AF37" stroke-width="2.2"/>
        <line x1="54" y1="77" x2="62" y2="85" stroke="rgba(255,255,255,0.35)" stroke-width="2" stroke-linecap="round"/>
        <line x1="87" y1="77" x2="95" y2="85" stroke="rgba(255,255,255,0.35)" stroke-width="2" stroke-linecap="round"/>
      </g>
    `;
  }

  const earsSvg = tpl.hijab
    ? ""
    : `
      <circle cx="43" cy="84" r="7" fill="${tpl.skinShade}"/>
      <circle cx="117" cy="84" r="7" fill="${tpl.skinShade}"/>
    `;

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 160" width="160" height="160">
    <circle cx="80" cy="80" r="80" fill="${bg}"/>
    <circle cx="80" cy="80" r="75" fill="none" stroke="rgba(255,255,255,0.45)" stroke-width="2"/>
    ${backHair}
    ${hijabBack}
    <!-- Shoulders & Shirt -->
    <path d="M26 160 C28 128, 52 122, 80 122 C108 122, 132 128, 134 160 Z" fill="${tpl.shirt}"/>
    <path d="M64 122 Q80 135 96 122" fill="none" stroke="rgba(255,255,255,0.22)" stroke-width="2.5"/>
    <!-- Neck -->
    <rect x="69" y="106" width="22" height="22" rx="9" fill="${tpl.skinShade}"/>
    ${earsSvg}
    <!-- Face -->
    <rect x="44" y="46" width="72" height="75" rx="35" fill="${tpl.skin}"/>
    <!-- Rosy Cheeks -->
    <ellipse cx="56" cy="91" rx="6" ry="3.2" fill="#F43F5E" opacity="0.18"/>
    <ellipse cx="104" cy="91" rx="6" ry="3.2" fill="#F43F5E" opacity="0.18"/>
    <!-- Eyebrows -->
    <path d="M56 72 Q64 68 71 71" stroke="${tpl.hairColor}" stroke-width="2.6" fill="none" stroke-linecap="round"/>
    <path d="M89 71 Q96 68 104 72" stroke="${tpl.hairColor}" stroke-width="2.6" fill="none" stroke-linecap="round"/>
    <!-- Nose -->
    <path d="M80 82 L78 91 Q80 93 83 91" stroke="${tpl.skinShade}" stroke-width="2.2" fill="none" stroke-linecap="round"/>
    ${eyesSvg}
    ${beardSvg}
    ${mouthSvg}
    ${frontHair}
    ${hijabFront}
    ${glassesSvg}
  </svg>`;

  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}

/* ==========================================================================
   3. APPLICATION STATE & STORAGE LAYER (FIREBASE + LOCALSTORAGE FALLBACK)
   ========================================================================== */

const state = {
  customers: [],
  activeCustomerId: null,
  currentView: "home",
  ownerUnlocked: false,
  ownerTab: "progress", // 'progress' | 'vip'
  ownerSearch: "",
  pendingDeleteId: null,
  selectedAvatarCategory: "all",
  selectedTemplateId: AVATAR_TEMPLATES[0].id,
  selectedBackdrop: AVATAR_TEMPLATES[0].defaultBackdrop,
  prefilledRefCode: "",
  countdownInterval: null,
  usingFirebase: false,
  db: null
};

function generateId() {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return "cust_" + Date.now().toString(36) + "_" + Math.random().toString(36).slice(2, 8);
}

function generateUniqueReferralCode() {
  const existingCodes = new Set(state.customers.map((c) => (c.code || "").toUpperCase()));
  for (let i = 0; i < 500; i++) {
    const digits = Math.floor(1000 + Math.random() * 9000);
    const candidate = `MPS-${digits}`;
    if (!existingCodes.has(candidate)) {
      return candidate;
    }
  }
  return `MPS-${Date.now().toString().slice(-4)}`;
}

function normalizeReferralInput(raw) {
  const cleaned = (raw || "").trim().toUpperCase();
  if (!cleaned) return "";
  if (/^\d{4}$/.test(cleaned)) {
    return `MPS-${cleaned}`;
  }
  return cleaned;
}

function findCustomerByRefInput(raw) {
  const normalized = normalizeReferralInput(raw);
  if (!normalized) return null;
  return (
    state.customers.find((c) => {
      const code = (c.code || "").toUpperCase();
      return code === normalized || code.replace("MPS-", "") === normalized;
    }) || null
  );
}

function loadLocalCustomers() {
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (err) {
    console.warn("Failed to parse local customers:", err);
    return [];
  }
}

function saveLocalCustomers(customers) {
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(customers));
  } catch (err) {
    console.warn("Failed to save local customers:", err);
  }
}

function initStorageAndSync() {
  const dot = document.getElementById("sync-status-dot");
  const hasFirebaseKeys =
    typeof firebase !== "undefined" &&
    firebaseConfig &&
    typeof firebaseConfig.apiKey === "string" &&
    firebaseConfig.apiKey.trim().length > 0;

  if (hasFirebaseKeys) {
    try {
      const app = !firebase.apps.length
        ? firebase.initializeApp(firebaseConfig)
        : firebase.app();
      if (typeof firebase.analytics === "function" && location.protocol.startsWith("http")) {
        try {
          firebase.analytics(app);
        } catch (analyticsErr) {
          console.warn("Firebase Analytics skipped:", analyticsErr);
        }
      }
      state.db = firebase.firestore();
      state.usingFirebase = true;
      if (dot) {
        dot.className = "inline-block w-2 h-2 rounded-full bg-emerald-500";
        dot.title = "Real-time Cloud Sync Active (Firebase Firestore)";
      }

      state.db
        .collection("customers")
        .orderBy("createdAt", "desc")
        .onSnapshot(
          (snapshot) => {
            const list = [];
            snapshot.forEach((doc) => {
              list.push({ id: doc.id, ...doc.data() });
            });
            state.customers = list;
            onCustomersUpdated();
          },
          (error) => {
            console.error("Firestore sync error, falling back to localStorage:", error);
            state.usingFirebase = false;
            state.customers = loadLocalCustomers();
            if (dot) {
              dot.className = "inline-block w-2 h-2 rounded-full bg-amber-500";
              dot.title = "Offline Local Mode (localStorage)";
            }
            onCustomersUpdated();
          }
        );
      return;
    } catch (err) {
      console.warn("Firebase initialization failed, using localStorage:", err);
    }
  }

  // Automatic localStorage fallback
  state.usingFirebase = false;
  state.customers = loadLocalCustomers();
  if (dot) {
    dot.className = "inline-block w-2 h-2 rounded-full bg-amber-500";
    dot.title = "Local Storage Mode (Add Firebase keys in app.js for multi-device sync)";
  }
  onCustomersUpdated();

  // Keep multiple browser tabs synced in local mode
  window.addEventListener("storage", (e) => {
    if (e.key === LOCAL_STORAGE_KEY) {
      state.customers = loadLocalCustomers();
      onCustomersUpdated();
    }
  });
}

async function persistNewCustomer(customer, referrerToUpdate) {
  if (state.usingFirebase && state.db) {
    const batch = state.db.batch();
    const newRef = state.db.collection("customers").doc(customer.id);
    batch.set(newRef, customer);
    if (referrerToUpdate) {
      const refDoc = state.db.collection("customers").doc(referrerToUpdate.id);
      batch.update(refDoc, {
        stamps: referrerToUpdate.stamps,
        vipUnlockedAt: referrerToUpdate.vipUnlockedAt,
        vipExpiresAt: referrerToUpdate.vipExpiresAt
      });
    }
    await batch.commit();
  } else {
    state.customers = [customer, ...state.customers];
    if (referrerToUpdate) {
      state.customers = state.customers.map((c) =>
        c.id === referrerToUpdate.id ? { ...c, ...referrerToUpdate } : c
      );
    }
    saveLocalCustomers(state.customers);
    onCustomersUpdated();
  }
}

async function persistCustomerUpdate(customerId, updates) {
  if (state.usingFirebase && state.db) {
    await state.db.collection("customers").doc(customerId).update(updates);
  } else {
    state.customers = state.customers.map((c) =>
      c.id === customerId ? { ...c, ...updates } : c
    );
    saveLocalCustomers(state.customers);
    onCustomersUpdated();
  }
}

async function persistCustomerDelete(customerId) {
  if (state.usingFirebase && state.db) {
    await state.db.collection("customers").doc(customerId).delete();
  } else {
    state.customers = state.customers.filter((c) => c.id !== customerId);
    saveLocalCustomers(state.customers);
    onCustomersUpdated();
  }
}

/* ==========================================================================
   4. UI HELPERS & NAVIGATION
   ========================================================================== */

function showToast(message, type = "info") {
  const container = document.getElementById("toast-container");
  if (!container) return;

  const styles = {
    success: "bg-emeraldDark text-white border-goldVip/40",
    error: "bg-rose-700 text-white border-rose-400/40",
    info: "bg-stone-900 text-white border-stone-700"
  };

  const toast = document.createElement("div");
  toast.className = `pointer-events-auto px-4 py-2.5 rounded-2xl border shadow-lg text-xs font-semibold flex items-center gap-2 transition-all duration-300 translate-y-2 opacity-0 ${styles[type] || styles.info}`;
  toast.textContent = message;
  container.appendChild(toast);

  requestAnimationFrame(() => {
    toast.classList.remove("translate-y-2", "opacity-0");
  });

  setTimeout(() => {
    toast.classList.add("translate-y-2", "opacity-0");
    setTimeout(() => toast.remove(), 300);
  }, 2600);
}

function escapeHtml(str) {
  return String(str || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function formatDate(timestamp) {
  if (!timestamp) return "—";
  return new Date(timestamp).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric"
  });
}

function navigateTo(viewName) {
  state.currentView = viewName;
  const views = ["home", "register", "existing", "card", "owner"];
  views.forEach((v) => {
    const el = document.getElementById(`view-${v}`);
    if (el) {
      el.classList.toggle("hidden", v !== viewName);
    }
  });

  if (viewName !== "card") {
    stopVipCountdown();
  }

  if (viewName === "register") {
    renderAvatarStudio();
    if (state.prefilledRefCode) {
      const refInput = document.getElementById("reg-ref-code");
      if (refInput && !refInput.value) {
        refInput.value = state.prefilledRefCode;
        updateReferralInputFeedback();
      }
    }
  } else if (viewName === "existing") {
    const input = document.getElementById("existing-search-input");
    if (input) {
      input.value = "";
      renderExistingSearchResults("");
      setTimeout(() => input.focus(), 60);
    }
  } else if (viewName === "card") {
    renderActiveLoyaltyCard();
  } else if (viewName === "owner") {
    renderOwnerPanel();
  }

  window.scrollTo({ top: 0, behavior: "smooth" });
  refreshIcons();
}

function refreshIcons() {
  if (typeof lucide !== "undefined" && lucide.createIcons) {
    lucide.createIcons();
  }
}

/* ==========================================================================
   5. AVATAR TEMPLATE STUDIO RENDERING
   ========================================================================== */

function updateAvatarPreview(animate = false) {
  const img = document.getElementById("avatar-preview-img");
  const nameEl = document.getElementById("selected-template-name");
  const ring = document.getElementById("avatar-live-ring");
  const tpl = AVATAR_TEMPLATES.find((t) => t.id === state.selectedTemplateId) || AVATAR_TEMPLATES[0];

  if (img) {
    img.src = renderAvatarSvg(state.selectedTemplateId, state.selectedBackdrop);
  }
  if (nameEl) {
    nameEl.textContent = tpl.name;
  }
  if (animate && ring) {
    ring.classList.remove("avatar-bounce");
    void ring.offsetWidth;
    ring.classList.add("avatar-bounce");
  }
}

function renderAvatarStudio() {
  const tabsEl = document.getElementById("avatar-category-tabs");
  const gridEl = document.getElementById("avatar-templates-grid");
  const swatchesEl = document.getElementById("avatar-backdrop-swatches");

  if (tabsEl) {
    tabsEl.innerHTML = AVATAR_CATEGORIES.map(
      (cat) => `
      <button type="button" data-avatar-cat="${cat.id}"
        class="avatar-cat-pill shrink-0 px-3 py-1 rounded-full text-[11px] font-bold border border-stone-200 bg-white text-stone-600 transition ${
          state.selectedAvatarCategory === cat.id ? "active" : "hover:border-emeraldRoyal/40"
        }">
        ${cat.label}
      </button>
    `
    ).join("");
  }

  if (gridEl) {
    const filtered =
      state.selectedAvatarCategory === "all"
        ? AVATAR_TEMPLATES
        : AVATAR_TEMPLATES.filter((t) => t.tags.includes(state.selectedAvatarCategory));

    gridEl.innerHTML = filtered
      .map((tpl) => {
        const isSelected = tpl.id === state.selectedTemplateId;
        const previewUri = renderAvatarSvg(tpl.id, isSelected ? state.selectedBackdrop : tpl.defaultBackdrop);
        return `
          <button type="button" data-avatar-tpl="${tpl.id}"
            class="avatar-tpl-card flex flex-col items-center p-1.5 rounded-2xl border border-stone-200 bg-white/90 ${
              isSelected ? "selected" : ""
            }">
            <img src="${previewUri}" alt="${escapeHtml(tpl.name)}" class="w-14 h-14 rounded-full object-cover shadow-xs" />
            <span class="text-[10px] font-semibold text-ink truncate w-full text-center mt-1">${escapeHtml(tpl.name)}</span>
          </button>
        `;
      })
      .join("");
  }

  if (swatchesEl) {
    swatchesEl.innerHTML = AVATAR_BACKDROPS.map(
      (swatch) => `
      <button type="button" data-backdrop-hex="${swatch.hex}" title="${swatch.label}"
        style="background-color: ${swatch.hex};"
        class="backdrop-swatch w-7 h-7 rounded-full border border-stone-300/80 ${
          state.selectedBackdrop === swatch.hex ? "selected" : ""
        }">
      </button>
    `
    ).join("");
  }

  updateAvatarPreview(false);
}

function randomizeAvatarTemplate() {
  const pool =
    state.selectedAvatarCategory === "all"
      ? AVATAR_TEMPLATES
      : AVATAR_TEMPLATES.filter((t) => t.tags.includes(state.selectedAvatarCategory));
  const list = pool.length ? pool : AVATAR_TEMPLATES;
  const randomTpl = list[Math.floor(Math.random() * list.length)];
  const randomBackdrop = AVATAR_BACKDROPS[Math.floor(Math.random() * AVATAR_BACKDROPS.length)];

  state.selectedTemplateId = randomTpl.id;
  state.selectedBackdrop = randomBackdrop.hex;
  renderAvatarStudio();
  updateAvatarPreview(true);
}

/* ==========================================================================
   6. REGISTRATION & EXISTING MEMBER SEARCH
   ========================================================================== */

function updateReferralInputFeedback() {
  const refInput = document.getElementById("reg-ref-code");
  const feedbackEl = document.getElementById("reg-ref-feedback");
  if (!refInput || !feedbackEl) return;

  const raw = refInput.value.trim();
  if (!raw) {
    feedbackEl.textContent = "";
    feedbackEl.className = "text-[11px] mt-1 min-h-[16px] text-muted";
    return;
  }

  const referrer = findCustomerByRefInput(raw);
  if (referrer) {
    feedbackEl.textContent = `Matched! ${referrer.name} (${referrer.code}) will earn +1 Stamp Circle.`;
    feedbackEl.className = "text-[11px] mt-1 min-h-[16px] text-emeraldRoyal font-semibold";
  } else {
    feedbackEl.textContent = "Code not found yet — double-check or leave blank to register directly.";
    feedbackEl.className = "text-[11px] mt-1 min-h-[16px] text-amber-700";
  }
}

async function handleRegistrationSubmit(e) {
  e.preventDefault();
  const nameInput = document.getElementById("reg-name");
  const refInput = document.getElementById("reg-ref-code");
  const submitBtn = document.getElementById("reg-submit-btn");

  const fullName = (nameInput?.value || "").trim();
  if (!fullName) {
    showToast("Please type your full name.", "error");
    nameInput?.focus();
    return;
  }

  const rawRef = (refInput?.value || "").trim();
  const referrer = rawRef ? findCustomerByRefInput(rawRef) : null;
  if (rawRef && !referrer) {
    showToast("Referral code not recognized — please check or clear it.", "error");
    refInput?.focus();
    return;
  }

  const now = Date.now();
  const newCustomer = {
    id: generateId(),
    name: fullName,
    code: generateUniqueReferralCode(),
    avatar: renderAvatarSvg(state.selectedTemplateId, state.selectedBackdrop),
    stamps: 0,
    referredByCode: referrer ? referrer.code : "",
    referredByName: referrer ? referrer.name : "",
    createdAt: now,
    vipUnlockedAt: null,
    vipExpiresAt: null
  };

  let referrerUpdate = null;
  if (referrer && (referrer.stamps || 0) < MAX_STAMPS) {
    const nextStamps = Math.min(MAX_STAMPS, (referrer.stamps || 0) + 1);
    const unlockedNow = nextStamps === MAX_STAMPS;
    referrerUpdate = {
      id: referrer.id,
      stamps: nextStamps,
      vipUnlockedAt: unlockedNow ? referrer.vipUnlockedAt || now : referrer.vipUnlockedAt || null,
      vipExpiresAt: unlockedNow ? referrer.vipExpiresAt || now + VIP_DURATION_MS : referrer.vipExpiresAt || null
    };
  }

  if (submitBtn) submitBtn.disabled = true;
  try {
    await persistNewCustomer(newCustomer, referrerUpdate);
    state.activeCustomerId = newCustomer.id;
    nameInput.value = "";
    if (refInput) refInput.value = "";
    updateReferralInputFeedback();

    showToast(
      referrerUpdate
        ? `Welcome ${fullName}! +1 stamp credited to ${referrer.name}.`
        : `Welcome ${fullName}! Your Loyalty Card is ready.`,
      "success"
    );
    navigateTo("card");
  } catch (err) {
    console.error(err);
    showToast("Could not save registration. Please try again.", "error");
  } finally {
    if (submitBtn) submitBtn.disabled = false;
  }
}

function renderExistingSearchResults(query) {
  const idleHint = document.getElementById("existing-idle-hint");
  const resultsEl = document.getElementById("existing-results-list");
  const clearBtn = document.getElementById("existing-clear-btn");

  const trimmed = (query || "").trim().toLowerCase();
  if (clearBtn) {
    clearBtn.classList.toggle("hidden", trimmed.length === 0);
  }

  // Strictly hide all customer profiles until user starts typing
  if (!trimmed) {
    idleHint?.classList.remove("hidden");
    resultsEl?.classList.add("hidden");
    if (resultsEl) resultsEl.innerHTML = "";
    return;
  }

  idleHint?.classList.add("hidden");
  resultsEl?.classList.remove("hidden");

  const matches = state.customers.filter((c) => (c.name || "").toLowerCase().includes(trimmed));

  if (!matches.length) {
    resultsEl.innerHTML = `
      <div class="py-6 text-center space-y-2">
        <p class="text-xs font-semibold text-stone-500">No profile found matching "${escapeHtml(query.trim())}"</p>
        <p class="text-[11px] text-stone-400">Check the spelling or register as a New Customer.</p>
      </div>
    `;
    return;
  }

  resultsEl.innerHTML = matches
    .map((c) => {
      const isVip = (c.stamps || 0) >= MAX_STAMPS;
      return `
      <button type="button" data-open-customer="${c.id}"
        class="w-full p-3 rounded-2xl bg-stationery/70 hover:bg-emerald-50/70 border border-stone-200 hover:border-emeraldRoyal/40 transition flex items-center justify-between gap-3 text-left active:scale-[0.99]">
        <div class="flex items-center gap-3 min-w-0">
          <img src="${c.avatar}" alt="${escapeHtml(c.name)}" class="w-12 h-12 rounded-full object-cover border-2 ${
            isVip ? "border-goldVip" : "border-emeraldRoyal/30"
          } shrink-0 bg-white" />
          <div class="min-w-0">
            <p class="font-bold text-sm text-ink truncate">${escapeHtml(c.name)}</p>
            <p class="font-mono text-[11px] font-semibold text-muted">${escapeHtml(c.code)}</p>
          </div>
        </div>
        <div class="shrink-0 flex items-center gap-2">
          ${
            isVip
              ? `<span class="px-2.5 py-1 rounded-full bg-emeraldDark text-goldVip border border-goldVip/50 text-[11px] font-bold">VIP ${MAX_STAMPS}/${MAX_STAMPS}</span>`
              : `<span class="px-2.5 py-1 rounded-full bg-emeraldRoyal/10 text-emeraldDark text-[11px] font-bold">${c.stamps || 0}/${MAX_STAMPS} Stamps</span>`
          }
          <i data-lucide="chevron-right" class="w-4 h-4 text-stone-400"></i>
        </div>
      </button>
    `;
    })
    .join("");

  refreshIcons();
}

/* ==========================================================================
   7. LOYALTY CARD & 6-MONTH VIP REVERSE COUNTDOWN
   ========================================================================== */

function stopVipCountdown() {
  if (state.countdownInterval) {
    clearInterval(state.countdownInterval);
    state.countdownInterval = null;
  }
}

function updateCountdownDigits(expiresAt) {
  const daysEl = document.getElementById("vip-cd-days");
  const hoursEl = document.getElementById("vip-cd-hours");
  const minsEl = document.getElementById("vip-cd-mins");
  const secsEl = document.getElementById("vip-cd-secs");
  if (!daysEl || !hoursEl || !minsEl || !secsEl) return;

  const diff = Math.max(0, (expiresAt || 0) - Date.now());
  const totalSeconds = Math.floor(diff / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const mins = Math.floor((totalSeconds % 3600) / 60);
  const secs = totalSeconds % 60;

  daysEl.textContent = String(days).padStart(3, "0");
  hoursEl.textContent = String(hours).padStart(2, "0");
  minsEl.textContent = String(mins).padStart(2, "0");
  secsEl.textContent = String(secs).padStart(2, "0");
}

function renderActiveLoyaltyCard() {
  stopVipCountdown();
  const shell = document.getElementById("loyalty-card-shell");
  const refBox = document.getElementById("card-referral-box");
  const refBadge = document.getElementById("card-ref-code-badge");
  if (!shell) return;

  const customer = state.customers.find((c) => c.id === state.activeCustomerId);
  if (!customer) {
    shell.className = "paper-card rounded-3xl p-6 text-center space-y-3";
    shell.innerHTML = `
      <p class="text-sm font-semibold text-muted">Customer card not found.</p>
      <button type="button" data-nav="home" class="px-4 py-2 rounded-xl bg-emeraldRoyal text-white text-xs font-bold">Back to Home</button>
    `;
    refBox?.classList.add("hidden");
    return;
  }

  const stamps = Math.min(MAX_STAMPS, Math.max(0, customer.stamps || 0));
  const isVip = stamps >= MAX_STAMPS;

  // Build 6 Stamp Circles (Star icon for earned stamps)
  const circlesHtml = Array.from({ length: MAX_STAMPS }, (_, i) => {
    const filled = i < stamps;
    if (isVip) {
      return `
        <div class="stamp-circle stamp-circle-vip aspect-square rounded-full flex items-center justify-center font-bold text-xs">
          <i data-lucide="star" class="w-5 h-5 fill-current"></i>
        </div>
      `;
    }
    if (filled) {
      return `
        <div class="stamp-circle stamp-circle-earned aspect-square rounded-full flex items-center justify-center font-bold text-xs">
          <i data-lucide="star" class="w-5 h-5 fill-current"></i>
        </div>
      `;
    }
    return `
      <div class="stamp-circle stamp-circle-empty aspect-square rounded-full flex items-center justify-center font-mono text-xs font-bold">
        ${i + 1}
      </div>
    `;
  }).join("");

  if (isVip) {
    // PERMANENT EMERALD & GOLD VIP PASS (6/6)
    const unlockedAt = customer.vipUnlockedAt || customer.createdAt || Date.now();
    const expiresAt = customer.vipExpiresAt || unlockedAt + VIP_DURATION_MS;

    shell.className = "loyalty-card-vip rounded-3xl p-5 sm:p-6 relative overflow-hidden";
    shell.innerHTML = `
      <div class="relative z-10 space-y-5">
        <!-- Top VIP Header -->
        <div class="flex items-center justify-between gap-2">
          <div class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-goldVip/15 border border-goldVip/50 text-goldLight text-[11px] font-bold tracking-widest uppercase">
            <i data-lucide="crown" class="w-3.5 h-3.5 text-goldVip"></i>
            <span>6-Month VIP Pass</span>
          </div>
          <span class="font-mono text-xs font-bold text-goldLight/90">${escapeHtml(customer.code)}</span>
        </div>

        <!-- Member Profile -->
        <div class="flex items-center gap-3.5">
          <div class="w-16 h-16 rounded-full p-0.5 bg-gradient-to-tr from-goldVip to-goldLight shrink-0 shadow-md">
            <img src="${customer.avatar}" alt="${escapeHtml(customer.name)}" class="w-full h-full rounded-full object-cover bg-white" />
          </div>
          <div class="min-w-0">
            <p class="text-[10px] uppercase tracking-widest text-emerald-200/80 font-bold">mustafaphotostate VIP</p>
            <h3 class="font-serif text-xl sm:text-2xl font-bold text-gold-gradient truncate">${escapeHtml(customer.name)}</h3>
            <p class="text-[11px] text-emerald-100/80 font-medium mt-0.5">${MAX_STAMPS}/${MAX_STAMPS} Circles Completed &bull; Permanent VIP Status</p>
          </div>
        </div>

        <!-- 6 Completed Gold Circles -->
        <div class="grid grid-cols-3 sm:grid-cols-6 gap-3 pt-1">
          ${circlesHtml}
        </div>

        <!-- Live 6-Month Reverse Countdown Timer -->
        <div class="rounded-2xl bg-black/25 border border-goldVip/35 p-4 text-center space-y-2.5">
          <p class="text-[10px] font-bold uppercase tracking-[0.2em] text-goldLight/90">VIP Pass Time Remaining</p>
          <div class="grid grid-cols-4 gap-2 font-mono">
            <div class="rounded-xl bg-white/5 border border-white/10 py-2">
              <span id="vip-cd-days" class="block text-xl sm:text-2xl font-bold text-goldVip leading-none">180</span>
              <span class="block text-[9px] uppercase tracking-wider text-emerald-100/70 mt-1">Days</span>
            </div>
            <div class="rounded-xl bg-white/5 border border-white/10 py-2">
              <span id="vip-cd-hours" class="block text-xl sm:text-2xl font-bold text-white leading-none">00</span>
              <span class="block text-[9px] uppercase tracking-wider text-emerald-100/70 mt-1">Hours</span>
            </div>
            <div class="rounded-xl bg-white/5 border border-white/10 py-2">
              <span id="vip-cd-mins" class="block text-xl sm:text-2xl font-bold text-white leading-none">00</span>
              <span class="block text-[9px] uppercase tracking-wider text-emerald-100/70 mt-1">Mins</span>
            </div>
            <div class="rounded-xl bg-white/5 border border-white/10 py-2">
              <span id="vip-cd-secs" class="block text-xl sm:text-2xl font-bold text-goldLight leading-none">00</span>
              <span class="block text-[9px] uppercase tracking-wider text-emerald-100/70 mt-1">Secs</span>
            </div>
          </div>
          <div class="flex items-center justify-between text-[11px] text-emerald-100/80 pt-1 border-t border-white/10">
            <span>Unlocked: <strong class="text-white">${formatDate(unlockedAt)}</strong></span>
            <span>Expires: <strong class="text-goldLight">${formatDate(expiresAt)}</strong></span>
          </div>
        </div>
      </div>
    `;

    // Hide referral instructions below card once VIP is unlocked
    refBox?.classList.add("hidden");

    updateCountdownDigits(expiresAt);
    state.countdownInterval = setInterval(() => updateCountdownDigits(expiresAt), 1000);
  } else {
    // STANDARD LOYALTY CARD (0-5 STAMPS)
    shell.className = "loyalty-card-standard rounded-3xl p-5 sm:p-6 relative overflow-hidden";
    shell.innerHTML = `
      <div class="relative z-10 space-y-5">
        <div class="flex items-center justify-between gap-2">
          <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emeraldRoyal/10 text-emeraldRoyal text-[11px] font-bold">
            <i data-lucide="award" class="w-3.5 h-3.5"></i>
            <span>Loyalty Member</span>
          </span>
          <span class="font-mono text-xs font-bold px-2.5 py-1 rounded-full bg-white border border-stone-200 text-ink">
            ${escapeHtml(customer.code)}
          </span>
        </div>

        <div class="flex items-center gap-3.5">
          <div class="w-16 h-16 rounded-full p-0.5 bg-gradient-to-tr from-emeraldRoyal to-goldVip shrink-0 shadow-sm">
            <img src="${customer.avatar}" alt="${escapeHtml(customer.name)}" class="w-full h-full rounded-full object-cover bg-white" />
          </div>
          <div class="min-w-0">
            <p class="text-[11px] font-semibold text-muted">mustafaphotostate</p>
            <h3 class="font-serif text-xl font-bold text-ink truncate">${escapeHtml(customer.name)}</h3>
            <p class="text-xs font-bold text-emeraldRoyal mt-0.5">${stamps} / ${MAX_STAMPS} Stamp Circles Collected</p>
          </div>
        </div>

        <!-- 6 Stamp Circles -->
        <div class="grid grid-cols-3 sm:grid-cols-6 gap-3 pt-1">
          ${circlesHtml}
        </div>

        <div class="text-center text-[11px] font-medium text-muted pt-1">
          Collect <strong class="text-emeraldDark">${MAX_STAMPS - stamps} more</strong> stamp${MAX_STAMPS - stamps === 1 ? "" : "s"} to unlock your <strong>6-Month VIP Pass</strong>!
        </div>
      </div>
    `;

    if (refBadge) refBadge.textContent = customer.code;
    refBox?.classList.remove("hidden");
  }

  refreshIcons();
}

async function copyActiveReferralCode() {
  const customer = state.customers.find((c) => c.id === state.activeCustomerId);
  if (!customer) return;

  try {
    await navigator.clipboard.writeText(customer.code);
    showToast(`Copied ${customer.code} to clipboard!`, "success");
  } catch {
    // Fallback for restricted contexts
    const temp = document.createElement("input");
    temp.value = customer.code;
    document.body.appendChild(temp);
    temp.select();
    document.execCommand("copy");
    temp.remove();
    showToast(`Copied ${customer.code}!`, "success");
  }
}

/* ==========================================================================
   8. OWNER ADMIN PANEL (PIN 1234, STATS, UNIFIED SEARCH, TABS)
   ========================================================================== */

function updateHeaderOwnerButton() {
  const lockIcon = document.getElementById("owner-lock-icon");
  const lockActionBtn = document.getElementById("owner-lock-action-btn");
  if (lockIcon) {
    lockIcon.setAttribute("data-lucide", state.ownerUnlocked ? "unlock" : "lock");
    lockIcon.className = state.ownerUnlocked
      ? "w-3.5 h-3.5 text-emeraldRoyal"
      : "w-3.5 h-3.5 text-stone-500";
  }
  if (lockActionBtn) {
    lockActionBtn.classList.toggle("hidden", !state.ownerUnlocked);
  }
  refreshIcons();
}

function renderOwnerPanel() {
  const pinGate = document.getElementById("owner-pin-gate");
  const dashboard = document.getElementById("owner-dashboard");

  updateHeaderOwnerButton();

  if (!state.ownerUnlocked) {
    pinGate?.classList.remove("hidden");
    dashboard?.classList.add("hidden");
    return;
  }

  pinGate?.classList.add("hidden");
  dashboard?.classList.remove("hidden");

  // Summary Counters
  const total = state.customers.length;
  const vips = state.customers.filter((c) => (c.stamps || 0) >= MAX_STAMPS);
  const active = state.customers.filter((c) => (c.stamps || 0) < MAX_STAMPS);

  const statTotal = document.getElementById("stat-total");
  const statActive = document.getElementById("stat-active");
  const statVips = document.getElementById("stat-vips");
  if (statTotal) statTotal.textContent = total;
  if (statActive) statActive.textContent = active.length;
  if (statVips) statVips.textContent = vips.length;

  // Tab states
  document.getElementById("tab-in-progress")?.classList.toggle("active", state.ownerTab === "progress");
  document.getElementById("tab-vip-record")?.classList.toggle("active", state.ownerTab === "vip");

  // Unified Search Filter (Name OR Code including full MPS-4821 or just 4821)
  const q = state.ownerSearch.trim().toLowerCase();
  const clearBtn = document.getElementById("owner-search-clear");
  clearBtn?.classList.toggle("hidden", q.length === 0);

  const filterList = (list) => {
    if (!q) return list;
    return list.filter((c) => {
      const name = (c.name || "").toLowerCase();
      const code = (c.code || "").toLowerCase();
      const shortCode = code.replace("mps-", "");
      return name.includes(q) || code.includes(q) || shortCode.includes(q);
    });
  };

  const listContainer = document.getElementById("owner-list-container");
  if (!listContainer) return;

  if (state.ownerTab === "progress") {
    const filtered = filterList(active);
    if (!filtered.length) {
      listContainer.innerHTML = `
        <div class="paper-card rounded-2xl p-8 text-center text-xs text-muted">
          ${q ? `No active customers matching "${escapeHtml(state.ownerSearch.trim())}".` : "No active (0–5) customers yet."}
        </div>
      `;
      return;
    }

    listContainer.innerHTML = filtered
      .map((c) => {
        const stamps = Math.min(MAX_STAMPS, Math.max(0, c.stamps || 0));
        const isConfirmingDelete = state.pendingDeleteId === c.id;
        const bars = Array.from({ length: MAX_STAMPS }, (_, idx) => {
          const filled = idx < stamps;
          return `<span class="h-2 flex-1 rounded-full ${filled ? "bg-emeraldRoyal" : "bg-stone-200"}"></span>`;
        }).join("");

        const referredText = c.referredByCode
          ? `Referred by: <strong class="text-emeraldDark">${escapeHtml(c.referredByName || "")} (${escapeHtml(c.referredByCode)})</strong>`
          : `Direct Sign-up`;

        return `
        <div class="paper-card rounded-2xl p-4 space-y-3">
          <div class="flex items-start justify-between gap-3">
            <div class="flex items-center gap-3 min-w-0">
              <img src="${c.avatar}" alt="${escapeHtml(c.name)}" class="w-12 h-12 rounded-full object-cover border border-stone-200 bg-white shrink-0" />
              <div class="min-w-0">
                <div class="flex items-center gap-2 flex-wrap">
                  <p class="font-bold text-sm text-ink truncate">${escapeHtml(c.name)}</p>
                  <span class="font-mono text-[11px] font-bold px-2 py-0.5 rounded-md bg-stone-100 text-stone-700">${escapeHtml(c.code)}</span>
                </div>
                <p class="text-[11px] text-muted mt-0.5">${referredText}</p>
              </div>
            </div>
            <span class="shrink-0 text-xs font-extrabold text-emeraldRoyal font-mono">${stamps}/${MAX_STAMPS}</span>
          </div>

          <!-- 6-Bar Progress Meter -->
          <div class="flex items-center gap-1">
            ${bars}
          </div>

          <!-- Controls: -1, +1 Circle, Delete Confirmation -->
          <div class="flex items-center justify-between gap-2 pt-1">
            <div class="flex items-center gap-2">
              <button type="button" data-stamp-delta="-1" data-cust-id="${c.id}" ${stamps <= 0 ? "disabled" : ""}
                class="px-3 py-1.5 rounded-xl bg-stone-100 hover:bg-stone-200 disabled:opacity-40 disabled:pointer-events-none text-ink text-xs font-bold active:scale-95 transition">
                -1
              </button>
              <button type="button" data-stamp-delta="1" data-cust-id="${c.id}"
                class="px-3.5 py-1.5 rounded-xl bg-emeraldRoyal hover:bg-emeraldDark text-white text-xs font-bold shadow-xs active:scale-95 transition flex items-center gap-1">
                <i data-lucide="plus" class="w-3.5 h-3.5"></i>
                <span>1 Circle</span>
              </button>
            </div>

            ${
              isConfirmingDelete
                ? `
              <div class="flex items-center gap-1.5">
                <button type="button" data-confirm-delete="${c.id}"
                  class="px-2.5 py-1.5 rounded-xl bg-rose-600 text-white text-[11px] font-bold hover:bg-rose-700 active:scale-95 transition">
                  Confirm Delete
                </button>
                <button type="button" data-cancel-delete="1"
                  class="px-2.5 py-1.5 rounded-xl bg-stone-100 text-stone-600 text-[11px] font-bold hover:bg-stone-200 transition">
                  Cancel
                </button>
              </div>
            `
                : `
              <button type="button" data-ask-delete="${c.id}" title="Delete Customer"
                class="p-2 rounded-xl text-stone-400 hover:text-rose-600 hover:bg-rose-50 transition">
                <i data-lucide="trash-2" class="w-4 h-4"></i>
              </button>
            `
            }
          </div>
        </div>
      `;
      })
      .join("");
  } else {
    const filteredVips = filterList(vips);
    if (!filteredVips.length) {
      listContainer.innerHTML = `
        <div class="paper-card rounded-2xl p-8 text-center text-xs text-muted">
          ${q ? `No VIP members matching "${escapeHtml(state.ownerSearch.trim())}".` : `No VIPs unlocked yet (${MAX_STAMPS}/${MAX_STAMPS} circles required).`}
        </div>
      `;
      return;
    }

    listContainer.innerHTML = filteredVips
      .map((c) => {
        const unlockedAt = c.vipUnlockedAt || c.createdAt || Date.now();
        const expiresAt = c.vipExpiresAt || unlockedAt + VIP_DURATION_MS;
        const remainingMs = Math.max(0, expiresAt - Date.now());
        const remainingDays = Math.ceil(remainingMs / (24 * 60 * 60 * 1000));
        const isExpired = remainingMs <= 0;

        return `
        <div class="rounded-2xl p-4 bg-gradient-to-br from-emeraldDark to-stone-900 text-white border border-goldVip/50 shadow-md space-y-3">
          <div class="flex items-center justify-between gap-3">
            <div class="flex items-center gap-3 min-w-0">
              <img src="${c.avatar}" alt="${escapeHtml(c.name)}" class="w-12 h-12 rounded-full object-cover border-2 border-goldVip bg-white shrink-0" />
              <div class="min-w-0">
                <div class="flex items-center gap-2 flex-wrap">
                  <p class="font-serif font-bold text-base text-goldLight truncate">${escapeHtml(c.name)}</p>
                  <span class="font-mono text-[11px] font-bold px-2 py-0.5 rounded-md bg-white/10 text-goldLight">${escapeHtml(c.code)}</span>
                </div>
                <p class="text-[11px] text-emerald-100/80">${MAX_STAMPS}/${MAX_STAMPS} VIP Pass &bull; Permanent Record</p>
              </div>
            </div>

            <span class="shrink-0 px-2.5 py-1 rounded-full text-[11px] font-bold ${
              isExpired
                ? "bg-rose-500/20 text-rose-200 border border-rose-400/40"
                : "bg-goldVip/20 text-goldLight border border-goldVip/50"
            }">
              ${isExpired ? "Expired" : `${remainingDays}d left`}
            </span>
          </div>

          <div class="grid grid-cols-2 gap-2 pt-2 border-t border-white/10 text-[11px]">
            <div class="rounded-xl bg-white/5 px-3 py-2">
              <span class="block text-emerald-200/70 text-[10px] uppercase tracking-wider">Unlocked On</span>
              <strong class="text-white font-semibold">${formatDate(unlockedAt)}</strong>
            </div>
            <div class="rounded-xl bg-white/5 px-3 py-2">
              <span class="block text-emerald-200/70 text-[10px] uppercase tracking-wider">6-Month Expiry</span>
              <strong class="text-goldLight font-semibold">${formatDate(expiresAt)}</strong>
            </div>
          </div>
        </div>
      `;
      })
      .join("");
  }

  refreshIcons();
}

async function adjustCustomerStamps(customerId, delta) {
  const customer = state.customers.find((c) => c.id === customerId);
  if (!customer) return;

  // Never reset or alter a permanent 6/6 VIP card
  if ((customer.stamps || 0) >= MAX_STAMPS) {
    showToast("VIP Pass is permanent and cannot be reset.", "info");
    return;
  }

  const nextStamps = Math.min(MAX_STAMPS, Math.max(0, (customer.stamps || 0) + delta));
  const now = Date.now();
  const updates = { stamps: nextStamps };

  if (nextStamps === MAX_STAMPS) {
    updates.vipUnlockedAt = now;
    updates.vipExpiresAt = now + VIP_DURATION_MS;
  }

  try {
    await persistCustomerUpdate(customerId, updates);
    if (nextStamps === MAX_STAMPS) {
      showToast(`${customer.name} reached ${MAX_STAMPS}/${MAX_STAMPS}! 6-Month VIP unlocked!`, "success");
    } else {
      showToast(`Updated ${customer.name}: ${nextStamps}/${MAX_STAMPS} stamps`, "info");
    }
  } catch (err) {
    console.error(err);
    showToast("Failed to update stamp.", "error");
  }
}

/* ==========================================================================
   9. GLOBAL REACTIVE REFRESH & EVENT BINDINGS
   ========================================================================== */

function onCustomersUpdated() {
  if (state.currentView === "card") {
    renderActiveLoyaltyCard();
  } else if (state.currentView === "owner" && state.ownerUnlocked) {
    renderOwnerPanel();
  } else if (state.currentView === "existing") {
    const query = document.getElementById("existing-search-input")?.value || "";
    if (query.trim()) {
      renderExistingSearchResults(query);
    }
  } else if (state.currentView === "register") {
    updateReferralInputFeedback();
  }
}

function initEventListeners() {
  // Navigation shortcuts
  document.getElementById("brand-home-btn")?.addEventListener("click", () => navigateTo("home"));
  document.getElementById("btn-go-new")?.addEventListener("click", () => navigateTo("register"));
  document.getElementById("btn-go-existing")?.addEventListener("click", () => navigateTo("existing"));
  document.getElementById("owner-toggle-btn")?.addEventListener("click", () => navigateTo("owner"));

  document.addEventListener("click", (e) => {
    const navBtn = e.target.closest("[data-nav]");
    if (navBtn) {
      navigateTo(navBtn.getAttribute("data-nav"));
      return;
    }

    const catBtn = e.target.closest("[data-avatar-cat]");
    if (catBtn) {
      state.selectedAvatarCategory = catBtn.getAttribute("data-avatar-cat");
      renderAvatarStudio();
      return;
    }

    const tplBtn = e.target.closest("[data-avatar-tpl]");
    if (tplBtn) {
      state.selectedTemplateId = tplBtn.getAttribute("data-avatar-tpl");
      const tpl = AVATAR_TEMPLATES.find((t) => t.id === state.selectedTemplateId);
      if (tpl) {
        state.selectedBackdrop = tpl.defaultBackdrop;
      }
      renderAvatarStudio();
      updateAvatarPreview(true);
      return;
    }

    const swatchBtn = e.target.closest("[data-backdrop-hex]");
    if (swatchBtn) {
      state.selectedBackdrop = swatchBtn.getAttribute("data-backdrop-hex");
      renderAvatarStudio();
      updateAvatarPreview(true);
      return;
    }

    const openCustBtn = e.target.closest("[data-open-customer]");
    if (openCustBtn) {
      state.activeCustomerId = openCustBtn.getAttribute("data-open-customer");
      navigateTo("card");
      return;
    }

    const deltaBtn = e.target.closest("[data-stamp-delta]");
    if (deltaBtn) {
      const custId = deltaBtn.getAttribute("data-cust-id");
      const delta = parseInt(deltaBtn.getAttribute("data-stamp-delta"), 10);
      adjustCustomerStamps(custId, delta);
      return;
    }

    const askDeleteBtn = e.target.closest("[data-ask-delete]");
    if (askDeleteBtn) {
      state.pendingDeleteId = askDeleteBtn.getAttribute("data-ask-delete");
      renderOwnerPanel();
      return;
    }

    const cancelDeleteBtn = e.target.closest("[data-cancel-delete]");
    if (cancelDeleteBtn) {
      state.pendingDeleteId = null;
      renderOwnerPanel();
      return;
    }

    const confirmDeleteBtn = e.target.closest("[data-confirm-delete]");
    if (confirmDeleteBtn) {
      const custId = confirmDeleteBtn.getAttribute("data-confirm-delete");
      state.pendingDeleteId = null;
      persistCustomerDelete(custId)
        .then(() => showToast("Customer removed.", "info"))
        .catch(() => showToast("Failed to delete customer.", "error"));
      return;
    }
  });

  // Randomize Avatar Template
  document.getElementById("btn-randomize-avatar")?.addEventListener("click", randomizeAvatarTemplate);

  // Registration Form
  document.getElementById("register-form")?.addEventListener("submit", handleRegistrationSubmit);
  document.getElementById("reg-ref-code")?.addEventListener("input", updateReferralInputFeedback);

  // Existing Member Search
  const existingInput = document.getElementById("existing-search-input");
  existingInput?.addEventListener("input", (e) => renderExistingSearchResults(e.target.value));
  document.getElementById("existing-clear-btn")?.addEventListener("click", () => {
    if (existingInput) {
      existingInput.value = "";
      renderExistingSearchResults("");
      existingInput.focus();
    }
  });

  // Copy Referral Code on Loyalty Card
  document.getElementById("btn-copy-ref-code")?.addEventListener("click", copyActiveReferralCode);

  // Owner PIN Gate & Lock Toggle
  document.getElementById("owner-pin-form")?.addEventListener("submit", (e) => {
    e.preventDefault();
    const pinInput = document.getElementById("owner-pin-input");
    const pinError = document.getElementById("owner-pin-error");
    if ((pinInput?.value || "").trim() === OWNER_PIN) {
      state.ownerUnlocked = true;
      if (pinInput) pinInput.value = "";
      pinError?.classList.add("hidden");
      renderOwnerPanel();
      showToast("Owner Panel unlocked", "success");
    } else {
      pinError?.classList.remove("hidden");
      pinInput?.select();
    }
  });

  document.getElementById("owner-lock-action-btn")?.addEventListener("click", () => {
    state.ownerUnlocked = false;
    state.pendingDeleteId = null;
    renderOwnerPanel();
    showToast("Owner Panel locked", "info");
  });

  // Owner Unified Search & Tabs
  const ownerSearchInput = document.getElementById("owner-search-input");
  ownerSearchInput?.addEventListener("input", (e) => {
    state.ownerSearch = e.target.value;
    renderOwnerPanel();
  });
  document.getElementById("owner-search-clear")?.addEventListener("click", () => {
    state.ownerSearch = "";
    if (ownerSearchInput) ownerSearchInput.value = "";
    renderOwnerPanel();
    ownerSearchInput?.focus();
  });

  document.getElementById("tab-in-progress")?.addEventListener("click", () => {
    state.ownerTab = "progress";
    renderOwnerPanel();
  });
  document.getElementById("tab-vip-record")?.addEventListener("click", () => {
    state.ownerTab = "vip";
    renderOwnerPanel();
  });
}

function checkUrlReferralParam() {
  try {
    const params = new URLSearchParams(window.location.search);
    const ref = params.get("ref");
    if (ref && ref.trim()) {
      const normalized = normalizeReferralInput(ref);
      state.prefilledRefCode = normalized;
      const banner = document.getElementById("home-ref-banner");
      const codeEl = document.getElementById("home-ref-code");
      if (banner && codeEl) {
        codeEl.textContent = normalized;
        banner.classList.remove("hidden");
      }
    }
  } catch (err) {
    console.warn("Unable to read URL params:", err);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  checkUrlReferralParam();
  initEventListeners();
  initStorageAndSync();
  renderAvatarStudio();
  refreshIcons();
});
