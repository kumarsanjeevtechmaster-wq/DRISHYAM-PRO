const fs = require('fs');
const path = require('path');

const jsPath = path.join(__dirname, 'assets', 'index-7a6zugIB.js');
let code = fs.readFileSync(jsPath, 'utf8');

// 1. Update the call site in switch(d) to pass `view: d`
const oldCall = 'default:return c.jsx(iA,{title:O,desc:oA[d]??"This module is under development."})';
const newCall = 'default:return c.jsx(iA,{title:O,desc:oA[d]??"This module is under development.",view:d})';

if (!code.includes(oldCall)) {
  console.error("Could not find oldCall in index-7a6zugIB.js!");
  process.exit(1);
}
code = code.replace(oldCall, newCall);

// 2. Define the Phase 2 code to replace `function iA({title:u,desc:M}){...}`
const oldFuncStart = 'function iA({title:u,desc:M}){';
const oldFuncEnd = '})]})})}';
const startIdx = code.indexOf(oldFuncStart);
if (startIdx === -1) {
  console.error("Could not find oldFuncStart in index-7a6zugIB.js!");
  process.exit(1);
}
const endIdx = code.indexOf(oldFuncEnd, startIdx) + oldFuncEnd.length;
const oldFunc = code.substring(startIdx, endIdx);

console.log("Found old iA function:", oldFunc.substring(0, 80), "... length:", oldFunc.length);

