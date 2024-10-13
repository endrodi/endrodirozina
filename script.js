document.getElementById('contact-form').addEventListener('submit', function(event) {
    event.preventDefault();
    alert("Message sent! We'll get back to you soon.");
});

// GitHub API meghívása
function fetchGitHubProjects() {
    const githubUsername = 'github-felhasználóneved'; // Cseréld le a saját GitHub felhasználónevedre
    const apiUrl = `https://api.github.com/users/${githubUsername}/repos`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const projectGrid = document.getElementById('github-projects');
            data.forEach(repo => {
                // Minden egyes repo esetén új div-et hozunk létre
                const projectCard = document.createElement('div');
                projectCard.classList.add('project-card');
                projectCard.innerHTML = `
                    <h3>${repo.name}</h3>
                    <p>${repo.description || 'No description available'}</p>
                    <a href="${repo.html_url}" target="_blank">View on GitHub</a>
                `;
                projectGrid.appendChild(projectCard);
            });
        })
        .catch(error => console.error('Error fetching GitHub repos:', error));
}

// Hívjuk meg a fetchGitHubProjects függvényt amikor betölt az oldal
window.onload = function() {
    fetchGitHubProjects();
}

document.addEventListener('DOMContentLoaded', () => {
    fetch('https://randomuser.me/api/')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            const user = data.results[0];
            const userInfo = `
                <p>Név: ${user.name.first} ${user.name.last}</p>
                <p>Email: ${user.email}</p>
                <img src="${user.picture.medium}" alt="User Picture">
            `;
            document.getElementById('user-info').innerHTML = userInfo;
        })
        .catch(error => {
            console.error('Hiba történt:', error);
        });
});
