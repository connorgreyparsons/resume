
const fetchJSON = url => {
    return fetch(url)
      .then(response => {
        return response.json()
      })
      .then(data => {
        buildPage(data)
      })
      .catch(error => {
        console.error('Something went wrong')
      })
  }

const buildPage = resume => {
    // PERSONAL
    const personal = document.createElement('section')

    // Name
    const name = document.createElement('h1')
    name.textContent = resume.personal.name
    personal.appendChild(name)
    // Subheading
    const subheading = document.createElement('h2')
    subheading.textContent = `${resume.personal.title} • ${resume.personal.location}`
    personal.appendChild(subheading)
    // Contact Links
    const contactLinksArea = document.createElement('div')
    const contactLinksP = document.createElement('p')
    resume.personal.contactLinks.forEach((link, i) => {
        const htmlLink = document.createElement('a')
        htmlLink.href = link.href
        htmlLink.target = '_blank'
        htmlLink.innerText = link.label
        contactLinksP.appendChild(htmlLink)
        if (i < resume.personal.contactLinks.length - 1) {
            contactLinksP.appendChild(document.createTextNode(' • '))
        }
    })
    contactLinksArea.appendChild(contactLinksP)
    personal.appendChild(contactLinksArea)

    // Misc Links
    // const miscLinksArea = document.createElement('div')
    // const miscLinksP = document.createElement('p')
    // resume.personal.miscLinks.forEach((link, i) => {
    //     const htmlLink = document.createElement('a')
    //     htmlLink.href = link.href
    //     htmlLink.target = '_blank'
    //     htmlLink.innerText = link.label
    //     miscLinksP.appendChild(htmlLink)
    //     if (i < resume.personal.miscLinks.length - 1) {
    //         miscLinksP.appendChild(document.createTextNode(' • '))
    //     }
    // })
    // miscLinksArea.appendChild(miscLinksP)
    // personal.appendChild(miscLinksArea)

    document.body.appendChild(personal)

    // create header
    const createHeader = label => {
        const header = document.createElement('h2')
        const headerU = document.createElement('u')
        headerU.textContent = label
        header.appendChild(headerU)
        return header
    }

    // SKILLS

    // Skills
    const skills = document.createElement('section')
    skills.appendChild(createHeader('Skills & Buzzwords'))
    const skillsP = document.createElement('p')
    let skillsList = resume.skills
    skillsList.sort((a, b) => a.toLowerCase() < b.toLowerCase() ? -1 : 1)
    skillsList = [...new Set(skillsList)]
    skillsP.innerText = skillsList.join(', ')

    skills.appendChild(skillsP)
    document.body.appendChild(skills)

    // EXPERIENCE

    // Experience section
    const experience = document.createElement('section')
    experience.appendChild(createHeader('Experience'))

    // Job
    const createJob = (job) => {
        const div = document.createElement('div')
        // Company Info
        const header = document.createElement('h3')
        const companyName = document.createElement('a')
        companyName.href = job.link
        companyName.target = '_blank'
        companyName.innerText = job.company
        // const companyName = document.createTextNode(job.company)
        const companyInfo = document.createElement('small')
        companyInfo.innerText = ` • ${job.location}${job.isRemote ? ' (Remote)' : ''} • ${job.startDate} - ${job.endDate}`
        header.appendChild(companyName)
        header.appendChild(companyInfo)
        // header.innerText = job.company  `${job.location}${job.isRemote ? ' (Remote)' : ''} • ${job.startDate} - ${job.endDate}`
        div.appendChild(header)
        // Projects
        const projects = document.createElement('ul')
        job.projects.forEach(project => {
            const div = document.createElement('div')
            const projectLabel = document.createElement('h5')
            projectLabel.innerText = project.label
            div.appendChild(projectLabel)
            const bullets = document.createElement('ul')
            project.bullets.forEach(bullet => {
                const li = document.createElement('li')
                li.innerText = bullet
                bullets.appendChild(li)
            })
            div.appendChild(bullets)
            projects.appendChild(div)
        })

        div.appendChild(projects)
        return div
    }
    resume.experience.forEach(exp => experience.appendChild(createJob(exp)))
    document.body.appendChild(experience)

    // EDUCATION

    // Education section
    const education = document.createElement('section')
    experience.appendChild(createHeader('Education'))

    // Credentials
    const createCredential = (program) => {
        const div = document.createElement('div')
        // Institution
        const header = document.createElement('h3')
        const institutionName = document.createTextNode(program.institution)
        const institutionLocation = document.createElement('small')
        institutionLocation.innerText = ` • ${program.location}`
        header.appendChild(institutionName)
        header.appendChild(institutionLocation)
        div.appendChild(header)
        // Credential earned
        const credential = document.createElement('p')
        credential.innerText = `${program.credential}, ${program.date}`
        div.appendChild(credential)

        return div
    }
    resume.education.forEach(edu => education.appendChild(createCredential(edu)))
    document.body.appendChild(education)
}


fetchJSON('./resume.json')