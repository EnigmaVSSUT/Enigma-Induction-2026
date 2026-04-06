// Dummy Data
const team = [
  { name: "Alex", role: "Frontend Dev", bio: "Loves UI/UX" },
  { name: "Sam", role: "Backend Dev", bio: "API expert" }
];

const projects = [
  { title: "AI Chatbot", desc: "Smart chatbot" },
  { title: "Website Builder", desc: "Drag & drop tool" }
];

const blogs = [
  { title: "Web Dev Basics", content: "Learn HTML CSS JS" },
  { title: "Intro to AI", content: "Machine learning basics" }
];

// Render Team
const teamContainer = document.getElementById("team-container");
team.forEach(member => {
  teamContainer.innerHTML += `
    <div class="card">
      <h3>${member.name}</h3>
      <p>${member.role}</p>
      <p>${member.bio}</p>
    </div>
  `;
});

// Render Projects
const projectContainer = document.getElementById("project-container");
projects.forEach(p => {
  projectContainer.innerHTML += `
    <div class="card">
      <h3>${p.title}</h3>
      <p>${p.desc}</p>
    </div>
  `;
});

// Render Blogs
const blogContainer = document.getElementById("blog-container");
blogs.forEach(b => {
  blogContainer.innerHTML += `
    <div class="card">
      <h3>${b.title}</h3>
      <p>${b.content}</p>
    </div>
  `;
});

// Contact Form
document.getElementById("contactForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const data = {
    name: document.getElementById("name").value,
    email: document.getElementById("email").value,
    message: document.getElementById("message").value
  };

  await fetch("http://localhost:5000/contact", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });

  alert("Message sent!");
});