document.addEventListener("DOMContentLoaded", () => {
  // --- Typewriter Effect ---
  const textLines = [
    "> DISHA TALAULIKAR",
    "> SOFTWARE DEVELOPER ",
  ];

  const headline = document.getElementById("headline");
  let lineIndex = 0;
  let charIndex = 0;

  function typeLine() {
    if (lineIndex < textLines.length) {
      if (charIndex < textLines[lineIndex].length) {
        headline.innerHTML += textLines[lineIndex].charAt(charIndex);
        charIndex++;
        setTimeout(typeLine, 50);
      } else {
        headline.innerHTML += "<br>";
        lineIndex++;
        charIndex = 0;
        setTimeout(typeLine, 500);
      }
    } else {
      headline.innerHTML += '<span class="cursor"></span>';
    }
  }
  typeLine();

  // --- Click sound for buttons ---
  const clickSound = new Audio("assets/sounds/click.wav");
  document.querySelectorAll("button").forEach((btn) => {
    btn.addEventListener("click", () => clickSound.play());
  });

  // --- Windows scroll animation ---
  const windows = document.querySelectorAll(".window");
  window.addEventListener("scroll", () => {
    windows.forEach((win) => {
      const rect = win.getBoundingClientRect();
      if (rect.top < window.innerHeight - 50) {
        win.classList.add("visible");
      }
    });
  });

  // --- Animate Skill Bars ---
  window.addEventListener("load", () => {
    const fills = document.querySelectorAll(".skill-bar-fill");
    fills.forEach(
      (fill) => (fill.style.width = fill.getAttribute("data-width"))
    );
  });

  // --- Floating music player ---
  const vinylBtn = document.getElementById("vinyl-btn");
  const floatingPlayer = document.getElementById("floating-music-player");
  const vinylBubble = document.getElementById("vinyl-bubble");

  if (vinylBtn) {
    vinylBtn.addEventListener("click", () => {
      floatingPlayer.style.display =
        floatingPlayer.style.display === "block" ? "none" : "block";
      if (vinylBubble) vinylBubble.style.display = "none";
    });
  }

  // --- Music play/pause ---
  const playButtons = document.querySelectorAll(".play-btn");
  const pauseButtons = document.querySelectorAll(".pause-btn");
  let currentAudio = null;

  playButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      if (currentAudio) currentAudio.pause();
      const src = btn.dataset.src;
      currentAudio = new Audio(src);
      currentAudio.play();

      const progressBar = btn.parentElement.querySelector(".progress-bar");
      currentAudio.ontimeupdate = () => {
        const percent =
          (currentAudio.currentTime / currentAudio.duration) * 100;
        progressBar.style.width = percent + "%";
      };
    });
  });

  pauseButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      if (currentAudio) currentAudio.pause();
    });
  });

  // --- Navbar windows ---
  const navItems = document.querySelectorAll("#navbar li");
  navItems.forEach((item) => {
    item.addEventListener("click", () => {
      const targetId = item.getAttribute("data-target");
      const targetWindow = document.getElementById(targetId);
      if (targetWindow) targetWindow.style.display = "block";
    });
  });

  // --- Hobbies ---
  const hobbyIcon = document.getElementById("hobby-icon");
  if (hobbyIcon) {
    hobbyIcon.addEventListener("click", () => {
      const house = document.createElement("div");
      house.classList.add("falling-house");
      house.style.left = Math.random() * (window.innerWidth - 50) + "px";
      document.body.appendChild(house);
      house.innerHTML = "💖";
      house.addEventListener("animationend", () => house.remove());

      const hobbiesSection = document.getElementById("hobbies");
      if (hobbiesSection) hobbiesSection.style.display = "block";
    });
  }

  const avatar = document.getElementById("avatar");
  const hobbyItems = document.querySelectorAll(".hobby-item");
  const hobbyWindow = document.getElementById("hobby-window");
  const hobbyTitle = document.getElementById("hobby-title");
  const hobbyDesc = document.getElementById("hobby-desc");

  const hobbyDescriptions = {
    Writing: "I write essays, poems, and articles whenever inspiration strikes.",
    Ukulele: "I love playing the ukulele and creating small melodies.",
    Colouring: "I enjoy colouring in children’s books with oil pastels or colour pencils.",
    "Reading Books": "I read literature fiction, romance, and classic books.",
    "YT Video Essays": "Watching YouTube video essays about random topics is fun.",
    "Substack Articles": "I enjoy reading articles on Substack to explore ideas.",
    Crochet: "I am an intermediate-level crochet enthusiast, creating patterns and designs.",
    Dancing: "I used to dance a lot when I was a kid.",
    Singing: "I enjoy singing Taylor Swift songs for fun.",
    Journalling: "I journal to track my thoughts, moods, and reflections.",
    "K-Dramas": "I watch K-Dramas for relaxation and storytelling inspiration.",
    Cooking: "I love cooking, especially chopping vegetables efficiently.",
  };

  hobbyItems.forEach((item) => {
    item.addEventListener("click", () => {
      const rect = item.getBoundingClientRect();
      const parentRect = item.parentElement.getBoundingClientRect();

      const targetTop = rect.top - parentRect.top;
      const targetLeft = rect.left - parentRect.left;

      avatar.classList.add("walking");

      const duration = 500;
      const startTop = parseInt(avatar.style.top) || 0;
      const startLeft = parseInt(avatar.style.left) || 0;
      const startTime = performance.now();

      function animate(time) {
        const elapsed = time - startTime;
        const progress = Math.min(elapsed / duration, 1);

        avatar.style.top = startTop + (targetTop - startTop) * progress + "px";
        avatar.style.left = startLeft + (targetLeft - startLeft) * progress + "px";

        if (progress < 1) requestAnimationFrame(animate);
        else avatar.classList.remove("walking");
      }

      requestAnimationFrame(animate);

      hobbyTitle.textContent = item.dataset.name;
      hobbyDesc.textContent = hobbyDescriptions[item.dataset.name] || "";
      hobbyWindow.style.display = "block";
    });
  });

  // --- Contact Popup ---
  const insertCoinBtn = document.getElementById("insert-coin");
  const contactPopup = document.getElementById("contact-popup");
  if (insertCoinBtn) {
    insertCoinBtn.addEventListener("click", () => {
      contactPopup.style.display =
        contactPopup.style.display === "block" ? "none" : "block";
    });
  }

  // --- Photo App ---
  const photoIcon = document.getElementById("photo-app-icon");
  const photoWindow = document.getElementById("photo-window");
  const closePhotoBtn = document.getElementById("close-photo-window");

  if (photoIcon && photoWindow && closePhotoBtn) {
    photoIcon.addEventListener("click", () => {
      photoWindow.style.display = "block";
    });
    closePhotoBtn.addEventListener("click", () => {
      photoWindow.style.display = "none";
    });
  }

  // --- Internship App ---
  const internshipIcon = document.getElementById("internship-app-icon");
  const internshipWindow = document.getElementById("internship-window");
  const closeInternshipBtn = document.getElementById("close-internship-window");

  if (internshipIcon && internshipWindow && closeInternshipBtn) {
    internshipIcon.addEventListener("click", () => {
      internshipWindow.style.display =
        internshipWindow.style.display === "block" ? "none" : "block";
    });

    closeInternshipBtn.addEventListener("click", () => {
      internshipWindow.style.display = "none";
    });
  }
 const ieIcon = document.getElementById("ie-icon");
