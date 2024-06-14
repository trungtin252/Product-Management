// Pagination
const pagination = document.querySelector(".pagination");

if (pagination) {
    const pagination_button = pagination.querySelectorAll(".page-link");
    let url = new URL(window.location.href);
    pagination_button.forEach((button) => {
        button.addEventListener("click", () => {
            const value = button.value;
            if (value) {
                url.searchParams.set("page", value);
            } else {
                url.searchParams.delete("page");
            }
            window.location.href = url.href;
        })
    })
}


// Create product
const uploadImage = document.querySelector('div[upload-image]');
if (uploadImage) {
    const uploadInput = uploadImage.querySelector('[upload-image-input]');
    uploadInput.addEventListener("change", () => {
        const [file] = uploadInput.files;
        if (file) {
            const imagePreview = uploadImage.querySelector('[upload-image-img]');
            imagePreview.src = URL.createObjectURL(file);
        }
    })
}




// Filter
function filter() {
    const type = document.getElementById("type-filter").value;
    let url = new URL(window.location.href);
    if (type) {
        url.searchParams.set("status", type);
    } else {
        url.searchParams.delete("status");
    }
    window.location.href = url.href;
}

// Change status one
const statusButtons = document.querySelectorAll("[button-change-status]");
if (statusButtons) {
    const formchangeStatus = document.querySelector(".change-status-form");
    const path = formchangeStatus.getAttribute("data-path");
    statusButtons.forEach(button => {
        button.addEventListener("click", () => {
            const currentStatus = button.getAttribute("data-status");
            const id = button.getAttribute("data-id-item");
            const status = currentStatus == "active" ? "inactive" : "active";

            const action = path + `/${status}/${id}?_method=PATCH`;

            formchangeStatus.action = action;
            formchangeStatus.submit();
        })
    })
}

// Change multi
const formchageMulti = document.querySelector("[form-change-multi]");
if (formchageMulti) {
    formchageMulti.addEventListener("submit", (e) => {
        e.preventDefault();
        let ids = [];
        const itemChecked = document.querySelectorAll("input[name='id']:checked");
        if (itemChecked.length == 0) {
            window.alert("Vui lòng chọn ít nhất 1 bản ghi");
            return;
        }
        itemChecked.forEach(item => {
            ids.push(item.value);
        })
        if (ids.length > 0) {
            const inputForm = formchageMulti.querySelector("input[name='ids']");
            inputForm.value = ids.join(', ');
        }
        formchageMulti.submit();
    })
}

// Delete
const buttonDeletes = document.querySelectorAll("[button-delete]");
if (buttonDeletes) {
    buttonDeletes.forEach(button => {
        button.addEventListener("click", () => {
            const id = button.getAttribute("data-id");

            const confirmChecked = confirm("Bạn có chắc muốn xóa sản phẩm");
            if (!confirmChecked) {
                return;
            }
            const deleteForm = document.querySelector(".delete-item-form");
            const path = deleteForm.getAttribute("data-path");
            deleteForm.action = path + `/${id}?_method=DELETE`;

            deleteForm.submit();
        })
    })
}

// Change position
if (formchageMulti) {
    formchageMulti.addEventListener("submit", (e) => {
        e.preventDefault();
        const type = formchageMulti.querySelector("select").value;
        if (type == "change-position") {
            let ids = [];
            const itemChecked = document.querySelectorAll("input[name='id']:checked");
            if (itemChecked.length == 0) {
                window.alert("Vui lòng chọn ít nhất 1 bản ghi");
                return;
            }
            itemChecked.forEach(item => {
                const id = item.value;
                const position = item.closest("tr").querySelector("input[name='position']").value;
                const temp = `${id} - ${position}`;
                ids.push(temp);
            })

            if (ids.length > 0) {
                const inputForm = formchageMulti.querySelector("input[name='ids']");
                inputForm.value = ids.join(', ');
            }

            formchageMulti.submit();
        }
    })
}


// Sort
const sortSelect = document.getElementById("sort-select");
if (sortSelect) {
    let url = new URL(window.location.href);
    sortSelect.addEventListener("change", e => {
        const value = e.target.value;
        const [sortKey, sortValue] = value.split('-');

        url.searchParams.set("sortKey", sortKey);
        url.searchParams.set("sortValue", sortValue);

       
        window.location.href = url.href;
    })

    // Add selected for option
    const sortKeyGet = url.searchParams.get("sortKey");
    const sortValueGet = url.searchParams.get("sortValue");

    const sortString = `${sortKeyGet}-${sortValueGet}`;

    const option = sortSelect.querySelector(`option[value='${sortString}']`);
    if(option){
        option.selected = true;
    }
    

    // Sort clear
    const clearButton = document.querySelector("button[clear-sort]");
    clearButton.addEventListener("click", ()=>{
        url.searchParams.delete("sortKey");
        url.searchParams.delete("sortValue");

        window.location.href = url.href;
    })


    
}

