const addNotesPopup = document.getElementById("addNotesPopup");
const addNotes = document.getElementById("addNotes");
const closeAddNotesPopup = document.getElementById("closeAddNotesPopup");
const copyNotes = document.getElementById("copyNotes");
const searchBar = document.getElementById("searchBar");
const openSearchBar = document.getElementById("openSearchBar");
const closeSearchBar = document.getElementById("closeSearchBar");
const modeToggleBtn = document.getElementById("modeToggleBtn");
const notesCardBox = document.getElementById("notesCardBox");
const notesInput = document.getElementById("notesInput");
const nothingBox = document.getElementById("nothingBox");
const nothingTxt = document.getElementById("nothingTxt");
const notesHeadings = document.querySelectorAll(".notesHeading");
const notesParagraphs = document.querySelectorAll(".notesParagraph");
const searchBarInput = document.getElementById("searchBarInput");
const deletePopupBox = document.getElementById("deletePopupBox");
const confirmDelete = document.getElementById("confirmDelete");
const cancelDelete = document.getElementById("cancelDelete");
const saveNotesBtn = document.getElementById("saveNotesBtn");
const html = document.querySelector("html");
const noteCardContent = [];
let darkmode = true;
let gridView = true;
const deleteNotes = notesCardBox.querySelectorAll(".deleteNotes");
const viewNotes = notesCardBox.querySelectorAll(".viewNotes");
const noteCards = notesCardBox.querySelectorAll(".noteCard");
const editNotes = notesCardBox.querySelectorAll(".editNotes");
const changeView = document.querySelector(".changeView");

// Saving the note into the local storage -----
saveNotesBtn.addEventListener("click", () => {
  if (notesInput.value != "") {
    const inputTxt = notesInput.value;
    const notesHeadingInpVal = notesInput.value.slice(0, 25);
    changeView.classList.add("sm:flex");
    let noteCardElm;
    if (gridView) {
      noteCardElm = `<div class="lg:w-1/4 md:w-1/2 sm:w-2/3 w-full p-2 noteCard"><div class="overflow-hidden rounded-2xl border border-zinc-200 dark:border-zinc-800 relative"><div class="absolute top-0 -translate-y-1/2 left-3 right-3 bg-zinc-200/20 dark:bg-zinc-800/50 rounded-full p-4 border-2 border-zinc-200 dark:border-zinc-800"></div><div class="p-6"><h3 class="md:text-xl sm:text-lg text-base font-semibold text-zinc-700 dark:text-white pb-2 border-b-2 border-zinc-200 dark:border-zinc-800 notesHeading">${notesHeadingInpVal}</h3><div class="h-60 notesHeight"><p class="text-sm text-zinc-700 dark:text-zinc-100 mt-3 text-ellipsis notesParagraph">${inputTxt}</p></div><div class="flex justify-between items-center mt-3 p-1"><button type="button" class="text-sm font-medium text-zinc-700 dark:text-white py-2 px-4 bg-zinc-200/60 hover:bg-zinc-300/50 dark:hover:bg-zinc-700 dark:bg-zinc-800 transition-all rounded-full viewNotes">View</button><div class="flex items-center"><button type="button" class="editNotes hover:bg-black/5 dark:hover:bg-white/5 w-10 h-10 overflow-hidden rounded-full"><i class="bi bi-pencil-square relative text-base text-zinc-700 dark:text-white flex justify-center items-center w-10 h-10 leading-3 bg-zinc-200/60 hover:bg-zinc-300/50 dark:bg-zinc-800 dark:hover:bg-zinc-700 transition-all rounded-full -z-10"></i></button><button type="button" class="ms-2 deleteNotes hover:bg-black/5 dark:hover:bg-white/5 w-10 h-10 overflow-hidden rounded-full"><i class="bi bi-trash relative text-base text-zinc-700 dark:text-white flex justify-center items-center w-10 h-10 leading-3 bg-zinc-200/60 hover:bg-zinc-300/50 dark:bg-zinc-800 dark:hover:bg-zinc-700 transition-all rounded-full -z-10"></i></button></div></div></div></div></div>`;
    } else {
      noteCardElm = `<div class="w-full p-2 noteCard"><div class="overflow-hidden rounded-2xl border border-zinc-200 dark:border-zinc-800 relative"><div class="absolute top-0 -translate-y-1/2 left-3 right-3 bg-zinc-200/20 dark:bg-zinc-800/50 rounded-full p-4 border-2 border-zinc-200 dark:border-zinc-800"></div><div class="p-6"><h3 class="md:text-xl sm:text-lg text-base font-semibold text-zinc-700 dark:text-white pb-2 border-b-2 border-zinc-200 dark:border-zinc-800 notesHeading">${notesHeadingInpVal}</h3><div class="h-16 notesHeight"><p class="text-sm text-zinc-700 dark:text-zinc-100 mt-3 text-ellipsis notesParagraph notesParagraphList">${inputTxt}</p></div><div class="flex justify-between items-center mt-3 p-1"><button type="button" class="text-sm font-medium text-zinc-700 dark:text-white py-2 px-4 bg-zinc-200/60 hover:bg-zinc-300/50 dark:hover:bg-zinc-700 dark:bg-zinc-800 transition-all rounded-full viewNotes">View</button><div class="flex items-center"><button type="button" class="editNotes hover:bg-black/5 dark:hover:bg-white/5 w-10 h-10 overflow-hidden rounded-full"><i class="bi bi-pencil-square relative text-base text-zinc-700 dark:text-white flex justify-center items-center w-10 h-10 leading-3 bg-zinc-200/60 hover:bg-zinc-300/50 dark:bg-zinc-800 dark:hover:bg-zinc-700 transition-all rounded-full -z-10"></i></button><button type="button" class="ms-2 deleteNotes hover:bg-black/5 dark:hover:bg-white/5 w-10 h-10 overflow-hidden rounded-full"><i class="bi bi-trash relative text-base text-zinc-700 dark:text-white flex justify-center items-center w-10 h-10 leading-3 bg-zinc-200/60 hover:bg-zinc-300/50 dark:bg-zinc-800 dark:hover:bg-zinc-700 transition-all rounded-full -z-10"></i></button></div></div></div></div></div>`;
    }
    notesCardBox.insertAdjacentHTML("afterbegin", noteCardElm);
    noteCardContent.push(noteCardElm);
    localStorage.setItem("noteCard", JSON.stringify(noteCardContent));
    addNotesPopup.classList.remove("flex");
    addNotesPopup.classList.add("hidden");
    nothingBox.classList.add("hidden");
    nothingBox.classList.remove("flex");
    notesInput.value = "";
  }
});

