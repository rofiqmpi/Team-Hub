// ১. ফায়ারবেস কনফিগারেশন (আপনার Firebase Console থেকে কি গুলো এখানে বসান)
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_PROJECT_ID.appspot.com",
    messagingSenderId: "YOUR_ID",
    appId: "YOUR_APP_ID"
};
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// ২. টিমের ডাটা (এখানে ১০টি ইউনিক টিম)
const teams = [
    { name: "Cyber Panda", icon: "🐼", id: "panda_01" },
    { name: "Neon Shark", icon: "🦈", id: "shark_02" },
    { name: "Tech Tiger", icon: "🐯", id: "tiger_03" },
    { name: "Data Dragon", icon: "🐲", id: "dragon_04" },
    { name: "Cloud Eagle", icon: "🦅", id: "eagle_05" },
    { name: "Binary Wolf", icon: "🐺", id: "wolf_06" },
    { name: "Logic Lion", icon: "🦁", id: "lion_07" },
    { name: "Pixel Panther", icon: "🐆", id: "panther_08" },
    { name: "Ghost Gorilla", icon: "🦍", id: "gorilla_09" },
    { name: "Silent Falcon", icon: "🦅", id: "falcon_10" }
];

// ৩. হোমপেজে টিম কার্ড রেন্ডারিং
function renderTeams() {
    const grid = document.getElementById('team-grid');
    grid.innerHTML = teams.map(team => `
        <div class="glass-card p-8 rounded-3xl neon-border group cursor-pointer transform transition-all hover:-translate-y-2">
            <div class="flex justify-between items-start mb-6">
                <div class="text-5xl group-hover:scale-110 transition-transform">${team.icon}</div>
                <div class="bg-sky-500/10 text-sky-400 text-xs font-bold px-3 py-1 rounded-full border border-sky-500/20">LIVE</div>
            </div>
            <h3 class="text-2xl font-bold mb-2">${team.name}</h3>
            <p class="text-gray-400 text-sm mb-6">AI লিডার: Admin (You)</p>
            
            <div class="space-y-3">
                <div class="flex justify-between text-xs mb-1">
                    <span>প্রজেক্ট সাকসেস</span>
                    <span>85%</span>
                </div>
                <div class="w-full bg-white/5 h-2 rounded-full overflow-hidden">
                    <div class="bg-gradient-to-r from-sky-500 to-indigo-500 h-full w-[85%]"></div>
                </div>
            </div>
            
            <button onclick="viewTeam('${team.id}')" class="w-full mt-8 py-3 rounded-xl border border-white/10 hover:bg-white/5 transition font-semibold">বিস্তারিত দেখুন</button>
        </div>
    `).join('');
}

// ৪. নেভিগেশন কন্ট্রোল
function showSection(section) {
    document.getElementById('home-section').classList.add('hidden');
    document.getElementById('register-section').classList.add('hidden');
    
    if(section === 'home') document.getElementById('home-section').classList.remove('hidden');
    if(section === 'register') document.getElementById('register-section').classList.remove('hidden');
}

// ৫. রেজিস্ট্রেশন হ্যান্ডলার
document.getElementById('regForm').onsubmit = async (e) => {
    e.preventDefault();
    const userData = {
        name: document.getElementById('u_name').value,
        roll: document.getElementById('u_roll').value,
        pic: document.getElementById('u_pic').value,
        batch: "5/1/CST-A",
        status: "pending", // আপনি ভেরিফাই করবেন
        createdAt: new Date()
    };

    try {
        await db.collection("users").add(userData);
        alert("রেজিস্ট্রেশন সফল! অ্যাডমিন যাচাই করার পর আপনার আইডি সক্রিয় হবে।");
        showSection('home');
    } catch (error) {
        console.error("Error: ", error);
    }
};

// ইনিশিয়ালাইজ
renderTeams();
