/* ═══════════════════════════════════════════════
   DATA.JS — Static content: Team, Projects, Blogs
   Exposed as global constants (no import needed
   since we load all scripts via <script> tags)
═══════════════════════════════════════════════ */

// ── TEAM ──────────────────────────────────────────
const teamData = [
  {
    initials: 'AK', name: 'Aryan Kapoor', role: 'Club President',
    bio: 'Full-stack developer with a love for distributed systems. 4× hackathon winner.',
    tags: ['React', 'Go', 'Docker']
  },
  {
    initials: 'SN', name: 'Sneha Nair', role: 'VP Engineering',
    bio: 'ML engineer passionate about NLP and real-world AI applications in healthcare.',
    tags: ['Python', 'PyTorch', 'FastAPI']
  },
  {
    initials: 'RM', name: 'Rohan Mehta', role: 'Lead Designer',
    bio: 'UI/UX wizard who bridges the gap between beautiful and functional interfaces.',
    tags: ['Figma', 'CSS', 'Three.js']
  },
  {
    initials: 'PP', name: 'Priya Patel', role: 'DevOps Lead',
    bio: 'Kubernetes & CI/CD enthusiast. Keeps all club infrastructure humming 24/7.',
    tags: ['AWS', 'K8s', 'Terraform']
  },
  {
    initials: 'VS', name: 'Vikram Singh', role: 'Backend Dev',
    bio: 'Node.js and PostgreSQL specialist. Obsessed with query optimization and clean APIs.',
    tags: ['Node', 'PostgreSQL', 'Redis']
  },
  {
    initials: 'DG', name: 'Divya Gupta', role: 'Mobile Dev',
    bio: 'Flutter developer who ships cross-platform apps that actually feel native.',
    tags: ['Flutter', 'Dart', 'Firebase']
  },
  {
    initials: 'KR', name: 'Kabir Rao', role: 'Security Lead',
    bio: 'Ethical hacker and CTF champion. Teaches the club the art of breaking to build better.',
    tags: ['Pentesting', 'Python', 'Linux']
  },
  {
    initials: 'MA', name: 'Meera Agarwal', role: 'Blogger & PM',
    bio: 'Bridges technical and non-technical worlds. Runs our blog and project timelines.',
    tags: ['Writing', 'Jira', 'Notion']
  },
];

