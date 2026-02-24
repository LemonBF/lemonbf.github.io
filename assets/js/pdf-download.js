/**
 * PDF Download Manager
 * Handles generating and downloading the resume as a PDF
 */

const pdfDownload = {
    button: null,
    isGenerating: false,

    /**
     * Initialize PDF download functionality
     */
    init() {
        // Get download button
        this.button = document.getElementById('downloadPdfBtn');

        if (!this.button) {
            console.warn('PDF download button not found');
            return;
        }

        // Set up event listener
        this.button.addEventListener('click', () => this.generatePDF());

        console.log('PDF download initialized');
    },

    /**
     * Generate and download PDF as a single continuous page
     */
    async generatePDF() {
        if (this.isGenerating) {
            console.log('PDF generation already in progress');
            return;
        }

        this.isGenerating = true;
        this.button.classList.add('loading');
        this.button.disabled = true;

        try {
            const element = document.querySelector('.resume-wrapper-inner');

            if (!element) {
                throw new Error('Resume content not found');
            }

            // Hide controls before generating PDF
            const controlsToHide = ['.controls-wrapper', '.language-switcher'];
            controlsToHide.forEach(selector => {
                const el = element.querySelector(selector);
                if (el) el.style.display = 'none';
            });

            const isDarkMode = document.documentElement.getAttribute('data-theme') === 'dark';

            // Step 1: Render element to canvas
            const canvas = await html2canvas(element, {
                scale: 2,
                useCORS: true,
                letterRendering: true,
                scrollY: 0,
                scrollX: 0,
                backgroundColor: isDarkMode ? '#1a1a1a' : '#ffffff'
            });

            const imgData = canvas.toDataURL('image/jpeg', 0.98);

            // Step 2: Create PDF with exact content dimensions (no page breaks)
            const pdfWidth = 210; // A4 width in mm
            const pdfHeight = Math.ceil((canvas.height * pdfWidth) / canvas.width);

            const { jsPDF } = window.jspdf;
            const pdf = new jsPDF({
                unit: 'mm',
                format: [pdfWidth, pdfHeight],
                orientation: 'portrait',
                compress: true
            });

            pdf.addImage(imgData, 'JPEG', 0, 0, pdfWidth, pdfHeight);
            pdf.save('CV_Dmytro_Holota.pdf');

            console.log('PDF generated successfully');

        } catch (error) {
            console.error('Error generating PDF:', error);
            alert('Error al generar el PDF. Por favor, intenta de nuevo.');
        } finally {
            // Restore hidden elements
            ['.controls-wrapper', '.language-switcher'].forEach(selector => {
                const el = document.querySelector(selector);
                if (el) el.style.display = '';
            });

            this.isGenerating = false;
            this.button.classList.remove('loading');
            this.button.disabled = false;
        }
    }
};

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => pdfDownload.init());
} else {
    pdfDownload.init();
}