// For deleting the note cards content --------
notesCardBox.addEventListener("click", (event) => {
  let target = event.target;
  let deleteTheNote = target.closest(".noteCard").outerHTML;
  let index = noteCardContent.indexOf(deleteTheNote);
  if (target.tagName === "BUTTON" && target.classList.contains("deleteNotes")) {
    noteCardContent.splice(index, 1);
    confirmDelete.addEventListener("click", () => {
      localStorage.setItem("noteCard", JSON.stringify(noteCardContent));
    });
  }
});

// For editing or updating the notes cards content -------------
notesCardBox.addEventListener("click", (event) => {
  let target = event.target;
  let closestCard = target.closest(".noteCard");
  let deleteTheNote = closestCard.outerHTML;
  let index = noteCardContent.indexOf(deleteTheNote);
  if (target.tagName === "BUTTON" && target.classList.contains("editNotes")) {
    noteCardContent.splice(index, 1);
    saveNotesBtn.addEventListener("click", () => {
      localStorage.setItem("noteCard", JSON.stringify(noteCardContent));
      closestCard.style.display = "none";
    });
  }
});

// Getting the note from the local storage and creating
// notes cards dynamically on window load -----
window.addEventListener("load", () => {
  const receivedNoteContent = JSON.parse(localStorage.getItem("noteCard"));
  if (receivedNoteContent != null) {
    receivedNoteContent.forEach((noteCardContentEach) => {
      notesCardBox.insertAdjacentHTML("afterbegin", noteCardContentEach);
      noteCardContent.push(noteCardContentEach);
    });
  }
});

// opening popup for adding notes ------
addNotes.addEventListener("click", () => {
  addNotesPopup.classList.add("flex");
  addNotesPopup.classList.remove("hidden");
  saveNotesBtn.style.display = "block";
  closeAddNotesPopup.style.display = "block";
  copyNotes.style.display = "none";
  notesInput.removeAttribute("readonly");
});

// Closing popup box for adding notes ------
closeAddNotesPopup.addEventListener("click", () => {
  addNotesPopup.classList.remove("flex");
  addNotesPopup.classList.add("hidden");
  notesInput.value = "";
});

copyNotes.addEventListener("click", () => {
  copyNotes.innerHTML = `<i class="bi bi-clipboard-check text-lg me-1"></i>Copied!`;
  navigator.clipboard.writeText(notesInput.value);
});

openSearchBar.addEventListener("click", () => {
  searchBar.classList.add("flex");
  searchBar.classList.remove("hidden");
});

