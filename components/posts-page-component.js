import { USER_POSTS_PAGE } from "../routes.js";
import { renderHeaderComponent } from "./header-component.js";
import { goToPage, getToken } from "../index.js";
import { addLike, deletelike, getPosts } from "../api.js";

export function renderPostsPageComponent({ appEl, posts, allPostsUserPage }) {
  // TODO: реализовать рендер постов из api

  const postsHtml = posts.map((post) => {
    return `        <li class="post">
                    <div class="post-header" data-user-id=${post.user.id}>
                        <img src="${post.user.imageUrl}" class="post-header__user-image">
                        <p class="post-header__user-name">${post.user.name}</p>
                    </div>
                    <div class="post-image-container">
                      <img class="post-image" src="${post.imageUrl}">
                    </div>
                    <div class="post-likes">
                      <button data-post-id=${post.id} data-liked="${post.isLiked}" class="like-button">
                    ${post.isLiked ? `  <img src="./assets/images/like-active.svg">` : `  <img src="./assets/images/like-not-active.svg">`}
                      </button>
                      <p class="post-likes-text">
                        Нравится: <strong>${post.likes.length}</strong>
                      </p>
                    </div>
                    <p class="post-text">
                      <span class="user-name">${post.user.name}</span>
                      ${post.description}
                    </p>
                    <p class="post-date">
                      19 минут назад
                    </p>
                  </li>`
  })
    .join("")



  /**
   * TODO: чтобы отформатировать дату создания поста в виде "19 минут назад"
   * можно использовать https://date-fns.org/v2.29.3/docs/formatDistanceToNow
   */
  const appHtml = `
              <div class="page-container">
                <div class="header-container"></div>
                <ul class="posts">
                ${postsHtml}
               </ul>
              </div>`;

  appEl.innerHTML = appHtml;

  renderHeaderComponent({   //шапка каждой страницы
    element: document.querySelector(".header-container"),
  });

  if (allPostsUserPage) {
    for (let likeButton of document.querySelectorAll(".like-button")) {
      likeButton.addEventListener("click", () => {
        console.log('лайк');

        const postId = likeButton.dataset.postId; //получаем id
        const index = posts.findIndex((post) => post.id === postId); //индекс поста из массива 

        if (posts[index].isLiked) {
          deletelike({ token: getToken(), id: postId })
            .then((upDatePost) => {
              console.log(upDatePost);
              posts[index].likes = upDatePost.post.likes;
              posts[index].isLiked = false;
              renderPostsPageComponent({ appEl, posts, allPostsUserPage }) //рендер 
            })

        } else {
          addLike({ token: getToken(), id: postId }).then((upDatePost) => {
            posts[index].likes = upDatePost.post.likes;
            posts[index].isLiked = true;
            renderPostsPageComponent({ appEl, posts, allPostsUserPage })
          })
        }
      })

    };
  }

  if (allPostsUserPage) {

    for (let userEl of document.querySelectorAll(".post-header")) { //шапка user поста
      userEl.addEventListener("click", () => {
        goToPage(USER_POSTS_PAGE, {
          userId: userEl.dataset.userId,
        });
      });
    }
  }

}



