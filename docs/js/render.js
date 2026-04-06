/* ═══════════════════════════════════════════════
   RENDER.JS — Render Team Grid, Project Grid,
               Blog Grid with all event listeners
═══════════════════════════════════════════════ */

// ── RENDER TEAM ────────────────────────────────
function renderTeam() {
  const tg = document.getElementById('teamGrid');
  
  const colors = [
    ['#00f5ff', '#00ff88'],
    ['#00ff88', '#f5c518'],
    ['#f5c518', '#ff3860'],
    ['#ff3860', '#00f5ff'],
    ['#a78bfa', '#00f5ff'],
    ['#00f5ff', '#a78bfa'],
    ['#00ff88', '#00f5ff'],
    ['#f5c518', '#00ff88'],
  ];
  
  teamData.forEach((m, i) => {
    const c = colors[i % colors.length];
    const card = document.createElement('div');
    card.className = 'team-card reveal';
    
    card.innerHTML = `
      <div class="member-avatar" style="background:linear-gradient(135deg,${c[0]},${c[1]})">${m.initials}</div>
      <div class="member-name">${m.name}</div>
      <div class="member-role">${m.role}</div>
      <div class="member-bio">${m.bio}</div>
      <div>${m.tags.map(t => `<span class="member-tag">${t}</span>`).join('')}</div>
    `;
    
    // 3D tilt effect on hover
    card.addEventListener('mousemove', e => {
      const r = card.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      card.style.transform = `perspective(600px) rotateY(${x * 12}deg) rotateX(${-y * 12}deg) translateY(-6px)`;
    });
    
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
    
    tg.appendChild(card);
    revObs.observe(card);
  });
  
  // Attach cursor hover effects after rendering
  attachCursorHover('.team-card');
}

// ── RENDER PROJECTS ────────────────────────────
function renderProjects() {
  const pg = document.getElementById('projectsGrid');
  
  projects.forEach(p => {
    const card = document.createElement('div');
    card.className = 'project-card reveal';
    
    card.innerHTML = `
      <div class="project-img">
        <div class="project-img-bg" style="background:linear-gradient(135deg,rgba(0,245,255,.08),rgba(0,255,136,.08))">${p.emoji}</div>
      </div>
      <div class="project-body">
        <span class="project-status status-${p.status}">${p.statusLabel}</span>
        <div class="project-name">${p.name}</div>
        <div class="project-desc">${p.desc}</div>
        <div class="project-stack">${p.stack.map(s => `<span class="stack-tag">${s}</span>`).join('')}</div>
        <div class="project-btns">
          <button class="btn-view" onclick="openProject('${p.id}')">⟶ View</button>
          <button class="btn-disabled" disabled>⌥ GitHub</button>
          <button class="btn-disabled" disabled>▷ Try Now</button>
        </div>
      </div>
    `;
    
    pg.appendChild(card);
    revObs.observe(card);
  });
  
  // Attach cursor hover effects
  attachCursorHover('.project-card, .btn-view');
}

// ── RENDER BLOGS ───────────────────────────────
function renderBlogs() {
  const bg = document.getElementById('blogsGrid');
  
  blogs.forEach(b => {
    const card = document.createElement('div');
    card.className = 'blog-card reveal';
    
    card.innerHTML = `
      <div class="blog-cat">${b.cat}</div>
      <div class="blog-title">${b.title}</div>
      <div class="blog-excerpt">${b.excerpt}</div>
      <div class="blog-meta">
        <span>✍ ${b.author}</span>
        <span>📅 ${b.date}</span>
        <span>⏱ ${b.read}</span>
      </div>
      <div class="blog-read-more">Read Article ⟶</div>
    `;
    
    // Click to open overlay
    card.addEventListener('click', () => openBlog(b.id));
    
    bg.appendChild(card);
    revObs.observe(card);
  });
  
  // Attach cursor hover effects
  attachCursorHover('.blog-card');
}

// Expose globally
window.renderTeam = renderTeam;
window.renderProjects = renderProjects;
window.renderBlogs = renderBlogs;
