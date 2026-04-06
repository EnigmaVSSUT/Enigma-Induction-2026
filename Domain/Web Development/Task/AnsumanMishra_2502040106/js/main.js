/* ═══════════════════════════════════════════════
   MAIN.JS — Initialize everything on page load
═══════════════════════════════════════════════ */

// Initialize cursor
attachCursorHover('button, a');

// Render all grids
renderTeam();
renderProjects();
renderBlogs();

// Initialize scroll progress & observers
// (Already done in ui.js on page load)

console.log('✅ Enigma Club website initialized!');
console.log('📊 Team Members: ' + teamData.length);
console.log('🚀 Projects: ' + projects.length);
console.log('📝 Blog Posts: ' + blogs.length);
