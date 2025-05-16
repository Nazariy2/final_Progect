// import axios from "axios";
// import { getBlog } from "./getBlogs";

// const blogList = document.querySelector(".blogList")
// blogList.addEventListener("click",updatePost)
// async function updatePost(event) {
//     if (event.target.classList.contains("update"))
//      {
//     const update = event.target.id
//     try {
//             const { data } = await axios.patch(`http://localhost:3000/blogs/${update}`, {
//       "article": oneUpdate(data)
//     });
//             getBlog()
//         } catch (error) {
//             console.error(error);
            
//         }
//     }
//     // console.log(event.target)
// }



// const update = document.querySelector(".update");


// update.addEventListener("submit", (event) => {
//     event.preventDefault();
//     const mainContent = form.elements.mainContent.value;

//     const updateData = {
//         text: mainContent
//     }
//     oneUpdate(postData);
// });

// function oneUpdate(data) {
//     return data
// }

import axios from "axios";
import { getBlog } from "./getBlogs";

const blogList = document.querySelector(".blogList");
const updateForm = document.querySelector(".update");
const updateInput = updateForm.elements.mainContent;

let updateId = null; // <- Per sapere quale post stiamo aggiornando

// Listener su lista per rilevare clic sul pulsante "Update"
blogList.addEventListener("click", (event) => {
  if (event.target.classList.contains("update")) {
    updateId = event.target.id;
    updateForm.classList.remove("d-none"); // Mostra il form se era nascosto
  }
});

// Listener sul form di aggiornamento
updateForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  if (!updateId) return;

  const updatedText = updateInput.value.trim();
  if (!updatedText) return;

  try {
    await axios.patch(`http://localhost:3000/blogs/${updateId}`, {
      article: { text: updatedText }
    });

    updateInput.value = "";      // Reset campo
    updateId = null;             // Reset ID
    updateForm.classList.add("d-none"); // Nasconde il form

    getBlog(); // Ricarica la lista dei post
  } catch (error) {
    console.error("Errore durante l'aggiornamento:", error);
  }
});
