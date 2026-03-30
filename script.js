// --- ANTI-SCRAPE / INSPECTOR BLOCKING ---
document.addEventListener('contextmenu', function(e) {
    e.preventDefault();
});

document.addEventListener('keydown', function(e) {
    if (e.key === 'F12' || 
       (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'i')) || 
       (e.ctrlKey && (e.key === 'U' || e.key === 'u')) ||
       (e.ctrlKey && e.shiftKey && (e.key === 'C' || e.key === 'c')) ||
       (e.ctrlKey && e.shiftKey && (e.key === 'J' || e.key === 'j'))) {
        e.preventDefault();
    }
});

// --- DOM GENERATION (Vercel Cards) ---
const servicesData = {
    website: { icon: '🌐', name: 'Website Development', price: '₹34,999', maint: '₹7,499/mo', feats: ['Custom Design','Mobile Responsive','Fast Loading','SEO Optimized'] },
    seo: { icon: '📈', name: 'SEO Ranking', price: '₹14,999', maint: '₹5,499/mo', feats: ['Keyword Research','On-Page SEO','Link Building','Analytics'] },
    chatbot: { icon: '🤖', name: 'AI Chatbot', price: '₹19,999', maint: '₹6,999/mo', feats: ['24/7 Support','Lead Capture','Custom Training','Multi-language'] },
    agents: { icon: '⚡', name: 'Custom AI Agents', price: '₹34,999', maint: '₹8,499/mo', feats: ['Workflow Auto','Data Analysis','Integrations','Scalable'] },
    social: { icon: '📱', name: 'Social Media Mgmt', price: '₹17,999', maint: '₹999/reel', feats: ['Content Creation','Scheduling','Analytics','Engagement'] },
    crm: { icon: '🔗', name: 'CRM Automation', price: '₹9,999', maint: 'N/A', feats: ['Auto Sync','Lead Scoring','Alerts','Custom Fields'] },
    video: { icon: '🎬', name: 'AI Creative Videos', price: '₹1,499', maint: 'per video', feats: ['Script Gen','Voice Over','Stock Footage','Fast Delivery'] },
};

document.querySelectorAll('.vercel-card').forEach(card => {
    const data = servicesData[card.dataset.service];
    if(!data) return;
    card.innerHTML = `
        <div class="service-icon">${data.icon}</div>
        <div class="service-name">${data.name}</div>
        <div class="green-badge">🎁 3+1 Maintenance Free</div>
        <div class="service-price">${data.price} <span style="font-size:0.8rem;color:#a1a1aa;font-weight:normal;">+ ${data.maint}</span></div>
        <ul class="service-features">${data.feats.map(f => `<li>✔️ ${f}</li>`).join('')}</ul>
        <div style="margin-top:auto;">
            <a href="#contact" class="btn btn-primary btn-full">Get Started</a>
            <a href="https://wa.me/919214582873?text=Hi%20Techy%20AI%20Solutions!%20Interested%20in%20${data.name}." class="wa-btn" target="_blank">WhatsApp Us</a>
        </div>
    `;
});

// --- UI INTERACTIONS ---
// Navbar Sticky
const navbar = document.getElementById('navbar');
let lastScrollY = window.scrollY;
window.addEventListener('scroll', () => {
    if(window.scrollY > 50) {
        if(window.scrollY > lastScrollY) navbar.classList.add('hidden'); // Scroll Down
        else navbar.classList.remove('hidden'); // Scroll Up
    }
    lastScrollY = window.scrollY;
});

// Dropdown Populate
const select = document.getElementById('serviceSelect');
Object.values(servicesData).forEach(s => {
    select.innerHTML += `<option value="${s.name}">${s.name}</option>`;
});

// Animated Counters (Stripe Style)
const counters = document.querySelectorAll('.counter');
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if(entry.isIntersecting) {
            const el = entry.target;
            const target = +el.getAttribute('data-target');
            let c = 0;
            const updateCounter = setInterval(() => {
                c += target/30;
                if(c >= target) { clearInterval(updateCounter); el.innerText = target; }
                else el.innerText = Math.ceil(c);
            }, 30);
            observer.unobserve(el);
        }
    });
});
counters.forEach(c => observer.observe(c));

