//LocalStorage -позволяют хранить пары ключ/значение в браузере.
// ключ и значение должны быть строками

//доступ к локальному объекту Storage для текущего домена и добавляет(сохраняет) данные в него 
export function saveUserToLocalStorage(user) {    
  window.localStorage.setItem("user", JSON.stringify(user));   //setItem() – сохранить пару ключ/значение.
}



//Считывает(достает) данные из localStorage для определённого ключа user
export function getUserFromLocalStorage(user) {  
  try {
    return JSON.parse(window.localStorage.getItem("user"));  //метод getItem() объекта Storage при передаче имени ключа возвращает значение этого ключа, 
  } catch (error) {                                          //или null, если ключ не существует в данном объекте хранилища (Storage).
    return null;                                             //"user"(ключ)-яв-ся строкой, поэтому JSON.parse()
  }
} 

//удалить данные с ключом user.
export function removeUserFromLocalStorage(user) {
  window.localStorage.removeItem("user");
}

