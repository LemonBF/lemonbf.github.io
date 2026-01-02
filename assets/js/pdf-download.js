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
     * Generate and download PDF
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
            // Get the resume wrapper element
            const element = document.querySelector('.resume-wrapper-inner');

            if (!element) {
                throw new Error('Resume content not found');
            }

            // Hide controls before generating PDF
            const controlsToHide = [
                '.controls-wrapper',
                '.language-switcher'
            ];

            controlsToHide.forEach(selector => {
                const el = element.querySelector(selector);
                if (el) el.style.display = 'none';
            });

            // Get current theme
            const isDarkMode = document.documentElement.getAttribute('data-theme') === 'dark';

            // Configure html2pdf options
            const opt = {
                margin: 0,
                filename: 'CV_Dmytro_Holota.pdf',
                image: { type: 'jpeg', quality: 0.98 },
                html2canvas: {
                    scale: 2,
                    useCORS: true,
                    letterRendering: true,
                    scrollY: 0,
                    scrollX: 0,
                    backgroundColor: isDarkMode ? '#1a1a1a' : '#ffffff'
                },
                jsPDF: {
                    unit: 'mm',
                    format: 'a2', // Large format to fit everything in one page
                    orientation: 'portrait',
                    compress: true
                },
                pagebreak: { mode: 'avoid-all' }
            };

            // Generate PDF
            await html2pdf().set(opt).from(element).save();

            console.log('PDF generated successfully');

        } catch (error) {
            console.error('Error generating PDF:', error);
            alert('Error al generar el PDF. Por favor, intenta de nuevo.');
        } finally {
            // Restore hidden elements
            const controlsToShow = [
                '.controls-wrapper',
                '.language-switcher'
            ];

            controlsToShow.forEach(selector => {
                const element = document.querySelector(selector);
                if (element) element.style.display = '';
            });

            // Reset button state
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