// 3D Card Tilt has been removed in favor of CSS pop-up effect on hover

// --- SHIMO CHATBOT UI ---
const shimoApp = document.getElementById('shimoApp');
shimoApp.innerHTML = `
    <div class="shimo-label">Chat with Shimo! 👋</div>
    <div class="shimo-window" id="sbWindow">
        <div class="shimo-header">
            <div class="shimo-header-info">
                <div class="shimo-header-title">Shimo 🤖</div>
                <div class="shimo-header-sub">Techy AI Assistant • Online</div>
            </div>
            <button class="shimo-close" onclick="toggleChat()">✕</button>
        </div>
        <div class="shimo-body" id="sbBody"></div>
        <div class="shimo-input-area">
            <input type="text" id="sbInput" placeholder="Type a message..." onkeypress="if(event.key==='Enter') sendMsg()">
            <button class="shimo-send" onclick="sendMsg()">➤</button>
        </div>
    </div>
    <button class="shimo-toggle" id="shimoToggle" onclick="toggleChat()">
        <div class="shimo-toggle-inner"></div>
        <div class="shimo-toggle-ping"></div>
        <div class="shimo-icon-container" id="shimoIcon">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-bot"><path d="M12 8V4H8"/><rect width="16" height="12" x="4" y="8" rx="2"/><path d="M2 14h2"/><path d="M20 14h2"/><path d="M15 13v2"/><path d="M9 13v2"/></svg>
        </div>
    </button>
`;

let chatOpen = false;
let firstOpen = false;
function toggleChat() {
    chatOpen = !chatOpen;
    document.getElementById('sbWindow').classList.toggle('active', chatOpen);
    document.getElementById('shimoToggle').classList.toggle('open', chatOpen);
    document.querySelector('.shimo-label').style.display = 'none';
    
    // Switch icon
    const iconContainer = document.getElementById('shimoIcon');
    if (chatOpen) {
        iconContainer.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-x"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>';
    } else {
        iconContainer.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-bot"><path d="M12 8V4H8"/><rect width="16" height="12" x="4" y="8" rx="2"/><path d="M2 14h2"/><path d="M20 14h2"/><path d="M15 13v2"/><path d="M9 13v2"/></svg>';
    }

    if(chatOpen && !firstOpen) {
        firstOpen = true;
        addMsg("bot", "Hi there! 👋 I'm Shimo, Techy AI Solutions' AI Assistant! How can I help you today?");
        addQuickReplies(["Services", "Pricing", "Offers"]);
    }
}
function sanitizeInput(input) {
    const div = document.createElement('div');
    div.appendChild(document.createTextNode(input));
    return div.innerHTML;
}

