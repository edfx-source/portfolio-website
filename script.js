document.getElementById("theme-toggle").addEventListener("click", function() {
    document.body.classList.toggle("dark-mode");
    localStorage.setItem("theme", document.body.classList.contains("dark-mode") ? "dark" : "light");
});

// Check local storage for theme preference on load
window.onload = function() {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
        document.body.classList.add("dark-mode");
    }
};

// Fetch GitHub repositories
const GITHUB_USERNAME = 'your-github-username';
fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated`)
    .then(res => res.json())
    .then(data => {
        const projectsList = document.getElementById("projects-list");
        data.slice(0, 6).forEach(repo => {
            const projectCard = document.createElement("div");
            projectCard.className = "project-card";
            projectCard.innerHTML = `
                <h4>${repo.name}</h4>
                <p>${repo.description || 'No description provided.'}</p>
                <a href="${repo.html_url}" target="_blank" style="color: #007BFF;">View on GitHub</a>
            `;
            projectsList.appendChild(projectCard);
        });
    })
    .catch(err => console.error('Error fetching GitHub repositories:', err));
