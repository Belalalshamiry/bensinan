
   // سلايدر صور
   const slides = [
    "imags/s12.jpg",
    "imags/s14.jpg",
    "imags/s16.jpg",
    "imags/s18.jpg",
    "imags/s10.jpg",
  ];
  let currentIndex = 0;

  function showSlide(index) {
    const sliderImage = document.getElementById("imags");
    sliderImage.style.transition=" 6s ";
    // sliderImage.style.transform = `translateX(-${1 * 100}%)`;
    sliderImage.style.width="98%";
    sliderImage.style.height="98%";
    sliderImage.src = slides[index];
    document.querySelectorAll(".dot").forEach((dot, i) => {
      dot.classList.toggle("active", i === index);
    });
  }

  function moveSlide(step) {
    currentIndex = (currentIndex + step + slides.length) % slides.length;
    showSlide(currentIndex);
  }

  function currentSlide(index) {
    currentIndex = index;
    showSlide(currentIndex);
  }
function nextSlide() {
  currentIndex = (currentIndex + 1) % slides.length;
  showSlide(currentIndex);
}
  setInterval(nextSlide,3000);
// 🔍 البحث مع اقتراحات
const suggestions = ["سامسونج", "آيفون", "لابتوب", "سماعات", "تلفاز", "سوار ذكي", "ستارلينك"];
const input = document.getElementById("searchInput");
const suggestionsList = document.getElementById("suggestionsList");

input.addEventListener("input", () => {
  const value = input.value.trim().toLowerCase();
  suggestionsList.innerHTML = '';
  if (value) {
    const filtered = suggestions.filter(item => item.includes(value));
    filtered.forEach(suggestion => {
      const li = document.createElement("li");
      li.textContent = suggestion;
      li.onclick = () => {
        input.value = suggestion;
        suggestionsList.innerHTML = '';
        suggestionsList.style.display = 'none';
      };
      suggestionsList.appendChild(li);
    });
    suggestionsList.style.display = 'block';
  } else {
    suggestionsList.style.display = 'none';
  }
});
 let scrollposition=window.scrollY;
console.log("scrolly = "+ window.scrollY);

const d1=document.getElementById("d1");
d1.style.display='none';
d1.style.transition=' 4.8s ease';
d1.style.position='relative';
window.addEventListener("scroll",()=>{
  console.log("scrolly = "+ window.scrollY);
  if(this.scrollY >800){
    // d1.style.display='block';

    d1.style.marginRight='1rem';
  
    d1.style.marginTop='10rem';
    d1.style.marginBottom='2rem';
    d1.style.marginLeft='2rem';
    d1.style.transition=' 2.8s ease';
    d1.style.display='block';
// console.log("scrolly = "+this.scrolly);
  }
});


// أضف داخل ملف script.js
document.querySelectorAll('.star-rating .star').forEach(star => {
  star.addEventListener('click', function () {
    const rating = this.dataset.value;
    const parent = this.parentElement;
    parent.querySelectorAll('.star').forEach(s => {
      s.innerHTML = s.dataset.value <= rating ? '★' : '☆';
    });
    alert(`شكراً لتقييمك: ${rating} نجوم`);
    // بإمكانك إرسال التقييم لسيرفر هنا باستخدام fetch()
  });
});


// كود جافاسكربت داخل script.js
document.querySelectorAll('.view-image').forEach(btn => {
  btn.addEventListener('click', () => {
    const imgSrc = btn.dataset.img;
    document.getElementById('modalImg').src = imgSrc;
    document.getElementById('imageModal').style.display = 'flex';
  });
});

document.getElementById('imageModal').addEventListener('click', () => {
  document.getElementById('imageModal').style.display = 'none';
});


document.addEventListener('DOMContentLoaded', () => {
  const user = JSON.parse(localStorage.getItem('user'));
  if (!user || !user.email) return; // لو المستخدم غير مسجل دخول

  document.querySelectorAll('.rating-stars').forEach(container => {
    const productId = container.getAttribute('data-product-id');
    const stars = container.querySelectorAll('.star');
    const storageKey = `rating_${user.email}_${productId}`;

    // استرجاع التقييم المخزن
    const savedRating = localStorage.getItem(storageKey);
    if (savedRating) highlightStars(container, parseInt(savedRating));

    // عند النقر على نجمة
    stars.forEach(star => {
      star.addEventListener('click', () => {
        const rating = parseInt(star.getAttribute('data-value'));
        localStorage.setItem(storageKey, rating);
        highlightStars(container, rating);
      });
    });
  });

  function highlightStars(container, rating) {
    container.querySelectorAll('.star').forEach(star => {
      const value = parseInt(star.getAttribute('data-value'));
      star.style.color = value <= rating ? 'gold' : 'gray';
    });
  }
});



function rate(element, value) {
  const parent = element.parentElement;
  const stars = parent.querySelectorAll(".star");
  stars.forEach((star, index) => {
    star.classList.toggle("checked", index < value);
  });
  const productId = parent.dataset.product;
  localStorage.setItem(`rating_${productId}`, value);
}

// تحميل التقييم من localStorage
window.onload = () => {
  const allRatings = document.querySelectorAll(".stars");
  allRatings.forEach(starGroup => {
    const productId = starGroup.dataset.product;
    const saved = parseInt(localStorage.getItem(`rating_${productId}`));
    if (!isNaN(saved)) {
      const stars = starGroup.querySelectorAll(".star");
      stars.forEach((star, index) => {
        star.classList.toggle("checked", index < saved);
      });
    }
  });
};



