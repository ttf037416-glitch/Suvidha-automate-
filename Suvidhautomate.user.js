function runSuvidhaAutofill({ vehicleCount, expNumbers }) {
    const interval = setInterval(() => {
        const checkbox = document.getElementById('consg_declaration');
        const vehicleInput = document.getElementById('vh_ch_no');
        const cdfTextarea = document.getElementById('consg_cdf_details');
        const dateInput = document.getElementById('consg_cdf_date');
        const dlUpload = document.querySelector('input[name="dl_file"]');
        const rcUpload = document.querySelector('input[name="rc_file"]');

        if (checkbox && vehicleInput && cdfTextarea && dateInput) {
            // ✅ Tick the declaration checkbox
            checkbox.checked = true;

            // 🚘 Set vehicle count
            vehicleInput.value = vehicleCount;

            // 📄 Set EXP numbers
            cdfTextarea.value = expNumbers.join(',');

            // 📅 Set current date
            const today = new Date();
            const yyyy = today.getFullYear();
            const mm = String(today.getMonth() + 1).padStart(2, '0');
            const dd = String(today.getDate()).padStart(2, '0');
            dateInput.value = `${yyyy}-${mm}-${dd}`;

            // 🖱️ Auto-trigger file upload inputs (for AHK)
            if (dlUpload) dlUpload.click();
            if (rcUpload) rcUpload.click();

            console.log("✅ Autofilled: declaration, vehicles, EXPs, and date");

            clearInterval(interval);
        }
    }, 300);
}
