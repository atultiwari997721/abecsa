import { createClient } from '@supabase/supabase-js';
import 'dotenv/config';

// Initialize Supabase Client
const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.error('Error: .env variables VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY are missing.');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey, {
    auth: {
        autoRefreshToken: false,
        persistSession: false,
        detectSessionInUrl: false
    }
});

// ... (Top remains same) ...
const indianFirstNames = ['Aarav', 'Vivaan', 'Aditya', 'Vihaan', 'Arjun', 'Sai', 'Reyansh', 'Ayaan', 'Krishna', 'Ishaan', 'Shaurya', 'Atharv', 'Neel', 'Rohan', 'Rahul', 'Vikram', 'Suresh', 'Ramesh', 'Priya', 'Anjali', 'Sneha', 'Diya', 'Isha'];
const indianLastNames = ['Sharma', 'Patel', 'Verma', 'Gupta', 'Singh', 'Kumar', 'Malhotra', 'Bhatia', 'Joshi', 'Mehta', 'Reddy', 'Nair', 'Chopra', 'Jain', 'Agarwal', 'Saxena', 'Tiwari', 'Mishra'];
const businessTypes = ['Kirana Store', 'General Store', 'Enterprises', 'Trading', 'Tech Solutions', 'Digital', 'Portfolio', 'Vlog', 'Consultancy', 'Graphics', 'Chai Shop', 'Textiles', 'Exports'];

const getRandomElement = (arr) => arr[Math.floor(Math.random() * arr.length)];

const generateIndianUser = () => {
    const fn = getRandomElement(indianFirstNames);
    const ln = getRandomElement(indianLastNames);
    return {
        fullName: `${fn} ${ln}`,
        email: `${fn.toLowerCase()}.${ln.toLowerCase()}.${Math.floor(Math.random() * 100000)}@example.com`,
        password: 'password123'
    };
};

const generateIndianWebsite = (userId, managerId, userName) => {
    // Mix of business names and portfolios
    const type = getRandomElement(businessTypes);
    let name;
    if (type === 'Portfolio') {
        name = `${userName} Portfolio`;
    } else {
        name = `${userName.split(' ')[1]} ${type}`;
    }
    
    return {
        name: name,
        url: name.toLowerCase().replace(/ /g, '') + '.in',
        status: getRandomElement(['Live', 'Pending', 'Maintenance', 'Live']),
        plan: getRandomElement(['Standard', 'Premium']),
        user_id: userId,
        manager_id: managerId
    };
};

const generateUserAssets = (userId, userName) => {
    const assets = [];
    
    // 1. Generate a License
    assets.push({
        user_id: userId,
        name: 'ABECSA Premium License',
        type: 'License',
        value: `ABC-${Math.random().toString(36).substr(2, 9).toUpperCase()}-${new Date().getFullYear()}`
    });

    // 2. Generate a Certificate (Mock URL)
    assets.push({
        user_id: userId,
        name: 'Certified Web Owner',
        type: 'Certificate',
        value: `https://drive.google.com/uc?id=mock_cert_id_${Math.floor(Math.random() * 1000)}`
    });

    return assets;
};

async function seed() {
    console.log('🌱 Starting Indian Data Seed (Excluding Ritik)...');

    // 1. Fetch Managers (As Anon - relies on RLS allowing read)
    const { data: managers, error: mgrError } = await supabase
        .from('profiles')
        .select('id, full_name')
        .eq('role', 'marketing_manager');

    if (mgrError) {
        console.error('Error fetching managers:', mgrError);
        return;
    }
    
    // Filter out "Ritik"
    const allowedManagers = (managers || []).filter(m => !m.full_name.toLowerCase().includes('ritik'));
    
    console.warn(`Original Managers: ${managers?.length || 0}. Allowed (Non-Ritik): ${allowedManagers.length}`);
    if (allowedManagers.length > 0) {
        console.log('✅ Allowed Managers:', allowedManagers.map(m => m.full_name).join(', '));
    } else {
        console.warn('⚠️ No allowed managers found! Users will be unassigned.');
    }

    // 2. Create 40 Customers & 40 Websites
    console.log('Creating 40 Indian Users and Websites...');
    
    for (let i = 0; i < 40; i++) {
        const userData = generateIndianUser();
        
        // A. Sign Up
        const { data: authData, error: authError } = await supabase.auth.signUp({
            email: userData.email,
            password: userData.password
        });

        if (authError) {
            console.error(`Error creating user ${userData.email}:`, authError.message);
            continue;
        }

        const user = authData.user;
        const session = authData.session;

        // B. Set Session (Impersonate)
        if (session) {
            await supabase.auth.setSession(session);
        }

        const assignedManager = allowedManagers.length > 0 ? getRandomElement(allowedManagers).id : null;

        // C. Update Profile
        const profileData = {
            id: user.id,
            full_name: userData.fullName,
            role: 'customer',
            email: userData.email,
            visible_password: userData.password,
            manager_id: assignedManager
        };

        const { error: profileError } = await supabase.from('profiles').upsert(profileData);

        if (profileError) {
            console.error(`   - Profile Error for ${userData.fullName}:`, profileError.message);
        } else {
            console.log(`   + Created: ${userData.fullName}`);
        }

        // D. Create 1 Website per user (To hit exactly 40 users and 40 websites)
        const site = generateIndianWebsite(user.id, assignedManager, userData.fullName);
        const { error: siteError } = await supabase.from('websites').insert([site]);
            
        if (siteError) console.error(`     - Website Error:`, siteError.message);
        else console.log(`     + Added Website: ${site.name}`);

        // E. Create Assets (License & Certificate)
        const assets = generateUserAssets(user.id, userData.fullName);
        const { error: assetError } = await supabase.from('user_assets').insert(assets);

        if (assetError) console.error(`     - Asset Error:`, assetError.message);
        else console.log(`     + Added ${assets.length} Assets`);

        // E. Sign Out
        await supabase.auth.signOut();
    }

    console.log(`✨ Indian Data Seeding completed!`);
}

seed();
