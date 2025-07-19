// ==UserScript==
// @name         Suvidha Auto-Fill Form + Reactive Slot Watcher
// @namespace    http://tampermonkey.net/
// @version      1.6
// @description  Auto-fill and wait for live slot updates before clicking Calculate
// @match        https://suvidha-cb.wb.gov.in/exporter-oth/slot-booking
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    const desiredVehicleCount = 16;

    function fillForm() {
        const checkbox = document.getElementById('consg_declaration');
        const vehicleInput = document.getElementById('vh_ch_no');
        const cdfTextarea = document.getElementById('consg_cdf_details');
        const dateInput = document.getElementById('consg_cdf_date');

        if (checkbox) checkbox.checked = true;
        if (vehicleInput) vehicleInput.value = desiredVehicleCount;
        if (cdfTextarea) cdfTextarea.value = 'exp200,exp555,exp545,exp599,exp888,,,,,,,,,,,,,,,';

        if (dateInput) {
            const today = new Date();
            const yyyy = today.getFullYear();
            const mm = String(today.getMonth() + 1).padStart(2, '0');
            const dd = String(today.getDate()).padStart(2, '0');
            dateInput.value = `${yyyy}-${mm}-${dd}`;
        }

        console.log("✅ Form filled. Now watching for slot updates...");
    }

    function waitForSlotElementAndObserve() {
        const observerInterval = setInterval(() => {
            const slotEl = document.querySelector('.avilable_slots_updated_result');
            const calculateBtn = document.querySelector('button.calculate-total-fees');

            if (slotEl && calculateBtn) {
                clearInterval(observerInterval);

                // Observe live slot updates
                const observer = new MutationObserver(() => {
                    const availableSlots = parseInt(slotEl.textContent.trim(), 10);

                    if (!isNaN(availableSlots)) {
                        console.log(`ℹ️ Slots changed. Now available: ${availableSlots}`);

                        if (availableSlots >= desiredVehicleCount) {
                            console.log(`✅ Enough slots (${availableSlots})! Clicking Calculate.`);
                            calculateBtn.click();
                            observer.disconnect(); // stop watching
                        }
                    }
                });

                observer.observe(slotEl, { childList: true, characterData: true, subtree: true });

                // Trigger once at start too
                const initialSlots = parseInt(slotEl.textContent.trim(), 10);
                if (!isNaN(initialSlots) && initialSlots >= desiredVehicleCount) {
                    console.log(`✅ Slots already sufficient (${initialSlots})! Clicking Calculate.`);
                    calculateBtn.click();
                    observer.disconnect();
                }
            }
        }, 500); // Wait until elements are present
    }

    // Start the process
    fillForm();
    waitForSlotElementAndObserve();
})();