// ── PROJECTS ──────────────────────────────────────
const projects = [
  {
    id: 'p1', emoji: '🧠', name: 'SentimentAI',
    status: 'live', statusLabel: 'Live',
    desc: 'Real-time social media sentiment analysis dashboard with NLP-powered emotion detection.',
    stack: ['Python', 'BERT', 'FastAPI', 'React', 'PostgreSQL'],
    overview: 'SentimentAI is a production-grade dashboard that ingests live social media streams and classifies each post across 8 emotional categories using a fine-tuned BERT transformer. Built during Hackathon #4, it now processes over 50,000 posts per day for 3 pilot organizations.',
    problem: 'Marketing teams and researchers spend hours manually reading social data to understand public sentiment. Existing tools are either too expensive or too inaccurate for nuanced emotion detection beyond simple positive/negative.',
    solution: 'We fine-tuned a DistilBERT model on a custom-labeled dataset of 200,000 tweets and product reviews. The model runs behind a FastAPI microservice, feeds a PostgreSQL time-series store, and surfaces live charts in a React dashboard — all deployable in under 10 minutes via Docker Compose.',
    arch: `<span>Client</span>  ──▶  React Dashboard (Vite + Recharts)\n        │\n        ▼\n<span>Gateway</span> ──▶  FastAPI REST + WebSocket\n        │\n        ▼\n<span>AI Core</span> ──▶  DistilBERT Inference (Torch)\n        │\n        ▼\n<span>Storage</span> ──▶  PostgreSQL + TimescaleDB`,
  },
  {
    id: 'p2', emoji: '🔐', name: 'VaultPass',
    status: 'beta', statusLabel: 'Beta',
    desc: 'Zero-knowledge password manager with end-to-end AES-256 encryption and browser extension.',
    stack: ['Rust', 'AES-256', 'React', 'Chrome API', 'SQLite'],
    overview: 'VaultPass is a lightweight, privacy-first password manager built entirely on zero-knowledge principles. Your master password never leaves your device — all encryption and decryption happens client-side using AES-256-GCM, and we store only the ciphertext.',
    problem: 'Popular password managers are closed-source, charge monthly fees, and store decryption keys server-side — a critical trust assumption that has been broken multiple times by high-profile breaches.',
    solution: 'The Rust-based core handles key derivation (Argon2id) and encryption locally. A Chrome extension auto-fills credentials by communicating with a local daemon over a Unix socket. Cloud sync is optional and uses end-to-end encrypted blobs that the server can never read.',
    arch: `<span>Browser Ext</span> ──▶  Chrome Extension (React)\n        │  (Native Messaging)\n        ▼\n<span>Local Daemon</span> ──▶  Rust Binary\n        │  Argon2id + AES-256-GCM\n        ▼\n<span>Local Store</span> ──▶  SQLite (encrypted)\n        │  (optional)\n        ▼\n<span>Cloud Sync</span>  ──▶  Encrypted blobs only`,
  },
  {
    id: 'p3', emoji: '🎮', name: 'GridRunner',
    status: 'live', statusLabel: 'Live',
    desc: 'Multiplayer browser game built on WebSockets with a custom physics engine in TypeScript.',
    stack: ['TypeScript', 'Canvas API', 'WebSocket', 'Node.js', 'Redis'],
    overview: 'GridRunner is a real-time multiplayer grid-based game where up to 16 players compete in procedurally-generated mazes. The custom physics engine handles collision detection at 60fps, and matchmaking pairs players within 200ms globally using Redis-backed room state.',
    problem: 'Building a responsive multiplayer game in the browser that feels smooth and fair — without a dedicated game server fleet — is notoriously difficult. Network latency causes desync, and the browser Canvas API is not optimized for game loops out of the box.',
    solution: 'We implemented a client-side prediction + server reconciliation model (similar to what Overwatch uses). The game loop runs at a fixed 60fps tick on both client and server. A lightweight Node.js server manages authoritative state, and Redis pub/sub distributes events across horizontal shards.',
    arch: `<span>Players</span>   ──▶  Browser Canvas (TS Game Engine)\n        │  (WebSocket)\n        ▼\n<span>Game Server</span> ──▶  Node.js (60fps tick loop)\n        │\n        ▼\n<span>State Sync</span>  ──▶  Redis Pub/Sub\n        │\n        ▼\n<span>Matchmaking</span> ──▶  Redis Sorted Sets`,
  },
  {
    id: 'p4', emoji: '📊', name: 'CampusInsight',
    status: 'wip', statusLabel: 'WIP',
    desc: 'Data analytics platform giving students visibility into course performance and campus trends.',
    stack: ['Next.js', 'D3.js', 'Python', 'Pandas', 'Supabase'],
    overview: 'CampusInsight aggregates anonymized academic data to surface actionable insights for students and faculty. Students can benchmark their performance against cohort averages, identify high-risk courses early, and discover optimal study patterns based on historical grade distributions.',
    problem: 'Students make critical decisions — which courses to take, when to drop, how to allocate study time — with almost no data. Course registration portals show only course descriptions, not historical difficulty, average grades, or workload estimates.',
    solution: 'We built an ETL pipeline in Python/Pandas that anonymizes and aggregates academic records, loading them into Supabase. A Next.js frontend with D3.js renders interactive dashboards. Differential privacy noise is applied before any query result is returned to protect individual student data.',
    arch: `<span>Data Sources</span> ──▶  Registrar API + LMS Export\n        │\n        ▼\n<span>ETL Pipeline</span> ──▶  Python + Pandas (Anonymizer)\n        │\n        ▼\n<span>Data Store</span>  ──▶  Supabase (PostgreSQL)\n        │\n        ▼\n<span>Frontend</span>    ──▶  Next.js + D3.js Dashboard`,
  },
];