const maxChars = 10; // الحد الأقصى للأحرف
const textInput = document.getElementById("text-input");
const charCount = document.getElementById("char-count");
const warningSound = new Audio("warning.mp3"); // إضافة تنبيه صوتي عند الاقتراب من الحد
const successSound = new Audio("success.mp3"); // صوت عند الوصول إلى الحد الأقصى
let lastRemaining = maxChars;

textInput.addEventListener("input", function () {
    let text = textInput.value;
    if (text.length > maxChars) {
        textInput.value = text.substring(0, maxChars); // منع الإدخال الزائد
    }
    let remaining = maxChars - textInput.value.length;
    charCount.textContent = `${textInput.value.length} / ${maxChars}`;
    
    // تغيير اللون حسب عدد الأحرف
    if (remaining <= 10) {
        charCount.style.color = "red";
        textInput.style.borderColor = "red";
        if (remaining < lastRemaining) warningSound.play();
        textInput.classList.add("shake"); // إضافة اهتزاز عند الاقتراب من الحد
    } else if (remaining <= 30) {
        charCount.style.color = "orange";
        textInput.style.borderColor = "orange";
        textInput.classList.remove("shake");
    } else {
        charCount.style.color = "green";
        textInput.style.borderColor = "green";
        textInput.classList.remove("shake");
    }
    
    // تشغيل صوت عند الوصول إلى الحد الأقصى
    if (remaining === 0 && lastRemaining !== 0) {
        successSound.play();
        textInput.classList.add("shake"); // اهتزاز عند الوصول للحد الأقصى
    }
    lastRemaining = remaining;
});

// إضافة أنيميشن الاهتزاز في CSS
const style = document.createElement('style');
style.innerHTML = `
    .shake {
        animation: shake 0.3s ease-in-out;
    }
    @keyframes shake {
        0% { transform: translateX(0); }
        25% { transform: translateX(-5px); }
        50% { transform: translateX(5px); }
        75% { transform: translateX(-5px); }
        100% { transform: translateX(0); }
    }
`;
document.head.appendChild(style);


//حالة الطقس 


navigator.geolocation.getCurrentPosition(async position => {
  const lat = position.coords.latitude;
  const lon = position.coords.longitude;
  const apiKey = 'demo'; // يمكن استبداله بمفتاح حقيقي
  try {
    const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`);
    const data = await response.json();
    const weather = data.current_weather;
    document.getElementById("weather-box").innerHTML = 
      `الحرارة: ${weather.temperature}°C | الرياح: ${weather.windspeed} كم/س`;
  } catch (e) {
    document.getElementById("weather-box").innerHTML = "تعذر جلب حالة الطقس";
  }
}, () => {
  document.getElementById("weather-box").innerHTML = "الرجاء السماح بمشاركة الموقع";
});


function updateClock() {
  const now = new Date();
  let hours = now.getHours().toString().padStart(2, '0');
  let minutes = now.getMinutes().toString().padStart(2, '0');
  let seconds = now.getSeconds().toString().padStart(2, '0');
  document.getElementById('clock').textContent = `${hours}:${minutes}:${seconds}`;
}
setInterval(updateClock, 1000);
updateClock();



// الملاحظات  

// الحصول على العناصر من DOM
const saveBtn = document.getElementById('save-btn');
const noteInput = document.getElementById('note-input');
const notesContainer = document.getElementById('notes-container');
const notesCount = document.getElementById('notes-count');
const clearAllBtn = document.getElementById('clear-all-btn');

// تحميل الملاحظات من localStorage
function loadNotes() {
    const notes = JSON.parse(localStorage.getItem('notes')) || [];
    notesContainer.innerHTML = '';
    notes.forEach((note, index) => {
        createNoteElement(note, index);
    });
    notesCount.textContent = notes.length;
}

// حفظ ملاحظة جديدة
function saveNote() {
    const noteText = noteInput.value.trim();
    if (noteText) {
        const notes = JSON.parse(localStorage.getItem('notes')) || [];
        notes.push(noteText);
        localStorage.setItem('notes', JSON.stringify(notes));
        loadNotes();
        noteInput.value = ''; // مسح منطقة النص بعد الحفظ
    }
}

// إنشاء عنصر ملاحظة جديد في الواجهة
function createNoteElement(note, index) {
    const noteElement = document.createElement('div');
    noteElement.classList.add('note');
    noteElement.innerHTML = `
        <span>${note}</span>
        <button class="edit-btn" onclick="editNote(${index})">تعديل</button>
        <button class="delete-btn" onclick="deleteNote(${index})">حذف</button>
    `;
    notesContainer.appendChild(noteElement);
}

// حذف ملاحظة
function deleteNote(index) {
    const notes = JSON.parse(localStorage.getItem('notes')) || [];
    notes.splice(index, 1);
    localStorage.setItem('notes', JSON.stringify(notes));
    loadNotes();
}

// تعديل ملاحظة
function editNote(index) {
    const notes = JSON.parse(localStorage.getItem('notes')) || [];
    noteInput.value = notes[index];
    deleteNote(index);
}

// مسح جميع الملاحظات
function clearAllNotes() {
    localStorage.removeItem('notes');
    loadNotes();
}

// إضافة حدث عند الضغط على زر الحفظ
saveBtn.addEventListener('click', saveNote);

// إضافة حدث لمسح جميع الملاحظات
clearAllBtn.addEventListener('click', clearAllNotes);

// تحميل الملاحظات عند تحميل الصفحة
window.onload = loadNotes;
