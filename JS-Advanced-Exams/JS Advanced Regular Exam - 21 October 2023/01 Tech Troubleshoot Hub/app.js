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

    const currentElement = {};

    const previewList = document.querySelector(".preview-list");
    const pendingList = document.querySelector(".pending-list");
    const resolvedList = document.querySelector(".resolved-list");

    function createDomElement(type, parrent, textContent, classList, id, attributes, useInnerHtml) {
        const element = document.createElement(type);

        if (useInnerHtml && textContent) {
            element.innerHTML = textContent;
        } else {
            if (textContent && type !== "input") {
                element.textContent = textContent;
            }
        }
        if (textContent && type === "input") {
            element.value = textContent;
        }

        if (classList && classList.length > 0) {
            element.classList.add(...classList);
        }

        if (id) {
            element.id = id;
        }

        if (attributes) {
            for (const key in attributes) {
                element[key] = attributes[key];
            }
        }

        if (parrent) {
            parrent.appendChild(element);
        }
        return element;
    }

    function addTroubleshoot(e) {
        e.preventDefault();
        if (Object.values(allInputFields).some((t) => t.value === "")) {
            return;
        }
        const {employee, category, urgency, team, description} = allInputFields;

        const li = createDomElement("li", previewList, null, ["problem-content"]);
        const article = createDomElement("article", li);

        createDomElement("p", article, `From: ${employee.value}`);
        createDomElement("p", article, `Category: ${category.value}`);
        createDomElement("p", article, `Urgency: ${urgency.value}`);
        createDomElement("p", article, `Assigned to: ${team.value}`);
        createDomElement("p", article, `Description: ${description.value}`);

        const editBtn = createDomElement("button", li, "Edit", ["edit-btn"]);
        editBtn.addEventListener("click", editTroubleshoot);

        const continueBtn = createDomElement("button", li, "Continue", ["continue-btn"]);
        continueBtn.addEventListener("click", continueToPending);

        addBtn.disabled = true;

        Object.keys(allInputFields).forEach((key) => {
            currentElement[key] = allInputFields[key].value;
            allInputFields[key].value = "";
        });
    }

    function editTroubleshoot() {
        Object.keys(allInputFields).forEach((key) => {
            allInputFields[key].value = currentElement[key];
        });
        addBtn.disabled = false;
        previewList.innerHTML = "";
    }

    function continueToPending() {
        addBtn.disabled = false;
        const troubleshoot = document.querySelector(".problem-content");
        troubleshoot.querySelector("button").remove();
        troubleshoot.querySelector("button").remove();

        const resolvedBtn = createDomElement("button", troubleshoot, "Resolved", ["resolve-btn"]);
        resolvedBtn.addEventListener("click", rosolveTroubleshoot);
        pendingList.appendChild(troubleshoot);
    }

    function rosolveTroubleshoot() {
        const troubleshoot = document.querySelector(".problem-content");
        troubleshoot.querySelector("button").remove();

        const resolvedBtn = createDomElement("button", troubleshoot, "Clear", ["clear-btn"]);
        resolvedBtn.addEventListener("click", clearTroubleshoot);
        resolvedList.appendChild(troubleshoot);
    }

    function clearTroubleshoot() {
        resolvedList.innerHTML = "";
    }
}
