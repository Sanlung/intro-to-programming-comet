const today = new Date();
const thisYear = today.getFullYear();
const footer = document.querySelector('.footer-container');
const skills = ['HTML', 'CSS', 'Bootstrap', 'JavaScript', 'jQuery', 'Node', 'Express', 'MongoDB', 'Mongoose', 'Wordpress', 'Python'];
const skillsSection = document.querySelector('.skills-section');
const skillsList = skillsSection.querySelector('ul'); // or select '.skills-list'

// Set copyright paragraph in footer
const copyright = document.createElement('p');
copyright.className = "copyright";
copyright.innerHTML = `&copy; ${thisYear} Chung Kao`;
footer.prepend(copyright);

//Create skills list items
for(let i = 0; i < skills.length; i++) {
    let skill = document.createElement('li');
    skill.className = 'skill-item';
    skill.textContent = skills[i];
    skillsList.appendChild(skill);
}
