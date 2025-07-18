function runSuvidhaAutofill(config) {
    const interval = setInterval(() => {
        const checkbox = document.getElementById('consg_declaration');
        const vehicleInput = document.getElementById('vh_ch_no');
        const cdfTextarea = document.getElementById('consg_cdf_details');
        const dateInput = document.getElementById('consg_cdf_date');

        if (checkbox && vehicleInput && cdfTextarea && dateInput) {
            checkbox.checked = true;
            vehicleInput.value = config.vehicleCount;
            cdfTextarea.value = config.expNumbers.join(',');
            const today = new Date();
            const yyyy = today.getFullYear();
            const mm = String(today.getMonth() + 1).padStart(2, '0');
            const dd = String(today.getDate()).padStart(2, '0');
            dateInput.value = `${yyyy}-${mm}-${dd}`;
            console.log("✅ Autofill done with:", config);
            clearInterval(interval);
        }
    }, 300);
}
