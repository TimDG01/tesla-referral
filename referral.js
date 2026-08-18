/* ---------------------------------------------------------------
   Change these two values and every page on this site updates:
   index.html (EN), nl.html, fr.html, de.html.
   Note: the code also appears as literal text in each page's
   <title>/description meta tags and in img/og.png — search and
   replace those separately if you ever get a new code.
   --------------------------------------------------------------- */
const REFERRAL_CODE = "tim588947";
const REFERRAL_URL  = "https://ts.la/tim588947";
/* --------------------------------------------------------------- */

document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll("[data-ref-code]").forEach(function (el) {
    el.textContent = REFERRAL_CODE;
  });
  document.querySelectorAll("[data-ref-url]").forEach(function (el) {
    el.textContent = REFERRAL_URL;
  });
  document.querySelectorAll("[data-ref-link]").forEach(function (el) {
    el.href = REFERRAL_URL;
  });

  /* Remember a language picked in the language bar, so the automatic
     browser-language redirect on the English entry page never overrides
     a deliberate choice. */
  document.querySelectorAll(".langbar a[hreflang]").forEach(function (link) {
    link.addEventListener("click", function () {
      try {
        window.localStorage.setItem("preferred-lang", link.getAttribute("hreflang"));
      } catch (e) { /* private mode: the choice simply is not remembered */ }
    });
  });

  var button = document.querySelector("[data-copy]");
  var status = document.getElementById("copy-status");
  if (!button) return;

  function flash(message) {
    button.classList.add("is-copied");
    if (status) status.textContent = message;
    window.setTimeout(function () {
      button.classList.remove("is-copied");
      if (status) status.textContent = "";
    }, 2400);
  }

  function selectLinkText() {
    var node = document.querySelector(".code-value--link");
    if (!node || !window.getSelection) return;
    var range = document.createRange();
    range.selectNodeContents(node);
    var selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(range);
  }

  function fallbackCopy(text) {
    var field = document.createElement("textarea");
    field.value = text;
    field.setAttribute("readonly", "");
    field.style.position = "fixed";
    field.style.opacity = "0";
    document.body.appendChild(field);
    field.select();
    var ok = false;
    try { ok = document.execCommand("copy"); } catch (e) { ok = false; }
    document.body.removeChild(field);
    return ok;
  }

  function copyWithFallback(value) {
    if (fallbackCopy(value)) {
      flash(button.dataset.copiedMsg + value);
    } else {
      selectLinkText();
      flash(button.dataset.failMsg);
    }
  }

  button.addEventListener("click", function () {
    var value = button.dataset.copy === "code" ? REFERRAL_CODE : REFERRAL_URL;
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(value).then(
        function () { flash(button.dataset.copiedMsg + value); },
        function () { copyWithFallback(value); }
      );
    } else {
      copyWithFallback(value);
    }
  });
});
