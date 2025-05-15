import axios from "axios";
import { getBlog } from "./getBlogs";

const blogList = document.querySelector(".blogList")
blogList.addEventListener("click",updatePost)
async function updatePost(event) {
    if (event.target.classList.contains("update"))
     {
    const update = event.target.id
    try {
            const { data } = await axios.patch(`http://localhost:3000/blogs/${update}`, {
      "article": oneUpdate(data)
    });
            getBlog()
        } catch (error) {
            console.error(error);
            
        }
    }
    // console.log(event.target)
}



const update = document.querySelector(".update");


update.addEventListener("submit", (event) => {
    event.preventDefault();
    const mainContent = form.elements.mainContent.value;

    const updateData = {
        text: mainContent
    }
    oneUpdate(postData);
});

function oneUpdate(data) {
    return data
}