const blogList = document.querySelector(".blogList");

export function makehtml(data) {
  const markup = data
    .map((item) => {
      return `
        <li class="list-group-item bg-dark text-white mb-3 p-3 rounded shadow-sm border border-secondary">
          <h3 class="fw-bold">${item.title}</h3>
          <p class="mb-1"><span class="text-info">Author:</span> ${item.author}</p>
          <p class="mb-1"><span class="text-info">Date:</span> ${item.date}</p>
          <p class="mb-3">${item.article.text}</p>
          <div class="d-flex gap-2">
            <button class="btn btn-sm btn-outline-danger delete" id="${item.id}">Delete</button>
            <button class="btn btn-sm btn-outline-warning update" id="${item.id}">Update</button>
          </div>
        </li>
      `;
    })
    .join(" ");

  blogList.innerHTML = markup;
  return markup;
}