function addMsg(sender, text) {
    const body = document.getElementById('sbBody');
    const msg = document.createElement('div');
    msg.className = `msg ${sender}`;
    
    // Sanitize the input to prevent DOM-based XSS attacks before replacing newlines
    const safeText = sanitizeInput(text).replace(/\n/g, '<br>');
    msg.innerHTML = safeText;
    
    body.appendChild(msg);
    body.scrollTop = body.scrollHeight;
}
function addQuickReplies(opts) {
    const body = document.getElementById('sbBody');
    const div = document.createElement('div');
    div.className = "quick-replies";
    opts.forEach(o => {
        const btn = document.createElement('button');
        btn.className = "qr-btn";
        btn.innerText = o;
        btn.onclick = () => { div.remove(); sendMsg(o); };
        div.appendChild(btn);
    });
    body.appendChild(div);
    body.scrollTop = body.scrollHeight;
}
function sendMsg(text) {
    const input = document.getElementById('sbInput');
    const val = text || input.value.trim();
    if(!val) return;
    addMsg("user", val);
    input.value = '';
    
    setTimeout(() => {
        const t = val.toLowerCase();
        let res = "That's a great question! 🤔\nI may not have the exact answer for that, but our team definitely does!\n📲 For more queries, contact us on WhatsApp: +91 9214582873\nWe'll get back to you within 24 hours! 😊";
        if(t.includes('service') || t.includes('what do you offer')) res = `We offer 7 powerful AI services! 🚀
1. 🌐 Website Development — ₹34,999
2. 📈 SEO Ranking — ₹14,999
3. 🤖 AI Chatbot — ₹19,999
4. ⚡ Custom AI Agents — ₹34,999
5. 📱 Social Media Management — ₹17,999
6. 🔗 Form to CRM Automation — ₹9,999
7. 🎬 AI Creative Videos — ₹1,499/video
Which service interests you?
📲 For more queries, contact us on WhatsApp: +91 9214582873`;
        else if(t.includes('price') || t.includes('pricing') || t.includes('cost') || t.includes('kitna')) res = `Our pricing starts from just ₹1,499! 💰
Here's a quick overview:
- Website: ₹34,999 one-time
- SEO: ₹14,999 one-time
- AI Chatbot: ₹19,999 one-time
- AI Agents: ₹34,999 one-time
- Social Media: ₹17,999 setup
- CRM Automation: ₹9,999 one-time
- AI Videos: ₹1,499/video
All services include monthly maintenance plans!
📲 For more queries, contact us on WhatsApp: +91 9214582873`;
        else if(t.includes('offer') || t.includes('discount') || t.includes('free')) res = `We have an amazing offer for you! 🎁
Pay for 3 months of maintenance on any service and get your 4th month COMPLETELY FREE!
📲 For more queries, contact us on WhatsApp: +91 9214582873`;
        else if(t.includes('hello') || t.includes('hi ') || t.includes('hey')) res = `Hello! 👋 Welcome to Techy AI Solutions!
I'm Shimo, your AI assistant. I can help you with:
- Our services & pricing
- Maintenance plans & offers
- How to get started
- Contact information
What would you like to know? 😊
📲 For more queries, contact us on WhatsApp: +91 9214582873`;
        addMsg("bot", res);
    }, 600);
}

// ==========================================
// THREE.JS IMPLEMENTATIONS
// ==========================================

const isMobile = window.innerWidth < 768;

