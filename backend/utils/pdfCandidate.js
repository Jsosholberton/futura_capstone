import { jsPDF } from "jspdf";

function genPdf(name) {
    const doc = new jsPDF();

    //1_page
    doc.setFontSize(25);
    doc.text(`
Futura Candidate Agreement @
${name}.`, 15, 12);

    doc.setFontSize(13);
    doc.text(`
This Agreement (the "Agreement") is entered into between Futura
represented by Santiago Martinez Jaramillo (referred to as the "Agency")
and ${name} (referred to as the "Candidate"),
collectively referred to as the "Parties." On October 12th, 2023.

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
    reported to the Agency.

4. Non-Competition and Good-faith Cooperation.

    During and after the term of this agreement,
    the Candidate agrees not to compete with the Talent Agency's services.
    This includes refraining from introducing individuals and
    other developers to employers or companies the Talent Agency is actively
    working with. If there is a suitable person for a role, the
    candidate can introduce them to the Agency.`, 15, 40);

    // Página 2

    doc.addPage("a4", "p");
    doc.text(`
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
    the Company would need to pay the contractual obligation to the Agency.`, 15, 12);

    doc.addPage("a4", "p");
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








    Futura
    By: Santiago Martinez Jaramillo           By: ${name}

    C.C. _______________________              C.C. ___________________

    Signature:                                    (Colombia)
    Candidate
    
    Signature`, 15, 12);

    doc.save(`downloads/${name.replace(/\s/g, "_")}.pdf`);
  }

export {
    genPdf,
};