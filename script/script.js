let currentIndex = 0;
// const imags = ["s1.jpg", "s13.jpg", "s12.jpg", "s16.jpg", "s5.jpg", "s11.jpg ", "s3.jpg"];
// console.log("i : "+currentIndex);
// function showSlide(index) {
//     // console.log("index : "+index);
//     const slides = document.querySelectorAll('.slide');
//     const totalSlides = slides.length;
// // console.log("totalSilder : "+totalSlides);
//     if (index >= totalSlides) {
//         currentIndex = 0;
//     } else if (index < 0) {
//         currentIndex = totalSlides - 1;
//     } else {
//         currentIndex = index;
//     }

//     const slider = document.querySelector('.slider');
//     slider.style.transform = `translateX(-${currentIndex * 100}%)`;

//     // Update active dot
//     const dots = document.querySelectorAll('.dot');
//     dots.forEach(dot => dot.classList.remove('active'));
//     dots[currentIndex].classList.add('active');
// }


// setInterval(() => {
//     moveSlide(1);
// }, 3000); // Change image every 3 seconds

// // Initially show the first slide
// showSlide(currentIndex);





const slides = document.querySelectorAll(".slide");
function showSlide(index) {
  slides.forEach(slide => slide.style.display = "none");
  // if (index >= totalSlides) {
  //           currentIndex = 0;
  //       } else if (index < 0) {
  //           currentIndex = totalSlides - 1;
  //       } else {
  //           currentIndex = index;
  //       }
    
       
    
        // Update active dot
        const dots = document.querySelectorAll('.dot');
        dots.forEach(dot => dot.classList.remove('active'));
        dots[currentIndex].classList.add('active');
  slides[index].style.display = "block";
}
function nextSlide() {
  currentIndex = (currentIndex + 1) % slides.length;
  showSlide(currentIndex);
}

function moveSlide(step) {
  showSlide(currentIndex + step);
}

function currentSlide(index) {
  showSlide(index);
}
showSlide(currentIndex);
setInterval(nextSlide, 3000); // تغيير كل 3 ثوانٍ


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



document.querySelectorAll('.star-rating .star').forEach(star => {
  star.addEventListener('click', function () {
    const rating = this.dataset.value;
    const parent = this.parentElement;
    parent.querySelectorAll('.star').forEach(s => {
      s.innerHTML = s.dataset.value <= rating ? '★' : '☆';
    });
    alert(`شكراً لتقييمك: ${rating} نجوم`);
 
  });
});



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
