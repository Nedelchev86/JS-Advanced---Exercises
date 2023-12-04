window.addEventListener("load", solve);

function solve() {
    const allInputFields = {
        postTitle: document.querySelector("#post-title"),
        postCategory: document.querySelector("#post-category"),
        postContent: document.querySelector("#post-content"),
    };

    const publishBtn = document.querySelector("#publish-btn");
    publishBtn.addEventListener("click", pubslihInformation);

    const reviewList = document.querySelector("#review-list");

    const clearBtn = document.querySelector("#clear-btn");
    clearBtn.addEventListener("click", clearAllPosts);

    let currentElement = {};

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

    function pubslihInformation() {
        if (Object.values(allInputFields).some((v) => v.value === "")) {
            return;
        }
        const li = createDomElement("li", reviewList, null, ["rpost"]);
        const article = createDomElement("article", li);
        createDomElement("h4", article, allInputFields.postTitle.value);
        createDomElement("p", article, `Category: ${allInputFields.postCategory.value}`);
        createDomElement("p", article, `Content: ${allInputFields.postContent.value}`);
        const editBtn = createDomElement("button", li, "Edit", ["action-btn", "edit"]);
        editBtn.addEventListener("click", editInformation);

        const approveBtn = createDomElement("button", li, "Approve", ["action-btn", "approve"]);
        approveBtn.addEventListener("click", approvePost);
        currentElement = {
            postTitle: allInputFields.postTitle.value,
            postCategory: allInputFields.postCategory.value,
            postContent: allInputFields.postContent.value,
        };
        clearInputs();
    }

    function editInformation() {
        reviewList.innerHTML = "";
        Object.keys(allInputFields).forEach((key) => {
            allInputFields[key].value = currentElement[key];
        });
    }

    function clearInputs() {
        Object.values(allInputFields).forEach((el) => (el.value = ""));
    }

    function approvePost() {
        const myPost = document.querySelector(".rpost");
        console.log(myPost);
        myPost.querySelector("button").remove();
        myPost.querySelector("button").remove();

        document.querySelector("#published-list").appendChild(myPost);
    }

    function clearAllPosts() {
        document.querySelector("#published-list").innerHTML = "";
    }
}