const phase2Components = `
function AstrologyView() {
  const [tab, setTab] = J.useState("transits");
  const [horaryNum, setHoraryNum] = J.useState(77);
  const [calculatedSubLord, setCalculatedSubLord] = J.useState(null);

  const transits = [
    { planet: "Sun (Surya)", sign: "Scorpio (Vrischika)", house: "4th House", status: "Neutral / Focused", effect: "Family life, intellectual depth, property focus and inner stability." },
    { planet: "Jupiter (Guru)", sign: "Taurus (Vrishabha)", house: "10th House", status: "Exalted Aspect", effect: "Massive career expansion, professional authority, aspecting 2nd, 4th & 6th houses." },
    { planet: "Saturn (Shani)", sign: "Aquarius (Kumbha)", house: "7th House", status: "Moolatrikona / Shash Yoga", effect: "Disciplined partnerships, long-term contracts, Sade Sati Rising phase endurance." },
    { planet: "Rahu & Ketu", sign: "Pisces & Virgo", house: "8th & 2nd Houses", status: "Karmic Axis", effect: "Mystical spiritual awakenings, family savings realignment, sharp intuition." }
  ];

  const ashtakavarga = [
    { house: 1, name: "Tanu (Self)", bindus: 29 },
    { house: 2, name: "Dhana (Wealth)", bindus: 31 },
    { house: 3, name: "Sahaja (Courage)", bindus: 28 },
    { house: 4, name: "Sukha (Home)", bindus: 33 },
    { house: 5, name: "Putra (Creativity)", bindus: 30 },
    { house: 6, name: "Ari (Victory)", bindus: 32 },
    { house: 7, name: "Yuvati (Partnership)", bindus: 27 },
    { house: 8, name: "Randhra (Occult)", bindus: 26 },
    { house: 9, name: "Dharma (Fortune)", bindus: 31 },
    { house: 10, name: "Karma (Career)", bindus: 34 },
    { house: 11, name: "Labha (Gains)", bindus: 38 },
    { house: 12, name: "Vyaya (Liberation)", bindus: 25 }
  ];

  return c.jsxs("div", { className: "space-y-6 px-4 py-5 lg:px-8 lg:py-7", children: [
    c.jsxs("div", { className: "flex flex-wrap items-center justify-between gap-3 border-b border-sandal-200 pb-4 dark:border-cosmos-800", children: [
      c.jsxs("div", { children: [
        c.jsx("h1", { className: "font-display text-2xl font-bold text-sandal-900 dark:text-white", children: "Vedic Astrology & Transits Suite" }),
        c.jsx("p", { className: "text-sm text-sandal-500 dark:text-sandal-400", children: "Real-time Gochara, KP Horary, Lal Kitab Farman & Ashtakavarga" })
      ]}),
      c.jsxs("div", { className: "flex gap-2 rounded-xl bg-sandal-100 p-1 dark:bg-cosmos-900", children: [
        c.jsx("button", { onClick: () => setTab("transits"), className: "rounded-lg px-3 py-1.5 text-xs font-semibold transition " + (tab === "transits" ? "bg-saffron-500 text-white shadow" : "text-sandal-600 dark:text-sandal-300"), children: "🪐 Transits (Gochara)" }),
        c.jsx("button", { onClick: () => setTab("kp"), className: "rounded-lg px-3 py-1.5 text-xs font-semibold transition " + (tab === "kp" ? "bg-saffron-500 text-white shadow" : "text-sandal-600 dark:text-sandal-300"), children: "🔮 KP Horary" }),
        c.jsx("button", { onClick: () => setTab("lalkitab"), className: "rounded-lg px-3 py-1.5 text-xs font-semibold transition " + (tab === "lalkitab" ? "bg-saffron-500 text-white shadow" : "text-sandal-600 dark:text-sandal-300"), children: "📜 Lal Kitab" }),
        c.jsx("button", { onClick: () => setTab("ashtakavarga"), className: "rounded-lg px-3 py-1.5 text-xs font-semibold transition " + (tab === "ashtakavarga" ? "bg-saffron-500 text-white shadow" : "text-sandal-600 dark:text-sandal-300"), children: "🧮 Ashtakavarga" })
      ]})
    ]}),

    tab === "transits" && c.jsxs("div", { className: "space-y-4", children: [
      c.jsxs("div", { className: "grid gap-4 sm:grid-cols-2", children: transits.map(t => c.jsxs("div", { key: t.planet, className: "premium-card p-5", children: [
        c.jsxs("div", { className: "flex items-center justify-between", children: [
          c.jsx("span", { className: "font-semibold text-sandal-900 dark:text-white", children: t.planet }),
          c.jsx("span", { className: "chip bg-saffron-100 text-saffron-700 dark:bg-saffron-500/20 dark:text-saffron-300", children: t.house })
        ]}),
        c.jsxs("div", { className: "mt-2 text-xs font-medium text-saffron-600 dark:text-saffron-400", children: [t.sign, " · ", t.status] }),
        c.jsx("p", { className: "mt-2 text-sm text-sandal-600 dark:text-sandal-300", children: t.effect })
      ]}))}),
      c.jsxs("div", { className: "premium-card border border-gold-300/40 bg-gradient-to-r from-gold-500/10 via-saffron-500/10 to-transparent p-5", children: [
        c.jsx("h3", { className: "font-semibold text-sandal-900 dark:text-white", children: "🌟 Active Cosmic High Point for Arjun (Leo Lagna)" }),
        c.jsx("p", { className: "mt-1 text-sm text-sandal-600 dark:text-sandal-300", children: "Jupiter in 10th house is forming a powerful Trine aspect on your 2nd house of accumulated wealth. Best period for career advancement and long-term asset acquisitions." })
      ]})
    ]}),

    tab === "kp" && c.jsxs("div", { className: "space-y-4", children: [
      c.jsxs("div", { className: "premium-card p-5", children: [
        c.jsx("h3", { className: "section-title mb-2", children: "KP Horary (Prashna Kundli · 1 to 249)" }),
        c.jsx("p", { className: "text-sm text-sandal-500 dark:text-sandal-400 mb-4", children: "Choose any intuitive integer from 1 to 249 to calculate the exact Cuspal Sub-Lord for your question." }),
        c.jsxs("div", { className: "flex max-w-md gap-3", children: [
          c.jsx("input", { type: "number", min: 1, max: 249, value: horaryNum, onChange: e => setHoraryNum(Number(e.target.value)), className: "w-32 rounded-xl border border-sandal-200 bg-white px-3 py-2 text-center text-lg font-bold dark:border-cosmos-700 dark:bg-cosmos-900 dark:text-white" }),
          c.jsx("button", { onClick: () => setCalculatedSubLord({ signLord: "Mars", starLord: "Jupiter", subLord: "Venus", rulingHouse: "11th House (Wish Fulfillment)" }), className: "rounded-xl bg-gradient-to-r from-saffron-500 to-gold-500 px-5 py-2 font-semibold text-white shadow-soft transition hover:opacity-95", children: "Calculate Sub-Lord" })
        ]}),
        calculatedSubLord && c.jsxs("div", { className: "mt-5 rounded-2xl bg-sandal-50 p-4 dark:bg-cosmos-900/60", children: [
          c.jsx("div", { className: "font-display text-base font-bold text-sandal-900 dark:text-white", children: "Horary Number: " + horaryNum + " Analysis" }),
          c.jsxs("div", { className: "mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4", children: [
            c.jsxs("div", { className: "rounded-xl bg-white p-3 dark:bg-cosmos-800", children: [c.jsx("div", { className: "text-xs text-sandal-400", children: "Sign Lord" }), c.jsx("div", { className: "font-semibold text-sandal-800 dark:text-white", children: calculatedSubLord.signLord })] }),
            c.jsxs("div", { className: "rounded-xl bg-white p-3 dark:bg-cosmos-800", children: [c.jsx("div", { className: "text-xs text-sandal-400", children: "Star Lord" }), c.jsx("div", { className: "font-semibold text-sandal-800 dark:text-white", children: calculatedSubLord.starLord })] }),
            c.jsxs("div", { className: "rounded-xl bg-white p-3 dark:bg-cosmos-800", children: [c.jsx("div", { className: "text-xs text-sandal-400", children: "Sub-Lord" }), c.jsx("div", { className: "font-bold text-saffron-600 dark:text-saffron-400", children: calculatedSubLord.subLord })] }),
            c.jsxs("div", { className: "rounded-xl bg-white p-3 dark:bg-cosmos-800", children: [c.jsx("div", { className: "text-xs text-sandal-400", children: "Promised Event" }), c.jsx("div", { className: "font-semibold text-green-600 dark:text-green-400", children: "Highly Favorable" })] })
          ]}),
          c.jsx("p", { className: "mt-3 text-xs text-sandal-500 dark:text-sandal-400", children: "The sub-lord Venus signifies 2, 7, and 11th cusps, indicating fruitful outcomes and successful conclusion of desired ventures." })
        ]})
      ]})
    ]}),

    tab === "lalkitab" && c.jsxs("div", { className: "space-y-4", children: [
      c.jsxs("div", { className: "premium-card p-5", children: [
        c.jsx("h3", { className: "section-title mb-1", children: "Lal Kitab Farman & Varshphal 2026" }),
        c.jsx("p", { className: "text-sm text-sandal-500 dark:text-sandal-400 mb-4", children: "Unique empirical astrology system focused on karmic debt and simple remedies (Totke)." }),
        c.jsxs("div", { className: "space-y-3", children: [
          c.jsxs("div", { className: "rounded-xl border border-sandal-100 p-4 dark:border-cosmos-800", children: [
            c.jsx("div", { className: "font-semibold text-sandal-900 dark:text-white", children: "🛡️ Varshphal Planet of the Year: Jupiter in 10th" }),
            c.jsx("p", { className: "mt-1 text-sm text-sandal-600 dark:text-sandal-300", children: "Jupiter in the 10th house is considered 'Soya Hua' (Dormant). It awakens when you respect elders, maintain clean moral conduct in business, and avoid wearing yellow near heavy machinery." })
          ]}),
          c.jsxs("div", { className: "rounded-xl border border-sandal-100 p-4 dark:border-cosmos-800", children: [
            c.jsx("div", { className: "font-semibold text-sandal-900 dark:text-white", children: "🪙 Remedy: Shani Ki Shanti (Saturn 7th House)" }),
            c.jsx("p", { className: "mt-1 text-sm text-sandal-600 dark:text-sandal-300", children: "Keep a small solid silver ball (चांदी की ठोस गोली) in your wallet. Do not consume alcohol or meat on Saturdays." })
          ]}),
          c.jsxs("div", { className: "rounded-xl border border-sandal-100 p-4 dark:border-cosmos-800", children: [
            c.jsx("div", { className: "font-semibold text-sandal-900 dark:text-white", children: "🌿 Pitra Rin (Ancestral Debt) Status" }),
            c.jsx("p", { className: "mt-1 text-sm text-sandal-600 dark:text-sandal-300", children: "Cleared. No major ancestral curse detected. Feeding stray cows and birds on Thursdays continues your positive momentum." })
          ]})
        ]})
      ]})
    ]}),

    tab === "ashtakavarga" && c.jsxs("div", { className: "space-y-4", children: [
      c.jsxs("div", { className: "premium-card p-5", children: [
        c.jsx("h3", { className: "section-title mb-1", children: "Sarvashtakavarga Score Distribution (Total: 337 Bindus)" }),
        c.jsx("p", { className: "text-sm text-sandal-500 dark:text-sandal-400 mb-4", children: "Houses with 28+ Bindus denote strength, stability, and high capacity to deliver auspicious results." }),
        c.jsx("div", { className: "grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-6", children: ashtakavarga.map(a => c.jsxs("div", { key: a.house, className: "rounded-xl border p-3 text-center " + (a.bindus >= 32 ? "border-green-300 bg-green-50/50 dark:border-green-800 dark:bg-green-950/20" : a.bindus >= 28 ? "border-sandal-200 bg-white dark:border-cosmos-800 dark:bg-cosmos-900" : "border-red-200 bg-red-50/30 dark:border-red-900/40 dark:bg-red-950/20"), children: [
          c.jsx("div", { className: "text-xs font-semibold text-sandal-500 dark:text-sandal-400", children: "House " + a.house }),
          c.jsx("div", { className: "my-1 font-display text-2xl font-bold " + (a.bindus >= 32 ? "text-green-600 dark:text-green-400" : "text-sandal-900 dark:text-white"), children: a.bindus }),
          c.jsx("div", { className: "text-[11px] text-sandal-400", children: a.name })
        ]}))}),
        c.jsxs("div", { className: "mt-4 rounded-xl bg-saffron-50 p-3 text-xs text-saffron-800 dark:bg-saffron-950/30 dark:text-saffron-300", children: [
          c.jsx("strong", { children: "Key Insight: " }),
          "Your 11th House (Gains/Income) has 38 points, while 12th House (Losses) has only 25 points. This ratio (38 > 25) indicates exceptional long-term financial accumulation and prosperity."
        ]})
      ]})
    ]})
  ]});
}

function PalmistryView() {
  const [hand, setHand] = J.useState("right");
  const [selectedLine, setSelectedLine] = J.useState("life");

  const lines = {
    life: { name: "Life Line (जीवन रेखा)", length: "Long & Unbroken", score: "88+ Years Vitality", detail: "Deep, reddish tint around Venus mount. High natural immunity, strong regenerative powers, and vibrant physical longevity." },
    heart: { name: "Heart Line (हृदय रेखा)", length: "Curved to Jupiter Mount", score: "Devoted & Empathetic", detail: "Ends cleanly below index finger. Signifies noble emotional character, deep family devotion, and strong moral empathy in relationships." },
    head: { name: "Head Line (मस्तिष्क रेखा)", length: "Slight Slope to Moon", score: "Strategic Intellect", detail: "Combines sharp analytical reason with creative intuition. Exceptional aptitude for strategic decision making and leadership." },
    fate: { name: "Fate Line (भाग्य रेखा)", length: "Originates from Mount of Moon", score: "Independent Career Rise", detail: "Indicates career advancement driven by personal merit, public popularity, and successful independent enterprises." },
    sun: { name: "Sun Line (सूर्य रेखा)", length: "Clear from Age 32+", score: "Fame & Respect", detail: "Parallel to Fate line. Confirms artistic appreciation, professional repute, and social recognition in your chosen field." }
  };

  return c.jsxs("div", { className: "space-y-6 px-4 py-5 lg:px-8 lg:py-7", children: [
    c.jsxs("div", { className: "flex flex-wrap items-center justify-between gap-3 border-b border-sandal-200 pb-4 dark:border-cosmos-800", children: [
      c.jsxs("div", { children: [
        c.jsx("h1", { className: "font-display text-2xl font-bold text-sandal-900 dark:text-white", children: "AI Palm & Line Scanner (हस्तरेखा)" }),
        c.jsx("p", { className: "text-sm text-sandal-500 dark:text-sandal-400", children: "Computer-vision assisted Vedic Palmistry & Samudrika Shastra" })
      ]}),
      c.jsxs("div", { className: "flex gap-2 rounded-xl bg-sandal-100 p-1 dark:bg-cosmos-900", children: [
        c.jsx("button", { onClick: () => setHand("right"), className: "rounded-lg px-3 py-1.5 text-xs font-semibold transition " + (hand === "right" ? "bg-saffron-500 text-white shadow" : "text-sandal-600 dark:text-sandal-300"), children: "Right Hand (Karma/Active)" }),
        c.jsx("button", { onClick: () => setHand("left"), className: "rounded-lg px-3 py-1.5 text-xs font-semibold transition " + (hand === "left" ? "bg-saffron-500 text-white shadow" : "text-sandal-600 dark:text-sandal-300"), children: "Left Hand (Inborn Potential)" })
      ]})
    ]}),

    c.jsxs("div", { className: "grid gap-6 lg:grid-cols-3", children: [
      c.jsxs("div", { className: "premium-card flex flex-col items-center justify-center p-6 text-center lg:col-span-1", children: [
        c.jsxs("div", { className: "relative my-3 flex h-60 w-44 items-center justify-center rounded-3xl border-2 border-dashed border-saffron-400 bg-gradient-to-b from-saffron-500/10 to-gold-500/10", children: [
          c.jsx("span", { className: "text-6xl", children: "✋" }),
          c.jsx("div", { className: "absolute top-3 right-3 rounded-full bg-green-500 px-2 py-0.5 text-[10px] font-bold text-white", children: "AI SCANNED" })
        ]}),
        c.jsx("div", { className: "font-semibold text-sandal-900 dark:text-white", children: "Active Hand: " + (hand === "right" ? "Right (Dominant)" : "Left") }),
        c.jsx("p", { className: "mt-1 text-xs text-sandal-500 dark:text-sandal-400", children: "Samudrika Shastra Scan: 98.4% Confidence" }),
        c.jsx("button", { onClick: () => alert("Downloading full 14-page AI Palmistry Report (PDF)..."), className: "mt-4 w-full rounded-xl bg-gradient-to-r from-saffron-500 to-gold-500 py-2.5 text-xs font-bold text-white shadow-soft transition hover:opacity-95", children: "📥 Download Palmistry PDF Dossier" })
      ]}),

      c.jsxs("div", { className: "space-y-4 lg:col-span-2", children: [
        c.jsxs("div", { className: "premium-card p-5", children: [
          c.jsx("h3", { className: "section-title mb-3", children: "Select Major Line to Inspect" }),
          c.jsx("div", { className: "grid grid-cols-2 gap-2 sm:grid-cols-3", children: Object.entries(lines).map(([k, v]) => c.jsx("button", { key: k, onClick: () => setSelectedLine(k), className: "rounded-xl border p-3 text-left transition " + (selectedLine === k ? "border-saffron-500 bg-saffron-50/50 dark:bg-saffron-950/20" : "border-sandal-100 hover:border-sandal-200 dark:border-cosmos-800"), children: c.jsx("div", { className: "text-xs font-semibold text-sandal-800 dark:text-sandal-200", children: v.name }) }))}),
          c.jsxs("div", { className: "mt-4 rounded-2xl bg-sandal-50 p-4 dark:bg-cosmos-900/60", children: [
            c.jsxs("div", { className: "flex items-center justify-between", children: [
              c.jsx("span", { className: "font-display text-base font-bold text-sandal-900 dark:text-white", children: lines[selectedLine].name }),
              c.jsx("span", { className: "chip bg-green-100 text-green-700 dark:bg-green-500/20 dark:text-green-300", children: lines[selectedLine].score })
            ]}),
            c.jsxs("div", { className: "mt-2 text-xs font-medium text-saffron-600 dark:text-saffron-400", children: ["Status: ", lines[selectedLine].length] }),
            c.jsx("p", { className: "mt-2 text-sm text-sandal-600 dark:text-sandal-300", children: lines[selectedLine].detail })
          ]})
        ]}),

        c.jsxs("div", { className: "premium-card p-5", children: [
          c.jsx("h3", { className: "section-title mb-2", children: "Rare & Auspicious Signs Detected" }),
          c.jsxs("div", { className: "grid gap-3 sm:grid-cols-2", children: [
            c.jsxs("div", { className: "rounded-xl border border-gold-300/60 bg-gold-50/30 p-3 dark:border-gold-800/40 dark:bg-gold-950/20", children: [
              c.jsx("div", { className: "font-semibold text-gold-800 dark:text-gold-300", children: "🐟 Matsya (Fish) Sign on Ketu Mount" }),
              c.jsx("p", { className: "mt-1 text-xs text-sandal-600 dark:text-sandal-400", children: "Indicates divine spiritual shield, sharp esoteric instincts, and sudden financial elevation during spiritual retreats." })
            ]}),
            c.jsxs("div", { className: "rounded-xl border border-saffron-300/60 bg-saffron-50/30 p-3 dark:border-saffron-800/40 dark:bg-saffron-950/20", children: [
              c.jsx("div", { className: "font-semibold text-saffron-800 dark:text-saffron-300", children: "🔱 Trishul Sign below Saturn Mount" }),
              c.jsx("p", { className: "mt-1 text-xs text-sandal-600 dark:text-sandal-400", children: "Karmic protection from malefic afflictions. Bestows persevering fortitude and respect across academic & administrative circles." })
            ]})
          ]})
        ]})
      ]})
    ]})
  ]});
}

function VastuView() {
  const [prop, setProp] = J.useState("home");
  const [activeDir, setActiveDir] = J.useState("NE");

  const directions = {
    NE: { name: "North-East (ईशान कोण)", ruler: "Jupiter / Shiva", zone: "Mandir & Meditation", score: 98, status: "Ideal Placement", remedy: "Keep completely clear, lightweight and lit with brass diya." },
    E: { name: "East (पूर्व)", ruler: "Sun (Surya)", zone: "Main Entrance / Verandah", score: 94, status: "Auspicious", remedy: "Allow morning sunlight to enter freely. Hang a copper Surya yantra on main door." },
    SE: { name: "South-East (आग्नेय कोण)", ruler: "Venus / Agni", zone: "Kitchen & Cooktop", score: 96, status: "Perfect Harmony", remedy: "Cook facing East. Never place washbasin adjacent to gas burner." },
    S: { name: "South (दक्षिण)", ruler: "Mars / Yama", zone: "Resting Space / Storage", score: 88, status: "Balanced", remedy: "Sleep with head towards South for optimal cellular rest and blood circulation." },
    SW: { name: "South-West (नैऋत्य कोण)", ruler: "Rahu / Earth", zone: "Master Bedroom", score: 92, status: "Stability Anchor", remedy: "Heaviest furniture and family head must occupy this zone to prevent financial instability." },
    W: { name: "West (पश्चिम)", ruler: "Saturn / Varuna", zone: "Dining / Study", score: 90, status: "Gains & Output", remedy: "Excellent for study room or accounts ledger keeping." },
    NW: { name: "North-West (वायव्य कोण)", ruler: "Moon / Vayu", zone: "Guest Room / Goods", score: 86, status: "Airy & Active", remedy: "Keep sea salt in a ceramic bowl to transmute stale air currents." },
    N: { name: "North (उत्तर)", ruler: "Mercury / Kuber", zone: "Wealth & Cash Locker", score: 95, status: "Wealth Flow", remedy: "Place cash box opening towards North. Keep a money plant or small green jade." }
  };

  return c.jsxs("div", { className: "space-y-6 px-4 py-5 lg:px-8 lg:py-7", children: [
    c.jsxs("div", { className: "flex flex-wrap items-center justify-between gap-3 border-b border-sandal-200 pb-4 dark:border-cosmos-800", children: [
      c.jsxs("div", { children: [
        c.jsx("h1", { className: "font-display text-2xl font-bold text-sandal-900 dark:text-white", children: "AI Space & Floorplan Vastu Analyzer" }),
        c.jsx("p", { className: "text-sm text-sandal-500 dark:text-sandal-400", children: "8-Direction energy grid, room placements, and non-destructive cures" })
      ]}),
      c.jsxs("div", { className: "flex gap-2 rounded-xl bg-sandal-100 p-1 dark:bg-cosmos-900", children: [
        c.jsx("button", { onClick: () => setProp("home"), className: "rounded-lg px-3 py-1.5 text-xs font-semibold transition " + (prop === "home" ? "bg-saffron-500 text-white shadow" : "text-sandal-600 dark:text-sandal-300"), children: "🏡 Home / Flat" }),
        c.jsx("button", { onClick: () => setProp("office"), className: "rounded-lg px-3 py-1.5 text-xs font-semibold transition " + (prop === "office" ? "bg-saffron-500 text-white shadow" : "text-sandal-600 dark:text-sandal-300"), children: "🏢 Office / Studio" }),
        c.jsx("button", { onClick: () => setProp("plot"), className: "rounded-lg px-3 py-1.5 text-xs font-semibold transition " + (prop === "plot" ? "bg-saffron-500 text-white shadow" : "text-sandal-600 dark:text-sandal-300"), children: "📐 Commercial Plot" })
      ]})
    ]}),

    c.jsxs("div", { className: "grid gap-6 lg:grid-cols-3", children: [
      c.jsxs("div", { className: "premium-card flex flex-col items-center justify-center p-6 text-center lg:col-span-1", children: [
        c.jsx("div", { className: "text-xs uppercase tracking-widest text-sandal-400", children: "Vastu Energy Rating" }),
        c.jsx("div", { className: "my-2 font-display text-5xl font-bold text-green-600 dark:text-green-400", children: "92 / 100" }),
        c.jsx("span", { className: "chip bg-green-100 text-green-700 dark:bg-green-500/20 dark:text-green-300", children: "✨ Maha Shubh (Highly Auspicious)" }),
        c.jsx("p", { className: "mt-4 text-xs text-sandal-500 dark:text-sandal-400", children: "Positive prana circulation across North-East and South-East axes. Zero structural breaking needed." }),
        c.jsx("div", { className: "mt-6 grid w-full grid-cols-2 gap-2 text-left text-xs", children: [
          c.jsxs("div", { className: "rounded-lg bg-sandal-50 p-2 dark:bg-cosmos-900", children: [c.jsx("div", { className: "text-sandal-400", children: "Prana Energy" }), c.jsx("div", { className: "font-bold text-green-600", children: "+94% High" })] }),
          c.jsxs("div", { className: "rounded-lg bg-sandal-50 p-2 dark:bg-cosmos-900", children: [c.jsx("div", { className: "text-sandal-400", children: "Jaivik Flow" }), c.jsx("div", { className: "font-bold text-green-600", children: "+89% Balanced" })] })
        ]})
      ]}),

      c.jsxs("div", { className: "space-y-4 lg:col-span-2", children: [
        c.jsxs("div", { className: "premium-card p-5", children: [
          c.jsx("h3", { className: "section-title mb-3", children: "8 Directions Energy Compass" }),
          c.jsx("div", { className: "grid grid-cols-2 gap-2 sm:grid-cols-4", children: Object.entries(directions).map(([code, d]) => c.jsxs("button", { key: code, onClick: () => setActiveDir(code), className: "rounded-xl border p-3 text-left transition " + (activeDir === code ? "border-saffron-500 bg-saffron-50/50 dark:bg-saffron-950/20" : "border-sandal-100 dark:border-cosmos-800"), children: [
            c.jsxs("div", { className: "flex items-center justify-between", children: [c.jsx("span", { className: "font-bold text-saffron-600 dark:text-saffron-400", children: code }), c.jsx("span", { className: "text-[11px] font-semibold text-green-600", children: d.score + "%" })] }),
            c.jsx("div", { className: "mt-1 text-xs font-medium text-sandal-800 dark:text-sandal-200", children: d.name.split(" ")[0] })
          ]}))}),
          c.jsxs("div", { className: "mt-4 rounded-2xl bg-sandal-50 p-4 dark:bg-cosmos-900/60", children: [
            c.jsxs("div", { className: "flex items-center justify-between", children: [
              c.jsx("span", { className: "font-display text-base font-bold text-sandal-900 dark:text-white", children: directions[activeDir].name }),
              c.jsx("span", { className: "chip bg-saffron-100 text-saffron-700 dark:bg-saffron-500/20 dark:text-saffron-300", children: directions[activeDir].status })
            ]}),
            c.jsxs("div", { className: "mt-2 text-xs font-semibold text-sandal-600 dark:text-sandal-300", children: ["Governing Deva / Planet: ", directions[activeDir].ruler, " · Best Zone: ", directions[activeDir].zone] }),
            c.jsxs("p", { className: "mt-2 text-sm text-sandal-600 dark:text-sandal-300", children: [c.jsx("strong", { children: "Vedic Remedy: " }), directions[activeDir].remedy] })
          ]})
        ]})
      ]})
    ]})
  ]});
}

function DreamsView() {
  const [search, setSearch] = J.useState("");
  const [myDream, setMyDream] = J.useState("");
  const [decodedResult, setDecodedResult] = J.useState(null);

  const symbols = [
    { name: "🌊 Flowing Clear Water / River", category: "Nature", meaning: "Immense mental peace, spiritual purification, and incoming abundance within 15 days.", timing: "3rd Prahar (Fruition in 1 month)" },
    { name: "🐍 Golden Snake / Sheshnag", category: "Divine", meaning: "Ancestral blessings, sudden removal of Kaal Sarp obstacles, and awakening of higher discernment.", timing: "Brahma Muhurat (Fruition in 10 days)" },
    { name: "🛕 Ancient Shiva Temple", category: "Divine", meaning: "Spiritual liberation, victory in contested affairs, and fulfillment of deep heartfelt sankalpa.", timing: "4th Prahar (Instant positive vibration)" },
    { name: "🐘 White Elephant (Airavata)", category: "Animals", meaning: "High administrative status, promotion, social repute, and blessings of Mahalakshmi.", timing: "Brahma Muhurat (Guaranteed elevation)" },
    { name: "🪙 Discovering Gold Coins", category: "Wealth", meaning: "Trade growth, clearance of old dues, and unexpected prosperity from maternal relations.", timing: "2nd Prahar (Fruition within 3 months)" },
    { name: "🦅 Soaring High in Clear Sky", category: "Action", meaning: "Rising above competitors, overcoming chronic anxieties, and successful long voyages.", timing: "Dawn (Very Auspicious)" }
  ];

  const filtered = symbols.filter(s => s.name.toLowerCase().includes(search.toLowerCase()) || s.meaning.toLowerCase().includes(search.toLowerCase()));

  const handleDecode = () => {
    if (!myDream.trim()) return;
    setDecodedResult({
      dream: myDream,
      meaning: "Your dream indicates a powerful spiritual transition. The symbols present in your dream align with Jupiterian and Venusian influences, indicating clarity in professional goals and inner emotional harmony.",
      prahar: "Brahma Muhurat Timing (Fruition within 21 to 30 days)",
      shantiMantra: "Om Namo Narayanaya (11 times)"
    });
  };

  return c.jsxs("div", { className: "space-y-6 px-4 py-5 lg:px-8 lg:py-7", children: [
    c.jsxs("div", { className: "border-b border-sandal-200 pb-4 dark:border-cosmos-800", children: [
      c.jsx("h1", { className: "font-display text-2xl font-bold text-sandal-900 dark:text-white", children: "Swapna Shastra & AI Dream Decoder (स्वप्न विचार)" }),
      c.jsx("p", { className: "text-sm text-sandal-500 dark:text-sandal-400", children: "Decode subconscious nocturnal visions through Vedic symbolism and psychological archetypes" })
    ]}),

    c.jsxs("div", { className: "premium-card p-5", children: [
      c.jsx("h3", { className: "section-title mb-2", children: "✨ Record & Decode Last Night's Dream" }),
      c.jsx("textarea", { rows: 3, value: myDream, onChange: e => setMyDream(e.target.value), placeholder: "Describe what you saw in your dream (e.g. I saw a white lotus floating down a golden river under full moon...)", className: "w-full rounded-2xl border border-sandal-200 bg-white p-3 text-sm dark:border-cosmos-700 dark:bg-cosmos-900 dark:text-white" }),
      c.jsx("div", { className: "mt-3 flex justify-end", children: c.jsx("button", { onClick: handleDecode, className: "rounded-xl bg-gradient-to-r from-saffron-500 to-gold-500 px-5 py-2 font-semibold text-white shadow-soft transition hover:opacity-95", children: "🔮 Decode with Swapna Shastra AI" }) }),
      decodedResult && c.jsxs("div", { className: "mt-4 rounded-2xl bg-sandal-50 p-4 dark:bg-cosmos-900/60", children: [
        c.jsx("div", { className: "font-display text-base font-bold text-saffron-600 dark:text-saffron-400", children: "Vedic Dream Interpretation" }),
        c.jsx("p", { className: "mt-2 text-sm text-sandal-800 dark:text-sandal-100", children: decodedResult.meaning }),
        c.jsxs("div", { className: "mt-3 flex flex-wrap gap-4 text-xs font-semibold", children: [
          c.jsxs("span", { className: "text-sandal-500 dark:text-sandal-400", children: ["⏳ Timeframe: ", decodedResult.prahar] }),
          c.jsxs("span", { className: "text-green-600 dark:text-green-400", children: ["🪔 Shanti Mantra: ", decodedResult.shantiMantra] })
        ]})
      ]})
    ]}),

    c.jsxs("div", { className: "premium-card p-5", children: [
      c.jsxs("div", { className: "mb-3 flex flex-wrap items-center justify-between gap-3", children: [
        c.jsx("h3", { className: "section-title", children: "Vedic Dream Symbol Dictionary" }),
        c.jsx("input", { type: "text", value: search, onChange: e => setSearch(e.target.value), placeholder: "Search symbols (snake, water, coins)...", className: "w-64 rounded-xl border border-sandal-200 bg-white px-3 py-1.5 text-xs dark:border-cosmos-700 dark:bg-cosmos-900 dark:text-white" })
      ]}),
      c.jsx("div", { className: "grid gap-3 sm:grid-cols-2", children: filtered.map(s => c.jsxs("div", { key: s.name, className: "rounded-xl border border-sandal-100 p-4 transition hover:border-sandal-300 dark:border-cosmos-800", children: [
        c.jsxs("div", { className: "flex items-center justify-between", children: [
          c.jsx("span", { className: "font-semibold text-sandal-900 dark:text-white", children: s.name }),
          c.jsx("span", { className: "chip bg-saffron-100 text-saffron-700 dark:bg-saffron-500/20 dark:text-saffron-300", children: s.category })
        ]}),
        c.jsx("p", { className: "mt-2 text-xs text-sandal-600 dark:text-sandal-300", children: s.meaning }),
        c.jsxs("div", { className: "mt-2 text-[11px] font-medium text-sandal-400", children: ["Fruition: ", s.timing] })
      ]}))})
    ]})
  ]});
}

function JournalView() {
  const [mood, setMood] = J.useState("Peaceful");
  const [japa, setJapa] = J.useState(108);
  const [reflection, setReflection] = J.useState("");
  const [entries, setEntries] = J.useState([
    { date: "Today", mood: "Peaceful", text: "Chanted 108 Gayatri Mantra cycles at Brahma Muhurat. Mind felt remarkably anchored and serene.", japa: 108 },
    { date: "Yesterday", mood: "Grateful", text: "Reflected on Gita Chapter 2, Shloka 47. Relinquishing anxiety over results brings immediate focus.", japa: 108 }
  ]);

  const handleSave = () => {
    if (!reflection.trim()) return;
    setEntries([{ date: "Just now", mood: mood, text: reflection, japa: japa }, ...entries]);
    setReflection("");
  };

  const moods = ["Peaceful", "Meditative", "Grateful", "Inspired", "Restless"];

  return c.jsxs("div", { className: "space-y-6 px-4 py-5 lg:px-8 lg:py-7", children: [
    c.jsxs("div", { className: "border-b border-sandal-200 pb-4 dark:border-cosmos-800", children: [
      c.jsx("h1", { className: "font-display text-2xl font-bold text-sandal-900 dark:text-white", children: "Spiritual Sadhana Diary & Mood Journal" }),
      c.jsx("p", { className: "text-sm text-sandal-500 dark:text-sandal-400", children: "Private space for daily reflections, mantra counts, and inner gratitude" })
    ]}),

    c.jsxs("div", { className: "grid gap-6 lg:grid-cols-3", children: [
      c.jsxs("div", { className: "premium-card p-5 lg:col-span-1", children: [
        c.jsx("h3", { className: "section-title mb-3", children: "📿 Digital Japa Mala" }),
        c.jsxs("div", { className: "my-4 flex flex-col items-center", children: [
          c.jsx("div", { className: "font-display text-5xl font-bold text-saffron-600 dark:text-saffron-400", children: japa }),
          c.jsx("div", { className: "mt-1 text-xs text-sandal-400", children: "Mantra Chants Completed" })
        ]}),
        c.jsxs("div", { className: "flex justify-center gap-2", children: [
          c.jsx("button", { onClick: () => setJapa(j => j + 1), className: "rounded-xl bg-saffron-500 px-4 py-2 font-bold text-white shadow-soft transition hover:bg-saffron-600", children: "+1 Bead" }),
          c.jsx("button", { onClick: () => setJapa(j => j + 10), className: "rounded-xl bg-sandal-200 px-4 py-2 font-bold text-sandal-800 transition hover:bg-sandal-300 dark:bg-cosmos-700 dark:text-white", children: "+10" }),
          c.jsx("button", { onClick: () => setJapa(0), className: "rounded-xl border border-sandal-200 px-3 py-2 text-xs text-sandal-500 dark:border-cosmos-700", children: "Reset" })
        ]})
      ]}),

      c.jsxs("div", { className: "premium-card p-5 lg:col-span-2", children: [
        c.jsx("h3", { className: "section-title mb-2", children: "Write Today's Sadhana Note" }),
        c.jsxs("div", { className: "mb-3 flex flex-wrap items-center gap-2", children: [
          c.jsx("span", { className: "text-xs font-semibold text-sandal-500", children: "Current State:" }),
          moods.map(m => c.jsx("button", { key: m, onClick: () => setMood(m), className: "rounded-lg px-2.5 py-1 text-xs font-semibold transition " + (mood === m ? "bg-saffron-500 text-white" : "bg-sandal-100 text-sandal-600 dark:bg-cosmos-800 dark:text-sandal-300"), children: m }))
        ]}),
        c.jsx("textarea", { rows: 3, value: reflection, onChange: e => setReflection(e.target.value), placeholder: "What did you observe in your meditation or day today? Write your reflection...", className: "w-full rounded-xl border border-sandal-200 bg-white p-3 text-sm dark:border-cosmos-700 dark:bg-cosmos-900 dark:text-white" }),
        c.jsx("div", { className: "mt-3 flex justify-end", children: c.jsx("button", { onClick: handleSave, className: "rounded-xl bg-gradient-to-r from-saffron-500 to-gold-500 px-5 py-2 font-semibold text-white shadow-soft transition hover:opacity-95", children: "Save Reflection" }) })
      ]})
    ]}),

    c.jsxs("div", { className: "premium-card p-5", children: [
      c.jsx("h3", { className: "section-title mb-3", children: "Past Reflections & Sadhana History" }),
      c.jsx("div", { className: "space-y-3", children: entries.map((en, i) => c.jsxs("div", { key: i, className: "rounded-xl border border-sandal-100 p-4 dark:border-cosmos-800", children: [
        c.jsxs("div", { className: "flex items-center justify-between", children: [
          c.jsxs("span", { className: "font-semibold text-sandal-900 dark:text-white", children: [en.date, " · Mood: ", en.mood] }),
          c.jsxs("span", { className: "chip bg-saffron-100 text-saffron-700 dark:bg-saffron-500/20 dark:text-saffron-300", children: ["📿 ", en.japa, " Beads"] })
        ]}),
        c.jsx("p", { className: "mt-2 text-sm text-sandal-600 dark:text-sandal-300", children: en.text })
      ]}))})
    ]})
  ]});
}

function ActivityView() {
  const [filter, setFilter] = J.useState("all");

  const activities = [
    { type: "guru", title: "Consultation: Jyotish Guru", desc: "Topic: Career shift & Venus Mahadasha remedies", time: "Today, 11:20 AM", cost: "-19 Credits" },
    { type: "tarot", title: "Celtic Cross Tarot Spread", desc: "10-Card In-Depth Reading (Center: The Empress)", time: "Yesterday, 04:15 PM", cost: "Free (Sadhak Plus)" },
    { type: "kundli", title: "Navamsha D9 Chart Recalculation", desc: "Planetary coordinates synchronized with Lahiri Ayanamsha", time: "15 Nov 2026", cost: "Included" },
    { type: "wallet", title: "Wallet Recharge (500 Credits)", desc: "Razorpay Transaction #TXN_884920", time: "14 Nov 2026", cost: "+₹500 (+100 Bonus)" },
    { type: "numerology", title: "Life Path 7 Deep Analysis", desc: "Chaldean Name & Lo Shu Grid Harmonic Check", time: "12 Nov 2026", cost: "Free" }
  ];

  const filtered = filter === "all" ? activities : activities.filter(a => a.type === filter);

  return c.jsxs("div", { className: "space-y-6 px-4 py-5 lg:px-8 lg:py-7", children: [
    c.jsxs("div", { className: "flex flex-wrap items-center justify-between gap-3 border-b border-sandal-200 pb-4 dark:border-cosmos-800", children: [
      c.jsxs("div", { children: [
        c.jsx("h1", { className: "font-display text-2xl font-bold text-sandal-900 dark:text-white", children: "Consultation & Account Activity Log" }),
        c.jsx("p", { className: "text-sm text-sandal-500 dark:text-sandal-400", children: "Audit trail of your readings, Guru chats, transactions, and downloads" })
      ]}),
      c.jsxs("div", { className: "flex gap-2 rounded-xl bg-sandal-100 p-1 dark:bg-cosmos-900", children: [
        c.jsx("button", { onClick: () => setFilter("all"), className: "rounded-lg px-3 py-1.5 text-xs font-semibold transition " + (filter === "all" ? "bg-saffron-500 text-white shadow" : "text-sandal-600 dark:text-sandal-300"), children: "All" }),
        c.jsx("button", { onClick: () => setFilter("guru"), className: "rounded-lg px-3 py-1.5 text-xs font-semibold transition " + (filter === "guru" ? "bg-saffron-500 text-white shadow" : "text-sandal-600 dark:text-sandal-300"), children: "AI Gurus" }),
        c.jsx("button", { onClick: () => setFilter("tarot"), className: "rounded-lg px-3 py-1.5 text-xs font-semibold transition " + (filter === "tarot" ? "bg-saffron-500 text-white shadow" : "text-sandal-600 dark:text-sandal-300"), children: "Tarot" }),
        c.jsx("button", { onClick: () => setFilter("wallet"), className: "rounded-lg px-3 py-1.5 text-xs font-semibold transition " + (filter === "wallet" ? "bg-saffron-500 text-white shadow" : "text-sandal-600 dark:text-sandal-300"), children: "Wallet" })
      ]})
    ]}),

    c.jsxs("div", { className: "premium-card p-5", children: [
      c.jsx("div", { className: "space-y-3", children: filtered.map((act, i) => c.jsxs("div", { key: i, className: "flex flex-wrap items-center justify-between gap-3 rounded-xl border border-sandal-100 p-4 dark:border-cosmos-800", children: [
        c.jsxs("div", { children: [
          c.jsx("div", { className: "font-semibold text-sandal-900 dark:text-white", children: act.title }),
          c.jsx("div", { className: "mt-0.5 text-xs text-sandal-500 dark:text-sandal-400", children: act.desc }),
          c.jsx("div", { className: "mt-1 text-[11px] text-sandal-400", children: act.time })
        ]}),
        c.jsx("div", { className: "font-bold " + (act.cost.includes("+") ? "text-green-600" : act.cost.includes("-") ? "text-saffron-600" : "text-sandal-600 dark:text-sandal-300"), children: act.cost })
      ]}))})
    ]})
  ]});
}

function SettingsView() {
  const [lang, setLang] = J.useState("English");
  const [notifPanchang, setNotifPanchang] = J.useState(true);
  const [notifBrahma, setNotifBrahma] = J.useState(true);
  const [notifRahu, setNotifRahu] = J.useState(true);
  const [aiMemory, setAiMemory] = J.useState(true);

  const languages = ["English", "हिन्दी (Hindi)", "বাংলা (Bengali)", "தமிழ் (Tamil)", "తెలుగు (Telugu)", "ଓଡ଼ିଆ (Odia)"];

  return c.jsxs("div", { className: "space-y-6 px-4 py-5 lg:px-8 lg:py-7", children: [
    c.jsxs("div", { className: "border-b border-sandal-200 pb-4 dark:border-cosmos-800", children: [
      c.jsx("h1", { className: "font-display text-2xl font-bold text-sandal-900 dark:text-white", children: "Preferences & App Settings" }),
      c.jsx("p", { className: "text-sm text-sandal-500 dark:text-sandal-400", children: "Manage language, alerts, spiritual AI memory, and privacy" })
    ]}),

    c.jsxs("div", { className: "premium-card p-5", children: [
      c.jsx("h3", { className: "section-title mb-3", children: "🌐 App Language (भाषा)" }),
      c.jsx("div", { className: "grid grid-cols-2 gap-2 sm:grid-cols-3", children: languages.map(l => c.jsx("button", { key: l, onClick: () => setLang(l), className: "rounded-xl border p-3 text-left font-medium transition " + (lang === l ? "border-saffron-500 bg-saffron-50 font-bold text-saffron-700 dark:bg-saffron-950/20 dark:text-saffron-300" : "border-sandal-200 text-sandal-700 dark:border-cosmos-700 dark:text-sandal-300"), children: l }))})
    ]}),

    c.jsxs("div", { className: "premium-card p-5", children: [
      c.jsx("h3", { className: "section-title mb-3", children: "🔔 Auspicious Alerts & Notifications" }),
      c.jsxs("div", { className: "space-y-3", children: [
        c.jsxs("div", { className: "flex items-center justify-between", children: [
          c.jsxs("div", { children: [c.jsx("div", { className: "font-medium text-sandal-800 dark:text-white", children: "Daily Morning Panchang (6:00 AM)" }), c.jsx("div", { className: "text-xs text-sandal-400", children: "Receive today's Tithi, Nakshatra, and Shubh Muhurat" })] }),
          c.jsx("button", { onClick: () => setNotifPanchang(!notifPanchang), className: "rounded-full px-3 py-1 text-xs font-bold " + (notifPanchang ? "bg-green-600 text-white" : "bg-sandal-200 text-sandal-600"), children: notifPanchang ? "ENABLED" : "DISABLED" })
        ]}),
        c.jsxs("div", { className: "flex items-center justify-between", children: [
          c.jsxs("div", { children: [c.jsx("div", { className: "font-medium text-sandal-800 dark:text-white", children: "Brahma Muhurat Meditation Alert (4:48 AM)" }), c.jsx("div", { className: "text-xs text-sandal-400", children: "Chime during the supreme creator hour for sadhana" })] }),
          c.jsx("button", { onClick: () => setNotifBrahma(!notifBrahma), className: "rounded-full px-3 py-1 text-xs font-bold " + (notifBrahma ? "bg-green-600 text-white" : "bg-sandal-200 text-sandal-600"), children: notifBrahma ? "ENABLED" : "DISABLED" })
        ]}),
        c.jsxs("div", { className: "flex items-center justify-between", children: [
          c.jsxs("div", { children: [c.jsx("div", { className: "font-medium text-sandal-800 dark:text-white", children: "Rahu Kaal Inauspicious Window Alert" }), c.jsx("div", { className: "text-xs text-sandal-400", children: "Warning 15 minutes before Rahu Kaal begins" })] }),
          c.jsx("button", { onClick: () => setNotifRahu(!notifRahu), className: "rounded-full px-3 py-1 text-xs font-bold " + (notifRahu ? "bg-green-600 text-white" : "bg-sandal-200 text-sandal-600"), children: notifRahu ? "ENABLED" : "DISABLED" })
        ]})
      ]})
    ]}),

    c.jsxs("div", { className: "premium-card p-5", children: [
      c.jsx("h3", { className: "section-title mb-3", children: "🤖 AI Spiritual Personalization" }),
      c.jsxs("div", { className: "flex items-center justify-between", children: [
        c.jsxs("div", { children: [c.jsx("div", { className: "font-medium text-sandal-800 dark:text-white", children: "Kundli Context Memory" }), c.jsx("div", { className: "text-xs text-sandal-400", children: "Allow AI Gurus to automatically tailor answers to your Leo Lagna & Venus Dasha" })] }),
        c.jsx("button", { onClick: () => setAiMemory(!aiMemory), className: "rounded-full px-3 py-1 text-xs font-bold " + (aiMemory ? "bg-saffron-600 text-white" : "bg-sandal-200 text-sandal-600"), children: aiMemory ? "ACTIVE" : "OFF" })
      ]})
    ]}),

    c.jsxs("div", { className: "flex justify-between gap-3", children: [
      c.jsx("button", { onClick: () => alert("Exporting your spiritual records & Kundli as JSON..."), className: "rounded-xl border border-sandal-200 px-4 py-2 text-xs font-semibold text-sandal-700 dark:border-cosmos-700 dark:text-sandal-300", children: "💾 Export All Data (JSON)" }),
      c.jsx("button", { onClick: () => alert("Consultation logs cleared."), className: "rounded-xl border border-red-200 px-4 py-2 text-xs font-semibold text-red-600 dark:border-red-900/60", children: "Clear AI History" })
    ]})
  ]});
}

function HelpView() {
  const [openFaq, setOpenFaq] = J.useState(0);
  const [ticketSubject, setTicketSubject] = J.useState("");
  const [ticketMsg, setTicketMsg] = J.useState("");
  const [sent, setSent] = J.useState(false);

  const faqs = [
    { q: "How are the astrological and planetary positions calculated?", a: "Drishyam AI utilizes rigorous mathematical ephemeris algorithms calibrated to Lahiri Ayanamsha (Chitrapaksha) and Swiss Ephemeris data. Calculations include accurate planetary degrees, retrogrades, and divisional harmonic charts (D1 through D60)." },
    { q: "How do AI Guru consultation credits work?", a: "Each consultation query with any of the 8 AI Gurus costs 19 credits. Credits can be recharged at 1 credit = 1 INR directly via your Wallet. Active Sadhak Plus members enjoy daily complimentary credits." },
    { q: "Is my birth chart and private consultation confidential?", a: "Yes, completely. All birth charts, tarot spreads, and chat logs are encrypted in transit and stored in your private user profile. We never sell or share spiritual inquiries with third parties." },
    { q: "What is your refund policy on PDF Astrological Reports?", a: "We offer a 100% satisfaction guarantee. If any report generated fails to meet our Vedic standards, you can request a credit reversal within 7 days through this support desk." }
  ];

  const handleSubmit = e => {
    e.preventDefault();
    if (!ticketSubject || !ticketMsg) return;
    setSent(true);
    setTicketSubject("");
    setTicketMsg("");
  };

  return c.jsxs("div", { className: "space-y-6 px-4 py-5 lg:px-8 lg:py-7", children: [
    c.jsxs("div", { className: "border-b border-sandal-200 pb-4 dark:border-cosmos-800", children: [
      c.jsx("h1", { className: "font-display text-2xl font-bold text-sandal-900 dark:text-white", children: "Help Center & Support Desk" }),
      c.jsx("p", { className: "text-sm text-sandal-500 dark:text-sandal-400", children: "Frequently asked questions, astrological guides, and 24/7 customer support" })
    ]}),

    c.jsxs("div", { className: "premium-card p-5", children: [
      c.jsx("h3", { className: "section-title mb-3", children: "Frequently Asked Questions" }),
      c.jsx("div", { className: "space-y-2", children: faqs.map((f, i) => c.jsxs("div", { key: i, className: "rounded-xl border border-sandal-100 p-4 transition dark:border-cosmos-800", children: [
        c.jsxs("button", { onClick: () => setOpenFaq(openFaq === i ? -1 : i), className: "flex w-full items-center justify-between text-left font-semibold text-sandal-900 dark:text-white", children: [
          c.jsx("span", { children: f.q }),
          c.jsx("span", { className: "ml-2 text-saffron-600", children: openFaq === i ? "▲" : "▼" })
        ]}),
        openFaq === i && c.jsx("p", { className: "mt-2 text-sm text-sandal-600 dark:text-sandal-300", children: f.a })
      ]}))})
    ]}),

    c.jsxs("div", { className: "premium-card p-5", children: [
      c.jsx("h3", { className: "section-title mb-2", children: "✉️ Submit Support Inquiry / Ticket" }),
      c.jsx("p", { className: "mb-4 text-xs text-sandal-500 dark:text-sandal-400", children: "Our dedicated astrologers and technical support team respond within 4 hours." }),
      sent ? c.jsxs("div", { className: "rounded-2xl bg-green-50 p-4 text-center text-green-800 dark:bg-green-950/30 dark:text-green-300", children: [
        c.jsx("div", { className: "font-bold", children: "Ticket Received Successfully!" }),
        c.jsx("div", { className: "text-xs", children: "Ticket Reference ID: #DRSH-" + Math.floor(100000 + Math.random() * 900000) + ". We have sent an acknowledgment to your registered email." })
      ]}) : c.jsxs("form", { onSubmit: handleSubmit, className: "space-y-3", children: [
        c.jsx("input", { type: "text", value: ticketSubject, onChange: e => setTicketSubject(e.target.value), placeholder: "Subject / Topic", required: true, className: "w-full rounded-xl border border-sandal-200 bg-white px-3 py-2 text-sm dark:border-cosmos-700 dark:bg-cosmos-900 dark:text-white" }),
        c.jsx("textarea", { rows: 3, value: ticketMsg, onChange: e => setTicketMsg(e.target.value), placeholder: "Describe your query or issue in detail...", required: true, className: "w-full rounded-xl border border-sandal-200 bg-white p-3 text-sm dark:border-cosmos-700 dark:bg-cosmos-900 dark:text-white" }),
        c.jsx("div", { className: "flex justify-end", children: c.jsx("button", { type: "submit", className: "rounded-xl bg-gradient-to-r from-saffron-500 to-gold-500 px-6 py-2.5 font-bold text-white shadow-soft transition hover:opacity-95", children: "Submit Inquiry" }) })
      ]})
    ]})
  ]});
}

function iA({ title: u, desc: M, view: v }) {
  switch (v) {
    case "astrology":
      return c.jsx(AstrologyView, {});
    case "palmistry":
      return c.jsx(PalmistryView, {});
    case "vastu":
      return c.jsx(VastuView, {});
    case "dreams":
      return c.jsx(DreamsView, {});
    case "journal":
      return c.jsx(JournalView, {});
    case "activity":
      return c.jsx(ActivityView, {});
    case "settings":
      return c.jsx(SettingsView, {});
    case "help":
      return c.jsx(HelpView, {});
    default:
      return c.jsx("div", { className: "flex min-h-[60vh] items-center justify-center px-4", children: c.jsxs("div", { className: "premium-card max-w-md p-8 text-center", children: [
        c.jsx("div", { className: "mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-saffron-500 to-gold-500 text-white shadow-glow", children: c.jsx(t1, { size: 28 }) }),
        c.jsx("h2", { className: "mt-4 font-display text-2xl font-semibold text-sandal-900 dark:text-white", children: u }),
        c.jsx("p", { className: "mt-2 text-sm text-sandal-500 dark:text-sandal-400", children: M }),
        c.jsx("div", { className: "mt-4", children: c.jsx("span", { className: "chip bg-saffron-100 text-saffron-700 dark:bg-saffron-500/15 dark:text-saffron-300", children: "Coming in Phase 2" }) })
      ]})});
  }
}
`;

code = code.replace(oldFunc, phase2Components);

fs.writeFileSync(jsPath, code, 'utf8');
console.log("Successfully integrated Phase 2 into index-7a6zugIB.js! New length:", code.length);
