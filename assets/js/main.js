(function () {
  'use strict';

  function onReady(callback) {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', callback, { once: true });
      return;
    }
    callback();
  }

  onReady(function () {
    var menuButton = document.querySelector('[data-menu-button]');
    var navigation = document.querySelector('[data-navigation]');
    var servicesToggle = document.querySelector('[data-services-toggle]');
    var servicesMenu = document.querySelector('[data-services-menu]');

    function setMenuState(open) {
      if (!menuButton || !navigation) return;
      if (open) {
        var header = document.querySelector('.site-header');
        if (header) navigation.style.setProperty('--menu-top', Math.max(8, header.getBoundingClientRect().bottom + 8) + 'px');
      }
      menuButton.setAttribute('aria-expanded', String(open));
      navigation.classList.toggle('is-open', open);
      document.body.classList.toggle('nav-open', open && window.innerWidth <= 1120);
    }

    function setServicesState(open) {
      if (!servicesToggle || !servicesMenu) return;
      servicesToggle.setAttribute('aria-expanded', String(open));
      servicesMenu.classList.toggle('is-open', open);
    }

    if (menuButton && navigation) {
      menuButton.addEventListener('click', function () {
        setMenuState(menuButton.getAttribute('aria-expanded') !== 'true');
      });
    }

    if (servicesToggle && servicesMenu) {
      servicesToggle.addEventListener('click', function () {
        setServicesState(servicesToggle.getAttribute('aria-expanded') !== 'true');
      });
    }

    document.addEventListener('click', function (event) {
      var target = event.target;
      if (!(target instanceof Element)) return;

      if (navigation && menuButton && navigation.classList.contains('is-open')) {
        var clickedInsideNavigation = navigation.contains(target) || menuButton.contains(target);
        if (!clickedInsideNavigation) setMenuState(false);
      }

      if (servicesMenu && servicesToggle && servicesMenu.classList.contains('is-open')) {
        var clickedInsideServices = servicesMenu.contains(target) || servicesToggle.contains(target);
        if (!clickedInsideServices) setServicesState(false);
      }
    });

    document.addEventListener('keydown', function (event) {
      if (event.key !== 'Escape') return;
      setServicesState(false);
      setMenuState(false);
    });

    window.addEventListener('resize', function () {
      if (window.innerWidth > 1120) {
        setMenuState(false);
      } else if (navigation && navigation.classList.contains('is-open')) {
        setMenuState(true);
      }
    }, { passive: true });

    if (navigation) {
      navigation.addEventListener('click', function (event) {
        var target = event.target;
        if (target instanceof Element && target.closest('a') && window.innerWidth <= 1120) {
          setMenuState(false);
        }
      });
    }

    document.querySelectorAll('.faq-list').forEach(function (list) {
      list.addEventListener('toggle', function (event) {
        var openedItem = event.target;
        if (!(openedItem instanceof HTMLDetailsElement) || !openedItem.open) return;
        list.querySelectorAll('details[open]').forEach(function (item) {
          if (item !== openedItem) item.open = false;
        });
      }, true);
    });

    var certificateDialog = document.querySelector('[data-certificate-dialog]');
    var certificateDialogImage = document.querySelector('[data-certificate-dialog-image]');
    var certificateDialogTitle = document.querySelector('[data-certificate-dialog-title]');
    var certificateDialogClose = document.querySelector('[data-certificate-dialog-close]');

    function closeCertificateDialog() {
      if (!certificateDialog || typeof certificateDialog.close !== 'function') return;
      certificateDialog.close();
      if (certificateDialogImage) certificateDialogImage.removeAttribute('src');
    }

    document.querySelectorAll('[data-certificate-src]').forEach(function (button) {
      button.addEventListener('click', function () {
        if (!certificateDialog || !certificateDialogImage || typeof certificateDialog.showModal !== 'function') return;
        var source = button.getAttribute('data-certificate-src');
        var title = button.getAttribute('data-certificate-title') || 'وثيقة النشاط';
        if (!source) return;
        certificateDialogImage.src = source;
        certificateDialogImage.alt = title;
        if (certificateDialogTitle) certificateDialogTitle.textContent = title;
        certificateDialog.showModal();
      });
    });

    if (certificateDialogClose) certificateDialogClose.addEventListener('click', closeCertificateDialog);
    if (certificateDialog) {
      certificateDialog.addEventListener('click', function (event) {
        if (event.target === certificateDialog) closeCertificateDialog();
      });
    }
  });
})();
