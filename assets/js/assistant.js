(function () {
  'use strict';

  function startAssistant() {
    var root = document.querySelector('.ai-assistant-root');
    if (!root) return;

    var launcher = root.querySelector('.ai-assistant-launcher');
    var overlay = root.querySelector('.ai-assistant-overlay');
    var panel = root.querySelector('.ai-assistant-panel');
    var closeButton = root.querySelector('.ai-assistant-close');
    var form = root.querySelector('.ai-assistant-form');
    var messageField = root.querySelector('.ai-assistant-message');
    var errorMessage = root.querySelector('.ai-assistant-error');
    var questions = Array.prototype.slice.call(root.querySelectorAll('.ai-assistant-question'));
    var whatsappNumber = (root.getAttribute('data-whatsapp') || '').replace(/\D/g, '');
    var closeTimer = 0;
    var lastFocusedElement = null;

    if (!launcher || !overlay || !panel || !closeButton || !form || !messageField || !whatsappNumber) return;

    function getFocusableElements() {
      return Array.prototype.slice.call(panel.querySelectorAll('button:not([disabled]), textarea:not([disabled]), a[href]'))
        .filter(function (element) { return !element.hidden && element.offsetParent !== null; });
    }

    function openAssistant() {
      window.clearTimeout(closeTimer);
      lastFocusedElement = document.activeElement;
      panel.hidden = false;
      overlay.hidden = false;
      window.requestAnimationFrame(function () {
        panel.classList.add('ai-assistant-is-open');
        overlay.classList.add('ai-assistant-is-open');
      });
      launcher.setAttribute('aria-expanded', 'true');
      document.body.classList.add('ai-assistant-scroll-lock');
      window.setTimeout(function () { closeButton.focus(); }, 80);
    }

    function closeAssistant() {
      panel.classList.remove('ai-assistant-is-open');
      overlay.classList.remove('ai-assistant-is-open');
      launcher.setAttribute('aria-expanded', 'false');
      document.body.classList.remove('ai-assistant-scroll-lock');
      closeTimer = window.setTimeout(function () {
        panel.hidden = true;
        overlay.hidden = true;
      }, 230);
      if (lastFocusedElement instanceof HTMLElement) lastFocusedElement.focus();
      else launcher.focus();
    }

    function toggleQuestion(button) {
      var answerId = button.getAttribute('aria-controls');
      var answer = answerId ? document.getElementById(answerId) : null;
      if (!answer) return;
      var willOpen = button.getAttribute('aria-expanded') !== 'true';

      questions.forEach(function (question) {
        var controlledId = question.getAttribute('aria-controls');
        var controlledAnswer = controlledId ? document.getElementById(controlledId) : null;
        question.setAttribute('aria-expanded', 'false');
        if (controlledAnswer) controlledAnswer.hidden = true;
      });

      button.setAttribute('aria-expanded', String(willOpen));
      answer.hidden = !willOpen;
    }

    launcher.addEventListener('click', openAssistant);
    closeButton.addEventListener('click', closeAssistant);
    overlay.addEventListener('click', closeAssistant);
    questions.forEach(function (button) {
      button.addEventListener('click', function () { toggleQuestion(button); });
    });

    document.addEventListener('keydown', function (event) {
      if (panel.hidden) return;
      if (event.key === 'Escape') {
        event.preventDefault();
        closeAssistant();
        return;
      }
      if (event.key !== 'Tab') return;
      var focusable = getFocusableElements();
      if (!focusable.length) return;
      var first = focusable[0];
      var last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    });

    messageField.addEventListener('input', function () {
      if (errorMessage) errorMessage.hidden = true;
    });

    form.addEventListener('submit', function (event) {
      event.preventDefault();
      var message = messageField.value.trim();
      if (!message) {
        if (errorMessage) {
          errorMessage.textContent = 'اكتب تفاصيل طلبك أولاً.';
          errorMessage.hidden = false;
        }
        messageField.focus();
        return;
      }

      var prefixedMessage = 'السلام عليكم، لدي طلب عبر الموقع:\n' + message;
      var whatsappUrl = 'https://wa.me/' + whatsappNumber + '?text=' + encodeURIComponent(prefixedMessage);
      var openedWindow = window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
      if (openedWindow) openedWindow.opener = null;
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', startAssistant, { once: true });
  } else {
    startAssistant();
  }
})();
