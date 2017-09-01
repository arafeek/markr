const NOTES_KEY = 'my-notes';

export const loadNotesFromStorage = () => {
  try {
    const data = localStorage.getItem(NOTES_KEY);
    return JSON.parse(data);
  } catch (e) {
    return null;
  }
};

export const saveNotesToStorage = (data) => {
  try {
    const s = JSON.stringify(data);
    localStorage.setItem(NOTES_KEY, s);
    return true;
  } catch (e) {
    console.log(e);
    return false;
  }
};
