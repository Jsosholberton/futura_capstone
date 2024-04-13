// Import the jsPDF library to create PDF documents
import { jsPDF } from "jspdf";

// Import images used in the PDF
import { agreementImg } from "./images/agreementImg.js";
import { brainImg } from "./images/brainImg.js";
import { confidentialityImg } from "./images/confidentialityImg.js";
import { contractImg } from "./images/contractImg.js";
import { folderImg } from "./images/folderImg.js";
import { handsImg } from "./images/handsImg.js";
import { jurisdictionImg } from "./images/jurisdictionImg.js";
import { lastImg } from "./images/lastImg.js";
import { logoImg } from "./images/logoImg.js";
import { netImg } from "./images/netImg.js";
import { soonImg } from "./images/soonImg.js";
import { toolImg } from "./images/toolImg.js";
import { format } from "./date.js";

/**
 * Generates a PDF document for a candidate agreement.
 *
 * @param {string} name - The name of the candidate.
 */
function genPdf(name) {
    // Create a new jsPDF instance
    const doc = new jsPDF();
    //const currentDate = new Date();
    //const formattedDate = `${currentDate.getMonth() + 1}/${currentDate.getDate()}/${currentDate.getFullYear()}`;
    const formattedDate = format;

    // Start creating the first page of the PDF
    doc.setFontSize(30);
    doc.setFont("helvetica", "bolditalic");
    doc.addImage(logoImg, 30, 18, 15, 15);
    doc.addImage(folderImg, 70, 126, 4.5, 4.5);
    doc.addImage(toolImg, 122, 157, 4.5, 4.5);
    doc.addImage(netImg, 83.7, 216, 4.5, 4.5);
    doc.text(`
Futura Candidate Agreement @
${name}.`, 30, 35);

    doc.setFontSize(13);
    doc.setFont("helvetica", "normal");
    doc.text(`


This Agreement (the "Agreement") is entered into between Futura
represented by Santiago Martinez Jaramillo (referred to as the "Agency")
and ${name} (referred to as the "Candidate"),
collectively referred to as the "Parties." On  ${formattedDate}.

WHEREAS, the Candidate is seeking job opportunities in the software
engineering field, and the Agency specializes in connecting
talented software engineers with global employers;
the Parties agree as follows:


1. Representation.

    The Candidate appoints the Agency as its representative for clients
    presented by the Agency in the area of Software Engineering,
    subject to prior consent by the candidate.

2. Honest Communication and Commitment.

    The Candidate agrees to communicate honestly and provide accurate
    information to the Agency and actively reply to the requests
    made by the Agency during the process.
    They commit to independently complete assessments without
    external assistance.
    Upon employment with a company introduced by the Agency,
    the Candidate commits to performing their duties diligently and meeting
    the company's expectations.

3. Non-Contact Provision.

    The Candidate agrees not to contact any companies introduced
    by the Agency without the Agency's prior written consent
    during and after this agreement. Any direct contact received
    from companies introduced by the Agency should be promptly
    reported to the Agency.`, 30, 56.5);

    doc.setFontSize(8);
    doc.setTextColor("#939393");
    doc.text(`Futura Candidate Agreement @ ${name}`, 6, 292);
    doc.text(`1`, 200, 292);

    // Create page 2 of the PDF
    doc.addPage("a4", "p");
    doc.addImage(handsImg, 129.5, 26.5, 4.5, 4.5);
    doc.addImage(agreementImg, 85.5, 73.5, 4.5, 4.5);

    doc.addImage(confidentialityImg, 66, 121, 4.5, 4.5);
    doc.addImage(contractImg, 83, 168, 4.5, 4.5);
    doc.addImage(soonImg, 98, 211, 4.5, 4.5);

    doc.setTextColor("#000000");
    doc.setFontSize(13);
    doc.text(`
4. Non-Competition and Good-faith Cooperation.

During and after the term of this agreement,
the Candidate agrees not to compete with the Talent Agency's services.
This includes refraining from introducing individuals and
other developers to employers or companies the Talent Agency is actively
working with. If there is a suitable person for a role, the
candidate can introduce them to the Agency.

5. Agreement Compliance.

    The Candidate agrees to respect and abide by all the terms and conditions
    outlined in this Agreement. In the event of non-compliance, 
    the Candidate shall be responsible for paying all damages, losses,
    expenses, and unearned hiring fees incurred by the Agency, including but
    not limited to legal fees and costs arising from such breach.


6. Confidentiality.

    The Candidate acknowledges that they may have access to confidential
    information about the Agency's clients, including company names
    and hiring requirements. The Candidate agrees to keep all such
    information strictly confidential and not disclose it to
    any third parties without the prior written consent of the Agency. 


7. Term and Termination.

    This Agreement shall remain in effect until terminated 
    by either Party upon written notice or by
    the end of the selection process. Termination shall not affect
    any obligations or rights arising before the termination date.


8. Post-Termination Obligations.

    Post-termination, the Candidate must not work directly or 
    indirectly for any company introduced by the Agency 
    without notifying the Agency.
    To pursue opportunities with such companies, 
    the Candidate should notify the Agency, as
    the Company would need to pay the contractual obligation to the Agency.`, 30, 25);

    doc.setFontSize(8);
    doc.setTextColor("#939393");
    doc.text(`Futura Candidate Agreement @ ${name}`, 6, 292);
    doc.text(`2`, 200, 292);

    // Create page 3 of the PDF
    doc.addPage("a4", "p");
    doc.setTextColor("#000000");
    doc.addImage(brainImg, 78.5, 26, 4.5, 4.5);
    doc.addImage(jurisdictionImg, 104, 68, 4.5, 4.5);
    doc.addImage(lastImg, 76.5, 105.5, 4.5, 4.5);
    doc.setFontSize(13);
    doc.text(`
9. Intellectual Property.

    The Candidate acknowledges and agrees that any intellectual
    property created or developed during their employment with a
    company introduced by the Agency shall be the sole 
    and exclusive property of that company.


10. Governing Law and Jurisdiction.

    This Agreement shall be governed by and construed
    in accordance with the laws of Colombia, USA, and any other
    countries where the candidate lives and the companies are located.


11. Entire Agreement.

    This Agreement constitutes the entire understanding between 
    the Parties and supersedes all prior agreements,
    whether oral or written, relating to the subject
    matter herein.


By signing below, the Parties acknowledge their acceptance
and understanding of this Agreement.








    Futura                                                          Candidate

    By: Santiago Martinez Jaramillo                  By: ${name}

    C.C. _______________________              C.C. ___________________

    Signature:                                                    (Colombia)

                                                                        Signature:`, 30, 25);

    doc.setFontSize(8);
    doc.setTextColor("#939393");
    doc.text(`Futura Candidate Agreement @ ${name}`, 6, 292);
    doc.text(`3`, 200, 292);

    // Save the PDF with a specific file name
/*    doc.save(`downloads/${name.replace(/\s/g, "_")}.pdf`);*/
    const blobPDF =  new Blob([ doc.output() ], { type : 'application/pdf'});
    return blobPDF;
};

export {
    genPdf,
};