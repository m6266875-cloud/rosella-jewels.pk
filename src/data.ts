// Real, minimal, face-free jewellery photography (Pexels)
export type Product = {
  id: number;
  name: string;
  price: number;
  category: "Rings" | "Necklaces" | "Earrings" | "Bracelets" | "Sets";
  src: string;
  bestSeller?: boolean;
  desc: string;
  material: string;
};

const img = (id: number) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1000&w=800`;

const material = "316L Stainless Steel · Tarnish-resistant · Hypoallergenic";

type Seed = { name: string; img: number; desc: string; best?: boolean };

const rings: Seed[] = [
  { name: "Solitaire Ring", img: 30541170, desc: "A single sparkling stone on a slim polished band — understated brilliance for everyday.", best: true },
  { name: "Halo Ring", img: 30541187, desc: "A center stone framed by a delicate halo of tiny crystals for extra shine.", best: true },
  { name: "Twist Band Ring", img: 12194374, desc: "Two fine bands twisted together for a soft, modern silhouette." },
  { name: "Eternity Ring", img: 30541178, desc: "Crystals set all the way around for continuous, effortless sparkle." },
  { name: "Signet Ring", img: 15727979, desc: "A smooth, sculpted statement ring with a bold minimalist face." },
  { name: "Pavé Band Ring", img: 30541184, desc: "Micro-set stones catch the light across a slender pavé band." },
  { name: "Stacking Ring", img: 10581426, desc: "A whisper-thin band made to layer and stack your way." },
  { name: "Pebble Ring", img: 15945449, desc: "An organic, hand-finished band inspired by smooth river stones." },
  { name: "Classic Band Ring", img: 30541177, desc: "The timeless plain band — clean, comfortable, forever." },
  { name: "Trio Ring", img: 16255102, desc: "A set of three fine rings designed to be worn together." },
];

const necklaces: Seed[] = [
  { name: "Fine Chain Necklace", img: 9478032, desc: "A barely-there chain that layers beautifully or shines alone.", best: true },
  { name: "Heart Pendant Necklace", img: 860009, desc: "A dainty heart charm on a delicate chain — a quiet everyday favourite.", best: true },
  { name: "Floral Pendant Necklace", img: 4735885, desc: "A pretty floral pendant with fine detailing for soft romance." },
  { name: "Layered Necklace", img: 4735892, desc: "Pre-layered chains at graduated lengths — instant dimension." },
  { name: "Pendant Duo Necklace", img: 4735895, desc: "Two pendants on paired chains for an easy layered look." },
  { name: "Charm Necklace", img: 26570970, desc: "A mixed-charm chain with subtle movement and shine." },
  { name: "Coin Pendant Necklace", img: 4155246, desc: "A smooth engraved coin pendant with vintage character." },
  { name: "Petal Pendant Necklace", img: 4735890, desc: "A soft petal-shaped pendant on a fine, lightweight chain." },
];

const earrings: Seed[] = [
  { name: "Classic Hoop Earrings", img: 16858919, desc: "Everyday hoops with a smooth, lightweight polished finish.", best: true },
  { name: "Crystal Drop Earrings", img: 35933224, desc: "Delicate drops with a single crystal that dances with movement.", best: true },
  { name: "Ribbon Earrings", img: 16055230, desc: "Elegant elongated earrings with a soft ribbon-like curve." },
  { name: "Minimal Stud Earrings", img: 2237101, desc: "The tiniest polished studs — pure, simple, go-with-everything." },
  { name: "Assorted Studs Earrings", img: 8274716, desc: "A curated mix of small studs to mix, match and stack." },
  { name: "Book-Chic Hoop Earrings", img: 11899225, desc: "Slim modern hoops with an effortless editorial finish." },
];

const bracelets: Seed[] = [
  { name: "Charm Bracelet", img: 34399059, desc: "A fine chain bracelet with a delicate crystal charm.", best: true },
  { name: "Bangle Bracelet", img: 32874211, desc: "A sleek, slip-on bangle with a smooth mirror finish." },
  { name: "Diamond Cuff Bracelet", img: 11476471, desc: "A refined cuff lined with sparkling accents." },
  { name: "Stone Chain Bracelet", img: 14873626, desc: "An organic chain bracelet with a natural, earthy feel." },
  { name: "Clover Bracelet", img: 34399144, desc: "A dainty chain with a lucky clover motif." },
  { name: "Stacked Bracelet", img: 13348470, desc: "Mixed-tone bangles designed to be worn stacked." },
  { name: "Display Cuff Bracelet", img: 28933801, desc: "A clean statement cuff with a soft rounded profile." },
  { name: "Petal Chain Bracelet", img: 8165654, desc: "A fine chain bracelet with tiny floral-inspired links." },
  { name: "Knot Bracelet", img: 7642066, desc: "A sculpted knot design symbolising connection." },
];

const sets: Seed[] = [
  { name: "Heart Necklace & Earring Set", img: 34399035, desc: "A matching heart necklace and earrings — the perfect gift.", best: true },
  { name: "Gift Box Set", img: 34399039, desc: "A coordinated necklace and earring set in a keepsake box." },
  { name: "Pearl Accessory Set", img: 16962517, desc: "Soft pearl and gold-tone pieces for elegant occasions." },
  { name: "Everyday Layering Set", img: 4735892, desc: "A mix of fine chains and pendants made to layer daily." },
  { name: "Tray Ring Set", img: 9590858, desc: "A curated set of stacking rings in graduated styles." },
  { name: "Duo Necklace Set", img: 4735895, desc: "Two complementary pendant necklaces sold together." },
];

// prices kept within 300 – 2000 PKR
function build(cat: Product["category"], seeds: Seed[], base: number, startId: number): Product[] {
  return seeds.map((s, i) => {
    let price = base + (i % 5) * 180 + (i % 3) * 90;
    price = Math.min(2000, Math.max(300, Math.round(price / 10) * 10));
    return {
      id: startId + i,
      name: s.name,
      price,
      category: cat,
      src: img(s.img),
      bestSeller: s.best,
      desc: s.desc,
      material,
    };
  });
}

export const products: Product[] = [
  ...build("Rings", rings, 650, 1),
  ...build("Necklaces", necklaces, 900, 101),
  ...build("Earrings", earrings, 400, 201),
  ...build("Bracelets", bracelets, 750, 301),
  ...build("Sets", sets, 1400, 401),
];

export const bestSellers = products.filter((p) => p.bestSeller);

export const categories = ["All", "Rings", "Necklaces", "Earrings", "Bracelets", "Sets"] as const;

export const rupees = (n: number) => `Rs ${n.toLocaleString("en-PK")}`;

export const featured = {
  showcase: img(4735885),
  detail: img(9478032),
  // full-width landscape banners for the About section
  banner: "https://images.pexels.com/photos/37250032/pexels-photo-37250032.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=800&w=1800",
  ownerCraft: "https://images.pexels.com/photos/6262840/pexels-photo-6262840.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1000&w=800",
};

export const gallery = bestSellers.slice(0, 6).map((p) => ({
  src: p.src,
  name: p.name,
  price: rupees(p.price),
}));

export const getProduct = (id: number) => products.find((p) => p.id === id);

// Pakistan cities with Cash-on-Delivery availability + shipping fee (PKR) + days
export type City = { name: string; cod: boolean; shipping: number; days: string };

export const cities: City[] = [
  { name: "Karachi", cod: true, shipping: 150, days: "2–3 days" },
  { name: "Lahore", cod: true, shipping: 150, days: "2–3 days" },
  { name: "Islamabad", cod: true, shipping: 180, days: "2–4 days" },
  { name: "Rawalpindi", cod: true, shipping: 180, days: "2–4 days" },
  { name: "Faisalabad", cod: true, shipping: 200, days: "3–4 days" },
  { name: "Multan", cod: true, shipping: 200, days: "3–4 days" },
  { name: "Peshawar", cod: true, shipping: 220, days: "3–5 days" },
  { name: "Hyderabad", cod: true, shipping: 200, days: "3–5 days" },
  { name: "Sialkot", cod: true, shipping: 200, days: "3–4 days" },
  { name: "Gujranwala", cod: true, shipping: 200, days: "3–4 days" },
  { name: "Quetta", cod: false, shipping: 300, days: "5–7 days" },
  { name: "Sukkur", cod: false, shipping: 280, days: "5–7 days" },
  { name: "Bahawalpur", cod: true, shipping: 250, days: "4–6 days" },
  { name: "Sargodha", cod: true, shipping: 230, days: "4–5 days" },
  { name: "Abbottabad", cod: false, shipping: 280, days: "5–7 days" },
  { name: "Mardan", cod: false, shipping: 280, days: "5–7 days" },
  { name: "Gilgit", cod: false, shipping: 350, days: "7–10 days" },
  { name: "Muzaffarabad", cod: false, shipping: 320, days: "6–9 days" },
  { name: "Other", cod: false, shipping: 300, days: "5–8 days" },
];

export const getCity = (name: string) => cities.find((c) => c.name === name);
