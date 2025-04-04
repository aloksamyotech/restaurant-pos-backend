import fs from "fs";
import path from "path";
import PDFDocument from "pdfkit-table";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const invoicesDir = path.join(__dirname, "../invoices");

const ensureDirectoryExists = (directory) => {
    if (!fs.existsSync(directory)) {
        fs.mkdirSync(directory, { recursive: true });
    }
};

const generateInvoicePDF = async (invoiceData) => {
    try {
        console.log("Generating invoice for:", invoiceData);
        ensureDirectoryExists(invoicesDir);

        const filePath = path.resolve(invoicesDir, `invoice-${invoiceData.orderId}.pdf`);
        const doc = new PDFDocument({ margin: 30, size: "A4" });
        const writeStream = fs.createWriteStream(filePath);

        doc.pipe(writeStream);

       
        doc.fontSize(20).text('Invoice', { align: 'center' }).moveDown();
        doc.fontSize(16).text('Apna Restaurant', { align: 'left' });
        doc.fontSize(12).text('71 Gama Street, California, CA 90001, USA').moveDown();

       
        doc.fontSize(16).text('Customer Details:', { underline: true }).moveDown(0.5);
        doc.fontSize(12).text(`Name: ${invoiceData.customerName || 'N/A'}`);
        doc.text(`Phone: ${invoiceData.phone || 'N/A'}`);
        doc.text(`Address: ${invoiceData.address || 'N/A'}`).moveDown();

        doc.fontSize(16).text('Item Details:', { underline: true }).moveDown(0.5);

        
        const table = {
            headers: ["S.No", "Item Name", "Price", "Quantity", "Total"],
            rows: invoiceData.items.map((item, index) => [
                index + 1,
                item.name,
                `$${item.price.toFixed(2)}`,
                item.quantity,
                `$${(item.price * item.quantity).toFixed(2)}`
            ]),
        };

        
        await doc.table(table, {
            width: 500,  
            x: 50,       
            y: doc.y + 10,  
        });

        
        doc.moveDown();
        doc.fontSize(14).text(`Total: $${invoiceData.totalPrice.toFixed(2)}`, { align: 'right' }).moveDown();

        doc.end();

        return new Promise((resolve, reject) => {
            writeStream.on("finish", () => resolve(filePath));
            writeStream.on("error", reject);
        });
    } catch (error) {
        console.error("Error generating invoice:", error);
        throw new Error("Invoice generation failed");
    }
};

export default generateInvoicePDF;
