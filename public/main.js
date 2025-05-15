document.addEventListener("DOMContentLoaded", () => {
  const postForm = document.getElementById("postForm");
  const postsContainer = document.getElementById("postsContainer");

  const postTemplate = Handlebars.compile(
    document.getElementById("post-template").innerHTML
  );

  async function fetchPosts() {
    const res = await fetch("http://localhost:3000/posts");
    const posts = await res.json();
    postsContainer.innerHTML = "";
    posts.forEach((post) => {
      postsContainer.innerHTML += postTemplate(post);
    });
  }

  postForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const title = document.getElementById("title").value;
    const content = document.getElementById("content").value;

    await fetch("http://localhost:3000/posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, content }),
    });

    postForm.reset();
    fetchPosts();
  });

  fetchPosts();
});