closeSearchBar.addEventListener("click", () => {
  searchBar.classList.remove("flex");
  searchBar.classList.add("hidden");
  searchBarInput.value = "";
});

// Light/Dark mode toggler ---------
modeToggleBtn.addEventListener("click", () => {
  if (darkmode) {
    html.classList.add("dark");
    // Setting the cookie for the dark mode ------
    document.cookie = "darkMode = darkModeOn; max-age =" + 60 * 60 * 24 * 365;
    darkmode = false;
  } else {
    html.classList.remove("dark");
    // Deleting the cookie for the dark mode ------
    document.cookie = "darkMode = ";
    darkmode = true;
  }
});

window.addEventListener("load", () => {
  // Checking the cookie for the dark mode --------
  if (document.cookie.includes("darkModeOn")) {
    html.classList.add("dark");
    darkmode = false;
  } else {
    html.classList.remove("dark");
    darkmode = true;
  }

  if (notesInput.value === "") {
    copyNotes.style.display = "none";
  } else {
    copyNotes.style.display = "inline-block";
  }

  // Checking children in the notesbox -----
  if (notesCardBox.childElementCount === 0) {
    nothingBox.classList.add("flex");
    nothingBox.classList.remove("hidden");
    changeView.classList.remove("sm:flex");
  } else {
    nothingBox.classList.add("hidden");
    nothingBox.classList.remove("flex");
    changeView.classList.add("sm:flex");
  }
});

notesInput.addEventListener("input", () => {
  copyNotes.innerHTML = `<i class="bi bi-clipboard text-lg"></i>`;
  if (notesInput.value === "") {
    copyNotes.style.display = "none";
  } else {
    copyNotes.style.display = "inline-block";
  }
});

// Searching and filtering the notes cards ------
window.addEventListener("input", function (event) {
  // Here i have targeted the input feild this called event delegation -----
  let target = event.target;
  if (target.tagName === "INPUT") {
    let searchValue = searchBarInput.value.toUpperCase().replaceAll(" ", "");
    let noteCards = document.querySelectorAll(".noteCard");
    noteCards.forEach(function (noteCard) {
      let notesHeading = noteCard.querySelector(".notesHeading");
      if (notesHeading) {
        let headingText = notesHeading.innerText
          .toUpperCase()
          .replaceAll(" ", "")
          .replaceAll("/(\r\n|\r|\n)/g", "");
        if (headingText.includes(searchValue)) {
          noteCard.style.display = "block";
        } else {
          noteCard.style.display = "none";
        }
      }
    });

    // code for the nothing found box here -----
    let noteCardsHidden = notesCardBox.querySelectorAll(
      '.noteCard:is([style*="display: none"])'
    );
    let noteCardsShown = notesCardBox.querySelectorAll(".noteCard");
    if (noteCardsHidden.length === noteCardsShown.length) {
      nothingBox.classList.add("flex");
      nothingBox.classList.remove("hidden");
      nothingTxt.innerText = "Nothing found here!";
      changeView.style.display = "none";
    } else {
      nothingBox.classList.add("hidden");
      nothingBox.classList.remove("flex");
      changeView.style.display = "block";
    }

    // disbaleing the add notes button while searching the notes ----
    if (searchBarInput.value != "") {
      addNotes.setAttribute("disabled", "");
      addNotes.style.opacity = ".4";
      addNotes.style.cursor = "not-allowed";
    } else {
      addNotes.removeAttribute("disabled");
      addNotes.style.opacity = "1";
      addNotes.style.cursor = "pointer";
    }
  }
});

// Closing the delete popup on click -----
cancelDelete.addEventListener("click", () => {
  deletePopupBox.classList.remove("flex");
  deletePopupBox.classList.add("hidden");
});

