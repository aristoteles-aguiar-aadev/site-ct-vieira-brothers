// ─── HAMBURGER
function toggleMenu() {
  const navLinks = document.getElementById('navLinks');
  if (!navLinks) return;

  navLinks.classList.toggle('open');
}

window.toggleMenu = toggleMenu;

// ─── NAVBAR SCROLL
window.addEventListener('scroll', () => {
  const nav = document.getElementById('navbar');
  if (!nav) return;

  nav.style.background = window.scrollY > 50
    ? 'rgba(10,10,10,0.98)'
    : 'rgba(10,10,10,0.92)';
});

// ─── CAROUSEL
function initCarousel() {
  const images = document.querySelectorAll('#sobreCarousel .carousel-image');
  const dots = document.querySelectorAll('#carouselDots .dot');
  const prevBtn = document.getElementById('prevSlide');
  const nextBtn = document.getElementById('nextSlide');

  if (!images.length || !dots.length || !prevBtn || !nextBtn) return;

  let currentSlide = 0;
  let autoplay;

  function showSlide(index) {
    images.forEach((img) => img.classList.remove('active'));
    dots.forEach((dot) => dot.classList.remove('active'));

    images[index].classList.add('active');
    dots[index].classList.add('active');
  }

  function nextSlide() {
    currentSlide = (currentSlide + 1) % images.length;
    showSlide(currentSlide);
  }

  function prevSlide() {
    currentSlide = (currentSlide - 1 + images.length) % images.length;
    showSlide(currentSlide);
  }

  function startAutoplay() {
    autoplay = setInterval(nextSlide, 4000);
  }

  function stopAutoplay() {
    clearInterval(autoplay);
  }

  nextBtn.addEventListener('click', () => {
    nextSlide();
    stopAutoplay();
    startAutoplay();
  });

  prevBtn.addEventListener('click', () => {
    prevSlide();
    stopAutoplay();
    startAutoplay();
  });

  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      currentSlide = index;
      showSlide(currentSlide);
      stopAutoplay();
      startAutoplay();
    });
  });

  showSlide(currentSlide);
  startAutoplay();
}

// ─── SCHEDULE DATA
const schedule = {
  seg: [
    { time: '08:00', mod: 'Jiu-Jitsu', level: 'Todos os níveis', prof: 'Prof. Alysson Bruno' },
    { time: '18:00', mod: 'Kids Jiu-Jitsu', level: '03–14 anos', prof: 'Prof. Carlos Henrique e Prof. Denilson Souza' },
    { time: '19:30', mod: 'Jiu-Jitsu', level: 'Todos os níveis', prof: 'Prof. Alysson Bruno' },
    { time: '21:30', mod: 'Jiu-Jitsu', level: 'Todos os níveis', prof: 'Prof. Alysson Bruno' }
  ],
  ter: [
    { time: '19:30', mod: 'No-Gi Jiu-Jitsu', level: 'Todos os níveis', prof: 'Prof. Alysson Bruno' }
  ],
  qua: [
    { time: '08:00', mod: 'Jiu-Jitsu', level: 'Todos os níveis', prof: 'Prof. Alysson Bruno' },
    { time: '18:00', mod: 'Kids Jiu-Jitsu', level: '03–14 anos', prof: 'Prof. Carlos Henrique e Prof. Denilson Souza' },
    { time: '19:30', mod: 'Jiu-Jitsu', level: 'Todos os níveis', prof: 'Prof. Alysson Bruno' },
    { time: '21:30', mod: 'Jiu-Jitsu', level: 'Todos os níveis', prof: 'Prof. Alysson Bruno' }
  ],
  qui: [
    { time: '19:30', mod: 'Jiu-Jitsu', level: 'Todos os níveis', prof: 'Prof. Alysson Bruno' }
  ],
  sex: [
    { time: '08:00', mod: 'Jiu-Jitsu', level: 'Todos os níveis', prof: 'Prof. Alysson Bruno' },
    { time: '18:00', mod: 'Kids Jiu-Jitsu', level: '03–14 anos', prof: 'Prof. Carlos Henrique e Prof. Denilson Souza' },
    { time: '19:30', mod: 'Jiu-Jitsu', level: 'Todos os níveis', prof: 'Prof. Alysson Bruno' },
    { time: '21:30', mod: 'Jiu-Jitsu', level: 'Todos os níveis', prof: 'Prof. Alysson Bruno' }
  ]
};

function showDay(btn, day) {
  const buttons = document.querySelectorAll('.tab-btn');
  const scheduleContent = document.getElementById('schedule-content');

  if (!buttons.length || !scheduleContent || !schedule[day]) return;

  buttons.forEach((b) => b.classList.remove('active'));
  if (btn) btn.classList.add('active');

  const rows = schedule[day].map((r) => `
    <tr>
      <td><span class="time-tag">${r.time}</span></td>
      <td><span class="mod-tag">${r.mod}</span></td>
      <td><span class="level-tag">${r.level}</span></td>
      <td style="color:var(--text-muted); font-size:0.9rem;">${r.prof}</td>
    </tr>
  `).join('');

  scheduleContent.innerHTML = `
    <table class="schedule-table">
      <thead>
        <tr>
          <th>Horário</th>
          <th>Modalidade</th>
          <th>Nível</th>
          <th>Professor</th>
        </tr>
      </thead>
      <tbody>${rows}</tbody>
    </table>
  `;
}

window.showDay = showDay;

// ─── FORM SUBMIT
function initContactForm() {
  const form = document.getElementById('contactForm');
  const success = document.getElementById('formSuccess');
  const error = document.getElementById('formError');
  const btn = form?.querySelector('.form-submit');

  if (!form || !success || !error || !btn) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    success.style.display = 'none';
    error.style.display = 'none';

    btn.textContent = 'Enviando...';
    btn.disabled = true;

    try {
      const formData = new FormData(form);

      const response = await fetch(form.action, {
        method: 'POST',
        body: formData,
        headers: {
          Accept: 'application/json'
        }
      });

      if (response.ok) {
        form.reset();
        success.style.display = 'block';
      } else {
        error.style.display = 'block';
      }
    } catch (err) {
      error.style.display = 'block';
    } finally {
      btn.textContent = 'Enviar Mensagem';
      btn.disabled = false;
    }
  });
}

// ─── SCROLL ANIMATIONS
function initScrollAnimations() {
  const elements = document.querySelectorAll('.card, .plano-card, .contato-item');

  if (!elements.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, { threshold: 0.1 });

  elements.forEach((el) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
  });
}

// ─── INIT
document.addEventListener('DOMContentLoaded', () => {
  initCarousel();
  initScrollAnimations();
  initContactForm();

  const firstTab = document.querySelector('.tab-btn');
  if (firstTab) {
    showDay(firstTab, 'seg');
  }
});