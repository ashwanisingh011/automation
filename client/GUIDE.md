# 🚂 Tatkal Pro - Operational Guide

Welcome to **Tatkal Pro**, your high-speed automated assistant for IRCTC ticket bookings. This guide will help you set up and use the extension for maximum success during the Tatkal window.

---

## 🛠 Step 1: Loading the Extension
Since this is your **personal extension**, it is loaded locally into your browser:
1.  Open **Google Chrome** and go to `chrome://extensions/`.
2.  Enable **Developer Mode** (toggle in the top right corner).
3.  Click **Load unpacked** (top left).
4.  Navigate to the project folder and select the `client/dist` directory.
5.  **Pin the extension** to your toolbar by clicking the 🧩 icon.

---

## 📝 Step 2: Configuration (Pre-Booking)
**Do this 10–15 minutes before the Tatkal window opens (10:00 AM or 11:00 AM).**
1.  Click the **Tatkal Pro** icon in your toolbar and select **Configure Profiles**.
2.  Add a new profile and enter:
    *   **Train Number** and **Journey Date**.
    *   **Passenger Details**: Name, Age, Gender, and Berth Preference.
3.  Click **Select as Primary** on the profile you intend to use. It must show the **Blue "Active" Badge**.
4.  Click **Save Changes** at the top.
5.  Check the extension popup—it should now display your active Train Number.

---

## 🚀 Step 3: The Booking Process

### 1. Login
*   Navigate to [irctc.co.in](https://www.irctc.co.in) and open the Login modal.
*   The extension will automatically attempt to solve and "type" the captcha character-by-character.
*   Review and click **Login**.

### 2. Search & Selection
*   Search for your stations and select the **TATKAL** quota.
*   Find your train and click on the desired class (e.g., 3A, SL).
*   Click **Book Now** as soon as the window opens.

### 3. Automated Passenger Entry (The "Magic" Phase)
*   Once you land on the Passenger Input page, **stay still**.
*   The extension will automatically detect the fields and start "typing" passenger names, ages, and selecting preferences.
*   **Anti-Detection:** It uses human-like typing simulation (randomized delays) to prevent account suspension.
*   If more passengers are needed, it will automatically click **+ Add Passenger** and continue filling.

### 4. Checkout
*   Quickly review the filled details and click **Continue**.
*   Proceed to the payment gateway (UPI is recommended for speed).

---

## ⚠️ Important Safety & Tips
*   **Account Safety:** This tool uses "Human-Like Simulation" to reduce the risk of detection, but remember that full automation violates IRCTC's Terms of Service. Use responsibly.
*   **Dry Run:** Always perform a test run on a non-Tatkal train for a future date to ensure the fields are being detected correctly on your machine.
*   **Update Build:** If you modify the source code, you must run `npm run build` in the terminal and then click the **Reload (↻)** icon on the `chrome://extensions/` page.

---
*Built for speed. Built for success. Good luck with your booking!*
