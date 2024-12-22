const chooseImageInput = document.getElementById("choose-image");
const imagePlaceholder = document.getElementById("image-placeholder");
const imageText = document.getElementById("image-text");
const imageTextInput = document.getElementById("image-text-input");
const isNewCheckbox = document.getElementById("is-new");
const badgeGreen = document.getElementById("badge-green");
const categoryInput = document.getElementById("category");
const badgeBlue = document.getElementById("badge-blue");
const dialog = document.getElementById("dialog");
const openDialogButton = document.getElementById("open-dialog");
const closeDialogButton = document.getElementById("close-dialog");
const downloadButton = document.getElementById("download-button");
const newButton = document.getElementById("new-button");

// Categorías disponibles
const categories = [
  'GENERAL',
  'HOMBRES',
  'FETICHES',
  'POLITICA',
  'MUSICA',
  'ARTE',
  'CINE',
  'TECNOLOGIA',
  'DEPORTES',
  'VIDEOJUEGOS',
  'CIENCIA',
  'LITERATURA',
  'HUMOR',
  'NOTICIAS',
  'SALUD',
  'EDUCACION',
  'VIAJES',
  'COMIDA',
  'MASCOTAS',
  'ECONOMIA',
  'HISTORIA',
  'RELIGION',
  'FILOSOFIA',
  'PSICOLOGIA',
  'CULTURA',
  'SOCIEDAD',
  'EMPRENDIMIENTO',
  'MARKETING',
  'FINANZAS',
  'INMOBILIARIA',
  'AUTOMOTRIZ',
  'MODA',
  'BELLEZA',
  'JARDINERIA',
  'HOGAR'
];


// Mostrar/Ocultar "Nuevo" badge
isNewCheckbox.addEventListener("change", () => {
  badgeGreen.style.display = isNewCheckbox.checked ? "inline-block" : "none";
});

// Abrir diálogo
openDialogButton.addEventListener("click", () => {
  dialog.style.display = "block";
});

// Cerrar diálogo
closeDialogButton.addEventListener("click", () => {
  dialog.style.display = "none";
});

// Delegación de eventos para seleccionar una categoría
document.addEventListener('DOMContentLoaded', () => {
  const dialogCategories = document.getElementById('dialog-categories');
  
  // Crear elementos para cada categoría
  categories.forEach(category => {
    const categoryDiv = document.createElement('div');
    categoryDiv.className = 'dialog-suggestion-item';
    categoryDiv.textContent = category;
    categoryDiv.dataset.category = category;
    dialogCategories.appendChild(categoryDiv);
  });

  // Asignar evento a las categorías mediante delegación
  dialogCategories.addEventListener('click', (event) => {
    const target = event.target;
    if (target.classList.contains('dialog-suggestion-item')) {
      const category = target.dataset.category;
      categoryInput.value = category;
      badgeBlue.textContent = category.substring(0, 3).toUpperCase();
      dialog.style.display = 'none';
    }
  });
});

// Descargar la imagen generada
downloadButton.addEventListener("click", () => {
  html2canvas(imagePlaceholder).then((canvas) => {
    const link = document.createElement("a");
    link.download = "vox-image.png";
    link.href = canvas.toDataURL();
    link.click();
  });
});

// Cambiar fondo al seleccionar imagen
chooseImageInput.addEventListener("change", (event) => {
  const file = event.target.files[0];
  if (
    file &&
    (file.type === "image/jpeg" ||
      file.type === "image/png" ||
      file.type === "image/webp")
  ) {
    const reader = new FileReader();
    reader.onload = function (e) {
      imagePlaceholder.style.backgroundImage = `url(${e.target.result})`;
    };
    reader.readAsDataURL(file);
  } else {
    alert("Solo imágenes.");
  }
});

// Actualizar texto de la imagen
imageTextInput.addEventListener("input", () => {
  imageText.textContent = imageTextInput.value;
});

// Limpiar todos los campos
newButton.addEventListener("click", () => {
  categoryInput.value = "";
  imageTextInput.value = "";
  imageText.textContent = "";
  imagePlaceholder.style.backgroundImage = "";
  badgeBlue.textContent = "CAT";
  isNewCheckbox.checked = false;
  badgeGreen.style.display = "none";
});