if (!isMobile && THREE) {
    
    // --- 1. GLOBAL PARTICLE NETWORK ---
    const globalCanvas = document.getElementById('globalCanvas');
    const glScene = new THREE.Scene();
    const glCamera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
    const glRenderer = new THREE.WebGLRenderer({ canvas: globalCanvas, alpha: true, antialias:true });
    glRenderer.setSize(window.innerWidth, window.innerHeight);
    glCamera.position.z = 50;

    const glGeometry = new THREE.BufferGeometry();
    const glCount = 200; // Reduced from 500 for better 60fps performance with lines
    const glPositions = new Float32Array(glCount * 3);
    const glVelocities = [];

    for(let i=0; i<glCount; i++) {
        glPositions[i*3] = (Math.random() - 0.5) * 200;
        glPositions[i*3+1] = (Math.random() - 0.5) * 200;
        glPositions[i*3+2] = (Math.random() - 0.5) * 100;
        glVelocities.push({ x: (Math.random()-0.5)*0.1, y: Math.random()*0.1, z: (Math.random()-0.5)*0.1 });
    }
    glGeometry.setAttribute('position', new THREE.BufferAttribute(glPositions, 3));
    const glMaterial = new THREE.PointsMaterial({ color: 0x2563eb, size: 0.5 });
    const glPoints = new THREE.Points(glGeometry, glMaterial);
    glScene.add(glPoints);
    
    const lineMaterial = new THREE.LineBasicMaterial({ color: 0x7c3aed, transparent: true, opacity: 0.15 });

    function renderGlobal() {
        const positions = glPoints.geometry.attributes.position.array;
        
        let linePositions = [];
        
        for(let i=0; i<glCount; i++) {
            positions[i*3] += glVelocities[i].x;
            positions[i*3+1] += glVelocities[i].y;
            positions[i*3+2] += glVelocities[i].z;
            
            if(positions[i*3+1] > 100) positions[i*3+1] = -100;
            if(Math.abs(positions[i*3]) > 100) glVelocities[i].x *= -1;
            
            // Connect close particles
            for(let j=i+1; j<glCount; j++) {
                const dx = positions[i*3] - positions[j*3];
                const dy = positions[i*3+1] - positions[j*3+1];
                const dz = positions[i*3+2] - positions[j*3+2];
                const distSq = dx*dx + dy*dy + dz*dz;
                
                if(distSq < 150) {
                    linePositions.push(
                        positions[i*3], positions[i*3+1], positions[i*3+2],
                        positions[j*3], positions[j*3+1], positions[j*3+2]
                    );
                }
            }
        }
        
        glPoints.geometry.attributes.position.needsUpdate = true;
        
        // Remove old lines, draw new ones
        glScene.children = [glPoints]; 
        if(linePositions.length > 0) {
            const lineGeo = new THREE.BufferGeometry();
            lineGeo.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3));
            glScene.add(new THREE.LineSegments(lineGeo, lineMaterial));
        }
        
        glRenderer.render(glScene, glCamera);
        requestAnimationFrame(renderGlobal);
    }
    renderGlobal();

    // --- 2. HERO SPHERE AND PARTICLES ---
    const heroCanvas = document.getElementById('heroCanvas');
    const hScene = new THREE.Scene();
    const hCamera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
    const hRenderer = new THREE.WebGLRenderer({ canvas: heroCanvas, alpha: true, antialias:true });
    hRenderer.setSize(window.innerWidth, window.innerHeight);
    hCamera.position.z = 20;

    // Breathing glowing sphere
    const sphereGeo = new THREE.IcosahedronGeometry(8, 2);
    const sphereMat = new THREE.MeshBasicMaterial({ color: 0x7c3aed, wireframe: true, transparent: true, opacity: 0.3 });
    const sphere = new THREE.Mesh(sphereGeo, sphereMat);
    hScene.add(sphere);

    // 2000 Particles
    const pHGeo = new THREE.BufferGeometry();
    const pHCount = 2000;
    const pHPos = new Float32Array(pHCount * 3);
    const pOrigPos = new Float32Array(pHCount * 3);
    const pColor = new Float32Array(pHCount * 3);

    const c1 = new THREE.Color(0x2563eb); // Blue
    const c2 = new THREE.Color(0x7c3aed); // Violet

    for(let i=0; i<pHCount; i++) {
        // Form a galaxy shape
        const r = 15 + Math.random() * 20;
        const theta = Math.random() * Math.PI * 2;
        const x = r * Math.cos(theta);
        const y = (Math.random() - 0.5) * 10;
        const z = r * Math.sin(theta);
        
        pHPos[i*3] = x; pHPos[i*3+1] = y; pHPos[i*3+2] = z;
        pOrigPos[i*3] = x; pOrigPos[i*3+1] = y; pOrigPos[i*3+2] = z;
        
        const mixColor = Math.random() > 0.5 ? c1 : c2;
        pColor[i*3] = mixColor.r; pColor[i*3+1] = mixColor.g; pColor[i*3+2] = mixColor.b;
    }

    pHGeo.setAttribute('position', new THREE.BufferAttribute(pHPos, 3));
    pHGeo.setAttribute('color', new THREE.BufferAttribute(pColor, 3));
    const pHMat = new THREE.PointsMaterial({ size: 0.15, vertexColors: true, blending: THREE.AdditiveBlending });
    const hPoints = new THREE.Points(pHGeo, pHMat);
    hScene.add(hPoints);

    let mouseX = 0, mouseY = 0;
    document.addEventListener('mousemove', e => {
        mouseX = (e.clientX / window.innerWidth) * 2 - 1;
        mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
    });

    let time = 0;
    function renderHero() {
        time += 0.01;
        
        // Pulse sphere
        const scale = 1 + Math.sin(time * 2) * 0.05;
        sphere.scale.set(scale, scale, scale);
        sphere.rotation.y += 0.005;
        sphere.rotation.x += 0.002;
        
        // Rotate galaxy
        hPoints.rotation.y = time * 0.2;
        
        // Scroll explosion effect
        const scrollAmt = window.scrollY / 500;
        const positions = hPoints.geometry.attributes.position.array;
        
        for(let i=0; i<pHCount; i++) {
            // Apply original positions + mouse distortion + scroll explosion
            const ox = pOrigPos[i*3];
            const oy = pOrigPos[i*3+1];
            const oz = pOrigPos[i*3+2];
            
            // distance from center expands on scroll
            const expand = 1 + (scrollAmt * 2);
            
            // add distortion towards mouse
            positions[i*3] = ox * expand + (mouseX * 5 * Math.sin(i));
            positions[i*3+1] = oy * expand + (mouseY * 5 * Math.cos(i));
            positions[i*3+2] = oz * expand;
        }
        hPoints.geometry.attributes.position.needsUpdate = true;

        hRenderer.render(hScene, hCamera);
        requestAnimationFrame(renderHero);
    }
    renderHero();

    // --- 3. CONTACT PIN ENVELOPE ---
    const cCanvas = document.getElementById('contactCanvas');
    const cScene = new THREE.Scene();
    const cCamera = new THREE.PerspectiveCamera(50, cCanvas.clientWidth/cCanvas.clientHeight, 0.1, 100);
    const cRenderer = new THREE.WebGLRenderer({ canvas: cCanvas, alpha: true, antialias:true });
    // Match dimensions to container
    setTimeout(() => {
        cRenderer.setSize(cCanvas.clientWidth, cCanvas.clientHeight);
        cCamera.aspect = cCanvas.clientWidth / cCanvas.clientHeight;
        cCamera.updateProjectionMatrix();
    }, 1000);
    cCamera.position.z = 10;

    const envGeo = new THREE.OctahedronGeometry(2, 0);
    const envMat = new THREE.MeshBasicMaterial({ color: 0x2563eb, wireframe: true });
    const envMesh = new THREE.Mesh(envGeo, envMat);
    envMesh.position.set(-3, 2, 0); // specific positioning
    cScene.add(envMesh);

    function renderContact() {
        envMesh.rotation.y += 0.01;
        envMesh.rotation.x += 0.005;
        envMesh.position.y = 2 + Math.sin(Date.now() * 0.002) * 0.5; // hover
        cRenderer.render(cScene, cCamera);
        requestAnimationFrame(renderContact);
    }
    renderContact();

    // --- RE-SIZE LISTENER ---
    window.addEventListener('resize', () => {
        glRenderer.setSize(window.innerWidth, window.innerHeight);
        glCamera.aspect = window.innerWidth / window.innerHeight;
        glCamera.updateProjectionMatrix();
        
        hRenderer.setSize(window.innerWidth, window.innerHeight);
        hCamera.aspect = window.innerWidth / window.innerHeight;
        hCamera.updateProjectionMatrix();
    });

}

