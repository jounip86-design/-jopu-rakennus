
const button = document.querySelector('.hamb');
const menu = document.querySelector('.mobile-menu');

if (button && menu) {
  button.addEventListener('click', () => {
    menu.classList.toggle('open');
  });
}

// JOPU Rakennus WhatsApp-asiakaspalvelu
(() => {
  const phone = '358400464551';
  const message = 'Hei! Haluaisin kysyä remontista tarjousta.';
  const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;

  const style = document.createElement('style');
  style.textContent = `
    .jopu-wa-launcher {
      position: fixed;
      bottom: 22px;
      right: 20px;
      z-index: 9998;
      border: none;
      border-radius: 50px;
      background: #25D366;
      color: #fff;
      padding: 15px 19px;
      font: 700 16px Arial, sans-serif;
      cursor: pointer;
      box-shadow: 0 5px 20px #0003;
    }
    .jopu-wa-box {
      position: fixed;
      bottom: 85px;
      right: 20px;
      width: min(340px, calc(100vw - 40px));
      z-index: 9999;
      background: #fff;
      color: #222;
      border-radius: 16px;
      box-shadow: 0 8px 35px #0004;
      overflow: hidden;
      font-family: Arial, sans-serif;
    }
    .jopu-wa-head {
      background: #111;
      color: #fff;
      padding: 17px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .jopu-wa-close {
      background: transparent;
      border: 0;
      color: #fff;
      font-size: 25px;
      cursor: pointer;
    }
    .jopu-wa-content {
      padding: 20px;
      line-height: 1.5;
    }
    .jopu-wa-link {
      display: block;
      background: #25D366;
      color: #fff !important;
      text-align: center;
      text-decoration: none;
      font-weight: bold;
      padding: 14px;
      border-radius: 9px;
      margin-top: 16px;
    }
    @media (max-width: 600px) {
      .jopu-wa-launcher {
        bottom: 18px;
        right: 15px;
      }
      .jopu-wa-box {
        bottom: 82px;
        right: 15px;
      }
    }
  `;
  document.head.appendChild(style);

  const launcher = document.createElement('button');
  launcher.className = 'jopu-wa-launcher';
  launcher.textContent = 'WhatsApp 💬';
  launcher.setAttribute('aria-label', 'Avaa WhatsApp-yhteydenotto');
  document.body.appendChild(launcher);

  const box = document.createElement('div');
  box.className = 'jopu-wa-box';
  box.hidden = true;
  box.innerHTML = `
    <div class="jopu-wa-head">
      <strong>🟡 JOPU Rakennus</strong>
      <button class="jopu-wa-close" aria-label="Sulje">×</button>
    </div>
    <div class="jopu-wa-content">
      <strong>Hei! 👋</strong>
      <p>Suunnitteletko remonttia tai maalaustöitä?</p>
      <p>Kysy rohkeasti lisää tai pyydä tarjous suoraan WhatsAppilla!</p>
      <a class="jopu-wa-link" href="${url}" target="_blank" rel="noopener noreferrer">
        💬 Lähetä WhatsApp-viesti
      </a>
    </div>
  `;
  document.body.appendChild(box);

  // Varmistetaan, että hidden toimii myös sivuston CSS:n kanssa.
  const hideBox = () => {
    box.hidden = true;
    box.style.display = 'none';
  };

  const showBox = () => {
    box.hidden = false;
    box.style.display = 'block';
  };

  hideBox();

  const storageKey = 'jopu-wa-dismissed';

  let dismissed = false;
  try {
    dismissed = sessionStorage.getItem(storageKey) === 'yes';
  } catch (e) {
    // Toimii myös ilman sessionStoragea.
  }

  if (!dismissed) {
    setTimeout(() => {
      if (box.hidden) showBox();
    }, 15000);
  }

  launcher.addEventListener('click', () => {
    if (box.hidden) {
      showBox();
    } else {
      hideBox();
    }
  });

  box.querySelector('.jopu-wa-close').addEventListener('click', () => {
    hideBox();
    try {
      sessionStorage.setItem(storageKey, 'yes');
    } catch (e) {}
  });

  box.querySelector('.jopu-wa-link').addEventListener('click', () => {
    hideBox();
    try {
      sessionStorage.setItem(storageKey, 'yes');
    } catch (e) {}
  });
})();
