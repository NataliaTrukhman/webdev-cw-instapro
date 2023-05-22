export function saveUserToLocalStorage(user) {    
  window.localStorage.setItem("user", JSON.stringify(user));
}
//доступа к локальному объекту Storage для текущего домена и добавляет данные в него 



export function getUserFromLocalStorage(user) {
  try {
    return JSON.parse(window.localStorage.getItem("user"));
  } catch (error) {
    return null;
  }
} 
//Считывает данные из localStorage для определённого ключа user

export function removeUserFromLocalStorage(user) {
  window.localStorage.removeItem("user");
}

//удаление