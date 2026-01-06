// const form = document.getElementById('signup-form');
// const emailInput = document.getElementById('email');
// const btn = document.getElementById('submit-btn');

// // HCI: Real-time Validation (Don't wait for submit to show easy errors)
// // We use 'blur' so we don't yell at the user while they are still typing.
// emailInput.addEventListener('blur', () => {
//   if (!emailInput.value.includes('@')) {
//     setError(emailInput, "Please include an '@' in the email address.");
//   } else {
//     clearError(emailInput);
//   }
// });

// // Clear error immediately when user starts fixing it (HCI: Encouragement)
// emailInput.addEventListener('input', () => {
//   if (emailInput.classList.contains('invalid')) {
//     clearError(emailInput);
//   }
// });

// form.addEventListener('submit', async (e) => {
//   e.preventDefault();

//   // 1. Check validity first
//   if (!form.checkValidity()) {
//     // If invalid, the browser focuses the first invalid element automatically.
//     // This is good HCI (guiding the user).
//     showNativeValidation();
//     return;
//   }

//   // 2. Feedback: Show system is working
//   setLoading(true);

//   // 3. Simulate Network Request (The 100ms - 2s rule)
//   try {
//     await fakeServerRequest();
    
//     // 4. Success Feedback
//     alert("Success! Account created."); // In real app, redirect or show toast
//     form.reset();
//   } catch (error) {
//     // 5. Error Recovery
//     setError(emailInput, "That email is already taken. Try another?");
//   } finally {
//     setLoading(false);
//   }
// });

// // --- Helper Functions ---

// function setLoading(isLoading) {
//   if (isLoading) {
//     btn.classList.add('is-loading');
//     btn.disabled = true; // Prevent double submission
//   } else {
//     btn.classList.remove('is-loading');
//     btn.disabled = false;
//   }
// }

// function setError(input, message) {
//   const formGroup = input.closest('.form-group');
//   const errorDisplay = formGroup.querySelector('.error-msg');
  
//   input.classList.add('invalid');
//   input.setAttribute('aria-invalid', 'true'); // For screen readers
//   errorDisplay.textContent = message;
// }

// function clearError(input) {
//   const formGroup = input.closest('.form-group');
//   const errorDisplay = formGroup.querySelector('.error-msg');
  
//   input.classList.remove('invalid');
//   input.setAttribute('aria-invalid', 'false');
//   errorDisplay.textContent = '';
// }

// function showNativeValidation() {
//   // Triggers browser's built-in validation bubbles if custom JS fails
//   form.reportValidity(); 
// }

// function fakeServerRequest() {
//   return new Promise((resolve) => setTimeout(resolve, 1500));
// }



const form = document.getElementById('signup-form');
const emailInput = document.getElementById('email');
const btn = document.getElementById('submit-btn');

// 1. Change the button text to make it clear this is now a Login
document.querySelector('h2').innerText = "Login";
document.querySelector('.btn-text').innerText = "Log In";

// 2. The Login Logic
form.addEventListener('submit', async (e) => {
  e.preventDefault();

  // HCI Principle: Validate inputs exist before sending
  if (!form.checkValidity()) {
    form.reportValidity(); // Shows browser error bubbles (e.g., "Please include an @")
    return;
  }

  // HCI Principle: Immediate Feedback (Loading State)
  setLoading(true);

  // 3. Simulate Server Check (1.5 seconds)
  try {
    await checkCredentialsInDatabase(emailInput.value, document.getElementById('password').value);
    
    // SUCCESS
    alert("Login Successful! Welcome back.");
    // In a real app, you would redirect here: window.location.href = '/dashboard';
    
  } catch (error) {
    // FAILURE (HCI Principle: clear error recovery)
    // We purposefully set a generic error for security, but specific enough to help.
    alert(error.message); 
    
    // HCI Tip: Highlight the password field so they know to re-type it
    document.getElementById('password').value = '';
    document.getElementById('password').focus();
  } finally {
    // ALWAYS reset the button
    setLoading(false);
  }
});

// --- Simulation Function ---

function checkCredentialsInDatabase(email, password) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // THE "EXACT" CREDENTIALS CHECK
      if (email === "admin@example.com" && password === "password123") {
        resolve("Success");
      } else {
        reject(new Error("Invalid email or password. (Try: admin@example.com / password123)"));
      }
    }, 1500); // 1.5s delay to simulate network
  });
}

// --- Helper Utilities ---

function setLoading(isLoading) {
  if (isLoading) {
    btn.classList.add('is-loading');
    btn.disabled = true;
  } else {
    btn.classList.remove('is-loading');
    btn.disabled = false;
  }
}