// ── BLOGS ──────────────────────────────────────────
const blogs = [
  {
    id: 'b1', cat: 'Machine Learning',
    title: 'Fine-tuning BERT for Emotion Classification',
    author: 'Sneha Nair', date: '12 Jan 2025', read: '8 min read',
    excerpt: 'How we achieved 91% accuracy on a custom emotion dataset using transfer learning.',
    content: `<p>Transfer learning has revolutionized NLP, and fine-tuning BERT is one of the most powerful techniques available to practitioners today. In this post, we walk through exactly how the Enigma team trained our emotion classification model for the SentimentAI project — from dataset curation all the way to production deployment.</p>
    <blockquote>Fine-tuning a pre-trained language model on domain-specific data is often more effective than training a specialized model from scratch, even when your dataset is small.</blockquote>
    <p>We started with a dataset of roughly 12,000 labeled social media posts across 8 emotion categories: joy, sadness, anger, fear, surprise, disgust, trust, and anticipation. The labeling was done collaboratively by 6 team members using a custom Streamlit annotation tool we built in a weekend. Inter-annotator agreement (Cohen's Kappa) was 0.82, which we considered strong enough to proceed.</p>
    <p>For the model itself, we chose DistilBERT over full BERT for inference speed — DistilBERT is 40% smaller and 60% faster while retaining 97% of BERT's performance on most benchmarks. We added a classification head with dropout (p=0.3) and fine-tuned for 5 epochs with a learning rate of 2e-5 using the AdamW optimizer. The final model achieves 91.3% macro-F1 on our held-out test set.</p>
    <p>Deployment was handled via a FastAPI endpoint wrapped in a Docker container, with model weights loaded once at startup and cached in GPU memory. Response latency averages 38ms per request on a single A10G GPU instance, which is well within our SLA of 200ms. We plan to explore quantization (INT8) in a future sprint to cut costs further.</p>`
  },
  {
    id: 'b2', cat: 'Security',
    title: 'Implementing Zero-Knowledge Authentication with SRP and Argon2id',
    author: 'Kabir Rao', date: '28 Jan 2025', read: '11 min read',
    excerpt: 'A deep dive into SRP protocol, Argon2id, and why your login form is probably insecure.',
    content: `<p>Most login systems work the same way: you send your password to the server, the server hashes it, and compares it to the stored hash. This works — until the server is compromised. At that point, all your users' passwords (and their reused passwords elsewhere) are at risk. Zero-knowledge authentication solves this by ensuring the server never sees your password at all.</p>
    <p>We implemented the Secure Remote Password (SRP-6a) protocol for VaultPass. SRP is a zero-knowledge proof protocol where the client and server jointly authenticate without the password ever traveling over the wire. Instead, the client proves it knows the password through a mathematical exchange of values derived from it.</p>
    <blockquote>In a well-implemented zero-knowledge system, a compromised server gives attackers absolutely no useful information about user passwords. The math makes it impossible — not just difficult.</blockquote>
    <p>For key derivation, we use Argon2id with memory=64MB, iterations=3, and parallelism=4. This configuration takes approximately 400ms on a modern laptop, which is fast enough to be non-annoying for users but expensive enough to make brute-force attacks computationally infeasible. The derived key is then used with AES-256-GCM to encrypt the vault locally before anything is sent to the server.</p>
    <p>The biggest challenge we faced was implementing SRP correctly in both Rust (server) and TypeScript (browser extension). We used the srp crate on the Rust side and a custom implementation in TS, with extensive cross-platform test vectors to ensure compatibility. If you're implementing this yourself: test vectors from RFC 5054 are your best friend. Get them passing before writing anything else.</p>`
  },
  {
    id: 'b3', cat: 'Web Dev',
    title: 'Building a Lag-Free Multiplayer Game with Client-Side Prediction',
    author: 'Aryan Kapoor', date: '5 Feb 2025', read: '9 min read',
    excerpt: 'Client-side prediction, server reconciliation, and how we kept GridRunner lag-free.',
    content: `<p>Building a multiplayer game that feels responsive is one of the hardest problems in web development. The core challenge is simple to state: your server is authoritative, but network round trips take time. If you wait for server confirmation before showing player movement, the game feels laggy and unplayable. The solution is client-side prediction.</p>
    <p>In GridRunner, when a player presses a movement key, we immediately move their character on the client — don't wait for the server. Simultaneously, we send the input to the server along with the input sequence number. The server processes the input, updates authoritative state, and sends back the canonical position tagged with the sequence number. The client then compares its predicted position to the server position and smoothly corrects any discrepancy (reconciliation).</p>
    <blockquote>Client-side prediction with server reconciliation is the same technique used by games like Overwatch and Counter-Strike. The math is surprisingly approachable, even in a browser environment.</blockquote>
    <p>For our WebSocket server, we chose Node.js with the ws library over alternatives like Socket.io because we wanted raw control over the binary message format. We use a custom binary protocol (ArrayBuffer + DataView) instead of JSON, which reduced our average message size by 73% and cut bandwidth costs proportionally. The game tick runs at 60Hz on a fixed interval, and we skip ticks if the event loop is lagging rather than trying to catch up — this prevents the "spiral of death" where a slow server makes itself slower.</p>
    <p>Redis pub/sub handles cross-shard communication when rooms span multiple Node.js processes. Each room has a designated "primary" process that owns authoritative state, and secondary processes relay inputs to it and subscribe to state updates. This gave us horizontal scalability without needing a shared-memory solution.</p>`
  },
  {
    id: 'b4', cat: 'DevOps',
    title: 'Running a 3-Node K8s Cluster for Under $40/Month',
    author: 'Priya Patel', date: '19 Feb 2025', read: '7 min read',
    excerpt: 'How we run all club projects on a 3-node K8s cluster for under $40/month.',
    content: `<p>Running production-like infrastructure on a student budget forces you to get creative. After outgrowing our single DigitalOcean droplet, we moved all Enigma club projects to a 3-node Kubernetes cluster that costs us $38/month total after education credits. Here's exactly how we did it and what we learned along the way.</p>
    <p>Our cluster runs on 3× DigitalOcean Droplets (2vCPU, 4GB RAM each) using k3s — a lightweight Kubernetes distribution that runs comfortably on small VMs. k3s replaces heavy components like etcd with SQLite for the control plane, cutting memory overhead significantly. For persistent storage, we use Longhorn, which replicates volumes across nodes for redundancy.</p>
    <blockquote>k3s proved that you don't need a $500/month managed cluster to learn and run real Kubernetes workloads. The API surface is identical — the difference is just in operational overhead.</blockquote>
    <p>Every club project gets its own Kubernetes Namespace with ResourceQuotas enforced: max 500m CPU and 512Mi memory per pod, 2 replicas minimum for anything serving traffic. This prevents any single project from starving others. Ingress is handled by nginx-ingress-controller with cert-manager issuing free Let's Encrypt TLS certificates automatically.</p>
    <p>Our CI/CD pipeline uses GitHub Actions to build Docker images, push to our private Docker Hub repo, and roll out deployments via kubectl set image. Average deployment time from merge to production is 3 minutes and 22 seconds. We track this metric obsessively — it's the single best proxy for development velocity we've found at our scale.</p>`
  },
  {
    id: 'b5', cat: 'Career',
    title: 'How to Crack Your First SDE Internship as a 2nd Year',
    author: 'Meera Agarwal', date: '3 Mar 2025', read: '6 min read',
    excerpt: 'The actual playbook — what to build, when to apply, and how to prep for technical screens.',
    content: `<p>The internship hunt feels mysterious and arbitrary until you understand the process from the recruiter's side. I secured my first SDE internship at a Series B startup in my second year, and I want to share the exact playbook I used — not the generic "LeetCode hard every day" advice, but the actual strategy that worked.</p>
    <p>Start applying in September for summer internships, not December. Most companies fill 60–70% of their intern slots before the end of October through early referrals and campus drives. If you apply in December, you're competing for the remaining spots with a much larger applicant pool. The meta-advice is: your application timeline matters more than most people realize.</p>
    <blockquote>A single strong project with a deployed URL is worth 10 lines of random course certifications on your resume. Recruiters click links. Give them something that actually runs.</blockquote>
    <p>For technical interviews, I categorized problems into 8 patterns: two pointers, sliding window, BFS/DFS, dynamic programming, intervals, binary search, heaps, and graphs. Rather than doing 200 random LeetCode problems, I did 20 problems per pattern with deep understanding. Being able to explain the pattern and when to apply it mattered far more than having memorized the solution.</p>
    <p>Finally, on behaviorals: STAR format is not optional. Every behavioral answer needs a Situation, Task, Action, and Result with a specific metric or outcome. "I improved the performance" is not an answer. "I reduced API response time by 340ms by adding Redis caching, which improved our Lighthouse score by 18 points" is an answer. Specificity signals seniority.</p>`
  },
  {
    id: 'b6', cat: 'Open Source',
    title: 'First Open Source Contribution: Lessons from the Trenches',
    author: 'Rohan Mehta', date: '15 Mar 2025', read: '5 min read',
    excerpt: 'What nobody tells you about contributing to large open source projects for the first time.',
    content: `<p>Contributing to open source sounds glamorous until you open a codebase with 400,000 lines of code and realize you don't know where to begin. Our team's first major open source contribution — a performance patch to a popular React charting library — took three weeks from first clone to merged PR. Here's what we learned that nobody puts in the "How to Contribute" guides.</p>
    <p>The first week was entirely orientation. We read the CONTRIBUTING.md, set up the dev environment, ran the test suite (1,847 tests, 4 minutes), and browsed issues labeled "good first issue." We picked a rendering performance issue that had been open for 6 months — not because it was easy, but because it had a clear reproduction case and the maintainer had commented with a suggested approach.</p>
    <blockquote>Pick issues that have maintainer engagement, not just "good first issue" labels. An active maintainer who's already outlined an approach will give you feedback within days. A stale issue might sit for months.</blockquote>
    <p>Our patch used useMemo and useCallback to memoize expensive computations in the animation loop. The trick was writing the benchmark first — we used React's built-in profiler to capture before/after flame graphs. Numbers don't lie: our change reduced re-render time from 18ms to 6ms on a dataset of 10,000 points. Submitting those flame graphs with the PR was the reason it got reviewed within 24 hours.</p>
    <p>The code review itself was humbling. Three maintainers left 11 comments over two rounds. Each one taught us something about the project's conventions, performance philosophy, or edge cases we hadn't considered. The final merged PR was significantly cleaner than what we originally submitted. That's the real value of open source contribution — not the GitHub green square, but the mentorship embedded in the review process.</p>`
  },
];
