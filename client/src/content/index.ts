console.log("Tatkal Assistant Content Script Loaded");

interface Passenger {
  name: string;
  age: string;
  gender: 'M' | 'F' | 'T';
  birthPreference: string;
}

interface TravelProfile {
  id: string;
  trainNo: string;
  from: string;
  to: string;
  date: string;
  passengers: Passenger[];
}

const typeHumanLike = async (element: HTMLInputElement, text: string) => {
  element.value = ''; // Clear existing
  for (const char of text) {
    element.value += char;
    element.dispatchEvent(new Event('input', { bubbles: true }));
    element.dispatchEvent(new KeyboardEvent('keydown', { key: char }));
    element.dispatchEvent(new KeyboardEvent('keypress', { key: char }));
    element.dispatchEvent(new KeyboardEvent('keyup', { key: char }));
    // Random delay between 50ms and 150ms
    await new Promise(resolve => setTimeout(resolve, Math.random() * 100 + 50));
  }
};

const autofillPassengers = async (profile: TravelProfile) => {
  console.log("Attempting to autofill passengers...", profile);

  // Wait for the form to be available
  const nameInputs = document.querySelectorAll('input[placeholder*="Passenger Name"]');
  const ageInputs = document.querySelectorAll('input[placeholder*="Age"]');
  const genderSelects = document.querySelectorAll('select[formcontrolname="passengerGender"]');
  const birthSelects = document.querySelectorAll('select[formcontrolname="passengerBerthChoice"]');

  for (let i = 0; i < profile.passengers.length; i++) {
    const p = profile.passengers[i];
    
    if (nameInputs[i]) await typeHumanLike(nameInputs[i] as HTMLInputElement, p.name);
    if (ageInputs[i]) await typeHumanLike(ageInputs[i] as HTMLInputElement, p.age);
    
    if (genderSelects[i]) {
      const select = genderSelects[i] as HTMLSelectElement;
      select.value = p.gender; // 'M', 'F', or 'T'
      select.dispatchEvent(new Event('change', { bubbles: true }));
    }

    if (birthSelects[i] && p.birthPreference) {
      const select = birthSelects[i] as HTMLSelectElement;
      select.value = p.birthPreference;
      select.dispatchEvent(new Event('change', { bubbles: true }));
    }

    // Add more passengers if needed by clicking the 'Add Passenger' button on site
    if (i < profile.passengers.length - 1 && i === nameInputs.length - 1) {
      const addBtn = document.querySelector('a.add-passenger-block') as HTMLElement;
      if (addBtn) {
        addBtn.click();
        // Brief wait for new row to appear
        await new Promise(r => setTimeout(r, 500));
        return autofillPassengers(profile); // Recursively call to fill newly added row
      }
    }
  }
};

const handleCaptcha = async () => {
  // IRCTC Login Captcha usually has 'captcha-img' class or similar
  const captchaImg = document.querySelector('.captcha-img') || document.querySelector('#captcha-id');
  const captchaInput = document.querySelector('#captcha-input') || document.querySelector('input[formcontrolname="captcha"]');

  if (captchaImg && captchaInput) {
    console.log("Captcha detected. Requesting solver...");
    // Capture would happen here, sending mock request for now
    chrome.runtime.sendMessage({ action: 'solveCaptcha', imageBase64: '...' }, async (response) => {
      if (response && response.success) {
        await typeHumanLike(captchaInput as HTMLInputElement, response.code);
      }
    });
  }
};

const init = async () => {
  const { profiles, activeProfileId } = await chrome.storage.local.get(['profiles', 'activeProfileId']);
  const activeProfile = (profiles as TravelProfile[])?.find(p => p.id === activeProfileId);

  if (!activeProfile) {
    console.log("No active profile found.");
    return;
  }

  // Detect page and act
  if (window.location.href.includes('passenger-details')) {
    autofillPassengers(activeProfile);
  } else if (window.location.href.includes('login')) {
    handleCaptcha();
  }
};

init();