// Here i have targeted the action buttons feild this called event delegation -----
notesCardBox.addEventListener("click", (event) => {
  const target = event.target;
  // Checking the clicked element is button or not ------
  if (target.tagName === "BUTTON") {
    const noteCardDiv = target.closest(".noteCard");
    const noteContent = noteCardDiv.querySelector(".notesParagraph").innerText;
    // for viewing the notes cards ---------------
    if (target.classList.contains("viewNotes")) {
      notesInput.value = noteContent;
      saveNotesBtn.style.display = "none";
      copyNotes.style.display = "block";
      copyNotes.innerHTML = `<i class="bi bi-clipboard text-lg"></i>`;
      addNotesPopup.classList.add("flex");
      addNotesPopup.classList.remove("hidden");
      notesInput.setAttribute("readonly", "");
    }

    // For edting the notes cards --------
    else if (target.classList.contains("editNotes")) {
      notesInput.value = noteContent;
      copyNotes.style.display = "none";
      saveNotesBtn.style.display = "block";
      addNotesPopup.classList.add("flex");
      addNotesPopup.classList.remove("hidden");
      notesInput.removeAttribute("readonly");
    }

    //  For deleting the notes ----------
    else if (target.classList.contains("deleteNotes")) {
      deletePopupBox.classList.add("flex");
      deletePopupBox.classList.remove("hidden");
      // Deleting the notes on click conform on the popup -----
      confirmDelete.addEventListener("click", () => {
        // Deleting the note here -----
        noteCardDiv.style.display = "none";

        // Closing the delete popup on click -----
        deletePopupBox.classList.remove("flex");
        deletePopupBox.classList.add("hidden");

        // Checking children in the notesbox -----
        let noteCardsHidden = notesCardBox.querySelectorAll(
          '.noteCard:is([style*="display: none"])'
        );
        let noteCardsShown = notesCardBox.querySelectorAll(".noteCard");
        // Toggling the notes cards -------
        if (noteCardsHidden.length === noteCardsShown.length) {
          nothingBox.classList.add("flex");
          nothingBox.classList.remove("hidden");
          changeView.classList.remove("sm:flex");
          nothingTxt.innerHTML = "Nothing here, Create a new note!";
        } else {
          nothingBox.classList.add("hidden");
          nothingBox.classList.remove("flex");
          changeView.classList.add("sm:flex");
        }
      });
    }
  }
});

// Changing the view - Grid/List -----
window.addEventListener("click", (event) => {
  let target = event.target;
  if (target.tagName === "BUTTON" && target.classList.contains("changeView")) {
    let noteCards = document.querySelectorAll(".noteCard");
    let notesParagraphs = document.querySelectorAll(".notesParagraph");
    let notesHeights = document.querySelectorAll(".notesHeight");
    if (gridView) {
      changeView.innerHTML = '<i class="bi bi-grid relative -z-10"></i>';
      noteCards.forEach((noteCard) => {
        noteCard.classList.remove("lg:w-1/4", "md:w-1/2", "sm:w-2/3");
        document.cookie =
          "gridView = gridViewOn; max-age =" + 60 * 60 * 24 * 365;
        gridView = false;
      });
      notesParagraphs.forEach((notesParagraph) => {
        notesParagraph.classList.add("notesParagraphList");
      });
      notesHeights.forEach((notesHeight) => {
        notesHeight.classList.add("h-16");
        notesHeight.classList.remove("h-60");
      });
    } else {
      changeView.innerHTML = '<i class="bi bi-list-ul relative -z-10"></i>';
      noteCards.forEach((noteCard) => {
        noteCard.classList.add("lg:w-1/4", "md:w-1/2", "sm:w-2/3");
        document.cookie = "gridView = ";
        gridView = true;
      });
      notesParagraphs.forEach((notesParagraph) => {
        notesParagraph.classList.remove("notesParagraphList");
      });
      notesHeights.forEach((notesHeight) => {
        notesHeight.classList.remove("h-16");
        notesHeight.classList.add("h-60");
      });
    }
  }
});

window.addEventListener("load", () => {
  let noteCards = document.querySelectorAll(".noteCard");
  let notesParagraphs = document.querySelectorAll(".notesParagraph");
  let notesHeights = document.querySelectorAll(".notesHeight");
  if (document.cookie.includes("gridViewOn")) {
    changeView.innerHTML = '<i class="bi bi-grid relative -z-10"></i>';
    noteCards.forEach((noteCard) => {
      noteCard.classList.remove("lg:w-1/4", "md:w-1/2", "sm:w-2/3");
      gridView = false;
    });
    notesParagraphs.forEach((notesParagraph) => {
      notesParagraph.classList.add("notesParagraphList");
    });
    notesHeights.forEach((notesHeight) => {
      notesHeight.classList.add("h-16");
      notesHeight.classList.remove("h-60");
    });
  } else {
    changeView.innerHTML = '<i class="bi bi-list-ul relative -z-10"></i>';
    noteCards.forEach((noteCard) => {
      noteCard.classList.add("lg:w-1/4", "md:w-1/2", "sm:w-2/3");
      gridView = true;
    });
    notesParagraphs.forEach((notesParagraph) => {
      notesParagraph.classList.remove("notesParagraphList");
    });
    notesHeights.forEach((notesHeight) => {
      notesHeight.classList.remove("h-16");
      notesHeight.classList.add("h-60");
    });
  }
});
