/* ==========================================================================
   ИНТЕРАКТИВНЫЙ СКРИПТ ЛЕНДИНГА ПСИХОЛОГА АННЫ ГОРДЕЕВОЙ
   - Заявки отправляются на почту kizamaziza@gmail.com
   - Двусторонняя анимация при скролле (появление и скрытие при прокрутке вверх)
   - Точные контакты: ТГ (@Fcupls), VK (@fucupls), Макс (+7 995 474 56 27)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // Конфигурация прямых контактов
  const CONTACTS = {
    telegram: 'https://t.me/Fcupls',       // ТГ @Fcupls
    vk: 'https://vk.com/fucupls',           // VK @fucupls
    max: 'https://max.ru/u/f9LHodD0cOIo3znO6_LbUv055dSgC2c6dRqZANh7C4VAN-Ql9ddlgEyAAno', // Прямая ссылка на Макс
    maxNumber: '+7 995 474 56 27',
    targetEmail: 'kizamaziza@gmail.com'     // Почта для заявок
  };

  // ==========================================================================
  // НАСТРОЙКИ СЛУЖЕБНЫХ УВЕДОМЛЕНИЙ (TELEGRAM-БОТ И ПОЧТА)
  // ==========================================================================
  const NOTIFICATION_CONFIG = {
    // 1. Служебные сообщения прямо в Telegram Анне через бота:
    telegram: {
      botToken: '8895344216:AAGLinCfnJTz62NrgbQK1MToKdrXPiUGe-4',
      chatId: '6253515765',
    },
    // 2. Отправка на почту:
    email: {
      targetEmail: 'kizamaziza@gmail.com',
      web3formsKey: '8a19a2f0-0799-406b-b27f-827f5e982745' // Подключенный ключ Web3Forms
    }
  };

  // 1. Модальное окно и логика для мессенджера Макс
  const maxModal = document.getElementById('maxModal');
  const openMaxModal = () => {
    if (!maxModal) return;
    navigator.clipboard.writeText(CONTACTS.maxNumber).catch(() => {});
    maxModal.classList.add('active');
    document.body.style.overflow = 'hidden';
    showToast(`Номер ${CONTACTS.maxNumber} скопирован для мессенджера Макс!`, '📋');
  };

  const closeMaxModal = () => {
    if (!maxModal) return;
    maxModal.classList.remove('active');
    document.body.style.overflow = '';
  };

  document.querySelectorAll('[data-close-max-modal]').forEach(btn => {
    btn.addEventListener('click', closeMaxModal);
  });
  if (maxModal) {
    maxModal.addEventListener('click', (e) => {
      if (e.target === maxModal) closeMaxModal();
    });
  }

  const copyMaxNumberBtn = document.getElementById('copyMaxNumberBtn');
  if (copyMaxNumberBtn) {
    copyMaxNumberBtn.addEventListener('click', () => {
      navigator.clipboard.writeText(CONTACTS.maxNumber).then(() => {
        const textSpan = document.getElementById('copyBtnText');
        if (textSpan) {
          const oldText = textSpan.innerText;
          textSpan.innerText = 'Скопировано! ✓';
          setTimeout(() => { textSpan.innerText = oldText; }, 2000);
        }
        showToast('Номер успешно скопирован в буфер обмена!', '✨');
      });
    });
  }

  // Привязка ссылок ко всем кнопкам мессенджеров на странице
  const bindMessengerLinks = () => {
    document.querySelectorAll('[data-messenger="tg"]').forEach(el => {
      el.setAttribute('href', CONTACTS.telegram);
      el.setAttribute('target', '_blank');
      el.setAttribute('rel', 'noopener noreferrer');
    });
    document.querySelectorAll('[data-messenger="vk"]').forEach(el => {
      el.setAttribute('href', CONTACTS.vk);
      el.setAttribute('target', '_blank');
      el.setAttribute('rel', 'noopener noreferrer');
    });
    document.querySelectorAll('[data-messenger="max"]').forEach(el => {
      el.setAttribute('href', CONTACTS.max);
      el.setAttribute('target', '_blank');
      el.setAttribute('rel', 'noopener noreferrer');
    });
  };
  bindMessengerLinks();

  // 2. Липкий хедер со стеклянным фоном при скролле
  const header = document.querySelector('.site-header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 25) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // 3. Двусторонняя плавная анимация появления и скрытия блоков при скролле (вверх и вниз!)
  const animElements = document.querySelectorAll('.fade-in-on-scroll');
  if ('IntersectionObserver' in window) {
    const observerOptions = {
      root: null,
      rootMargin: '0px 0px -40px 0px',
      threshold: 0.12
    };

    const animObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Блок входит в зону видимости — плавно показываем
          entry.target.classList.add('is-visible');
        } else {
          // Блок уходит из зоны видимости (например при прокрутке вверх обратно) — убираем
          entry.target.classList.remove('is-visible');
        }
      });
    }, observerOptions);

    animElements.forEach(el => animObserver.observe(el));
  } else {
    animElements.forEach(el => el.classList.add('is-visible'));
  }

  // 4. Плавающий виджет мессенджеров (FAB)
  const widgetToggle = document.getElementById('widgetToggle');
  const floatingWidget = document.querySelector('.floating-messengers-widget');

  if (widgetToggle && floatingWidget) {
    widgetToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      floatingWidget.classList.toggle('open');
    });

    document.addEventListener('click', (e) => {
      if (!floatingWidget.contains(e.target)) {
        floatingWidget.classList.remove('open');
      }
    });
  }

  // 5. Интерактивный аккордеон FAQ
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const questionBtn = item.querySelector('.faq-question-btn');
    const answer = item.querySelector('.faq-answer');

    questionBtn.addEventListener('click', () => {
      const isActive = item.classList.contains('active');

      faqItems.forEach(otherItem => {
        if (otherItem !== item) {
          otherItem.classList.remove('active');
          const otherAns = otherItem.querySelector('.faq-answer');
          if (otherAns) otherAns.style.maxHeight = null;
        }
      });

      if (isActive) {
        item.classList.remove('active');
        answer.style.maxHeight = null;
      } else {
        item.classList.add('active');
        answer.style.maxHeight = answer.scrollHeight + 24 + 'px';
      }
    });
  });

  // 6. Модальное окно быстрой записи
  const modal = document.getElementById('bookingModal');
  const openModalButtons = document.querySelectorAll('[data-open-modal]');
  const closeModalButtons = document.querySelectorAll('[data-close-modal]');

  const openModal = (consultationType = '') => {
    if (!modal) return;
    if (consultationType) {
      const typeSelect = modal.querySelector('select[name="serviceType"]');
      if (typeSelect) {
        typeSelect.value = consultationType;
      }
    }
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    if (!modal) return;
    modal.classList.remove('active');
    document.body.style.overflow = '';
  };

  openModalButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const type = btn.getAttribute('data-service-type') || '';
      openModal(type);
    });
  });

  closeModalButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      closeModal();
    });
  });

  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeModal();
      }
    });
  }

  // 7. Мобильное бургер-меню
  const burgerBtn = document.getElementById('burgerBtn');
  const mobileDrawer = document.getElementById('mobileDrawer');
  const drawerOverlay = document.getElementById('drawerOverlay');
  const drawerCloseBtn = document.getElementById('drawerCloseBtn');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-list a');

  const openMobileMenu = () => {
    if (mobileDrawer && drawerOverlay) {
      mobileDrawer.classList.add('active');
      drawerOverlay.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  };

  const closeMobileMenu = () => {
    if (mobileDrawer) mobileDrawer.classList.remove('active');
    if (drawerOverlay) drawerOverlay.classList.remove('active');
    document.body.style.overflow = '';
  };

  if (burgerBtn) burgerBtn.addEventListener('click', openMobileMenu);
  if (drawerCloseBtn) drawerCloseBtn.addEventListener('click', closeMobileMenu);
  if (drawerOverlay) drawerOverlay.addEventListener('click', closeMobileMenu);

  mobileNavLinks.forEach(link => {
    link.addEventListener('click', closeMobileMenu);
  });

  // Модалка подтверждения отправки
  const requestSentModal = document.getElementById('requestSentModal');
  const closeSentModal = () => {
    if (!requestSentModal) return;
    requestSentModal.classList.remove('active');
    document.body.style.overflow = '';
  };
  document.querySelectorAll('[data-close-sent-modal]').forEach(btn => {
    btn.addEventListener('click', closeSentModal);
  });
  if (requestSentModal) {
    requestSentModal.addEventListener('click', (e) => {
      if (e.target === requestSentModal) closeSentModal();
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeModal();
      closeMobileMenu();
      closeMaxModal();
      closeSentModal();
    }
  });

  // 8. Всплывающее уведомление (Toast)
  const showToast = (message, icon = '💌') => {
    let toast = document.getElementById('toastNotice');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'toastNotice';
      toast.className = 'toast-notice';
      document.body.appendChild(toast);
    }
    toast.innerHTML = `<span>${icon}</span> <span>${message}</span>`;
    toast.classList.add('show');

    setTimeout(() => {
      toast.classList.remove('show');
    }, 5500);
  };

  // 9. Обработка и гарантированная отправка заявки (Email + Telegram + VK)
  const setupForm = (formElement) => {
    if (!formElement) return;

    formElement.addEventListener('submit', async (e) => {
      e.preventDefault();

      const submitBtn = formElement.querySelector('button[type="submit"]');
      const originalBtnText = submitBtn ? submitBtn.innerText : 'Отправить';
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerText = 'Подготовка заявки...';
      }

      const name = formElement.querySelector('[name="clientName"]')?.value || 'Не указано';
      const contact = formElement.querySelector('[name="clientContact"]')?.value || 'Не указан';
      const channel = formElement.querySelector('input[name="preferredMessenger"]:checked')?.value || 'telegram';
      const comment = formElement.querySelector('[name="clientMessage"]')?.value || 'Без комментария';
      const service = formElement.querySelector('[name="serviceType"]')?.value || 'Первичная консультация (1 500 ₽)';
      const preferredTime = formElement.querySelector('[name="preferredTime"]')?.value || 'Любое время';

      const channelName = channel === 'telegram' ? 'Telegram' : (channel === 'max' ? 'Макс' : 'VK');

      // Форматируем текст заявки для мессенджеров и письма
      const msgSubject = `Заявка на консультацию — ${name}`;
      const msgBody = `Здравствуйте, Анна! Меня зовут ${name}.\nХочу записаться на консультацию: ${service}\nМой контакт для связи: ${contact}\nУдобный мессенджер: ${channelName}\nУдобное время: ${preferredTime}\nВопрос / ситуация: ${comment}`;

      // Формируем ссылки
      const mailtoUrl = `mailto:${CONTACTS.targetEmail}?subject=${encodeURIComponent(msgSubject)}&body=${encodeURIComponent(msgBody)}`;
      const tgUrl = `https://t.me/Fcupls?text=${encodeURIComponent(msgBody)}`;
      const vkUrl = CONTACTS.vk;

      // Заполняем карточку подтверждения
      const summaryCard = document.getElementById('sentSummaryCard');
      if (summaryCard) {
        summaryCard.innerHTML = `
          <div class="sent-item-row">
            <span class="sent-item-label">Имя:</span>
            <span class="sent-item-value">${name}</span>
          </div>
          <div class="sent-item-row">
            <span class="sent-item-label">Контакт:</span>
            <span class="sent-item-value">${contact}</span>
          </div>
          <div class="sent-item-row">
            <span class="sent-item-label">Услуга:</span>
            <span class="sent-item-value">${service}</span>
          </div>
          <div class="sent-item-row">
            <span class="sent-item-label">Время:</span>
            <span class="sent-item-value">${preferredTime}</span>
          </div>
          <div class="sent-item-row">
            <span class="sent-item-label">Канал связи:</span>
            <span class="sent-item-value">${channelName}</span>
          </div>
        `;
      }

      const sendViaTgBtn = document.getElementById('sendViaTgBtn');
      if (sendViaTgBtn) sendViaTgBtn.setAttribute('href', tgUrl);

      const sendViaVkBtn = document.getElementById('sendViaVkBtn');
      if (sendViaVkBtn) sendViaVkBtn.setAttribute('href', vkUrl);

      // 1. Автоматическая отправка Анне в Telegram через бота (служебные сообщения)
      if (NOTIFICATION_CONFIG.telegram.botToken && NOTIFICATION_CONFIG.telegram.chatId) {
        const escapeTg = (str) => String(str || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
        const tgText = `✨ <b>Новая заявка на консультацию!</b>\n\n` +
          `👤 <b>Имя:</b> ${escapeTg(name)}\n` +
          `📞 <b>Телефон / ник:</b> ${escapeTg(contact)}\n` +
          `🏷️ <b>Услуга:</b> ${escapeTg(service)}\n` +
          `🕐 <b>Удобное время:</b> ${escapeTg(preferredTime)}\n` +
          `💬 <b>Удобный мессенджер:</b> ${escapeTg(channelName)}\n` +
          `📝 <b>Вопрос / ситуация:</b> ${escapeTg(comment)}\n\n` +
          `📅 <i>${new Date().toLocaleString('ru-RU')}</i>`;

        fetch(`https://api.telegram.org/bot${NOTIFICATION_CONFIG.telegram.botToken}/sendMessage`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            chat_id: NOTIFICATION_CONFIG.telegram.chatId,
            text: tgText,
            parse_mode: 'HTML'
          })
        }).then(r => r.json()).then(tgData => {
          if (tgData.ok) {
            showToast('Уведомление отправлено Анне в Telegram! 🚀', '✨');
          }
        }).catch(() => {});
      }

      // 2. Отправка на почту через Web3Forms (активный ключ)
      if (NOTIFICATION_CONFIG.email.web3formsKey) {
        const formData = new FormData();
        formData.append('access_key', NOTIFICATION_CONFIG.email.web3formsKey);
        formData.append('subject', `Новая запись на консультацию — ${name}`);
        formData.append('from_name', 'Сайт Психолога Анны Гордеевой');
        formData.append('Имя_клиента', name);
        formData.append('Телефон_или_никнейм', contact);
        formData.append('Услуга', service);
        formData.append('Удобное_время', preferredTime);
        formData.append('Удобный_мессенджер', channelName);
        formData.append('Вопрос_клиента', comment);

        fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          body: formData
        }).then(r => r.json()).then(webData => {
          if (webData.success) {
            showToast('Заявка успешно отправлена на почту kizamaziza@gmail.com! 💌', '✨');
          }
        }).catch(() => {});
      }

      // 3. Фоновая отправка через FormSubmit на почту
      const payload = {
        _subject: `Новая заявка на консультацию от ${name}`,
        _replyto: contact.includes('@') ? contact : undefined,
        Имя_клиента: name,
        Контакт_связи: contact,
        Предпочитаемый_канал: channelName,
        Услуга: service,
        Вопрос: comment,
        Дата_заявки: new Date().toLocaleString('ru-RU')
      };

      try {
        fetch(`https://formsubmit.co/ajax/${CONTACTS.targetEmail}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify(payload)
        }).catch(() => {});
      } catch (err) {}

      // Закрываем модалку ввода, открываем подтверждающую
      closeModal();
      if (requestSentModal) {
        requestSentModal.classList.add('active');
        document.body.style.overflow = 'hidden';
      }

      showToast(`Заявка подготовлена! Спасибо, ${name}.`, '✨');
      formElement.reset();

      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.innerText = originalBtnText;
      }
    });
  };

  setupForm(document.getElementById('mainBookingForm'));
  setupForm(document.getElementById('modalBookingForm'));
});
