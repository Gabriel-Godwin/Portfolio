console.log("Skill script loaded!");




document.addEventListener("DOMContentLoaded", function () {
    const skillBars = document.querySelectorAll(".skill-fill");

    console.log("Skill Bars found:", skillBars); //Check if element exists

    if (skillBars.length === 0) {
        console.error("No skill-fill elements found!")
        return;
    }

    const observerOptions = {
        root: null,
        rootMargin: "0px",
        threshold: 0.3, //Trigger when 30% of the skill bar is in view
    };

    const revealSkillBar = (entries, observer) => {
        entries.forEach(entry => {
        
            if (entry.isIntersecting) {
                const skillBar = entry.target;
                const percentage = parseInt(skillBar.dataset.percentage);
                const skillText = skillBar.parentElement.previousElementSibling;

                console.log("Triggered:", skillBar, "Width:", percentage + "%");

                //Animate Width

                skillBar.style.transition = "Width 1.5s ease-in-out"; //transition
                skillBar.style.width = percentage + "%";

                //Counting Effect

                let count = 0;
                const interval = setInterval(() => {
                    if (count>= percentage) {
                        clearInterval(interval);
                    }else{
                        count++;
                        skillText.textContent = count + "%";
                    }
                }, 20)
                

               // // Animate the width
               // // skillBar.style.width = skillBar.dataset.percentage; //Use the data-percentage attribute

                observer.unobserve(skillBar); // stop observing once animated
            }
        });
    };

    const observer = new IntersectionObserver(revealSkillBar,observerOptions);

    skillBars.forEach(bar => {
        bar.style.width = "0"; //Start from 0 for the animation to be smooth
        // bar.dataset.percentage = bar.getAttribute("style").match(/width:\s*(\d+%)/)[1];
        observer.observe(bar);
    });
    
});