const eduModal = document.getElementById("education-modal");
const closeEdu = document.getElementById("close-education");

if (ieIcon && eduModal && closeEdu) {
  // toggle modal on icon click
  ieIcon.addEventListener("click", () => {
    eduModal.style.display = eduModal.style.display === "block" ? "none" : "block";
  });

  // close modal
  closeEdu.addEventListener("click", () => {
    eduModal.style.display = "none";
  });
}

  // --- CMD Terminal ---
  const cmdIcon = document.getElementById("cmd-icon");
  const cmdModal = document.getElementById("cmd-modal");
  const cmdClose = document.querySelector(".close-btn.cmd-close");
  const cmdInput = document.getElementById("cmd-input");
  const cmdBody = document.getElementById("cmd-body");

  if (cmdIcon && cmdModal && cmdClose && cmdInput && cmdBody) {
    cmdIcon.addEventListener("click", () => {
      cmdModal.style.display =
        cmdModal.style.display === "block" ? "none" : "block";
      if (cmdModal.style.display === "block") cmdInput.focus();
    });

    cmdClose.addEventListener("click", () => {
      cmdModal.style.display = "none";
    });

    const aboutChunks = [
      `ABOUT ME
Software Developer with a strong foundation in AI/ML, Python, and data-driven problem-solving.`,
      `CAREER OBJECTIVE
Software Developer eager to leverage AI/ML and full-stack skills to build scalable solutions while continuously learning through real-world applications.`,
      `SKILLS
Programming Languages: Python (Scikit-learn, Pandas, Matplotlib, NumPy), R, Java, C++, C
Web Development: ASP.NET Core, React, REST API Development, HTML/CSS, JavaScript
Data Management: MySQL, MongoDB
Machine Learning: Deep Learning, Supervised Learning, Reinforcement Learning
Data Analysis: Data Cleaning, Exploratory Data Analysis, Data Visualization`,
    ];

    let chunkIndex = 0;
    let showingChunks = false;

    cmdInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        const command = cmdInput.value.trim().toLowerCase();

        if (showingChunks) {
          if (chunkIndex < aboutChunks.length) {
            cmdBody.innerHTML += aboutChunks[chunkIndex] + "\n\n";
            chunkIndex++;
            cmdBody.scrollTop = cmdBody.scrollHeight;
          } else {
            cmdBody.innerHTML += "End of About Me.\n";
            showingChunks = false;
            chunkIndex = 0;
          }
          cmdInput.value = "";
          return;
        }

        let output = "";
        switch (command) {
          case "help":
            output =
              "Available commands:\nhelp - Show commands\nabout - Learn about me (press Enter to see next section)\nclear - Clear screen";
            break;
          case "about":
            showingChunks = true;
            chunkIndex = 0;
            cmdBody.innerHTML += "Press Enter to see the next section...\n\n";
            cmdInput.value = "";
            return;
          case "clear":
            cmdBody.innerHTML = "";
            cmdInput.value = "";
            return;
          default:
            output = `'${cmdInput.value}' is not recognized as an internal or external command.`;
        }

        cmdBody.innerHTML += `C:\\> ${cmdInput.value}\n${output}\n`;
        cmdBody.scrollTop = cmdBody.scrollHeight;
        cmdInput.value = "";
      }
    });
  }
});
