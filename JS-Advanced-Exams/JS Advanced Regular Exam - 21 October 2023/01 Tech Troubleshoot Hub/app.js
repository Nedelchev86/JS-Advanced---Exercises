window.addEventListener("load", solution);

function solution() {
    const allInputFields = {
        employee: document.querySelector("#employee"),
        category: document.querySelector("#category"),
        urgency: document.querySelector("#urgency"),
        team: document.querySelector("#team"),
        description: document.querySelector("#description"),
    };

    const addBtn = document.querySelector("#add-btn");
    addBtn.addEventListener("click", addTroubleshoot);

    function addTroubleshoot(e) {
        e.preventDefault();
        if (Object.values(allInputFields).some((t) => t.value === "")) {
            return;
        }
        console.log("yes");
    }
}
