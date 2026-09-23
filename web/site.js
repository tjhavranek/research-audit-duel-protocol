/* research-audit-duel-protocol: the web page.
   Reads the four MAD prompts out of the protocol file named in MAD below, at load
   time, and copies them unchanged except for the bracketed placeholders. Nothing
   is sent anywhere. The one thing kept is an edited role, in this tab's session
   storage, so it survives a reload. tests/check_prompts.py reimplements the
   extraction, so a change to the protocol that would break a button fails CI. */
(function () {
  "use strict";

  var REPO = "https://github.com/tjhavranek/research-audit-duel-protocol/blob/main/";
  var MAD = "protocol/ai_mad_protocol_v2.1.md";

  /* The default lineup is the protocol's own table, written out as concrete
     priors rather than labels, because "tough referee" four times produces one
     review four times. Which model takes which seat is the authors' choice, not
     a finding: the heavy analytical seats go to the models they have found
     steadiest on long technical documents, and the devil's advocate seat to the
     one that diverges most, because that seat is there to break a consensus. */
  var LINEUP = [
    {
      id: "chatgpt",
      name: "ChatGPT",
      label: "Editor and contribution skeptic",
      role: "Editor who cares more about a crisp contribution than about technical cleverness, and who starts from the suspicion that the claimed contribution is too thin to carry the paper."
    },
    {
      id: "claude",
      name: "Claude",
      label: "Identification referee",
      role: "Econometrician who thinks the identification strategy is probably the weakest link in any applied paper, and who reads the design logic and the assumptions behind it before reading anything else."
    },
    {
      id: "gemini",
      name: "Gemini",
      label: "Domain and literature referee",
      role: "Referee working inside this literature who suspects the positioning overstates novelty, that the closest prior work has not been confronted, and that the mechanism is asserted rather than shown."
    },
    {
      id: "grok",
      name: "Grok",
      label: "Devil's advocate",
      role: "Devil's advocate whose job is to attack any apparent consensus, especially where the other readers converge, and to state the strongest objection everyone else is underweighting."
    }
  ];

  /* Round 3 reassigns one seat to attack whatever Round 2 could not settle.
     Each fault line gets a prior in the same style, used until the user types. */
  var TARGETED = {
    IDENTIFICATION: "Econometrician who believes the identification strategy is the weakest link here, and that what still defends it is assumption rather than evidence.",
    LITERATURE: "Specialist in this literature who believes the positioning overstates novelty and that the closest prior work has still not been confronted.",
    LOGIC: "Reader who believes the conclusion does not follow from the stated results even if every number in the paper is correct.",
    CONTRIBUTION: "Editor who believes the contribution still standing after Round 2 is too thin to carry the paper at this venue.",
    DATA: "Data skeptic who believes the sample, the measurement or the coding choices cannot support the claim being made."
  };

  var ROLE_TAG = "[ROLE]";
  var LABEL_TAG = "[LABEL]";
  var NEW_ROLE_TAG = "[NEW TARGETED ROLE]";
  var FAULT_TAG = "[IDENTIFICATION / LITERATURE / LOGIC / CONTRIBUTION / DATA / ETC.]";
  var ID_TAG = "[CRITICISM ID]";

  var prompts = {};

  function count(n) { return n.toLocaleString("en-US"); }
  function replaceAll(text, find, into) { return text.split(find).join(into); }

  /* The protocol writes "You are acting as: [ROLE]." and every role here is a
     full sentence, so a role pasted in raw ends the line with two full stops.
     The template owns the punctuation, for a question mark as much as a period. */
  function asClause(s) { return (s || "").trim().replace(/[.!?]+$/, ""); }

  /* Edited roles survive a reload in the same tab. A run takes an hour or more,
     and a phone discards background tabs freely, so without this a reload between
     Round 1 and Round 2 would quietly send Round 2 a different role from the one
     the model answered Round 1 in. Session storage rather than local: it goes when
     the tab closes, so roles written for last month's paper never come back
     uninvited. Nothing leaves the browser either way. */
  var ROLE_KEY = "radp.role.";
  function loadRole(id) { try { return sessionStorage.getItem(ROLE_KEY + id); } catch (e) { return null; } }
  function saveRole(id, v) { try { sessionStorage.setItem(ROLE_KEY + id, v); } catch (e) { /* storage blocked: edits last as long as the page */ } }
  function forgetRole(id) { try { sessionStorage.removeItem(ROLE_KEY + id); } catch (e) { /* nothing stored */ } }

  /* A role is the thing the user is meant to read and edit, so the box shows all
     of it. A fixed row count clips the longer roles on a narrow screen, and a
     clipped role is one nobody checks before sending it. */
  function grow(ta) {
    ta.style.height = "auto";
    ta.style.height = (ta.scrollHeight + 2) + "px";
  }

  /* Pull one prompt out of the protocol file.

     The contract is deliberately rigid, because the dangerous failure is not a
     dead button, it is a button that quietly copies the wrong text. So: exactly
     one "## Step N:" heading in the file, the section running to the next "## ",
     and inside it exactly two fence lines, the first of them ```text. Anything
     else returns null and the page fails closed with a link to the file.
     tests/check_prompts.py enforces the same contract in CI. */
  function promptFromStep(doc, n) {
    var re = new RegExp("^## Step " + n + ":.*$", "gm");
    var head = re.exec(doc);
    if (!head) { return null; }
    if (re.exec(doc)) { return null; }        // a second Step N heading is ambiguous

    var rest = doc.slice(head.index + head[0].length);
    var nextHead = /^## /m.exec(rest);
    var section = nextHead ? rest.slice(0, nextHead.index) : rest;

    var fences = section.match(/^```.*$/gm) || [];
    if (fences.length !== 2) { return null; }  // a second block, or an unclosed one
    if (!/^```text[ \t]*$/.test(fences[0]) || !/^```[ \t]*$/.test(fences[1])) { return null; }

    var from = section.indexOf(fences[0]) + fences[0].length;
    var close = section.indexOf(fences[1], from);
    if (close < 0) { return null; }
    return section.slice(from, close).trim() || null;
  }

  function copyText(text) {
    if (navigator.clipboard && window.isSecureContext) {
      return navigator.clipboard.writeText(text).then(
        function () { return true; },
        function () { return legacyCopy(text); }
      );
    }
    return Promise.resolve(legacyCopy(text));
  }

  function legacyCopy(text) {
    var ta = document.createElement("textarea");
    ta.value = text;
    ta.setAttribute("readonly", "");
    ta.style.position = "fixed";
    ta.style.top = "0";
    ta.style.left = "-9999px";
    document.body.appendChild(ta);
    ta.select();
    ta.setSelectionRange(0, text.length);
    var ok = false;
    try { ok = document.execCommand("copy"); } catch (err) { ok = false; }
    document.body.removeChild(ta);
    return ok;
  }

  /* ---- the lineup ---- */

  function buildLineup() {
    var host = document.getElementById("lineup");
    if (!host) { return; }
    LINEUP.forEach(function (m) {
      var row = document.createElement("div");
      row.className = "seat";
      row.setAttribute("role", "group");
      row.setAttribute("aria-label", m.name + ", " + m.label);

      var head = document.createElement("div");
      head.className = "seat-head";
      var name = document.createElement("span");
      name.className = "seat-name";
      name.textContent = m.name;
      var label = document.createElement("span");
      label.className = "seat-label";
      label.textContent = m.label;
      head.appendChild(name);
      head.appendChild(label);

      var area = document.createElement("textarea");
      area.className = "seat-role";
      area.rows = 2;
      var saved = loadRole(m.id);
      if (saved !== null) { m.role = saved; }
      area.value = m.role;
      area.spellcheck = false;
      area.setAttribute("aria-label", "The role given to " + m.name);
      area.addEventListener("input", function () { m.role = area.value; saveRole(m.id, area.value); grow(area); });
      m.field = area;

      row.appendChild(head);
      row.appendChild(area);
      host.appendChild(row);
      grow(area);
    });

    var reset = document.getElementById("reset-roles");
    if (reset) {
      reset.addEventListener("click", function () {
        LINEUP.forEach(function (m, i) {
          m.role = DEFAULTS[i];
          m.field.value = DEFAULTS[i];
          forgetRole(m.id);
          grow(m.field);
        });
      });
    }

    // A narrower window rewraps the text, so the boxes have to be measured again.
    window.addEventListener("resize", function () {
      LINEUP.forEach(function (m) { if (m.field) { grow(m.field); } });
    });
  }

  var DEFAULTS = LINEUP.map(function (m) { return m.role; });

  /* ---- Round 3 controls ---- */

  var faultSelect, newRoleField, idField, newRoleTouched = false;

  /* Round 3 names one contested criticism and argues about it. With the ID left
     blank the prompt would read "Round 2 left this criticism contested: ." and the
     model would have nothing to work on, so the button stays off until it is given
     one. This is the only gated control on the page. */
  var threeButtons = [], threeReady = false;

  function gateThree() {
    var ok = threeReady && idField && idField.value.trim().length > 0;
    threeButtons.forEach(function (b) { b.disabled = !ok; });
  }

  function setupTargeted() {
    faultSelect = document.getElementById("faultline");
    newRoleField = document.getElementById("newrole");
    idField = document.getElementById("criticism-id");
    if (!faultSelect || !newRoleField) { return; }
    newRoleField.value = TARGETED[faultSelect.value];
    newRoleField.addEventListener("input", function () { newRoleTouched = true; });
    faultSelect.addEventListener("change", function () {
      if (!newRoleTouched) { newRoleField.value = TARGETED[faultSelect.value]; }
    });
    if (idField) { idField.addEventListener("input", gateThree); }
  }

  /* The Round 1 bundle: four verbatim outputs under four headings. Built from the
     lineup the user is actually running, so the headings match their own seats. */
  function bundleTemplate() {
    return LINEUP.map(function (m) {
      return "=== " + m.name + " | " + m.label + " ===\n" +
        "(complete Round 1 output, unedited, no commentary from you)\n";
    }).join("\n");
  }

  function setupTemplate(box) {
    var button = box.querySelector("button");
    var status = box.querySelector(".status");
    var details = box.querySelector("details");
    var area = box.querySelector("textarea");

    button.addEventListener("click", function () {
      var text = bundleTemplate();
      area.value = text;
      status.className = "status";
      status.textContent = "";
      copyText(text).then(function (ok) {
        if (ok) {
          status.textContent = "Copied, " + count(text.length) + " characters.";
        } else {
          details.open = true;
          area.focus();
          area.select();
          area.setSelectionRange(0, area.value.length);
          status.className = "status err";
          status.textContent = "Your browser did not allow copying. The template is selected below: press Ctrl+C, or ⌘C on a Mac.";
        }
      });
    });

    details.addEventListener("toggle", function () {
      if (details.open) { area.value = bundleTemplate(); }
    });
  }

  /* ---- what each button actually copies ---- */

  function textFor(round, model) {
    var base = prompts[round];
    if (!base) { return null; }
    if (round === 1 || round === 2) {
      return replaceAll(replaceAll(base, ROLE_TAG, asClause(model.role)), LABEL_TAG, model.name);
    }
    if (round === 3) {
      var role = asClause(newRoleField && newRoleField.value) || asClause(TARGETED[faultSelect.value]);
      var fault = faultSelect ? faultSelect.value : "IDENTIFICATION";
      var id = idField ? idField.value.trim() : "";
      if (!id) { return null; }
      return replaceAll(replaceAll(replaceAll(base, NEW_ROLE_TAG, role), FAULT_TAG, fault), ID_TAG, id);
    }
    return base;
  }

  /* ---- the copy buttons under each round ---- */

  function buildFanout(box) {
    var round = +box.getAttribute("data-round");
    var step = +box.getAttribute("data-step");
    var single = box.classList.contains("fanout-one");

    var btns = document.createElement("div");
    btns.className = "btns";
    var status = document.createElement("p");
    status.className = "status";
    status.setAttribute("role", "status");

    function wire(button, model) {
      button.addEventListener("click", function () {
        var text = textFor(round, model);
        if (!text) { return; }
        status.className = "status";
        status.textContent = "";
        copyText(text).then(function (ok) {
          if (ok) {
            status.textContent = (model ? model.name + ": copied, " : "Copied, ") + count(text.length) + " characters.";
          } else {
            show.open = true;
            area.value = text;
            area.focus();
            area.select();
            area.setSelectionRange(0, area.value.length);
            status.className = "status err";
            status.textContent = "Your browser did not allow copying. The prompt is selected below: press Ctrl+C, or ⌘C on a Mac.";
          }
        });
      });
    }

    if (single) {
      var one = document.createElement("button");
      one.type = "button";
      one.className = round === 3 ? "btn btn-big gated" : "btn btn-big";
      one.disabled = true;
      one.textContent = round === 3 ? "Copy the targeted prompt" : "Copy the arbiter prompt";
      wire(one, null);
      btns.appendChild(one);
      if (round === 3) { threeButtons.push(one); }
    } else {
      LINEUP.forEach(function (m) {
        var cell = document.createElement("div");
        cell.className = "cell";
        var b = document.createElement("button");
        b.type = "button";
        b.className = "btn";
        b.disabled = true;
        b.textContent = "Copy for " + m.name;
        var cap = document.createElement("span");
        cap.className = "cell-label";
        cap.textContent = m.label;
        wire(b, m);
        cell.appendChild(b);
        cell.appendChild(cap);
        btns.appendChild(cell);
      });
    }

    var source = document.createElement("p");
    source.className = "source";
    var link = document.createElement("a");
    link.href = REPO + MAD;
    link.textContent = MAD + " § Step " + step;
    source.appendChild(link);

    var show = document.createElement("details");
    show.className = "show";
    var sum = document.createElement("summary");
    sum.textContent = single ? "Show the prompt" : "Show the shared prompt";
    var area = document.createElement("textarea");
    area.readOnly = true;
    area.rows = 8;
    area.spellcheck = false;
    area.setAttribute("aria-label", "The prompt for step " + step);
    show.appendChild(sum);
    show.appendChild(area);

    box.appendChild(btns);
    box.appendChild(status);
    box.appendChild(source);
    box.appendChild(show);

    box._ready = function (text) {
      area.value = text;
      if (round === 3) { threeReady = true; gateThree(); return; }
      btns.querySelectorAll("button").forEach(function (b) { b.disabled = false; });
    };
  }

  /* ---- the Duel row, which copies a whole file ---- */

  function setupWhole(box) {
    var src = box.getAttribute("data-whole");
    var button = box.querySelector("button");
    var status = box.querySelector(".status");
    var details = box.querySelector("details");
    var area = box.querySelector("textarea");
    var source = box.querySelector(".source");
    var text = null;

    if (source) {
      var a = document.createElement("a");
      a.href = REPO + src;
      a.textContent = src;
      source.textContent = "";
      source.appendChild(a);
    }

    fetch(src, { cache: "no-cache" })
      .then(function (res) { if (!res.ok) { throw new Error(String(res.status)); } return res.text(); })
      .then(function (body) {
        text = body.replace(/\r\n?/g, "\n").trim();
        if (!text) { throw new Error("empty"); }
        area.value = text;
        button.disabled = false;
      })
      .catch(function () {
        status.className = "status err";
        status.textContent = "";
        status.appendChild(document.createTextNode("Not loaded. Open "));
        var link = document.createElement("a");
        link.href = REPO + src;
        link.textContent = src;
        status.appendChild(link);
        status.appendChild(document.createTextNode(" and copy it by hand."));
        if (details) { details.hidden = true; }
      });

    button.addEventListener("click", function () {
      if (!text) { return; }
      status.className = "status";
      status.textContent = "";
      copyText(text).then(function (ok) {
        if (ok) {
          status.textContent = "Copied, " + count(text.length) + " characters.";
        } else {
          details.open = true;
          area.focus();
          area.select();
          area.setSelectionRange(0, area.value.length);
          status.className = "status err";
          status.textContent = "Your browser did not allow copying. The text is selected below: press Ctrl+C, or ⌘C on a Mac.";
        }
      });
    });
  }

  /* ---- start ---- */

  function failClosed() {
    var banner = document.getElementById("load-fail");
    if (!banner) { return; }
    banner.textContent = "";
    banner.appendChild(document.createTextNode("The prompts could not be read from the protocol file, so the copy buttons are switched off. Open "));
    var a = document.createElement("a");
    a.href = REPO + MAD;
    a.textContent = MAD;
    banner.appendChild(a);
    banner.appendChild(document.createTextNode(" and copy each prompt out of it by hand, replacing the bracketed placeholders yourself."));
    banner.hidden = false;
  }

  buildLineup();
  setupTargeted();

  var boxes = [];
  document.querySelectorAll(".fanout[data-round]").forEach(function (box) {
    buildFanout(box);
    boxes.push(box);
  });
  document.querySelectorAll(".copy[data-whole]").forEach(setupWhole);
  document.querySelectorAll(".copy[data-template]").forEach(setupTemplate);

  fetch(MAD, { cache: "no-cache" })
    .then(function (res) { if (!res.ok) { throw new Error(String(res.status)); } return res.text(); })
    .then(function (doc) {
      doc = doc.replace(/\r\n?/g, "\n");
      [1, 2, 3, 4].forEach(function (n) { prompts[n] = promptFromStep(doc, n); });
      if (!prompts[1] || !prompts[2] || !prompts[3] || !prompts[4]) { throw new Error("anchors"); }
      boxes.forEach(function (box) {
        box._ready(prompts[+box.getAttribute("data-round")]);
      });
    })
    .catch(failClosed);

  /* A link such as .../#duel opens that row. */
  function openFromHash() {
    var id = decodeURIComponent(location.hash.slice(1));
    if (!id) { return; }
    var el = document.getElementById(id);
    if (el && el.tagName === "DETAILS") {
      el.open = true;
      el.scrollIntoView();
      var s = el.querySelector("summary");
      if (s) { s.focus({ preventScroll: true }); }
    }
  }
  openFromHash();
  window.addEventListener("hashchange", openFromHash);
})();
