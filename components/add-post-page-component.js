import { renderHeaderComponent } from "./header-component.js";
import { renderUploadImageComponent } from "./upload-image-component.js";

export function renderAddPostPageComponent({ appEl, onAddPostClick }) {
  const render = () => {
    let imageUrl = "";
    // TODO: Реализовать страницу добавления поста
    const appHtml = `
      <div class="page-container">
        <div class="header-container"></div>
        <div class="form">
           <h3 class="form-title">Добавить фотографию</h3>
            <div class="form-inputs">
             <div class="upload-image-container">
               <div class="upload=image">
        ${imageUrl
          ? `
            <div class="file-upload-image-conrainer">
              <img class="file-upload-image" src="${imageUrl}">
              <button class="file-upload-remove-button button">Заменить фото</button>
            </div>
            `
          : `
              <label class="file-upload-label secondary-button">
                  <input
                    type="file"
                    class="file-upload-input"
                    style="display:none"
                  />
                  Выберите фото
              </label>
            
        `
        }

          </div>
       </div>
      <label>
              Опишите фотографию:
              <textarea class="input textarea" rows="4"></textarea>
          </label>
        <button class="button" id="add-button">Добавить</button>
        </div>
        </div>
      </div>
  `;

    appEl.innerHTML = appHtml;

    //шапку рендерим
    renderHeaderComponent({
      // user,
      element: document.querySelector(".header-container"),
     // goToPage,
    });

     //замена картинки
    renderUploadImageComponent({
      element: appEl.querySelector(".upload-image-container"),
      onImageUrlChange(newImageUrl) {
        imageUrl = newImageUrl;
      },
    });

    document.getElementById("add-button").addEventListener("click", () => {
      onAddPostClick({
        description: "Описание картинки", // textareaInputElement.value ?
        imageUrl: "https://image.png",
      });
    });
  };

  render();
}