// --- WEB3FORMS AJAX SUBMISSION ---
const contactForm = document.getElementById('contactForm');
const formResult = document.getElementById('formResult');

if(contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalBtnText = submitBtn.innerText;
        submitBtn.innerText = 'Sending...';
        formResult.style.display = 'none';
        
        const formData = new FormData(contactForm);
        const object = Object.fromEntries(formData);
        const json = JSON.stringify(object);

        fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: json
        })
        .then(async (response) => {
            let json = await response.json();
            if (response.status == 200) {
                formResult.innerHTML = "✅ Message sent successfully! We'll be in touch soon.";
                formResult.style.color = "var(--primary)";
                formResult.style.background = "rgba(124, 58, 237, 0.1)";
                formResult.style.border = "1px solid rgba(124, 58, 237, 0.3)";
                formResult.style.display = "block";
                contactForm.reset();
            } else {
                formResult.innerHTML = "❌ " + json.message;
                formResult.style.color = "#ef4444";
                formResult.style.background = "rgba(239, 68, 68, 0.1)";
                formResult.style.border = "1px solid rgba(239, 68, 68, 0.3)";
                formResult.style.display = "block";
            }
        })
        .catch(error => {
            console.log(error);
            formResult.innerHTML = "❌ Something went wrong! Please try again.";
            formResult.style.color = "#ef4444";
            formResult.style.background = "rgba(239, 68, 68, 0.1)";
            formResult.style.border = "1px solid rgba(239, 68, 68, 0.3)";
            formResult.style.display = "block";
        })
        .finally(() => {
            submitBtn.innerText = originalBtnText;
            setTimeout(() => {
                formResult.style.display = "none";
            }, 6000);
        });
    });
}

